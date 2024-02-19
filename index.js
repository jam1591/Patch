const game = document.querySelector('#game');

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width = 1000;
const HEIGHT = canvas.height = 1000;

//As Rounds change these will mutaute as I want to reset them.
let button;
let menu;

const monsterActive = [];
const bullets = [];

//As rounds change I want to mutate these intervals.
let swarmIntervalId;
let archerIntervalId;
let tankIntervalId;
let bossIntervalId;
let animationId;

let swarmKillCount = 0;
let archerKillCount = 0;
let tankkillCount = 0;
let bosskillCount = 0;

let pauseGame = true;

let frameCount = 0;
let roundCount = 0;
const animSpeed = 16;

//Actors
const userInterface = new UserInterface();
const utilities = new Utilities();
const player = new PlayerModel(
    utilities.relativeSquareCenter(0, WIDTH, 25), 
    utilities.relativeSquareCenter(0, HEIGHT, 25), 
    50, 
    50, 
    "lightgray", 
    1.2, 
    "img/Sprite-0003.png");

let rounds = []

for (let i = 0; i < 5; i++) 
{
    const swarm = utilities.getRandomNumber(10, 15);
    const archer = utilities.getRandomNumber(1, 3);
    const tank = utilities.getRandomNumber(1, 3);
    const boss = utilities.getRandomNumber(0, 2);

    const array = [swarm, archer, tank, boss];
    rounds.push(array);
};

const monsterDatabase = [
    {
        id: 0,
        sprite: { sheet: "img/Sprite-0002.png", frameWidth: 48, frameHeight: 26, totalFrames: 6, currentFrameIndex: 0},
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
        sprite: { sheet: "img/Sprite-0001.png", frameWidth: 48, frameHeight: 48, totalFrames: 6, currentFrameIndex: 0},
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
        sprite: { sheet: "img/Sprite-0006.png", frameWidth: 80, frameHeight: 80, totalFrames: 10, currentFrameIndex: 0},
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
        sprite: { sheet: "img/Sprite-0008.png", frameWidth: 150, frameHeight: 150, totalFrames: 9, currentFrameIndex: 0},
        hp: 25,
        label: "Boss",
        speed: 0.8,
        c: "purple",
        w: 100,
        h: 100,
        rate: 8000,
        func: [monsterFireArrow,monsterMovement],
        limit: rounds[0][3]
    }];
    
let swarmImage=  new Image();
swarmImage.src = monsterDatabase[0].sprite.sheet;

let archerImage = new Image();
archerImage.src = monsterDatabase[1].sprite.sheet;

let tankImage =  new Image();
tankImage.src = monsterDatabase[2].sprite.sheet;

let bossImage =  new Image();
bossImage.src = monsterDatabase[3].sprite.sheet;

const mapBackground = new Image();
mapBackground.src = "img/map.png";

const image = new Image();
image.src = "img/teleport.png";