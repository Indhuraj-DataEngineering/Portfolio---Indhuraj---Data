import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  DatabaseZap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  ABOUT_PILLARS,
  SITE_PROFILE,
  type AboutPillar,
  type PortfolioTabId,
} from "../data/portfolioContent";
import { soundEngine } from "../utils/soundEngine";

const pillarIcons: Record<AboutPillar["iconKey"], LucideIcon> = {
  cleaning: DatabaseZap,
  dashboards: BarChart3,
  ml: Sparkles,
};

interface AboutSectionProps {
  onSelectSection: (sectionId: PortfolioTabId) => void;
}

export function AboutSection({ onSelectSection }: AboutSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    soundEngine.playSoftClick();
    try {
      await navigator.clipboard.writeText(SITE_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Clipboard unavailable in restricted contexts
    }
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-32 xl:scroll-mt-24 border-t border-white/[0.07] py-12 sm:py-16 lg:py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Vertical rotated museum watermark on outer right margin (desktop) */}
      <div
        className="hidden xl:block pointer-events-none select-none absolute right-2 top-1/2 -translate-y-1/2 origin-center rotate-90 text-[72px] font-bold tracking-[0.14em] text-white/[0.035] whitespace-nowrap"
        aria-hidden="true"
      >
        INDHURAJ
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Text & Pillars (matching Antique Parian About layout) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-[#dfd0a6] mb-2">
                02 / ABOUT ME
              </p>
              <h2
                id="about-heading"
                className="text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#f4f1ea]"
              >
                {SITE_PROFILE.aboutHeadline}
              </h2>
            </div>

            <p className="text-[15.5px] sm:text-[16.5px] leading-[1.75] text-[#b4b0a8] max-w-[60ch]">
              {SITE_PROFILE.aboutSummary}
            </p>

            {/* Hairline-divided capability rows */}
            <div className="pt-2 border-t border-white/[0.1] divide-y divide-white/[0.08]">
              {ABOUT_PILLARS.map((pillar) => {
                const Icon = pillarIcons[pillar.iconKey];
                return (
                  <div
                    key={pillar.title}
                    className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#dfd0a6]/12 border border-[#dfd0a6]/28 text-[#dfd0a6] flex items-center justify-center shrink-0">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-[16px] font-semibold text-[#f4f1ea]">{pillar.title}</h3>
                        <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#dfd0a6]">
                          {pillar.metricTag}
                        </span>
                      </div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#b4b0a8]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playChime();
                  onSelectSection("contact");
                }}
                className="tactile-btn inline-flex items-center gap-2 min-h-[46px] px-7 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13.5px] font-semibold hover:bg-[#e8dbb8] cursor-pointer"
              >
                <span>Write to me</span>
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTabSwitch();
                  onSelectSection("projects");
                }}
                className="tactile-btn inline-flex items-center gap-2 min-h-[46px] px-5 rounded-full bg-[#252428] border border-white/12 text-[#f4f1ea] text-[13.5px] font-medium hover:border-[#dfd0a6]/50 hover:text-[#dfd0a6] cursor-pointer"
              >
                <span>View Case Studies</span>
              </button>
            </div>
          </div>

          {/* Right Column: Asymmetric Curved Architectural Frame Portrait + Credential Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative overflow-hidden rounded-tl-[52px] rounded-bl-[52px] rounded-br-[52px] rounded-tr-[8px] border border-[#dfd0a6]/35 bg-[radial-gradient(circle_at_50%_35%,rgba(223,208,166,0.18)_0%,#3a383f_58%,#27262a_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
              <img
                src="/images/indhuraj-hero-cutout.png"
                alt="Portrait of Indhuraj L in a dark pinstripe suit"
                width={900}
                height={1125}
                loading="lazy"
                className="w-full h-auto aspect-[4/5] object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#17171a]/70 via-[#17171a]/25 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Verified Profile Pass with QR & Quick Copy */}
            <div className="rounded-2xl border border-white/[0.11] bg-[#343238]/85 backdrop-blur-sm p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#dfd0a6]">
                  Verified Profile Pass
                </p>
                <p className="text-[13.5px] font-semibold text-[#f4f1ea] mt-0.5 truncate">
                  {SITE_PROFILE.email}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="tactile-btn inline-flex items-center gap-1.5 min-h-[36px] px-3.5 rounded-full bg-white/[0.06] hover:bg-[#dfd0a6]/20 border border-white/10 hover:border-[#dfd0a6]/40 text-[12px] font-medium text-[#f4f1ea] cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={13} className="text-[#34d399]" aria-hidden="true" />
                        <span>Email copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden="true" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                  <a
                    href={SITE_PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[36px] px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-[12px] text-[#b4b0a8] hover:text-[#dfd0a6] hover:border-[#dfd0a6]/40"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <a
                href={SITE_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open LinkedIn profile"
                className="shrink-0 p-1.5 rounded-xl bg-[#fffaf4] border border-[#dfd0a6]/40 hover:scale-105 transition-transform"
              >
                <img
                  src="/images/indhuraj-profile-qr.svg"
                  alt="QR code linking to Indhuraj L profile"
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-16 h-16 block"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
