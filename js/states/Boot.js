var Locator = Locator || {};

Locator.BootState = {
	preload: function(){
		this.stage.backgroundColor = '#ffffff';
		this.load.image('loading-background', 'assets/images/loading-background.png');
		this.load.image('loading-progress', 'assets/images/loading-progress.png');
	},
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        //Forces orienation to landscape-ish does fill portrait, but squished
        this.scale.forceOrientation(true, false);
		this.state.start('Preload');
	}
};