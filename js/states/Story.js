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
    },
    storyText: function()
    {
        //Pull text from JSON -> beginning and end from StoryText, individual steps from levels
        //Fill with gender
        //4_ = agent name
        //3_ = him/her
        //2_ = he/she
        //1_ = number
        var text = this.processText(this.gameData.StoryText[0], Locator.gender);
    },
    processText: function(text, gender)
    {
        var num = this.gameData.Levels.length;
        
        if(gender == "male")
        {
            var name = this.gameData.nameM;
            var subject = "he";
            var object = "him";
        }
        else
        {
            var name = this.gameData.nameF;
            var subject = "she";
            var object = "her";
        }
    },
    proceed: function()
    {
        this.state.start('Game');
    }
};
