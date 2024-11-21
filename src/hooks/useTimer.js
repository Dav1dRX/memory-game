import { useState, useEffect } from 'react';

export const useTimer = (maxTime, onTimeUp, isGameOver) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    
    if (!isGameOver) {
      setIsRunning(true);
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime >= maxTime) {
            clearInterval(timer);
            setIsRunning(false);
            onTimeUp?.();
            return maxTime;
          }
          return prevTime + 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameOver, maxTime, onTimeUp]);

  useEffect(() => {
    if (isGameOver) {
      setIsRunning(false);
    }
  }, [isGameOver]);

  return { time, isRunning };
};