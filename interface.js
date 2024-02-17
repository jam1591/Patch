function UserInterface(){

}

UserInterface.prototype.next = function() {
    if (flagMonstersDefeated() && !menu && rounds.length > 1) {

        pauseGame = false;
        monsterStopGenerate();

        rounds.shift();
        monsterDatabase[0].limit = rounds[0][0];
        monsterDatabase[1].limit = rounds[0][1];
        monsterDatabase[2].limit = rounds[0][2];
        monsterDatabase[3].limit = rounds[0][3];
        
        console.log(rounds)

        htmlInsertDiv("ROUND COMPLETE", "nextRound", "NEXT ROUND");

        button.addEventListener('click', () => {
            roundCount++;
            pauseGame = true;
            menu.parentNode.removeChild(menu);
            menu = null;
            monsterGenerate();
        });
    }
}

UserInterface.prototype.lose = function(){
    if (player.hp <= 0 && !menu) {

        htmlInsertDiv("YOU LOSE", "restart", "PLAY AGAIN");
        player.sprite.currentFrameIndex = 4;
        Object.freeze(player);

        button.addEventListener('click', () => {
            
            location.reload();
        });

    }
}

UserInterface.prototype.win = function(){
    if (flagMonstersDefeated() && !menu && rounds.length <= 1) {

        htmlInsertDiv("YOU WIN", "restart", "PLAY AGAIN");

        button.addEventListener('click', () => {
            location.reload();
        });

    }
}

UserInterface.prototype.instructions = function(){
    ctx.fillStyle = "white";
    ctx.font = '18px Dosis';
    ctx.fillText(`TELEPORT: SPACE`, WIDTH * 0.01, HEIGHT * 0.93);

    ctx.fillStyle = "white";
    ctx.font = '18px Dosis';
    ctx.fillText(`SHOOT: ARROW KEYS`, WIDTH * 0.01, HEIGHT * 0.955);

    ctx.fillStyle = "white";
    ctx.font = '18px Dosis';
    ctx.fillText(`MOVEMENT: WASD`, WIDTH * 0.01, HEIGHT * 0.98);
}

UserInterface.prototype.rounds = function(){
    ctx.fillStyle = "black";
    ctx.font = 'bold 25px Dosis';
    ctx.fillText(`ROUND: ${roundCount+1}`, WIDTH * 0.45, (HEIGHT * 0.01)+25);
}

UserInterface.prototype.kills = function(){
    let swarmImage=  new Image();
    swarmImage.src = monsterDatabase[0].sprite.sheet;

    let archerImage = new Image();
    archerImage.src = monsterDatabase[1].sprite.sheet;

    let tankImage =  new Image();
    tankImage.src = monsterDatabase[2].sprite.sheet;

    let locations = [
        {image: swarmImage, x: 50, y: 60, w: 45, h: 45, killCount: swarmKillCount},
        {image: archerImage, x: 100, y: 110, w: 45, h: 45, killCount: archerKillCount},
        {image: tankImage, x: 150, y: 160, w: 45, h: 45, killCount: tankkillCount}
    ];

    for (let i = 0; i < 3; i++) {
        const monster = monsterDatabase[i];

        utilities.drawImage(
            locations[i].image,
            0 * monster.sprite.frameWidth,
            0,
            monster.sprite.frameWidth,
            monster.sprite.frameHeight,
            WIDTH * 0.01,
            locations[i].y,
            locations[i].w,
            locations[i].h
        );  

        ctx.fillStyle = "black";
        ctx.font = '25px Dosis';
        ctx.fillText(` x: ${locations[i].killCount}`, WIDTH * 0.06, locations[i].y+34);
    
    }
}

UserInterface.prototype.skills = function(){
    const textWidth = ctx.measureText(`${player.teleportCooldownRemaining/1000} sec`).width;

    const image = new Image();
    image.src = "img/teleport.png"

    if(player.teleportCooldownRemaining == 3000 ) {
        ctx.fillStyle = "black";
        ctx.drawImage(image, (WIDTH * 0.47) - 5, (HEIGHT * 0.93) - 18, 60, 60);
    } else {

        ctx.globalAlpha = 0.2;
        ctx.drawImage(image, (WIDTH * 0.47) - 5, (HEIGHT * 0.93) - 18, 60, 60);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect((WIDTH * 0.47) - 5, (HEIGHT * 0.93) - 18, 60, 60);

        ctx.font = '20px Dosis';
        ctx.fillStyle = "white"
        ctx.fillText(`${player.teleportCooldownRemaining/1000} sec`, WIDTH * 0.47, HEIGHT * 0.948);
    }
}

UserInterface.prototype.healthbar = function(){
        //Coordinates
        const healthBarX = WIDTH * 0.01;
        const healthBarY = HEIGHT * 0.01;
        //Size
        const healthBarHeight = 30;
        const redHealthBarWidth = player.hp*2;
    
        //Gradient
        const gradient = ctx.createLinearGradient(healthBarX, healthBarY, healthBarX + redHealthBarWidth,healthBarHeight);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
        ctx.fillStyle = gradient;
    
        //Draw
        utilities.drawSquare(healthBarX-2, healthBarY-2, player.hpMax*2+4, healthBarHeight+4, "black", false);
        utilities.drawSquare(healthBarX, healthBarY, redHealthBarWidth, healthBarHeight, "red", false);
    
        utilities.drawSquare(healthBarX, healthBarY, redHealthBarWidth, healthBarHeight, gradient, false);
    
        ctx.fillStyle = "black";
        ctx.font = '25px Dosis';
        ctx.fillText("LIFE", healthBarX, healthBarY+25);   
}

function flagMonstersDefeated() {
    return monsterDatabase[0].limit == 0 &&
            monsterDatabase[1].limit == 0 &&
            monsterDatabase[2].limit == 0 &&
            monsterDatabase[3].limit == 0 &&
            monsterActive.length == 0 ;
}

function htmlInsertDiv(h1Value, buttonId, buttonValue) {
    let menuDiv = `
        <div id="menu">
            <h1 id="title">${h1Value}</hi>
            <hr>
            <button id="${buttonId}">${buttonValue}</button>
        </div>
    `;

    game.insertAdjacentHTML('beforebegin', menuDiv);
    menu = document.querySelector('#menu');
    button = document.querySelector('#' + buttonId);
}