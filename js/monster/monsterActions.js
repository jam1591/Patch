<<<<<<< HEAD
function monsterCollision(monster) 
{
    bullets.forEach(bullet => {
        if(utilities.overlapObjects(monster, bullet))
        {
            utilities.removeObject(bullet, bullets);
            monster.hp -= Number(bullet.attack);
        };
    });
};

function monsterOffset(monster) 
{
    for (let i = 0; i < monsterActive.length; i++) 
    {
        if ((monster.name != monsterActive[i].name)) 
        {
            if (monster.id == 1 || monster.id == 0 || monster.id == 2) 
            {
                if (utilities.overlapObjects(monster, monsterActive[i])) 
                {
                    const vector = utilities.unitVector(monster, monsterActive[i]);
                    if (vector.mag < monster.w) 
                    {
                        const angle = Math.atan2(vector.dy, vector.dx);
                        const targetX = monsterActive[i].x + Math.cos(angle) * monster.w;
                        const targetY = monsterActive[i].y + Math.sin(angle) * monster.h;
                        monster.x = targetX;
                        monster.y = targetY;
                    };
                };
            };
        };
    };
};

function monsterKillCounter(monster) 
{
    if (monster.hp <= 0) 
    {
        utilities.removeObject(monster, monsterActive);
        switch (monster.id) 
        {
            case 0:
                swarmKillCount++;
                break;
            case 1:
                archerKillCount++;
                break;
            case 2:
                tankkillCount++;
                break;
        };
    };
};

function monsterAnimation(monster)
{
    if (frameCount % animSpeed == 0) 
    {
        monster.sprite.currentFrameIndex = (monster.sprite.currentFrameIndex + 1) % monster.sprite.totalFrames;
    };
};

function monsterDraw(monster)
{
    utilities.drawImage(
        monster.sprite.image,
        monster.sprite.currentFrameIndex * monster.sprite.frameWidth,
        0,
        monster.sprite.frameWidth,
        monster.sprite.frameHeight,
        monster.x,
        monster.y,
        monster.w,
        monster.h);
=======
function monsterCollision(monster) 
{
    bullets.forEach(bullet => {
        if(utilities.overlapObjects(monster, bullet))
        {
            utilities.removeObject(bullet, bullets);
            monster.hp -= Number(bullet.attack);
        };
    });
};

function monsterOffset(monster) 
{
    for (let i = 0; i < monsterActive.length; i++) 
    {
        if ((monster.name != monsterActive[i].name)) 
        {
            if (monster.id == 1 || monster.id == 0 || monster.id == 2) 
            {
                if (utilities.overlapObjects(monster, monsterActive[i])) 
                {
                    const vector = utilities.unitVector(monster, monsterActive[i]);
                    if (vector.mag < monster.w) 
                    {
                        const angle = Math.atan2(vector.dy, vector.dx);
                        const targetX = monsterActive[i].x + Math.cos(angle) * monster.w;
                        const targetY = monsterActive[i].y + Math.sin(angle) * monster.h;
                        monster.x = targetX;
                        monster.y = targetY;
                    };
                };
            };
        };
    };
};

function monsterKillCounter(monster) 
{
    if (monster.hp <= 0) 
    {
        utilities.removeObject(monster, monsterActive);
        switch (monster.id) 
        {
            case 0:
                swarmKillCount++;
                break;
            case 1:
                archerKillCount++;
                break;
            case 2:
                tankkillCount++;
                break;
        };
    };
};

function monsterAnimation(monster)
{
    if (frameCount % animSpeed == 0) 
    {
        monster.sprite.currentFrameIndex = (monster.sprite.currentFrameIndex + 1) % monster.sprite.totalFrames;
    };
};

function monsterDraw(monster)
{
    utilities.drawImage(
        monster.sprite.image,
        monster.sprite.currentFrameIndex * monster.sprite.frameWidth,
        0,
        monster.sprite.frameWidth,
        monster.sprite.frameHeight,
        monster.x,
        monster.y,
        monster.w,
        monster.h);
>>>>>>> fd24cd875dafc6603a962917eca47c7fdc82cb5e
};