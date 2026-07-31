/**
 * Individual Credit Report Services — Hub & Spoke
 *
 * /individual                   → Main Individual Hub
 * /individual/:region           → Regional Hub (north | south | east | west)
 * /individual/:region/:city     → City landing page
 */
'use client';

import { useParams, Link, Navigate } from "./routerShim";
import { CheckCircle, MapPin, ArrowRight, Users, TrendingUp, FileText, Shield, ChevronRight, Phone } from "lucide-react";
import { SEOHead, faqSchema, breadcrumbSchema } from "./SEOHead";
import { CheckScoreButton } from "./CheckScoreModal";
import {
  REGIONS, REGION_CITIES, findCityAcrossRegions, ALL_REGION_KEYS,
  COLOR_MAP, type RegionKey, INDIVIDUAL_CITY_BASE,
} from "../data/regionData";

const BASE = "https://creditconsultant.in";
const SERVICE_SLUG = "individual";
const SERVICE_LABEL = "Individual Credit Report Services";

const INDIVIDUAL_SERVICES = [
  { icon: TrendingUp, title: "Personal CIBIL Score Repair",   desc: "Remove negative entries, dispute errors, and improve your score by 80–150 points." },
  { icon: FileText,  title: "Credit Report Analysis",         desc: "Comprehensive review of your report from all 4 bureaus with a personalised action plan." },
  { icon: Shield,    title: "Identity Theft Protection",       desc: "Monitor and protect your personal credit profile from fraud and unauthorised enquiries." },
  { icon: Users,     title: "Home & Personal Loan Advisory",   desc: "Score-matched loan placement with the right lender at the best available interest rate." },
];

const INDIVIDUAL_FAQS = [
  { q: "What is an individual credit report?", a: "An individual credit report is a detailed record of your personal borrowing and repayment history compiled by credit bureaus (CIBIL, Equifax, Experian, CRIF). It includes all loans, credit cards, payment history, enquiries and public records in your name." },
  { q: "How long does individual CIBIL repair take?", a: "Dispute-based improvements show in 30–45 days. Full score recovery from defaults or write-offs takes 6–18 months depending on severity. Most Credit Consultant clients see 80–150 point gains within 6 months." },
  { q: "Can I improve my personal CIBIL score on my own?", a: "Yes, for straightforward errors. For complex cases (write-offs, settlements, identity mix-ups, multiple bureau errors) professional assistance is significantly faster and more effective." },
  { q: "Does a home loan rejection affect my CIBIL score?", a: "The rejection itself doesn't appear on your report, but the hard enquiry from the bank application does — dropping your score by 5–10 points. Multiple rejections compound the damage, which is why score preparation before applying is critical." },
];

/* ═══════════════════════════════════════════════════════════
   MAIN INDIVIDUAL HUB — /individual
════════════════════════════════════════════════════════════ */
export function IndividualMainHub() {
  const schema = [
    {
      "@context": "https://schema.org", "@type": "Service",
      "name": SERVICE_LABEL, "provider": { "@type": "Organization", "name": "Credit Consultant", "url": BASE },
      "areaServed": { "@type": "Country", "name": "India" },
      "description": "Personal CIBIL score repair, credit report dispute and home loan advisory services for individuals across India.",
      "url": `${BASE}/${SERVICE_SLUG}`,
    },
    faqSchema(INDIVIDUAL_FAQS),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: SERVICE_LABEL, path: `/${SERVICE_SLUG}` }]),
  ];

  return (
    <div className="w-full">
      <SEOHead
        title="Individual Credit Report Services — Personal CIBIL Repair Across India | Credit Consultant"
        description="Personal CIBIL score repair, credit report disputes and home loan advisory for individuals across India. Available in all metro cities and major towns."
        keywords="individual credit report India, personal CIBIL repair, individual credit score improvement, personal credit advisory India"
        canonical={`${BASE}/${SERVICE_SLUG}`}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-6">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">Individual Services</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Individual Credit Services
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-slate-900">
                Personal CIBIL Score Repair &amp; Advisory Across India
              </h1>
              <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed font-normal">
                Expert individual credit repair for salaried professionals, self-employed individuals, NRIs and homebuyers — available in all major cities across North, South, East and West India.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link to="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-4 font-extrabold text-base hover:no-underline transition-all py-2.5 px-1">
                  <span>Free Consultation</span>
                  <ArrowRight className="w-4.5 h-4.5 text-blue-600" />
                </Link>
                <CheckScoreButton variant="primary" className="h-12 px-7 text-sm rounded-xl font-extrabold bg-[#00BC7D] hover:bg-[#00a36c] text-white shadow-xl shadow-[#00BC7D]/30 border border-white/20 transition-all transform hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Desktop Visual Card — Fills empty space on right */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-slate-900 text-white rounded-3xl p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
                      CIBIL
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Target Score</p>
                      <p className="text-sm font-extrabold text-white">780+ Excellent</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    ● Bureau SLA 30-45 Days
                  </span>
                </div>

                <div className="space-y-3.5 mb-6">
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Average CIBIL Score Gain</span>
                    <span className="text-xs font-extrabold text-emerald-400">+120 Points</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Disputes &amp; Errors Removed</span>
                    <span className="text-xs font-extrabold text-teal-400 font-mono">50,000+ Reports</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Home &amp; Personal Loan Approvals</span>
                    <span className="text-xs font-extrabold text-sky-400">98% Success Rate</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> RBI Compliant Removal</span>
                  <span>Free Initial Audit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Commercial — clear separation */}
      <div className="bg-amber-500/10 border-b border-amber-200/60 py-3.5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">Individual Only</span>
          <p className="text-xs font-medium text-amber-900">This section covers <strong>personal / individual</strong> credit services. For business credit, see <Link to="/commercial" className="underline font-bold text-amber-900 hover:text-teal-700">Commercial Services →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70 space-y-16">

        {/* Services */}
        <div>
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Service Spectrum</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Individual Credit Services We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDIVIDUAL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-teal-600/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-teal-700 transition-colors">{s.title}</p>
                    <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regional hubs */}
        <div>
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Pan-India Network</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Select Your Region</h2>
          <p className="text-slate-600 text-sm mb-8 font-medium">Individual credit services available across all four regions of India</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_REGION_KEYS.map((rk) => {
              const r = REGIONS[rk];
              const cities = REGION_CITIES[rk];
              const metros = cities.filter((c) => c.tier === "metro");
              return (
                <Link
                  key={rk}
                  to={`/${SERVICE_SLUG}/${rk}`}
                  className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-teal-400/80 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div>
                    {/* Top Accent Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 group-hover:h-2 transition-all" />

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 uppercase tracking-widest">
                          Region Hub
                        </span>
                        <h3 className="font-black text-2xl text-slate-900 group-hover:text-teal-700 transition-colors mt-1">
                          {r.shortName}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-110">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    <p className="text-slate-800 font-extrabold text-sm mb-1">{r.name}</p>
                    <p className="text-slate-500 text-xs font-semibold mb-4">
                      {cities.length} cities · {metros.length} metro hubs
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5 min-h-[52px] content-start">
                      {metros.slice(0, 3).map((city) => (
                        <span
                          key={city.slug}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-700 border border-slate-200/80 group-hover:bg-teal-50/70 group-hover:text-teal-800 group-hover:border-teal-200 transition-colors"
                        >
                          {city.name}
                        </span>
                      ))}
                      {cities.length > 3 && (
                        <span className="text-[10px] text-slate-500 font-bold self-center">
                          +{cities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Full-Width Bottom CTA Button */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="w-full bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 text-white text-xs font-extrabold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-md">
                      <span>Explore {r.shortName} Hub</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto py-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Help &amp; Support</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">FAQs — Individual Credit Services</h2>
          </div>
          <div className="space-y-3.5">
            {INDIVIDUAL_FAQS.map((f, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all hover:border-teal-200">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 text-sm">
                  {f.q}<ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-3">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGIONAL HUB — /individual/:region
════════════════════════════════════════════════════════════ */
export function IndividualRegionHub() {
  const { region } = useParams<{ region: string }>();
  const rk = region as RegionKey;
  const r = REGIONS[rk];
  const cities = REGION_CITIES[rk];
  if (!r) return <Navigate to={`/${SERVICE_SLUG}`} replace />;

  const c = COLOR_MAP[r.color];
  const metros = cities.filter((c) => c.tier === "metro");
  const metros2 = cities.filter((c) => c.tier === "metropolitan");

  const schema = [
    {
      "@context": "https://schema.org", "@type": "Service",
      "name": `Individual Credit Report Services — ${r.name}`,
      "areaServed": r.states.map((s) => ({ "@type": "State", "name": s })),
      "url": `${BASE}/${SERVICE_SLUG}/${rk}`,
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Individual Services", path: `/${SERVICE_SLUG}` },
      { name: r.name, path: `/${SERVICE_SLUG}/${rk}` },
    ]),
  ];

  return (
    <div className="w-full">
      <SEOHead
        title={`Individual Credit Services in ${r.name} — CIBIL Repair & Loan Advisory | Credit Consultant`}
        description={`Personal CIBIL score repair, credit dispute and home loan advisory for individuals in ${r.name}. Serving ${metros.map((m) => m.name).join(", ")} and all major cities.`}
        keywords={`individual credit repair ${r.shortName.toLowerCase()} India, personal CIBIL ${r.shortName.toLowerCase()}, ${metros.map((m) => m.name.toLowerCase()).join(", ")} credit repair`}
        canonical={`${BASE}/${SERVICE_SLUG}/${rk}`}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-6 flex-wrap">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-slate-900 transition-colors">Individual Services</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">{r.name}</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {r.shortName} India Hub · {cities.length} Cities Covered
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight text-slate-900">Individual Credit Services — <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">{r.name}</span></h1>
          <p className="text-base lg:text-xl text-slate-600 mb-8 max-w-2xl font-normal leading-relaxed">Personal CIBIL score repair and home loan advisory for individuals in {r.tagline}.</p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-4 font-extrabold text-base hover:no-underline transition-all py-2.5 px-1">
              <span>Free Consultation</span>
              <ArrowRight className="w-4.5 h-4.5 text-blue-600" />
            </Link>
            <CheckScoreButton variant="primary" className="h-12 px-7 text-sm rounded-xl font-extrabold bg-[#00BC7D] hover:bg-[#00a36c] text-white shadow-xl shadow-[#00BC7D]/30 border border-white/20 transition-all transform hover:-translate-y-0.5" />
          </div>
        </div>
      </section>

      {/* Individual-only banner */}
      <div className="bg-amber-500/10 border-b border-amber-200/60 py-3.5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">Individual Only</span>
          <p className="text-xs font-medium text-amber-900">For business credit services in {r.name}, see <Link to={`/commercial/${rk}`} className="underline font-bold hover:text-teal-700">Commercial {r.shortName} →</Link></p>
        </div>
      </div>

      {/* Regional Global Stats Banner */}
      <section className="bg-white border-b border-slate-200/80 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Regional Coverage", value: `${cities.length} Cities` },
              { label: "Success Rate", value: "98% Client Gains" },
              { label: "Bureau Resolution", value: "30-Day SLA" },
              { label: "Partner Lenders", value: "50+ Banks & NBFCs" },
            ].map((st) => (
              <div key={st.label} className="p-3">
                <p className="text-xl lg:text-2xl font-black text-slate-900 mb-0.5">{st.value}</p>
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70 space-y-14">

        {/* Metro cities */}
        {metros.length > 0 && (
          <div>
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Primary Metros</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Metro Cities — {r.shortName}</h2>
            <p className="text-slate-500 text-xs mb-6 font-medium">Tap any city below to access individual credit services</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metros.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${INDIVIDUAL_CITY_BASE}/${city.slug}`}
                  aria-label={`Credit Report Repair Agency in ${city.name}`}
                  className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-teal-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-900 group-hover:text-teal-700 text-xs transition-colors truncate">
                        Credit Repair Agency in {city.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                        <span>{city.state}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-teal-700 font-bold">Open Page →</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 flex items-center justify-center flex-shrink-0 transition-all shadow-xs">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Metropolitan cities */}
        {metros2.length > 0 && (
          <div>
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Extended Cities</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Metropolitan Cities — {r.shortName}</h2>
            <p className="text-slate-500 text-xs mb-6 font-medium">Individual credit services across all major cities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {metros2.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${INDIVIDUAL_CITY_BASE}/${city.slug}`}
                  aria-label={`Credit Report Repair Agency in ${city.name}, ${city.state}`}
                  className="group flex items-center justify-between gap-2.5 p-3.5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-lg bg-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-800 group-hover:text-teal-700 text-xs truncate">
                        Credit Repair Agency in {city.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                        <span>{city.state}</span>
                        <span className="text-teal-700 font-bold">· Tap to View →</span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-600 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other regions */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Individual Services in Other Regions</p>
          <div className="flex flex-wrap gap-3">
            {ALL_REGION_KEYS.filter((k) => k !== rk).map((k) => (
              <Link key={k} to={`/${SERVICE_SLUG}/${k}`}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-teal-700 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl hover:border-teal-300 transition-all shadow-sm">
                {REGIONS[k].name} <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY PAGE — /individual/:region/:city
════════════════════════════════════════════════════════════ */
export function IndividualCityPage() {
  const params = useParams<{ city?: string }>();
  let citySlug = params?.city;
  if (!citySlug && typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/').filter(Boolean);
    citySlug = parts[parts.length - 1];
  }

  const found = citySlug ? findCityAcrossRegions(citySlug) : undefined;
  if (!found) {
    if (typeof window !== 'undefined' && citySlug) {
      return <Navigate to={`/${SERVICE_SLUG}`} replace />;
    }
    return null;
  }
  const { city: cityData, region: rk } = found;
  const r = REGIONS[rk];

  const c = COLOR_MAP[r.color];
  const pageTitle = `Credit Report Repair Agency in ${cityData.name}`;
  const canonicalUrl = `${BASE}/${INDIVIDUAL_CITY_BASE}/${citySlug}`;

  const citySchema = {
    "@context": "https://schema.org", "@type": "Service",
    "name": pageTitle,
    "provider": { "@type": "Organization", "name": "Credit Consultant", "url": BASE },
    "areaServed": { "@type": "City", "name": cityData.name, "containedInPlace": { "@type": "State", "name": cityData.state } },
    "description": `Personal CIBIL score repair, credit dispute and home loan advisory for individuals in ${cityData.name}, ${cityData.state}.`,
    "url": canonicalUrl,
  };

  const cityFaqs = [
    { q: `How can I improve my personal CIBIL score in ${cityData.name}?`, a: `Our ${cityData.name} credit advisors create a personalised repair plan targeting 80–150 point improvements in 3–6 months through dispute resolution, utilisation management and positive credit building.` },
    { q: `Can I get a home loan in ${cityData.name} with a low CIBIL score?`, a: `Yes — we work with lenders in ${cityData.name} who offer home loans at competitive rates once your score is improved. Our loan advisory team matches you with the right lender for your profile.` },
    { q: `Is your individual credit service available in all areas of ${cityData.name}?`, a: `Yes — our advisory service is fully remote. ${cityData.name} residents can access our complete individual credit repair program online with no office visit required.` },
  ];

  return (
    <div className="w-full">
      <SEOHead
        title={`Credit Report Repair Agency in ${cityData.name} — CIBIL Score Repair & Loan Advisory | Credit Consultant`}
        description={`Top credit report repair agency in ${cityData.name}. Personal CIBIL score repair, dispute resolution and home loan advisory for individuals in ${cityData.state}. 98% success rate.`}
        keywords={`credit report repair agency ${cityData.name.toLowerCase()}, CIBIL repair agency ${cityData.name.toLowerCase()}, credit score repair ${cityData.name.toLowerCase()}, credit consultant ${cityData.state.toLowerCase()}`}
        canonical={canonicalUrl}
        schema={[citySchema, faqSchema(cityFaqs), breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Individual Services", path: `/${SERVICE_SLUG}` },
          { name: r.name, path: `/${SERVICE_SLUG}/${rk}` },
          { name: `Credit Report Repair Agency in ${cityData.name}`, path: `/${INDIVIDUAL_CITY_BASE}/${citySlug}` },
        ])]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-6 flex-wrap">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-slate-900 transition-colors">Individual</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}/${rk}`} className="hover:text-slate-900 transition-colors">{r.shortName}</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">{cityData.name}</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {cityData.tier === "metro" ? "Metro City" : "Metropolitan"} · {r.shortName} India
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight text-slate-900">Credit Report Repair Agency in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">{cityData.name}</span></h1>
          <p className="text-base lg:text-xl text-slate-600 mb-8 max-w-2xl font-normal leading-relaxed">Trusted credit report repair agency in {cityData.name}, {cityData.state} — personal CIBIL score repair, dispute resolution and home loan advisory. Fully remote service, no office visit required.</p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-4 font-extrabold text-base hover:no-underline transition-all py-2.5 px-1">
              <span>Free Consultation</span>
              <ArrowRight className="w-4.5 h-4.5 text-blue-600" />
            </Link>
            <a href="tel:+919538049888">
              <button className="h-12 px-7 rounded-xl font-extrabold text-sm text-white bg-[#00BC7D] hover:bg-[#00a36c] shadow-xl shadow-[#00BC7D]/30 border border-white/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                <Phone className="w-4 h-4 text-white" />
                <span>Call Now</span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Individual-only separator */}
      <div className="bg-amber-500/10 border-b border-amber-200/60 py-3 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">Individual Only</span>
          <p className="text-xs font-medium text-amber-900">For business credit in {cityData.name}, see <Link to={`/company-credit-information-report/${cityData.slug}`} className="underline font-bold hover:text-teal-700">Company Credit Info Report {cityData.name} →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Services */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Credit Report Repair Services in {cityData.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {INDIVIDUAL_SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/70">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-600/20"><Icon className="w-5 h-5 text-white" /></div>
                        <div><p className="font-extrabold text-slate-900 text-sm mb-1">{s.title}</p><p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local insight — unique per city */}
            {(cityData.localFact || cityData.individualNote) && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <h3 className="font-extrabold text-slate-900 mb-4 text-xs uppercase tracking-widest">
                  Credit Insight — {cityData.name}
                </h3>
                {cityData.localFact && <p className="text-slate-700 text-sm mb-3 leading-relaxed font-medium">{cityData.localFact}</p>}
                {cityData.individualNote && <p className="text-slate-700 text-xs italic border-l-4 border-teal-500 pl-4 py-1 bg-teal-50/50 rounded-r-xl">{cityData.individualNote}</p>}
                {cityData.localIndustry && (
                  <p className="text-xs text-slate-400 font-bold mt-4">Key industries: {cityData.localIndustry}</p>
                )}
                {cityData.localLenders && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {cityData.localLenders.map((l) => (
                      <span key={l} className="text-xs bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-full">{l}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Why choose */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Why {cityData.name} Residents Choose Us</h2>
              <ul className="space-y-4">
                {[
                  `Free credit consultation for ${cityData.name} individuals — no upfront fees`,
                  `Certified credit counsellors familiar with ${cityData.state} lenders and banks`,
                  `Fully remote service — serve all areas of ${cityData.name} without office visits`,
                  "RBI-compliant dispute process — 30-day bureau resolution SLA",
                  "98% success rate across 10,000+ individual clients pan-India",
                  "Loan placement with 50+ partner lenders at the best available rates",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 text-sm font-semibold">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">FAQs — Individual Credit in {cityData.name}</h2>
              <div className="space-y-3.5">
                {cityFaqs.map((f, i) => (
                  <details key={i} className="group bg-slate-50/80 rounded-2xl border border-slate-200/70 overflow-hidden transition-all">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 text-sm">
                      {f.q}<ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-3">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#0F294A] to-[#1E3A8A] p-7 text-white shadow-xl relative overflow-hidden border border-blue-900/60">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <h3 className="font-extrabold text-xl mb-2 text-white">Get Help in {cityData.name}</h3>
              <p className="text-blue-100/90 text-xs mb-6 leading-relaxed">Free individual credit consultation — no obligations.</p>
              <Link to="/contact"><button className="w-full bg-white text-blue-950 font-extrabold text-xs py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">Book Free Consultation</button></Link>
              <a href="https://wa.me/919538049888" target="_blank" rel="noopener noreferrer"><button className="w-full mt-3 bg-[#00BC7D] hover:bg-[#00a36c] text-white font-extrabold text-xs py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5">💬 WhatsApp</button></a>
            </div>

            {/* Commercial link */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Looking for Business Credit?</p>
              <Link to={`/company-credit-information-report/${cityData.slug}`} className="flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors">
                Company Credit Info Report in {cityData.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Region link */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">More Cities in {r.name}</p>
              <div className="flex flex-wrap gap-2">
                {REGION_CITIES[rk].filter((c) => c.slug !== citySlug).slice(0, 8).map((nc) => (
                  <Link key={nc.slug} to={`/${INDIVIDUAL_CITY_BASE}/${nc.slug}`}
                    className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-teal-600 hover:text-white px-3 py-1.5 rounded-xl transition-all border border-slate-200">{nc.name}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
