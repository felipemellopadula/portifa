// src/components/Sidebar.tsx
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface SidebarProps {
  onNavigate: (view: "home" | "about" | "contact") => void;
  currentView: "home" | "about" | "project" | "contact";
}

// --- 1. COMPONENTE REUTILIZÁVEL DA ANIMAÇÃO DE TEXTO ---
// Extraímos para um componente para poder usar no Mobile e no Desktop
const TypingAnimation = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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

      // Linha do tempo da digitação
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
        // Pausa lendo
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
  }, []);

  return (
    <div className="mb-8">
      <p className="font-bold text-lg md:text-base">
        Bem-vindo(a) ao meu Portfolio
      </p>
      <br />
      <p className="text-lg md:text-base">
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
  );
};

// --- 2. COMPONENTE PRINCIPAL SIDEBAR ---
const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isProjectView = currentView === "project";

  // Lógica de navegação
  const handleMainClick = () => {
    setIsMobileMenuOpen(false); // Fecha menu se estiver no mobile
    if (currentView === "home") {
      onNavigate("about");
    } else {
      onNavigate("home");
    }
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    onNavigate("contact");
  };

  // Textos e Ícones
  const buttonText = currentView === "home" ? "sobre mim" : "fechar";
  const icon = currentView === "home" ? "+" : "X";

  return (
    <>
      {/* ============================================================
          MOBILE: BOTÃO BURGER (Superior Esquerdo) - Visível apenas < md
      ============================================================= */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`md:hidden fixed top-8 left-8 z-50 p-2 mix-blend-difference text-white focus:outline-none ${
          isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Abrir Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* ============================================================
          MOBILE: OVERLAY MENU (Tela Cheia)
      ============================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300 md:hidden">
          {/* Botão Fechar Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 left-8 p-2 text-white/80 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Conteúdo do Menu Mobile */}
          <div className="text-center font-mono">
            {/* Animação (Visível no menu mobile) */}
            <TypingAnimation />

            <div className="flex flex-col gap-6 mt-8 items-center text-xl">
              <button
                onClick={handleMainClick}
                className="hover:line-through decoration-2 uppercase font-bold tracking-widest"
              >
                {currentView === "home" ? "Sobre Mim" : "Home"}
              </button>

              <button
                onClick={handleContactClick}
                className={`hover:line-through decoration-2 uppercase font-bold tracking-widest ${
                  currentView === "contact" ? "line-through text-white/50" : ""
                }`}
              >
                Contato
              </button>

              <div className="w-10 h-[1px] bg-white/30 my-2"></div>

              {/* Redes Sociais Mobile */}
              <a
                href="https://www.instagram.com/diariosdeumcriativo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/fmello85"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70"
              >
                Facebook ↗
              </a>
              <a
                href="https://www.linkedin.com/in/fmellopadula"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70"
              >
                Linkedin ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          DESKTOP: SIDEBAR (Inferior Direito) - Escondido < md
      ============================================================= */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-40 text-right font-mono text-base leading-relaxed mix-blend-difference text-white flex-col items-end">
        {/* Animação Desktop (Esconde se for projeto ou contato) */}
        {!isProjectView && currentView !== "contact" && <TypingAnimation />}

        {/* Link Disponível (Desktop) */}
        {!isProjectView && currentView !== "contact" && (
          <div className="mb-8">
            <p className="cursor-pointer hover:underline">
              Disponível para Freelance
            </p>
          </div>
        )}

        {/* Botões de Navegação (Desktop) */}
        <div className="flex flex-col gap-1 items-end">
          <button
            onClick={handleMainClick}
            className="flex items-center gap-2 hover:line-through decoration-2 group text-white uppercase"
          >
            <span>{buttonText}</span>
            <span
              className={`font-bold transition-transform duration-300 ${
                currentView !== "home" ? "rotate-45" : ""
              }`}
            >
              {icon}
            </span>
          </button>

          {currentView !== "contact" && (
            <button
              onClick={() => onNavigate("contact")}
              className="flex items-center gap-2 hover:line-through decoration-2 text-white uppercase"
            >
              <span>contato</span>
              <span className="font-bold">+</span>
            </button>
          )}
        </div>

        {/* Redes Sociais (Desktop) */}
        {!isProjectView && (
          <div className="mt-8 flex flex-col gap-1 items-end">
            <a
              href="https://www.instagram.com/diariosdeumcriativo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:line-through decoration-2 text-white"
            >
              <span>instagram</span>
              <span className="font-bold">↗</span>
            </a>
            <a
              href="https://www.facebook.com/fmello85"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:line-through decoration-2 text-white"
            >
              <span>facebook</span>
              <span className="font-bold">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/fmellopadula"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:line-through decoration-2 text-white"
            >
              <span>linkedin</span>
              <span className="font-bold">↗</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
