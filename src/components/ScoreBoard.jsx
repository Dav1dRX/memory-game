import React from 'react';
import { Trophy, Medal, Clock, Zap, RefreshCw, Move } from 'lucide-react';

const ScoreBoard = ({ bestScores, currentScores, gameMode, moves, onResetScores }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="scoreboard-container transition-all duration-300">
      <div className="neumorph-card bg-card-bg p-4">
        <div className="pb-3 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
            <Trophy className="w-5 h-5" />
            {gameMode === 'single' ? 'Mejor Puntuación' : 'Puntuaciones'}
          </h2>
          <button
            onClick={onResetScores}
            className="neumorph-button p-2 rounded-full hover:bg-primary/10 transition-colors"
            title="Reiniciar puntuaciones"
          >
            <RefreshCw className="w-4 h-4 text-primary" />
          </button>
        </div>
          
        <div className="space-y-4 mt-4">
          {/* Puntuación actual */}
          <div className="neumorph-inset p-4">
            <h3 className="text-sm font-medium text-primary-light mb-3">
              Partida Actual
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Puntos</span>
                <span className="font-semibold text-primary">{currentScores.player1}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Movimientos</span>
                <span className="font-semibold text-primary">{moves || 0}</span>
              </div>
            </div>
          </div>

          {/* Hall de la Fama */}
          <div className="neumorph-inset p-4">
            <h3 className="text-sm font-medium text-primary-light mb-3">Hall de la Fama</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {bestScores[gameMode] && bestScores[gameMode].length > 0 ? (
                bestScores[gameMode].map((score, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col p-2 rounded-lg gradient-bg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Medal className="w-4 h-4 text-yellow-400" />}
                        {index === 1 && <Medal className="w-4 h-4 text-gray-400" />}
                        {index === 2 && <Medal className="w-4 h-4 text-amber-600" />}
                        <span className="text-sm text-primary">{score.score} pts</span>
                      </div>
                      {gameMode === 'single' && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(score.time)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <Move className="w-3 h-3" />
                            <span>{score.moves}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <span className="text-sm text-text-secondary">No hay puntuaciones</span>
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas adicionales */}
          {gameMode === 'single' && (
            <div className="neumorph-inset p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-primary-light">
                  <Zap className="w-4 h-4" />
                  <span>Mejor tiempo:</span>
                </div>
                <span className="text-primary">
                  {bestScores.single && bestScores.single[0]?.time 
                    ? formatTime(bestScores.single[0].time)
                    : '--:--'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;