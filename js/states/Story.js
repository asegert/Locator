var Locator = Locator || {};

Locator.StoryState = {
    create: function ()
    {
        this.bgBack = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
        this.bgBack.anchor.setTo(0.5, 0.5);
        
        /*this.game.time.events.loop(Phaser.Timer.SECOND/6, function()
        {
            var circle = this.add.sprite(Locator.StoryState.game.world.centerX -18, Locator.StoryState.game.world.centerY -18, 'circle');
            circle.anchor.setTo(0.5, 0.5);
        
            this.add.tween(circle.scale).to({x: 8, y: 8}, 4000, "Linear", true);
            this.world.bringToTop(this.male);
            this.world.bringToTop(this.female);
            this.world.bringToTop(this.text);
            this.world.bringToTop(this.agent);
        }, this);*/
        
        
        
        //Stores all data from JSON file
        this.gameData= JSON.parse(this.game.cache.getText('roundData'));
        
        //Text processing variables
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = this.gameData.storySpecs.wordDelay;
        this.lineDelay = this.gameData.storySpecs.lineDelay;
        
        this.imageIndex = 0;
        this.imageLine = this.gameData.storySpecs.images[0].line;
        this.imageWord = this.gameData.storySpecs.images[0].word;
        
        this.images = new Array();
        
        this.text = this.add.text(200, 300, "Choose your Agent", {fill: '#ffffff', font: '75px'});
        this.male = this.add.button(150, 400, 'male', this.chosen);
        this.female = this.add.button(520, 400, 'female', this.chosen);
        this.agent = this.add.button(800, 550, 'continue', function()
        {
            this.startRealStory();
        }, this);
        this.agent.alpha = 0;
        this.agent.input.enabled = false;
    },
    chosen: function()
    {
        this.this = Locator.StoryState;
        
        this.this.male.alpha = 1;
        this.this.female.alpha = 1;
        this.alpha = 0.5;
        Locator.gender = this.key;
        this.this.agent.alpha = 1;
        this.this.agent.input.enabled = true;
        
    },
    startRealStory: function()
    {
        this.text.destroy();
        this.male.destroy();
        this.female.destroy();
        this.agent.destroy();
        
        this.background = this.add.sprite(0, 0, 'commander');
        //Add Story here
        this.storyText();
    },
    storyText: function()
    {
        //Pull text from JSON -> beginning and end from StoryText, individual steps from levels
        //Fill with gender
        //4_ = agent name
        //3_ = him/her
        //2_ = he/she
        //1_ = number
        //4- = himself/herself
        //3- = Him/Her
        //2- = He/She
        //1- = his/her  
        this.content = (this.processText(this.gameData.StoryText[0], Locator.gender, this.gameData.storySpecs.mainOffset, this.gameData.storySpecs.indentMain));
        this.content[this.content.length] = "\n";
        for(var i = 0, len = this.gameData.rounds.length; i<len; i++)
        {
            this.content[this.content.length] = "\n\t\t\t\t\t\t\t\t-";
            this.content = this.content.concat(this.processText(this.gameData.rounds[i].storyText, Locator.gender, this.gameData.storySpecs.secondaryOffset, this.gameData.storySpecs.indentSecondary));
        }
        this.content[this.content.length] = "\n\n";
        this.content = this.content.concat(this.processText(this.gameData.StoryText[1], Locator.gender, this.gameData.storySpecs.mainOffset, this.gameData.storySpecs.indentMain));
        
        this.displayStoryText = this.add.text(150, 500, '', { font: "15px Arial", fill: "#19de65", stroke: '#000000', strokeThickness: 5 });

        this.nextLine();
    },
    processText: function(text, gender, spaceLen, indent)
    {
        var name = this.gameData.nameM;
        var subject = "he";
        var object = "him";
        var personal = "himself";
        var possessive = "his";
        var num = this.gameData.rounds.length;
        
        if(gender == "male")
        {
            name = this.gameData.nameF;
            subject = "she";
            object = "her";
            personal = "herself";
            possessive = "her";
        }
        
        text = text.replace(/----/g , personal);
        text = text.replace(/---/g , this.capitalizeFirstLetter(object));
        text = text.replace(/--/g , this.capitalizeFirstLetter(subject));
        text = text.replace(/-/g , possessive);
        text = text.replace(/____/g , name);
        text = text.replace(/___/g , object);
        text = text.replace(/__/g , subject);
        text = text.replace(/_/g , num);
        
        var index = 0;
        var tempText = text;
        var returnText = new Array();
        if((index + spaceLen) > text.length)
        {
            returnText[returnText.length] = tempText;
        }
        else
        {
            while((index + spaceLen) < text.length)
            {
                var lastIndex = index;
                index = index + spaceLen;
                var workingText = tempText.substring(lastIndex, index);
            
                if(tempText.charAt(index) === " ")
                {
                    workingText = workingText + "\n";
                    index = index+1;
                }
                else
                {
                    //process back to nearest space
                    var tempIndex = workingText.lastIndexOf(" ");
                    workingText = tempText.substring(lastIndex, (lastIndex + tempIndex)) + "\n";
                    index = (lastIndex + tempIndex + 1);
                }
            
                if(lastIndex == 0)
                {
                    returnText[returnText.length] = workingText;
                }
                else
                {
                    returnText[returnText.length] = (indent + workingText);
                }
            }
            returnText[returnText.length] = (indent + tempText.substring(index));
        }
        
        return returnText;
    },
    capitalizeFirstLetter: function(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    nextLine: function()
    {
        if(this.imageIndex+1 != this.gameData.storySpecs.images.length && this.lineIndex > this.imageLine)
        {
            while(this.lineIndex > this.imageLine)
            {
                this.imageIndex++;
                this.imageLine = this.gameData.storySpecs.images[this.imageIndex].line;
            }
            this.imageWord = this.gameData.storySpecs.images[this.imageIndex].word;
        }
        
        if (this.lineIndex === this.content.length)
        {
            //  We're finished
            this.yesButton = this.add.button(700, 500, 'yes', function()
            {
                this.state.start('Game');
            }, this);
            return;
        }
        else if(this.content[this.lineIndex].charAt(0).match(/[a-z]/i) || this.content[this.lineIndex].includes("\t"))
        {
            this.displayStoryText.y = this.displayStoryText.y - 20;
        }
        if (this.lineIndex+1 === this.content.length)
        {
            this.images.forEach(function(img)
            {
                img.destroy();
            }, this);
        }
        //  Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(' ');

        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

        //  Advance to the next line
        this.lineIndex++;
    },
    nextWord: function()
    {
        if(this.lineIndex == this.imageLine && this.wordIndex == this.imageWord)
        {
            var image = this.add.sprite(this.gameData.storySpecs.images[this.imageIndex].x, this.gameData.storySpecs.images[this.imageIndex].y, this.gameData.storySpecs.images[this.imageIndex].image);
            image.anchor.setTo(0.5, 0.5);
            image.scale.setTo(0.1, 0.1);
            
            this.add.tween(image).to({x: this.game.world.centerX, y: this.game.world.centerY}, 1000, "Linear", true);
            this.add.tween(image.scale).to({x: 1, y: 1}, 1000, "Linear", true);
            this.add.tween(image).to({rotation: this.gameData.storySpecs.images[this.imageIndex].rotation}, 1000, "Linear", true);

            this.images[this.images.length] = image;
            
            this.world.bringToTop(this.displayStoryText);
            if(this.imageIndex+1 != this.gameData.storySpecs.images.length)
            {
                this.imageIndex++;
                this.imageLine = this.gameData.storySpecs.images[this.imageIndex].line;
                this.imageWord = this.gameData.storySpecs.images[this.imageIndex].word;
            }
        }
        
        //  Add the next word onto the text string, followed by a space
        this.displayStoryText.text = this.displayStoryText.text.concat(this.line[this.wordIndex]);

        //  Advance the word index to the next word in the line
        this.wordIndex++;

        //  Last word?
        if (this.wordIndex === this.line.length)
        {

            //  Get the next line after the lineDelay amount of ms has elapsed
            this.time.events.add(this.lineDelay, this.nextLine, this);
        }
        else
        {
            this.displayStoryText.text = this.displayStoryText.text.concat(" ");
        }
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/