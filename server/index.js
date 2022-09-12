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
let interval
io.on("connection", (socket) => {

  if(!interval && io.sockets.sockets.size === 1){
    interval = setInterval(()=>{
      game.update();
      io.sockets.emit("game", game);
    },10)
  }

  socket.on("join", (data) => {
    game.addPlayer(socket.id, data.name, data.color);
    socket.emit("join",game)
    io.sockets.emit("game", game);
  });

  socket.on("move", (data) => {
    game.movePlayer(socket.id, data.x,data.y);
    // test()
    // io.sockets.emit("game", game);
  });

  // Leave Game
  socket.on("disconnect", () => {
    game.removePlayer(socket.id);
    io.sockets.emit("game", game);
    if(io.sockets.sockets.size === 0 && interval){
      clearInterval(interval)
      interval = null
    }
  });
});



const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log("listening on *:"+PORT);
});
