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
            F: false,
            E: false}},
    this.abilities = {
        teleport: {
            image: new Image(),
            sheet: "img/teleport.png",
            range: 100,
            cooldown: 3000,
            cooldownRemaining: 3000,
            flag: true,
            ui:{
                x: WIDTH * 0.43,
                y: HEIGHT * 0.93,
                w: 60,
                h: 60
            }},
        heal: {
            image: new Image(),
            sheet: "img/heal.png",
            value: 30,
            cooldown: 30000,
            cooldownRemaining: 30000,
            flag: true,
            ui: {
                x: WIDTH * 0.43 + 65,
                y: HEIGHT * 0.93,
                w: 60,
                h: 60
            }},
        run: {
            image: new Image(),
            sheet: "img/run.png",
            value: 2,
            duration: 1000,
            durationRemaining: 1000,
            cooldown: 4000,
            cooldownRemaining: 4000,
            flag: true,
            ui: {
                x: WIDTH * 0.43 + 130,
                y: HEIGHT * 0.93,
                w: 60,
                h: 60
            }}}
    this.sprite = {
        frameWidth: 48,
        frameHeight: 48,
        totalFrames: 8,
        currentFrameIndex: 0},
    this.image = new Image(),
    this.image.src = sheet
};