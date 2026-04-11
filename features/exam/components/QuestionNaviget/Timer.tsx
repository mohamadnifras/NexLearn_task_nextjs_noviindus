import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface TimerProps {
    totalTime: number;
    onTimeUp: () => void;
    onTimeUpdate: (timeString: string) => void;
}

function Timer({totalTime,onTimeUp,onTimeUpdate}:TimerProps) {
    const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
      if (totalTime > 0) {
          setSeconds(totalTime * 60);
      }
  }, [totalTime]);

  useEffect(() => {
      if (seconds === null || seconds <= 0) return;

      const interval = setInterval(() => {
          setSeconds((prev) => {
              if (prev === null) return null;
              if (prev <= 1) {
                  clearInterval(interval);
                  onTimeUp();
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);

      return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  useEffect(() => {
      if (seconds !== null && onTimeUpdate) {
          onTimeUpdate(formatTime(seconds)); // <-- call parent every update
      }
  }, [seconds, onTimeUpdate]);

  const formatTime = (secs: number) => {
      const min = Math.floor(secs / 60);
      const sec = secs % 60;
      return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  if (seconds === null) {
      return <div className="text-[16px] font-semibold text-center">Loading timer...</div>;
  }
  return (
     <div className="text-[13px] w-fit px-2 py-1 text-white font-semibold rounded-sm bg-PrimaryBg text-center mb-4 flex items-center gap-2">
          <Image src="/exam/timer.svg" alt="Timer Icon" width={15} height={15} className="w-4 h-4 object-contain" />
          {formatTime(seconds)}
      </div>
  )
}

export default Timer