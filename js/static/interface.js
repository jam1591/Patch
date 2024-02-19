function UserInterface()
{

};

UserInterface.prototype.next = function() 
{
    if (flagMonstersDefeated() && !MENU && ROUNDS.length > 1) 
    {
        PAUSE_GAME = false;
        monsterStopGenerate();

        ROUNDS.shift();
        DATABASE_MONSTERS[0].limit = ROUNDS[0][0];
        DATABASE_MONSTERS[1].limit = ROUNDS[0][1];
        DATABASE_MONSTERS[2].limit = ROUNDS[0][2];
        DATABASE_MONSTERS[3].limit = ROUNDS[0][3];
        
        htmlInsertDiv("ROUND COMPLETE", "nextRound", "NEXT ROUND");

        BUTTON.addEventListener('click', () => 
        {
            CURRENT_ROUND++;
            PAUSE_GAME = true;
            MENU.parentNode.removeChild(MENU);
            MENU = null;
            monsterGenerate();
        });
    };
};

UserInterface.prototype.lose = function()
{
    if (PLAYER.hp <= 0 && !MENU) 
    {
        htmlInsertDiv("YOU LOSE", "restart", "PLAY AGAIN");
        PLAYER.sprite.currentFrameIndex = 4;
        Object.freeze(PLAYER);
        BUTTON.addEventListener('click', () => 
        {
            location.reload();
        });
    };
};

UserInterface.prototype.win = function()
{
    if (flagMonstersDefeated() && !MENU && ROUNDS.length <= 1)
    {
        htmlInsertDiv("YOU WIN", "restart", "PLAY AGAIN");
        BUTTON.addEventListener('click', () => 
        {
            location.reload();
        });
    };
};

UserInterface.prototype.instructions = function()
{
    ctx.fillStyle = "white";
    ctx.font = '18px Dosis';
    ctx.fillText(`TELEPORT: SPACE`, WIDTH * 0.01, HEIGHT * 0.93);

    ctx.fillStyle = "white";
    ctx.font = '18px Dosis';
    ctx.fillText(`SHOOT: ARROW KEYS`, WIDTH * 0.01, HEIGHT * 0.955);

    ctx.fillStyle = "white";
    ctx.font = '18px Dosis';
    ctx.fillText(`MOVEMENT: WASD`, WIDTH * 0.01, HEIGHT * 0.98);
};

UserInterface.prototype.rounds = function()
{
    ctx.fillStyle = "black";
    ctx.font = 'bold 25px Dosis';
    ctx.fillText(`ROUND: ${CURRENT_ROUND}`, WIDTH * 0.45, (HEIGHT * 0.01)+25);
};

UserInterface.prototype.kills = function()
{
    let locations = [
        {image: SLIME_LOGO_IMAGE, x: 50, y: 50, w: 45, h: 45, killCount: SLIME_KILL_COUNT},
        {image: SQUID_LOGO_IMAGE, x: 100, y: 100, w: 45, h: 45, killCount: SQUID_KILL_COUNT},
        {image: STAR_LOGO_IMAGE, x: 150, y: 150, w: 45, h: 45, killCount: STAR_KILL_COUNT},
        {image: HULK_LOGO_IMAGE, x: 200, y: 200, w: 45, h: 45, killCount: HULK_KILL_COUNT}];

    for (let i = 0; i < 4; i++) 
    {
        const monster = DATABASE_MONSTERS[i];

        UTILITIES.drawImage(
            locations[i].image,
            0 * monster.sprite.frameWidth,
            0,
            monster.sprite.frameWidth,
            monster.sprite.frameHeight,
            WIDTH * 0.01,
            locations[i].y,
            locations[i].w,
            locations[i].h);  

        ctx.fillStyle = "black";
        ctx.font = '25px Dosis';
        ctx.fillText(` x: ${locations[i].killCount}`, WIDTH * 0.06, locations[i].y+34);
    };
};

UserInterface.prototype.skills = function()
{
    if(PLAYER.abilities.teleport.cooldownRemaining == 3000 ) 
    {
        ctx.fillStyle = "black";
        ctx.drawImage(PLAYER_SKILL_TELEPORT, (WIDTH * 0.47) - 5, (HEIGHT * 0.93) - 18, 60, 60);
    } 
    else 
    {
        ctx.globalAlpha = 0.2;
        ctx.drawImage(PLAYER_SKILL_TELEPORT, (WIDTH * 0.47) - 5, (HEIGHT * 0.93) - 18, 60, 60);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect((WIDTH * 0.47) - 5, (HEIGHT * 0.93) - 18, 60, 60);

        ctx.font = '20px Dosis';
        ctx.fillStyle = "white"
        ctx.fillText(`${PLAYER.abilities.teleport.cooldownRemaining/1000} sec`, WIDTH * 0.47, HEIGHT * 0.948);
    };
};

UserInterface.prototype.healthbar = function()
{
    const healthBarX = WIDTH * 0.01;
    const healthBarY = HEIGHT * 0.01;

    const healthBarHeight = 30;
    const redHealthBarWidth = PLAYER.hp*2;

    const gradient = ctx.createLinearGradient(healthBarX, healthBarY, healthBarX + redHealthBarWidth,healthBarHeight);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
    ctx.fillStyle = gradient;

    UTILITIES.drawSquare(healthBarX-2, healthBarY-2, PLAYER.hpMax*2+4, healthBarHeight+4, "black", false);
    UTILITIES.drawSquare(healthBarX, healthBarY, redHealthBarWidth, healthBarHeight, "red", false);

    UTILITIES.drawSquare(healthBarX, healthBarY, redHealthBarWidth, healthBarHeight, gradient, false);

    ctx.fillStyle = "black";
    ctx.font = '25px Dosis';
    ctx.fillText("LIFE", healthBarX, healthBarY+25);   
};

function flagMonstersDefeated() 
{
    return DATABASE_MONSTERS[0].limit == 0 &&
        DATABASE_MONSTERS[1].limit == 0 &&
        DATABASE_MONSTERS[2].limit == 0 &&
        DATABASE_MONSTERS[3].limit == 0 &&
        ACTIVE_MONSTERS.length == 0;
};

function htmlInsertDiv(h1Value, buttonId, buttonValue) 
{
    let menuDiv = `
        <div id="menu">
            <h1 id="title">${h1Value}</hi>
            <hr>
            <button id="${buttonId}">${buttonValue}</button>
        </div>
    `;

    GAME.insertAdjacentHTML('beforebegin', menuDiv);
    MENU = document.querySelector('#menu');
    BUTTON = document.querySelector('#' + buttonId);
};