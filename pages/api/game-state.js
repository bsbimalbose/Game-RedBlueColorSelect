import { GAME_STATES } from '../../utils/constants';

const userGameStateMap = {};

export default (req, res) => {
  const userId = req?.body?.userId || 'defaultUser';
  let success = false;
  let usersGameInfo = userGameStateMap?.[userId];

  if (!usersGameInfo) {
    userGameStateMap[userId] = {};
    usersGameInfo = userGameStateMap[userId];
  }
  console.log(userGameStateMap);

  if (req.method === 'POST') {
    if (
      (req?.body?.choice || '').trim().toLowerCase() ===
      (GAME_STATES[usersGameInfo.index].qColor || '').trim().toLowerCase()
    ) {
      success = true;
      let { topScore } = usersGameInfo;
      usersGameInfo.score++;
      usersGameInfo.topScore =
        usersGameInfo.score > topScore ? usersGameInfo.score : topScore;
    } else {
      usersGameInfo.score = 0;
    }
  } else {
    usersGameInfo.score = 0;
    usersGameInfo.topScore = 0;
  }

  let currentIndex = Math.floor(Math.random() * 3);

  if (currentIndex === usersGameInfo.index) {
    currentIndex = (currentIndex + 1) % 3;
  }
  usersGameInfo.index = currentIndex;
  const newGameState = GAME_STATES[currentIndex];
  console.log(userGameStateMap);
  res.statusCode = 200;
  res.json({
    success,
    gameState: newGameState,
    score: usersGameInfo.score || 0,
    topScore: usersGameInfo.topScore || 0,
  });
};
