import type { Project } from "../projectFilters";

export type PortfolioTabId =
  | "home"
  | "about"
  | "skills"
  | "workflow"
  | "projects"
  | "research"
  | "experience"
  | "contact";

export interface NavTabItem {
  id: PortfolioTabId;
  label: string;
  shortIndex: string;
}

export interface CapabilityChip {
  label: string;
  detail: string;
  iconKey: "python" | "sql" | "powerbi" | "excel" | "stats" | "ml";
}

export interface AboutPillar {
  title: string;
  description: string;
  metricTag: string;
  iconKey: "cleaning" | "dashboards" | "ml";
}

export interface CaseStudyProject extends Project {
  id: string;
  index: string;
  subtitle: string;
  metrics: { label: string; value: string }[];
  architecture: string[];
  deliverables: string[];
  githubUrl: string;
  liveUrl?: string;
  liveDemoNote: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  status: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  detail?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  status: "Completed" | "In Progress" | "Award" | "Publication";
  detail: string;
}

export const SITE_PROFILE = {
  name: "INDHURAJ L",
  displayName: "Indhuraj L",
  role: "Data Analyst",
  subRole: "BI Reporting & Applied Data Science",
  location: "Krishnagiri & Chennai, Tamil Nadu, India",
  email: "indhurajlakshmanan@gmail.com",
  phone: "+91 9345512924",
  phoneHref: "tel:+919345512924",
  githubUrl: "https://github.com/Indhuraj-DataEngineering",
  githubHandle: "@Indhuraj-DataEngineering",
  linkedinUrl: "https://www.linkedin.com/in/indhuraj-l-8019922a2/",
  linkedinHandle: "indhuraj-l-8019922a2",
  resumeUrl: "/resume/Indhuraj-L-Resume.pdf",
  poetryPdfUrl: "/publications/Tamil-Poetry-Collection.pdf",
  availability: "Open to Entry-Level Data Analyst & BI Roles",
  heroHeadline: "Turning Complex Data Into Measurable Decisions",
  heroSummary:
    "Entry-level Data Analyst skilled in Python, SQL, Excel, Power BI, and statistics — completed Data Analytics training at Besant Technology and currently pursuing Data Science with Generative AI and Agentic AI.",
  aboutHeadline: "Engineering Clarity From Complex Datasets",
  aboutSummary:
    "I am an Agricultural Engineering graduate (Chosen Vertical: IT in Agricultural Engineering) transitioning full-time into Data Analytics and Applied Data Science. Through structured training at Besant Technology and hands-on capstone builds, I clean multi-dimensional datasets, write analytical SQL, design DAX data models, and translate raw numbers into clear operational insight.",
  languages: [
    { name: "Tamil", level: "Native or Bilingual Proficiency" },
    { name: "English", level: "Professional Working Proficiency" },
  ],
} as const;

export const PORTFOLIO_TABS: NavTabItem[] = [
  { id: "home", label: "Home", shortIndex: "01" },
  { id: "about", label: "About", shortIndex: "02" },
  { id: "skills", label: "Skills", shortIndex: "03" },
  { id: "workflow", label: "Workflow", shortIndex: "04" },
  { id: "projects", label: "Projects", shortIndex: "05" },
  { id: "research", label: "Research", shortIndex: "06" },
  { id: "experience", label: "Experience", shortIndex: "07" },
  { id: "contact", label: "Contact", shortIndex: "08" },
];

export const HERO_CAPABILITIES: CapabilityChip[] = [
  { label: "Python & Pandas", detail: "Data cleaning & EDA", iconKey: "python" },
  { label: "SQL & MySQL", detail: "Joins, CTEs & windows", iconKey: "sql" },
  { label: "Power BI & DAX", detail: "Time-intelligence KPIs", iconKey: "powerbi" },
  { label: "Microsoft Excel", detail: "PivotTables & dashboards", iconKey: "excel" },
  { label: "Machine learning", detail: "Scikit-learn & modeling", iconKey: "ml" },
  { label: "Deep learning", detail: "Neural networks & AI", iconKey: "stats" },
];

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: "Data Cleaning & Preparation",
    description:
      "Standardizing schemas, resolving missing values, and auditing raw records in Python (Pandas/NumPy), SQL, and Excel before reporting any metric.",
    metricTag: "9,994+ records normalized",
    iconKey: "cleaning",
  },
  {
    title: "BI Dashboards & DAX Modeling",
    description:
      "Designing interactive Power BI and Excel views backed by YTD revenue, prior-month comparison, MoM growth, and profit-margin DAX measures.",
    metricTag: "Executive KPI reporting",
    iconKey: "dashboards",
  },
  {
    title: "Applied ML & Gen AI Upskilling",
    description:
      "Building Scikit-learn recommendation pipelines while advancing through Data Science, Generative AI, and Agentic AI coursework at Besant Technology.",
    metricTag: "Ongoing specialization",
    iconKey: "ml",
  },
];

export const FEATURED_PROJECTS: CaseStudyProject[] = [
  {
    id: "power-bi-sales-capstone",
    index: "01",
    title: "Power BI Sales Analytics Capstone",
    subtitle: "Executive Revenue, Margin & Time-Intelligence Reporting",
    category: "Data Analytics",
    description:
      "Built an interactive Power BI business intelligence suite consolidating revenue, profit, cost, order volume, and customer behavior into a unified decision-making workspace.",
    problem:
      "Commercial metrics across regions, product categories, and monthly periods lived in separate flat tables without standardized time-intelligence comparisons or margin visibility.",
    contribution:
      "Modeled the transactional dataset in Power BI and authored dynamic DAX measures for Year-to-Date (YTD) revenue, Previous-Month revenue, Month-over-Month (MoM) growth, and regional profitability breakdowns.",
    architecture: [
      "Cleaned transactional commerce tables and established consistent date and product-category keys",
      "Authored reusable DAX measures for YTD, prior-period tracking, MoM % delta, and profit ratio",
      "Designed multi-page regional and category drill-down visuals for root-cause performance review",
    ],
    deliverables: [
      "Executive KPI overview with dynamic YTD vs. prior-month comparisons",
      "Regional & category profitability variance visuals",
      "Interactive slicer architecture for leadership exploration",
    ],
    stack: ["Power BI", "DAX", "Data Modeling", "KPI Design", "Business Intelligence"],
    metrics: [
      { label: "Core Measures", value: "YTD / PM / MoM%" },
      { label: "Dimensions", value: "Region · Product" },
      { label: "Focus", value: "Margin & Growth" },
    ],
    githubUrl: "https://github.com/Indhuraj-DataEngineering/power-bi-sales-analytics-capstone",
    liveDemoNote: "Repository hosts PBIX documentation & analytical walkthrough.",
    accent: "analytics",
  },
  {
    id: "excel-sales-dashboard",
    index: "02",
    title: "Sales Performance & Interactive Excel Suite",
    subtitle: "9,994-Record Cleaning, PivotTable Modeling & KPI Workbook",
    category: "Data Analytics",
    description:
      "Cleaned, audited, and analyzed 9,994 multi-year sales records in Microsoft Excel to uncover category margins, state-level demand pockets, and seasonal revenue patterns.",
    problem:
      "Raw retail order exports contained inconsistent formatting, category sprawl, and zero unified KPI summaries for comparing state-level revenue against net profitability.",
    contribution:
      "Executed full spreadsheet data hygiene, constructed multi-dimensional PivotTables for total sales, profit, quantity, and profit margin, and assembled a slicer-driven interactive dashboard.",
    architecture: [
      "Audited 9,994 rows for data-type consistency, duplicate anomalies, and standardized state/category fields",
      "Built calculated fields and PivotTables summarizing revenue, units sold, profit, and margin %",
      "Connected dynamic slicers across category, state, and monthly trend charts for self-serve filtering",
    ],
    deliverables: [
      "Normalized 9,994-record workbook with formula-driven KPI cards",
      "State-level sales vs. profitability comparison tables",
      "Monthly trend analysis with interactive category slicers",
    ],
    stack: ["Microsoft Excel", "PivotTables", "Data Cleaning", "KPI Formulas", "Charts"],
    metrics: [
      { label: "Dataset Scope", value: "9,994 Records" },
      { label: "KPIs Tracked", value: "Sales · Profit · Margin" },
      { label: "Interactivity", value: "Slicer Linked" },
    ],
    githubUrl: "https://github.com/Indhuraj-DataEngineering/excel-sales-performance-dashboard",
    liveDemoNote: "Workbook methodology and screenshots documented on GitHub.",
    accent: "pipeline",
  },
  {
    id: "tamil-movie-recommender",
    index: "03",
    title: "Tamil Movie Recommendation System",
    subtitle: "Pandas Feature Pipeline, Scikit-learn Similarity & Streamlit UI",
    category: "Data Science",
    description:
      "Engineered an interactive recommendation application processing Tamil cinema metadata and user-rating datasets with Pandas, Scikit-learn, and a deployed Streamlit web interface.",
    problem:
      "Discovering relevant regional Tamil films across fragmented rating spreadsheets required manual browsing without structured metadata matching or similarity scoring.",
    contribution:
      "Preprocessed movie attributes and rating records in Pandas, implemented similarity-based recommendation logic using Scikit-learn, and shipped an interactive Streamlit web application.",
    architecture: [
      "Cleaned and normalized Tamil film titles, genre tags, and rating features using Pandas",
      "Vectorized film metadata and computed similarity rankings with Scikit-learn",
      "Built and deployed an interactive Streamlit front-end for real-time query & discovery",
    ],
    deliverables: [
      "Clean feature-engineered Tamil movie dataset pipeline",
      "Scikit-learn recommendation scoring engine",
      "Interactive Streamlit web interface for user-facing movie discovery",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "EDA"],
    metrics: [
      { label: "Pipeline", value: "Pandas + Sklearn" },
      { label: "Interface", value: "Streamlit App" },
      { label: "Domain", value: "Tamil Cinema" },
    ],
    githubUrl: "https://github.com/Indhuraj-DataEngineering/tamil-movie-recommender",
    liveUrl: "https://tamil-movie-recommender-indhuraj.streamlit.app/",
    liveDemoNote: "Interactive Streamlit app is deployed live alongside the GitHub source repository.",
    accent: "document",
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: "Data Analytics Trainee",
    organization: "Besant Technology",
    location: "Chennai, India",
    period: "July 2026 – Present",
    status: "Current Track",
    highlights: [
      "Completed training in Python, SQL, Excel, Power BI, and statistics.",
      "Applied Pandas and NumPy for data cleaning, transformation, and exploratory data analysis.",
      "Created interactive Excel and Power BI dashboards to analyse sales trends and business performance.",
      "Used SQL joins, subqueries, aggregations, and window functions to retrieve and analyse data.",
      "Currently pursuing Data Science with Generative AI and Agentic AI.",
    ],
  },
  {
    role: "Project Intern",
    organization: "Green Resource Solutions",
    location: "India",
    period: "January 2026 – April 2026",
    status: "Internship",
    highlights: [
      "Applied machine learning techniques to analyze sensor data and identify potential safety hazards in LPG and biogas stove systems.",
      "Developed automation code to trigger alerts and activate gas shutoff based on detected conditions.",
      "Implemented AI-based monitoring to track gas, smoke, flame, and human-presence sensor readings.",
      "Evaluated system responses during testing and documented observations to assess monitoring and automation performance.",
    ],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: "B.Tech in Agricultural Engineering",
    institution: "The Kavery Engineering College (Autonomous), Salem",
    period: "2022 – 2026",
    score: "85%",
    detail: "Chosen Vertical: IT in Agricultural Engineering",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "AMMH School, Krishnagiri",
    period: "2021 – 2022",
    score: "74%",
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "AMMH School, Krishnagiri",
    period: "2019 – 2020",
    score: "98%",
  },
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    title: "Data Science with Generative AI & Agentic AI",
    issuer: "Besant Technology",
    status: "In Progress",
    detail: "Advancing statistical modeling, machine learning, LLM workflows, and autonomous agent patterns.",
  },
  {
    title: "Data Analytics Certification Track",
    issuer: "Besant Technology",
    status: "Completed",
    detail: "Completed coursework across Python, SQL, MySQL, Microsoft Excel, Power BI, DAX, and Statistics.",
  },
  {
    title: "Certified Innovation Ambassador (Foundation & Advanced)",
    issuer: "Ministry of Education's Innovation Cell & AICTE",
    status: "Completed",
    detail: "Dual-level credential in design thinking, problem framing, and scalable innovation mentorship.",
  },
  {
    title: "Best Scalable Business Model",
    issuer: "Pitch Fest · Sri Eshwar THIRAN 2025, Coimbatore",
    status: "Award",
    detail: "Awarded for structured problem definition, feasibility analysis, and scalable solution design.",
  },
  {
    title: "Prompt Engineering Applications",
    issuer: "Simplilearn SkillUp",
    status: "Completed",
    detail: "Structured prompting techniques for analytical workflows and Generative AI productivity.",
  },
  {
    title: "Getting Started with AWS IoT SiteWise",
    issuer: "Simplilearn SkillUp",
    status: "Completed",
    detail: "Foundational cloud telemetry modeling and industrial sensor data ingestion concepts.",
  },
];

export const BOOK_PUBLICATION = {
  tamilTitle: "தணினித்தும் நிற்கும் அ ஆ",
  transliteration: "Thaninithindhum nirkum a aa",
  subtitle: "Tamil Poetry Collection · First Edition",
  authors: "Dr. M. Mynavathy (Composer) & L. Indhuraj (Author & Co-Editor)",
  publisher: "Magizhini Pathipagam · September 2025 · 96 Pages",
  isbn: "ISBN: 978-93-49960-96-1",
  pdfUrl: "/publications/Tamil-Poetry-Collection.pdf",
  description:
    "Published 96-page Tamil literary collection exploring nature, agriculture, resilience, and everyday human reflection — demonstrating clear communication and editorial discipline alongside technical engineering.",
};

export const RESEARCH_PUBLICATION = {
  title:
    "Sensor-Based Smart Gas Leak, Flame, Smoke and Human Presence Detection System with Automatic Shutoff for Biogas and LPG Stoves",
  journal: "International Research Journal on Advanced Engineering Hub (IRJAEH)",
  issue: "Volume 04, Issue 04 · April 2026",
  doi: "10.47392/IRJAEH.2026.0301",
  doiUrl: "https://doi.org/10.47392/IRJAEH.2026.0301",
  journalUrl: "https://irjaeh.com/index.php/journal/article/view/1564",
};

export const SOFT_SKILLS = [
  "Problem Solving",
  "Analytical Thinking",
  "Adaptability",
  "Teamwork",
  "Time Management",
] as const;
