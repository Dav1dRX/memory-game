import { useState, useEffect, useCallback } from 'react';
import { GAME_CONFIG } from '@/constants/gameConfig';
import { createBoard, checkForMatch } from '@/utils/gameLogic';
import { calculateScore } from '@/utils/scoreCalculator';

export const useGameState = () => {
  // Estados básicos del juego
  const [cards, setCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [timer, setTimer] = useState(GAME_CONFIG.INITIAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameMode, setGameMode] = useState('single');
  const [gameStarted, setGameStarted] = useState(false);

  // Cargar mejores puntuaciones del localStorage
  const [bestScores, setBestScores] = useState(() => {
    try {
      const saved = localStorage.getItem('memoryGameBestScores');
      return saved ? JSON.parse(saved) : { single: [], multi: [] };
    } catch {
      return { single: [], multi: [] };
    }
  });

  // Inicializar juego
  const initGame = useCallback((mode = 'single') => {
    const newBoard = createBoard('EASY');
    setCards(newBoard);
    setCurrentPlayer(1);
    setScores({ player1: 0, player2: 0 });
    setTimer(GAME_CONFIG.INITIAL_TIME);
    setGameOver(false);
    setFlippedCards([]);
    setMoves(0);
    setGameMode(mode);
    setGameStarted(false);
  }, []);

  // Efecto para el temporizador
  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, timer]);

  // Función para actualizar mejores puntuaciones
  const updateBestScores = useCallback(() => {
    const matchedPairs = cards.filter(card => card.isMatched).length / 2;
    const timeSpent = GAME_CONFIG.INITIAL_TIME - timer;
    const currentScore = calculateScore(moves, timeSpent, matchedPairs);

    setBestScores(prev => {
      const newBestScores = { ...prev };
      const newScore = {
        score: currentScore,
        time: timeSpent,
        moves: moves,
        date: new Date().toISOString()
      };

      const modeScores = [...(prev[gameMode] || []), newScore];
      modeScores.sort((a, b) => b.score - a.score);
      newBestScores[gameMode] = modeScores.slice(0, GAME_CONFIG.MAX_BEST_SCORES);

      localStorage.setItem('memoryGameBestScores', JSON.stringify(newBestScores));
      return newBestScores;
    });
  }, [cards, timer, moves, gameMode]);

  // Manejar click en carta
  const handleCardClick = useCallback((index) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    if (gameOver || flippedCards.length === 2 || cards[index].isFlipped) {
      return;
    }

    // Voltear carta
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    // Actualizar cartas volteadas
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Incrementar movimientos SOLO cuando se han volteado dos cartas
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);

      const [firstIndex, secondIndex] = newFlippedCards;
      const isMatch = checkForMatch(cards, firstIndex, secondIndex);

      setTimeout(() => {
        const updatedCards = [...newCards];

        if (isMatch) {
          // Manejar coincidencia
          updatedCards[firstIndex].isMatched = true;
          updatedCards[secondIndex].isMatched = true;

          // Actualizar puntuación
          const matchedPairs = updatedCards.filter(card => card.isMatched).length / 2;
          const timeSpent = GAME_CONFIG.INITIAL_TIME - timer;
          const currentScore = calculateScore(moves, timeSpent, matchedPairs);
          
          setScores(prev => ({
            ...prev,
            [`player${currentPlayer}`]: currentScore
          }));

          // Verificar fin del juego
          if (updatedCards.every(card => card.isMatched)) {
            setGameOver(true);
            updateBestScores();
          }
        } else {
          // Manejar no coincidencia
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;
          
          if (gameMode === 'multi') {
            setCurrentPlayer(prev => prev === 1 ? 2 : 1);
          }
        }

        setCards(updatedCards);
        setFlippedCards([]);
      }, GAME_CONFIG.MATCH_DELAY);
    }
  }, [cards, flippedCards, currentPlayer, gameOver, gameStarted, timer, moves, gameMode, updateBestScores]);

  // Función para reiniciar puntuaciones mejorada
  const resetScores = useCallback(() => {
    const emptyScores = { single: [], multi: [] };
    
    // Limpiar localStorage
    localStorage.removeItem('memoryGameBestScores');
    localStorage.setItem('memoryGameBestScores', JSON.stringify(emptyScores));
    
    // Actualizar estados
    setBestScores(emptyScores);
    setScores({ player1: 0, player2: 0 });
    setMoves(0);
    
    // Reiniciar el juego
    initGame(gameMode);
  }, [gameMode, initGame]);

  return {
    cards,
    currentPlayer,
    scores,
    timer,
    gameOver,
    bestScores,
    moves,
    gameMode,
    gameStarted,
    handleCardClick,
    initGame,
    resetScores
  };
};
