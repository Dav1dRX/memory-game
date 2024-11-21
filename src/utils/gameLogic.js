import { GAME_CONFIG } from '@/constants/gameConfig';

export const createBoard = (difficulty = 'MEDIUM') => {
  const pairs = GAME_CONFIG.DIFFICULTY_LEVELS[difficulty].pairs;
  const symbols = [...GAME_CONFIG.SYMBOLS].slice(0, pairs);
  const cards = [...symbols, ...symbols].map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false
  }));


  return cards.sort(() => Math.random() - 0.5);
};

export const checkForMatch = (cards, firstIndex, secondIndex) => {
  const firstCard = cards[firstIndex];
  const secondCard = cards[secondIndex];
  
  return firstCard.symbol === secondCard.symbol;
};

export const updateGameState = (gameState, index) => {
  const { cards, flippedCards, currentPlayer, scores } = gameState;
  const newCards = [...cards];
  const newFlippedCards = [...flippedCards, index];
  let newCurrentPlayer = currentPlayer;
  let newScores = { ...scores };

  if (newFlippedCards.length === 2) {
    const [firstIndex, secondIndex] = newFlippedCards;
    const isMatch = checkForMatch(cards, firstIndex, secondIndex);

    if (isMatch) {
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      newScores[`player${currentPlayer}`] += GAME_CONFIG.POINTS_PER_MATCH;
    } else {
      // Cambiar de jugador solo en modo multijugador y cuando no hay match
      if (gameState.gameMode === 'multi') {
        newCurrentPlayer = currentPlayer === 1 ? 2 : 1;
      }
    }
  }

  return {
    cards: newCards,
    flippedCards: newFlippedCards,
    currentPlayer: newCurrentPlayer,
    scores: newScores
  };
};