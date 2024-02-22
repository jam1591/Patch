function monsterSkillUse(monster) 
{
    for (let i = 0; i < monster.func.length; i++) 
    {
        monster.func[i](monster);
    };
};

function monsterBigger(monster) 
{
    monster.w += 0.05;
    monster.h += 0.05;
    monster.hp += 0.01;
    monster.hpMax += 0.02;
};

function monsterFireArrow(monster) 
{
    if (FRAME_COUNT % ANIMATION_SPEED == 0) 
    {
        monster.arrow.sprite.currentFrameIndex = (monster.arrow.sprite.currentFrameIndex + 1) % monster.arrow.sprite.totalFrames;
    };

    monster.arrow.x += (monster.arrow.vector.nx) * monster.arrow.speed;
    monster.arrow.y += (monster.arrow.vector.ny) * monster.arrow.speed;

    if (UTILITIES.overlapObjects(monster.arrow, PLAYER)) 
    {
        PLAYER.hp -= 1;
    };

    if (!UTILITIES.outOfBounds(monster.arrow.x, monster.arrow.y)) 
    {
        UTILITIES.drawImage(
            monster.arrow.image,
            monster.arrow.sprite.currentFrameIndex * monster.arrow.sprite.frameWidth,
            0,
            monster.arrow.sprite.frameWidth,
            monster.arrow.sprite.frameHeight,
            monster.arrow.x,
            monster.arrow.y,
            monster.arrow.w,
            monster.arrow.h);
    } 
    else 
    {
        monster.arrow.vector = UTILITIES.unitVectorSpecific(
            UTILITIES.relativeSquareCenter(monster.x, monster.w, 7),
            UTILITIES.relativeSquareCenter(monster.y, monster.h, 7),
            UTILITIES.relativeSquareCenter(PLAYER.x, PLAYER.w, monster.arrow.w),
            UTILITIES.relativeSquareCenter(PLAYER.y, PLAYER.h, monster.arrow.h)),
        monster.arrow.x = UTILITIES.relativeSquareCenter(monster.x, monster.w, monster.arrow.w);
        monster.arrow.y = UTILITIES.relativeSquareCenter(monster.y, monster.h, monster.arrow.h);
    };
};

function monsterMovement(monster) 
{
    let vector = UTILITIES.unitVector(PLAYER, monster);

    if (UTILITIES.overlapObjects(monster, PLAYER)) 
    {
        PLAYER.hp -= 0.1;
    };

    if (vector.mag) 
    {
        monster.x += (vector.nx * -1) * monster.speed;
        monster.y += (vector.ny * -1) * monster.speed;
    };
};