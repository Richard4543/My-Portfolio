import React, { useEffect, useState, useCallback } from 'react';
import './SunMoon.css';

export default function SunMoonAnimation() {
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [manualMode, setManualMode] = useState<boolean>(false);

  const updateTime = useCallback((h?: number) => {
    const newHour = h !== undefined ? h : new Date().getHours();
    setHour(newHour);
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    const world = document.getElementById('world');
    const body = document.body;

    let sunTop = '450px';
    let moonTop = '450px';

    if (newHour < 5) {
      moonTop = `${(newHour / 4) * 250 + 50}px`;
      body.style.backgroundColor = '#002551';
      if (world) world.style.borderBottom = '5px solid #67a8f1';
    } else if (newHour < 12) {
      sunTop = `${300 - (((newHour - 5) / 7) * 290)}px`;
      body.style.backgroundColor = '#f4c042';
      if (world) world.style.borderBottom = '5px solid #7a6021';
    } else if (newHour < 19) {
      sunTop = `${(((newHour - 12) / 7) * 290) + 50}px`;
      body.style.backgroundColor = '#f4c042';
      if (world) world.style.borderBottom = '5px solid #7a6021';
    } else {
      moonTop = `${250 - (((newHour - 19) / 5) * 250) + 50}px`;
      body.style.backgroundColor = '#002551';
      if (world) world.style.borderBottom = '5px solid #67a8f1';
    }

    if (sun) sun.style.top = sunTop;
    if (moon) moon.style.top = moonTop;
  }, []);

  useEffect(() => {
    if (!manualMode) {
      updateTime();
      const id = window.setInterval(() => updateTime(), 60000);
      return () => clearInterval(id);
    }
  }, [manualMode, updateTime]);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value, 10);
    setManualMode(true);
    updateTime(h);
  };

  const resetAuto = () => {
    setManualMode(false);
    updateTime();
  };

  const isDay = hour >= 6 && hour < 18;

  return (
    <>
      {/* Fullscreen sky container */}
      <div id="world" className="fixed inset-0 -z-10 pointer-events-none" />

      {/* Conditionally render only the sun or the moon */}
      {isDay ? (
        <div
          id="sun"
          className="fixed left-1/2 transform -translate-x-1/2"
          style={{ top: '20%' }}
        >
          <div className="sunbeams">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`beam beam${i + 1}`} />
            ))}
          </div>
          <div className="eyes">
            <div className="eyes-l" />
            <div className="eyes-r" />
          </div>
        </div>
      ) : (
        <div
          id="moon"
          className="fixed left-1/2 transform -translate-x-1/2"
          style={{ top: '20%' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`crater crater${i + 1}`} />
          ))}
          <div className="eyes">
            <div className="eyes-l" />
            <div className="eyes-r" />
          </div>
        </div>
      )}

      {/* Slider & Auto toggle (desktop only) */}
      <div className="hidden lg:flex fixed right-4 top-1/2 transform -translate-y-1/2 z-20 flex-col items-center space-y-20">
        <input
          type="range"
          min={0}
          max={23}
          value={hour}
          onChange={onSliderChange}
          className="slider transform -rotate-90 origin-center w-40 pointer-events-auto"
        />
        <button
          onClick={resetAuto}
          className="px-3 py-1 rounded-full text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition"
        >
          Auto
        </button>
      </div>
    </>
  );
}
