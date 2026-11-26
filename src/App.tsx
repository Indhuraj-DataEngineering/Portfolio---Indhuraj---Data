import "./App.css";

function App() {
  return (
    <main className="portfolio">
      {/* HERO */}
      <section className="hero">
        <nav className="navbar">
          <h2 className="logo">INDHURAJ L</h2>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#workflow">Workflow</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">INDHURAJ L / DATA ANALYST</p>
          <h1>
            Data
            <br />
            <span>Analyst.</span>
          </h1>
          <p className="hero-description">
            Turning data into clear analysis, useful dashboards and informed
            decisions. Exploring patterns and transforming information into
            meaningful insights.
          </p>
          <a href="#projects" className="hero-button">
            Explore my work ↗
          </a>
        </div>

        <div className="hero-footer">
          <span>PYTHON · SQL · POWER BI · EXCEL · STATISTICS</span>
          <span>PORTFOLIO — 2026</span>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="section-label">01 / ABOUT ME</div>
        <div className="about-content">
          <h2>Finding clarity in complex data.</h2>
          <p>
            I’m Indhuraj L, an Agricultural Engineering graduate focused on
            Data Analytics and Data Science. I use Python, SQL, Excel and
            Power BI to clean data, build dashboards and turn complex
            information into practical insights.
          </p>

          <div className="skills-grid" style={{ marginTop: "35px" }}>
            <div className="skill-card">
              <h3>Data Preparation</h3>
              <p>Cleaning, organizing and exploring datasets for meaningful analysis.</p>
            </div>
            <div className="skill-card">
              <h3>Analysis & Reporting</h3>
              <p>Building useful Excel and Power BI views to communicate insights.</p>
            </div>
            <div className="skill-card">
              <h3>Currently Learning</h3>
              <p>Data Science, Generative AI and Agentic AI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="section-label">02 / TOOLS & TECHNOLOGIES</div>
        <h2>Technical skills.</h2>
        <p style={{ marginBottom: "30px", lineHeight: 1.8 }}>
          Skills and tools grouped by their role in the data analytics workflow.
        </p>

        <div className="skills-grid">
          <div className="skill-card">
            <h3>Programming & Analysis</h3>
            <p>Python</p>
            <p>Pandas</p>
            <p>NumPy</p>
            <p>Data Cleaning</p>
            <p>Exploratory Data Analysis</p>
          </div>

          <div className="skill-card">
            <h3>Databases</h3>
            <p>SQL</p>
            <p>MySQL</p>
            <p>MySQL Workbench</p>
          </div>

          <div className="skill-card">
            <h3>Visualization & Reporting</h3>
            <p>Power BI</p>
            <p>DAX</p>
            <p>Microsoft Excel</p>
            <p>PivotTables</p>
            <p>Matplotlib · Seaborn</p>
          </div>

          <div className="skill-card">
            <h3>Statistics</h3>
            <p>Descriptive Statistics</p>
            <p>Hypothesis Testing</p>
          </div>

          <div className="skill-card">
            <h3>Project Tools</h3>
            <p>Jupyter Notebook</p>
            <p>Scikit-learn</p>
            <p>Streamlit</p>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section" id="workflow">
        <div className="section-label">03 / ANALYSIS WORKFLOW</div>
        <h2>From raw data to clear insights.</h2>
        <p style={{ lineHeight: 1.8, marginBottom: "30px" }}>
          An end-to-end approach to transforming sales records into useful
          business intelligence, based on my Excel and Power BI projects.
        </p>

        <div className="skills-grid">
          <div className="skill-card">
            <h3>01. Sales Records</h3>
            <p>9,994 sales records collected for analysis.</p>
          </div>
          <div className="skill-card">
            <h3>02. Preparation</h3>
            <p>Data cleaned, organized and prepared for analysis.</p>
          </div>
          <div className="skill-card">
            <h3>03. Analysis</h3>
            <p>Identifying performance patterns and business trends.</p>
          </div>
          <div className="skill-card">
            <h3>04. Visualization</h3>
            <p>Creating dashboards for interactive data exploration.</p>
          </div>
          <div className="skill-card">
            <h3>05. Reporting</h3>
            <p>Presenting business performance through clear reports.</p>
          </div>
        </div>

        <div className="education-card" style={{ marginTop: "25px" }}>
          <h3>Tools used</h3>
          <p>
            Microsoft Excel — Interactive dashboards and PivotTable filters.
          </p>
          <p>
            Power BI & DAX — Sales analytics, year-to-date revenue,
            previous-month revenue and month-over-month growth.
          </p>
        </div>
      </section>

      {/* MACHINE LEARNING */}
      <section className="section">
        <div className="section-label">04 / APPLIED INTELLIGENCE</div>
        <h2>Machine learning & Gen AI.</h2>

        <div className="education-card">
          <p className="section-label">COMPLETED PROJECT</p>
          <h3>Tamil Movie Recommendation System</h3>
          <p>
            Processed Tamil movie and rating data using Pandas, implemented
            movie recommendations with Scikit-learn, and built an interactive
            Streamlit application.
          </p>
          <p>
            <strong>Tools:</strong> Python · Pandas · Scikit-learn · Streamlit
          </p>
          <p>
            <strong>Process:</strong> Data preparation, recommendation model
            and interactive application.
          </p>
          <a
            href="https://github.com/Indhuraj-DataEngineering/tamil-movie-recommender"
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View project ↗
          </a>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <p className="section-label">IN PROGRESS</p>
          <h3>Data Science with Generative AI and Agentic AI</h3>
          <p>
            Completed the Data Analytics portion covering Python, SQL, Excel,
            Power BI, statistics, Pandas, NumPy, exploratory data analysis
            and data visualization. Currently continuing with advanced
            learning in Data Science, Generative AI and Agentic AI.
          </p>
        </div>
      </section>

      {/* ENGINEERING PROJECT */}
      <section className="section">
        <div className="section-label">05 / ENGINEERING PROJECT</div>
        <h2>Smart multi-sensor stove safety system.</h2>

        <div className="education-card">
          <p>
            Developed and tested an integrated detection prototype with
            automatic electro-mechanical shutoff for LPG and biogas stoves.
            The system uses microcontrollers and multiple sensors to monitor
            potential hazards.
          </p>

          <div className="skills-grid" style={{ marginTop: "25px" }}>
            <div className="skill-card">
              <h3>Gas Leak</h3>
              <p>MQ-2 / MQ-5 semiconductor sensors</p>
            </div>
            <div className="skill-card">
              <h3>Flame & Smoke</h3>
              <p>Optical IR and photoelectric sensors</p>
            </div>
            <div className="skill-card">
              <h3>Human Presence</h3>
              <p>PIR pyroelectric sensor</p>
            </div>
            <div className="skill-card">
              <h3>Automatic Shutoff</h3>
              <p>Relay and solenoid valve</p>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATION */}
      <section className="section">
        <div className="section-label">06 / RESEARCH PUBLICATION</div>
        <h2>Published research.</h2>

        <div className="education-card">
          <h3>
            Sensor-Based Smart Gas Leak, Flame, Smoke and Human Presence
            Detection System with Automatic Shutoff for Biogas and LPG Stoves
          </h3>
          <p>
            International Research Journal on Advanced Engineering Hub
            (IRJAEH)
          </p>
          <p>Volume 04, Issue 04 · April 2026</p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="section-label">07 / FEATURED PROJECTS</div>
        <h2>Selected work.</h2>
        <p style={{ marginBottom: "30px", lineHeight: 1.8 }}>
          Practical projects demonstrating data preparation, analysis,
          visualization and applied machine learning.
        </p>

        <div className="projects-grid">
          <article className="project-card">
            <div className="project-top">
              <span>01</span>
              <span>EXCEL · DATA ANALYTICS</span>
            </div>
            <h3>Excel Sales Performance Analysis</h3>
            <p>
              Analyzed sales and profitability across product categories,
              states and monthly trends. Cleaned and organized records and
              created PivotTables, KPI calculations, charts and interactive
              filters.
            </p>
            <p><strong>Tools:</strong> Excel, PivotTables, Charts, KPI calculations.</p>
            <a
              href="https://github.com/Indhuraj-DataEngineering/excel-sales-performance-dashboard"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View project ↗
            </a>
          </article>

          <article className="project-card">
            <div className="project-top">
              <span>02</span>
              <span>POWER BI · DATA ANALYTICS</span>
            </div>
            <h3>Power BI Sales Analytics Capstone</h3>
            <p>
              Developed an interactive dashboard to bring sales and
              profitability measures together. Created DAX measures for
              year-to-date revenue, previous-month revenue, month-over-month
              growth and profitability.
            </p>
            <p><strong>Tools:</strong> Power BI, DAX, Sales Analytics.</p>
            <a
              href="https://github.com/Indhuraj-DataEngineering/power-bi-sales-analytics-capstone"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View project ↗
            </a>
          </article>

          <article className="project-card">
            <div className="project-top">
              <span>03</span>
              <span>PYTHON · DATA SCIENCE</span>
            </div>
            <h3>Tamil Movie Recommendation System</h3>
            <p>
              Processed Tamil movie and rating data with Pandas, implemented
              recommendations using Scikit-learn, and developed an interactive
              Streamlit application.
            </p>
            <p><strong>Tools:</strong> Python, Pandas, Scikit-learn, Streamlit.</p>
            <a
              href="https://github.com/Indhuraj-DataEngineering/tamil-movie-recommender"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View project ↗
            </a>
          </article>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="section-label">08 / EXPERIENCE</div>
        <h2>Professional experience.</h2>

        <div className="education-card">
          <p className="section-label">JANUARY 2026 — APRIL 2026</p>
          <h3>Project Intern</h3>
          <p><strong>Green Resource Solutions</strong></p>
          <p>
            Worked on a sensor-based gas leak, flame, smoke and human-presence
            detection system with automatic shutoff for LPG and biogas stoves.
          </p>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <p className="section-label">MARCH 2024</p>
          <h3>Inplant Training Intern</h3>
          <p><strong>Sai Lakshme Milk Products (AAHHAA)</strong></p>
          <p>
            Gained practical exposure to dairy processing, quality-control
            procedures, process documentation and monitoring operational
            and quality parameters.
          </p>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="education">
        <div className="section-label">09 / EDUCATION</div>
        <h2>Academic background.</h2>

        <div className="education-card">
          <p className="section-label">2022 — 2026</p>
          <h3>B.Tech — Agricultural Engineering</h3>
          <p>The Kavery Engineering College</p>
          <p><strong>Percentage: 85%</strong></p>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <p className="section-label">2021 — 2022</p>
          <h3>Higher Secondary (HSLC)</h3>
          <p>AMMH School, Krishnagiri</p>
          <p><strong>Percentage: 74%</strong></p>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <p className="section-label">2019 — 2020</p>
          <h3>Secondary School (SSLC)</h3>
          <p>AMMH School, Krishnagiri</p>
          <p><strong>Percentage: 98%</strong></p>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section">
        <div className="section-label">10 / ACHIEVEMENTS & PUBLICATIONS</div>
        <h2>Beyond analytics.</h2>

        <div className="education-card">
          <h3>Certified Innovation Ambassador</h3>
          <p>
            Foundation and Advanced Levels — Ministry of Education Innovation
            Cell and AICTE.
          </p>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <h3>Best Scalable Business Model</h3>
          <p>
            Pitch Fest · Sri Eshwar THIRAN 2025 · Sri Eshwar College of
            Engineering, Coimbatore.
          </p>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <h3>Tamil Poetry Collection</h3>
          <p>Author and co-editor · First edition, September 2025.</p>
          <p>ISBN: 978-93-49960-96-1</p>
        </div>
      </section>

      {/* LEARNING */}
      <section className="section">
        <div className="section-label">11 / LEARNING & LANGUAGES</div>
        <h2>Continuous learning.</h2>

        <div className="education-card">
          <h3>Data Science with Generative AI and Agentic AI</h3>
          <p>
            Completed the Data Analytics portion, covering Python, SQL,
            Excel, Power BI, statistics, Pandas, NumPy, exploratory data
            analysis and data visualization.
          </p>
        </div>

        <div className="skills-grid" style={{ marginTop: "20px" }}>
          <div className="skill-card">
            <h3>Tamil</h3>
            <p>Native or bilingual proficiency</p>
          </div>
          <div className="skill-card">
            <h3>English</h3>
            <p>Professional working proficiency</p>
          </div>
        </div>
      </section>

      {/* PROFILES */}
      <section className="section">
        <div className="section-label">12 / ONLINE PROFILES</div>
        <h2>Explore my work.</h2>

        <div className="education-card">
          <h3>GitHub</h3>
          <p>Explore my profile and public projects.</p>
          <a
            href="https://github.com/Indhuraj-DataEngineering"
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub ↗
          </a>
        </div>

        <div className="education-card" style={{ marginTop: "20px" }}>
          <h3>LinkedIn</h3>
          <p>Connect with me professionally.</p>
          <a
            href="https://www.linkedin.com/in/indhuraj-l-8019922a2/"
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit LinkedIn ↗
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <div className="section-label">13 / LET'S CONNECT</div>
        <h2>Let's build something meaningful.</h2>
        <p>
          I’m seeking an entry-level Data Analyst role and welcome
          conversations about analytics and reporting projects.
        </p>

        <div style={{ marginTop: "25px", lineHeight: 2 }}>
          <p>Data Analysis & Statistics</p>
          <p>Dashboards & Reporting</p>
          <p>Applied Machine Learning</p>
          <p>Krishnagiri, Tamil Nadu, India</p>
          <p>+91 9345512924</p>
        </div>

        <div className="contact-links">
          <a href="mailto:indhurajlakshmanan@gmail.com">Email ↗</a>
          <a
            href="https://github.com/Indhuraj-DataEngineering"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/indhuraj-l-8019922a2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <footer>
        <span>INDHURAJ L © 2026</span>
        <span>DATA ANALYST · DATA SCIENCE & ANALYTICS</span>
      </footer>
    </main>
  );
}

export default App;
