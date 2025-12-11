// src/App.tsx
import React, { useState } from "react";
import { PROJECTS, DEFAULT_COLOR } from "./constants";
import { Project } from "./types";
import AnimatedHeader from "./components/AnimatedHeader";
import ProjectRow from "./components/ProjectRow";
import Sidebar from "./components/Sidebar";
import AboutMe from "./components/AboutMe";
import ProjectDetail from "./components/ProjectDetail";
import Contact from "./components/Contact";

type ViewState = "home" | "about" | "project" | "contact";

const App: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>(DEFAULT_COLOR);
  const [view, setView] = useState<ViewState>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleNavigate = (newView: ViewState | "home") => {
    if (newView === "home") {
      setView("home");
      setSelectedProject(null);
      setBackgroundColor(DEFAULT_COLOR);
    } else if (newView === "about") {
      setView("about");
      setBackgroundColor("#e11d48");
    } else if (newView === "contact") {
      setView("contact");
      setBackgroundColor("#111827");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setView("project");
    setBackgroundColor(project.detailBg || project.color);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-700 ease-out relative overflow-x-hidden"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Border is thinner on mobile (8px) vs desktop (20px) */}
      <div className="fixed inset-0 z-[100] border-[8px] md:border-[20px] border-white pointer-events-none"></div>

      <AnimatedHeader onNavigateHome={() => handleNavigate("home")} />

      <Sidebar
        onNavigate={(target) => handleNavigate(target)}
        currentView={view}
      />

      {/* RESPONSIVE ADJUSTMENTS HERE:
         - pt-24 (mobile) vs pt-32 (desktop)
         - px-4 (mobile) vs pl-8 (desktop)
         - max-w full on mobile to use space
      */}
      <main className="relative z-10 w-full md:max-w-[85%] lg:max-w-[80%] mx-auto px-4 md:px-0 md:pl-8 pt-24 md:pt-32 pb-32">
        {view === "home" && (
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

        {view === "about" && <AboutMe />}
        {view === "contact" && <Contact />}

        {view === "project" && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onNavigate={handleProjectClick}
          />
        )}
      </main>

      {/* Mobile Footer */}
      <div className="md:hidden px-6 pb-8 pt-4 text-black mix-blend-overlay relative z-20">
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
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Behance
          </a>
          <button
            onClick={() => handleNavigate("contact")}
            className="underline"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
