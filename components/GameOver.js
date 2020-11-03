import React from 'react';
import Button from './Button';

export default function GameOver({ playAgain, close, score }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container  text-center p-2 md:p-12">
        <div className="text-2xl md:text-3xl py-2">Game Over</div>
        <div className="text-4xl md:text-6xl py-2">Top Score: {score}</div>
        <div>
          <div className="text-2xl md:text-3xl py-2">Play Again ?</div>
          <div className="flex justify-center py-2">
            <Button className="mx-2" handleClick={playAgain}>
              Yes
            </Button>
            <Button className="mx-2" handleClick={close}>
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
