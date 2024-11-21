import { GAME_CONFIG } from '@/constants/gameConfig';

export const calculateScore = (moves, timeLeft, matchedPairs) => {
  const baseScore = matchedPairs * GAME_CONFIG.POINTS_PER_MATCH;
  const timeBonus = timeLeft > 0 ? Math.floor(timeLeft * 0.5) : 0;
  const movePenalty = Math.max(0, moves - matchedPairs * 2) * 1;
  
  return Math.max(0, baseScore + timeBonus - movePenalty);
};

export const updateScores = (currentPlayer, matchedPairs, scores) => {
  const pointsForMatch = GAME_CONFIG.POINTS_PER_MATCH;
  
  return {
    ...scores,
    [`player${currentPlayer}`]: scores[`player${currentPlayer}`] + pointsForMatch
  };
};

export const getBestScore = (scores, gameMode) => {
  if (!scores || !scores[gameMode] || scores[gameMode].length === 0) {
    return null;
  }
  
  return scores[gameMode][0];
};