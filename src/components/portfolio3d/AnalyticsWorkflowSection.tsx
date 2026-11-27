import { useState, useEffect, useRef } from "react";
import {
  Database,
  Workflow,
  BarChart3,
  Layers3,
  Network,
  TrendingUp,
  FileSpreadsheet,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { soundEngine } from "../../utils/soundEngine";

export interface PipelineStageDef {
  number: string;
  name: string;
  icon: LucideIcon;
  description: string;
  tools: string[];
  insight: string;
}

export const pipelineStagesData: PipelineStageDef[] = [
  {
    number: "01",
    name: "Sales records",
    icon: Database,
    description: "9,994 sales records",
    tools: ["Sales", "Profit", "Quantity"],
    insight: "Multi-year transactional data with regional customer demographics and shipping metrics.",
  },
  {
    number: "02",
    name: "Preparation",
    icon: Workflow,
    description: "Cleaned and organized",
    tools: ["Microsoft Excel"],
    insight: "Data hygiene, column typing, duplicate elimination, and standardized categorical schemas.",
  },
  {
    number: "03",
    name: "Analysis",
    icon: BarChart3,
    description: "Performance and trends",
    tools: ["KPIs", "PivotTables"],
    insight: "Aggregated profit margin analysis, discount impact studies, and segment correlations.",
  },
  {
    number: "04",
    name: "Visualization",
    icon: Layers3,
    description: "Interactive exploration",
    tools: ["Charts", "Filters"],
    insight: "Interactive drill-down charts, regional map slices, and dynamic category slicers.",
  },
  {
    number: "05",
    name: "Reporting",
    icon: Network,
    description: "Business performance views",
    tools: ["Power BI", "DAX"],
    insight: "Executive decision dashboards with dynamic DAX time-intelligence calculations.",
  },
];

export function AnalyticsWorkflowSection() {
  const prefersReducedMotion = useReducedMotion();

  const [activeStage, setActiveStage] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isPageVisible, setIsPageVisible] = useState<boolean>(
    () => typeof document !== "undefined" && document.visibilityState === "visible"
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncPageVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", syncPageVisibility);
    return () => document.removeEventListener("visibilitychange", syncPageVisibility);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || !isInView || !isPageVisible) return;

    timerRef.current = setTimeout(() => {
      setActiveStage((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 4500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStage, isInView, isPageVisible, isPlaying, prefersReducedMotion]);

  const handleSelectStage = (stageNum: number) => {
    soundEngine.playSoftClick();
    setActiveStage(stageNum);
    setIsPlaying(false);
  };

  const selectedStage = pipelineStagesData[activeStage - 1];

  return (
    <section
      ref={sectionRef}
      className="p3d-section"
      id="workflow"
      aria-label="Sales analytics workflow: From sales data to clear insights"
    >
      <div className="p3d-container">
        <div className="p3d-section-header">
          <p className="p3d-eyebrow">04 / ANALYTICAL PROCESS</p>
          <h2 className="p3d-heading">
            From sales data<br />to clear insights
          </h2>
          <p className="p3d-description">
            An end-to-end analytical workflow drawn from my Excel sales analysis and Power BI
            capstone — converting raw multi-dimensional commerce records into executive intelligence.
          </p>
        </div>

        {/* 5-Stage Process Selector */}
        <div className="analytics-stages-nav" role="tablist" aria-label="Workflow stages">
          {pipelineStagesData.map((stage, idx) => {
            const Icon = stage.icon;
            const stageNum = idx + 1;
            const isActive = activeStage === stageNum;

            return (
              <button
                key={stage.name}
                type="button"
                className={`analytics-stage-pill ${isActive ? "analytics-stage-pill--active" : ""}`}
                onClick={() => handleSelectStage(stageNum)}
                role="tab"
                aria-selected={isActive}
                aria-controls="analytics-stage-details"
                id={`analytics-stage-tab-${stageNum}`}
              >
                <div className="analytics-stage-top">
                  <span className="analytics-stage-num">{stage.number}</span>
                  <div className="analytics-stage-icon">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                </div>
                <strong className="analytics-stage-title">{stage.name}</strong>
                <span className="analytics-stage-desc">{stage.description}</span>
              </button>
            );
          })}
        </div>

        <div className="analytics-workflow-controls">
          <p className="analytics-workflow-status" aria-live="polite">
            {prefersReducedMotion
              ? "Select a stage to explore the workflow."
              : !isPageVisible
                ? "Playback pauses while this page is in the background."
                : !isInView
                  ? "Playback pauses while this section is offscreen."
                  : isPlaying
                    ? "Stages advance every 4.5 seconds while this section is visible."
                    : "Workflow paused. Select a stage or resume playback."}
          </p>
          {!prefersReducedMotion && (
            <button
              className="analytics-workflow-toggle"
              type="button"
              onClick={() => {
                soundEngine.playSoftClick();
                setIsPlaying((playing) => !playing);
              }}
              aria-label={isPlaying ? "Pause workflow playback" : "Resume workflow playback"}
            >
              {isPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {isPlaying ? "Pause" : "Resume"}
            </button>
          )}
        </div>

        <div
          className="analytics-stage-details"
          id="analytics-stage-details"
          role="tabpanel"
          aria-labelledby={`analytics-stage-tab-${activeStage}`}
        >
          <div>
            <span className="analytics-stage-details__eyebrow">STAGE {selectedStage.number}</span>
            <h3>{selectedStage.name}</h3>
            <p>{selectedStage.insight}</p>
          </div>
          <ul aria-label={`${selectedStage.name} tools`}>
            {selectedStage.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>

        {/* Project Evidence & KPIs Banner */}
        <div className="analytics-kpis-grid" role="region" aria-label="Project evidence">
          <article className="analytics-kpi-card">
            <div className="analytics-kpi-icon">
              <FileSpreadsheet size={22} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="analytics-kpi-data">
              <span className="analytics-kpi-number">9,994</span>
              <span className="analytics-kpi-label">Sales records analyzed &amp; normalized</span>
            </div>
          </article>

          <article className="analytics-kpi-card">
            <div className="analytics-kpi-icon">
              <Workflow size={22} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="analytics-kpi-data">
              <span className="analytics-kpi-number">Microsoft Excel</span>
              <span className="analytics-kpi-label">Interactive dashboard &amp; PivotTable filters</span>
            </div>
          </article>

          <article className="analytics-kpi-card">
            <div className="analytics-kpi-icon">
              <TrendingUp size={22} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="analytics-kpi-data">
              <span className="analytics-kpi-number">Power BI + DAX</span>
              <span className="analytics-kpi-label">Sales analytics capstone reporting</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
export default AnalyticsWorkflowSection;
