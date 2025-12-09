import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Project, MediaItem } from "../types";
import { PROJECTS } from "../constants";

interface ProjectDetailProps {
  project: Project;
  onNavigate: (project: Project) => void;
}

// --- HELPER COMPONENTS ---

const MediaRenderer: React.FC<{
  item: MediaItem;
  className?: string;
  styleClass?: string;
  objectFit?: "cover" | "contain";
}> = ({ item, className, styleClass, objectFit = "cover" }) => {
  const layoutClass = styleClass || "w-full h-full";
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  if (item.type === "video") {
    return (
      <video
        src={item.url}
        className={`${layoutClass} ${fitClass} ${className || ""}`}
        controls
        playsInline
        muted
        loop
      />
    );
  }
  return (
    <img
      src={item.url}
      alt={item.alt || "Project media"}
      className={`${layoutClass} ${fitClass} ${className || ""}`}
      onError={(e) => {
        e.currentTarget.style.display = "none";
        const parent = e.currentTarget.parentElement;
        if (parent) {
          parent.classList.add(
            "bg-white/10",
            "flex",
            "items-center",
            "justify-center"
          );
          parent.innerHTML =
            '<span class="text-[10px] opacity-40 uppercase">Img Error</span>';
        }
      }}
    />
  );
};

const CarouselSplitSection: React.FC<{ items: MediaItem[] }> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const carouselItems = items.slice(0, items.length - 1);
  const sideItem = items[items.length - 1];
  const sideItemIndex = items.length - 1;

  const checkScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = (
    direction: "next" | "prev",
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    if (direction === "next") {
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % items.length : 0
      );
    } else {
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + items.length) % items.length : 0
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const sectionHeightClass = "h-[500px]";

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full ${sectionHeightClass} items-start`}
      >
        {/* Esquerda: Carrossel */}
        <div
          className={`relative w-full ${sectionHeightClass} overflow-hidden rounded-md shadow-lg bg-black/5 border border-black/10`}
        >
          <div className="absolute inset-0 flex items-center justify-center pb-14">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar items-center px-6 space-x-4"
            >
              {carouselItems.map((item, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 h-[400px] w-auto aspect-[4/5] snap-center flex justify-center items-center shadow-2xl bg-black/10 rounded-lg overflow-hidden group-item"
                >
                  <MediaRenderer item={item} />
                  <button
                    onClick={() => openLightbox(i)}
                    className="absolute inset-0 z-20 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] cursor-zoom-in"
                  >
                    <div className="bg-white/20 p-3 rounded-full text-white backdrop-blur-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </button>
                </div>
              ))}
              <div className="w-8 flex-shrink-0"></div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className={`pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-bold shadow-lg hover:bg-gray-200 active:scale-95 transition-all duration-300 ${
                showLeftArrow
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="pointer-events-auto px-6 h-10 flex items-center justify-center rounded-full bg-white text-black text-[10px] uppercase tracking-widest font-bold shadow-lg hover:bg-gray-200 active:scale-95 transition-all"
            >
              DESLIZE →
            </button>
          </div>
        </div>

        {/* Direita: Vídeo Fixo */}
        <div
          className={`flex items-center justify-center w-full ${sectionHeightClass} rounded-md bg-black/5 border border-black/10 p-4`}
        >
          <div
            className="relative overflow-hidden rounded-md shadow-lg h-full bg-black group"
            style={{ aspectRatio: "9/16" }}
          >
            {sideItem && <MediaRenderer item={sideItem} />}
            <button
              onClick={() => openLightbox(sideItemIndex)}
              className="absolute top-3 right-3 z-30 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Portal */}
      {lightboxIndex !== null &&
        items[lightboxIndex] &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[10000] cursor-pointer"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 18 18" />
              </svg>
            </button>
            <button
              onClick={(e) => navigateLightbox("prev", e)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all z-[10000] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div
              className="relative w-full h-full p-4 md:p-10 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const isVideo = items[lightboxIndex].type === "video";
                return (
                  <div
                    className={`relative flex items-center justify-center ${
                      isVideo
                        ? "h-[85vh] aspect-[9/16] bg-black shadow-2xl"
                        : "w-auto h-auto max-w-full max-h-[90vh]"
                    }`}
                    style={
                      isVideo ? { height: "85vh", aspectRatio: "9/16" } : {}
                    }
                  >
                    <MediaRenderer
                      item={items[lightboxIndex]}
                      objectFit="contain"
                      styleClass={
                        isVideo
                          ? "w-full h-full"
                          : "w-auto h-auto max-w-full max-h-[90vh]"
                      }
                      className="drop-shadow-2xl rounded-sm"
                    />
                  </div>
                );
              })()}
              <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm font-mono uppercase tracking-widest pointer-events-none">
                {lightboxIndex + 1} / {items.length}
              </div>
            </div>
            <button
              onClick={(e) => navigateLightbox("next", e)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all z-[10000] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

// Expandable Section
const ExpandableSection: React.FC<{
  title: string;
  children: React.ReactNode;
  borderColorClass: string;
}> = ({ title, children, borderColorClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  return (
    <div className={`border-t py-5 mt-4 ${borderColorClass}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group focus:outline-none"
      >
        <h4 className="font-bold text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity font-mono">
          {title}
        </h4>
        <span
          className="text-xl font-light transition-transform duration-300 font-mono"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="pt-4 pb-2 font-mono">{children}</div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 1. LÓGICA DE CORES (Branco vs Vermelho/Escuro)
  const theme = project.isDarkText
    ? {
        text: "text-[#DC0000]", // Corrigido para vermelho
        textLow: "text-[#DC0000]/60",
        border: "border-[#DC0000]/30",
        outlineColor: "#DC0000",
        letterColor: "#DC0000",
      }
    : {
        text: "text-white",
        textLow: "opacity-60",
        border: "border-white/30",
        outlineColor: "rgba(255,255,255,0.3)",
        letterColor: "white",
      };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 2. ANIMAÇÃO DAS LETRAS (GSAP) - VELOCIDADE AJUSTADA (MUITO LENTA)
  useEffect(() => {
    if (!containerRef.current) return;
    const letters = containerRef.current.querySelectorAll(
      ".anim-letter-project"
    );
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
      letters.forEach((letter) => {
        gsap.to(letter, {
          color: theme.letterColor,
          // Duração da transição: entre 3 a 5 segundos
          duration: Math.random() * 2 + 3,
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
  }, [project, theme.letterColor]);

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0
      ? PROJECTS[currentIndex - 1]
      : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIndex < PROJECTS.length - 1
      ? PROJECTS[currentIndex + 1]
      : PROJECTS[0];
  const words = project.title.replace(/ \//g, "\u00A0/").split(" ");

  // --- CORREÇÃO DO FUNDO ---
  // Este useEffect é crucial. Ele força a cor de fundo do body para a cor interna do projeto
  // assim que o componente é montado.
  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    const bgColor = project.detailBg || project.color;
    document.body.style.backgroundColor = bgColor;

    // Garante que o container principal também tenha a cor, se necessário
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = bgColor;
    }

    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = "";
      }
    };
  }, [project]);

  return (
    <div
      ref={containerRef}
      // Aplicamos a cor diretamente no estilo para garantir que ela seja usada
      style={{ backgroundColor: project.detailBg || project.color }}
      className={`w-full min-h-screen pb-20 font-mono relative transition-colors duration-500 ${theme.text}`}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Outline Dinâmico */
        .text-outline-dynamic {
           -webkit-text-stroke: 1px ${theme.outlineColor};
           color: transparent;
        }
      `}</style>

      {/* HERO */}
      <div className="mb-16 md:mb-24 mt-4">
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="flex flex-wrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="anim-letter-project text-[5rem] md:text-[7rem] lg:text-[10rem] uppercase tracking-tighter leading-[0.85] text-outline-dynamic select-none mr-2 md:mr-4 font-black"
                style={{ fontFamily: '"Titillium Web", sans-serif' }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* INFO */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-8 border-t pt-8 ${theme.border}`}
      >
        <div className="md:col-span-12 flex flex-col md:flex-row gap-8 justify-between">
          {[
            { label: "Agência", value: project.agency },
            { label: "Cliente", value: project.client },
            { label: "Função", value: project.role },
            { label: "Ano", value: project.year },
          ].map((item, i) => (
            <div key={i}>
              <h3
                className={`font-bold text-xs tracking-widest uppercase mb-2 ${theme.textLow}`}
              >
                {item.label}
              </h3>
              <p className="text-xl md:text-2xl font-bold">
                {item.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TEXTO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-12 pt-4">
        <div className="md:col-span-12">
          <h3
            className={`font-bold text-xs tracking-widest uppercase mb-6 ${theme.textLow}`}
          >
            Sobre o job
          </h3>
          <p className="text-xl md:text-3xl leading-relaxed font-light mb-8">
            {project.description}
          </p>
          {project.technicalDetails && (
            <ExpandableSection
              title="Detalhes Técnicos"
              borderColorClass={theme.border}
            >
              <ul
                className={`list-disc list-inside font-light space-y-2 text-base md:text-lg ${theme.textLow}`}
              >
                {project.technicalDetails.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </ExpandableSection>
          )}
          {/* Seção de depoimentos removida conforme solicitado */}
        </div>
      </div>

      {/* MEDIA SECTIONS */}
      <div
        className={`flex flex-col gap-8 mb-20 border-t pt-8 ${theme.border}`}
      >
        {project.mediaSections?.map((section, index) => {
          if (section.layout === "audio" && section.audioUrl) {
            return (
              <div key={index} className="w-full md:w-1/2">
                <p
                  className={`text-xs uppercase mb-3 tracking-widest ${theme.textLow}`}
                >
                  Audio Spot
                </p>
                <audio
                  controls
                  className="w-full h-12 opacity-90 invert filter hover:opacity-100 transition-opacity"
                >
                  <source src={section.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            );
          }
          if (section.layout === "grid") {
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              >
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-md shadow-lg h-full max-h-[1080px]"
                  >
                    <MediaRenderer item={item} />
                  </div>
                ))}
              </div>
            );
          }
          if (section.layout === "full") {
            return (
              <div
                key={index}
                className="w-full overflow-hidden rounded-md shadow-lg max-h-[1080px]"
              >
                {section.items.map((item, i) => (
                  <MediaRenderer key={i} item={item} />
                ))}
              </div>
            );
          }
          if (section.layout === "columns-4") {
            return (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
              >
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-md shadow-lg h-full max-h-[1080px]"
                  >
                    <MediaRenderer item={item} />
                  </div>
                ))}
              </div>
            );
          }
          if (section.layout === "carousel-split") {
            return <CarouselSplitSection key={index} items={section.items} />;
          }
          return null;
        })}
      </div>

      {/* NAV */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 mt-32 border-t pt-12 ${theme.border}`}
      >
        <div className="md:col-span-8 flex justify-between items-center">
          <button
            onClick={() => onNavigate(prevProject)}
            className="group flex flex-col items-start text-left"
          >
            <span
              className={`text-xs font-bold tracking-widest uppercase mb-2 transition-opacity ${theme.textLow} group-hover:opacity-100`}
            >
              Projeto Anterior
            </span>
            <span
              className="text-2xl md:text-4xl uppercase font-black"
              style={{ fontFamily: '"Titillium Web", sans-serif' }}
            >
              {prevProject.title}
            </span>
          </button>
          <button
            onClick={() => onNavigate(nextProject)}
            className="group flex flex-col items-end text-right"
          >
            <span
              className={`text-xs font-bold tracking-widest uppercase mb-2 transition-opacity ${theme.textLow} group-hover:opacity-100`}
            >
              Próximo Projeto
            </span>
            <span
              className="text-2xl md:text-4xl uppercase font-black"
              style={{ fontFamily: '"Titillium Web", sans-serif' }}
            >
              {nextProject.title}
            </span>
          </button>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[9000] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group 
        ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
        ${
          project.isDarkText ? "bg-[#DC0000] text-white" : "bg-white text-black"
        }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-y-1 transition-transform"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default ProjectDetail;
