import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameBoard = ({ cards, onCardClick, currentPlayer }) => {
  // Calcula el número de columnas basado en el número total de cartas
  const calculateGridCols = (totalCards) => {
    // Para 12 cartas (6 pares): 4x3
    if (totalCards === 12) return 4;
    // Para 16 cartas (8 pares): 4x4
    if (totalCards === 16) return 4;
    // Para 20 cartas (10 pares): 5x4
    if (totalCards === 20) return 5;
    return 4; // Default fallback
  };

  const gridCols = calculateGridCols(cards.length);

  const cardVariants = {
    hidden: { 
      rotateY: 180, 
      scale: 0.8,
      opacity: 0.6 
    },
    visible: { 
      rotateY: 0, 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    matched: { 
      scale: 0.9, 
      opacity: 0.5,
      boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.2), inset -3px -3px 6px rgba(255,255,255,0.05)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div 
        className={`grid gap-6 game-grid`}
        style={{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridAutoRows: '1fr'
        }}
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial="hidden"
              animate={card.isMatched ? "matched" : card.isFlipped ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              className="aspect-square"
            >
              <div
                className={`w-full h-full neumorph-card cursor-pointer transition-all duration-300
                  ${card.isMatched ? 'opacity-60' : 'glow-effect'}
                  ${!card.isMatched && !card.isFlipped ? 'hover:active-glow' : ''}
                  ${card.isFlipped ? 'pulse-animation' : ''}
                `}
                onClick={() => !card.isMatched && !card.isFlipped && onCardClick(index)}
              >
                <div className="flex items-center justify-center h-full relative">
                  {card.isFlipped ? (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-5xl text-primary"
                    >
                      {card.symbol}
                    </motion.span>
                  ) : (
                    <div 
                      className={`w-full h-full rounded-xl neumorph-inset
                        ${currentPlayer === 1 ? 'border-primary-light/20' : 'border-green-400/20'}
                        border-2 transition-all duration-300
                      `} 
                    />
                  )}
                  
                  {!card.isMatched && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-primary-light/10 to-transparent" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-primary-light/10 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameBoard;