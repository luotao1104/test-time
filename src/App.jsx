import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PomodoroPage from './pages/PomodoroPage';
import TarotPage from './pages/TarotPage';
import GamesPage from './pages/GamesPage';

import ToolsPage from './pages/ToolsPage';
import SnakeGame from './pages/games/SnakeGame';
import Game2048 from './pages/games/Game2048';
import MinesweeperGame from './pages/games/MinesweeperGame';
import PhysicsPage from './pages/PhysicsPage';
import FocusGlobePage from './pages/FocusGlobePage';
import MindMapPage from './pages/MindMapPage';
import RetroTerminalPage from './pages/RetroTerminalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/tarot" element={<TarotPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/snake" element={<SnakeGame />} />
        <Route path="/games/2048" element={<Game2048 />} />
        <Route path="/games/minesweeper" element={<MinesweeperGame />} />
        <Route path="/physics" element={<PhysicsPage />} />

        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/focus-globe" element={<FocusGlobePage />} />
        <Route path="/mind-map" element={<MindMapPage />} />
        <Route path="/terminal" element={<RetroTerminalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
