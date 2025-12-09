import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface SidebarProps {
  onNavigate: (view: 'home' | 'about') => void;
  currentView: 'home' | 'about' | 'project';
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  // If we are in 'project' mode, clicking the main button should go back home
  const handleClick = () => {
    if (currentView === 'about') {
      onNavigate('home');
    } else if (currentView === 'project') {
      onNavigate('home');
    } else {
      onNavigate('about');
    }
  };

  const buttonText = currentView === 'about' ? 'close' : (currentView === 'project' ? 'close project' : 'about me');
  const icon = (currentView === 'about' || currentView === 'project') ? 'X' : '+';
  
  // Helper to determine if we should hide the extra info
  const isProjectView = currentView === 'project';

  useEffect(() => {
    // If we are in project view, the element is not rendered, so we don't animate.
    if (isProjectView) return;

    const phrases = [
      "Sou Diretor de Arte",
      "Sou um baixista ocasional",
      "Sou um leitor ávido",
      "Um cinéfilo de nascença"
    ];

    const ctx = gsap.context(() => {
      // Blinking cursor
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)"
        });
      }

      // Typewriter timeline
      const tl = gsap.timeline({ repeat: -1 });

      phrases.forEach((phrase) => {
        // Type In
        tl.to({}, {
          duration: phrase.length * 0.08,
          ease: "none",
          onUpdate: function () {
            if (textRef.current) {
              const progress = this.progress();
              const numChars = Math.ceil(progress * phrase.length);
              textRef.current.innerText = phrase.substring(0, numChars);
            }
          }
        });

        // Hold
        tl.to({}, { duration: 1.5 });

        // Delete
        tl.to({}, {
          duration: phrase.length * 0.04,
          ease: "none",
          onUpdate: function () {
            if (textRef.current) {
              const progress = this.progress();
              const numChars = Math.ceil((1 - progress) * phrase.length);
              textRef.current.innerText = phrase.substring(0, numChars);
            }
          }
        });

        // Pause before next
        tl.to({}, { duration: 0.5 });
      });

    });

    return () => ctx.revert();
  }, [isProjectView]);

  return (
    <div className="fixed bottom-8 right-8 z-40 text-right font-mono text-sm md:text-base leading-relaxed mix-blend-difference text-white md:block hidden">
      
      {!isProjectView && (
        <div className="mb-8">
          <p className="font-bold">Bem-vindo ao meu Portfolio</p>
          <br/>
          <p>
            <span ref={textRef} className="inline-block min-h-[1.5em]">Sou Diretor de Arte</span>
            <span ref={cursorRef} className="ml-1">|</span>
            <br/>
            baseado em São Paulo-Brasil
          </p>
        </div>
      )}

      {!isProjectView && (
        <div className="mb-8">
          <p className="cursor-pointer hover:underline">Available for freelance</p>
        </div>
      )}

      <div className="flex flex-col gap-1 items-end">
        <button 
          onClick={handleClick}
          className="flex items-center gap-2 hover:line-through decoration-2 group text-white uppercase"
        >
          <span>{buttonText}</span>
          <span className={`font-bold transition-transform duration-300 ${currentView === 'about' ? 'rotate-90' : ''}`}>
            {icon}
          </span>
        </button>
        <a href="#" className="flex items-center gap-2 hover:line-through decoration-2 text-white">
          <span>contact</span>
          <span className="font-bold">X</span>
        </a>
      </div>

      {!isProjectView && (
        <div className="mt-8 flex flex-col gap-1 items-end">
          <a href="#" className="flex items-center gap-2 hover:line-through decoration-2 text-white">
            <span>behance</span>
            <span className="font-bold">X</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:line-through decoration-2 text-white">
            <span>facebook</span>
            <span className="font-bold">X</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:line-through decoration-2 text-white">
            <span>youtube</span>
            <span className="font-bold">X</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:line-through decoration-2 text-white">
            <span>dribble</span>
            <span className="font-bold">X</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;