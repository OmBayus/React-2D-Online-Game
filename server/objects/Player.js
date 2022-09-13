module.exports = class Player {
  constructor(id, name, color, x, y) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.mvx = 0;
    this.mvy = 0;
    this.score = 0;
  }
  move(x, y) {
    if (typeof x === "number") {
      this.mvx = x;
    }
    if (typeof y === "number") {
      this.mvy = y;
    }
  }
  update() {
    let newX = this.x + this.mvx*5;
    let newY = this.y + this.mvy*5;
    if (newX < 75 || newX > 500) return;
    if (newY < 75 || newY > 500) return;
    this.x = newX;
    this.y = newY;
    // this.x += this.mvx;
    // this.y += this.mvy;
  }
};
