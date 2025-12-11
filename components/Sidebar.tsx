import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface SidebarProps {
  // ADICIONADO 'contact' nas opções
  onNavigate: (view: "home" | "about" | "contact") => void;
  currentView: "home" | "about" | "project" | "contact";
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    // Se estiver em contact, volta pra home também
    if (currentView === "home") {
      onNavigate("about");
    } else {
      onNavigate("home");
    }
  };

  const buttonText = currentView === "home" ? "sobre mim" : "fechar";
  const icon = currentView === "home" ? "+" : "X";
  const isProjectView = currentView === "project";

  useEffect(() => {
    if (isProjectView) return;
    // ... (sua lógica de animação do GSAP continua igual aqui) ...
    // Estou omitindo o GSAP para focar na correção, mantenha o seu código GSAP aqui
    const ctx = gsap.context(() => {});
    return () => ctx.revert();
  }, [isProjectView]);

  return (
    <div className="fixed bottom-8 right-8 z-40 text-right font-mono text-sm md:text-base leading-relaxed mix-blend-difference text-white md:block hidden">
      {!isProjectView && currentView !== "contact" && (
        <div className="mb-8">
          <p className="font-bold">Bem-vindo ao meu Portfolio</p>
          <br />
          <p>
            <span ref={textRef}>Sou Diretor de Arte</span> | <br />
            baseado em São Paulo-SP-Brasil
          </p>
        </div>
      )}

      {!isProjectView && currentView !== "contact" && (
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
              currentView === "home" ? "" : "rotate-90"
            }`}
          >
            {icon}
          </span>
        </button>

        {/* Contact Link - Only show if not already on contact page */}
        {currentView !== "contact" && (
          <button
            onClick={() => onNavigate("contact")}
            className="flex items-center gap-2 hover:line-through decoration-2 text-white uppercase"
          >
            <span>contato</span>
            <span className="font-bold">X</span>
          </button>
        )}
      </div>

      {/* Redes Sociais */}
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
            <span>likedin</span>
            <span className="font-bold">↗</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
