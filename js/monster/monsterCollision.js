function monsterCollision(monster) {
    bullets.forEach(bullet => {
        if(utilities.overlapObjects(monster, bullet)){
            utilities.removeObject(bullet, bullets);
            monster.hp -= Number(bullet.attack);
        }
    });
}
