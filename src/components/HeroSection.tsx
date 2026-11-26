import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  FileDown,
  FileSpreadsheet,
  Github,
  Linkedin,
  Mail,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import {
  HERO_CAPABILITIES,
  PORTFOLIO_TABS,
  SITE_PROFILE,
  type CapabilityChip,
  type PortfolioTabId,
} from "../data/portfolioContent";
import { soundEngine } from "../utils/soundEngine";

const iconMap: Record<CapabilityChip["iconKey"], LucideIcon> = {
  python: Code2,
  sql: Database,
  powerbi: BarChart3,
  excel: FileSpreadsheet,
  stats: Sigma,
  ml: BrainCircuit,
};

interface HeroSectionProps {
  activeTab: PortfolioTabId;
  onSelectTab: (tab: PortfolioTabId) => void;
}

export function HeroSection({ activeTab, onSelectTab }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[calc(100dvh-132px)] flex flex-col justify-between py-8 sm:py-12 lg:py-14 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Left-edge vertical dot navigation indicator (desktop) */}
      <div
        className="hidden xl:flex flex-col items-center gap-3 absolute left-6 top-1/2 -translate-y-1/2 z-10"
        aria-label="Quick tab progress dots"
      >
        {PORTFOLIO_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              title={tab.label}
              aria-label={`Go to ${tab.label} section`}
              className={`rounded-full transition-all cursor-pointer ${
                isActive
                  ? "w-2.5 h-2.5 bg-[#dfd0a6] shadow-[0_0_10px_rgba(223,207,164,0.65)]"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60"
              }`}
            />
          );
        })}
      </div>

      {/* Main Split Grid */}
      <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-14 xl:px-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
        {/* Left: Editorial Copy & Champagne Pill CTA */}
        <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#252428] border border-[#dfd0a6]/30 text-[12px] font-medium text-[#dfd0a6]">
            <span className="w-2 h-2 rounded-full bg-[#dfd0a6]" aria-hidden="true" />
            <span>{SITE_PROFILE.availability}</span>
          </div>

          <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-[#b4b0a8]">
            {SITE_PROFILE.name} · {SITE_PROFILE.role}
          </p>

          <h1
            id="hero-heading"
            className="text-[clamp(2.15rem,4.4vw,3.95rem)] font-bold tracking-[-0.025em] leading-[1.08] text-[#f4f1ea] max-w-[16ch]"
          >
            {SITE_PROFILE.heroHeadline}
          </h1>

          <p className="text-[15px] sm:text-[16.5px] leading-[1.7] text-[#b4b0a8] max-w-[50ch]">
            {SITE_PROFILE.heroSummary}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                soundEngine.playChime();
                onSelectTab("projects");
              }}
              className="tactile-btn inline-flex items-center gap-2 min-h-[46px] px-7 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13.5px] font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:bg-[#e8dbb8] cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>

            <a
              href={SITE_PROFILE.resumeUrl}
              download="Indhuraj-L-Resume.pdf"
              onClick={() => soundEngine.playChime()}
              className="tactile-btn inline-flex items-center gap-2 min-h-[46px] px-5 rounded-full bg-[#252428] border border-white/15 text-[#f4f1ea] text-[13.5px] font-medium hover:border-[#dfd0a6]/60 hover:text-[#dfd0a6]"
            >
              <FileDown size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Left-Bottom Circular Social Anchors (matching Antique Parian reference) */}
          <div className="pt-4 flex items-center gap-3">
            <a
              href={SITE_PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-10 h-10 rounded-full bg-[#343238]/85 border border-white/12 text-[#b4b0a8] hover:text-[#dfd0a6] hover:border-[#dfd0a6]/50 flex items-center justify-center transition-colors"
            >
              <Github size={17} strokeWidth={1.75} />
            </a>
            <a
              href={SITE_PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-10 h-10 rounded-full bg-[#343238]/85 border border-white/12 text-[#b4b0a8] hover:text-[#dfd0a6] hover:border-[#dfd0a6]/50 flex items-center justify-center transition-colors"
            >
              <Linkedin size={17} strokeWidth={1.75} />
            </a>
            <a
              href={`mailto:${SITE_PROFILE.email}`}
              aria-label="Send email"
              className="w-10 h-10 rounded-full bg-[#343238]/85 border border-white/12 text-[#b4b0a8] hover:text-[#dfd0a6] hover:border-[#dfd0a6]/50 flex items-center justify-center transition-colors"
            >
              <Mail size={17} strokeWidth={1.75} />
            </a>
            <span className="ml-2 font-mono-tech text-[11px] text-[#87837c]">
              Salem · Chennai, India
            </span>
          </div>
        </div>

        {/* Right: Circular Orbital Frame Portrait */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-[270px] h-[270px] sm:w-[360px] sm:h-[360px] lg:w-[430px] lg:h-[430px] flex items-center justify-center">
            {/* Outer delicate orbital circle with star nodes */}
            <div
              className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-full border border-[#dfd0a6]/20"
              aria-hidden="true"
            >
              <span className="absolute top-6 right-10 w-2 h-2 rounded-full bg-[#dfd0a6] shadow-[0_0_10px_#dfd0a6]" />
              <span className="absolute bottom-10 left-6 w-1.5 h-1.5 rounded-full bg-[#f4f1ea]/80" />
            </div>

            {/* Secondary subtle ring */}
            <div
              className="pointer-events-none absolute inset-2 rounded-full border border-white/[0.08]"
              aria-hidden="true"
            />

            {/* Circular portrait container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-[#dfd0a6]/40 bg-[radial-gradient(circle_at_50%_35%,rgba(223,208,166,0.22)_0%,#3a383f_58%,#28272b_100%)] shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
              <img
                src="/images/indhuraj-hero-cutout.png"
                alt="Portrait of Indhuraj L, Data Analyst"
                width={900}
                height={1125}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-top scale-[1.04] pt-2"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17171a]/65 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 6-Item Capability Strip */}
      <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-14 xl:px-20 mt-10">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-6 border-t border-white/[0.08]"
          aria-label="Core analytical capabilities"
        >
          {HERO_CAPABILITIES.map((cap) => {
            const Icon = iconMap[cap.iconKey];
            return (
              <div
                key={cap.label}
                className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#343238]/80 backdrop-blur-sm border border-white/[0.1] hover:border-[#dfd0a6]/45 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#dfd0a6]/12 text-[#dfd0a6] flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#f4f1ea] truncate">{cap.label}</p>
                  <p className="text-[11px] text-[#b4b0a8] truncate">{cap.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
