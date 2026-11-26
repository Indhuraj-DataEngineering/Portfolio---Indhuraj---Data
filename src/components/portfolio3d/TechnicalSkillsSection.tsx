import { useState } from "react";
import {
  Code2,
  Database,
  BarChart3,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { soundEngine } from "../../utils/soundEngine";

export interface SkillCategoryDef {
  index: string;
  title: string;
  icon: LucideIcon;
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
    description:
      "Data cleaning, tabular transformations, vectorized computation, and structured exploratory data analysis.",
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
    description:
      "Relational querying, schema modeling, and multi-table metric extraction using MySQL.",
    tools: [
      "SQL",
      "MySQL",
      "MySQL Workbench",
      "Joins & Subqueries",
      "CTEs & Window Functions",
      "Stored Procedures",
    ],
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
    description:
      "Executive BI dashboards, DAX time-intelligence measures, PivotTables, and statistical charting.",
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
    description:
      "Summary distributions, hypothesis validation, and multi-variable correlation testing.",
    tools: ["Descriptive statistics", "Hypothesis testing", "Correlation analysis"],
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
    description:
      "Iterative notebook experimentation, Scikit-learn modeling, and interactive Streamlit deployment.",
    tools: ["Jupyter Notebook", "Scikit-learn", "Streamlit", "GitHub", "VS Code"],
    telemetry: {
      runtime: "jupyter_sklearn",
      usage: "app_deployment",
      confidence: 0.97,
    },
  },
];

export function TechnicalSkillsSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleSelect = (idx: number) => {
    soundEngine.playSoftClick();
    setActiveIdx(idx);
  };

  return (
    <section
      className="p3d-section"
      id="skills"
      aria-label="Technical skills and tools ecosystem"
    >
      <div className="p3d-container">
        <div className="p3d-section-header">
          <p className="p3d-eyebrow">03 / TOOLS &amp; TECHNOLOGIES</p>
          <h2 className="p3d-heading">Technical skills</h2>
          <p className="p3d-description">
            Verified tools and analytical competencies grouped by their role across data preparation,
            relational querying, business intelligence, and applied modeling.
          </p>
        </div>

        <div className="skills-interactive-layout">
          {skillCategoriesData.map((cat, actualIdx) => {
            const Icon = cat.icon;
            const isActive = activeIdx === actualIdx;

            return (
              <article
                key={cat.title}
                className={`skills-category-card ${isActive ? "skills-category-card--active" : ""}`}
                onClick={() => handleSelect(actualIdx)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(actualIdx)}
              >
                <div className="skills-category-header">
                  <div className="skills-category-icon">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div className="skills-category-meta">
                    <span className="skills-category-num">{cat.index}</span>
                    <strong className="skills-category-title">{cat.title}</strong>
                  </div>
                </div>
                <p className="skills-category-desc">{cat.description}</p>
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
    </section>
  );
}
export default TechnicalSkillsSection;
