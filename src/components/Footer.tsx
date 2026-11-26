import { ArrowLeft, ArrowRight } from "lucide-react";
import { PORTFOLIO_TABS, SITE_PROFILE, type PortfolioTabId } from "../data/portfolioContent";

interface FooterProps {
  activeTab: PortfolioTabId;
  onSelectTab: (tab: PortfolioTabId) => void;
}

export function Footer({ activeTab, onSelectTab }: FooterProps) {
  const year = new Date().getFullYear();
  const currentIndex = PORTFOLIO_TABS.findIndex((t) => t.id === activeTab);
  const prevTab =
    PORTFOLIO_TABS[(currentIndex - 1 + PORTFOLIO_TABS.length) % PORTFOLIO_TABS.length];
  const nextTab = PORTFOLIO_TABS[(currentIndex + 1) % PORTFOLIO_TABS.length];

  return (
    <footer className="relative z-10 border-t border-white/[0.1] bg-[#262529]/85 backdrop-blur-md py-5">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous / Next Tab Stepper */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => onSelectTab(prevTab.id)}
            className="tactile-btn inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-[#252428] border border-white/10 text-[12.5px] font-medium text-[#b4b0a8] hover:text-[#dfd0a6] hover:border-[#dfd0a6]/45 cursor-pointer"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>{prevTab.label}</span>
          </button>

          <span className="font-mono-tech text-[11px] text-[#87837c] px-2">
            {PORTFOLIO_TABS[currentIndex]?.shortIndex} / 0{PORTFOLIO_TABS.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectTab(nextTab.id)}
            className="tactile-btn inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-[#dfd0a6]/14 border border-[#dfd0a6]/35 text-[12.5px] font-semibold text-[#dfd0a6] hover:bg-[#dfd0a6] hover:text-[#17171a] cursor-pointer"
          >
            <span>Next: {nextTab.label}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Identity & Copyright */}
        <div className="flex items-center gap-3 text-center sm:text-right">
          <img
            src="/images/indhuraj-il-mark.png"
            alt=""
            width={22}
            height={22}
            loading="lazy"
            className="w-5 h-5 object-contain opacity-90"
          />
          <p className="text-[12px] text-[#b4b0a8]">
            <span className="font-semibold text-[#f4f1ea]">{SITE_PROFILE.name}</span> © {year} ·{" "}
            {SITE_PROFILE.role}
          </p>
        </div>
      </div>
    </footer>
  );
}
