const Player = require("./Player")

module.exports = class Game{
    constructor(){
        // this.gameId = 0;
        this.players = [];
    }
    addPlayer(id){
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        const player = new Player(id,x,y);
        this.players.push(player);
    }
    findPlayer(id){
        return this.players.find(player => player.id === id);
    }
    removePlayer(id){
        this.players = this.players.filter(p => p.id !== id);
    }
    movePlayer(id,x,y){
        this.players.forEach(p => {
            if(p.id === id){
                p.move(x,y);
            }
        } );
    }
}