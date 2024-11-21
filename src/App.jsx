import React, { useState, useCallback } from 'react';
import { Users, User, Trophy, Clock, Medal, Sparkles } from 'lucide-react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import { useGameState } from './hooks/useGameState';
import BackgroundEffects from './components/BackgroundEffects';
import DecorativeEffects from './components/DecorativeEffects';
import ParticleBackground from './components/ParticleBackground';

const App = () => {
  const [gameMode, setGameMode] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const {
    cards,
    currentPlayer,
    scores,
    timer,
    gameOver,
    bestScores,
    moves,
    resetScores,
    handleCardClick,
    initGame
  } = useGameState();

  const startGame = useCallback((mode) => {
    setGameMode(mode);
    setShowWelcome(false);
    initGame(mode);
  }, [initGame]);

  const handleGameReset = useCallback(() => {
    initGame(gameMode);
  }, [gameMode, initGame]);

  if (showWelcome) {
    return (
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        <BackgroundEffects />
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header con efecto de brillo */}
          <header className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/10 via-primary/20 to-primary-dark/10 blur-3xl"/>
            <h1 className="text-5xl font-bold text-primary mb-4 relative">
              Memory Game
              <Sparkles className="absolute -right-8 -top-4 w-6 h-6 text-primary-light animate-pulse" />
            </h1>
            <p className="text-text-secondary text-lg">¡Pon a prueba tu memoria y desafía a tus amigos!</p>
          </header>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Modo Un Jugador */}
              <div 
                className="neumorph-card p-8 hover:scale-[1.02] transition-all duration-300 relative z-10"
                onClick={() => startGame('single')}
              >
                <div className="text-center space-y-6">
                  <div className="relative">
                    <User className="w-16 h-16 mx-auto text-primary" />
                    <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10"/>
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-light">Un Jugador</h2>
                  <p className="text-text-secondary">¡Supera tu mejor tiempo y puntuación!</p>
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <Trophy className="w-5 h-5" />
                    <span>Mejor puntuación: {bestScores.single?.[0]?.score || 0}</span>
                  </div>
                  <button 
                    className="neumorph-button w-full py-3 px-6 text-primary hover:text-primary-light
                    transition-colors duration-300"
                  >
                    Jugar Solo
                  </button>
                </div>
              </div>

              {/* Modo Multijugador */}
              <div 
                className="neumorph-card p-8 hover:scale-[1.02] transition-all duration-300 relative z-10"
                onClick={() => startGame('multi')}
              >
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Users className="w-16 h-16 mx-auto text-primary" />
                    <div className="absolute inset-0 bg-primary/10 blur-2xl -z-10"/>
                  </div>
                  <h2 className="text-2xl font-semibold text-primary-light">Multijugador</h2>
                  <p className="text-text-secondary">¡Compite contra un amigo!</p>
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <Medal className="w-5 h-5" />
                    <span>Récords: {Array.isArray(bestScores.multi) ? bestScores.multi.length : 0}</span>
                  </div>
                  <button 
                    className="neumorph-button w-full py-3 px-6 text-primary hover:text-primary-light
                    transition-colors duration-300"
                  >
                    Jugar con Amigos
                  </button>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="mt-12">
              <div className="neumorph-card p-8 relative z-10">
                <h3 className="text-2xl font-semibold text-primary-light mb-6">Cómo Jugar</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"/>
                    <span className="text-text">Encuentra pares de cartas coincidentes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"/>
                    <span className="text-text">Recuerda la ubicación de las cartas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"/>
                    <span className="text-text">
                      {gameMode === 'single' 
                        ? 'Completa el juego en el menor tiempo posible'
                        : 'Consigue más puntos que tu oponente'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Header
          currentPlayer={currentPlayer}
          scores={scores}
          timer={timer}
          gameMode={gameMode}
          onBack={() => setShowWelcome(true)}
        />

        <main className="container mx-auto px-4 py-8">
          <GameBoard
            cards={cards}
            onCardClick={handleCardClick}
            currentPlayer={currentPlayer}
          />

          <ScoreBoard
            bestScores={bestScores}
            currentScores={scores}
            gameMode={gameMode}
            moves={moves}
            onResetScores={resetScores}
          />

          {gameOver && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="neumorph-card p-8 w-96">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Trophy className="w-20 h-20 text-primary mx-auto" />
                    <div className="absolute inset-0 bg-primary/20 blur-3xl"/>
                  </div>
                  <h2 className="text-3xl font-bold text-primary">¡Juego Terminado!</h2>
                  
                  {gameMode === 'single' ? (
                    <div className="space-y-4">
                      <p className="text-2xl text-primary-light">
                        Tu puntuación: {scores.player1}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-text-secondary">
                        <Clock className="w-5 h-5" />
                        <span>Tiempo: {timer}s</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-text-secondary">
                        <span>Movimientos: {moves}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xl text-primary-light">
                        {scores.player1 > scores.player2
                          ? '¡Jugador 1 Gana!'
                          : scores.player2 > scores.player1
                          ? '¡Jugador 2 Gana!'
                          : '¡Empate!'}
                      </p>
                      <div className="neumorph-inset p-4 space-y-2">
                        <p className="text-text">Jugador 1: {scores.player1} puntos</p>
                        <p className="text-text">Jugador 2: {scores.player2} puntos</p>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button 
                      className="neumorph-button w-full py-3 px-6 text-primary hover:text-primary-light transition-colors duration-300"
                      onClick={handleGameReset}
                    >
                      Jugar de Nuevo
                    </button>
                    <button 
                      className="neumorph-button w-full py-3 px-6 text-primary hover:text-primary-light transition-colors duration-300"
                      onClick={() => setShowWelcome(true)}
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;