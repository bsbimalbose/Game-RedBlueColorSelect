const GAME_STATES = [
  {
    qText: 'blue',
    qColor: 'red',
    a1Text: 'red',
    a1Color: 'blue',
    a2Text: 'blue',
    a2Color: 'red',
  },
  {
    qText: 'red',
    qColor: 'red',
    a1Text: 'blue',
    a1Color: 'red',
    a2Text: 'red',
    a2Color: 'blue',
  },
  {
    qText: 'red',
    qColor: 'blue',
    a1Text: 'red',
    a1Color: 'blue',
    a2Text: 'blue',
    a2Color: 'red',
  },
];
let count = 0;
// export const getNewGameState = () => GAME_STATES[Math.floor(Math.random() * 3)];
export const getNewGameState = () => {
  if (count < 2) {
    count++;
  } else {
    count = 0;
  }
  return GAME_STATES[count];
};
