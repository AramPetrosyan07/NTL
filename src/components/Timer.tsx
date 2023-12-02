import React, { useState, useEffect } from 'react';

interface TimerProps {
  durationInSeconds: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationInSeconds, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState<number>(durationInSeconds);

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout();
    }

    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, onTimeout]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div>{formatTime(remainingTime)}</div>;
};

export default Timer;
