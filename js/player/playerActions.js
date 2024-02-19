PlayerModel.prototype.playerMovement = function () 
{
    if (this.W && this.y > 0) { this.y -= this.s; };
    if (this.S && this.y < (HEIGHT - this.h)) { this.y += this.s; };
    if (this.A && this.x > 0) { this.x -= this.s; };
    if (this.D && this.x < (WIDTH - this.w)) { this.x += this.s; };
};

PlayerModel.prototype.playerEventMovement = function (e, flag) 
{
    if (e.key == " ") { this.SPACE = flag;};
    if (e.key == "w") { this.W = flag; };
    if (e.key == "s") { this.S = flag; };
    if (e.key == "a") { this.A = flag; };
    if (e.key == "d") { this.D = flag; };
};

PlayerModel.prototype.animation = function() 
{
    if (frameCount % animSpeed == 0) 
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
    utilities.drawImage(
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

PlayerModel.prototype.playerMovementTeleport = function () 
{
        if (this.teleportFlag && player.SPACE) 
        {
            this.teleportFlag = false;
            if (this.W && this.SPACE) { this.y -= this.teleportRange; };
            if (this.S && this.SPACE) { this.y += this.teleportRange; };
            if (this.A && this.SPACE) { this.x -= this.teleportRange; };
            if (this.D && this.SPACE) { this.x += this.teleportRange; };
           
            const cooldownInterval = setInterval(() => 
            {
                this.teleportCooldownRemaining -= 100;
                if (this.teleportCooldownRemaining <= 0) 
                {
                    clearInterval(cooldownInterval);
                    this.teleportFlag = true;
                    this.teleportCooldownRemaining = this.teleportCooldown;
                };
            }
            , 100);
        }
};