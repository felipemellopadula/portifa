import React, { useRef } from "react";
import gsap from "gsap";
import { Project } from "../types";

interface ProjectRowProps {
  project: Project;
  onHover: (color: string) => void;
  onLeave: () => void;
  onClick: (project: Project) => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  onHover,
  onLeave,
  onClick,
}) => {
  const blackBoxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shakeTweenRef = useRef<gsap.core.Tween | null>(null);

  const handleMouseEnter = () => {
    onHover(project.color);

    // Animate black box expanding
    if (blackBoxRef.current) {
      if (shakeTweenRef.current) shakeTweenRef.current.kill();

      gsap.to(blackBoxRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      shakeTweenRef.current = gsap.to(blackBoxRef.current, {
        x: "random(-2, 2)",
        y: "random(-1, 1)",
        skewX: "random(-5, 5)",
        duration: 0.05,
        repeat: -1,
        repeatRefresh: true,
        ease: "none",
        delay: 0.1,
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current.children, {
        color: "#ffffff",
        duration: 0.2,
      });
    }

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1.05,
        x: 20,
        color: "white",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    onLeave();

    if (shakeTweenRef.current) {
      shakeTweenRef.current.kill();
      shakeTweenRef.current = null;
    }

    if (blackBoxRef.current) {
      gsap.to(blackBoxRef.current, {
        scaleX: 0,
        opacity: 0,
        x: 0,
        y: 0,
        skewX: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current.children, {
        color: "#000000",
        duration: 0.2,
      });
    }

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1,
        x: 0,
        color: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Função auxiliar para quebrar o título quando houver " / "
  const renderTitle = () => {
    if (project.title.includes(" / ")) {
      return project.title.split(" / ").map((part, index, arr) => (
        <React.Fragment key={index}>
          {part}
          {index < arr.length - 1 && (
            <>
              {" /"}
              <br />
            </>
          )}
        </React.Fragment>
      ));
    }
    return project.title;
  };

  return (
    <div
      className="group relative flex flex-col md:flex-row items-start md:items-stretch w-full py-12 md:py-16 border-l-2 border-black/10 md:border-none pl-8 md:pl-0 transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {/* Date & Role - Left Column */}
      <div className="relative flex flex-col justify-center md:justify-start md:w-48 lg:w-64 flex-shrink-0 pt-2 md:pt-4 md:pl-12 lg:pl-16 mb-4 md:mb-0">
        {/* Animated Black Square Background */}
        <div
          ref={blackBoxRef}
          className="absolute top-0 bottom-0 -left-4 -right-4 md:left-8 md:right-8 bg-black z-0 opacity-0 origin-left"
          style={{ transform: "scaleX(0)" }}
        ></div>

        {/* Date & Role Text - Usa Roboto Mono (herdado do body) */}
        <div ref={textRef} className="relative z-10 flex flex-col font-mono">
          <span className="font-normal text-sm md:text-base tracking-widest uppercase mb-1 transition-colors">
            {project.year}
          </span>
          <span className="font-normal text-sm md:text-base uppercase opacity-70 group-hover:opacity-100 transition-all">
            {project.role}
          </span>
        </div>
      </div>

      {/* Vertical Divider for Desktop */}
      <div className="hidden md:block w-[2px] bg-black h-auto mx-4 md:mx-8 scale-y-100 origin-top group-hover:bg-black transition-colors duration-300"></div>

      {/* Project Title - Main Content */}
      <div className="flex-1 relative perspective-[1000px]">
        <h2
          ref={titleRef}
          // Fonte Titillium Web peso 900
          className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] tracking-tight uppercase text-outline origin-left cursor-pointer select-none"
          style={{
            fontFamily: '"Titillium Web", sans-serif',
            fontWeight: 900,
          }}
        >
          {renderTitle()}
        </h2>
      </div>
    </div>
  );
};

export default ProjectRow;
