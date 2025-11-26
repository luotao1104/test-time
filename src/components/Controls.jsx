import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ isActive, toggleTimer, resetTimer }) => {
  return (
    <div className="flex items-center gap-4 md:gap-6 mt-8 md:mt-12">
      <button
        onClick={toggleTimer}
        className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-pomodoro-surface rounded-3xl hover:bg-pomodoro-red transition-colors duration-300 shadow-lg hover:shadow-pomodoro-red/30 active:scale-95"
      >
        {isActive ? (
          <Pause className="w-7 h-7 md:w-8 md:h-8 text-white fill-current" />
        ) : (
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-current ml-1" />
        )}
      </button>

      <button
        onClick={resetTimer}
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-pomodoro-surface rounded-2xl hover:bg-white/10 transition-colors duration-300 active:scale-95"
      >
        <RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
    </div>
  );
};

export default Controls;
