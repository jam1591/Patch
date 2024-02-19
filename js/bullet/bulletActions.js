Bullet.prototype.animation = function()
{
    if (FRAME_COUNT % ANIMATION_SPEED == 0) {
        this.sprite.currentFrameIndex = (this.sprite.currentFrameIndex + 1) % this.sprite.totalFrames;
    };
};

Bullet.prototype.movement = function() 
{
    if      (this.d == "ArrowUp") { this.y -= this.s;}
    else if (this.d == "ArrowDown") { this.y += this.s;}
    else if (this.d == "ArrowLeft") { this.x -= this.s;}
    else if (this.d == "ArrowRight") { this.x += this.s;};
};

Bullet.prototype.outOfBounds = function() 
{
    if(UTILITIES.outOfBounds(this.x, this.y))
    {
        UTILITIES.removeObject(this,PLAYER_BULLETS);
    };
};

Bullet.prototype.draw = function() 
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