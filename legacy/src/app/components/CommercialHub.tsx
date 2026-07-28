/**
 * Commercial Credit Report Services — Hub & Spoke
 *
 * /commercial                   → Main Commercial Hub
 * /commercial/:region           → Regional Hub
 * /commercial/:region/:city     → City landing page
 */
import { useParams, Link, Navigate } from "react-router";
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
      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-5">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Commercial Services</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Commercial Credit Services</span>
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Business Credit Repair & Commercial Loan Advisory Across India</h1>
            <p className="text-lg text-slate-300 mb-8">Business CIBIL CMR improvement, commercial credit building, MSME loan advisory and B2B debt management for proprietors, partnerships, private limited companies and public sector enterprises across all regions of India.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact"><button className="bg-white text-slate-800 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-2">Free Business Consultation <ArrowRight className="w-4 h-4" /></button></Link>
              <CheckScoreButton variant="white" className="text-sm px-6 py-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Not Individual — clear separation */}
      <div className="bg-blue-50 border-b border-blue-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-bold text-blue-700 bg-teal-100 px-2.5 py-1 rounded-full">Commercial Only</span>
          <p className="text-xs text-blue-700">This section covers <strong>business / commercial</strong> credit services. For personal CIBIL, see <Link to="/individual" className="underline font-semibold">Individual Services →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Commercial Credit Services We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMERCIAL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-white" /></div>
                  <p className="font-bold text-gray-900 text-sm mb-1.5">{s.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regional hubs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Region</h2>
          <p className="text-gray-500 text-sm mb-6">Commercial credit services available across all four regions of India</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ALL_REGION_KEYS.map((rk) => {
              const r = REGIONS[rk];
              const cities = REGION_CITIES[rk];
              const metros = cities.filter((c) => c.tier === "metro");
              return (
                <Link key={rk} to={`/${SERVICE_SLUG}/${rk}`}
                  className="group block p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-400 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-xl text-slate-700">{r.shortName}</h3>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-800 font-semibold text-sm mb-1">{r.name}</p>
                  <p className="text-gray-500 text-xs mb-3">{cities.length} cities · {metros.length} metro</p>
                  <div className="flex flex-wrap gap-1.5">
                    {metros.slice(0, 3).map((city) => (
                      <span key={city.slug} className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">{city.name}</span>
                    ))}
                    {cities.length > 3 && <span className="text-xs text-gray-400">+{cities.length - 3}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">FAQs — Commercial Credit Services</h2>
          <div className="space-y-3">
            {COMMERCIAL_FAQS.map((f, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-gray-800 text-sm">
                  {f.q}<ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{f.a}</div>
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

      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-5 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-white">Commercial</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{r.name}</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-black mb-3">Company Credit Information Report Services — {r.name}</h1>
          <p className="text-slate-300 mb-6 max-w-2xl">Company Credit Information Report (CCIR) services, business CIBIL CMR repair and MSME loan advisory for companies in {r.tagline}.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"><button className="bg-white text-slate-800 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100">Free Business Consultation</button></Link>
          </div>
        </div>
      </section>

      <div className="bg-blue-50 border-b border-blue-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-bold text-blue-700 bg-teal-100 px-2.5 py-0.5 rounded-full">Commercial Only</span>
          <p className="text-xs text-blue-700">For personal credit in {r.name}, see <Link to={`/individual/${rk}`} className="underline font-semibold">Individual {r.shortName} →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {metros.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Metro Cities — {r.shortName}</h2>
            <p className="text-gray-500 text-sm mb-5">Commercial credit services in major metros</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {metros.map((city) => (
                <Link key={city.slug} to={`/${COMMERCIAL_CITY_BASE}/${city.slug}`}
                  aria-label={`Company Credit Information Report in ${city.name}`}
                  className="group flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all">
                  <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      Company Credit Information Report in {city.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{city.state}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Metro</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {metros2.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Metropolitan Cities — {r.shortName}</h2>
            <p className="text-gray-500 text-sm mb-5">Commercial credit services across all major cities</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {metros2.map((city) => (
                <Link key={city.slug} to={`/${SERVICE_SLUG}/${rk}/${city.slug}`}
                  aria-label={`Company Credit Information Report in ${city.name}, ${city.state}`}
                  className="group flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-slate-300 bg-white transition-all">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-slate-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700 text-xs">
                      Company Credit Info Report in {city.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{city.state}</p>
                  </div>
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
  const { city } = useParams<{ city: string }>();
  const found = city ? findCityAcrossRegions(city) : undefined;
  if (!found) return <Navigate to={`/${SERVICE_SLUG}`} replace />;
  const { city: cityData, region: rk } = found;
  const r = REGIONS[rk];

  const canonicalUrl = `${BASE}/${COMMERCIAL_CITY_BASE}/${city}`;

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

      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-5 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-white">Commercial</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}/${rk}`} className="hover:text-white">{r.shortName}</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{cityData.name}</span>
          </nav>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${cityData.tier === "metro" ? "bg-yellow-400 text-gray-900" : "bg-white/20 text-white border border-white/30"}`}>
            {cityData.tier === "metro" ? "Metro City" : "Metropolitan"} · {r.shortName} India
          </span>
          <h1 className="text-3xl lg:text-4xl font-black mb-3">Company Credit Information Report in {cityData.name}</h1>
          <p className="text-slate-300 mb-6 max-w-2xl">Company Credit Information Report (CCIR) services for businesses in {cityData.name}, {cityData.state} — CIBIL CMR repair, commercial credit building and MSME loan advisory for all business types.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"><button className="bg-white text-slate-800 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100">Free Business Consultation</button></Link>
            <a href="tel:+919538049888"><button className="bg-green-500 hover:bg-green-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2"><Phone className="w-4 h-4" /> Call Now</button></a>
          </div>
        </div>
      </section>

      <div className="bg-blue-50 border-b border-blue-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-bold text-blue-700 bg-teal-100 px-2.5 py-0.5 rounded-full">Commercial Only</span>
          <p className="text-xs text-blue-700">For personal credit in {cityData.name}, see <Link to={`/credit-report-repair-agency/${city}`} className="underline font-semibold">Credit Report Repair Agency {cityData.name} →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Company Credit Information Report Services in {cityData.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMMERCIAL_SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-white" /></div>
                        <div><p className="font-bold text-gray-900 text-sm">{s.title}</p><p className="text-gray-500 text-xs mt-0.5">{s.desc}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local commercial insight — unique per city */}
            {(cityData.localFact || cityData.commercialNote) && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-widest">
                  Commercial Credit Insight — {cityData.name}
                </h3>
                {cityData.localFact && <p className="text-gray-700 text-sm mb-2">{cityData.localFact}</p>}
                {cityData.commercialNote && <p className="text-gray-700 text-sm italic border-l-2 border-slate-400 pl-3">{cityData.commercialNote}</p>}
                {cityData.localIndustry && (
                  <p className="text-xs text-gray-400 mt-3">Key industries: {cityData.localIndustry}</p>
                )}
                {cityData.localLenders && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cityData.localLenders.map((l) => (
                      <span key={l} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{l}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why {cityData.name} Businesses Choose Us</h2>
              <ul className="space-y-3">
                {[
                  `Free business credit consultation for ${cityData.name} companies — no upfront fees`,
                  `Experienced in ${cityData.state} lender requirements and CIBIL CMR improvement`,
                  `Access to CGTMSE, MUDRA and SIDBI schemes for eligible ${cityData.name} MSMEs`,
                  "98% success rate across 10,000+ individual and commercial clients pan-India",
                  "Fully remote service — no office visits required anywhere in " + cityData.state,
                  "RBI-compliant dispute process with 30-day bureau resolution SLA",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQs — Commercial Credit in {cityData.name}</h2>
              <div className="space-y-3">
                {cityFaqs.map((f, i) => (
                  <details key={i} className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-gray-800 text-sm">
                      {f.q}<ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Business Enquiry — {cityData.name}</h3>
              <p className="text-slate-300 text-sm mb-4">Free commercial credit consultation for your business.</p>
              <Link to="/contact"><button className="w-full bg-white text-slate-800 font-bold text-sm py-2.5 rounded-xl hover:bg-gray-100">Book Free Consultation</button></Link>
              <a href="https://wa.me/919538049888" target="_blank" rel="noopener noreferrer"><button className="w-full mt-2 bg-green-500 hover:bg-green-400 text-white font-bold text-sm py-2.5 rounded-xl">💬 WhatsApp</button></a>
            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
              <p className="text-xs font-semibold text-blue-700 mb-3">Need Personal Credit Help?</p>
              <Link to={`/credit-report-repair-agency/${city}`} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-800">
                Credit Report Repair Agency in {cityData.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-500 mb-3">More Cities in {r.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {REGION_CITIES[rk].filter((c) => c.slug !== city).slice(0, 8).map((nc) => (
                  <Link key={nc.slug} to={`/${COMMERCIAL_CITY_BASE}/${nc.slug}`}
                    className="text-xs text-gray-600 hover:text-slate-800 hover:underline">{nc.name}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
