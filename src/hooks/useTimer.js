import { useState, useEffect, useCallback } from "react";
import { playNotificationSound } from "../utils/sound";

const MODES = {
  FOCUS: { id: "FOCUS", label: "专注", time: 25 * 60 },
  SHORT_BREAK: { id: "SHORT_BREAK", label: "短休息", time: 5 * 60 },
  LONG_BREAK: { id: "LONG_BREAK", label: "长休息", time: 15 * 60 },
};

export const useTimer = () => {
  const [mode, setMode] = useState("FOCUS");
  const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.time);
  const [isActive, setIsActive] = useState(false);

  const switchMode = useCallback((newMode) => {
    const modeConfig = MODES[newMode];
    if (modeConfig) {
      setMode(newMode);
      setTimeLeft(modeConfig.time);
      setIsActive(false);
    }
  }, []);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(MODES[mode].time);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      playNotificationSound();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return {
    mode,
    timeLeft,
    isActive,
    switchMode,
    toggleTimer,
    resetTimer,
    MODES,
  };
};
