const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const GAME = document.querySelector('#game');
const WIDTH = canvas.width = 1000;
const HEIGHT = canvas.height = 1000;

//As rounds change these will mutaute as I want to reset them.
let BUTTON;
let MENU;

const ACTIVE_MONSTERS = [];
const PLAYER_BULLETS = [];

//As rounds change I want to mutate these intervals nad counts.
let SLIME_INTERVAL_ID;
let SQUID_INTERVAL_ID;
let STAR_INTERVAL_ID;
let HULK_INTERVAL_ID;

let ANIMATION_ID;

let SLIME_KILL_COUNT = 0;
let SQUID_KILL_COUNT = 0;
let STAR_KILL_COUNT = 0;
let HULK_KILL_COUNT = 0;

const MONSTER_FADE_ON_DEATH = 0.005; 

let PAUSE_GAME = false;
let START_GAME = false;

let FRAME_COUNT = 0;
let CURRENT_ROUND = 1;
const ANIMATION_SPEED = 16;

//Actors
const USER_INTERFACE = new UserInterface();
const UTILITIES = new Utilities();
const PLAYER = new PlayerModel(
    UTILITIES.relativeSquareCenter(0, WIDTH, 25), 
    UTILITIES.relativeSquareCenter(0, HEIGHT, 25), 
    50, 
    50, 
    "lightgray", 
    1.2, 
    "img/Sprite-0003.png");

let ROUNDS = []

for (let i = 0; i < 5; i++) 
{
    const swarm = UTILITIES.getRandomNumber(10, 15);
    const archer = UTILITIES.getRandomNumber(1, 3);
    const tank = UTILITIES.getRandomNumber(1, 3);
    const boss = UTILITIES.getRandomNumber(0, 2);
    const array = [swarm, archer, tank, boss];
    ROUNDS.push(array);
};

const DATABASE_MONSTERS = [
    {
        id: 0,
        sprite: { 
            sheet: "img/Sprite-0002.png", 
            frameWidth: 48, 
            frameHeight: 26, 
            totalFrames: 6, 
            currentFrameIndex: 0},
        speed: 0.8,
        hp: 8,
        hpMax: 10,
        w: 40,
        h: 40,
        rate: 1000,
        func: [monsterMovement],
        limit: ROUNDS[0][0]
    },
    {
        id: 1,
        sprite: { 
            sheet: "img/Sprite-0001.png", 
            frameWidth: 48, 
            frameHeight: 48, 
            totalFrames: 6, 
            currentFrameIndex: 0},
        speed: 0,
        hp: 8,
        hpMax: 8,
        w: 80,
        h: 80,
        rate: 2500,
        func: [monsterFireArrow],
        limit: ROUNDS[0][1]
    },
    {
        id: 2,
        sprite: { 
            sheet: "img/Sprite-0006.png", 
            frameWidth: 80, 
            frameHeight: 80, 
            totalFrames: 10, 
            currentFrameIndex: 0},
        speed: 0.50,
        hp: 15,
        hpMax: 15,
        w: 80,
        h: 80,
        rate: 4500,
        func: [monsterBigger, monsterMovement],
        limit: ROUNDS[0][2]
    },
    {
        id: 3,
        sprite: { 
            sheet: "img/Sprite-0008.png", 
            frameWidth: 150, 
            frameHeight: 150, 
            totalFrames: 9, 
            currentFrameIndex: 0},
        speed: 0.8,
        hp: 25,
        hpMax: 25,
        w: 100,
        h: 100,
        rate: 8000,
        func: [monsterFireArrow,monsterMovement],
        limit: ROUNDS[0][3]
    }];
    
let SLIME_LOGO_IMAGE=  new Image();
SLIME_LOGO_IMAGE.src = DATABASE_MONSTERS[0].sprite.sheet;

let SQUID_LOGO_IMAGE = new Image();
SQUID_LOGO_IMAGE.src = DATABASE_MONSTERS[1].sprite.sheet;

let STAR_LOGO_IMAGE =  new Image();
STAR_LOGO_IMAGE.src = DATABASE_MONSTERS[2].sprite.sheet;

let HULK_LOGO_IMAGE =  new Image();
HULK_LOGO_IMAGE.src = DATABASE_MONSTERS[3].sprite.sheet;

const MAP_BACKGROUND = new Image();
MAP_BACKGROUND.src = "img/map.png";

const PLAYER_SKILL_TELEPORT = new Image();
PLAYER_SKILL_TELEPORT.src = "img/teleport.png";