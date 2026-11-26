import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2, Layers, X } from "lucide-react";
import type { CaseStudyProject } from "../data/portfolioContent";

interface ProjectDialogProps {
  project: CaseStudyProject | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [project]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="project-dialog-title"
      className="portfolio-dialog"
    >
      {project && (
        <div className="p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-[#dfd0a6]/15 border border-[#dfd0a6]/35 text-[#dfd0a6]">
                  {project.index} · {project.category}
                </span>
                <span className="font-mono-tech text-[11px] text-[#b4b0a8]">
                  Resume Verified Project
                </span>
              </div>
              <h3
                id="project-dialog-title"
                className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-[#f4f1ea]"
              >
                {project.title}
              </h3>
              <p className="text-[14px] text-[#b4b0a8] mt-1">{project.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-[#f4f1ea] hover:bg-[#dfd0a6]/20 hover:border-[#dfd0a6] flex items-center justify-center shrink-0 cursor-pointer"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-3.5 rounded-2xl bg-[#1b1b1e] border border-white/[0.08]"
              >
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.12em] text-[#b4b0a8]">
                  {metric.label}
                </p>
                <p className="text-[15px] font-semibold text-[#dfd0a6] mt-1">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#dfd0a6] mb-1.5">
                Problem Statement
              </h4>
              <p className="text-[14.5px] leading-[1.7] text-[#e2ded6]">{project.problem}</p>
            </div>

            <div>
              <h4 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#dfd0a6] mb-1.5">
                My Contribution
              </h4>
              <p className="text-[14.5px] leading-[1.7] text-[#e2ded6]">{project.contribution}</p>
            </div>

            <div>
              <h4 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#dfd0a6] mb-2">
                Analytical Architecture
              </h4>
              <ul className="space-y-2">
                {project.architecture.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3 text-[14px] text-[#b4b0a8]">
                    <span className="font-mono-tech text-[11px] text-[#dfd0a6] mt-0.5 shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#dfd0a6] mb-2">
                Key Deliverables
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-[#e2ded6]">
                    <CheckCircle2
                      size={16}
                      className="text-[#dfd0a6] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#b4b0a8] mb-2 flex items-center gap-1.5">
                <Layers size={13} aria-hidden="true" />
                <span>Tools &amp; Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[12px] font-medium text-[#f4f1ea]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12.5px] text-[#b4b0a8]">{project.liveDemoNote}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[42px] px-4 rounded-full border border-white/15 text-[13px] font-medium text-[#b4b0a8] hover:text-white cursor-pointer"
              >
                Close
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-btn inline-flex items-center gap-1.5 min-h-[42px] px-5 rounded-full bg-[#dfd0a6]/16 border border-[#dfd0a6]/45 text-[#dfd0a6] text-[13px] font-semibold hover:bg-[#dfd0a6] hover:text-[#17171a]"
                >
                  <span>Open Live App</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn inline-flex items-center gap-1.5 min-h-[42px] px-5 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13px] font-semibold hover:bg-[#eae0c2]"
              >
                <span>View on GitHub</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
