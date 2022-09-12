const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.use(cors());

app.use(express.static('build'))

const Game = require("./objects/Game");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let game = new Game();
let speed = 1;

// function test() {
//   const players = game.players;
//   if(players.length >= 2){
//     const player1 = players[0];
//     const player2 = players[1];
    
//     const distanceX = player1.x - player2.x;
//     const distanceY = player1.y - player2.y;
//     const deleteDistance = 30
//     if(distanceX < deleteDistance && distanceX > -deleteDistance && distanceY < deleteDistance && distanceY > -deleteDistance){
//       // game.removePlayer(player1.id);
//       game.removePlayer(player2.id);
//     }
//   }
// }
  

io.on("connection", (socket) => {

  socket.on("join", (data) => {
    game.addPlayer(socket.id, data.name, data.color);
    socket.emit("join",game)
    io.sockets.emit("game", game);
  });

  socket.on("move", (data) => {
    game.movePlayer(socket.id, data.x*speed, data.y*speed);
    // test()
    io.sockets.emit("game", game);
  });

  // Leave Game
  socket.on("disconnect", () => {
    game.removePlayer(socket.id);
    io.sockets.emit("game", game);
  });
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log("listening on *:"+PORT);
});
