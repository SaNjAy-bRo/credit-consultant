/**
 * Commercial Credit Report Services — Hub & Spoke
 *
 * /commercial                   → Main Commercial Hub
 * /commercial/:region           → Regional Hub
 * /commercial/:region/:city     → City landing page
 */
'use client';

import { useParams, Link, Navigate } from "./routerShim";
import { CheckCircle, MapPin, ArrowRight, Briefcase, BarChart2, Shield, FileText, ChevronRight, Phone, TrendingUp } from "lucide-react";
import { SEOHead, faqSchema, breadcrumbSchema } from "./SEOHead";
import { CheckScoreButton } from "./CheckScoreModal";
import {
  REGIONS, REGION_CITIES, findCityAcrossRegions, ALL_REGION_KEYS,
  COLOR_MAP, type RegionKey, COMMERCIAL_CITY_BASE,
} from "../data/regionData";

const BASE = "https://creditconsultant.in";
const SERVICE_SLUG = "commercial";
const SERVICE_LABEL = "Company Credit Information Report Services";

const COMMERCIAL_SERVICES = [
  { icon: BarChart2,   title: "Business CIBIL / CMR Repair",    desc: "Improve your Company Monthly Review (CMR) ranking and business credit profile with banks." },
  { icon: Briefcase,   title: "Business Loan Advisory",          desc: "Collateral-free business loans up to ₹2 Cr — matched to your profile from 50+ lenders." },
  { icon: FileText,    title: "Trade Credit & Vendor Finance",    desc: "Build vendor credit lines and access trade finance facilities for your business." },
  { icon: Shield,      title: "B2B Debt Management",              desc: "AR management, debtor follow-up, and structured debt recovery for businesses." },
  { icon: TrendingUp,  title: "Business Credit Profile Build",    desc: "For startups and new businesses — establish a strong CIBIL commercial credit profile." },
  { icon: BarChart2,   title: "MSME & SME Loan Structuring",     desc: "CGTMSE-backed, MUDRA and SIDBI loan facilitation for eligible MSMEs." },
];

const COMMERCIAL_FAQS = [
  { q: "What is a CIBIL CMR rank for businesses?", a: "CIBIL CMR (Company Monthly Review) is a rank from 1–10 assigned to companies based on their credit behaviour. Rank 1 is best (lowest risk). Banks use this to decide business loan approvals and credit limits." },
  { q: "Can a business with a low CMR rank get loans?", a: "Yes — but at higher rates and with stricter terms. Our commercial credit specialists help businesses improve their CMR rank through dispute resolution, liability restructuring and positive credit building." },
  { q: "Is commercial credit repair separate from personal CIBIL?", a: "Yes. Your personal CIBIL score and your business CMR/commercial credit are separate files at the bureaus. However, for proprietorships and partnerships, the proprietor/partners' personal credit is often checked alongside the business credit." },
  { q: "How long does business credit repair take?", a: "CMR rank improvement through dispute resolution: 30–60 days. Comprehensive business credit rebuilding: 6–18 months depending on the severity of defaults or write-offs." },
  { q: "What documents are needed for business loan advisory?", a: "Business registration proof, GST returns (last 2 years), ITR (last 2–3 years), bank statements (last 12 months), and PAN/Aadhaar of directors/proprietors." },
];

/* ═══════════════════════════════════════════════════════════
   MAIN COMMERCIAL HUB — /commercial
════════════════════════════════════════════════════════════ */
export function CommercialMainHub() {
  const schema = [
    {
      "@context": "https://schema.org", "@type": "Service",
      "name": SERVICE_LABEL,
      "provider": { "@type": "Organization", "name": "Credit Consultant", "url": BASE },
      "areaServed": { "@type": "Country", "name": "India" },
      "description": "Business CIBIL CMR repair, commercial credit building, business loan advisory and B2B debt management across India.",
      "url": `${BASE}/${SERVICE_SLUG}`,
    },
    faqSchema(COMMERCIAL_FAQS),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: SERVICE_LABEL, path: `/${SERVICE_SLUG}` }]),
  ];

  return (
    <div className="w-full">
      <SEOHead
        title="Company Credit Information Report Services — Business CIBIL Repair & MSME Loan Advisory India | Credit Consultant"
        description="Company Credit Information Report (CCIR) services across India — business CIBIL CMR repair, commercial credit building and MSME loan advisory. Available in all major cities."
        keywords="company credit information report India, CCIR services India, business CIBIL CMR repair, MSME loan advisory India, commercial credit building"
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
            <span className="text-slate-900 font-bold">Commercial Services</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Commercial Credit Services
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-slate-900">Business Credit Repair &amp; Commercial Loan Advisory Across India</h1>
              <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed font-normal">Business CIBIL CMR improvement, commercial credit building, MSME loan advisory and B2B debt management for proprietors, partnerships, private limited companies and public sector enterprises across all regions of India.</p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link to="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-4 font-extrabold text-base hover:no-underline transition-all py-2.5 px-1">
                  <span>Free Business Consultation</span>
                  <ArrowRight className="w-4.5 h-4.5 text-blue-600" />
                </Link>
                <CheckScoreButton variant="primary" className="h-12 px-7 text-sm rounded-xl font-extrabold bg-[#00BC7D] hover:bg-[#00a36c] text-white shadow-xl shadow-[#00BC7D]/30 border border-white/20 transition-all transform hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Desktop Visual Card — Fills empty space on right */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-slate-900 text-white rounded-3xl p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-extrabold text-sm">
                      CMR
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Company Rank</p>
                      <p className="text-sm font-extrabold text-white">Rank 1 (Lowest Risk)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    ● Verified Bureau SLA
                  </span>
                </div>

                <div className="space-y-3.5 mb-6">
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">CMR Dispute Success Rate</span>
                    <span className="text-xs font-extrabold text-teal-400">98.4% Approved</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Commercial Loans Facilitated</span>
                    <span className="text-xs font-extrabold text-amber-400 font-mono">₹500Cr+</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Partner Bank Network</span>
                    <span className="text-xs font-extrabold text-sky-400">50+ Lenders</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-teal-400" /> RBI Compliant Process</span>
                  <span>100% Confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Individual — clear separation */}
      <div className="bg-blue-500/10 border-b border-blue-200/60 py-3.5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-extrabold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">Commercial Only</span>
          <p className="text-xs font-medium text-slate-800">This section covers <strong>business / commercial</strong> credit services. For personal CIBIL, see <Link to="/individual" className="underline font-bold text-teal-700 hover:text-teal-900">Individual Services →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70 space-y-16">

        {/* Services */}
        <div>
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">B2B Solutions</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Commercial Credit Services We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMERCIAL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-slate-950/20 group-hover:scale-110 transition-transform">
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
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Pan-India Coverage</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Select Your Region</h2>
          <p className="text-slate-600 text-sm mb-8 font-medium">Commercial credit services available across all four regions of India</p>
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
                          Commercial Hub
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
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">FAQs — Commercial Credit Services</h2>
          </div>
          <div className="space-y-3.5">
            {COMMERCIAL_FAQS.map((f, i) => (
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
   COMMERCIAL REGIONAL HUB — /commercial/:region
════════════════════════════════════════════════════════════ */
export function CommercialRegionHub() {
  const { region } = useParams<{ region: string }>();
  const rk = region as RegionKey;
  const r = REGIONS[rk];
  const cities = REGION_CITIES[rk];
  if (!r) return <Navigate to={`/${SERVICE_SLUG}`} replace />;

  const metros = cities.filter((c) => c.tier === "metro");
  const metros2 = cities.filter((c) => c.tier === "metropolitan");

  return (
    <div className="w-full">
      <SEOHead
        title={`Company Credit Information Report Services in ${r.name} — Business CIBIL & MSME Loan Advisory | Credit Consultant`}
        description={`Company Credit Information Report (CCIR) services in ${r.name} — business CIBIL CMR repair, commercial credit building and MSME loan advisory. Serving ${metros.map((m) => m.name).join(", ")} and all major cities.`}
        keywords={`company credit information report ${r.shortName.toLowerCase()}, CCIR ${r.shortName.toLowerCase()} India, business CIBIL CMR ${r.shortName.toLowerCase()}, MSME loan ${r.shortName.toLowerCase()} India`}
        canonical={`${BASE}/${SERVICE_SLUG}/${rk}`}
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Commercial Services", path: `/${SERVICE_SLUG}` },
            { name: r.name, path: `/${SERVICE_SLUG}/${rk}` },
          ]),
        ]}
      />

      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-teal-200/80 text-xs font-semibold mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-white transition-colors">Commercial</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{r.name}</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {r.shortName} Enterprise Hub · {cities.length} Industrial Centers
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight">Company Credit Information Report Services — <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">{r.name}</span></h1>
          <p className="text-base lg:text-xl text-teal-100/90 mb-8 max-w-2xl font-normal leading-relaxed">Company Credit Information Report (CCIR) services, business CIBIL CMR repair and MSME loan advisory for companies in {r.tagline}.</p>
          <div className="flex flex-wrap gap-3.5 items-center">
            <Link to="/contact"><button className="bg-white text-teal-900 font-bold text-sm px-7 py-3 rounded-xl hover:bg-teal-50 transition-all shadow-xl">Free Business Consultation</button></Link>
          </div>
        </div>
      </section>

      <div className="bg-blue-500/10 border-b border-blue-200/60 py-3.5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-extrabold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">Commercial Only</span>
          <p className="text-xs font-medium text-slate-800">For personal credit in {r.name}, see <Link to={`/individual/${rk}`} className="underline font-bold hover:text-teal-700">Individual {r.shortName} →</Link></p>
        </div>
      </div>

      {/* Enterprise Stats Bar */}
      <section className="bg-white border-b border-slate-200/80 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "B2B Centers Covered", value: `${cities.length} Metros` },
              { label: "CMR Rank Gains", value: "Rank 1–3 Focus" },
              { label: "MSME Loans", value: "Up to ₹2 Crore" },
              { label: "Partner Lenders", value: "50+ Financial Institutions" },
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
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Commercial Metros</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Metro Cities — {r.shortName}</h2>
            <p className="text-slate-500 text-xs mb-6 font-medium">Tap any city below to access commercial credit services</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metros.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${COMMERCIAL_CITY_BASE}/${city.slug}`}
                  aria-label={`Company Credit Information Report in ${city.name}`}
                  className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-teal-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-900 group-hover:text-teal-700 text-xs transition-colors truncate">
                        Commercial Credit in {city.name}
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

        {/* Metropolitan / Industrial Hubs */}
        {metros2.length > 0 && (
          <div>
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Industrial Hubs</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">Metropolitan Cities — {r.shortName}</h2>
            <p className="text-slate-500 text-xs mb-6 font-medium">Commercial credit services across all major cities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {metros2.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${COMMERCIAL_CITY_BASE}/${city.slug}`}
                  aria-label={`Company Credit Information Report in ${city.name}, ${city.state}`}
                  className="group flex items-center justify-between gap-2.5 p-3.5 rounded-2xl border border-slate-200/90 hover:border-teal-400 hover:shadow-lg bg-white transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-800 group-hover:text-teal-700 text-xs truncate">
                        Commercial Credit in {city.name}
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
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMMERCIAL CITY PAGE — /commercial/:region/:city
════════════════════════════════════════════════════════════ */
export function CommercialCityPage() {
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

  const canonicalUrl = `${BASE}/${COMMERCIAL_CITY_BASE}/${citySlug}`;

  const cityFaqs = [
    { q: `How can a business in ${cityData.name} improve its CIBIL CMR rank?`, a: `Our commercial credit specialists review your business credit profile, identify disputable CMR issues specific to ${cityData.name} lenders, and build a structured improvement plan targeting a better CMR rank within 60–90 days.` },
    { q: `Can a ${cityData.name} business get a loan without collateral?`, a: `Yes — under CGTMSE-backed loans, businesses in ${cityData.name} can access collateral-free credit up to ₹2 crore. We help identify eligible MSME schemes and match you with the right lender.` },
    { q: `Do you serve all business types in ${cityData.name}?`, a: `Yes — we serve proprietorships, partnerships, LLPs, private limited companies and public sector enterprises in ${cityData.name} and all surrounding areas in ${cityData.state}.` },
  ];

  return (
    <div className="w-full">
      <SEOHead
        title={`Company Credit Information Report in ${cityData.name} — Business CIBIL CMR Repair & MSME Loans | Credit Consultant`}
        description={`Company Credit Information Report (CCIR) services in ${cityData.name}, ${cityData.state} — business CIBIL CMR repair, commercial credit building and MSME loan advisory. All business types served.`}
        keywords={`company credit information report ${cityData.name.toLowerCase()}, CCIR ${cityData.name.toLowerCase()}, business CIBIL CMR ${cityData.name.toLowerCase()}, MSME loan ${cityData.name.toLowerCase()}, commercial credit ${cityData.state.toLowerCase()}`}
        canonical={canonicalUrl}
        schema={[faqSchema(cityFaqs), breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Commercial", path: `/${SERVICE_SLUG}` },
          { name: r.name, path: `/${SERVICE_SLUG}/${rk}` },
          { name: `Company Credit Information Report in ${cityData.name}`, path: canonicalUrl },
        ])]}
      />

      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-teal-200/80 text-xs font-semibold mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-white transition-colors">Commercial</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}/${rk}`} className="hover:text-white transition-colors">{r.shortName}</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{cityData.name}</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {cityData.tier === "metro" ? "Metro City" : "Metropolitan"} · {r.shortName} India
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight">Company Credit Information Report in <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">{cityData.name}</span></h1>
          <p className="text-base lg:text-xl text-teal-100/90 mb-8 max-w-2xl font-normal leading-relaxed">Company Credit Information Report (CCIR) services for businesses in {cityData.name}, {cityData.state} — CIBIL CMR repair, commercial credit building and MSME loan advisory for all business types.</p>
          <div className="flex flex-wrap gap-3.5 items-center">
            <Link to="/contact"><button className="bg-white text-teal-900 font-bold text-sm px-7 py-3 rounded-xl hover:bg-teal-50 transition-all shadow-xl">Free Business Consultation</button></Link>
            <a href="tel:+919538049888"><button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-lg"><Phone className="w-4 h-4" /> Call Now</button></a>
          </div>
        </div>
      </section>

      <div className="bg-blue-500/10 border-b border-blue-200/60 py-3 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-extrabold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">Commercial Only</span>
          <p className="text-xs font-medium text-slate-800">For personal credit in {cityData.name}, see <Link to={`/credit-report-repair-agency/${cityData.slug}`} className="underline font-bold hover:text-teal-700">Credit Report Repair Agency {cityData.name} →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Company Credit Information Report Services in {cityData.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {COMMERCIAL_SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/70">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-md shadow-slate-950/20"><Icon className="w-5 h-5 text-white" /></div>
                        <div><p className="font-extrabold text-slate-900 text-sm mb-1">{s.title}</p><p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local commercial insight — unique per city */}
            {(cityData.localFact || cityData.commercialNote) && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <h3 className="font-extrabold text-slate-900 mb-4 text-xs uppercase tracking-widest">
                  Commercial Credit Insight — {cityData.name}
                </h3>
                {cityData.localFact && <p className="text-slate-700 text-sm mb-3 leading-relaxed font-medium">{cityData.localFact}</p>}
                {cityData.commercialNote && <p className="text-slate-700 text-xs italic border-l-4 border-slate-500 pl-4 py-1 bg-slate-100/70 rounded-r-xl">{cityData.commercialNote}</p>}
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

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Why {cityData.name} Businesses Choose Us</h2>
              <ul className="space-y-4">
                {[
                  `Free business credit consultation for ${cityData.name} companies — no upfront fees`,
                  `Experienced in ${cityData.state} lender requirements and CIBIL CMR improvement`,
                  `Access to CGTMSE, MUDRA and SIDBI schemes for eligible ${cityData.name} MSMEs`,
                  "98% success rate across 10,000+ individual and commercial clients pan-India",
                  "Fully remote service — no office visits required anywhere in " + cityData.state,
                  "RBI-compliant dispute process with 30-day bureau resolution SLA",
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

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">FAQs — Commercial Credit in {cityData.name}</h2>
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

          <aside className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#0A192F] via-[#0F294A] to-[#1E3A8A] p-7 text-white shadow-xl relative overflow-hidden border border-blue-900/60">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <h3 className="font-extrabold text-xl mb-2 text-white">Business Enquiry — {cityData.name}</h3>
              <p className="text-blue-100/90 text-xs mb-6 leading-relaxed">Free commercial credit consultation for your business.</p>
              <Link to="/contact"><button className="w-full bg-white text-blue-950 font-extrabold text-xs py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">Book Free Consultation</button></Link>
              <a href="https://wa.me/919538049888" target="_blank" rel="noopener noreferrer"><button className="w-full mt-3 bg-[#00BC7D] hover:bg-[#00a36c] text-white font-extrabold text-xs py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5">💬 WhatsApp</button></a>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Need Personal Credit Help?</p>
              <Link to={`/credit-report-repair-agency/${cityData.slug}`} className="flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors">
                Credit Report Repair Agency in {cityData.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">More Cities in {r.name}</p>
              <div className="flex flex-wrap gap-2">
                {REGION_CITIES[rk].filter((c) => c.slug !== citySlug).slice(0, 8).map((nc) => (
                  <Link key={nc.slug} to={`/${COMMERCIAL_CITY_BASE}/${nc.slug}`}
                    className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-xl transition-all border border-slate-200">{nc.name}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
