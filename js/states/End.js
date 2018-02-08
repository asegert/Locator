var Locator = Locator || {};

Locator.EndState = {
    create: function ()
    {
        if(Locator.gender=='male')
        {
            this.prisoner = this.add.sprite(this.world.centerX, this.world.centerY, 'prisonFemale');
            this.prisoner.anchor.setTo(0.5, 0.5);
        }
        else
        {
            this.prisoner = this.add.sprite(this.world.centerX, this.world.centerY, 'prisonMale');
            this.prisoner.anchor.setTo(0.5, 0.5);
        }
        
        this.add.sprite(0, this.world.centerY - 150, 'prison');
        this.add.sprite(132, this.world.centerY - 150, 'prison');
        
        this.prison = this.add.sprite(this.world.centerX - 129, this.world.centerY - 150, 'prison');
        //this.prison.anchor.setTo(0.5, 0.5);
        this.prison.scale.setTo(0, 1);
        
        this.game.world.camera.position.set(0);
        var slam = this.add.tween(this.prison.scale).to({x:1}, 1500, "Linear", true);
        slam.onComplete.add(function()
        {
            this.game.camera.shake(0.01, 200);
        }, this);
        
        this.add.sprite(572, this.world.centerY - 150, 'prison');
        this.add.sprite(748, this.world.centerY - 150, 'prison');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/