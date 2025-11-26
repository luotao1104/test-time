import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = ({ isOpen, onClose, currentModes }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-pomodoro-surface p-6 rounded-3xl shadow-2xl z-50 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">设置</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">计时器 (分钟)</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.values(currentModes).map((mode) => (
                    <div key={mode.id} className="space-y-2">
                      <label className="text-sm text-gray-300">{mode.label}</label>
                      <input
                        type="number"
                        defaultValue={mode.time / 60}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-center focus:outline-none focus:border-pomodoro-red transition-colors"
                        disabled // Disabled for now as logic needs update
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">声音</h3>
                <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                  <span className="text-gray-300">提示音</span>
                  <div className="w-12 h-6 bg-pomodoro-red rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-500">
              Pomodoro Focus v1.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Settings;
