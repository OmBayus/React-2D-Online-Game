import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const ENDPOINT = "localhost:4000";

const socket = io(ENDPOINT);

// socket.emit("auth",token)

// socket.on("auth",(info)=>{
//     console.log(info)
// })

function Lobby({ setJoined, setGame }) {
  const [player, setPlayer] = useState({ name: "", color: "#000000" });
  const onChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on("join", (data) => {
      setJoined(true);
      setGame(data);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("join", player);
  };

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            onChange={onChange}
            type="text"
            placeholder="name"
            name="name"
          />
        </div>
        <div>
          <input onChange={onChange} type="color" name="color" />
        </div>

        <button type="submit">Join</button>
      </form>
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
  }, [game]);

  // Load Game
  useEffect(() => {
    socket.on("game", (data) => {
      setGame(data);
    });
  }, []);

  useEffect(() => {
    if (keysPressed.w) {
      socket.emit("move-up");
    }
    if (keysPressed.a) {
      socket.emit("move-left");
    }
    if (keysPressed.s) {
      socket.emit("move-down");
    }
    if (keysPressed.d) {
      socket.emit("move-right");
    }
  }, [keysPressed]);

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
  }, [game]);

  const LoadGame = () => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
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
    <div>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default App;
