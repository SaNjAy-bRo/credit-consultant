import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { useState } from "react";
import { Link } from "react-router";
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Financial Insights & Blogs</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Expert credit advice, CIBIL score tips and loan guides — sourced directly from India's trusted credit repair specialists at creditconsultant.in
          </p>
          <div className="mt-6">
            <Link
              to="/blogs/sitemap"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors border border-white/30"
            >
              <BookOpen className="w-4 h-4" /> View Blog Sitemap
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Featured post */}
        {featured && activeCategory === "All" && (
          <div className="mb-14">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Featured Article</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img src={featured.image} alt={featured.title} className="w-full h-72 lg:h-full object-cover" />
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400 bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-200">
                    ✓ From creditconsultant.in
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featured.title}</h2>
                <p className="text-gray-600 mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
                <Link to={`/blogs/${featured.slug}`}>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 w-fit">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? "bg-teal-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Source note */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-8 text-sm text-blue-700">
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span>All articles below are sourced from <strong>creditconsultant.in</strong> and structured for Google SEO best practices — E-E-A-T compliant, with FAQPage and Article schema markup.</span>
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="overflow-hidden">
                  <img src={post.image} alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                      <Tag className="w-3 h-3" />{post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    {(post as any).source && (
                      <span className="text-[10px] text-green-600 font-medium border border-green-200 bg-green-50 px-1.5 py-0.5 rounded-full">
                        ✓ CC.in
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-base leading-snug">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <Link to={`/blogs/${(post as any).slug ?? "#"}`}>
                      <button className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* FAQ CTA */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gradient-to-r from-teal-600 to-teal-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Have a Credit Question?</h3>
            <p className="text-teal-100 text-sm mb-5">Browse our 35+ expert-answered FAQs covering CIBIL, home loans, write-offs and more.</p>
            <Link to="/faq">
              <button className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                Browse All FAQs →
              </button>
            </Link>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Credit Score</h3>
            <p className="text-gray-500 text-sm mb-5">Get your free CIBIL score check and speak to an advisor about your credit profile.</p>
            <CheckScoreButton variant="primary" className="text-sm px-5 py-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

