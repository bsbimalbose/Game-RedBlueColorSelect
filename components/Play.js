import React, { useEffect, useState } from 'react';
import Button from './Button';
import Timer from './Timer';

export default function Play({
  gameState,
  score,
  handleClick,
  isCorrect,
  handleTimeEnd,
}) {
  const { qText, a1Text, a2Text, qColor, a1Color, a2Color } = gameState;
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    setClicked(0);
  }, [gameState]);

  return (
    <div className="container text-center p-2 md:p-12">
      <div className="flex flex-row-reverse ">
        <div className="text-3xl p-4 rounded-full">
          <Timer start={40} handleTimeEnd={handleTimeEnd} />
        </div>
      </div>
      <div
        className={`question game-txt-${(qColor || '').trim().toLowerCase()}`}
      >
        {qText}
      </div>
      <div className="font-bold text-xs p-4 text-center">
        Select an option below:
      </div>
      <div className="flex justify-evenly">
        <Button
          disabled={clicked}
          className={`game-txt-${(a1Color || '').trim().toLowerCase()} ${
            clicked ? 'opacity-50' : ''
          }`}
          handleClick={() => {
            setClicked(1);
            handleClick(a1Text, 1);
          }}
          icon={clicked === 1 && (isCorrect ? 'tick' : 'cross')}
        >
          {a1Text}
        </Button>
        <Button
          disabled={clicked}
          className={`btn game-txt-${(a2Color || '').trim().toLowerCase()} ${
            clicked ? 'opacity-50' : ''
          }`}
          handleClick={() => {
            setClicked(2);
            handleClick(a2Text, 2);
          }}
          icon={clicked === 2 && (isCorrect ? 'tick' : 'cross')}
        >
          {a2Text}
        </Button>
      </div>
      <div className="flex justify-center">Score: {score}</div>
    </div>
  );
}
