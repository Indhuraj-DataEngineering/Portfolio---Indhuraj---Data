import { ArrowUp } from "lucide-react";
import { PORTFOLIO_TABS, SITE_PROFILE, type PortfolioTabId } from "../data/portfolioContent";

interface FooterProps {
  onSelectSection: (sectionId: PortfolioTabId) => void;
}

export function Footer({ onSelectSection }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.1] bg-[#262529]/85 backdrop-blur-md py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-1 flex flex-col xl:flex-row items-center justify-between gap-5">
        {/* Identity & Copyright */}
        <div className="flex items-center gap-3 text-center xl:text-left shrink-0">
          <img
            src="/images/indhuraj-il-mark.png"
            alt=""
            width={22}
            height={22}
            loading="lazy"
            className="w-5 h-5 object-contain opacity-90"
          />
          <p className="text-[12.5px] text-[#b4b0a8]">
            <span className="font-semibold text-[#f4f1ea]">{SITE_PROFILE.name}</span> © {year} ·{" "}
            {SITE_PROFILE.role}
          </p>
        </div>

        {/* Quick Section Links */}
        <nav aria-label="Footer section links" className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {PORTFOLIO_TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className="px-3 py-1.5 rounded-full text-[12px] text-[#b4b0a8] hover:text-[#dfd0a6] hover:bg-white/[0.04] transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Back to Top */}
        <button
          type="button"
          onClick={() => onSelectSection("home")}
          className="tactile-btn shrink-0 inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-[#dfd0a6]/14 border border-[#dfd0a6]/35 text-[12.5px] font-semibold text-[#dfd0a6] hover:bg-[#dfd0a6] hover:text-[#17171a] cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
