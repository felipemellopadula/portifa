// src/components/AboutMe.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const letters = containerRef.current.querySelectorAll(".anim-letter-about");
    const ctx = gsap.context(() => {
      if (imageRef.current)
        gsap.from(imageRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        });
      letters.forEach((letter) => {
        gsap.set(letter, { color: "transparent", opacity: 1 });
        gsap.to(letter, {
          color: "white",
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
    <div
      ref={containerRef}
      className="w-full text-white animate-in fade-in duration-700"
    >
      {/* Animated Header */}
      <div className="mb-8 md:mb-20">
        {["SOBRE", "MIM"].map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="anim-letter-about font-[Archivo Black] text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[11rem] uppercase tracking-tighter leading-[0.85] text-outline-white select-none"
                style={{ fontFamily: '"Archivo Black", sans-serif' }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20">
        {/* Left Column - Content */}
        <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10 font-light leading-relaxed text-sm md:text-base order-2 lg:order-1">
          <div>
            <h3 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">
              Bio
            </h3>
            <p className="mb-6">
              Olá! Meu nome é Felipe Mello Padula, sou diretor de arte. Não dá
              para começar a falar de mim sem falar de música, que sempre foi
              parte da minha vida e me acompanha desde sempre. Toquei
              contrabaixo em bandas de rock de São Paulo por muitos anos, e até
              hoje não largo o instrumento. Outro ponto a destacar são os
              livros, adoro ler e acredito que leitura é isso: um convite para a
              imaginação sair do papel e ganhar o mundo. E gostando tanto do
              poder da imaginação me levou a publicidade, onde as ideias valem
              muito. Como um bom D.A, cinema e fotografia são figurinhas
              carimbadas no meu dia-dia. Me fascina como uma única imagem pode
              dizer tudo. Comecei como assistente, virei diretor de arte júnior,
              e depois passei três anos tocando meu próprio estúdio de 3D. Nesse
              período, trabalhei com agências como Ogilvy e Lew Lara, e
              participei de projetos que rodaram o mundo, incluindo uma campanha
              para a Água de Coco Amazônia, que saiu nos Estados Unidos, na
              França e em Dubai.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">
                Áreas de Atuação
              </h3>
              <ul className="flex flex-col gap-2 opacity-90">
                <li>Diretor de Arte</li>
                <li>Design Digital</li>
                <li>Artista 3D Generalista</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold text-xs tracking-widest uppercase mb-4 text-white/70">
              felipe@felipempadula.com
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative overflow-hidden w-full h-[50vh] md:h-[80vh] bg-gray-900 rounded-lg">
            <img
              ref={imageRef}
              src="/images/felmenor.webp"
              alt="Felipe Mello Padula"
              className="w-full h-full object-cover transition-all duration-700 ease-out mix-blend-normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
