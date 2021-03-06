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
                             ['gun', 'assets/images/levels/gun/gun.png'],
                             ['silencerGun', 'assets/images/levels/gun/silencerGun.png'],
                             ['bullet', 'assets/images/levels/gun/bullet.png'],
                             ['fingerprintR', 'assets/images/levels/fingerprint/fingerprintRight.png'],
                             ['fingerprintL', 'assets/images/levels/fingerprint/fingerprintLeft.png'],
                             ['magnify', 'assets/images/levels/fingerprint/magnify.png'],
                             ['passport', 'assets/images/levels/passport/passport.png'],
                             ['passportBlack', 'assets/images/levels/passport/passportBlack.png'],
                             ['globe', 'assets/images/levels/passport/globe.png'],
                             ['usb', 'assets/images/levels/usb/usb.png'],
                             ['usbYellow', 'assets/images/levels/usb/usbYellow.png'],
                             ['virus', 'assets/images/levels/usb/virus.png'],
                             ['folder', 'assets/images/levels/folder/folder.png'],
                             ['folderLB', 'assets/images/levels/folder/folderLBSmall.png'],
                             ['folderLBL', 'assets/images/levels/folder/folderLBLSmall.png'],
                             ['folderLBR', 'assets/images/levels/folder/folderLBRSmall.png'],
                             ['folderLR', 'assets/images/levels/folder/folderLRSmall.png'],
                             ['folderLW', 'assets/images/levels/folder/folderLWSmall.png'],
                             ['folderMB', 'assets/images/levels/folder/folderMBSmall.png'],
                             ['folderMBL', 'assets/images/levels/folder/folderMBLSmall.png'],
                             ['folderMBR', 'assets/images/levels/folder/folderMBRSmall.png'],
                             ['folderMG', 'assets/images/levels/folder/folderMGSmall.png'],
                             ['folderMR', 'assets/images/levels/folder/folderMRSmall.png'],
                             ['folderMW', 'assets/images/levels/folder/folderMWSmall.png'],
                             ['paperclip', 'assets/images/levels/folder/paperclip.png'],
                             ['blondeF', 'assets/images/levels/partner/ladyBlondeSmall.png'],
                             ['whiteF', 'assets/images/levels/partner/ladyWhiteSmall.png'],
                             ['brownF', 'assets/images/levels/partner/ladyBrownSmall.png'],
                             ['blackF', 'assets/images/levels/partner/ladyBlackSmall.png'],
                             ['redF', 'assets/images/levels/partner/ladyRedSmall.png'],
                             ['blondM', 'assets/images/levels/partner/manBlondSmall.png'],
                             ['whiteM', 'assets/images/levels/partner/manWhiteSmall.png'],
                             ['brownM', 'assets/images/levels/partner/manBrownSmall.png'],
                             ['blackM', 'assets/images/levels/partner/manBlackSmall.png'],
                             ['redM', 'assets/images/levels/partner/manRedSmall.png'],
                             ['greyM', 'assets/images/levels/partner/manGreySmall.png'],
                             ['handcuffs', 'assets/images/levels/partner/handcuffs.png'],
                             ['maleContinue', 'assets/images/dockets/maleContinue.png'],
                             ['femaleContinue', 'assets/images/dockets/femaleContinue.png'],
                             ['male', 'assets/images/buttons/maleButton.png'],
                             ['female', 'assets/images/buttons/femaleButton.png'],
                             ['yes', 'assets/images/buttons/yesButton.png'],
                             ['hint', 'assets/images/buttons/hintButton.png'],
                             ['continue', 'assets/images/buttons/continueButton.png'],
                             ['prize', 'assets/images/buttons/prizeButton.png'],
                             ['prison', 'assets/images/prison/prison.png'],
                             ['prisonMale', 'assets/images/prison/prisonMale.png'],
                             ['prisonFemale', 'assets/images/prison/prisonFemale.png'],
                             ['partners', 'assets/images/storyImages/partners.png'],
                             ['thief', 'assets/images/storyImages/thief.png'],
                             ['overseas', 'assets/images/storyImages/overseas.png'],
                             ['usbImage', 'assets/images/storyImages/usbImage.png'],
                             ['passportImage', 'assets/images/storyImages/passportImage.png'],
                             ['gunImage', 'assets/images/storyImages/gunImage.png'],
                             ['fingerprintImage', 'assets/images/storyImages/fingerprintImage.png'],
                             ['folderImage', 'assets/images/storyImages/folderImage.png'],
                             ['commander', 'assets/images/backgrounds/commander.png'],
                             ['prisonCell', 'assets/images/backgrounds/prisonCell.png'],
                             ['bg', 'assets/images/backgrounds/bg.png'],
                             ['gamebg', 'assets/images/backgrounds/gamebg.png']
	                    ],
            'spritesheet': [
                            ['gunSprite', 'assets/images/levels/gun/gunSprite.png', 52, 39, 5],
                            ['folderSpriteLady', 'assets/images/levels/folder/folderSpriteLady.png', 50, 32, 3],
                            ['folderSpriteMan', 'assets/images/levels/folder/folderSpriteMan.png', 50, 32, 3],
	                       ],
            'audio': [
		                    ['jamesBond', ['assets/audio/jamesBond.mp3', 'assets/audio/jamesBond.m4a', 'assets/audio/jamesBond.ogg']],
                            ['doorSlam', ['assets/audio/doorSlam.mp3', 'assets/audio/doorSlam.m4a', 'assets/audio/doorSlam.ogg']],
                            ['spyCaught', ['assets/audio/spyCaught.mp3', 'assets/audio/spyCaught.m4a', 'assets/audio/spyCaught.ogg']],
                            ['spy', ['assets/audio/spy.mp3', 'assets/audio/spy.m4a', 'assets/audio/spy.ogg']]
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
/*
JSON:
rounds-> Holds the data for each game round, each round has...
         standardImage->Holds a male and female version of the standard image
                      ->The standard image is an array holding all the images that populate the board and are not being searched for.
         locateImage->Holds a male and female version of the locate image
                    ->The locate image is a single image that needs to be located in the game.
         locateFunction->Which function should be called when an image is 'located'. The options are rotate, which will rotate the image, colour which switches textures as it will switch colours once textures switch, and spritesheet which will run a spritesheet animation
         params->Holds a male and female version of the parameters
               ->Holds the parameter that would be passed to the locateFunction. Can be null, a spritesheet, or a rotation value
         locateNum->The number of images to locate/be created
         particles->The image to be used by the hint when it emits over a locate Image
         findText->The text displayed at the top of the screen saying what to find.
         hintText->Holds a male and female version of the parameters
                ->Extra text in case more of a hint is needed
         fTextX->'x' position of the find text
         hTextX->'x' position of the hint text
         bg->The background to be used for the round
         board->An array (10 x 10) holding "S" if a standard image should be displayed there or an "L" if a locate image should be displayed there
         storyText->The text displayed during the list in the story refering to the task of the round.
         roundCompleteText->The congratulatory text displayed at the end of the round.
StoryText-> An array with the first spot holding the opening text for the story and the second spot holding the final text to be displayed after the list.
nameM-> The Male Agent's name
nameF-> The Female Agent's name
storySpecs-> Holds the data for the story, the StorySpecs contain...
             mainOffset->Holds the 'x' value for how far to offset the text
             secondaryOffset->Holds the 'x' value for how far to offset the list text
             indentMain->Holds the text value for how far to indent the text
             indentSecondary->Holds the text value for how far to indent the list text
             images->Holds the data for the images displayed during the story
                     line->The line number when the image should be displayed
                     word->The word in said line when image should be displayed
                     x->The image's initial 'x' coordinate
                     y->The image's initial 'y' coordinate
                     image->The image texture
                     rotation->The amount of rotation the image should have when 'thrown' out
             wordDelay->Holds the value for how long to delay between words being printed
             lineDelay->Holds the value for how long to delay between lines being printed


*/


/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/