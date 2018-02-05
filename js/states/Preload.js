var Locator = Locator || {};

Locator.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this._preloadResources();
    },
    _preloadResources: function ()
    {
        var pack = {
            'image': [
                             ['gun', 'assets/images/gun.png'],
                             ['silencerGun', 'assets/images/silencerGun.png'],
                             //['silencerGun', 'assets/images/silencerGun.png'],
	                    ],
            'spritesheet': [
                            ['gunSprite', 'assets/images/gunSprite.png', 52, 39],
	                       ],
            'audio': [
		                    //['boing', ['assets/audio/boing.mp3', 'assets/audio/boing.ogg']],
	                    ],
            'text': [
                            ['roundData', 'assets/data/roundData.json'],
                        ]
        };
        for (var method in pack)
        {
            pack[method].forEach(function (args)
            {
                var loader = this.load[method];
                loader && loader.apply(this.load, args);
            }, this);
        }
    },
    create: function ()
    {
        this.state.start('Story');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/