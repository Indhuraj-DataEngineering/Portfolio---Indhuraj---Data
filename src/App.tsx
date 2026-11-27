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

function parseHashSection(): PortfolioTabId {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace(/^#/, "").toLowerCase();
  const matched = PORTFOLIO_TABS.find((item) => item.id === hash);
  return matched ? matched.id : "home";
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "auto";
  }
  return "smooth";
}

function App() {
  const [activeSection, setActiveSection] = useState<PortfolioTabId>(parseHashSection);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialHash = window.location.hash.replace(/^#/, "").toLowerCase();
    const matched = PORTFOLIO_TABS.find((item) => item.id === initialHash);
    if (matched && matched.id !== "home") {
      window.requestAnimationFrame(() => {
        document.getElementById(matched.id)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }

    const onHashChange = () => {
      const target = parseHashSection();
      setActiveSection(target);
      if (target === "home") {
        window.scrollTo({ top: 0, behavior: getScrollBehavior() });
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const updateActiveFromScroll = () => {
      rafId = 0;

      if (window.scrollY < 48) {
        setActiveSection("home");
        return;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 28;
      if (nearBottom) {
        setActiveSection("contact");
        return;
      }

      const headerOffset = window.innerWidth >= 1280 ? 120 : 156;
      let current: PortfolioTabId = "home";

      for (const item of PORTFOLIO_TABS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= headerOffset) {
          current = item.id;
        }
      }

      setActiveSection(current);
    };

    const handleScrollOrResize = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateActiveFromScroll);
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleSelectSection = (sectionId: PortfolioTabId) => {
    soundEngine.playTabSwitch();
    setActiveSection(sectionId);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
      const behavior = getScrollBehavior();
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior, block: "start" });
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

      {/* Left-edge floating section progress dots on wide viewports */}
      <aside
        className="hidden xl:flex flex-col items-center gap-3 fixed left-5 2xl:left-7 top-1/2 -translate-y-1/2 z-30"
        aria-label="Quick section scroll indicator"
      >
        {PORTFOLIO_TABS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectSection(item.id)}
              title={item.label}
              aria-label={`Scroll to ${item.label} section`}
              aria-current={isActive ? "location" : undefined}
              className={`rounded-full transition-all cursor-pointer ${
                isActive
                  ? "w-2.5 h-2.5 bg-[#dfd0a6] shadow-[0_0_10px_rgba(223,207,164,0.65)]"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
              }`}
            />
          );
        })}
      </aside>

      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main id="main-content" className="relative z-10 flex-1 flex flex-col">
        <HeroSection onSelectSection={handleSelectSection} />
        <AboutSection onSelectSection={handleSelectSection} />
        <TechnicalSkillsSection />
        <AnalyticsWorkflowSection />
        <ProjectsSection />
        <StoveSafetySection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer onSelectSection={handleSelectSection} />
    </div>
  );
}

export default App;
