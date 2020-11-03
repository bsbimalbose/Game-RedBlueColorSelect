import React from 'react';
import Timer from './Timer';

export default function StartSplash({ handleStart }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="star-12 flex justify-center items-center animate-bounce">
        <Timer
          start={3}
          handleTimeEnd={handleStart}
          className="relative z-10 text-3xl"
        />
      </div>
    </div>
  );
}
