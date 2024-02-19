function Bullet(x, y, d, sheet) 
{
    this.w = 10,
    this.h = 10,
    this.attack = 3,
    this.x = utilities.relativeSquareCenter(x, player.w, this.w),
    this.y = utilities.relativeSquareCenter(y, player.h, this.h),
    this.s = 4,
    this.d = d,
    this.sprite = { frameWidth: 10, frameHeight: 10, totalFrames: 6, currentFrameIndex: 0},
    this.image = new Image(),
    this.image.src = sheet
};