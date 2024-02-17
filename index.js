//Div that contains game canvas.
const game = document.querySelector('#game');

//Canvas stuff.
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width = 1000;
const HEIGHT = canvas.height = 1000;

//As Rounds change these will mutaute as I want to reset them.
let button;
let menu;

//Lists to store game data.
const monsterActive = [];
const bullets = [];

//As rounds change I want to mutate these intervals.
let swarmIntervalId;
let archerIntervalId;
let tankIntervalId;
let animationId;

let swarmKillCount = 0;
let archerKillCount = 0;
let tankkillCount = 0;

//While true canvas will continue to render.
let pauseGame = true;

//Animation and round counters.
let frameCount = 0;
let roundCount = 0;
const animSpeed = 16;

//Actors
const userInterface = new UserInterface();
const utilities = new Utilities();
const player = new PlayerModel(utilities.relativeSquareCenter(0, WIDTH, 25), utilities.relativeSquareCenter(0, HEIGHT, 25), 50, 50, "lightgray", 1, "img/Sprite-0003.png");


//Monster numbers for each round.
let rounds = [];

for (let i = 0; i < 5; i++) {
    const swarm = utilities.getRandomNumber(10, 20);
    const archer = utilities.getRandomNumber(1, 5);
    const tank = utilities.getRandomNumber(1, 5);
    const boss = 0;
    const array = [swarm, archer, tank, boss];
    rounds.push(array);
}

//Monster database.
const monsterDatabase = [
    {
        id: 0,
        sprite: {
            sheet: "img/Sprite-0002.png",
            frameWidth: 48,
            frameHeight: 26,
            totalFrames: 6,
            currentFrameIndex: 0
        },
        label: "Swarm",
        speed: 0.8,
        hp: 8,
        hpMax: 10,
        c: "red",
        w: 40,
        h: 40,
        rate: 1000,
        func: [monsterMovement],
        limit: rounds[0][0]
    },
    {
        id: 1,
        sprite: {
            sheet: "img/Sprite-0001.png",
            frameWidth: 48,
            frameHeight: 48,
            totalFrames: 6,
            currentFrameIndex: 0
        },
        hp:
            8,
        hpMax: 8,
        label: "Archer",
        speed: 0,
        c: "blue",
        w: 80,
        h: 80,
        rate: 2500,
        func: [monsterFireArrow],
        limit: rounds[0][1]
    },
    {
        id: 2,
        sprite: {
            sheet: "img/Sprite-0006.png",
            frameWidth: 80,
            frameHeight: 80,
            totalFrames: 10,
            currentFrameIndex: 0
        },
        hp: 15,
        hpMax: 15,
        label: "Tank",
        speed: 0.50,
        c: "green",
        w: 80,
        h: 80,
        rate: 4500,
        func: [monsterBigger, monsterMovement],
        limit: rounds[0][2]
    },
    {
        id: 3,
        hp: 20,
        label: "Boss",
        speed: 1.5,
        c: "purple",
        w: 150,
        h: 150,
        rate: 10000,
        func: [monsterFireArrow, monsterBigger, monsterMovement],
        limit: rounds[0][3]
    }
]

function renderMonsters() {
    monsterActive.forEach(function (monster) {

        if (frameCount % animSpeed == 0) {
            monster.sprite.currentFrameIndex = (monster.sprite.currentFrameIndex + 1) % monster.sprite.totalFrames;
        }

        if (monster.hp <= 0) {
            utilities.removeObject(monster, monsterActive);
            switch (monster.id) {
                case 0:
                    swarmKillCount++;
                    break;
                case 1:
                    archerKillCount++;
                    break;
                case 2:
                    tankkillCount++;
                    break;
            }

            return;
        }

        monsterOffset(monster);
        monsterCollision(monster);

        //Monster skills.
        for (let i = 0; i < monster.func.length; i++) {
            monster.func[i](monster);
        }

        //Draw monster.
        utilities.drawImage(
            monster.sprite.image,
            monster.sprite.currentFrameIndex * monster.sprite.frameWidth,
            0,
            monster.sprite.frameWidth,
            monster.sprite.frameHeight,
            monster.x,
            monster.y,
            monster.w,
            monster.h
        );
    })
}

function renderBullets() {
    bullets.forEach(bullet => {
        bullet.animation();
        bullet.movement();
        bullet.outOfBounds();
        bullet.draw();
    });
}

function renderPlayer() {
    player.playerMovement();
    player.playerMovementTeleport();
    player.animation();
    player.updateHealth();
    player.draw();
}

function renderCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    //Draw map
    const mapBackground = new Image();
    mapBackground.src = "img/map.png";
    ctx.drawImage(mapBackground, 0, 0);
}

function renderUserInterface() {
    userInterface.instructions();
    userInterface.rounds();
    userInterface.kills();
    userInterface.skills();
    userInterface.healthbar();
}

function animate() {

    if (pauseGame) {
        renderCanvas();
        renderPlayer();
        renderMonsters();
        renderBullets();
        renderUserInterface();
    }

    frameCount++;
    animationId = requestAnimationFrame(animate);
}

monsterGenerate();
animate();

setInterval(userInterface.next, 16);
setInterval(userInterface.win, 16);
setInterval(userInterface.lose, 16);

document.addEventListener("keydown", function (e) {
    player.playerEventMovement(e, true);

    switch (e.key) {
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
    }
});

document.addEventListener("keyup", function (e) {
    player.playerEventMovement(e, false);
});