
function renderMonsters() 
{
    monsterActive.forEach(monster =>
    {
        monsterAnimation(monster);
        monsterKillCounter(monster);
        monsterOffset(monster);
        monsterCollision(monster);
        monsterSkillUse(monster);
        monsterDraw(monster);
    });
};

function renderBullets() 
{
    bullets.forEach(bullet => 
    {
        bullet.animation();
        bullet.movement();
        bullet.outOfBounds();
        bullet.draw();
    });
};

function renderPlayer() 
{
    player.playerMovement();
    player.playerMovementTeleport();
    player.animation();
    player.updateHealth();
    player.draw();
};

function renderCanvas() 
{
    ctx.drawImage(mapBackground, 0, 0);
};

function renderUserInterface() 
{
    userInterface.instructions();
    userInterface.rounds();
    userInterface.kills();
    userInterface.skills();
    userInterface.healthbar();
};

function animate() 
{
    if (pauseGame) {
        renderCanvas();
        renderPlayer();
        renderMonsters();
        renderBullets();
        renderUserInterface();
    }

    frameCount++;
    animationId = requestAnimationFrame(animate);
};

monsterGenerate();
animate();

function monsterGenerate()
{
    swarmIntervalId = monsterAdd(monsterDatabase[0]);
    archerIntervalId = monsterAdd(monsterDatabase[1]);
    tankIntervalId = monsterAdd(monsterDatabase[2]);
    bossIntervalId = monsterAdd(monsterDatabase[3]);
};

function monsterStopGenerate()
{
    clearInterval(swarmIntervalId);
    clearInterval(archerIntervalId);
    clearInterval(tankIntervalId);
    clearInterval(bossIntervalId);
};

setInterval(userInterface.next, 16);
setInterval(userInterface.win, 16);
setInterval(userInterface.lose, 16);

document.addEventListener("keydown", function (e) 
{
    player.playerEventMovement(e, true);

    switch (e.key) 
    {
        case 'ArrowUp':
            bullets.push(new Bullet(player.x, player.y, "ArrowUp", "img/Sprite-0004.png"));
            break;
        case 'ArrowDown':
            bullets.push(new Bullet(player.x, player.y, "ArrowDown", "img/Sprite-0004.png"));
            break; 
        case 'ArrowLeft':
            bullets.push(new Bullet(player.x, player.y, "ArrowLeft", "img/Sprite-0004.png"));
            break; 
        case 'ArrowRight':
            bullets.push(new Bullet(player.x, player.y, "ArrowRight", "img/Sprite-0004.png"));
            break;
    };
});

document.addEventListener("keyup", function (e) 
{
    player.playerEventMovement(e, false);
});