function monsterOffset(monster) {
    for (let i = 0; i < monsterActive.length; i++) {
        if ((monster.name != monsterActive[i].name)) {
    
            if (monster.id == 1 || monster.id == 0 || monster.id == 2) {
                if (utilities.overlapObjects(monster, monsterActive[i])) {
                    const vector = utilities.unitVector(monster, monsterActive[i]);
                    if (vector.mag < monster.w) {
                        const angle = Math.atan2(vector.dy, vector.dx);
                        const targetX = monsterActive[i].x + Math.cos(angle) * monster.w;
                        const targetY = monsterActive[i].y + Math.sin(angle) * monster.h;
                        monster.x = targetX;
                        monster.y = targetY;
                    }
                }
            }
        }
    }
    
}
