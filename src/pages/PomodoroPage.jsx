import React, { useState } from 'react';
import { Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Timer from '../components/Timer';
import Controls from '../components/Controls';
import Settings from '../components/Settings';
import { useTimer } from '../hooks/useTimer';

function PomodoroPage() {
  const { mode, timeLeft, isActive, switchMode, toggleTimer, resetTimer, MODES } = useTimer();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out flex flex-col items-center justify-center relative overflow-hidden
      ${mode === 'FOCUS' ? 'bg-pomodoro-bg text-white' : 
        mode === 'SHORT_BREAK' ? 'bg-teal-900 text-teal-50' : 
        'bg-blue-900 text-blue-50'
      }`}
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-10">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">返回首页</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-pomodoro-red" />
            <span className="font-bold text-lg md:text-xl tracking-tight">Pomodoro</span>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 md:p-3 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <SettingsIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center z-10 px-4">
        {/* Mode Switcher */}
        <div className="flex p-1 bg-black/20 backdrop-blur-lg rounded-full mb-8 md:mb-12">
          {Object.values(MODES).map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                mode === m.id 
                  ? 'bg-pomodoro-surface text-white shadow-lg scale-105' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <Timer timeLeft={timeLeft} mode={mode} MODES={MODES} />
        
        <Controls 
          isActive={isActive} 
          toggleTimer={toggleTimer} 
          resetTimer={resetTimer} 
        />
      </main>

      <Settings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        currentModes={MODES}
      />
    </div>
  );
}

export default PomodoroPage;
