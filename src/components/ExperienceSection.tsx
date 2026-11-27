import { useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Eye,
  FileDown,
  FileText,
  GraduationCap,
} from "lucide-react";
import {
  BOOK_PUBLICATION,
  CERTIFICATIONS_LIST,
  EDUCATION_ITEMS,
  EXPERIENCE_ITEMS,
  SITE_PROFILE,
  SOFT_SKILLS,
} from "../data/portfolioContent";
import { soundEngine } from "../utils/soundEngine";
import { DocumentViewerDialog, type DocumentPreviewTarget } from "./DocumentViewerDialog";

type ExperienceSubTab = "timeline" | "credentials";

export function ExperienceSection() {
  const [subTab, setSubTab] = useState<ExperienceSubTab>("timeline");
  const [activeDoc, setActiveDoc] = useState<DocumentPreviewTarget | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openDocument = (doc: DocumentPreviewTarget, btn: HTMLButtonElement) => {
    soundEngine.playChime();
    triggerRef.current = btn;
    setActiveDoc(doc);
  };

  const closeDocument = () => {
    soundEngine.playSoftClick();
    setActiveDoc(null);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <section
      id="experience"
      className="relative scroll-mt-32 lg:scroll-mt-24 border-t border-white/[0.07] py-12 sm:py-16 lg:py-24 overflow-hidden"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-14 xl:px-20 space-y-10">
        {/* Heading + Sub-Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-[#dfd0a6] mb-2">
              07 / EXPERIENCE &amp; CREDENTIALS
            </p>
            <h2
              id="experience-heading"
              className="text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-[-0.025em] leading-[1.1] text-[#f4f1ea]"
            >
              Experience, Education &amp; Resume
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-[#b4b0a8] max-w-[58ch]">
              Verified analytics training, sensor-data internship engineering, academic honors, and
              published works.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Experience subsections"
            className="inline-flex flex-wrap gap-2 p-1.5 rounded-full bg-[#252428] border border-white/[0.08] self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={subTab === "timeline"}
              onClick={() => {
                soundEngine.playSoftClick();
                setSubTab("timeline");
              }}
              className={`min-h-[40px] px-4 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                subTab === "timeline"
                  ? "bg-[#dfd0a6] text-[#17171a] font-semibold"
                  : "text-[#b4b0a8] hover:text-[#f4f1ea]"
              }`}
            >
              Experience &amp; Education
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={subTab === "credentials"}
              onClick={() => {
                soundEngine.playSoftClick();
                setSubTab("credentials");
              }}
              className={`min-h-[40px] px-4 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                subTab === "credentials"
                  ? "bg-[#dfd0a6] text-[#17171a] font-semibold"
                  : "text-[#b4b0a8] hover:text-[#f4f1ea]"
              }`}
            >
              Certifications &amp; Book
            </button>
          </div>
        </div>

        {/* Two-Column Content + Executive Resume Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 cols */}
          <div className="lg:col-span-7 space-y-10">
            {subTab === "timeline" ? (
              <>
                <div>
                  <h3 className="flex items-center gap-2.5 text-[18px] font-bold text-[#f4f1ea] mb-5">
                    <Briefcase size={18} className="text-[#dfd0a6]" aria-hidden="true" />
                    <span>Professional &amp; Training Experience</span>
                  </h3>

                  <div className="relative pl-6 border-l border-[#dfd0a6]/30 space-y-6">
                    {EXPERIENCE_ITEMS.map((item) => (
                      <article
                        key={`${item.role}-${item.organization}`}
                        className="relative rounded-2xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.1] hover:border-[#dfd0a6]/45 p-5 sm:p-6 transition-colors"
                      >
                        <span
                          className="absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-[#1d1d20] border-2 border-[#dfd0a6]"
                          aria-hidden="true"
                        />
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono-tech text-[11px] uppercase tracking-[0.12em] text-[#dfd0a6]">
                            {item.period}
                          </span>
                          <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#b4b0a8]">
                            {item.status}
                          </span>
                        </div>

                        <h4 className="mt-2 text-[18px] font-bold text-[#f4f1ea]">{item.role}</h4>
                        <p className="text-[14px] font-medium text-[#e2ded6]">
                          {item.organization} · {item.location}
                        </p>

                        <ul className="mt-4 space-y-2 text-[14px] leading-[1.6] text-[#b4b0a8]">
                          {item.highlights.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#dfd0a6] mt-2 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Education Hairline List */}
                <div>
                  <h3 className="flex items-center gap-2.5 text-[18px] font-bold text-[#f4f1ea] mb-4">
                    <GraduationCap size={19} className="text-[#dfd0a6]" aria-hidden="true" />
                    <span>Academic Background</span>
                  </h3>

                  <div className="border-t border-white/[0.1] divide-y divide-white/[0.08]">
                    {EDUCATION_ITEMS.map((edu) => (
                      <div
                        key={edu.degree}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-[16px] font-semibold text-[#f4f1ea]">{edu.degree}</h4>
                          <p className="text-[14px] text-[#b4b0a8] mt-0.5">{edu.institution}</p>
                          {edu.detail && (
                            <p className="font-mono-tech text-[12px] text-[#dfd0a6] mt-1">
                              {edu.detail}
                            </p>
                          )}
                        </div>
                        <div className="sm:text-right shrink-0">
                          <span className="font-mono-tech text-[14px] font-semibold text-[#f4f1ea] block">
                            {edu.score}
                          </span>
                          <span className="font-mono-tech text-[12px] text-[#b4b0a8]">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="flex items-center gap-2.5 text-[18px] font-bold text-[#f4f1ea] mb-5">
                    <Award size={19} className="text-[#dfd0a6]" aria-hidden="true" />
                    <span>Certifications, Training &amp; Honors</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {CERTIFICATIONS_LIST.map((cert) => (
                      <div
                        key={cert.title}
                        className="p-4 rounded-2xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.1] hover:border-[#dfd0a6]/45 transition-colors flex flex-col justify-between gap-2"
                      >
                        <div>
                          <span className="font-mono-tech text-[10px] uppercase tracking-[0.12em] text-[#dfd0a6]">
                            {cert.status}
                          </span>
                          <h4 className="text-[14.5px] font-semibold text-[#f4f1ea] leading-snug mt-1">
                            {cert.title}
                          </h4>
                          <p className="text-[12.5px] text-[#e2ded6] mt-1">{cert.issuer}</p>
                        </div>
                        <p className="text-[12px] text-[#b4b0a8] leading-relaxed">{cert.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published Tamil Book */}
                <div>
                  <h3 className="flex items-center gap-2.5 text-[18px] font-bold text-[#f4f1ea] mb-4">
                    <BookOpen size={19} className="text-[#dfd0a6]" aria-hidden="true" />
                    <span>Published Book</span>
                  </h3>

                  <article className="rounded-3xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.1] p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-tech text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-[#dfd0a6]/14 border border-[#dfd0a6]/30 text-[#dfd0a6]">
                        Author &amp; Co-Editor
                      </span>
                      <span className="font-mono-tech text-[11px] text-[#b4b0a8]">
                        {BOOK_PUBLICATION.isbn}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-[20px] font-bold text-[#f4f1ea]">
                        {BOOK_PUBLICATION.tamilTitle}
                      </h4>
                      <p className="text-[13px] font-medium text-[#dfd0a6] mt-0.5">
                        {BOOK_PUBLICATION.transliteration} · {BOOK_PUBLICATION.subtitle}
                      </p>
                      <p className="text-[12.5px] text-[#b4b0a8] mt-1.5">
                        {BOOK_PUBLICATION.authors}
                      </p>
                      <p className="font-mono-tech text-[11.5px] text-[#b4b0a8] mt-0.5">
                        {BOOK_PUBLICATION.publisher}
                      </p>
                    </div>

                    <p className="text-[13.5px] leading-[1.65] text-[#b4b0a8]">
                      {BOOK_PUBLICATION.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={(e) =>
                          openDocument(
                            {
                              title: `${BOOK_PUBLICATION.tamilTitle} (${BOOK_PUBLICATION.transliteration})`,
                              subtitle: `${BOOK_PUBLICATION.authors} · ${BOOK_PUBLICATION.isbn}`,
                              url: BOOK_PUBLICATION.pdfUrl,
                              downloadName: "Tamil-Poetry-Collection.pdf",
                            },
                            e.currentTarget
                          )
                        }
                        className="tactile-btn inline-flex items-center gap-1.5 min-h-[42px] px-5 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13px] font-semibold hover:bg-[#eae0c2] cursor-pointer"
                      >
                        <Eye size={15} aria-hidden="true" />
                        <span>Read Book PDF</span>
                      </button>
                      <a
                        href={BOOK_PUBLICATION.pdfUrl}
                        download="Tamil-Poetry-Collection.pdf"
                        onClick={() => soundEngine.playChime()}
                        className="tactile-btn inline-flex items-center gap-1.5 min-h-[42px] px-4 rounded-full bg-white/[0.04] border border-white/12 text-[#f4f1ea] text-[13px] font-medium hover:border-[#dfd0a6]/50 hover:text-[#dfd0a6]"
                      >
                        <FileDown size={15} aria-hidden="true" />
                        <span>Download</span>
                      </a>
                    </div>
                  </article>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 cols: Executive Resume Preview & Download */}
          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-[#343238]/88 backdrop-blur-sm border border-[#dfd0a6]/35 p-6 sm:p-7 shadow-[0_22px_54px_rgba(0,0,0,0.38)] space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#dfd0a6]/12 border border-[#dfd0a6]/30 text-[#dfd0a6] flex items-center justify-center shrink-0">
                    <FileText size={21} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#f4f1ea]">{SITE_PROFILE.name}</h3>
                    <p className="text-[13px] text-[#dfd0a6]">{SITE_PROFILE.role} · Resume PDF</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] px-2.5 py-1 rounded-full bg-[#dfd0a6]/12 border border-[#dfd0a6]/30 text-[#dfd0a6]">
                  2-Page PDF
                </span>
              </div>

              <div className="space-y-4 text-[13.5px]">
                <div>
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.14em] text-[#b4b0a8] mb-1">
                    Core Analytical Stack
                  </p>
                  <p className="text-[#f4f1ea] leading-relaxed">
                    Python (Pandas, NumPy, Matplotlib, Seaborn) · SQL &amp; MySQL (Joins, CTEs, Window
                    Functions) · Power BI &amp; DAX · Microsoft Excel (PivotTables) · Scikit-learn ·
                    Streamlit
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#1d1d20] border border-white/[0.07]">
                    <p className="font-mono-tech text-[10px] uppercase text-[#b4b0a8]">Degree</p>
                    <p className="text-[13.5px] font-semibold text-[#f4f1ea] mt-0.5">
                      B.Tech Agri. Eng. (85%)
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1d1d20] border border-white/[0.07]">
                    <p className="font-mono-tech text-[10px] uppercase text-[#b4b0a8]">Research</p>
                    <p className="text-[13.5px] font-semibold text-[#f4f1ea] mt-0.5">
                      IRJAEH Published
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.14em] text-[#b4b0a8] mb-1">
                    Languages
                  </p>
                  <p className="text-[#e2ded6]">
                    Tamil (Native / Bilingual) · English (Professional Working)
                  </p>
                </div>

                <div>
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.14em] text-[#b4b0a8] mb-1.5">
                    Soft Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SOFT_SKILLS.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11.5px] text-[#e2ded6]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={SITE_PROFILE.resumeUrl}
                  download="Indhuraj-L-Resume.pdf"
                  onClick={() => soundEngine.playChime()}
                  className="tactile-btn flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] px-5 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13.5px] font-semibold hover:bg-[#eae0c2]"
                >
                  <FileDown size={16} strokeWidth={1.9} aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
                <button
                  type="button"
                  onClick={(e) =>
                    openDocument(
                      {
                        title: "Indhuraj L — Official Resume",
                        subtitle: "Data Analyst · Python, SQL, Power BI, Excel & Applied ML",
                        url: SITE_PROFILE.resumeUrl,
                        downloadName: "Indhuraj-L-Resume.pdf",
                      },
                      e.currentTarget
                    )
                  }
                  className="tactile-btn inline-flex items-center justify-center gap-2 min-h-[46px] px-5 rounded-full bg-white/[0.05] border border-white/15 text-[#f4f1ea] text-[13.5px] font-medium hover:border-[#dfd0a6]/50 hover:text-[#dfd0a6] cursor-pointer"
                >
                  <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <DocumentViewerDialog document={activeDoc} onClose={closeDocument} />
    </section>
  );
}
