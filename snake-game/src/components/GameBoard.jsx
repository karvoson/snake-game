import React from 'react';
import SnakeBlock from './SnakeBlock';
import "../App.css";

const GameBoard = ({ snake, apple }) => {
  if (!snake || !Array.isArray(snake) || snake.length === 0) return null;
  if (!apple || apple.length !== 2) return null;

  return (
    <div id="GameBoard" className="game-board">
      {snake.map((part, index) => (
        <SnakeBlock 
          key={`snake-${part[0]}-${part[1]}`}  
          className="snake-block"  
          position={part} 
        />
      ))}
      <SnakeBlock 
        key="apple"  
        className="apple-block"  
        position={apple} 
      />
    </div>
  );
};

export default GameBoard;
