const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
app.use(cors());

const Game = require("./objects/Game");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let game = new Game();
let speed = 5;

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  // Join Game
  game.addPlayer(socket.id);
  io.sockets.emit("game", game);

  socket.on("move-right", () => {
    game.movePlayer(socket.id, speed, 0);
    io.sockets.emit("game", game);
  });

  socket.on("move-left", () => {
    game.movePlayer(socket.id, -speed, 0);
    io.sockets.emit("game", game);
  });

  socket.on("move-up", () => {
    game.movePlayer(socket.id, 0, speed);
    io.sockets.emit("game", game);
  });

  socket.on("move-down", () => {
    game.movePlayer(socket.id, 0, -speed);
    io.sockets.emit("game", game);
  });
  // Leave Game
  socket.on("disconnect", () => {
    game.removePlayer(socket.id);
    io.sockets.emit("game", game);
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
