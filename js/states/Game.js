//Sets up board and handles all Player functions
var Locator = Locator || {};


Locator.GameState = {
    create: function ()
    {
        //Stores all data from JSON file
        this.gameData= JSON.parse(this.game.cache.getText('roundData'));
        this.currRound = 0;
        this.bg = this.add.sprite(0, 0, this.gameData.rounds[this.currRound].bg);
        //Boolean to check if a horseshoe is currently rotating
        this.moving = false;
        //Holds all the 'unlucky' horseshoes
        this.rotators=this.add.group();
        //Holds the others
        this.others = this.add.group();
        //Total unlucky ones to find
        this.totalUnlucky = this.gameData.rounds[this.currRound].locateNum;
        //Displays what needs to be found
        this.totalText = this.add.text(this.gameData.rounds[this.currRound].fTextX, 0, this.gameData.rounds[this.currRound].findText+this.totalUnlucky + "\n", {fill: '#ffffff'});
        this.hintText = this.add.text(this.gameData.rounds[this.currRound].hTextX, 50, this.gameData.rounds[this.currRound].hintText[Locator.gender], {fill: '#ffffff'});
        
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
        
        this.initBoard(this.gameData);
    },
    initBoard: function(gameData)
    {
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
        this.currRound++;
        
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

        this.totalUnlucky = this.gameData.rounds[this.currRound].locateNum;
        this.totalText.destroy();
        this.hintText.destroy()
        this.totalText = this.add.text(this.gameData.rounds[this.currRound].fTextX, 0, this.gameData.rounds[this.currRound].findText+this.totalUnlucky + "\n", {fill: '#ffffff'});
        this.hintText = this.add.text(this.gameData.rounds[this.currRound].hTextX, 50, this.gameData.rounds[this.currRound].hintText[Locator.gender], {fill: '#ffffff'});
        
        this.bg.loadTexture(this.gameData.rounds[this.currRound].bg);
        this.initBoard(this.gameData);
        this.createDocket();
        
    },
    createDocket: function()
    {
        if(Locator.gender == 'female')
        {
            this.continue = this.add.sprite(250, 0, 'maleContinue');
        }
        else
        {
            this.continue = this.add.sprite(250, 0, 'femaleContinue');
        }
        
        var textContent = Locator.StoryState.processText(this.gameData.rounds[this.currRound-1].roundCompleteText, Locator.gender, 35, "");
        var displayText = "";
        for(var i = 0, len = textContent.length; i< len; i++)
        {
            displayText += textContent[i];
        }
        
        this.continueText = this.add.text(320, 300, displayText, {font: '24px', strokeThickness: 2, stroke: '#000000'});
        this.continueText.lineSpacing = -5;
        
        //Grab old image, new image and display on docket
        this.oldIcon = this.add.sprite(350, 200, this.gameData.rounds[this.currRound-1].standardImage[Locator.gender][0]);
        this.newIcon = this.add.sprite(550, 400, this.gameData.rounds[this.currRound].standardImage[Locator.gender][0]);
        
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