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
      <section className={`bg-gradient-to-r ${c.hero} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{title}</span>
          </nav>
          <div className="max-w-3xl">
            <span className={`inline-block bg-white/20 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest`}>
              Complete Guide
            </span>
            <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">{headline}</h1>
            <p className="text-lg text-teal-100 mb-6 leading-relaxed">{subheadline}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <button className="bg-white text-blue-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                  Free Consultation <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <CheckScoreButton variant="white" className="text-sm px-6 py-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Spoke navigation bar — hub links to all spokes */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-1">
            <Link to={`/${hubSlug}`}
              className={`flex-shrink-0 px-4 py-3 text-sm font-semibold border-b-2 border-teal-600 text-teal-600`}>
              Overview
            </Link>
            {spokes.map((s) => (
              <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                className="flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-teal-600 hover:border-teal-300 transition-all whitespace-nowrap">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">{intro}</p>
              <ul className="mt-6 space-y-3">
                {keyPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spoke cards — hub links to all spokes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">In-Depth Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {spokes.map((s, i) => (
                  <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                    className={`group block p-5 rounded-2xl border border-gray-100 bg-white shadow-sm ${c.card} transition-all hover:shadow-md`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Guide {String(i + 1).padStart(2, "0")}</span>
                      {s.tag && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{s.tag}</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors mb-1.5">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-snug mb-3">{s.desc}</p>
                    <span className="text-blue-600 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read full guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <details key={i} className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-gray-800 text-sm">
                      {f.q}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
              <Link to="/faq" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-4 font-medium">
                View all 35+ FAQs <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className={`rounded-2xl bg-gradient-to-br ${c.hero} p-6 text-white shadow-lg`}>
              <h3 className="font-bold text-lg mb-2">Need Expert Help?</h3>
              <p className="text-teal-100 text-sm mb-5 leading-relaxed">Our certified credit advisors offer a free consultation — no obligations, no hidden fees.</p>
              <Link to="/contact">
                <button className="w-full bg-white text-blue-700 font-bold text-sm py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  Free Consultation →
                </button>
              </Link>
              <a href="https://wa.me/919538049888" target="_blank" rel="noopener noreferrer">
                <button className="w-full mt-2 bg-green-500 hover:bg-green-400 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                  💬 WhatsApp Us
                </button>
              </a>
            </div>

            {/* Related hubs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Related Topics</h3>
              <div className="space-y-2">
                {relatedHubs.map((h) => (
                  <Link key={h.slug} to={`/${h.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 transition-colors group">
                    <span className="text-sm text-gray-700 group-hover:text-teal-700 font-medium">{h.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick check score */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
              <p className="font-semibold text-gray-800 text-sm mb-3">Check Your Score Now</p>
              <CheckScoreButton variant="primary" className="w-full justify-center text-sm py-2.5" />
            </div>
          </aside>
        </div>
      </div>

      {/* How It Works */}
      {showHowItWorks && <HowItWorks bg="gray" showCTA={true} />}
    </div>
  );
}
