/**
 * Hub-and-Spoke Architecture — Spoke Page Template
 * Each spoke covers one specific subtopic and links back to its hub + sibling spokes.
 */
'use client';

import { Link } from "./routerShim";
import { ArrowRight, ArrowLeft, CheckCircle, ChevronRight, Clock, User } from "lucide-react";
import { SEOHead, faqSchema, breadcrumbSchema } from "./SEOHead";
import { CheckScoreButton } from "./CheckScoreModal";

const BASE = "https://creditconsultant.in";

export interface SpokePageProps {
  hubSlug: string;
  hubTitle: string;
  spokeSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: string;
  readTime: string;
  updatedDate: string;
  headline: string;
  intro: string;
  sections: { heading: string; body: React.ReactNode }[];
  keyTakeaways: string[];
  faqs: { q: string; a: string }[];
  siblings: { slug: string; title: string; desc: string }[];
  accentColor?: string;
  schema?: object;
}

export function SpokePage({
  hubSlug, hubTitle, spokeSlug,
  title, metaTitle, metaDescription, keywords,
  category, readTime, updatedDate,
  headline, intro, sections, keyTakeaways, faqs, siblings,
  accentColor = "blue", schema,
}: SpokePageProps) {

  const canonicalUrl = `${BASE}/${hubSlug}/${spokeSlug}`;
  const c: Record<string, { hero: string; badge: string; accent: string }> = {
    blue:   { hero: "from-teal-600 to-teal-900",   badge: "bg-teal-100 text-teal-700",   accent: "text-teal-600" },
    purple: { hero: "from-purple-600 to-purple-800", badge: "bg-purple-100 text-purple-700", accent: "text-purple-600" },
    green:  { hero: "from-green-600 to-green-800",  badge: "bg-green-100 text-green-700",  accent: "text-green-600" },
    indigo: { hero: "from-teal-700 to-teal-900", badge: "bg-indigo-100 text-indigo-700", accent: "text-indigo-600" },
  };
  const col = c[accentColor] ?? c.blue;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metaTitle,
    "description": metaDescription,
    "author": { "@type": "Organization", "name": "Credit Consultant", "url": BASE },
    "publisher": { "@type": "Organization", "name": "Credit Consultant", "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png` } },
    "dateModified": updatedDate,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "keywords": keywords,
    "inLanguage": "en-IN",
    "isPartOf": { "@type": "WebPage", "@id": `${BASE}/${hubSlug}`, "name": hubTitle },
  };

  return (
    <div className="w-full">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonicalUrl}
        ogType="article"
        schema={[articleSchema, faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: hubTitle, path: `/${hubSlug}` },
            { name: title, path: `/${hubSlug}/${spokeSlug}` },
          ]),
          ...(schema ? [schema] : []),
        ]}
      />

      {/* Slim hero */}
      <section className="relative overflow-hidden py-18 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${hubSlug}`} className="hover:text-slate-900 transition-colors">{hubTitle}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold truncate max-w-xs">{title}</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight max-w-3xl tracking-tight text-slate-900">{headline}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-blue-600" /> Credit Consultant Advisors</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-600" /> {readTime}</span>
            <span>Updated {new Date(updatedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </section>

      {/* Spoke sub-nav — sibling spoke links */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-16 z-30 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 py-1">
            <Link to={`/${hubSlug}`}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
              ← {hubTitle}
            </Link>
            {siblings.map((s) => {
              const isActive = s.slug === spokeSlug;
              return (
                <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                    isActive ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}>
                  {s.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/70">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main article */}
          <article className="lg:col-span-2 space-y-10">
            <p className="text-slate-700 text-base lg:text-lg leading-relaxed font-medium bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">{intro}</p>

            {sections.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{s.heading}</h2>
                <div className="text-slate-700 text-sm leading-relaxed space-y-3">{s.body}</div>
              </div>
            ))}

            {/* Key Takeaways box */}
            <div className="bg-gradient-to-tr from-teal-500/10 via-emerald-50 to-teal-50 border border-teal-200/80 rounded-3xl p-8 shadow-sm">
              <h3 className="font-extrabold text-teal-900 text-lg mb-4 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-black shadow-md">✓</span>
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-slate-800 text-sm font-medium leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-3.5">
                {faqs.map((f, i) => (
                  <details key={i} className="group bg-slate-50/80 rounded-2xl border border-slate-200/70 overflow-hidden transition-all">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 text-sm">
                      {f.q}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 text-xs leading-relaxed border-t border-slate-200/60 pt-3">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 rounded-3xl p-10 text-white text-center relative overflow-hidden shadow-2xl border border-slate-800">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
              <h3 className="text-2xl font-extrabold mb-2 text-white">Need Expert Help?</h3>
              <p className="text-teal-100/90 text-sm mb-6 max-w-md mx-auto leading-relaxed">Our advisors handle the entire process — disputes, lender follow-ups, score monitoring.</p>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white underline underline-offset-4 font-extrabold text-base hover:no-underline transition-all"><span>Free Consultation</span> <ArrowRight className="w-4 h-4 text-sky-300" /></Link>
                <CheckScoreButton variant="white" className="text-sm px-6 py-3 rounded-xl" />
              </div>
            </div>

            {/* Back to hub */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <Link to={`/${hubSlug}`} className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 text-sm font-bold transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to {hubTitle}
              </Link>
            </div>
          </article>

          {/* Sidebar — sibling spokes */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-900 mb-4 text-xs uppercase tracking-widest">More in {hubTitle}</h3>
              <div className="space-y-3">
                {siblings.map((s) => {
                  const isActive = s.slug === spokeSlug;
                  return (
                    <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                      className={`block p-3.5 rounded-2xl transition-all ${isActive ? "bg-teal-50 border border-teal-200" : "hover:bg-slate-50 border border-slate-100"}`}>
                      <p className={`text-xs font-bold ${isActive ? "text-teal-700" : "text-slate-800"}`}>{s.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{s.desc}</p>
                    </Link>
                  );
                })}
              </div>
              <Link to={`/${hubSlug}`} className="block mt-4 text-center text-xs text-teal-600 hover:underline font-bold">
                View complete {hubTitle} guide →
              </Link>
            </div>

            <div className="bg-gradient-to-tr from-amber-500/10 via-amber-50 to-amber-100/50 border border-amber-200/80 rounded-3xl p-6 text-center shadow-sm">
              <p className="font-extrabold text-slate-900 text-sm mb-3">Check Your CIBIL Score</p>
              <CheckScoreButton variant="primary" className="w-full justify-center text-xs py-3 font-bold rounded-xl" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
