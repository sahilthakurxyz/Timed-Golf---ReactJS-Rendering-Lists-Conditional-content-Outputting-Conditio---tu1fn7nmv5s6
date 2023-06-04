import React, { useEffect, useState } from "react";
import "../styles/App.css";
const timerr = () => {
  let [gameStart, setGameStart] = useState(false);
  let [timer, settimer] = useState(0);
  let [y, setY] = useState(0);
  let [x, setX] = useState(0);
  const ballStyle = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    width: "20px",
    height: "20px",
    backGroundColor: "red",
    borderRadius: "50%",
  };
  const holeStyle = {
    position: "absolute",
    top: "250px",
    left: "250px",
    width: "20px",
    height: "20px",
    backgroundColor: "green",
    borderRadius: "50%",
  };
  const handleKeyPress = (e) => {
    const step = 5;
    switch (e.key) {
      case "ArrowUp":
        setY((prevY) => {
          if (prevY - step >= 0) {
            return prevY - step;
          } else {
            return prevY;
          }
        });

        break;
      case "ArrowDown":
        setY((prevY) => {
          if (prevY + step >= window.innerHeight - 20) {
            return prevY;
          } else {
            return prevY + step;
          }
        });
        break;
      case "ArrowLeft":
        setX((prevX) => {
          if (prevX - step >= 0) {
            return prevX - step;
          } else return prevX;
        });
        break;
      case "ArrowRight":
        setX((prevX) => {
          if (prevX + step <= window.innerWidth - 20) {
            return prevX + step;
          } else return prevX;
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (gameStart) {
      const interval = setInterval(() => {
        settimer((pretimer) => pretimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStart]);
  const handleClickStart = () => {
    setGameStart(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStart) {
        handleKeyPress(e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gameStart]);
  useEffect(() => {
    if (x === 250 && y === 250) {
      setGameStart(false);
    }
  }, [x, y]);
  return (
    <>
      <button className="start" disabled={gameStart} onClick={handleClickStart}>
        Start
      </button>
      <div className="heading-timer">{timer}</div>
      <div className="ball" style={ballStyle}></div>
      <div className="hole" style={holeStyle}></div>
    </>
  );
};

export default timerr;
