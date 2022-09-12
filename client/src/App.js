import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import generateName from "./utils/generateName";
import getRandomColor from "./utils/getRandomColor";

const ENDPOINT = "/";

const socket = io(ENDPOINT);

function Lobby({ setJoined, setGame }) {
  const [player, setPlayer] = useState({
    name: generateName(),
    color: getRandomColor(),
  });
  const onChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on("join", (data) => {
      setJoined(true);
      setGame(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("join", player);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center"
      }}
    >
      <div>
        <h1>Lobby</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              onChange={onChange}
              type="text"
              placeholder="name"
              name="name"
              value={player.name}
              style={{marginBottom:"10px"}}
            />
          </div>
          <div>
            <input
              onChange={onChange}
              type="color"
              name="color"
              value={player.color}
              style={{marginBottom:"10px"}}
            />
          </div>

          <button type="submit" style={{marginBottom:"10px",padding:"8px 20px"}}>Join</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const canvas = useRef(null);
  const [ctx, setCtx] = React.useState(null);
  const [game, setGame] = useState(null);
  const [joined, setJoined] = useState(false);
  const [keysPressed, setKeysPressed] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Get Canvas Context
  useEffect(() => {
    if (ctx === null && game !== null && joined) {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;
      setCtx(canvas.current.getContext("2d"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  // Load Game
  useEffect(() => {
    socket.on("game", (data) => {
      setGame(data);
    });
  }, []);

  if (keysPressed.w) {
    socket.emit("move", { x: 0, y: -1 });
  }
  if (keysPressed.a) {
    socket.emit("move", { x: -1, y: 0 });
  }
  if (keysPressed.s) {
    socket.emit("move", { x: 0, y: 1 });
  }
  if (keysPressed.d) {
    socket.emit("move", { x: 1, y: 0 });
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
    });

    document.addEventListener("keyup", (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
    });
  }, []);

  useEffect(() => {
    if (ctx) {
      LoadGame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  var background = new Image();
  background.src = "/bg.jpeg";
  const LoadGame = () => {
    canvas.current.width = 600;
    canvas.current.height = 600;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.drawImage(background, 0, 0, 600, 600);
    if (game) {
      game.players.forEach((player) => {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 40, 0, Math.PI * 2, false);
        ctx.fillStyle = player.color;
        ctx.font = "20px Arial";
        const textString = player.name;
        const textWidth = ctx.measureText(textString).width;
        ctx.fillText(textString, player.x - textWidth / 2, player.y - 45);
        ctx.fill();
      });
    }
  };

  if (!joined) {
    return <Lobby setJoined={setJoined} setGame={setGame} />;
  }
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default App;
