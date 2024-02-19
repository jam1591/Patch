function Bullet(x, y, d, sheet) 
{
    this.w = 10,
    this.h = 10,
    this.attack = 3,
    this.x = UTILITIES.relativeSquareCenter(x, PLAYER.w, this.w),
    this.y = UTILITIES.relativeSquareCenter(y, PLAYER.h, this.h),
    this.s = 4,
    this.d = d,
    this.sprite = { 
        frameWidth: 10, 
        frameHeight: 10, 
        totalFrames: 6, 
        currentFrameIndex: 0},
    this.image = new Image(),
    this.image.src = sheet
};