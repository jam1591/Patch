PlayerModel.prototype.playerMovement = function () 
{
    if (this.controls.movement.W && this.y > 0) { this.y -= this.s; };
    if (this.controls.movement.S && this.y < (HEIGHT - this.h)) { this.y += this.s; };
    if (this.controls.movement.A && this.x > 0) { this.x -= this.s; };
    if (this.controls.movement.D && this.x < (WIDTH - this.w)) { this.x += this.s; };
};

PlayerModel.prototype.playerEventMovement = function (e, flag) 
{
    if (e.key == " ") { this.controls.skill.SPACE = flag;};
    if (e.key == "w") { this.controls.movement.W = flag; };
    if (e.key == "s") { this.controls.movement.S = flag; };
    if (e.key == "a") { this.controls.movement.A = flag; };
    if (e.key == "d") { this.controls.movement.D = flag; };
};

PlayerModel.prototype.animation = function() 
{
    if (FRAME_COUNT % ANIMATION_SPEED == 0) 
    {
        this.sprite.currentFrameIndex = (this.sprite.currentFrameIndex + 1) % this.sprite.totalFrames;
    };
};

PlayerModel.prototype.updateHealth = function() 
{
    this.hp = Math.max(0, this.hp);
};

PlayerModel.prototype.draw = function() 
{
    UTILITIES.drawImage(
        this.image,
        this.sprite.currentFrameIndex * this.sprite.frameWidth,
        0,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h);
};

PlayerModel.prototype.playerMovementTeleport = function() 
{
    if (this.abilities.teleport.flag && PLAYER.controls.skill.SPACE) 
    {
        this.abilities.teleport.flag = false;
        if (this.controls.movement.W && this.controls.skill.SPACE) { this.y -= this.abilities.teleport.range; };
        if (this.controls.movement.S && this.controls.skill.SPACE) { this.y += this.abilities.teleport.range; };
        if (this.controls.movement.A && this.controls.skill.SPACE) { this.x -= this.abilities.teleport.range; };
        if (this.controls.movement.D && this.controls.skill.SPACE) { this.x += this.abilities.teleport.range; };
        
        const cooldownInterval = setInterval(() => 
        {
            this.abilities.teleport.cooldownRemaining -= 100;
            if (this.abilities.teleport.cooldownRemaining <= 0) 
            {
                clearInterval(cooldownInterval);
                this.abilities.teleport.flag = true;
                this.abilities.teleport.cooldownRemaining = this.abilities.teleport.cooldown;
            };
        }
        , 100);
    }
};