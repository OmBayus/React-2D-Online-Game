const Player = require("./Player");
const Gem = require("./Gem");

module.exports = class Game {
  constructor() {
    // this.gameId = 0;
    this.players = [];
    this.gems = [];
  }
  addPlayer(id, name, color) {
    let isExist = this.players.find((player) => player.id === id);
    if (isExist) return;
    const x = 50 + Math.floor(Math.random() * 400);
    const y = 50 + Math.floor(Math.random() * 400);
    const player = new Player(id, name, color, x, y);
    this.players.push(player);
  }
  addGem() {
    if (this.gems.length >= 10) return;
    const x = 50 + Math.floor(Math.random() * 400);
    const y = 50 + Math.floor(Math.random() * 400);
    this.gems.push(new Gem(x, y));
  }
  findPlayer(id) {
    return this.players.find((player) => player.id === id);
  }
  removePlayer(id) {
    this.players = this.players.filter((p) => p.id !== id);
  }
  movePlayer(id, x, y) {
    this.players.forEach((p) => {
      if (p.id === id) {
        p.move(x, y);
      }
    });
  }
  update() {
    this.players.forEach((p) => {
      p.update();
    });
    this.players.forEach((p) => {
      this.gems.forEach((g, i) => {
        const distanceX = p.x - g.x;
        const distanceY = p.y - g.y;
        const deleteDistance = 30;
        if (
          distanceX < deleteDistance &&
          distanceX > -deleteDistance &&
          distanceY < deleteDistance &&
          distanceY > -deleteDistance
        ) {
          this.gems.splice(i, 1);
          p.score += 1;
        }
      });
    });
  }
};
