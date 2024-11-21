import React from 'react';
import { ArrowLeft, User, Users2, Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = ({ currentPlayer, scores, timer, gameMode, onBack }) => {
  return (
    <header className="bg-card-bg/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap header-content">
          {/* Botones de navegación */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="neumorph-button p-2 text-primary hover:text-primary-light
              transition-colors duration-300"
              aria-label="Volver al menú principal"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <ThemeToggle />
          </div>

          {/* Información del juego */}
          <div className="flex items-center gap-8 player-info">
            {/* Timer con efecto de pulso */}
            <div className="flex items-center gap-2 neumorph-card p-2 px-4">
              <Clock className="w-5 h-5 text-primary pulse-animation" />
              <span className="text-xl font-bold text-primary">{timer}s</span>
            </div> 

            {/* Información de jugadores */}
            <div className="flex items-center gap-6">
              {gameMode === 'single' ? (
                <div className="flex items-center gap-2 neumorph-card p-2 px-4"
                     data-current-player={true}>
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-primary-light font-medium">
                    {scores.player1} pts
                  </span>
                </div>
              ) : (
                <>
                  <div className={`flex items-center gap-2 neumorph-card p-2 px-4
                    ${currentPlayer === 1 ? 'active-glow' : ''}`}
                    data-current-player={currentPlayer === 1}>
                    <User className={`w-5 h-5 ${currentPlayer === 1 ? 'text-primary pulse-animation' : 'text-text-secondary'}`} />
                    <span className={currentPlayer === 1 ? 'text-primary-light font-medium' : 'text-text-secondary'}>
                      {scores.player1} pts
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 neumorph-card p-2 px-4
                    ${currentPlayer === 2 ? 'active-glow' : ''}`}
                    data-current-player={currentPlayer === 2}>
                    <Users2 className={`w-5 h-5 ${currentPlayer === 2 ? 'text-primary pulse-animation' : 'text-text-secondary'}`} />
                    <span className={currentPlayer === 2 ? 'text-primary-light font-medium' : 'text-text-secondary'}>
                      {scores.player2} pts
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 