// src/components/DecorativeEffects.jsx
import React, { useEffect, useRef } from 'react';

const DecorativeEffects = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;
      container.appendChild(particle);
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="decorative-container">
      <div className="particles" ref={particlesRef} />
      <div className="connection-lines" />
      <div className="hexagon-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i} 
            className="hexagon"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="orb"
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default DecorativeEffects;