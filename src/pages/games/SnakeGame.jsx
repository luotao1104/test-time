import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Play, Pause, RefreshCw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHighScore') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const gameLoopRef = useRef();
  const directionRef = useRef('RIGHT'); // To prevent rapid double key presses causing self-collision

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    let isOnSnake;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setSpeed(INITIAL_SPEED);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (directionRef.current) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
        default: break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check collision with food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
        setSpeed(s => Math.max(50, s - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, gameOver, isPlaying, highScore, generateFood]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [isPlaying, gameOver, moveSnake, speed]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' && !gameOver) {
        setIsPlaying(p => !p);
        return;
      }

      if (!isPlaying) return;

      const currentDir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (currentDir !== 'DOWN') {
            setDirection('UP');
            directionRef.current = 'UP';
          }
          break;
        case 'ArrowDown':
          if (currentDir !== 'UP') {
            setDirection('DOWN');
            directionRef.current = 'DOWN';
          }
          break;
        case 'ArrowLeft':
          if (currentDir !== 'RIGHT') {
            setDirection('LEFT');
            directionRef.current = 'LEFT';
          }
          break;
        case 'ArrowRight':
          if (currentDir !== 'LEFT') {
            setDirection('RIGHT');
            directionRef.current = 'RIGHT';
          }
          break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link to="/games" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">贪吃蛇</h1>
          <div className="w-10"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-xs text-gray-300 uppercase tracking-wider">得分</span>
              <span className="text-2xl font-bold font-mono">{score}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-400" /> 最高分
              </span>
              <span className="text-2xl font-bold font-mono">{highScore}</span>
            </div>
          </div>

          <div 
            className="relative bg-black/40 rounded-lg overflow-hidden border border-white/10 mx-auto aspect-square"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
            }}
          >
            {/* Grid Background (Optional) */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
               <div key={i} className="border-[0.5px] border-white/5"></div>
            ))}

            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={`${segment.x}-${segment.y}`}
                className={`${
                  index === 0 ? 'bg-pink-500 z-10' : 'bg-pink-400/80'
                } rounded-sm transition-all duration-100`}
                style={{
                  gridColumnStart: segment.x + 1,
                  gridRowStart: segment.y + 1,
                }}
              />
            ))}

            {/* Food */}
            <div
              className="bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse"
              style={{
                gridColumnStart: food.x + 1,
                gridRowStart: food.y + 1,
              }}
            />

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-2 text-red-400">游戏结束</h2>
                <p className="text-gray-300 mb-6">最终得分: {score}</p>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                >
                  <RefreshCw className="w-5 h-5" />
                  再玩一次
                </button>
              </div>
            )}

            {/* Start Overlay */}
            {!isPlaying && !gameOver && score === 0 && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-8 py-4 bg-white text-purple-900 hover:bg-gray-100 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  开始游戏
                </button>
                <p className="mt-4 text-sm text-gray-400">使用方向键控制移动</p>
              </div>
            )}
            
             {/* Pause Overlay */}
             {!isPlaying && !gameOver && score > 0 && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full font-bold transition-all"
                >
                  <Play className="w-5 h-5" />
                  继续
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={gameOver || score === 0}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetGame}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Controls */}
          <div className="mt-8 grid grid-cols-3 gap-2 max-w-[200px] mx-auto md:hidden">
            <div></div>
            <button 
              className="bg-white/10 p-4 rounded-xl active:bg-white/30 transition-colors flex justify-center"
              onClick={() => {
                 if (directionRef.current !== 'DOWN') {
                    setDirection('UP');
                    directionRef.current = 'UP';
                  }
              }}
            >
              <ArrowLeft className="w-6 h-6 rotate-90" />
            </button>
            <div></div>
            <button 
              className="bg-white/10 p-4 rounded-xl active:bg-white/30 transition-colors flex justify-center"
              onClick={() => {
                 if (directionRef.current !== 'RIGHT') {
                    setDirection('LEFT');
                    directionRef.current = 'LEFT';
                  }
              }}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
               className="bg-white/10 p-4 rounded-xl active:bg-white/30 transition-colors flex justify-center"
               onClick={() => {
                 if (directionRef.current !== 'LEFT') {
                    setDirection('RIGHT');
                    directionRef.current = 'RIGHT';
                  }
               }}
            >
              <ArrowLeft className="w-6 h-6 rotate-180" />
            </button>
            <div></div>
            <button 
               className="bg-white/10 p-4 rounded-xl active:bg-white/30 transition-colors flex justify-center"
               onClick={() => {
                 if (directionRef.current !== 'UP') {
                    setDirection('DOWN');
                    directionRef.current = 'DOWN';
                  }
               }}
            >
              <ArrowLeft className="w-6 h-6 -rotate-90" />
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
