function PlayerModel(x, y, w, h, c, s, sheet) 
{
    this.x = x,
    this.y = y,
    this.hp = 100,
    this.hpMax = 100,
    this.w = w,
    this.h = h,
    this.c = c,
    this.s = s,
    this.controls = {
        movement: {
            W: false,
            S: false,
            A: false,
            D: false},
        skill: {
            SPACE: false,
            F: false}},
    this.abilities = {
        teleport: {
            range: 100,
            cooldown: 3000,
            cooldownRemaining: 3000,
            flag: true}},
    this.sprite = {
        frameWidth: 48,
        frameHeight: 48,
        totalFrames: 8,
        currentFrameIndex: 0},
    this.image = new Image(),
    this.image.src = sheet
};