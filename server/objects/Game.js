const Player = require("./Player");

module.exports = class Game {
  constructor() {
    // this.gameId = 0;
    this.players = [];
  }
  addPlayer(id, name, color) {
    let isExist = this.players.find((player) => player.id === id);
    if(isExist) return
    const x = 50 + Math.floor(Math.random() * 400);
    const y = 50 + Math.floor(Math.random() * 400);
    const player = new Player(id, name, color, x, y);
    this.players.push(player);
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
  }
};
