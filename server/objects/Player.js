module.exports = class Player {
  constructor(id, name, color, x, y) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  move(x, y) {
    let newX = this.x + x;
    let newY = this.y + y;
    if(newX <75 || newX > 500)return
    if(newY < 75 || newY > 500) return
    this.x = newX;
    this.y = newY;
  }
};
