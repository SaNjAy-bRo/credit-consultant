/**
 * Individual Credit Report Services — Hub & Spoke
 *
 * /individual                   → Main Individual Hub
 * /individual/:region           → Regional Hub (north | south | east | west)
 * /individual/:region/:city     → City landing page
 */
import { useParams, Link, Navigate } from "react-router";
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-5">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Individual Services</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Individual Credit Services</span>
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Personal CIBIL Score Repair & Advisory Across India</h1>
            <p className="text-lg text-teal-100 mb-8">Expert individual credit repair for salaried professionals, self-employed individuals, NRIs and homebuyers — available in all major cities across North, South, East and West India.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact"><button className="bg-white text-blue-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">Free Consultation <ArrowRight className="w-4 h-4" /></button></Link>
              <CheckScoreButton variant="white" className="text-sm px-6 py-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Not Commercial — clear separation */}
      <div className="bg-amber-50 border-b border-amber-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">Individual Only</span>
          <p className="text-xs text-amber-700">This section covers <strong>personal / individual</strong> credit services. For business credit, see <Link to="/commercial" className="underline font-semibold">Commercial Services →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Individual Credit Services We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDIVIDUAL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-blue-50 border border-blue-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-white" /></div>
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
          <p className="text-gray-500 text-sm mb-6">Individual credit services available across all four regions of India</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ALL_REGION_KEYS.map((rk) => {
              const r = REGIONS[rk];
              const cities = REGION_CITIES[rk];
              const metros = cities.filter((c) => c.tier === "metro");
              const c = COLOR_MAP[r.color];
              return (
                <Link key={rk} to={`/${SERVICE_SLUG}/${rk}`}
                  className={`group block p-6 rounded-2xl border ${c.border} ${c.bg} hover:shadow-lg transition-all`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-black text-xl ${c.text}`}>{r.shortName}</h3>
                    <ArrowRight className={`w-5 h-5 ${c.text} group-hover:translate-x-1 transition-transform`} />
                  </div>
                  <p className="text-gray-800 font-semibold text-sm mb-1">{r.name}</p>
                  <p className="text-gray-500 text-xs mb-3">{cities.length} cities · {metros.length} metro</p>
                  <div className="flex flex-wrap gap-1.5">
                    {metros.slice(0, 3).map((city) => (
                      <span key={city.slug} className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badge}`}>{city.name}</span>
                    ))}
                    {cities.length > 3 && <span className="text-xs text-gray-400">+{cities.length - 3} more</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">FAQs — Individual Credit Services</h2>
          <div className="space-y-3">
            {INDIVIDUAL_FAQS.map((f, i) => (
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
      <section className={`bg-gradient-to-r ${c.hero} text-white py-14`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-5 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-white">Individual Services</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{r.name}</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-black mb-3">Individual Credit Services — {r.name}</h1>
          <p className="text-lg text-white/80 mb-6 max-w-2xl">Personal CIBIL score repair and home loan advisory for individuals in {r.tagline}.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"><button className="bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">Free Consultation</button></Link>
            <CheckScoreButton variant="white" className="text-sm px-5 py-2.5" />
          </div>
        </div>
      </section>

      {/* Individual-only banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">Individual Only</span>
          <p className="text-xs text-amber-700">For business credit services in {r.name}, see <Link to={`/commercial/${rk}`} className="underline font-semibold">Commercial {r.shortName} →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Metro cities */}
        {metros.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Metro Cities — {r.shortName}</h2>
            <p className="text-gray-500 text-sm mb-5">Individual credit services in major metros</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {metros.map((city) => (
                <Link key={city.slug} to={`/${INDIVIDUAL_CITY_BASE}/${city.slug}`}
                  aria-label={`Credit Report Repair Agency in ${city.name}`}
                  className={`group flex items-center gap-2 p-3 rounded-xl border ${c.border} ${c.bg} hover:shadow-md transition-all`}>
                  <MapPin className={`w-4 h-4 ${c.text} flex-shrink-0`} />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-teal-700 text-sm">
                      Credit Report Repair Agency in {city.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{city.state} · {city.tier === "metro" ? "Metro" : "Metropolitan"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Metropolitan cities */}
        {metros2.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Metropolitan Cities — {r.shortName}</h2>
            <p className="text-gray-500 text-sm mb-5">Individual credit services across all major cities</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {metros2.map((city) => (
                <Link key={city.slug} to={`/${SERVICE_SLUG}/${rk}/${city.slug}`}
                  aria-label={`Credit Report Repair Agency in ${city.name}, ${city.state}`}
                  className="group flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50 bg-white transition-all">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700 group-hover:text-teal-700 text-xs">
                      Credit Repair Agency in {city.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{city.state}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other regions */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-500 mb-4">Individual Services in Other Regions</p>
          <div className="flex flex-wrap gap-3">
            {ALL_REGION_KEYS.filter((k) => k !== rk).map((k) => (
              <Link key={k} to={`/${SERVICE_SLUG}/${k}`}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:border-blue-300 transition-all">
                {REGIONS[k].name} <ArrowRight className="w-3.5 h-3.5" />
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
  const { city } = useParams<{ city: string }>();
  const found = city ? findCityAcrossRegions(city) : undefined;
  if (!found) return <Navigate to={`/${SERVICE_SLUG}`} replace />;
  const { city: cityData, region: rk } = found;
  const r = REGIONS[rk];

  const c = COLOR_MAP[r.color];
  const pageTitle = `Credit Report Repair Agency in ${cityData.name}`;
  const canonicalUrl = `${BASE}/${INDIVIDUAL_CITY_BASE}/${city}`;

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
          { name: `Credit Report Repair Agency in ${cityData.name}`, path: `/${INDIVIDUAL_CITY_BASE}/${city}` },
        ])]}
      />

      {/* Hero */}
      <section className={`bg-gradient-to-r ${c.hero} text-white py-14`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-5 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}`} className="hover:text-white">Individual</Link><ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${SERVICE_SLUG}/${rk}`} className="hover:text-white">{r.shortName}</Link><ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{cityData.name}</span>
          </nav>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${cityData.tier === "metro" ? "bg-yellow-400 text-gray-900" : "bg-white/20 text-white border border-white/30"}`}>
            {cityData.tier === "metro" ? "Metro City" : "Metropolitan"} · {r.shortName} India
          </span>
          <h1 className="text-3xl lg:text-4xl font-black mb-3">Credit Report Repair Agency in {cityData.name}</h1>
          <p className="text-white/80 mb-6 max-w-2xl">Trusted credit report repair agency in {cityData.name}, {cityData.state} — personal CIBIL score repair, dispute resolution and home loan advisory. Fully remote service, no office visit required.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact"><button className="bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100">Free Consultation</button></Link>
            <a href="tel:+919538049888"><button className="bg-green-500 hover:bg-green-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"><Phone className="w-4 h-4" /> Call Now</button></a>
          </div>
        </div>
      </section>

      {/* Individual-only separator */}
      <div className="bg-amber-50 border-b border-amber-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">Individual Only</span>
          <p className="text-xs text-amber-700">For business credit in {cityData.name}, see <Link to={`/company-credit-information-report/${city}`} className="underline font-semibold">Company Credit Info Report {cityData.name} →</Link></p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">

            {/* Services */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Credit Report Repair Services in {cityData.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INDIVIDUAL_SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className={`p-4 rounded-xl border ${c.border} ${c.bg}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0`}><Icon className={`w-5 h-5 ${c.text}`} /></div>
                        <div><p className="font-bold text-gray-900 text-sm">{s.title}</p><p className="text-gray-500 text-xs mt-0.5">{s.desc}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local insight — unique per city */}
            {(cityData.localFact || cityData.individualNote) && (
              <div className={`rounded-2xl border ${c.border} ${c.bg} p-5`}>
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-widest">
                  Credit Insight — {cityData.name}
                </h3>
                {cityData.localFact && <p className="text-gray-700 text-sm mb-2">{cityData.localFact}</p>}
                {cityData.individualNote && <p className="text-gray-700 text-sm italic border-l-2 border-blue-300 pl-3">{cityData.individualNote}</p>}
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

            {/* Why choose */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why {cityData.name} Residents Choose Us</h2>
              <ul className="space-y-3">
                {[
                  `Free credit consultation for ${cityData.name} individuals — no upfront fees`,
                  `Certified credit counsellors familiar with ${cityData.state} lenders and banks`,
                  `Fully remote service — serve all areas of ${cityData.name} without office visits`,
                  "RBI-compliant dispute process — 30-day bureau resolution SLA",
                  "98% success rate across 10,000+ individual clients pan-India",
                  "Loan placement with 50+ partner lenders at the best available rates",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQs — Individual Credit in {cityData.name}</h2>
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

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className={`rounded-2xl bg-gradient-to-br ${c.hero} p-6 text-white`}>
              <h3 className="font-bold text-lg mb-2">Get Help in {cityData.name}</h3>
              <p className="text-white/80 text-sm mb-4">Free individual credit consultation — no obligations.</p>
              <Link to="/contact"><button className="w-full bg-white text-blue-700 font-bold text-sm py-2.5 rounded-xl hover:bg-gray-100">Book Free Consultation</button></Link>
              <a href="https://wa.me/919538049888" target="_blank" rel="noopener noreferrer"><button className="w-full mt-2 bg-green-500 hover:bg-green-400 text-white font-bold text-sm py-2.5 rounded-xl">💬 WhatsApp</button></a>
            </div>

            {/* Commercial link */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-500 mb-3">Looking for Business Credit?</p>
              <Link to={`/company-credit-information-report/${city}`} className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                Company Credit Info Report in {cityData.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Region link */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-500 mb-3">More Cities in {r.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {REGION_CITIES[rk].filter((c) => c.slug !== city).slice(0, 8).map((nc) => (
                  <Link key={nc.slug} to={`/${INDIVIDUAL_CITY_BASE}/${nc.slug}`}
                    className="text-xs text-gray-600 hover:text-teal-600 hover:underline">{nc.name}</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
