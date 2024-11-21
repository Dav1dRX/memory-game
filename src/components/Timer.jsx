import React from 'react';
import { Clock } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';

const Timer = ({ maxTime, onTimeUp, isGameOver }) => {
  const { time, isRunning } = useTimer(maxTime, onTimeUp, isGameOver);

  const formatTime = (seconds) => {
    return Math.min(seconds, maxTime).toString().padStart(2, '0');
  };

  return (
    <div className="fixed top-4 right-4 neumorph-card p-4 flex items-center gap-2">
      <Clock className="w-5 h-5 text-primary" />
      <span className="text-xl font-bold text-primary">
        {formatTime(time)}
      </span>
    </div>
  );
};

export default Timer;