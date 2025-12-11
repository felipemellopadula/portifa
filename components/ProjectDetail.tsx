// src/components/ProjectDetail.tsx
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
        autoPlay
        muted
        loop
        playsInline
        controls={false}
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
    if (scrollRef.current) setShowLeftArrow(scrollRef.current.scrollLeft > 10);
  };
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: dir === "right" ? amount : -amount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };
  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };
  const navigateLightbox = (dir: "next" | "prev", e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null
        ? dir === "next"
          ? (prev + 1) % items.length
          : (prev - 1 + items.length) % items.length
        : 0
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    if (lightboxIndex !== null)
      window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Adjusted height for mobile
  const sectionHeightClass = "h-[400px] md:h-[500px]";

  return (
    <>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full items-start`}
      >
        <div
          className={`relative w-full ${sectionHeightClass} overflow-hidden rounded-md shadow-lg bg-black/5 border border-black/10`}
        >
          <div className="absolute inset-0 flex items-center justify-center pb-14">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar items-center px-4 md:px-6 space-x-4"
            >
              {carouselItems.map((item, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 h-[300px] md:h-[400px] w-auto aspect-[4/5] snap-center flex justify-center items-center shadow-2xl bg-black/10 rounded-lg overflow-hidden"
                >
                  <MediaRenderer item={item} />
                  <button
                    onClick={() => openLightbox(i)}
                    className="absolute inset-0 z-20 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <div className="bg-white/20 p-2 rounded-full text-white backdrop-blur-md">
                      ZOOM
                    </div>
                  </button>
                </div>
              ))}
              <div className="w-8 flex-shrink-0"></div>
            </div>
          </div>
          {/* Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className={`pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg ${
                showLeftArrow ? "opacity-100" : "opacity-0"
              }`}
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="pointer-events-auto px-6 h-10 flex items-center justify-center rounded-full bg-white text-black text-[10px] font-bold shadow-lg"
            >
              SWIPE →
            </button>
          </div>
        </div>
        {/* Side Item */}
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
              className="absolute top-3 right-3 z-30 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
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
      {/* Lightbox Portal (Simplificado para brevidade, use o mesmo lógica do seu código original) */}
      {lightboxIndex !== null &&
        items[lightboxIndex] &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* ... Seu código de lightbox aqui ... */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white p-4 z-[10000]"
            >
              CLOSE
            </button>
            <div className="w-full h-full p-4 flex items-center justify-center pointer-events-none">
              <div className="relative max-w-full max-h-full pointer-events-auto">
                <MediaRenderer
                  item={items[lightboxIndex]}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const ExpandableSection: React.FC<{
  title: string;
  children: React.ReactNode;
  borderColorClass: string;
}> = ({ title, children, borderColorClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current)
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: isOpen ? "power2.out" : "power2.in",
      });
  }, [isOpen]);
  return (
    <div className={`border-t py-4 md:py-5 mt-4 ${borderColorClass}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group focus:outline-none"
      >
        <h4 className="font-bold text-[10px] md:text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity font-mono">
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
        <div className="pt-4 pb-2 font-mono text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentBg = project.detailBg || project.color;

  const theme = project.isDarkText
    ? {
        text: "text-[#DC0000]",
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: contentBg }}
      className={`w-full min-h-screen pb-20 font-mono relative transition-colors duration-500 ${theme.text} px-4 md:px-12 pt-8 md:pt-12`}
    >
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .text-outline-dynamic { -webkit-text-stroke: 1px ${theme.outlineColor}; color: transparent; }`}</style>

      {/* HERO - RESPONSIVE TEXT SIZE */}
      <div className="mb-12 md:mb-24 mt-4">
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="flex flex-wrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="anim-letter-project text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] uppercase tracking-tighter leading-[0.85] select-none mr-1 md:mr-4 font-black text-outline-dynamic"
                style={{ fontFamily: '"Titillium Web", sans-serif' }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* INFO - RESPONSIVE GRID */}
      <div
        className={`grid grid-cols-1 gap-8 mb-8 border-t pt-8 ${theme.border}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Agência", value: project.agency },
            { label: "Cliente", value: project.client },
            { label: "Função", value: project.role },
            { label: "Ano", value: project.year },
          ].map((item, i) => (
            <div key={i}>
              <h3
                className={`font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1 ${theme.textLow}`}
              >
                {item.label}
              </h3>
              <p className="text-lg md:text-2xl font-bold break-words">
                {item.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TEXTO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 pt-4">
        <div className="md:col-span-12">
          <h3
            className={`font-bold text-xs tracking-widest uppercase mb-4 md:mb-6 ${theme.textLow}`}
          >
            Sobre o job
          </h3>
          <p className="text-lg md:text-3xl leading-relaxed font-light mb-8">
            {project.description}
          </p>
          {project.testimonial && (
            <ExpandableSection
              title="Depoimentos do cliente"
              borderColorClass={theme.border}
            >
              <blockquote
                className={`italic border-l-2 pl-4 my-2 text-sm md:text-lg leading-relaxed ${
                  theme.textLow
                } ${project.isDarkText ? "border-[#DC0000]" : "border-white"}`}
              >
                "{project.testimonial.text}"
              </blockquote>
              <p
                className={`text-xs md:text-sm font-bold mt-4 uppercase tracking-wider ${theme.textLow}`}
              >
                — {project.testimonial.author}
              </p>
            </ExpandableSection>
          )}
        </div>
      </div>

      {/* MEDIA SECTIONS */}
      <div
        className={`flex flex-col gap-6 md:gap-8 mb-20 border-t pt-8 ${theme.border}`}
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
          // Grid becomes 1 column on mobile, 2 on desktop
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
                <MediaRenderer key={0} item={section.items[0]} />
              </div>
            );
          }
          // Columns 4 becomes grid-cols-2 on mobile
          if (section.layout === "columns-4") {
            return (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full"
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
        className={`grid grid-cols-1 md:grid-cols-2 mt-20 md:mt-32 border-t pt-12 gap-8 md:gap-0 ${theme.border}`}
      >
        <button
          onClick={() => onNavigate(prevProject)}
          className="group flex flex-col items-start text-left"
        >
          <span
            className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 transition-opacity ${theme.textLow} group-hover:opacity-100`}
          >
            Projeto Anterior
          </span>
          <span
            className="text-xl md:text-4xl uppercase font-black"
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
            className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 transition-opacity ${theme.textLow} group-hover:opacity-100`}
          >
            Próximo Projeto
          </span>
          <span
            className="text-xl md:text-4xl uppercase font-black"
            style={{ fontFamily: '"Titillium Web", sans-serif' }}
          >
            {nextProject.title}
          </span>
        </button>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9000] p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        } ${
          project.isDarkText ? "bg-[#DC0000] text-white" : "bg-white text-black"
        }`}
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
