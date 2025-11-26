import React from 'react';
import { motion } from 'framer-motion';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const Timer = ({ timeLeft, mode, MODES }) => {
  const totalTime = MODES[mode].time;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      {/* Background Circle */}
      <svg className="absolute w-full h-full transform -rotate-90">
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-pomodoro-surface"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="160"
          cy="160"
          r="140"
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-pomodoro-red"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: timeLeft / totalTime }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{
            strokeDasharray: 2 * Math.PI * 140,
            strokeDashoffset: 2 * Math.PI * 140 * (1 - timeLeft / totalTime) // Fallback for pathLength
          }}
        />
      </svg>
      
      <div className="z-10 text-center">
        <motion.div
          key={timeLeft}
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-bold tracking-tight"
        >
          {formatTime(timeLeft)}
        </motion.div>
        <div className="mt-4 text-xl font-medium tracking-widest uppercase opacity-80">
          {MODES[mode].label}
        </div>
      </div>
    </div>
  );
};

export default Timer;
