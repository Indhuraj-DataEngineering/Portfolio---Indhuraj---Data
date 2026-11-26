import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { contactSchema, type ContactValues } from "../contactValidation";
import { SITE_PROFILE } from "../data/portfolioContent";
import { soundEngine } from "../utils/soundEngine";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "unavailable"; message: string; mailtoHref: string }
  | { status: "error"; message: string };

const SERVICE_OPTIONS = [
  "Entry-Level Data Analyst Role",
  "Power BI & DAX Dashboarding",
  "SQL & Python Data Cleaning / EDA",
  "Excel Reporting & Automation",
  "Applied ML / Collaboration",
];

function buildMailtoHref(values: ContactValues): string {
  const subject = encodeURIComponent(
    values.service ? `Portfolio Enquiry: ${values.service}` : `Portfolio Enquiry from ${values.name}`
  );
  const body = encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nTopic: ${values.service || "General"}\n\n${values.message}`
  );
  return `mailto:${SITE_PROFILE.email}?subject=${subject}&body=${body}`;
}

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    soundEngine.playSoftClick();

    if (values.website.trim().length > 0) {
      setSubmitState({
        status: "error",
        message: "Submission could not be processed. Please contact directly by email.",
      });
      return;
    }

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
    if (!endpoint) {
      soundEngine.playChime();
      setSubmitState({
        status: "unavailable",
        message:
          "Direct form delivery is not configured on this static deployment yet. Your message was validated and can be sent directly via your email client.",
        mailtoHref: buildMailtoHref(values),
      });
      return;
    }

    setSubmitState({ status: "submitting" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          service: values.service,
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      soundEngine.playChime();
      setSubmitState({
        status: "success",
        message: "Thank you — your message was delivered. I will respond promptly.",
      });
      reset();
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Unable to reach the contact service right now. Please send an email directly to indhurajlakshmanan@gmail.com.",
      });
    }
  };

  return (
    <section
      className="relative py-10 sm:py-16 lg:py-20 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-14 xl:px-20 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.16em] text-[#dfd0a6]">
              08 / LET&apos;S CONNECT
            </p>
            <h2
              id="contact-heading"
              className="text-[clamp(2.1rem,4vw,3.3rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#f4f1ea]"
            >
              Let&apos;s Build Something{" "}
              <span className="text-[#dfd0a6]">Meaningful</span>
            </h2>
            <p className="text-[15.5px] sm:text-[16.5px] leading-[1.65] text-[#b4b0a8] max-w-[46ch]">
              Seeking entry-level Data Analyst, BI Reporting, and Junior Data Science opportunities.
              Have a role, dataset challenge, or collaboration in mind? Let&apos;s connect.
            </p>

            <div className="pt-2 space-y-3 text-[14px] text-[#e2ded6]">
              <div className="flex items-center gap-3">
                <MapPin size={17} className="text-[#dfd0a6] shrink-0" aria-hidden="true" />
                <span>{SITE_PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-[#dfd0a6] shrink-0" aria-hidden="true" />
                <a href={SITE_PROFILE.phoneHref} className="hover:text-[#dfd0a6] transition-colors">
                  {SITE_PROFILE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-[#dfd0a6] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_PROFILE.email}`}
                  className="hover:text-[#dfd0a6] transition-colors break-all"
                >
                  {SITE_PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Validated Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-3xl bg-[#343238]/88 backdrop-blur-sm border border-[#dfd0a6]/30 p-6 sm:p-8 shadow-[0_22px_54px_rgba(0,0,0,0.38)] space-y-5"
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-[13.5px] font-medium text-[#f4f1ea]">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className="min-h-[46px] px-4 rounded-xl bg-[#1b1b1e] border border-white/12 text-[14.5px] text-[#f4f1ea] placeholder:text-[#87837c] focus:border-[#dfd0a6] focus:outline-none"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p role="alert" className="text-[12.5px] text-[#f5b09a]">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-[13.5px] font-medium text-[#f4f1ea]">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className="min-h-[46px] px-4 rounded-xl bg-[#1b1b1e] border border-white/12 text-[14.5px] text-[#f4f1ea] placeholder:text-[#87837c] focus:border-[#dfd0a6] focus:outline-none"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p role="alert" className="text-[12.5px] text-[#f5b09a]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-service" className="text-[13.5px] font-medium text-[#f4f1ea]">
                  Enquiry Focus <span className="text-[#87837c] font-normal">(optional)</span>
                </label>
                <select
                  id="contact-service"
                  aria-invalid={Boolean(errors.service)}
                  className="min-h-[46px] px-4 rounded-xl bg-[#1b1b1e] border border-white/12 text-[14.5px] text-[#f4f1ea] focus:border-[#dfd0a6] focus:outline-none"
                  {...register("service")}
                >
                  <option value="">Select a topic...</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p role="alert" className="text-[12.5px] text-[#f5b09a]">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[13.5px] font-medium text-[#f4f1ea]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Share details about the opportunity, analytics scope, or timeline..."
                  aria-invalid={Boolean(errors.message)}
                  className="p-4 rounded-xl bg-[#1b1b1e] border border-white/12 text-[14.5px] text-[#f4f1ea] placeholder:text-[#87837c] focus:border-[#dfd0a6] focus:outline-none resize-y"
                  {...register("message")}
                />
                {errors.message && (
                  <p role="alert" className="text-[12.5px] text-[#f5b09a]">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitState.status === "submitting"}
                className="tactile-btn w-full min-h-[48px] px-6 rounded-full bg-[#dfd0a6] text-[#17171a] text-[14.5px] font-semibold hover:bg-[#eae0c2] disabled:opacity-60 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} strokeWidth={1.9} aria-hidden="true" />
                <span>
                  {submitState.status === "submitting" ? "Sending Message..." : "Send Message"}
                </span>
              </button>

              {submitState.status === "success" && (
                <div
                  role="status"
                  className="p-4 rounded-2xl bg-[#34d399]/10 border border-[#34d399]/30 text-[13.5px] text-[#d1fae5] flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-[#34d399] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{submitState.message}</span>
                </div>
              )}

              {submitState.status === "unavailable" && (
                <div
                  role="status"
                  className="p-4 rounded-2xl bg-[#dfd0a6]/10 border border-[#dfd0a6]/35 text-[13.5px] text-[#f4f1ea] space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle size={18} className="text-[#dfd0a6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{submitState.message}</span>
                  </div>
                  <a
                    href={submitState.mailtoHref}
                    className="tactile-btn inline-flex items-center gap-2 min-h-[42px] px-5 rounded-full bg-[#dfd0a6] text-[#17171a] text-[13px] font-semibold hover:bg-[#eae0c2]"
                  >
                    <span>Send via Email Client</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              )}

              {submitState.status === "error" && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-400/35 text-[13.5px] text-red-200 flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{submitState.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom 3 Direct Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={`mailto:${SITE_PROFILE.email}`}
            className="group p-5 rounded-2xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.1] hover:border-[#dfd0a6]/45 transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#dfd0a6]/12 text-[#dfd0a6] flex items-center justify-center shrink-0 group-hover:bg-[#dfd0a6] group-hover:text-[#17171a] transition-colors">
                <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#f4f1ea]">Email</p>
                <p className="text-[12.5px] text-[#b4b0a8] truncate">{SITE_PROFILE.email}</p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-[#b4b0a8] group-hover:text-[#dfd0a6] shrink-0" aria-hidden="true" />
          </a>

          <a
            href={SITE_PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.1] hover:border-[#dfd0a6]/45 transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#dfd0a6]/12 text-[#dfd0a6] flex items-center justify-center shrink-0 group-hover:bg-[#dfd0a6] group-hover:text-[#17171a] transition-colors">
                <Linkedin size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#f4f1ea]">LinkedIn</p>
                <p className="text-[12.5px] text-[#b4b0a8] truncate">/{SITE_PROFILE.linkedinHandle}</p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-[#b4b0a8] group-hover:text-[#dfd0a6] shrink-0" aria-hidden="true" />
          </a>

          <a
            href={SITE_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-[#343238]/85 backdrop-blur-sm border border-white/[0.1] hover:border-[#dfd0a6]/45 transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#dfd0a6]/12 text-[#dfd0a6] flex items-center justify-center shrink-0 group-hover:bg-[#dfd0a6] group-hover:text-[#17171a] transition-colors">
                <Github size={20} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#f4f1ea]">GitHub</p>
                <p className="text-[12.5px] text-[#b4b0a8] truncate">{SITE_PROFILE.githubHandle}</p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-[#b4b0a8] group-hover:text-[#dfd0a6] shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
