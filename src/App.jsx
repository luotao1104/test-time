import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PomodoroPage from './pages/PomodoroPage';
import GamesPage from './pages/GamesPage';
import TodoPage from './pages/TodoPage';
import AmbientSoundPage from './pages/AmbientSoundPage';
import ToolsPage from './pages/ToolsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/ambient" element={<AmbientSoundPage />} />
        <Route path="/tools" element={<ToolsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
