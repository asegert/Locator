var Locator = Locator || {};

//Checks if game is being played on IE
if(Phaser.Device.ie)
{
    //Checks if the version of IE is lower than 10
    if(Phaser.Device.ieVersion < 10)
    {
        //Displays an error message to alert that the browser needs updated
        var error = document.createElement("DIV");
        error.setAttribute("id", "ieError");
        document.body.appendChild(error);
        document.getElementById("ieError").innerHTML = "Please upgrade your Browser <br><br> <a href = 'https://www.microsoft.com/en-ca/download/internet-explorer.aspx'>Internet Explorer</a><br><a href='https://www.google.com/chrome/browser/desktop/index.html'>Chrome</a><br><a href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</a>";
    
    }
    else
    {
        //If version is higher than 10 run game as normal
        Locator.game = new Phaser.Game(960, 640, Phaser.AUTO);

        Locator.game.state.add('Cache', Locator.CacheState);
        Locator.game.state.add('Boot', Locator.BootState); 
        Locator.game.state.add('Preload', Locator.PreloadState); 
        Locator.game.state.add('Game', Locator.GameState);
        Locator.game.state.add('Story', Locator.StoryState);
        Locator.game.state.add('End', Locator.EndState);

        Locator.game.state.start('Cache'); 
    }
}
else
{
    //If not being played on IE run game as normal
    Locator.game = new Phaser.Game(960, 640, Phaser.AUTO);

    Locator.game.state.add('Cache', Locator.CacheState);
    Locator.game.state.add('Boot', Locator.BootState); 
    Locator.game.state.add('Preload', Locator.PreloadState); 
    Locator.game.state.add('Game', Locator.GameState);
    Locator.game.state.add('Story', Locator.StoryState);
    Locator.game.state.add('End', Locator.EndState);

    Locator.game.state.start('Cache');
}
