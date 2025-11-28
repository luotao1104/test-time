import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Flag, Bomb, RefreshCw, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DIFFICULTY_LEVELS = {
  EASY: { rows: 9, cols: 9, mines: 10 },
  MEDIUM: { rows: 16, cols: 16, mines: 40 },
  HARD: { rows: 16, cols: 30, mines: 99 }
};

const MinesweeperGame = () => {
  const [difficulty, setDifficulty] = useState('EASY');
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  const initializeGame = useCallback(() => {
    const { rows, cols, mines } = DIFFICULTY_LEVELS[difficulty];
    const newGrid = Array(rows).fill().map(() => Array(cols).fill({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0
    }));

    setGrid(newGrid);
    setGameOver(false);
    setWon(false);
    setFlags(mines);
    setTime(0);
    setIsPlaying(false);
    setFirstClick(true);
  }, [difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval;
    if (isPlaying && !gameOver && !won) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, won]);

  const placeMines = (clickedRow, clickedCol) => {
    const { rows, cols, mines } = DIFFICULTY_LEVELS[difficulty];
    const newGrid = JSON.parse(JSON.stringify(grid));
    let minesPlaced = 0;

    while (minesPlaced < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);

      // Don't place mine on first click or neighbors
      if (!newGrid[r][c].isMine && 
          (Math.abs(r - clickedRow) > 1 || Math.abs(c - clickedCol) > 1)) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (r + i >= 0 && r + i < rows && c + j >= 0 && c + j < cols && newGrid[r + i][c + j].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    return newGrid;
  };

  const revealCell = (r, c) => {
    if (gameOver || won || grid[r][c].isFlagged || grid[r][c].isRevealed) return;

    let newGrid = [...grid];

    if (firstClick) {
      newGrid = placeMines(r, c);
      setFirstClick(false);
      setIsPlaying(true);
    }

    if (newGrid[r][c].isMine) {
      // Game Over
      newGrid[r][c].isRevealed = true;
      setGameOver(true);
      setIsPlaying(false);
      // Reveal all mines
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
    } else {
      // Flood fill
      const reveal = (row, col) => {
        if (row < 0 || row >= newGrid.length || col < 0 || col >= newGrid[0].length || newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;
        
        newGrid[row][col].isRevealed = true;
        
        if (newGrid[row][col].neighborMines === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              reveal(row + i, col + j);
            }
          }
        }
      };
      reveal(r, c);
    }

    setGrid(newGrid);
    checkWin(newGrid);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver || won || grid[r][c].isRevealed) return;

    const newGrid = [...grid];
    if (!newGrid[r][c].isFlagged && flags > 0) {
      newGrid[r][c].isFlagged = true;
      setFlags(f => f - 1);
    } else if (newGrid[r][c].isFlagged) {
      newGrid[r][c].isFlagged = false;
      setFlags(f => f + 1);
    }
    setGrid(newGrid);
  };

  const checkWin = (currentGrid) => {
    const { rows, cols, mines } = DIFFICULTY_LEVELS[difficulty];
    let unrevealedSafeCells = 0;
    
    currentGrid.forEach(row => row.forEach(cell => {
      if (!cell.isMine && !cell.isRevealed) unrevealedSafeCells++;
    }));

    if (unrevealedSafeCells === 0) {
      setWon(true);
      setIsPlaying(false);
      setFlags(0); // Flag all mines visually if needed, or just show win
    }
  };

  const getCellContent = (cell) => {
    if (cell.isFlagged) return <Flag className="w-4 h-4 text-red-500" />;
    if (!cell.isRevealed) return null;
    if (cell.isMine) return <Bomb className="w-4 h-4 text-black animate-pulse" />;
    if (cell.neighborMines > 0) return <span className={`font-bold ${
      ['text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-yellow-600', 'text-teal-500', 'text-black', 'text-gray-500'][cell.neighborMines - 1]
    }`}>{cell.neighborMines}</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Link to="/games" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">扫雷</h1>
          <div className="flex gap-2">
             {Object.keys(DIFFICULTY_LEVELS).map(level => (
               <button
                 key={level}
                 onClick={() => setDifficulty(level)}
                 className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${difficulty === level ? 'bg-pink-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
               >
                 {level === 'EASY' ? '简单' : level === 'MEDIUM' ? '中等' : '困难'}
               </button>
             ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <div className="bg-black/40 p-2 rounded-lg">
               <Flag className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-2xl font-mono font-bold">{flags}</span>
          </div>
          
          <button
            onClick={initializeGame}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
          >
             {gameOver ? '😵' : won ? '😎' : '🙂'}
          </button>

          <div className="flex items-center gap-2">
            <div className="bg-black/40 p-2 rounded-lg">
               <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-2xl font-mono font-bold">{String(time).padStart(3, '0')}</span>
          </div>
        </div>

        <div className="overflow-auto pb-4">
            <div 
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 shadow-xl mx-auto w-fit select-none"
            onContextMenu={(e) => e.preventDefault()}
            >
            <div 
                className="grid bg-gray-400 p-1 border-4 border-gray-300 border-r-gray-500 border-b-gray-500"
                style={{ 
                gridTemplateColumns: `repeat(${DIFFICULTY_LEVELS[difficulty].cols}, 30px)`
                }}
            >
                {grid.map((row, r) => (
                row.map((cell, c) => {
                    return (
                    <div
                    key={`${r}-${c}`}
                    onClick={() => revealCell(r, c)}
                    onContextMenu={(e) => toggleFlag(e, r, c)}
                    className={`
                        w-[30px] h-[30px] flex items-center justify-center text-sm cursor-pointer select-none font-bold
                        ${cell.isRevealed 
                        ? (cell.isMine ? 'bg-red-500 border border-gray-400' : 'bg-gray-300 border border-gray-400') 
                        : 'bg-gray-200 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-500 active:border-none'}
                    `}
                    >
                    {getCellContent(cell)}
                    </div>
                    );
                })
                ))}
            </div>
            </div>
        </div>

        {gameOver && (
           <div className="text-center mt-4 animate-bounce text-red-400 font-bold text-xl">
              游戏结束! 再试一次。
           </div>
        )}
        {won && (
           <div className="text-center mt-4 animate-bounce text-green-400 font-bold text-xl">
              恭喜! 你赢了!
           </div>
        )}
      </div>
    </div>
  );
};

export default MinesweeperGame;
