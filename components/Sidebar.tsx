// src/components/Sidebar.tsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface SidebarProps {
  onNavigate: (view: "home" | "about") => void;
  currentView: "home" | "about" | "project";
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Se estivermos no modo 'project', clicar no botão principal volta para home
  const handleClick = () => {
    if (currentView === "about") {
      onNavigate("home");
    } else if (currentView === "project") {
      onNavigate("home");
    } else {
      onNavigate("about");
    }
  };

  // Lógica de texto do botão traduzida
  const buttonText =
    currentView === "about"
      ? "fechar"
      : currentView === "project"
      ? "fechar projeto"
      : "sobre mim";

  const icon = currentView === "about" || currentView === "project" ? "X" : "+";

  // Helper para determinar se devemos esconder as informações extras
  const isProjectView = currentView === "project";

  useEffect(() => {
    // Se estivermos na visualização do projeto, o elemento não é renderizado, então não animamos.
    if (isProjectView) return;

    const phrases = [
      "Sou Diretor de Arte",
      "Sou um baixista ocasional",
      "Sou um leitor ávido",
      "Um cinéfilo de nascença",
    ];

    const ctx = gsap.context(() => {
      // Cursor piscando
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });
      }

      // Linha do tempo da máquina de escrever
      const tl = gsap.timeline({ repeat: -1 });

      phrases.forEach((phrase) => {
        // Digitar
        tl.to(
          {},
          {
            duration: phrase.length * 0.08,
            ease: "none",
            onUpdate: function () {
              if (textRef.current) {
                const progress = this.progress();
                const numChars = Math.ceil(progress * phrase.length);
                textRef.current.innerText = phrase.substring(0, numChars);
              }
            },
          }
        );

        // Pausa
        tl.to({}, { duration: 1.5 });

        // Apagar
        tl.to(
          {},
          {
            duration: phrase.length * 0.04,
            ease: "none",
            onUpdate: function () {
              if (textRef.current) {
                const progress = this.progress();
                const numChars = Math.ceil((1 - progress) * phrase.length);
                textRef.current.innerText = phrase.substring(0, numChars);
              }
            },
          }
        );

        // Pausa antes do próximo
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
          <br />
          <p>
            <span ref={textRef} className="inline-block min-h-[1.5em]">
              Sou Diretor de Arte
            </span>
            <span ref={cursorRef} className="ml-1">
              |
            </span>
            <br />
            baseado em São Paulo-SP-Brasil
          </p>
        </div>
      )}

      {!isProjectView && (
        <div className="mb-8">
          <p className="cursor-pointer hover:underline">
            Disponível para Freelance
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1 items-end">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 hover:line-through decoration-2 group text-white uppercase"
        >
          <span>{buttonText}</span>
          <span
            className={`font-bold transition-transform duration-300 ${
              currentView === "about" ? "rotate-90" : ""
            }`}
          >
            {icon}
          </span>
        </button>

        {/* Link para a página de contato PHP na raiz */}
        <a
          href="/contato.php"
          className="flex items-center gap-2 hover:line-through decoration-2 text-white"
        >
          <span>contato</span>
          <span className="font-bold">X</span>
        </a>
      </div>

      {!isProjectView && (
        <div className="mt-8 flex flex-col gap-1 items-end">
          {/* Link Instagram */}
          <a
            href="https://www.instagram.com/diariosdeumcriativo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:line-through decoration-2 text-white"
          >
            <span>instagram</span>
            <span className="font-bold">X</span>
          </a>

          {/* Link Facebook */}
          <a
            href="https://www.facebook.com/fmello85"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:line-through decoration-2 text-white"
          >
            <span>facebook</span>
            <span className="font-bold">X</span>
          </a>
          <a
            href="https://www.linkedin.com/in/fmellopadula"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:line-through decoration-2 text-white"
          >
            <span>linkedin</span>
            <span className="font-bold">X</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
