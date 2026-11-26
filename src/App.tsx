import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TechnicalSkillsSection } from "./components/portfolio3d/TechnicalSkillsSection";
import { AnalyticsWorkflowSection } from "./components/portfolio3d/AnalyticsWorkflowSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { StoveSafetySection } from "./components/portfolio3d/StoveSafetySection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PORTFOLIO_TABS, type PortfolioTabId } from "./data/portfolioContent";
import { soundEngine } from "./utils/soundEngine";

function parseHashTab(): PortfolioTabId {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace(/^#/, "").toLowerCase();
  const matched = PORTFOLIO_TABS.find((tab) => tab.id === hash);
  return matched ? matched.id : "home";
}

function App() {
  const [activeTab, setActiveTab] = useState<PortfolioTabId>(parseHashTab);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const onHashChange = () => {
      setActiveTab(parseHashTab());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleSelectTab = (tabId: PortfolioTabId) => {
    if (tabId !== activeTab) {
      soundEngine.playTabSwitch();
      setActiveTab(tabId);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${tabId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setEnabled(next);
    if (next) {
      soundEngine.playChime();
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-transparent text-[#f4f1ea] relative">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Subtle grain */}
      <div className="ambient-grain" aria-hidden="true" />

      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main
        id="main-content"
        className="relative z-10 flex-1 flex flex-col justify-center"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        <div key={activeTab} className="tab-panel-enter w-full">
          {activeTab === "home" && (
            <HeroSection activeTab={activeTab} onSelectTab={handleSelectTab} />
          )}
          {activeTab === "about" && <AboutSection onSelectTab={handleSelectTab} />}
          {activeTab === "skills" && <TechnicalSkillsSection />}
          {activeTab === "workflow" && <AnalyticsWorkflowSection />}
          {activeTab === "projects" && <ProjectsSection />}
          {activeTab === "research" && <StoveSafetySection />}
          {activeTab === "experience" && <ExperienceSection />}
          {activeTab === "contact" && <ContactSection />}
        </div>
      </main>

      <Footer activeTab={activeTab} onSelectTab={handleSelectTab} />
    </div>
  );
}

export default App;
