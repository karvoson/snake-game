import React from 'react';
import "../App.css";

const GameOver = ({ score, highScore }) => {
  return (
    <div className="game-over-modal">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>Your Score: {score} </p>
        <p>High Score: {highScore}</p>
        <button className='' onClick={() => window.location.reload()}>Restart</button>
      </div>
    </div>
  );
};

export default GameOver;
