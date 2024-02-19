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
    monster.hpMax += 0.01;
};

function monsterFireArrow(monster) 
{
    if (frameCount % animSpeed == 0) 
    {
        monster.arrow.sprite.currentFrameIndex = (monster.arrow.sprite.currentFrameIndex + 1) % monster.arrow.sprite.totalFrames;
    };

    monster.arrow.x += (monster.arrow.vector.nx) * monster.arrow.speed;
    monster.arrow.y += (monster.arrow.vector.ny) * monster.arrow.speed;

    if (utilities.overlapObjects(monster.arrow, player)) 
    {
        player.hp -= 1;
    };

    if (!utilities.outOfBounds(monster.arrow.x, monster.arrow.y)) 
    {
        utilities.drawImage(
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
        monster.arrow.vector = utilities.unitVectorSpecific(
            utilities.relativeSquareCenter(monster.x, monster.w, 7),
            utilities.relativeSquareCenter(monster.y, monster.h, 7),
            utilities.relativeSquareCenter(player.x, player.w, monster.arrow.w),
            utilities.relativeSquareCenter(player.y, player.h, monster.arrow.h)),
        monster.arrow.x = utilities.relativeSquareCenter(monster.x, monster.w, monster.arrow.w);
        monster.arrow.y = utilities.relativeSquareCenter(monster.y, monster.h, monster.arrow.h);
    };
};

function monsterMovement(monster) 
{
    let vector = utilities.unitVector(player, monster);

    if (utilities.overlapObjects(monster, player)) 
    {
        player.hp -= 0.1;
    };

    if (vector.mag) 
    {
        monster.x += (vector.nx * -1) * monster.speed;
        monster.y += (vector.ny * -1) * monster.speed;
    };
};