function PlayerModel(x, y, w, h, c, s, sheet) {
    this.x = x,
        this.y = y,
        this.hp = 100
        this.hpMax = 100
        this.w = w,
        this.h = h,
        this.c = c,
        this.s = s,
        this.W = false,
        this.S = false,
        this.A = false,
        this.D = false,
        this.SPACE = false,
        this.shootFlag = true,
        this.shootCooldown = 500,
        this.teleportRange = 100,
        this.teleportCooldown = 3000,
        this.teleportFlag = true,
        this.teleportCooldownRemaining = 3000,
        this.sprite = {
            frameWidth: 48,
            frameHeight: 48,
            totalFrames: 8,
            currentFrameIndex: 0
        },
        this.image = new Image(),
        this.image.src = sheet
}