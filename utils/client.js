import axios from 'axios';

const baseURL = process.browser ? window.location.origin : '';
export const getInitialGameState = () => axios.get(`${baseURL}/api/game-state`);
export const validateChoice = (choice) =>
  axios.post(`${baseURL}/api/game-state`, { choice });
