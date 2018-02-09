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
                             ['fingerprintR', 'assets/images/fingerprintRight.png'],
                             ['fingerprintL', 'assets/images/fingerprintLeft.png'],
                             ['magnify', 'assets/images/magnify.png'],
                             ['passport', 'assets/images/passport.png'],
                             ['passportBlack', 'assets/images/passportBlack.png'],
                             ['globe', 'assets/images/globe.png'],
                             ['usb', 'assets/images/usb.png'],
                             ['usbYellow', 'assets/images/usbYellow.png'],
                             ['virus', 'assets/images/virus.png'],
                             ['folder', 'assets/images/folder.png'],
                             ['folderLB', 'assets/images/folderLBSmall.png'],
                             ['folderLBL', 'assets/images/folderLBLSmall.png'],
                             ['folderLBR', 'assets/images/folderLBRSmall.png'],
                             ['folderLR', 'assets/images/folderLRSmall.png'],
                             ['folderLW', 'assets/images/folderLWSmall.png'],
                             ['folderMB', 'assets/images/folderMBSmall.png'],
                             ['folderMBL', 'assets/images/folderMBLSmall.png'],
                             ['folderMBR', 'assets/images/folderMBRSmall.png'],
                             ['folderMG', 'assets/images/folderMGSmall.png'],
                             ['folderMR', 'assets/images/folderMRSmall.png'],
                             ['folderMW', 'assets/images/folderMWSmall.png'],
                             ['paperclip', 'assets/images/paperclip.png'],
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
                             ['handcuffs', 'assets/images/handcuffs.png'],
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
                             ['folderImage', 'assets/images/folderImage.png'],
                             ['prison', 'assets/images/prison.png'],
                             ['prisonMale', 'assets/images/prisonMale.png'],
                             ['prisonFemale', 'assets/images/prisonFemale.png'],
                             ['prisonCell', 'assets/images/prisonCell.png'],
                             ['bg', 'assets/images/bg.png'],
                             ['circle', 'assets/images/circle.png'],
                             ['maleContinue', 'assets/images/maleContinue.png'],
                             ['femaleContinue', 'assets/images/femaleContinue.png'],
	                    ],
            'spritesheet': [
                            ['gunSprite', 'assets/images/gunSprite.png', 52, 39, 5],
                            ['folderSpriteLady', 'assets/images/folderSpriteLady.png', 50, 32, 3],
                            ['folderSpriteMan', 'assets/images/folderSpriteMan.png', 50, 32, 3],
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