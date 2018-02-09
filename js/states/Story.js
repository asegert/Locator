var Locator = Locator || {};

Locator.StoryState = {
    create: function ()
    {
        //Create the background
        this.bg = this.add.sprite(0, 0, 'bg');
        //Play the opening sound byte
        this.james = this.add.audio('jamesBond');
        this.james.play();
        
        //Stores all data from JSON file
        this.gameData= JSON.parse(this.game.cache.getText('roundData'));
        
        //Text processing variables
        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;
        this.wordDelay = this.gameData.storySpecs.wordDelay;
        this.lineDelay = this.gameData.storySpecs.lineDelay;  
        //Image display varibales
        this.imageIndex = 0;
        this.imageLine = this.gameData.storySpecs.images[0].line;
        this.imageWord = this.gameData.storySpecs.images[0].word;
        this.images = new Array();
        //Initial Screen display (Choosing the spy to be)
        this.text = this.add.text(200, 300, "Choose your Agent", {fill: '#ffffff', font: '75px'});
        this.male = this.add.button(150, 400, 'male', this.chosen);
        this.female = this.add.button(520, 400, 'female', this.chosen);
        this.agent = this.add.button(800, 550, 'continue', function()
        {
            //If changeing screens before the sound stops, force it to stop then play the new music and start the next phase of the story
            this.james.stop();
            Locator.music = this.add.audio('spy');
            Locator.music.play('', 0, 1, true);
            this.startRealStory();
        }, this);
        //Do not allow the button to be clicked, will be changed once a character is chosen
        this.agent.alpha = 0;
        this.agent.input.enabled = false;
    },
    chosen: function()
    {
        this.this = Locator.StoryState;
        //Show which spy was selected using alpha
        this.this.male.alpha = 1;
        this.this.female.alpha = 1;
        this.alpha = 0.5;
        //Set the gender
        Locator.gender = this.key;
        //Show the button to move on and allow input
        this.this.agent.alpha = 1;
        this.this.agent.input.enabled = true;
        
    },
    startRealStory: function()
    {
        //Remove all items from initial screen
        this.text.destroy();
        this.male.destroy();
        this.female.destroy();
        this.agent.destroy();
        //Change the background
        this.bg.loadTexture('commander');
        //Add Story here
        this.storyText();
    },
    storyText: function()
    {
        //Pull text from JSON -> beginning and end from StoryText, individual steps from levels
        //Fill with gender based on...
        //4_ = agent name
        //3_ = him/her
        //2_ = he/she
        //1_ = number
        //4- = himself/herself
        //3- = Him/Her
        //2- = He/She
        //1- = his/her 
        
        //Grab the 1st piece of content (Opening StoryText) from JSON, sends it to be processed (remove the indicators as above and replace them with correct text) and add an initial new line
        this.content = (this.processText(this.gameData.StoryText[0], Locator.gender, this.gameData.storySpecs.mainOffset, this.gameData.storySpecs.indentMain));
        this.content[this.content.length] = "\n";
        //Grabs the remaining content (round specific content) adding the indent before and processing the text
        for(var i = 0, len = this.gameData.rounds.length; i<len; i++)
        {
            this.content[this.content.length] = "\n\t\t\t\t\t\t\t\t-";
            this.content = this.content.concat(this.processText(this.gameData.rounds[i].storyText, Locator.gender, this.gameData.storySpecs.secondaryOffset, this.gameData.storySpecs.indentSecondary));
        }
        //Add an extra line at the end before adding the final text (end story text) which gets processed
        this.content[this.content.length] = "\n\n";
        this.content = this.content.concat(this.processText(this.gameData.StoryText[1], Locator.gender, this.gameData.storySpecs.mainOffset, this.gameData.storySpecs.indentMain));
        //Create the display for the text
        this.displayStoryText = this.add.text(150, 500, '', { font: "15px Arial", fill: "#19de65", stroke: '#000000', strokeThickness: 5 });
        //Begin the typing process
        this.nextLine();
    },
    processText: function(text, gender, spaceLen, indent)//Replaces placeholders with text
    {
        //Variables to hold replacement text, get rewritten if the male is chosen
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
        //In the text replace each placeholder with the corresponding variable which gender specifies the text
        text = text.replace(/----/g , personal);
        text = text.replace(/---/g , this.capitalizeFirstLetter(object));
        text = text.replace(/--/g , this.capitalizeFirstLetter(subject));
        text = text.replace(/-/g , possessive);
        text = text.replace(/____/g , name);
        text = text.replace(/___/g , object);
        text = text.replace(/__/g , subject);
        text = text.replace(/_/g , num);
        
        //Go through the text stopping when the maximum characters (spacelen) has been hit, then add a new line and indent the next line
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
        //Return the processed text
        return returnText;
    },
    capitalizeFirstLetter: function(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    nextLine: function()
    {
        //If the next image to be displayed should have been displayed, but for some reason has not proceed to showing the next image
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
            //All lines are displayed so show the button allowing player to proceed
            this.yesButton = this.add.button(700, 500, 'yes', function()
            {
                this.state.start('Game');
            }, this);
            return;
        }
        //A check that the line is to be displayed on a new line, this is to prevent the "-" from being seperate from it's list item
        else if(this.content[this.lineIndex].charAt(0).match(/[a-z]/i) || this.content[this.lineIndex].includes("\t"))
        {
            this.displayStoryText.y = this.displayStoryText.y - 20;
        }
        //If the last line is being shown remove the images showing the commander
        if (this.lineIndex+1 === this.content.length)
        {
            this.images.forEach(function(img)
            {
                img.destroy();
            }, this);
        }
        // Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(' ');

        // Reset the word index
        this.wordIndex = 0;

        // Call the 'nextWord' function once for each word in the line (line.length)
        this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

        // Advance to the next line
        this.lineIndex++;
    },
    nextWord: function()
    {
        //If this line and this word match the line and word when the next image gets displayed, display it and advance the next image to be displayed
        if(this.lineIndex == this.imageLine && this.wordIndex == this.imageWord)
        {
            var image = this.add.sprite(this.gameData.storySpecs.images[this.imageIndex].x, this.gameData.storySpecs.images[this.imageIndex].y, this.gameData.storySpecs.images[this.imageIndex].image);
            image.anchor.setTo(0.5, 0.5);
            image.scale.setTo(0.1, 0.1);
            //Have the image 'thrown' in
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
        
        //Add the next word onto the text string, followed by a space
        this.displayStoryText.text = this.displayStoryText.text.concat(this.line[this.wordIndex]);

        //Advance the word index to the next word in the line
        this.wordIndex++;

        //If this is the last word start the next line
        if (this.wordIndex === this.line.length)
        {
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