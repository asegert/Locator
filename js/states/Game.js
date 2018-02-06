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
        this.totalText = this.add.text(280, 0, this.gameData.rounds[this.currRound].findText+this.totalUnlucky + this.gameData.rounds[this.currRound].hintText);
        
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
                    var texture = gameData.rounds[this.currRound].standardImage[Math.floor(Math.random() * gameData.rounds[this.currRound].standardImage.length)];
                }
                var button = this.add.sprite(250 + (50 * i), 75 + (50 * j), texture);
                button.anchor.setTo(0.5, 0.5);
                button.inputEnabled = true;
                button.events.onInputDown.add(function(button)
                {   
                    if(this.isLocatorKey(button) && !this.moving)
                    {
                        this.totalUnlucky--;
                        this.moving = true;
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
                        this.totalText.setText(this.gameData.rounds[this.currRound].findText+this.totalUnlucky + this.gameData.rounds[this.currRound].hintText);
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
    isLocatorKey: function(button)
    {
        for(var i =0, len = this.gameData.rounds[this.currRound].standardImage.length; i < len; i++)
        {
            if(button.key != this.gameData.rounds[this.currRound].standardImage[i])
            {
                return true;
            }
        }
        return false;
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
            button.loadTexture(this.gameData.rounds[this.currRound].standardImage[Math.floor(Math.random() * this.gameData.rounds[this.currRound].standardImage.length)]);
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
        var tween = this.add.tween(button).to( { rotation: 3.15 }, 1000, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(function(button)
        {
            button.rotation = 0;
            button.loadTexture(thisgameData.rounds[this.currRound].standardImage[Math.floor(Math.random() * gameData.rounds[this.currRound].standardImage.length)]);
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
        this.totalText.setText(this.gameData.rounds[this.currRound].findText+this.totalUnlucky + this.gameData.rounds[this.currRound].hintText);
        this.initBoard(this.gameData);
    },
    endGame: function()
    {
        this.totalText.destroy();
        this.hint.destroy();
        this.rotators.removeAll();
        this.others.removeAll();
    }
}
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/