module.exports = class Player {
  constructor(id, name, color, x, y) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
};
