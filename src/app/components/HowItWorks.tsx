'use client';

import { useState, useEffect, useRef } from "react";

import { Link } from "./routerShim";
import { ClipboardList, Send, ShieldCheck, TrendingUp, ThumbsUp, ArrowRight, ChevronRight } from "lucide-react";

/* ── Steps data ─────────────────────────────────────────────── */
const steps = [
  {
    number: "01", icon: ClipboardList, color: "blue",
    title: "Credit Report Analysis",
    desc: "Our certified counsellors review your credit report in detail, categorise all disputable items — wrong records, settled accounts marked open, missed payments that were actually paid — and build a prioritised repair strategy.",
    tag: "Expert Review",
    cibil: "Matches CIBIL Step 1: Identify inaccurate information in your report",
  },
  {
    number: "02", icon: Send, color: "indigo",
    title: "File Bureau Disputes",
    desc: "We file formal disputes via official CIBIL, Equifax, Experian and CRIF portals simultaneously, and send lender letters as required by RBI guidelines — covering all four bureaus at once.",
    tag: "Official Disputes",
    cibil: "Matches CIBIL Step 2: Bureau notifies the lender — 30-day window begins",
  },
  {
    number: "03", icon: ShieldCheck, color: "purple",
    title: "Bureau Investigates with Lenders",
    desc: "The credit bureau contacts the lender to verify or correct disputed data within the RBI-mandated 30-day window. We track every open case and escalate delays on your behalf.",
    tag: "30-Day SLA",
    cibil: "Matches CIBIL Step 3: Lender updates the bureau with correct information",
  },
  {
    number: "04", icon: TrendingUp, color: "green",
    title: "Credit Score Improves",
    desc: "Once verified errors are corrected or removed, your report updates across all bureaus. Most clients see 50–150 point improvement within 30–90 days of dispute resolution.",
    tag: "+50–150 pts",
    cibil: "Matches CIBIL Step 4: Dispute resolved — updated report issued within 45 days",
  },
  {
    number: "05", icon: ThumbsUp, color: "orange",
    title: "Get Your Loan Approved",
    desc: "With your improved CIBIL score we match you to the right lender for home, business or personal loans — at significantly lower interest rates than you would have qualified for before.",
    tag: "Loan Ready",
    cibil: "Result: Higher score → better loan terms, lower interest rates",
  },
];

const palette: Record<string, { pill: string; activePill: string; ring: string; icon: string; tag: string; bar: string; num: string }> = {
  blue:   { pill: "border-blue-200 text-blue-700 hover:bg-blue-50",    activePill: "bg-teal-600 text-white border-teal-600",    ring: "ring-blue-200",   icon: "text-blue-500",   tag: "bg-teal-100 text-teal-700",    bar: "bg-blue-600",   num: "bg-blue-600"   },
  indigo: { pill: "border-indigo-200 text-indigo-700 hover:bg-indigo-50", activePill: "bg-indigo-600 text-white border-indigo-600", ring: "ring-indigo-200", icon: "text-indigo-500", tag: "bg-indigo-100 text-indigo-700", bar: "bg-indigo-600", num: "bg-indigo-600" },
  purple: { pill: "border-purple-200 text-purple-700 hover:bg-purple-50", activePill: "bg-purple-600 text-white border-purple-600", ring: "ring-purple-200", icon: "text-purple-500", tag: "bg-purple-100 text-purple-700", bar: "bg-purple-600", num: "bg-purple-600" },
  green:  { pill: "border-green-200 text-green-700 hover:bg-green-50",  activePill: "bg-green-600 text-white border-green-600",  ring: "ring-green-200",  icon: "text-green-500",  tag: "bg-green-100 text-green-700",  bar: "bg-green-600",  num: "bg-green-600"  },
  orange: { pill: "border-orange-200 text-orange-700 hover:bg-orange-50", activePill: "bg-orange-500 text-white border-orange-500", ring: "ring-orange-200", icon: "text-orange-500", tag: "bg-orange-100 text-orange-700", bar: "bg-orange-500", num: "bg-orange-500" },
};

/* ── HowTo JSON-LD schema — crawlable by Googlebot ─────────── */
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Credit Consultant's CIBIL Dispute & Repair Process Works",
  "description": "A step-by-step guide to how Credit Consultant repairs your CIBIL score using the official bureau dispute methodology as per RBI guidelines.",
  "totalTime": "P90D",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "INR", "value": "0", "name": "Free consultation" },
  "step": steps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.title,
    "text": s.desc,
    "url": `https://creditconsultant.in/services#step-${s.number}`,
  })),
};

interface Props {
  title?: string;
  subtitle?: string;
  cityName?: string;
  showCTA?: boolean;
  bg?: "white" | "gray";
}

export function HowItWorks({
  title = "How It Works",
  subtitle = "Our CIBIL dispute process follows RBI guidelines exactly — the official methodology applied by our certified experts on your behalf.",
  cityName,
  showCTA = true,
  bg = "white",
}: Props) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-advance every 4 s, pause on hover */
  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 4000);
  };
  const stopAuto = () => { if (intervalRef.current) clearInterval(intervalRef.current); };

  useEffect(() => { startAuto(); return stopAuto; }, []);

  const goTo = (i: number) => {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 180);
    stopAuto(); startAuto(); // reset timer on manual click
  };

  const s = steps[active];
  const p = palette[s.color];
  const Icon = s.icon;

  return (
    <section
      className={`py-12 ${bg === "gray" ? "bg-gray-50" : "bg-white"}`}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      aria-label="How Credit Consultant's credit repair process works"
    >
      {/* Inject HowTo schema — all content stays in DOM for crawler */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="inline-block bg-teal-100 text-teal-700 text-[11px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-widest">
              CIBIL Dispute Process
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
              {title}{cityName ? ` in ${cityName}` : ""}
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-lg">{subtitle}</p>
          </div>
          {showCTA && (
            <Link to="/contact" className="flex-shrink-0">
              <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                Free Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Accordion View (< lg) */}
        <div className="lg:hidden space-y-3">
          {steps.map((step, i) => {
            const pp = palette[step.color];
            const StepIcon = step.icon;
            const isActive = i === active;
            return (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-200">
                <button
                  id={`step-mobile-${step.number}`}
                  onClick={() => goTo(i)}
                  aria-expanded={isActive}
                  className={`w-full flex items-center justify-between gap-3 p-4 text-left transition-all ${
                    isActive ? `${pp.activePill} shadow-md` : "bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {step.number}
                    </span>
                    <StepIcon className={`w-5 h-5 ${isActive ? "text-white" : pp.icon}`} />
                    <span className="font-bold text-sm leading-tight">{step.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-90 text-white" : "text-slate-400"}`} />
                </button>

                {/* Expanded Content Box on Mobile */}
                {isActive && (
                  <div
                    className="p-5 border-t border-slate-100 transition-all duration-300"
                    style={{
                      background: step.color === "blue" ? "#eff6ff" : step.color === "indigo" ? "#eef2ff" : step.color === "purple" ? "#faf5ff" : step.color === "green" ? "#f0fdf4" : "#fff7ed",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${pp.tag}`}>{step.tag}</span>
                      <span className={`text-xs font-medium ${pp.icon}`}>Step {i + 1} of {steps.length}</span>
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed mb-3 font-medium">{step.desc}</p>
                    <p className="text-xs text-slate-500 italic border-l-2 border-slate-300 pl-3 mb-4">{step.cibil}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <button
                        onClick={(e) => { e.stopPropagation(); goTo(Math.max(0, i - 1)); }}
                        disabled={i === 0}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); goTo(Math.min(steps.length - 1, i + 1)); }}
                        disabled={i === steps.length - 1}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop View (>= lg) */}
        <div className="hidden lg:grid grid-cols-5 gap-4">

          {/* Left — step list */}
          <ol className="col-span-2 flex flex-col gap-2.5" itemScope itemType="https://schema.org/HowTo">
            <meta itemProp="name" content="How Credit Consultant's CIBIL Dispute Process Works" />
            {steps.map((step, i) => {
              const pp = palette[step.color];
              const StepIcon = step.icon;
              const isActive = i === active;
              return (
                <li key={i} itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                  <meta itemProp="position" content={String(i + 1)} />
                  <span itemProp="name" className="sr-only">{step.title}</span>
                  <span itemProp="text" className="sr-only">{step.desc}</span>

                  <button
                    id={`step-${step.number}`}
                    onClick={() => goTo(i)}
                    aria-expanded={isActive}
                    aria-controls={`step-detail-${i}`}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? `${pp.activePill} shadow-md ring-2 ${pp.ring} ring-offset-1`
                        : `bg-white ${pp.pill} border`
                    }`}
                  >
                    <span className={`text-xs font-black flex-shrink-0 ${isActive ? "text-white/70" : "text-slate-400"}`}>
                      {step.number}
                    </span>
                    <StepIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : pp.icon}`} />
                    <span className={`text-xs font-semibold leading-tight ${isActive ? "text-white" : ""}`}>
                      {step.title}
                    </span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-white/80" />}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Right — active detail panel */}
          <div className="col-span-3">
            <div id={`step-detail-${active}`}
              className={`rounded-2xl border-2 p-6 h-full transition-all duration-300 ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}
              style={{
                borderColor: s.color === "blue" ? "#bfdbfe" : s.color === "indigo" ? "#c7d2fe" : s.color === "purple" ? "#e9d5ff" : s.color === "green" ? "#bbf7d0" : "#fed7aa",
                background: s.color === "blue" ? "#eff6ff" : s.color === "indigo" ? "#eef2ff" : s.color === "purple" ? "#faf5ff" : s.color === "green" ? "#f0fdf4" : "#fff7ed",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0 ${p.num}`}>
                  {s.number}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${p.tag}`}>{s.tag}</span>
                  </div>
                  <p className={`text-xs font-medium ${p.icon}`}>
                    Step {active + 1} of {steps.length}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-4 font-medium">{s.desc}</p>
              <p className="text-xs text-slate-500 italic border-l-2 border-slate-300 pl-3 mb-5">{s.cibil}</p>

              {/* Nav controls */}
              <div className="flex items-center justify-between">
                <button onClick={() => goTo(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-white/60 transition-all">
                  ← Prev
                </button>

                <div className="flex gap-1.5 items-center">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={`Go to step ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === active ? `w-5 h-2 ${p.bar}` : "w-2 h-2 bg-slate-300 hover:bg-slate-400"}`}
                    />
                  ))}
                </div>

                <button onClick={() => goTo(Math.min(steps.length - 1, active + 1))}
                  disabled={active === steps.length - 1}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-white/60 transition-all">
                  Next →
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2.5 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${p.bar}`}
                style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* All steps text — hidden visually but fully crawlable by Google */}
        <div className="sr-only" aria-hidden="false">
          <h3>Complete Process: {title}</h3>
          <ol>
            {steps.map((step) => (
              <li key={step.number}>
                <strong>Step {step.number}: {step.title}</strong> — {step.desc} ({step.cibil})
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
