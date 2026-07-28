import { Link } from "react-router";
import {
  MapPin, FileText, House, BarChart2, BookOpen, Phone,
  Calculator, Info, Building2, User, ChevronRight, Globe, Tag,
} from "lucide-react";
import { REGIONS, REGION_CITIES, type RegionKey } from "../data/regionData";

const BASE_URL = "https://creditconsultant.in";

const mainPages = [
  { path: "/",           label: "Home",           icon: House,      desc: "Credit repair & loan advisory homepage",   priority: "1.0" },
  { path: "/services",   label: "Services",        icon: FileText,   desc: "All credit and financial services",        priority: "0.9" },
  { path: "/loans",      label: "Loan Products",   icon: BarChart2,  desc: "Home, business, personal & car loans",    priority: "0.8" },
  { path: "/calculator", label: "EMI Calculator",  icon: Calculator, desc: "Calculate your monthly EMI instantly",    priority: "0.7" },
  { path: "/blogs",      label: "Blogs",           icon: BookOpen,   desc: "Financial insights & credit tips",        priority: "0.8" },
  { path: "/cibil-score",label: "CIBIL Score",     icon: BarChart2,  desc: "Understanding & improving your CIBIL score", priority: "0.9" },
  { path: "/faq",        label: "FAQ",             icon: Info,       desc: "Frequently asked questions",              priority: "0.7" },
  { path: "/about",      label: "About Us",        icon: Info,       desc: "About Credit Consultant",                 priority: "0.6" },
  { path: "/contact",    label: "Contact",          icon: Phone,      desc: "Get in touch with our advisors",          priority: "0.7" },
  { path: "/sitemap",        label: "Sitemap",          icon: Globe,      desc: "Full directory of all pages",         priority: "0.5" },
  { path: "/blogs/sitemap",  label: "Blog Sitemap",     icon: BookOpen,   desc: "Index of all blog articles by category", priority: "0.5" },
];

const regionColors: Record<RegionKey, { bg: string; text: string; border: string; dot: string }> = {
  north: { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-teal-200",   dot: "bg-blue-500" },
  south: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", dot: "bg-indigo-500" },
  east:  { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  west:  { bg: "bg-emerald-50",text: "text-emerald-700",border: "border-emerald-200",dot: "bg-emerald-500" },
};

const totalCities = Object.values(REGION_CITIES).reduce((s, arr) => s + arr.length, 0);
const totalPages = mainPages.length + 4 + 4 + totalCities * 2; // main + hubs + city pairs

export function Sitemap() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-teal-200 text-sm mb-4 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Sitemap</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Sitemap</h1>
          <p className="text-teal-100 max-w-2xl">
            Complete directory of all <strong>{totalPages}+</strong> pages on creditconsultant.in — individual credit reports,
            commercial credit information, loan advisory, and city-specific services across India.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">{mainPages.length} Main Pages</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">4 Region Hubs × 2</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{totalCities} Cities × 2</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── Main Pages ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Main Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mainPages.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.path}
                  to={p.path}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-teal-300 hover:bg-teal-50 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-100 group-hover:bg-teal-600 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-4 h-4 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 group-hover:text-teal-700 transition-colors text-sm">{p.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">{BASE_URL}{p.path}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">{p.desc}</p>
                    <span className="inline-block mt-1.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">
                      Priority {p.priority}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Service Hubs ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 pb-2 border-b border-gray-200">
            Service Hubs
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Top-level hubs for Individual and Commercial credit services, each branching into 4 regional hubs and {totalCities} city pages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Individual Hub */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 overflow-hidden">
              <div className="bg-teal-600 text-white px-5 py-4 flex items-center gap-3">
                <User className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-base">Individual Credit Reports</h3>
                  <p className="text-teal-200 text-xs mt-0.5">{BASE_URL}/individual</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  to="/individual"
                  className="block text-sm font-semibold text-blue-700 hover:underline"
                >
                  /individual — Main Hub
                </Link>
                {(["north","south","east","west"] as RegionKey[]).map((r) => {
                  const region = REGIONS[r];
                  const colors = regionColors[r];
                  return (
                    <div key={r} className={`rounded-xl border ${colors.border} ${colors.bg} p-3`}>
                      <Link
                        to={`/individual/${r}`}
                        className={`text-sm font-semibold ${colors.text} hover:underline flex items-center gap-1.5`}
                      >
                        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                        /individual/{r} — {region.name}
                      </Link>
                      <p className="text-[11px] text-gray-500 mt-1 ml-3.5">
                        {REGION_CITIES[r].filter(c => c.tier === "metro").length} Metro ·{" "}
                        {REGION_CITIES[r].filter(c => c.tier === "metropolitan").length} Metropolitan
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Commercial Hub */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              <div className="bg-slate-700 text-white px-5 py-4 flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-base">Commercial Credit Reports</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{BASE_URL}/commercial</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  to="/commercial"
                  className="block text-sm font-semibold text-slate-700 hover:underline"
                >
                  /commercial — Main Hub
                </Link>
                {(["north","south","east","west"] as RegionKey[]).map((r) => {
                  const region = REGIONS[r];
                  const colors = regionColors[r];
                  return (
                    <div key={r} className={`rounded-xl border ${colors.border} ${colors.bg} p-3`}>
                      <Link
                        to={`/commercial/${r}`}
                        className={`text-sm font-semibold ${colors.text} hover:underline flex items-center gap-1.5`}
                      >
                        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                        /commercial/{r} — {region.name}
                      </Link>
                      <p className="text-[11px] text-gray-500 mt-1 ml-3.5">
                        {REGION_CITIES[r].filter(c => c.tier === "metro").length} Metro ·{" "}
                        {REGION_CITIES[r].filter(c => c.tier === "metropolitan").length} Metropolitan
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── City Pages ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 pb-2 border-b border-gray-200">
            City Pages
            <span className="ml-3 text-base font-normal text-gray-400">({totalCities} cities × 2 service types = {totalCities * 2} pages)</span>
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Each city has dedicated Individual and Commercial pages with unique local content, lender information, and Schema.org markup.
          </p>

          <div className="space-y-10">
            {(["north","south","east","west"] as RegionKey[]).map((rKey) => {
              const region = REGIONS[rKey];
              const cities = REGION_CITIES[rKey];
              const colors = regionColors[rKey];
              const metros = cities.filter(c => c.tier === "metro");
              const metros2 = cities.filter(c => c.tier === "metropolitan");

              return (
                <div key={rKey}>
                  <h3 className={`text-lg font-semibold ${colors.text} mb-4 flex items-center gap-2`}>
                    <MapPin className="w-4 h-4" />
                    {region.name}
                    <span className="text-sm font-normal text-gray-400">({cities.length} cities)</span>
                  </h3>

                  {metros.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Metro</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {metros.map((city) => (
                          <CityCard key={city.slug} city={city} region={rKey} colors={colors} />
                        ))}
                      </div>
                    </div>
                  )}

                  {metros2.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Metropolitan</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {metros2.map((city) => (
                          <CityCard key={city.slug} city={city} region={rKey} colors={colors} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── XML Sitemap ── */}
        <section className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">XML Sitemap for Search Engines</h3>
            <p className="text-sm text-gray-500">
              Submit this URL to Google Search Console and Bing Webmaster Tools for faster indexing.
              The XML sitemap includes all {totalPages}+ URLs with priority and change-frequency metadata.
            </p>
            <p className="text-xs text-gray-400 mt-1 font-mono">{BASE_URL}/sitemap.xml</p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap flex-shrink-0"
          >
            <FileText className="w-4 h-4" /> View sitemap.xml
          </a>
        </section>

      </div>
    </div>
  );
}

function CityCard({
  city,
  region,
  colors,
}: {
  city: { slug: string; name: string; state: string };
  region: RegionKey;
  colors: { bg: string; text: string; border: string };
}) {
  return (
    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-3 space-y-1.5`}>
      <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
        <MapPin className="w-3 h-3 text-gray-400" />
        {city.name}
        <span className="text-[10px] text-gray-400 font-normal">· {city.state}</span>
      </p>
      <Link
        to={`/credit-report-repair-agency/${city.slug}`}
        aria-label={`Credit Report Repair Agency in ${city.name}`}
        className={`flex items-center gap-1 text-[11px] ${colors.text} hover:underline`}
      >
        <User className="w-3 h-3" />
        Credit Repair Agency
      </Link>
      <Link
        to={`/company-credit-information-report/${city.slug}`}
        aria-label={`Company Credit Information Report in ${city.name}`}
        className="flex items-center gap-1 text-[11px] text-slate-600 hover:underline"
      >
        <Building2 className="w-3 h-3" />
        Company Credit Info Report
      </Link>
    </div>
  );
}
