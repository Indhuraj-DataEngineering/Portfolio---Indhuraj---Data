
import "./App.css";

function App() {
  return (
    <main className="portfolio">
      <section className="hero">
        <nav className="navbar">
          <h2 className="logo">Indhuraj.</h2>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">DATA ANALYST · PORTFOLIO</p>
          <h1>
            Turning data
            <br />
            into <span>insights.</span>
          </h1>
          <p className="hero-description">
            Exploring data, uncovering patterns, and transforming information
            into meaningful decisions.
          </p>
          <a href="#projects" className="hero-button">
            Explore my work ↗
          </a>
        </div>

        <div className="hero-footer">
          <span>SQL · PYTHON · POWER BI · EXCEL</span>
          <span>PORTFOLIO — 2026</span>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-content">
          <h2>Curiosity meets data.</h2>
          <p>
            I am an aspiring Data Analyst with a background in Agricultural
            Engineering and a passion for data-driven problem solving.
            I work with SQL, Python, Power BI and Excel to explore data,
            discover insights and build meaningful analytical projects.
          </p>
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="section-label">02 / SKILLS</div>
        <h2>My toolkit.</h2>

        <div className="skills-grid">
          <div className="skill-card">SQL</div>
          <div className="skill-card">Python</div>
          <div className="skill-card">Power BI</div>
          <div className="skill-card">Excel</div>
          <div className="skill-card">Data Visualization</div>
          <div className="skill-card">Data Analysis</div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-label">03 / PROJECTS</div>
        <h2>Selected work.</h2>

        <div className="projects-grid">
          <article className="project-card">
            <div className="project-top">
              <span>01</span>
              <span>PYTHON</span>
            </div>
            <h3>Tamil Movie Recommender</h3>
            <p>
              A Python-based movie recommendation project designed to
              recommend movies based on user preferences.
            </p>
            <a
              href="https://github.com/Indhuraj-DataEngineering/tamil-movie-recommender"
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
              <span>POWER BI</span>
            </div>
            <h3>Power BI Capstone</h3>
            <p>
              An interactive dashboard project focused on visualizing
              data, analyzing performance and presenting insights.
            </p>
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
              <span>EXCEL</span>
            </div>
            <h3>Excel Data Analysis</h3>
            <p>
              Exploring, organizing and analyzing data using Excel
              to transform raw data into useful information.
            </p>
            <a
              href="https://github.com/Indhuraj-DataEngineering/excel-sales-performance-dashboard"
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View project ↗
            </a>
          </article>
        </div>
      </section>

      <section className="education section" id="education">
        <div className="section-label">04 / EDUCATION</div>
        <h2>My background.</h2>
        <div className="education-card">
          <h3>Agricultural Engineering</h3>
          <p>
            Academic background in Agricultural Engineering,
            combining technical knowledge, analytical thinking
            and problem-solving skills.
          </p>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-label">05 / CONTACT</div>
        <h2>Let's connect.</h2>
        <p>Open to opportunities in Data Analytics.</p>

        <div className="contact-links">
          <a href="mailto:indhurajlakshmanan@gmail.com">
            Email ↗
          </a>
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
        <span>Indhuraj. © 2026</span>
        <span>BUILT WITH CURIOSITY.</span>
      </footer>
    </main>
  );
}

export default App;
