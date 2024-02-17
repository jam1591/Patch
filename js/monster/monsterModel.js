function monsterModel(database) {
    let monster = {
        id: database.id,
        hp: database.hp,
        hpMax: database.hpMax,
        func: database.func,
        name: Math.random(),
        x: Math.floor(Math.random() * (WIDTH - 40)) + 40,
        y: Math.floor(Math.random() * (HEIGHT- 40)) + 40,
        w: database.w,
        h: database.h,
        c: database.c,
        speed: database.speed,
        sprite: {
            sheet: database.sprite.sheet,
            frameWidth: database.sprite.frameWidth,
            frameHeight: database.sprite.frameHeight,
            totalFrames: database.sprite.totalFrames,
            currentFrameIndex: 0
        }
    };

    function addArrowModel(){
        for (let i = 0; i < monster.func.length; i++) {
            if (monster.func[i].name == "monsterFireArrow") {
                monster.arrow = {
                    x: utilities.relativeSquareCenter(monster.x, monster.w, 7),
                    y: utilities.relativeSquareCenter(monster.y, monster.h, 7),
                    w: 10,
                    h: 10,
                    vector: utilities.unitVectorSpecific(
                                                        utilities.relativeSquareCenter(monster.x, monster.w, 7),
                                                        utilities.relativeSquareCenter(monster.y, monster.h, 7),
                                                        utilities.relativeSquareCenter(player.x, player.w, 7),
                                                        utilities.relativeSquareCenter(player.y, player.h, 7)),
                    speed: 3,
                    sprite: {
                        sheet: "/img/Sprite-0005.png",
                        frameWidth: 10,
                        frameHeight: 10,
                        totalFrames: 6,
                        currentFrameIndex: 0,
                    },
                    image: new Image()
                };

                monster.arrow.image.src = monster.arrow.sprite.sheet;
            }
        }
    }

    addArrowModel();

    return monster;
}