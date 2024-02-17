function monsterAdd(database) {
    return setInterval(function () {
        if (database.limit > 0) {
            let monster = monsterModel(database);
            var image = new Image;
            monster.sprite.image = image;
            image.src = monster.sprite.sheet; 
            database.limit -= 1;
            monsterActive.push(monster);
        }
    }, database.rate);
}

function monsterGenerate(){
    swarmIntervalId = monsterAdd(monsterDatabase[0]);
    archerIntervalId = monsterAdd(monsterDatabase[1]);
    tankIntervalId = monsterAdd(monsterDatabase[2]);
}

function monsterStopGenerate(){
    clearInterval(swarmIntervalId);
    clearInterval(archerIntervalId);
    clearInterval(tankIntervalId);
}