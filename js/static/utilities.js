function Utilities() 
{

};

Utilities.prototype.overlapObjects = function (object1, object2) 
{
    if (object1.x < object2.x + object2.w &&
        object1.x + object1.w > object2.x &&
        object1.y < object2.y + object2.h &&
        object1.y + object1.h > object2.y) 
    {
        return true;
    } 
    else 
    {
        return false;
    };
};

Utilities.prototype.unitVector = function (object1, object2) 
{
    let distX = object1.x - object2.x;
    let distY = object1.y - object2.y;
    let disMag = Math.sqrt(distX ** 2 + distY ** 2);

    return {
        mag: disMag,
        dx: distX,
        dy: distY,
        nx: (distX / disMag) * -1,
        ny: (distY / disMag) * -1
    };
}

Utilities.prototype.unitVectorSpecific = function (object1X, object1Y, object2X, object2Y) 
{
    let distX = object1X - object2X;
    let distY = object1Y - object2Y;
    let disMag = Math.sqrt(distX ** 2 + distY ** 2);

    return {
        mag: disMag,
        dx: distX,
        dy: distY,
        nx: (distX / disMag) * -1,
        ny: (distY / disMag) * -1
    };
};

Utilities.prototype.outOfBounds = function (x, y) 
{
    if (x < 0 ||
        x > 1000 ||
        y < 0 ||
        y > 1000) 
    {
        return true;
    } 
    else 
    {
        return false;
    };
};

Utilities.prototype.drawSquare = function (x, y, width, height, color, bool = false) 
{
    if(bool)
    {
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;
    };
    
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};

Utilities.prototype.relativeSquareCenter = function(obj1X, obj2W, obj1W) 
{
    return (obj1X + (obj2W / 2)) - obj1W / 2;
};

Utilities.prototype.removeObject = function(obj,objs)
{
    let index = objs.indexOf(obj);
    objs.splice(index, 1);
};

Utilities.prototype.drawImage = function (sprite, currentSpriteX, currentSpriteY, spriteW, spriteH, x, y, w, h) 
{
    ctx.shadowColor = "black";
    ctx.shadowBlur = 2;

    ctx.drawImage(
        sprite,
        currentSpriteX,
        currentSpriteY,
        spriteW,
        spriteH,
        x,
        y,
        w,
        h);
};

Utilities.prototype.getRandomNumber = function(min, max)
{
    const random = Math.random();
    const scaled = random * (max - min + 1) + min;
    return Math.floor(scaled);
};