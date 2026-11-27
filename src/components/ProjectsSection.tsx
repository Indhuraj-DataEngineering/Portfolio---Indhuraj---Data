import { useRef, useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import { FEATURED_PROJECTS, type CaseStudyProject } from "../data/portfolioContent";
import { filterProjects, type ProjectFilter } from "../projectFilters";
import { soundEngine } from "../utils/soundEngine";
import { ProjectDialog } from "./ProjectDialog";

const FILTERS: ProjectFilter[] = ["All", "Data Analytics", "Data Science"];

function ProjectPreviewArtwork({ accent }: { accent: CaseStudyProject["accent"] }) {
  if (accent === "analytics") {
    return (
      <svg
        viewBox="0 0 480 220"
        className="w-full h-full"
        role="img"
        aria-label="Illustrative Power BI revenue and margin layout preview"
      >
        <rect width="480" height="220" rx="14" fill="#19191c" />
        <rect x="16" y="16" width="136" height="52" rx="10" fill="#232226" stroke="rgba(223,208,166,0.34)" />
        <rect x="172" y="16" width="136" height="52" rx="10" fill="#232226" stroke="rgba(255,255,255,0.08)" />
        <rect x="328" y="16" width="136" height="52" rx="10" fill="#232226" stroke="rgba(255,255,255,0.08)" />
        <text x="28" y="37" fill="#b4b0a8" fontSize="9" fontFamily="monospace">YTD REVENUE</text>
        <rect x="28" y="45" width="76" height="8" rx="4" fill="#dfd0a6" />
        <text x="184" y="37" fill="#b4b0a8" fontSize="9" fontFamily="monospace">PRIOR MONTH</text>
        <rect x="184" y="45" width="64" height="8" rx="4" fill="#dfd0a6" opacity="0.65" />
        <text x="340" y="37" fill="#b4b0a8" fontSize="9" fontFamily="monospace">MOM GROWTH</text>
        <rect x="340" y="45" width="52" height="8" rx="4" fill="#8fd3b8" opacity="0.85" />

        <rect x="16" y="84" width="292" height="120" rx="12" fill="#232226" stroke="rgba(255,255,255,0.08)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const heights = [48, 66, 54, 82, 74, 90, 68, 96];
          const h = heights[i];
          return (
            <rect
              key={i}
              x={38 + i * 32}
              y={186 - h}
              width="18"
              height={h}
              rx="4"
              fill={i >= 6 ? "#dfd0a6" : "rgba(223,208,166,0.42)"}
            />
          );
        })}

        <rect x="328" y="84" width="136" height="120" rx="12" fill="#232226" stroke="rgba(255,255,255,0.08)" />
        <circle cx="396" cy="144" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
        <circle
          cx="396"
          cy="144"
          r="34"
          fill="none"
          stroke="#dfd0a6"
          strokeWidth="14"
          strokeDasharray="138 214"
          strokeLinecap="round"
          transform="rotate(-90 396 144)"
        />
      </svg>
    );
  }

  if (accent === "pipeline") {
    return (
      <svg
        viewBox="0 0 420 200"
        className="w-full h-full"
        role="img"
        aria-label="Illustrative 9,994-record PivotTable and trend workbook preview"
      >
        <rect width="420" height="200" rx="14" fill="#19191c" />
        <rect x="16" y="16" width="388" height="28" rx="7" fill="#252428" stroke="rgba(223,208,166,0.3)" />
        <text x="28" y="34" fill="#dfd0a6" fontSize="10" fontFamily="monospace">
          9,994 RECORDS · PIVOT &amp; KPI MATRIX
        </text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(16, ${56 + row * 24})`}>
            <rect width="388" height="18" rx="4" fill={row % 2 === 0 ? "#232226" : "#1e1e21"} />
            <rect x="10" y="6" width="70" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
            <rect x="110" y="6" width="88" height="6" rx="3" fill="rgba(223,208,166,0.48)" />
            <rect x="230" y="6" width="60" height="6" rx="3" fill="rgba(223,208,166,0.78)" />
            <rect x="320" y="6" width="54" height="6" rx="3" fill="rgba(143,211,184,0.6)" />
          </g>
        ))}
        <path
          d="M 24 182 L 96 168 L 166 174 L 236 156 L 308 162 L 392 142"
          fill="none"
          stroke="#dfd0a6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 420 200"
      className="w-full h-full"
      role="img"
      aria-label="Illustrative Scikit-learn movie similarity scoring and Streamlit app preview"
    >
      <rect width="420" height="200" rx="14" fill="#19191c" />
      <rect x="16" y="16" width="124" height="168" rx="10" fill="#232226" stroke="rgba(255,255,255,0.08)" />
      <rect x="28" y="30" width="96" height="12" rx="4" fill="#dfd0a6" opacity="0.88" />
      <rect x="28" y="54" width="84" height="8" rx="4" fill="rgba(255,255,255,0.16)" />
      <rect x="28" y="72" width="94" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      <rect x="28" y="90" width="76" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
      <rect x="28" y="148" width="96" height="22" rx="11" fill="rgba(223,208,166,0.22)" stroke="#dfd0a6" />

      <rect x="156" y="16" width="248" height="168" rx="10" fill="#232226" stroke="rgba(223,208,166,0.28)" />
      {[0, 1, 2].map((idx) => (
        <g key={idx} transform={`translate(172, ${32 + idx * 48})`}>
          <rect width="216" height="36" rx="8" fill="#1b1b1e" stroke="rgba(255,255,255,0.08)" />
          <circle cx="22" cy="18" r="9" fill="rgba(223,208,166,0.28)" />
          <rect x="42" y="10" width="108" height="6" rx="3" fill="#f4f1ea" opacity="0.88" />
          <rect x="42" y="21" width="76" height="5" rx="2.5" fill="#dfd0a6" opacity="0.7" />
          <rect x="172" y="12" width="32" height="12" rx="6" fill="rgba(223,208,166,0.2)" />
        </g>
      ))}
    </svg>
  );
}

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
              and Python machine learning workflows.
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

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleProjects.map((project, idx) => {
            const isLeadFeatured = activeFilter === "All" && idx === 0;
            return (
              <article
                key={project.id}
                className={`group rounded-3xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.11] hover:border-[#dfd0a6]/48 transition-all duration-300 overflow-hidden shadow-[0_18px_46px_rgba(0,0,0,0.34)] ${
                  isLeadFeatured
                    ? "lg:col-span-2 grid grid-cols-1 lg:grid-cols-12 items-stretch"
                    : "flex flex-col"
                }`}
              >
                {/* Visual Preview Pane */}
                <div
                  className={`p-5 sm:p-6 bg-[#1d1d20] border-b lg:border-b-0 ${
                    isLeadFeatured ? "lg:col-span-6 lg:border-r border-white/[0.07]" : "border-white/[0.07]"
                  } flex items-center justify-center`}
                >
                  <div className="w-full aspect-[16/9] max-h-[250px] rounded-2xl overflow-hidden border border-white/[0.07] group-hover:border-[#dfd0a6]/30 transition-colors">
                    <ProjectPreviewArtwork accent={project.accent} />
                  </div>
                </div>

                {/* Details Pane */}
                <div
                  className={`p-6 sm:p-8 flex flex-col justify-between ${
                    isLeadFeatured ? "lg:col-span-6" : "flex-1"
                  }`}
                >
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
            );
          })}
        </div>
      </div>

      <ProjectDialog project={selectedProject} onClose={handleCloseProject} />
    </section>
  );
}
