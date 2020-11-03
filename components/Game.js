import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { getInitialGameState, validateChoice } from '../utils/client';
import { getNewGameState } from '../utils/gameStates';
import GameOver from './GameOver';
import Play from './Play';
import StartSplash from './StartSplash';

export default function Game() {
  const winAudio = useRef({});
  const loseAudio = useRef({});

  const initialGameInstance = {
    gameOver: false,
    score: 0,
    highestScore: 0,
  };
  const [gameState, setGameState] = useState({});
  const [gameInstance, setGameInstance] = useState(initialGameInstance);

  useEffect(() => {
    if (process.browser) {
      winAudio.current = new Audio('/sounds/correct1.wav');
      loseAudio.current = new Audio('/sounds/wrong.wav');
    }
  }, []);

  const resetGameInstance = async () => {
    const { data } = await getInitialGameState();
    setGameState(data.gameState);
  };

  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const increaseScore = () =>
    setGameInstance((prevInstance) => ({
      ...prevInstance,
      score: prevInstance.score + 1,
      highestScore:
        prevInstance.score + 1 > prevInstance.highestScore
          ? prevInstance.score + 1
          : prevInstance.highestScore,
    }));

  const resetScore = () =>
    setGameInstance((prevInstance) => ({
      ...prevInstance,
      score: 0,
    }));

  const nextRound = (newGameState) => {
    setGameState(newGameState);
    setIsCorrectAnswer(false);
  };

  const handleWin = (newGameState) => {
    winAudio?.current?.play?.();
    setIsCorrectAnswer(true);
    increaseScore();
  };

  const handleLose = (newGameState) => {
    loseAudio?.current?.play?.();
    setIsCorrectAnswer(false);
    resetScore();
  };

  const handleClick = async (clickedAnswer) => {
    // FE - instant validation
    if (
      (clickedAnswer || '').trim().toLowerCase() ===
      (gameState.qColor || '').trim().toLowerCase()
    ) {
      handleWin();
    } else {
      handleLose();
    }

    try {
      const { data } = await validateChoice(clickedAnswer);
      const { gameState: newGameState } = data;
      nextRound(newGameState);
    } catch (error) {}
  };

  const handleTimeEnd = () => {
    // alert('Game Over');
    setMode('game-over');
  };

  const [mode, setMode] = useState('splash');
  useEffect(() => {
    if (mode === 'splash') {
      resetGameInstance();
    }
  }, [mode]);

  if (mode === 'splash') {
    return (
      <StartSplash
        handleStart={() => {
          setMode('play');
        }}
      />
    );
  }

  if (mode === 'game-over') {
    return (
      <GameOver
        playAgain={() => setMode('splash')}
        score={gameInstance?.highestScore || 0}
      />
    );
  }

  return (
    <Play
      gameState={gameState || {}}
      score={gameInstance?.score || 0}
      handleClick={handleClick}
      isCorrect={isCorrectAnswer}
      handleTimeEnd={handleTimeEnd}
    />
  );
}
