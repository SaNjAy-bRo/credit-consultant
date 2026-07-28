/**
 * Hub-and-Spoke Architecture — Spoke Page Template
 * Each spoke covers one specific subtopic and links back to its hub + sibling spokes.
 */
import { Link } from "react-router";
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
      <section className={`bg-gradient-to-r ${col.hero} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-teal-200 text-sm mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/${hubSlug}`} className="hover:text-white transition-colors">{hubTitle}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium truncate">{title}</span>
          </nav>
          <span className={`inline-block bg-white/20 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
            {category}
          </span>
          <h1 className="text-3xl lg:text-4xl font-black leading-tight max-w-3xl">{headline}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-teal-200">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> Credit Consultant Advisors</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {readTime}</span>
            <span>Updated {new Date(updatedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </section>

      {/* Spoke sub-nav — sibling spoke links */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-1">
            <Link to={`/${hubSlug}`}
              className="flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-teal-600 hover:border-teal-300 transition-all">
              ← {hubTitle}
            </Link>
            {siblings.map((s) => {
              const isActive = s.slug === spokeSlug;
              return (
                <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive ? "border-teal-600 text-teal-600" : "border-transparent text-gray-600 hover:text-teal-600 hover:border-teal-300"
                  }`}>
                  {s.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main article */}
          <article className="lg:col-span-2 space-y-8">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">{intro}</p>

            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.heading}</h2>
                <div className="text-gray-700 text-sm leading-relaxed space-y-3">{s.body}</div>
              </div>
            ))}

            {/* Key Takeaways box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">✓</span>
                Key Takeaways
              </h3>
              <ul className="space-y-2.5">
                {keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800 text-sm">{t}</span>
                  </li>
                ))}
              </ul>
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
                    <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={`bg-gradient-to-r ${col.hero} rounded-2xl p-8 text-white text-center`}>
              <h3 className="text-xl font-bold mb-2">Need Expert Help?</h3>
              <p className="text-teal-100 text-sm mb-5">Our advisors handle the entire process — disputes, lender follow-ups, score monitoring.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact"><button className="bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">Free Consultation</button></Link>
                <CheckScoreButton variant="white" className="text-sm px-5 py-2.5" />
              </div>
            </div>

            {/* Back to hub */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Link to={`/${hubSlug}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to {hubTitle}
              </Link>
            </div>
          </article>

          {/* Sidebar — sibling spokes */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">More in {hubTitle}</h3>
              <div className="space-y-3">
                {siblings.map((s) => {
                  const isActive = s.slug === spokeSlug;
                  return (
                    <Link key={s.slug} to={`/${hubSlug}/${s.slug}`}
                      className={`block p-3 rounded-xl transition-all ${isActive ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"}`}>
                      <p className={`text-sm font-semibold ${isActive ? "text-blue-700" : "text-gray-800"}`}>{s.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{s.desc}</p>
                    </Link>
                  );
                })}
              </div>
              <Link to={`/${hubSlug}`} className="block mt-3 text-center text-xs text-blue-600 hover:underline font-medium">
                View complete {hubTitle} guide →
              </Link>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
              <p className="font-semibold text-gray-800 text-sm mb-3">Check Your CIBIL Score</p>
              <CheckScoreButton variant="primary" className="w-full justify-center text-sm py-2.5" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
