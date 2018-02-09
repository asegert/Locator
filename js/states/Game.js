//Sets up board and handles all Player functions
var Locator = Locator || {};


Locator.GameState = {
    create: function ()
    {
        //Stores all data from JSON file
        this.gameData= JSON.parse(this.game.cache.getText('roundData'));
        //Stores the current round/level
        this.currRound = 0;
        //Background
        this.bg = this.add.sprite(0, 0, this.gameData.rounds[this.currRound].bg);
        //Boolean to check if something is currently changing
        this.moving = false;
        //Holds all the items to be located
        this.rotators=this.add.group();
        //Holds the others
        this.others = this.add.group();
        //Total items ones to find
        this.totalUnlucky = this.gameData.rounds[this.currRound].locateNum;
        //Displays what needs to be found
        this.totalText = this.add.text(this.gameData.rounds[this.currRound].fTextX, 0, this.gameData.rounds[this.currRound].findText+this.totalUnlucky + "\n", {fill: '#ffffff'});
        this.hintText = this.add.text(this.gameData.rounds[this.currRound].hTextX, 50, this.gameData.rounds[this.currRound].hintText[Locator.gender], {fill: '#ffffff'});
        //Hints by emitting over one that needs to be found
        this.hint = this.add.sprite(0, 0, 'hint');
        this.hint.inputEnabled = true;
        this.hint.events.onInputDown.add(function()
        {
            var hinted = false;
            this.rotators.forEach(function(rotator)
            {
                if(rotator.key == this.gameData.rounds[this.currRound].locateImage[Locator.gender] && !hinted)
                {
                    var emitter = this.add.emitter(rotator.x, rotator.y, 200);
                    emitter.makeParticles(this.gameData.rounds[this.currRound].particles);
                    emitter.start(true, 5000, null, 20);
                    
                    this.world.bringToTop(rotator);
                    
                    hinted=true;
                }
            }, this);
        }, this);
        this.hint.scale.setTo(0.5, 0.5);
        //Creates the board
        this.initBoard(this.gameData);
    },
    initBoard: function(gameData)
    {
        //Goes through the board array in the JSON data
        //If it is labeled "L" make it a button to be located, and add to the rotators group, otherwise make it the standard image (one at random out of the array) and add to the others group
        for(var i=0; i<gameData.rounds[this.currRound].board.length; i++)
        {
            for(var j=0; j<gameData.rounds[this.currRound].board[i].length; j++)
            {
                if(gameData.rounds[this.currRound].board[i][j]=="L")
                {
                    var texture = gameData.rounds[this.currRound].locateImage[Locator.gender];
                }
                else
                {
                    var texture = gameData.rounds[this.currRound].standardImage[Locator.gender][Math.floor(Math.random() * gameData.rounds[this.currRound].standardImage[Locator.gender].length)];
                }
                var button = this.add.sprite(250 + (50 * i), 125 + (50 * j), texture);
                button.anchor.setTo(0.5, 0.5);
                button.inputEnabled = true;
                button.events.onInputDown.add(function(button)
                {   
                    if(button.key == this.gameData.rounds[this.currRound].locateImage[Locator.gender] && !this.moving)
                    {
                        //If one is selected drop the number to be found, set moving to true as it is transitioning, call the function it uses and update the text;
                        this.totalUnlucky--;
                        this.moving = true;
                        if(gameData.rounds[this.currRound].locateFunction == 'spritesheet')
                        {
                            this.spritesheetTransition(gameData.rounds[this.currRound].params[Locator.gender], button);
                        }
                        else if(gameData.rounds[this.currRound].locateFunction == 'colour')
                        {
                            this.colourTransition(button);
                        }
                        else if(gameData.rounds[this.currRound].locateFunction == 'rotate')
                        {
                            this.rotateTransition(button);
                        }
                        this.totalText.setText(this.gameData.rounds[this.currRound].findText+this.totalUnlucky + "\n", {fill: '#ffffff'});
                        this.hintText.setText(this.gameData.rounds[this.currRound].hintText[Locator.gender], {fill: '#ffffff'});
                    }
                }, this);
                
                if(gameData.rounds[this.currRound].board[i][j] == 'L')
                {
                    this.rotators.add(button);
                }
                else
                {
                    this.others.add(button);
                }
            }
        }
    },
    spritesheetTransition: function(spritesheet, button)
    {
        //Run a spritesheet on the button and check if the game is over
        button.loadTexture(spritesheet);
        var spriteTransform = button.animations.add('spritesheet');
        button.animations.play('spritesheet', 20, false);
        spriteTransform.onComplete.add(function()
        {
            if(this.totalUnlucky==0)
            {
                this.nextMove();
            }
            this.moving = false;
        }, this);
    },
    colourTransition: function(button)
    {
        //Swap textures (colours) and check if game is over
        var out = this.add.tween(button).to({alpha: 0}, 50, "Linear", true);
        out.onComplete.add(function()
        {
            button.loadTexture(this.gameData.rounds[this.currRound].standardImage[Locator.gender][Math.floor(Math.random() * this.gameData.rounds[this.currRound].standardImage[Locator.gender].length)]);
            var backIn = this.add.tween(button).to({alpha: 1}, 50, "Linear", true);
            backIn.onComplete.add(function()
            {
                if(this.totalUnlucky==0)
                {
                    this.nextMove();
                }
                this.moving = false;
            }, this);
        }, this);
    },
    rotateTransition: function(button)
    {
        //Rotate the texture and check if game is over
        var tween = this.add.tween(button).to( { rotation: this.gameData.rounds[this.currRound].params[Locator.gender]}, 200, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(function(button)
        {
            button.rotation = 0;
            button.loadTexture(Locator.GameState.gameData.rounds[this.currRound].standardImage[Locator.gender][Math.floor(Math.random() * Locator.GameState.gameData.rounds[this.currRound].standardImage[Locator.gender].length)]);
            if(this.totalUnlucky==0)
            {
                this.nextMove();
            }
            this.moving = false;
       }, this);
    },
    nextMove: function()
    {
        //Raise the round as the current round is over
        this.currRound++;
        //If there is not another round end the game, otherwise start the next round
        if(this.currRound >= this.gameData.rounds.length)
        {
            this.endGame();
        }
        else
        {
            this.newRound();
        }
    },
    newRound: function()
    {
        //Destroy the old items
        this.rotators.forEach(function(rotator)
        {
            rotator.destroy();
        }, this);
        this.rotators.removeAll();
        
        this.others.forEach(function(other)
        {
            other.destroy();
        }, this);
        this.others.removeAll();

        //Reset the number to find
        this.totalUnlucky = this.gameData.rounds[this.currRound].locateNum;
        //Reset the text
        this.totalText.destroy();
        this.hintText.destroy()
        this.totalText = this.add.text(this.gameData.rounds[this.currRound].fTextX, 0, this.gameData.rounds[this.currRound].findText+this.totalUnlucky + "\n", {fill: '#ffffff'});
        this.hintText = this.add.text(this.gameData.rounds[this.currRound].hTextX, 50, this.gameData.rounds[this.currRound].hintText[Locator.gender], {fill: '#ffffff'});
        //Load the new background
        this.bg.loadTexture(this.gameData.rounds[this.currRound].bg);
        //Re-initialize the board
        this.initBoard(this.gameData);
        //Create the display docket
        this.createDocket();
        
    },
    createDocket: function()
    {
        //Choose the docket base based on the player gender
        if(Locator.gender == 'female')
        {
            this.continue = this.add.sprite(250, 0, 'maleContinue');
        }
        else
        {
            this.continue = this.add.sprite(250, 0, 'femaleContinue');
        }
        //Add the round complete text and use the StoryState to process it
        var textContent = Locator.StoryState.processText(this.gameData.rounds[this.currRound-1].roundCompleteText, Locator.gender, 35, "");
        var displayText = "";
        //Go through the array to display the text in one line
        for(var i = 0, len = textContent.length; i< len; i++)
        {
            displayText += textContent[i];
        }
        //Display the text and adjust the line spacing so it lands on the docket lines
        this.continueText = this.add.text(320, 300, displayText, {font: '24px', strokeThickness: 2, stroke: '#000000'});
        this.continueText.lineSpacing = -5;
        
        //Grab old image, new image and display on docket
        this.oldIcon = this.add.sprite(350, 200, this.gameData.rounds[this.currRound-1].standardImage[Locator.gender][0]);
        this.newIcon = this.add.sprite(550, 400, this.gameData.rounds[this.currRound].standardImage[Locator.gender][0]);
        //Button to continue to next round which is already loaded
        this.continueButton = this.add.button(570, 450, 'continue', function()
        {
            this.oldIcon.destroy();
            this.newIcon.destroy();
            this.continue.destroy();
            this.continueText.destroy();
            this.continueButton.destroy();
        }, this);
        this.continueButton.scale.setTo(0.7, 0.7);
    },
    endGame: function()
    {
        //Remove everything and run the end state
        this.totalText.destroy();
        this.hintText.destroy();
        this.hint.destroy();
        this.rotators.removeAll();
        this.others.removeAll();
        this.state.start('End');
    }
}
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/