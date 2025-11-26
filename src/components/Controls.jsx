import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ isActive, toggleTimer, resetTimer }) => {
  return (
    <div className="flex items-center gap-6 mt-12">
      <button
        onClick={toggleTimer}
        className="group relative flex items-center justify-center w-20 h-20 bg-pomodoro-surface rounded-3xl hover:bg-pomodoro-red transition-colors duration-300 shadow-lg hover:shadow-pomodoro-red/30"
      >
        {isActive ? (
          <Pause className="w-8 h-8 text-white fill-current" />
        ) : (
          <Play className="w-8 h-8 text-white fill-current ml-1" />
        )}
      </button>

      <button
        onClick={resetTimer}
        className="flex items-center justify-center w-14 h-14 bg-pomodoro-surface rounded-2xl hover:bg-white/10 transition-colors duration-300"
      >
        <RotateCcw className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Controls;
