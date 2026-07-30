/**
 * Hub-and-Spoke Architecture — Hub Page Template
 * Each hub covers a broad topic and links to all its spoke pages.
 * Each spoke links back to the hub and to sibling spokes.
 */
'use client';

import { Link } from "./routerShim";
import { ArrowRight, CheckCircle, ChevronRight, ExternalLink } from "lucide-react";
import { SEOHead, faqSchema, breadcrumbSchema } from "./SEOHead";
import { CheckScoreButton } from "./CheckScoreModal";
import { HowItWorks } from "./HowItWorks";

const BASE = "https://creditconsultant.in";

export interface SpokeLink {
  slug: string;         // relative to hub, e.g. "how-to-improve"
  title: string;
  desc: string;
  tag?: string;
}

export interface HubPageProps {
  /* SEO */
  hubSlug: string;      // e.g. "cibil-score"
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  /* Content */
  headline: string;
  subheadline: string;
  intro: string;
  keyPoints: string[];
  spokes: SpokeLink[];
  relatedHubs: { slug: string; title: string }[];
  faqs: { q: string; a: string }[];
  schema?: object;
  showHowItWorks?: boolean;
  accentColor?: string;
}

export function HubPage({
  hubSlug, title, metaTitle, metaDescription, keywords,
  headline, subheadline, intro, keyPoints,
  spokes, relatedHubs, faqs, schema, showHowItWorks = true,
  accentColor = "blue",
}: HubPageProps) {

  const canonicalUrl = `${BASE}/${hubSlug}`;
  const colorMap: Record<string, { hero: string; btn: string; badge: string; card: string; border: string }> = {
    blue:   { hero: "from-teal-600 to-teal-900",   btn: "bg-teal-600 hover:bg-teal-700",   badge: "bg-teal-100 text-teal-700",   card: "hover:border-teal-300 hover:bg-teal-50", border: "border-teal-200" },
    purple: { hero: "from-purple-600 to-purple-800", btn: "bg-purple-600 hover:bg-purple-700", badge: "bg-purple-100 text-purple-700", card: "hover:border-purple-300 hover:bg-purple-50", border: "border-purple-200" },
    green:  { hero: "from-green-600 to-green-800",  btn: "bg-green-600 hover:bg-green-700",  badge: "bg-green-100 text-green-700",  card: "hover:border-green-300 hover:bg-green-50", border: "border-green-200" },
    indigo: { hero: "from-teal-700 to-teal-900", btn: "bg-indigo-600 hover:bg-indigo-700", badge: "bg-indigo-100 text-indigo-700", card: "hover:border-indigo-300 hover:bg-indigo-50", border: "border-indigo-200" },
  };
  const c = colorMap[accentColor] ?? colorMap.blue;

  const allSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": canonicalUrl,
      "name": metaTitle,
      "description": metaDescription,
      "url": canonicalUrl,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": title, "item": canonicalUrl },
        ],
      },
      "hasPart": spokes.map((s) => ({
        "@type": "WebPage",
        "name": s.title,
        "url": `${BASE}/${hubSlug}/${s.slug}`,
        "description": s.desc,
      })),
    },
    faqSchema(faqs),
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: title, path: `/${hubSlug}` }]),
    ...(schema ? [schema] : []),
  ];

  return (
    <div className="w-full">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonicalUrl}
        schema={allSchemas}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-teal-200/80 text-xs font-semibold mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{title}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Complete Guide
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight">{headline}</h1>
            <p className="text-base lg:text-xl text-teal-100/90 mb-8 leading-relaxed font-normal">{subheadline}</p>
            <div className="flex flex-wrap gap-3.5 items-center">
              <Link to="/contact">
                <button className="bg-white text-teal-900 font-bold text-sm px-7 py-3 rounded-xl hover:bg-teal-50 transition-all flex items-center gap-2 shadow-xl shadow-teal-950/50">
                  Free Consultation <ArrowRight className="w-4 h-4 text-teal-700" />
                </button>
              </Link>
              <CheckScoreButton variant="white" className="text-sm px-7 py-3 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Spoke navigation bar — hub links to all spokes */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-16 z-30 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 py-1">
            <Link to={`/${hubSlug}`}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30">
              Overview
            </Link>
            {spokes.map((s) => (
              <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all whitespace-nowrap">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Intro */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <p className="text-slate-700 text-base lg:text-lg leading-relaxed">{intro}</p>
              <ul className="mt-6 space-y-3.5 border-t border-slate-100 pt-6">
                {keyPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spoke cards — hub links to all spokes */}
            <div>
              <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Topic Breakdown</span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">In-Depth Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {spokes.map((s, i) => (
                  <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                    className="group block p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">Guide {String(i + 1).padStart(2, "0")}</span>
                      {s.tag && <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{s.tag}</span>}
                    </div>
                    <h3 className="font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors mb-2 text-base">{s.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-teal-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read full guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Quick Answers</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-3.5">
                {faqs.map((f, i) => (
                  <details key={i} className="group bg-slate-50/80 rounded-2xl border border-slate-200/70 overflow-hidden transition-all">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 text-sm">
                      {f.q}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-3">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
              <Link to="/faq" className="inline-flex items-center gap-1 text-xs text-teal-600 hover:underline mt-6 font-bold">
                View all 35+ FAQs <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 p-7 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <h3 className="font-extrabold text-xl mb-2 text-white">Need Expert Help?</h3>
              <p className="text-teal-100/90 text-xs mb-6 leading-relaxed">Our certified credit advisors offer a free consultation — no obligations, no hidden fees.</p>
              <Link to="/contact">
                <button className="w-full bg-white text-teal-900 font-bold text-xs py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                  Free Consultation →
                </button>
              </Link>
              <a href="https://wa.me/919538049888" target="_blank" rel="noopener noreferrer">
                <button className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-md">
                  💬 WhatsApp Us
                </button>
              </a>
            </div>

            {/* Related hubs */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-900 mb-4 text-sm">Related Topics</h3>
              <div className="space-y-2">
                {relatedHubs.map((h) => (
                  <Link key={h.slug} to={`/${h.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-teal-50/70 transition-colors group border border-slate-100">
                    <span className="text-xs text-slate-700 group-hover:text-teal-700 font-bold">{h.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick check score */}
            <div className="bg-gradient-to-tr from-amber-500/10 via-amber-50 to-amber-100/50 border border-amber-200/80 rounded-3xl p-6 text-center shadow-sm">
              <p className="font-extrabold text-slate-900 text-sm mb-3">Check Your Score Now</p>
              <CheckScoreButton variant="primary" className="w-full justify-center text-xs py-3 font-bold rounded-xl" />
            </div>
          </aside>
        </div>
      </div>

      {/* How It Works */}
      {showHowItWorks && <HowItWorks bg="gray" showCTA={true} />}
    </div>
  );
}
