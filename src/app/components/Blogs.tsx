'use client';

import { SEOHead, ORG_SCHEMA } from "./SEOHead";

import { useState } from "react";
import { Link } from "./routerShim";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Clock, Tag, ChevronRight, BookOpen } from "lucide-react";
import { CheckScoreButton } from "./CheckScoreModal";

/* ── Real posts sourced from creditconsultant.in ─────────────── */
const posts = [
  {
    id: 1,
    slug: "impact-of-cheque-bounce-on-cibil-score",
    title: "What Is The Impact Of Cheque Bounce On CIBIL Score?",
    excerpt: "Maintaining a good credit score is essential. Lenders rely on CIBIL scores to assess creditworthiness — and financial mishaps like a cheque bounce can have serious indirect consequences.",
    category: "CIBIL Score",
    readTime: "6 min read",
    date: "Oct 17, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: true,
    source: "creditconsultant.in",
  },
  {
    id: 2,
    slug: "cheque-bounce-affect-cibil",
    title: "Does Cheque Bounce Affect CIBIL? Debunking the Myths",
    excerpt: "Many Indians believe cheque bounce directly destroys their CIBIL score. We debunk the top myths and reveal what actually matters for your credit score.",
    category: "CIBIL Score",
    readTime: "5 min read",
    date: "Oct 17, 2024",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: false,
    source: "creditconsultant.in",
  },
  {
    id: 3,
    slug: "remov-write-off-from-cibil-report",
    title: "A Complete Guide For Removing Write-Off from Your CIBIL Report",
    excerpt: "A write-off on your CIBIL report can block you from getting any loan for years. Here is a complete step-by-step guide — including the new RBI 2025 Post Write-Off Closed rule.",
    category: "Credit Repair",
    readTime: "7 min read",
    date: "Nov 1, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: false,
    source: "creditconsultant.in",
  },
  {
    id: 4,
    slug: "demystifying-cash-credit-and-overdraft",
    title: "Demystifying Cash Credit and Overdraft: Understanding the Basics",
    excerpt: "Cash credit and overdraft are commonly used but often misunderstood banking terms. We clarify their definitions, functionalities, and key differences to help you make informed decisions.",
    category: "Business Finance",
    readTime: "6 min read",
    date: "Sep 4, 2024",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: false,
    source: "creditconsultant.in",
  },
  {
    id: 5,
    slug: "how-to-improve-cibil-score",
    title: "How to Improve Your CIBIL Score in 6 Months: Step-by-Step Guide",
    excerpt: "Your CIBIL score determines your loan eligibility and interest rate. With the right strategy, most people can improve their score by 80–150 points in just six months.",
    category: "CIBIL Score",
    readTime: "8 min read",
    date: "Feb 24, 2025",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: false,
    source: "creditconsultant.in",
  },
  {
    id: 6,
    slug: "debt-to-income-ratio",
    title: "Debt-to-Income Ratio (FOIR): Why It Can Reject Your Loan Despite a High CIBIL Score",
    excerpt: "A 780 CIBIL score and a loan rejection — it happens. The culprit is your FOIR. Learn how to calculate it and improve it before applying.",
    category: "Financial Planning",
    readTime: "5 min read",
    date: "Apr 20, 2026",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: false,
    source: "creditconsultant.in",
  },
];

const categories = ["All", "CIBIL Score", "Credit Repair", "Business Finance", "Financial Planning"];

const categoryColors: Record<string, string> = {
  "CIBIL Score":      "bg-teal-100 text-teal-700",
  "Credit Repair":    "bg-purple-100 text-purple-700",
  "Business Finance": "bg-indigo-100 text-indigo-700",
  "Financial Planning":"bg-green-100 text-green-700",
};

const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Credit Consultant Blog — Financial Insights & CIBIL Tips",
  "description": "Expert articles on CIBIL score repair, credit mistakes, write-offs, cash credit, overdraft and loan advisory from India's trusted credit consultant.",
  "url": "https://creditconsultant.in/blogs",
  "numberOfItems": posts.length,
  "itemListElement": posts.map((p, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "url": `https://creditconsultant.in/blogs/${p.slug}`,
    "name": p.title,
  })),
};

export function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = posts.find((p) => p.featured);
  const filtered = activeCategory === "All"
    ? posts.filter((p) => !p.featured)
    : posts.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <div className="w-full">
      <SEOHead
        title="Blog — CIBIL Score Tips, Credit Repair & Loan Guides | Credit Consultant"
        description="Expert articles on improving your CIBIL score, removing write-offs, understanding cheque bounce impact, cash credit vs overdraft, and loan advisory guides for India."
        keywords="CIBIL score blog India, credit repair articles, cheque bounce CIBIL, write-off CIBIL report, cash credit overdraft India"
        ogType="article"
        schema={[ORG_SCHEMA, listSchema]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Financial Insights
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight">Financial Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Blogs</span></h1>
          <p className="text-base lg:text-xl text-teal-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Expert credit advice, CIBIL score tips and loan guides — sourced directly from India's trusted credit repair specialists at creditconsultant.in
          </p>
          <div className="mt-8">
            <Link
              to="/blogs/sitemap"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all border border-white/20 backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-teal-300" /> View Blog Sitemap
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70">

        {/* Featured post */}
        {featured && activeCategory === "All" && (
          <div className="mb-16">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">Featured Article</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white group hover:shadow-2xl transition-all duration-300">
              <div className="overflow-hidden h-72 lg:h-full">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${categoryColors[featured.category] ?? "bg-slate-100 text-slate-700"}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                    ✓ From creditconsultant.in
                  </span>
                </div>
                <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight group-hover:text-teal-700 transition-colors">{featured.title}</h2>
                <p className="text-slate-600 mb-6 text-base leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-8">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-teal-600" /> {featured.readTime}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>
                <Link to={`/blogs/${featured.slug}`}>
                  <button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all flex items-center gap-2 w-fit shadow-lg shadow-teal-600/30">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2.5 mb-10 justify-center sm:justify-start">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 scale-105" 
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Source note */}
        <div className="flex items-center gap-3 bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 mb-10 text-sm text-teal-900 font-medium shadow-sm">
          <BookOpen className="w-5 h-5 text-teal-600 flex-shrink-0" />
          <span>All articles below are sourced from <strong>creditconsultant.in</strong> and structured for Google SEO best practices — E-E-A-T compliant, with FAQPage and Article schema markup.</span>
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <p className="text-slate-400 text-center py-12 text-base">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Card key={post.id} className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="overflow-hidden h-52">
                    <img src={post.image} alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardHeader className="p-6 pb-3">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${categoryColors[post.category] ?? "bg-slate-100 text-slate-700"}`}>
                        <Tag className="w-3 h-3" />{post.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-teal-600" /> {post.readTime}
                      </span>
                      {(post as any).source && (
                        <span className="text-[10px] text-emerald-700 font-extrabold border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded-full">
                          ✓ CC.in
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                </div>
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-auto">
                  <span className="text-xs text-slate-400 font-medium pt-3">{post.date}</span>
                  <Link to={`/blogs/${(post as any).slug ?? "#"}`} className="pt-3">
                    <button className="text-sm text-teal-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* FAQ CTA */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
            <h3 className="text-2xl font-extrabold mb-2 text-white">Have a Credit Question?</h3>
            <p className="text-teal-100/90 text-sm mb-6 leading-relaxed">Browse our 35+ expert-answered FAQs covering CIBIL, home loans, write-offs and more.</p>
            <Link to="/faq">
              <button className="bg-white text-teal-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                Browse All FAQs →
              </button>
            </Link>
          </div>
          <div className="bg-gradient-to-tr from-amber-500/10 via-amber-50 to-amber-100/50 border border-amber-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Check Your Credit Score</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">Get your free CIBIL score check and speak to an advisor about your credit profile.</p>
            </div>
            <CheckScoreButton variant="primary" className="text-sm font-bold px-6 py-3 rounded-xl w-fit" />
          </div>
        </div>
      </div>
    </div>
  );
}

