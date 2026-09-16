import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="mobile-phone-status-bar"
      className="w-full flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold select-none text-neutral-800 dark:text-neutral-200 bg-transparent shrink-0"
    >
      <span>{currentTime || '9:41'}</span>

      {/* Dynamic Island / Speaker Pill Mock */}
      <div className="w-20 h-4 bg-neutral-900 dark:bg-black rounded-full mx-auto hidden sm:flex items-center justify-center opacity-90">
        <div className="w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-950 ml-6" />
      </div>

      <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
        <span className="text-[10px] font-bold">5G</span>
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4 fill-current" />
      </div>
    </div>
  );
};
