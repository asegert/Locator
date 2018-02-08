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
                             ['bullet', 'assets/images/bullet.png'],
                             ['passport', 'assets/images/passport.png'],
                             ['passportBlack', 'assets/images/passportBlack.png'],
                             //['bullet', 'assets/images/bullet.png'],
                             ['usb', 'assets/images/usb.png'],
                             ['usbYellow', 'assets/images/usbYellow.png'],
                             //['bullet', 'assets/images/bullet.png'],
                             ['blondeF', 'assets/images/ladyBlondeSmall.png'],
                             ['whiteF', 'assets/images/ladyWhiteSmall.png'],
                             ['brownF', 'assets/images/ladyBrownSmall.png'],
                             ['blackF', 'assets/images/ladyBlackSmall.png'],
                             ['redF', 'assets/images/ladyRedSmall.png'],
                             ['blondM', 'assets/images/manBlondSmall.png'],
                             ['whiteM', 'assets/images/manWhiteSmall.png'],
                             ['brownM', 'assets/images/manBrownSmall.png'],
                             ['blackM', 'assets/images/manBlackSmall.png'],
                             ['redM', 'assets/images/manRedSmall.png'],
                             ['greyM', 'assets/images/manGreySmall.png'],
                             ['fingerprintR', 'assets/images/fingerprintRight.png'],
                             ['fingerprintL', 'assets/images/fingerprintLeft.png'],
                             ['male', 'assets/images/male.png'],
                             ['female', 'assets/images/female.png'],
                             ['commander', 'assets/images/commander.png'],
                             ['partners', 'assets/images/partners.png'],
                             ['thief', 'assets/images/thief.png'],
                             ['overseas', 'assets/images/overseas.png'],
                             ['usbImage', 'assets/images/usbImage.png'],
                             ['passportImage', 'assets/images/passportImage.png'],
                             ['gunImage', 'assets/images/gunImage.png'],
                             ['fingerprintImage', 'assets/images/fingerprintImage.png'],
                             ['prison', 'assets/images/prison.png'],
                             ['prisonMale', 'assets/images/prisonMale.png'],
                             ['prisonFemale', 'assets/images/prisonFemale.png'],


	                    ],
            'spritesheet': [
                            ['gunSprite', 'assets/images/gunSprite.png', 52, 39, 5],
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