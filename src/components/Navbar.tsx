import { useEffect, useState } from "react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { PORTFOLIO_TABS, SITE_PROFILE, type PortfolioTabId } from "../data/portfolioContent";
import { soundEngine } from "../utils/soundEngine";

interface NavbarProps {
  activeTab: PortfolioTabId;
  onSelectTab: (tabId: PortfolioTabId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function Navbar({
  activeTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = PORTFOLIO_TABS[(currentIndex + 1) % PORTFOLIO_TABS.length];
      onSelectTab(next.id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev =
        PORTFOLIO_TABS[(currentIndex - 1 + PORTFOLIO_TABS.length) % PORTFOLIO_TABS.length];
      onSelectTab(prev.id);
    }
  };

  return (
    <header className="sticky top-0 z-[80] bg-[#2a292e]/85 backdrop-blur-xl border-b border-white/[0.1]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        {/* Left Brand Lockup */}
        <button
          type="button"
          onClick={() => onSelectTab("home")}
          className="flex items-center gap-3 text-left group cursor-pointer rounded-xl pr-2"
          aria-label="Indhuraj L — Home tab"
        >
          <div className="w-9 h-9 rounded-full border border-[#dfd0a6]/40 bg-[#252428] p-1.5 flex items-center justify-center shrink-0 group-hover:border-[#dfd0a6] transition-colors">
            <img
              src="/images/indhuraj-il-mark.png"
              alt=""
              width={26}
              height={26}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <span className="block text-[14.5px] font-bold tracking-[0.04em] text-[#f4f1ea]">
              {SITE_PROFILE.name}
            </span>
            <span className="block text-[11px] font-medium text-[#b4b0a8]">
              {SITE_PROFILE.role}
            </span>
          </div>
        </button>

        {/* Center Desktop Underline Tabs */}
        <nav
          aria-label="Portfolio section tabs"
          role="tablist"
          className="hidden lg:flex items-center gap-6"
        >
          {PORTFOLIO_TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative py-2 text-[13px] tracking-[0.04em] transition-colors cursor-pointer ${
                  isActive
                    ? "font-semibold text-[#dfd0a6]"
                    : "font-medium text-[#b4b0a8] hover:text-[#f4f1ea]"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-[#dfd0a6]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Sound Toggle + Mobile Menu */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Mute UI interaction sounds" : "Enable UI interaction sounds"}
            className={`tactile-btn inline-flex items-center gap-2 min-h-[40px] px-3.5 rounded-full border text-[12px] font-medium cursor-pointer ${
              soundEnabled
                ? "bg-[#252428] border-[#dfd0a6]/40 text-[#dfd0a6]"
                : "bg-[#252428] border-white/10 text-[#87837c]"
            }`}
          >
            {soundEnabled ? (
              <Volume2 size={15} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <VolumeX size={15} strokeWidth={1.75} aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{soundEnabled ? "Sound On" : "Muted"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playSoftClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-tab-drawer"
            aria-label={mobileMenuOpen ? "Close navigation drawer" : "Open navigation drawer"}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/12 bg-[#252428] text-[#f4f1ea] hover:border-[#dfd0a6]/50 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={19} strokeWidth={1.75} /> : <Menu size={19} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Quick-Tab Strip (always reachable at < 1024px) */}
      <div
        className="lg:hidden border-t border-white/[0.07] bg-[#242327]/92 px-3 py-2 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Mobile quick tabs"
      >
        <div className="flex items-center gap-2 w-max">
          {PORTFOLIO_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectTab(tab.id)}
                className={`min-h-[40px] px-4 rounded-full text-[13px] whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#dfd0a6] text-[#17171a] font-semibold"
                    : "bg-[#252428] text-[#b4b0a8] border border-white/[0.07]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Full Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-tab-drawer"
          className="lg:hidden border-t border-white/[0.08] bg-[#1b1b1e] px-4 py-4 space-y-1.5 shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
        >
          {PORTFOLIO_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelectTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full min-h-[44px] px-4 rounded-xl flex items-center justify-between text-[14.5px] cursor-pointer ${
                  isActive
                    ? "bg-[#dfd0a6]/15 border border-[#dfd0a6]/35 text-[#dfd0a6] font-semibold"
                    : "text-[#f4f1ea] hover:bg-white/[0.04]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="font-mono-tech text-[11px] text-[#87837c]">{tab.shortIndex}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
