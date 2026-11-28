import { useRef, useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import { FEATURED_PROJECTS, type CaseStudyProject } from "../data/portfolioContent";
import { filterProjects, type ProjectFilter } from "../projectFilters";
import { soundEngine } from "../utils/soundEngine";
import { ProjectDialog } from "./ProjectDialog";

const FILTERS: ProjectFilter[] = ["All", "Data Analytics", "Data Science"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleProjects = filterProjects(FEATURED_PROJECTS, activeFilter) as CaseStudyProject[];

  const handleOpenProject = (project: CaseStudyProject, triggerEl: HTMLButtonElement) => {
    soundEngine.playChime();
    lastTriggerRef.current = triggerEl;
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    soundEngine.playSoftClick();
    setSelectedProject(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  };

  return (
    <section
      id="projects"
      className="relative scroll-mt-32 xl:scroll-mt-24 border-t border-white/[0.07] py-12 sm:py-16 lg:py-24 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-14 xl:px-20">
        {/* Header + Interactive Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-[#dfd0a6] mb-2">
              05 / FEATURED PROJECTS
            </p>
            <h2
              id="projects-heading"
              className="text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-[-0.025em] leading-[1.1] text-[#f4f1ea]"
            >
              Selected Analytical Work
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-[#b4b0a8] max-w-[56ch]">
              Applied projects demonstrating data hygiene, DAX modeling, statistical KPI reporting,
              and deployed Python machine learning systems.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap gap-2 p-1.5 rounded-full bg-[#252428] border border-white/[0.08] self-start md:self-auto"
          >
            {FILTERS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    setActiveFilter(filter);
                  }}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] px-4 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#dfd0a6] text-[#17171a] font-semibold"
                      : "text-[#b4b0a8] hover:text-[#f4f1ea]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Balanced 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="group rounded-3xl bg-[#2d2c31]/90 backdrop-blur-sm border border-white/[0.10] hover:border-[#dfd0a6]/45 transition-all duration-300 overflow-hidden shadow-[0_18px_46px_rgba(0,0,0,0.34)] flex flex-col"
            >
              {/* Project Output Showcase */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#19181d] border-b border-white/[0.08]">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />
              </div>

              {/* Details Pane */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#dfd0a6]">
                        {project.index} · {project.category}
                      </span>
                      <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#b4b0a8]">
                        {project.metrics[0]?.value}
                      </span>
                    </div>

                    <h3 className="text-[21px] sm:text-[24px] font-bold tracking-[-0.02em] text-[#f4f1ea]">
                      {project.title}
                    </h3>
                    <p className="text-[13.5px] font-medium text-[#dfd0a6] mt-1">
                      {project.subtitle}
                    </p>
                    <p className="mt-3.5 text-[14.5px] leading-[1.65] text-[#b4b0a8]">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-[#e2ded6]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleOpenProject(project, e.currentTarget)}
                      className="tactile-btn inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13px] font-semibold hover:bg-[#eae0c2] cursor-pointer"
                    >
                      <Eye size={15} strokeWidth={1.75} aria-hidden="true" />
                      <span>Case Study</span>
                    </button>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundEngine.playChime()}
                          className="tactile-btn inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full bg-[#dfd0a6]/16 border border-[#dfd0a6]/45 text-[#dfd0a6] text-[13px] font-semibold hover:bg-[#dfd0a6] hover:text-[#17171a]"
                        >
                          <span>Live App</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundEngine.playSoftClick()}
                        className="tactile-btn inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full bg-white/[0.04] border border-white/12 text-[#f4f1ea] text-[13px] font-medium hover:border-[#dfd0a6]/50 hover:text-[#dfd0a6]"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>

      <ProjectDialog project={selectedProject} onClose={handleCloseProject} />
    </section>
  );
}
