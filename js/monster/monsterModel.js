function monsterAdd(database) 
{
    return setInterval(function () 
    {
        if (database.limit > 0) 
        {
            let monster = monsterModel(database);
            var image = new Image;
            monster.sprite.image = image;
            image.src = monster.sprite.sheet; 
            database.limit -= 1;
            ACTIVE_MONSTERS.push(monster);
        };
    }, database.rate);
}

function monsterModel(database) 
{
    let monster = {
        id: database.id,
        hp: database.hp,
        hpMax: database.hpMax,
        func: database.func,
        name: Math.random(),
        x: UTILITIES.getRandomNumber(100,900),
        y: UTILITIES.getRandomNumber(100,900),
        w: database.w,
        h: database.h,
        c: database.c,
        speed: database.speed,
        sprite: {
            sheet: database.sprite.sheet,
            frameWidth: database.sprite.frameWidth,
            frameHeight: database.sprite.frameHeight,
            totalFrames: database.sprite.totalFrames,
            currentFrameIndex: 0,
            opacity: 1}};

    function addArrowModel()
    {
        for (let i = 0; i < monster.func.length; i++) 
        {
            if (monster.func[i].name == "monsterFireArrow") 
            {
                monster.arrow = {
                    x: UTILITIES.relativeSquareCenter(monster.x, monster.w, 7),
                    y: UTILITIES.relativeSquareCenter(monster.y, monster.h, 7),
                    w: 10,
                    h: 10,
                    vector: UTILITIES.unitVectorSpecific(
                        UTILITIES.relativeSquareCenter(monster.x, monster.w, 7),
                        UTILITIES.relativeSquareCenter(monster.y, monster.h, 7),
                        UTILITIES.relativeSquareCenter(PLAYER.x, PLAYER.w, 7),
                        UTILITIES.relativeSquareCenter(PLAYER.y, PLAYER.h, 7)),
                    speed: 3,
                    sprite: {sheet: "img/Sprite-0005.png", frameWidth: 10, frameHeight: 10, totalFrames: 6, currentFrameIndex: 0},
                    image: new Image()};

                monster.arrow.image.src = monster.arrow.sprite.sheet;
            };
        };
    };

    addArrowModel();

    return monster;
};
