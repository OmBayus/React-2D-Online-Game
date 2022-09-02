module.exports = class Player{
    constructor(id, x,y){
        this.id = id;
        this.x = x;
        this.y = y;
    }
    move(x,y){
        this.x += x;
        this.y += y;
    }
}