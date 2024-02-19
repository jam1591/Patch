function monsterCollision(monster) 
{
    PLAYER_BULLETS.forEach(bullet => {
        if(UTILITIES.overlapObjects(monster, bullet))
        {
            UTILITIES.removeObject(bullet, PLAYER_BULLETS);
            monster.hp -= Number(bullet.attack);
        };
    });
};

function monsterOffset(monster) 
{
    for (let i = 0; i < ACTIVE_MONSTERS.length; i++) 
    {
        if ((monster.name != ACTIVE_MONSTERS[i].name)) 
        {
            if (UTILITIES.overlapObjects(monster, ACTIVE_MONSTERS[i])) 
            {
                const vector = UTILITIES.unitVector(monster, ACTIVE_MONSTERS[i]);
                if (vector.mag < monster.w) 
                {
                    const angle = Math.atan2(vector.dy, vector.dx);
                    const targetX = ACTIVE_MONSTERS[i].x + Math.cos(angle) * monster.w;
                    const targetY = ACTIVE_MONSTERS[i].y + Math.sin(angle) * monster.h;
                    monster.x = targetX;
                    monster.y = targetY;
                };
            };
        };
    };
};

function monsterKillCounter(monsterId) 
{
    switch (monsterId) 
    {
        case 0:
            SLIME_KILL_COUNT++;
            break;
        case 1:
            SQUID_KILL_COUNT++;
            break;
        case 2:
            STAR_KILL_COUNT++;
            break;
        case 3:
            HULK_KILL_COUNT++;
            break;
    };
};

function monsterAnimation(monster)
{
    if (FRAME_COUNT % ANIMATION_SPEED == 0) 
    {
        monster.sprite.currentFrameIndex = (monster.sprite.currentFrameIndex + 1) % monster.sprite.totalFrames;
    };
};

function monsterDraw(monster)
{
    if (monster.hp <= 0)
    {
        Object.freeze(monster);
        monster.sprite.opacity -= MONSTER_FADE_ON_DEATH;
        
        UTILITIES.drawImageOpacity(monster, monster.sprite.opacity);

        if(monster.sprite.opacity <= 0.01)
        {
            monsterKillCounter(monster.id);
            UTILITIES.removeObject(monster, ACTIVE_MONSTERS) 
        };
    }
    else if (monster.hp > 0)
    {
        UTILITIES.drawImage(
            monster.sprite.image,
            monster.sprite.currentFrameIndex * monster.sprite.frameWidth,
            0,
            monster.sprite.frameWidth,
            monster.sprite.frameHeight,
            monster.x,
            monster.y,
            monster.w,
            monster.h);
    };
};