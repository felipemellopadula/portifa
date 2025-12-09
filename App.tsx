import React, { useState } from "react";
import { PROJECTS, DEFAULT_COLOR } from "./constants";
import { Project } from "./types";
import AnimatedHeader from "./components/AnimatedHeader";
import ProjectRow from "./components/ProjectRow";
import Sidebar from "./components/Sidebar";
import AboutMe from "./components/AboutMe";
import ProjectDetail from "./components/ProjectDetail";

type ViewState = "home" | "about" | "project";

const App: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>(DEFAULT_COLOR);
  const [view, setView] = useState<ViewState>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // To handle the transition smoothly
  const handleHover = (color: string) => {
    if (view === "home") {
      setBackgroundColor(color);
    }
  };

  const handleLeave = () => {
    if (view === "home") {
      setBackgroundColor(DEFAULT_COLOR);
    }
  };

  const handleNavigate = (newView: ViewState) => {
    // Basic navigation logic
    if (newView === "home") {
      setView("home");
      setSelectedProject(null);
      setBackgroundColor(DEFAULT_COLOR);
    } else if (newView === "about") {
      setView("about");
      setBackgroundColor("#e11d48"); // Rose/Pink for About
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView("project");

    // CORREÇÃO AQUI:
    // Verifica se existe uma cor de fundo específica para o detalhe (detailBg).
    // Se existir (como no BIG MAC), usa ela para a transição.
    // Caso contrário, usa a cor padrão do projeto.
    const targetBg = project.detailBg || project.color;
    setBackgroundColor(targetBg);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-700 ease-out relative overflow-hidden"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Fixed White Border Frame */}
      <div className="fixed inset-0 z-[100] border-[12px] md:border-[20px] border-white pointer-events-none"></div>

      {/* Animated Top Right Header (Stays on all pages) */}
      <div className="relative z-[101]">
        <AnimatedHeader onNavigateHome={() => handleNavigate("home")} />
      </div>

      {/* Fixed Bottom Right Sidebar */}
      <div className="relative z-[101]">
        <Sidebar
          onNavigate={(target) => handleNavigate(target)}
          currentView={view}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-[85%] md:max-w-[80%] mx-auto pl-8 md:pl-0 pt-32 pb-32">
        {view === "home" && (
          /* Projects List */
          <div className="flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-500">
            {PROJECTS.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}

        {view === "about" && (
          /* About Me Page */
          <AboutMe />
        )}

        {view === "project" && selectedProject && (
          /* Single Project Detail Page */
          <ProjectDetail
            project={selectedProject}
            onNavigate={handleProjectClick}
          />
        )}
      </main>

      {/* Mobile Footer (visible only on small screens) */}
      <div className="md:hidden px-8 pb-12 pt-8 text-black mix-blend-overlay relative z-10">
        <p className="font-bold mb-4">Felipe Mello Padula</p>
        <div className="flex gap-4 flex-wrap text-sm font-mono">
          <button
            onClick={() => handleNavigate("home")}
            className="underline font-bold"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate("about")}
            className="underline font-bold"
          >
            About Me
          </button>
          <a href="#" className="underline">
            Behance
          </a>
          <a href="#" className="underline">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
