import React from 'react';
import "../App.css";

const ScoreDisplay = ({ score, highScore }) => {
  return (
    <div className="score-display">
      <span>Score: {score}  </span>
      <span>High Score: {highScore}</span>
    </div>
  );
};

export default ScoreDisplay;
