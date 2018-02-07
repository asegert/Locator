var Locator = Locator || {};

Locator.StoryState = {
    create: function ()
    {
        //Stores all data from JSON file
        this.gameData= JSON.parse(this.game.cache.getText('roundData'));
        
        this.text = this.add.text(0, 0, "Choose your Agent");
        this.male = this.add.button(300, 350, 'male', this.chosen);
        this.female = this.add.button(500, 350, 'female', this.chosen);
        this.agent = this.add.button(700, 400, 'fingerprintL', function()
        {
            this.startRealStory();
        }, this);
    },
    chosen: function()
    {
        this.this = Locator.StoryState;
        
        this.this.male.alpha = 1;
        this.this.female.alpha = 1;
        this.alpha = 0.5;
        Locator.gender = this.key;
        
    },
    startRealStory: function()
    {
        this.text.destroy();
        this.male.destroy();
        this.female.destroy();
        this.agent.destroy();
        
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
        var text = this.processText(this.gameData.StoryText[0], Locator.gender, 95, "") + "\n";
        for(var i = 0, len = this.gameData.rounds.length; i<len; i++)
        {
            text = text + "\n\t\t\t\t\t\t\t\t-" + this.processText(this.gameData.rounds[i].storyText, Locator.gender, 90, "\t\t\t\t\t\t\t\t");
        }
        text = text + "\n\n" + this.processText(this.gameData.StoryText[1], Locator.gender, 95, "");//Maybe Center, large, buttonize?
        
        this.add.text(0, 50, text, {font: '24px'});
    },
    processText: function(text, gender, spaceLen, indent)
    {
        var name = this.gameData.nameM;
        var subject = "he";
        var object = "him";
        var personal = "himself";
        var num = this.gameData.rounds.length;
        
        if(gender == "male")
        {
            name = this.gameData.nameF;
            subject = "she";
            object = "her";
            personal = "herself";
        }
        
        text = text.replace(/----/g , personal);
        text = text.replace(/---/g , this.capitalizeFirstLetter(object));
        text = text.replace(/--/g , this.capitalizeFirstLetter(subject));
        //text = text.replace(/_/g , num);
        text = text.replace(/____/g , name);
        text = text.replace(/___/g , object);
        text = text.replace(/__/g , subject);
        text = text.replace(/_/g , num);
        
        var index = 0;
        var tempText = text;
        var returnText = "";
        if((index + spaceLen) > text.length)
        {
            returnText = returnText + tempText;
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
                    returnText = returnText + workingText;
                }
                else
                {
                    returnText = returnText + indent + workingText;
                }
            }
            returnText = returnText + indent + tempText.substring(index);
        }
        
        return returnText;
    },
    capitalizeFirstLetter: function(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    proceed: function()
    {
        this.state.start('Game');
    }
};
