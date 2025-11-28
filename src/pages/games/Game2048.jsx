import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Trophy, Undo, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Game2048 = () => {
  const [grid, setGrid] = useState(Array(4).fill().map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('2048HighScore') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [previousGrid, setPreviousGrid] = useState(null);
  const [previousScore, setPreviousScore] = useState(null);

  const initializeGame = useCallback(() => {
    const newGrid = Array(4).fill().map(() => Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setPreviousGrid(null);
    setPreviousScore(null);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const addRandomTile = (currentGrid) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentGrid[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentGrid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const move = useCallback((direction) => {
    if (gameOver) return;

    const newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;
    let newScore = score;

    const rotateGrid = (grid) => {
      const newGrid = Array(4).fill().map(() => Array(4).fill(0));
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newGrid[j][3 - i] = grid[i][j];
        }
      }
      return newGrid;
    };

    let rotatedGrid = newGrid;
    let rotations = 0;

    if (direction === 'LEFT') rotations = 0;
    else if (direction === 'DOWN') rotations = 1;
    else if (direction === 'RIGHT') rotations = 2;
    else if (direction === 'UP') rotations = 3;

    for (let i = 0; i < rotations; i++) {
      rotatedGrid = rotateGrid(rotatedGrid);
    }

    // Shift and merge logic (left)
    for (let i = 0; i < 4; i++) {
      let row = rotatedGrid[i].filter(val => val !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          newScore += row[j];
          row.splice(j + 1, 1);
          if (row[j] === 2048 && !won) setWon(true);
        }
      }
      while (row.length < 4) row.push(0);
      if (JSON.stringify(rotatedGrid[i]) !== JSON.stringify(row)) moved = true;
      rotatedGrid[i] = row;
    }

    // Rotate back
    for (let i = 0; i < (4 - rotations) % 4; i++) {
      rotatedGrid = rotateGrid(rotatedGrid);
    }

    if (moved) {
      setPreviousGrid(grid);
      setPreviousScore(score);
      addRandomTile(rotatedGrid);
      setGrid(rotatedGrid);
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('2048HighScore', newScore.toString());
      }
      if (checkGameOver(rotatedGrid)) {
        setGameOver(true);
      }
    }
  }, [grid, score, highScore, gameOver, won]);

  const checkGameOver = (currentGrid) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentGrid[i][j] === 0) return false;
        if (i < 3 && currentGrid[i][j] === currentGrid[i + 1][j]) return false;
        if (j < 3 && currentGrid[i][j] === currentGrid[i][j + 1]) return false;
      }
    }
    return true;
  };

  const undo = () => {
    if (previousGrid) {
      setGrid(previousGrid);
      setScore(previousScore);
      setPreviousGrid(null);
      setPreviousScore(null);
      setGameOver(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        switch (e.key) {
          case 'ArrowUp': move('UP'); break;
          case 'ArrowDown': move('DOWN'); break;
          case 'ArrowLeft': move('LEFT'); break;
          case 'ArrowRight': move('RIGHT'); break;
          default: break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchMove = (e) => setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (isLeftSwipe) move('LEFT');
        if (isRightSwipe) move('RIGHT');
    } else {
        if (isUpSwipe) move('UP');
        if (isDownSwipe) move('DOWN');
    }
  };

  const getTileColor = (value) => {
    const colors = {
      0: 'bg-white/5',
      2: 'bg-pink-200 text-gray-800',
      4: 'bg-pink-300 text-gray-800',
      8: 'bg-pink-400 text-white',
      16: 'bg-pink-500 text-white',
      32: 'bg-pink-600 text-white',
      64: 'bg-purple-500 text-white',
      128: 'bg-purple-600 text-white',
      256: 'bg-purple-700 text-white',
      512: 'bg-indigo-500 text-white',
      1024: 'bg-indigo-600 text-white',
      2048: 'bg-indigo-700 text-white',
    };
    return colors[value] || 'bg-black text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-4 touch-none"
         onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link to="/games" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">2048</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex justify-between items-center mb-6 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 flex-1 text-center border border-white/20">
            <span className="text-xs text-gray-300 uppercase tracking-wider block">得分</span>
            <span className="text-xl font-bold font-mono">{score}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 flex-1 text-center border border-white/20">
            <span className="text-xs text-gray-300 uppercase tracking-wider block flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3 text-yellow-400" /> 最高分
            </span>
            <span className="text-xl font-bold font-mono">{highScore}</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl relative">
          <div className="grid grid-cols-4 gap-3 bg-black/20 p-3 rounded-xl">
            {grid.map((row, i) => (
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 transform ${getTileColor(cell)} ${cell !== 0 ? 'scale-100' : 'scale-95 opacity-50'}`}
                >
                  {cell !== 0 && cell}
                </div>
              ))
            ))}
          </div>

          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-2xl">
              <h2 className="text-4xl font-bold mb-2 text-white">游戏结束!</h2>
              <p className="text-gray-300 mb-6">最终得分: {score}</p>
              <button
                onClick={initializeGame}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
              >
                <RefreshCw className="w-5 h-5" />
                再试一次
              </button>
            </div>
          )}
          
           {won && !gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-2xl">
               <h2 className="text-4xl font-bold mb-2 text-yellow-400 animate-bounce">你赢了!</h2>
               <p className="text-gray-300 mb-6">继续挑战更高分!</p>
               <button
                onClick={() => setWon(false)}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5" />
                继续游戏
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={undo}
            disabled={!previousGrid || gameOver}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo className="w-5 h-5" />
            撤销
          </button>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            新游戏
          </button>
        </div>
        
        <p className="text-center text-gray-400 mt-6 text-sm">
           使用方向键或滑动来移动方块
        </p>
      </div>
    </div>
  );
};

export default Game2048;
