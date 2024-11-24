import React from 'react';
import "../App.css";

const SnakeBlock = ({ position = [0, 0], className }) => {
  const [x, y] = Array.isArray(position) ? position : [0, 0];

  return (
    <div
      className={`block ${className}`} 
        style={{
          left: `${x * 5}%`, 
          top: `${y * 5}%`,  
          width: "5%",       
          height: "5%",     
        }}
    
    ></div>
  );
};

export default SnakeBlock;
