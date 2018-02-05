var Locator = Locator || {};

Locator.CacheState = {

    create: function ()
    {
        //Remove old cache and create an empty cache to be filled
        this.cache = new Phaser.Cache(this);
        this.load.reset();
        this.load.removeAll();

        this.state.start('Boot');
    }
}