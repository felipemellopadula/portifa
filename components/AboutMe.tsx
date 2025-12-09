import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.anim-letter-about');

    const ctx = gsap.context(() => {
      // Image reveal animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2
        });
      }

      // Blinking text animation (reusing logic from AnimatedHeader)
      letters.forEach((letter) => {
        gsap.set(letter, { 
          color: 'transparent',
          opacity: 1 
        });

        gsap.to(letter, {
          color: 'white',
          duration: Math.random() * 0.5 + 0.5,
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2,
          repeatDelay: Math.random() * 3 + 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full text-white animate-in fade-in duration-700">
      {/* Animated Header */}
      <div className="mb-12 md:mb-20">
        {["ABOUT", "ME"].map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            {line.split('').map((char, charIndex) => (
              <span 
                key={`${lineIndex}-${charIndex}`} 
                className="anim-letter-about font-[Archivo Black] text-[5rem] md:text-[8rem] lg:text-[11rem] uppercase tracking-tighter leading-[0.85] text-outline-white select-none"
                style={{ fontFamily: '"Archivo Black", sans-serif' }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        {/* Left Column - Content */}
        <div className="md:col-span-5 flex flex-col gap-10 font-light leading-relaxed text-sm md:text-base">
          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">Biography</h3>
            <p className="mb-6">
              I am a multi-disciplinary designer and art director based in São Paulo, dedicated to crafting immersive digital experiences and strong visual identities.
            </p>
            <p>
              My work sits at the intersection of design, technology, and art. I believe in the power of motion and interactivity to tell stories that resonate. Every project is an opportunity to challenge the conventional and explore the new.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">Services</h3>
              <ul className="flex flex-col gap-2 opacity-90">
                <li>Art Direction</li>
                <li>Digital Design</li>
                <li>UI/UX</li>
                <li>Motion Design</li>
                <li>Front-end Dev</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">Recognition</h3>
              <ul className="flex flex-col gap-2 opacity-90">
                <li>Awwwards x2</li>
                <li>FWA Site of the Day</li>
                <li>Behance Featured</li>
                <li>CSS Design Awards</li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
             <p className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">Socials</p>
             <div className="flex gap-4">
               <a href="#" className="hover:text-black hover:bg-white px-2 py-1 -ml-2 transition-all duration-300 hover:scale-105">Instagram</a>
               <a href="#" className="hover:text-black hover:bg-white px-2 py-1 transition-all duration-300 hover:scale-105">LinkedIn</a>
               <a href="#" className="hover:text-black hover:bg-white px-2 py-1 transition-all duration-300 hover:scale-105">Twitter</a>
             </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="md:col-span-7">
          <div className="relative overflow-hidden w-full h-[60vh] md:h-[80vh] bg-black/20">
            <img 
              ref={imageRef}
              src="https://i.ibb.co/DgRQVtfj/felipe.jpg"
              onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 // Fallback attempt if direct link construction fails
                 if (target.src !== 'https://ibb.co/DgRQVtfj') {
                    target.src = 'https://ibb.co/DgRQVtfj';
                 }
              }}
              alt="Felipe Mello Padula" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;