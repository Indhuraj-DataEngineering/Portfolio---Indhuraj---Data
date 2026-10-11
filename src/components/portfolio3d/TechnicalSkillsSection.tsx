import React, { useState } from "react";
import {
  Code2,
  Database,
  BarChart3,
  Sparkles,
  Workflow,
  CheckCircle2,
} from "lucide-react";

export interface SkillCategoryDef {
  index: string;
  title: string;
  icon: React.ElementType;
  description: string;
  tools: string[];
  telemetry: {
    runtime: string;
    usage: string;
    confidence: number;
  };
}

export const skillCategoriesData: SkillCategoryDef[] = [
  {
    index: "01",
    title: "Programming & Analysis",
    icon: Code2,
    description: "Core algorithmic data processing, tabular data manipulation, and exploratory data analysis.",
    tools: ["Python", "Pandas", "NumPy", "Data cleaning", "Exploratory data analysis"],
    telemetry: {
      runtime: "python_v3.12",
      usage: "vectorized_pipeline",
      confidence: 0.98,
    },
  },
  {
    index: "02",
    title: "Databases",
    icon: Database,
    description: "Relational data modeling, ACID transaction integrity, and performant SQL queries.",
    tools: ["SQL", "MySQL", "MySQL Workbench"],
    telemetry: {
      runtime: "mysql_relational",
      usage: "indexed_queries",
      confidence: 0.96,
    },
  },
  {
    index: "03",
    title: "Visualization & Reporting",
    icon: BarChart3,
    description: "Executive business dashboards, interactive drill-downs, and statistical plotting.",
    tools: ["Power BI", "DAX", "Microsoft Excel", "PivotTables", "Matplotlib", "Seaborn"],
    telemetry: {
      runtime: "power_bi_dax",
      usage: "executive_kpis",
      confidence: 0.99,
    },
  },
  {
    index: "04",
    title: "Statistics",
    icon: Sparkles,
    description: "Mathematical hypothesis validation, distribution estimation, and significance testing.",
    tools: ["Descriptive statistics", "Hypothesis testing"],
    telemetry: {
      runtime: "inferential_stats",
      usage: "variance_testing",
      confidence: 0.94,
    },
  },
  {
    index: "05",
    title: "Project Tools",
    icon: Workflow,
    description: "Iterative notebook workflows, machine learning model building, and rapid web application deployment.",
    tools: ["Jupyter Notebook", "Scikit-learn", "Streamlit"],
    telemetry: {
      runtime: "jupyter_sklearn",
      usage: "app_deployment",
      confidence: 0.97,
    },
  },
];

export function TechnicalSkillsSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeCategory = skillCategoriesData[activeIdx];

  return (
    <section
      className="p3d-section p3d-section--tinted"
      id="skills"
      aria-label="Technical skills and tools ecosystem"
    >
      <div className="p3d-ambient-glow p3d-ambient-glow--orange" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: "620px", height: "620px" }} />

      <div className="p3d-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="p3d-badge">
            <span className="pulse-dot" />
            TOOLS & TECHNOLOGIES · CENTRAL HUB
          </span>
          <h2 className="p3d-heading p3d-heading--centered">Technical skills.</h2>
          <p className="p3d-description p3d-description--centered">
            Skills and tools listed in my resume, grouped by engineering discipline in a clear, professional layout.
          </p>
        </div>

        <div className="skills-interactive-layout">
          <div className="skills-column">
            {skillCategoriesData.filter((_, index) => index % 2 === 0).map((cat, index) => {
              const Icon = cat.icon;
              const actualIdx = index * 2;
              const isActive = activeIdx === actualIdx;

              return (
                <article
                  key={cat.title}
                  className={`skills-category-card ${isActive ? "skills-category-card--active" : ""}`}
                  onClick={() => setActiveIdx(actualIdx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveIdx(actualIdx)}
                >
                  <div className="skills-category-header">
                    <div className="skills-category-icon">
                      <Icon size={20} />
                    </div>
                    <div className="skills-category-meta">
                      <span className="skills-category-num">{cat.index}</span>
                      <strong className="skills-category-title">{cat.title}</strong>
                    </div>
                  </div>
                  <div className="skills-tools-pills">
                    {cat.tools.map((tool) => (
                      <span key={tool} className="skills-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="skills-column">
            {skillCategoriesData.filter((_, index) => index % 2 === 1).map((cat, index) => {
              const Icon = cat.icon;
              const actualIdx = index * 2 + 1;
              const isActive = activeIdx === actualIdx;

              return (
                <article
                  key={cat.title}
                  className={`skills-category-card ${isActive ? "skills-category-card--active" : ""}`}
                  onClick={() => setActiveIdx(actualIdx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveIdx(actualIdx)}
                >
                  <div className="skills-category-header">
                    <div className="skills-category-icon">
                      <Icon size={20} />
                    </div>
                    <div className="skills-category-meta">
                      <span className="skills-category-num">{cat.index}</span>
                      <strong className="skills-category-title">{cat.title}</strong>
                    </div>
                  </div>
                  <div className="skills-tools-pills">
                    {cat.tools.map((tool) => (
                      <span key={tool} className="skills-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Selected Category Expanded Information Drawer */}
        <div className="skills-active-details" role="region" aria-label="Selected skill discipline details">
          <div className="skills-detail-main">
            <div className="skills-detail-badge">
              <CheckCircle2 size={24} />
            </div>
            <div className="skills-detail-info">
              <h4>
                {activeCategory.index} · {activeCategory.title}
              </h4>
              <p>{activeCategory.description}</p>
            </div>
          </div>
          <div className="skills-tools-pills" style={{ justifyContent: "flex-end" }}>
            {activeCategory.tools.map((tool) => (
              <span
                key={tool}
                className="skills-tool-chip"
                style={{
                  background: "var(--p3d-orange-tint)",
                  color: "var(--p3d-orange-primary)",
                  fontWeight: 700,
                  borderColor: "rgba(242, 98, 34, 0.3)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default TechnicalSkillsSection;
