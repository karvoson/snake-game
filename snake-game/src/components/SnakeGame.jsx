import React from 'react';
import GameBoard from './GameBoard.jsx';
import GameOver from './GameOver';
import ScoreDisplay from './ScoreDisplay';
import "../App.css";

class SnakeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [],
      apple: {}, 
      direction: 'right',
      isGameOver: false,
      score: 0,
      highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
    };

    this.gameLoop = this.gameLoop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.initGame();
    window.addEventListener('keydown', this.handleKeyDown);
    this.intervalId = setInterval(this.gameLoop, 200); 
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); 
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  initGame = () => {
    const initialSnake = [[5, 5]]; 
    const initialApple = this.generateApple();
    this.setState({
      snake: initialSnake,
      apple: initialApple,
      isGameOver: false,
      score: 0,
      direction: 'right',
    });
  };
  
  generateApple = () => {
    const gridSize = 20; 
    let apple;
    do {
      apple = [
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize),
      ];
    } while (this.isAppleOnSnake(apple)); 
    return apple;
  };

  isAppleOnSnake = (apple) => {
    return this.state.snake.some(
      ([x, y]) => x === apple[0] && y === apple[1]
    );
  };

  

  handleKeyDown(event) {
    const { direction } = this.state;
    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'down') this.setState({ direction: 'up' });
        break;
      case 'ArrowDown':
        if (direction !== 'up') this.setState({ direction: 'down' });
        break;
      case 'ArrowLeft':
        if (direction !== 'right') this.setState({ direction: 'left' });
        break;
      case 'ArrowRight':
        if (direction !== 'left') this.setState({ direction: 'right' });
        break;
      default:
        break;
    }
  }

  gameLoop() {
    const { snake, direction, apple, score, highScore } = this.state;
  
    if (!Array.isArray(snake)) {
      console.error('Snake state is not an array:', snake);
      return;
    }
  
    const newSnake = [...snake]; 
    const head = [...newSnake[0]];
  
    switch (direction) {
      case 'up':
        head[1] -= 1;
        break;
      case 'down':
        head[1] += 1;
        break;
      case 'left':
        head[0] -= 1;
        break;
      case 'right':
        head[0] += 1;
        break;
      default:
        break;
    }
  
    newSnake.unshift(head); 
  
    if (head[0] === apple[0] && head[1] === apple[1]) {
      this.setState({
        apple: this.generateApple(),
        score: score + 1,
        highScore: Math.max(score + 1, highScore),
      });
      localStorage.setItem('snakeHighScore', Math.max(score + 1, highScore));
    } else {
      newSnake.pop(); 
    }
  
    if (this.isCollision(head, newSnake)) {
      this.setState({ isGameOver: true });
      clearInterval(this.intervalId);
      return;
    }
  
    this.setState({ snake: newSnake });
  }
  
  
  isCollision(head, snake) {
    const gridSize = 20; 
    if (head[0] < 0 || head[1] < 0 || head[0] >= gridSize || head[1] >= gridSize) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { snake, apple, isGameOver, score, highScore } = this.state;

    if (isGameOver) {
      return <GameOver score={score} highScore={highScore} />;
    }

    return (
      <div className="snake-game">
        <ScoreDisplay score={score} highScore={highScore} />
        <GameBoard snake={snake} apple={apple} />
      </div>
    );


  }
}

export default SnakeGame;
