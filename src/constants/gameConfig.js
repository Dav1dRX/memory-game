export const GAME_CONFIG = {
  INITIAL_TIME: 60,
  POINTS_PER_MATCH: 10,
  SYMBOLS: ['★', '♦', '♥', '♠', '♣', '⬟', '♪', '♫', '☀', '☂'],
  ANIMATION_DURATION: 300,
  MATCH_DELAY: 500,
  MISMATCH_DELAY: 1000,
  MAX_BEST_SCORES: 5,
  DIFFICULTY_LEVELS: {
    EASY: {
      pairs: 6,    // 12 cartas total (4x3 grid)
      time: 60,
      gridCols: 4  // Esto asegurará un layout 4x3
    },
    MEDIUM: {
      pairs: 8,    // 16 cartas total (4x4 grid)
      time: 60,
      gridCols: 4
    },
    HARD: {
      pairs: 10,   // 20 cartas total (5x4 grid)
      time: 45,
      gridCols: 5  // Cambiado a 5 para mejor distribución
    }
  }
};