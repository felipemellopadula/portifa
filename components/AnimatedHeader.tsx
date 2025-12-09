import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedHeaderProps {
  onNavigateHome?: () => void;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ onNavigateHome }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lines = [
    "FELIPE",
    "MELLO",
    "PADULA"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.anim-letter');

    const ctx = gsap.context(() => {
      letters.forEach((letter) => {
        // Ensure initial state is outline (transparent fill)
        gsap.set(letter, { 
          color: 'transparent',
          opacity: 1 
        });

        // Randomly animate between outline (transparent) and filled (white)
        // This creates the "ascende e apaga" (light up/turn off) effect
        gsap.to(letter, {
          color: 'white', // Fills the letter
          duration: Math.random() * 0.5 + 0.5, // Random duration for the fade
          repeat: -1,
          repeatRefresh: true,
          yoyo: true, // Go back to transparent
          ease: "power1.inOut",
          delay: Math.random() * 5, // Random start
          repeatDelay: Math.random() * 3 + 1, // Wait randomly before lighting up again
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`fixed top-8 right-8 z-50 flex flex-col items-end ${onNavigateHome ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`}
      onClick={onNavigateHome}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex">
          {line.split('').map((char, charIndex) => (
            <span 
              key={`${lineIndex}-${charIndex}`} 
              className="anim-letter font-[Archivo Black] text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter leading-[0.85] text-outline-white select-none transition-colors will-change-[color]"
              style={{ fontFamily: '"Archivo Black", sans-serif' }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedHeader;