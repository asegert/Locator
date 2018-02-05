//Sets up board and handles all Player functions
var Locator = Locator || {};


Locator.GameState = {
    create: function ()
    {
        //Stores all data from JSON file
        this.gameData= JSON.parse(this.game.cache.getText('roundData'));
        this.currRound = 0;
        //Boolean to check if a horseshoe is currently rotating
        this.moving = false;
        //Holds all the 'unlucky' horseshoes
        this.rotators=this.add.group();
        //Holds the others
        this.others = this.add.group();
        //Total unlucky ones to find
        this.totalUnlucky = this.gameData.rounds[this.currRound].locateNum;
        //Displays what needs to be found
        this.totalText = this.add.text(280, 0, this.gameData.rounds[this.currRound].findText+this.totalUnlucky);
        
        this.hint = this.add.sprite(0, 0, 'hint');
        this.hint.inputEnabled = true;
        this.hint.events.onInputDown.add(function()
        {
            var hinted = false;
            this.rotators.forEach(function(rotator)
            {
                if(rotator.key == this.gameData.rounds[this.currRound].locateImage && !hinted)
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
                    var texture = gameData.rounds[this.currRound].locateImage;
                }
                else
                {
                    var texture = gameData.rounds[this.currRound].standardImage
                }
                var button = this.add.sprite(250 + (50 * i), 75 + (50 * j), texture);
                button.anchor.setTo(0.5, 0.5);
                button.inputEnabled = true;
                button.events.onInputDown.add(function(button)
                {
                    this.totalUnlucky--;
                    
                    if(button.key != gameData.rounds[this.currRound].standardImage && !this.moving)
                    {
                        if(gameData.rounds[this.currRound].locateFunction == 'spritesheet')
                        {
                            this.spritesheetTransition(gameData.rounds[this.currRound].params, button);
                        }
                        else if(gameData.rounds[this.currRound].locateFunction == 'colour')
                        {
                            this.colourTransition(button);
                        }
                        else if(gameData.rounds[this.currRound].locateFunction == 'rotate')
                        {
                            this.rotateTransition(button);
                        }
                        this.totalText.setText(gameData.rounds[this.currRound].findText+this.totalUnlucky);
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
        
    },
    colourTransition: function(button)
    {
        
    },
    rotateTransition: function(button)
    {
        var tween = this.add.tween(button).to( { rotation: 3.15 }, 1000, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(function(button)
        {
            button.rotation = 0;
            button.loadTexture(this.gameData.rounds[this.currRound].standardImage);
            if(this.totalUnlucky==0)
            {
                this.currRound++;
                if(this.currRound > this.gameData.rounds.length)
                {
                    this.endGame();
                }
                else
                {
                    this.newRound();
                }
                /*this.totalText.destroy();
                this.hint.destroy();
                this.rotators.removeAll();
                this.others.removeAll();
                this.state.processWin(gameData.rounds[this.currRound].switch);*/
            }
            this.moving = false;
       }, this);
    },
    newRound: function()
    {
        
    },
    endGame: function()
    {
        
    }
}
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/