
function renderMonsters() 
{
    ACTIVE_MONSTERS.forEach(monster =>
    {
        monsterAnimation(monster);
        monsterOffset(monster);
        monsterCollision(monster);
        monsterSkillUse(monster);
        //Will draw monsters and update kill counts.
        monsterDraw(monster);
    });
};

function renderBullets() 
{
    PLAYER_BULLETS.forEach(bullet => 
    {
        bullet.animation();
        bullet.movement();
        bullet.outOfBounds();
        bullet.draw();
    });
};

function renderPlayer() 
{
    PLAYER.playerMovement();
    PLAYER.playerMovementTeleport();
    PLAYER.animation();
    PLAYER.updateHealth();
    PLAYER.draw();
};

function renderCanvas() 
{
    ctx.drawImage(MAP_BACKGROUND, 0, 0);
};

function renderUserInterface() 
{
    USER_INTERFACE.instructions();
    USER_INTERFACE.rounds();
    USER_INTERFACE.kills();
    USER_INTERFACE.skills();
    USER_INTERFACE.healthbar();
};

function animate() 
{
    if (!PAUSE_GAME) 
    {
        renderCanvas();
        renderPlayer();
        renderMonsters();
        renderBullets();
        renderUserInterface();
    };
    FRAME_COUNT++;
    ANIMATION_ID = requestAnimationFrame(animate);
};

function monsterGenerate()
{
    SLIME_INTERVAL_ID = monsterAdd(DATABASE_MONSTERS[0]);
    SQUID_INTERVAL_ID = monsterAdd(DATABASE_MONSTERS[1]);
    STAR_INTERVAL_ID = monsterAdd(DATABASE_MONSTERS[2]);
    HULK_INTERVAL_ID = monsterAdd(DATABASE_MONSTERS[3]);
};

function monsterStopGenerate()
{
    clearInterval(SLIME_INTERVAL_ID);
    clearInterval(SQUID_INTERVAL_ID);
    clearInterval(STAR_INTERVAL_ID);
    clearInterval(HULK_INTERVAL_ID);
};

setInterval(USER_INTERFACE.start, 16);
setInterval(USER_INTERFACE.next, 16);
setInterval(USER_INTERFACE.win, 16);
setInterval(USER_INTERFACE.lose, 16);

document.addEventListener("keydown", function (e) 
{
    PLAYER.playerEventMovement(e, true);

    switch (e.key) 
    {
        case 'ArrowUp':
            PLAYER_BULLETS.push(new Bullet(PLAYER.x, PLAYER.y, "ArrowUp", "img/Sprite-0004.png"));
            break;
        case 'ArrowDown':
            PLAYER_BULLETS.push(new Bullet(PLAYER.x, PLAYER.y, "ArrowDown", "img/Sprite-0004.png"));
            break; 
        case 'ArrowLeft':
            PLAYER_BULLETS.push(new Bullet(PLAYER.x, PLAYER.y, "ArrowLeft", "img/Sprite-0004.png"));
            break; 
        case 'ArrowRight':
            PLAYER_BULLETS.push(new Bullet(PLAYER.x, PLAYER.y, "ArrowRight", "img/Sprite-0004.png"));
            break;
    };
});

document.addEventListener("keyup", function (e) 
{
    PLAYER.playerEventMovement(e, false);
});