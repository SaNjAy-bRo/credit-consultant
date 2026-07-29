'use client';

import { Link } from "./routerShim";
import { BookOpen, Clock, Calendar, Tag, ChevronRight, FileText, Globe, TrendingUp, RefreshCw } from "lucide-react";
import { BLOG_POSTS } from "./BlogPost";

const BASE_URL = "https://creditconsultant.in";

/* ── Category metadata ─────────────────────────────────────── */
const CATEGORY_META: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  "CIBIL Score":       { color: "text-blue-700",   bg: "bg-blue-50",   border: "border-teal-200",   dot: "bg-blue-500" },
  "Credit Repair":     { color: "text-purple-700",  bg: "bg-purple-50", border: "border-purple-200", dot: "bg-purple-500" },
  "Business Finance":  { color: "text-emerald-700", bg: "bg-emerald-50",border: "border-emerald-200",dot: "bg-emerald-500" },
  "Financial Planning":{ color: "text-amber-700",   bg: "bg-amber-50",  border: "border-amber-200",  dot: "bg-amber-500" },
};

const fallbackMeta = { color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200", dot: "bg-gray-400" };

/* ── Derived data ──────────────────────────────────────────── */
const allPosts = Object.values(BLOG_POSTS);
const totalWords = allPosts.reduce((s, p) => s + p.wordCount, 0);

// Group by category
const byCategory = allPosts.reduce<Record<string, typeof allPosts>>((acc, post) => {
  if (!acc[post.category]) acc[post.category] = [];
  acc[post.category].push(post);
  return acc;
}, {});

// Most recently updated
const recentlyUpdated = [...allPosts]
  .sort((a, b) => b.updateDate.localeCompare(a.updateDate))
  .slice(0, 3);

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogSitemap() {
  const categories = Object.keys(byCategory);

  return (
    <div className="w-full">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-indigo-200 text-sm mb-4 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Sitemap</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Blog &amp; Article Sitemap</h1>
          <p className="text-indigo-100 max-w-2xl text-base">
            Complete index of all credit advisory articles on creditconsultant.in — organised by category,
            structured for Google News, and updated regularly with E-E-A-T signals.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mt-7">
            {[
              { icon: BookOpen,   label: `${allPosts.length} Articles` },
              { icon: Tag,        label: `${categories.length} Categories` },
              { icon: TrendingUp, label: `${totalWords.toLocaleString()}+ Words` },
              { icon: RefreshCw,  label: "Updated June 2026" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full text-sm">
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── All Articles — master table ───────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            All Articles
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-5 py-3.5 font-semibold text-gray-600 w-10">#</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600">Article Title</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Published</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">Updated</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden sm:table-cell">Read Time</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600 hidden xl:table-cell">Words</th>
                  <th className="px-5 py-3.5 font-semibold text-gray-600">URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allPosts.map((post, i) => {
                  const meta = CATEGORY_META[post.category] ?? fallbackMeta;
                  return (
                    <tr key={post.slug} className="hover:bg-indigo-50/40 transition-colors group">
                      <td className="px-5 py-4 text-gray-400 font-mono">{String(i + 1).padStart(2, "0")}</td>
                      <td className="px-5 py-4 max-w-xs">
                        <Link
                          to={`/blogs/${post.slug}`}
                          className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors leading-snug line-clamp-2"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${meta.bg} ${meta.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          {post.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs whitespace-nowrap">
                        {fmtDate(post.publishDate)}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-gray-500 text-xs whitespace-nowrap">
                        {fmtDate(post.updateDate)}
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell text-gray-500 text-xs whitespace-nowrap">
                        {post.readTime}
                      </td>
                      <td className="px-5 py-4 hidden xl:table-cell text-gray-500 text-xs font-mono">
                        {post.wordCount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          to={`/blogs/${post.slug}`}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium whitespace-nowrap"
                          aria-label={`Read: ${post.title}`}
                        >
                          Read <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── By Category ───────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" />
            Articles by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => {
              const posts = byCategory[cat];
              const meta = CATEGORY_META[cat] ?? fallbackMeta;
              return (
                <div key={cat} className={`rounded-2xl border ${meta.border} overflow-hidden`}>
                  {/* Category header */}
                  <div className={`${meta.bg} px-5 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                      <h3 className={`font-bold text-base ${meta.color}`}>{cat}</h3>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/60 ${meta.color}`}>
                      {posts.length} {posts.length === 1 ? "article" : "articles"}
                    </span>
                  </div>

                  {/* Posts list */}
                  <div className="divide-y divide-gray-100 bg-white">
                    {posts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blogs/${post.slug}`}
                        className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                      >
                        <BookOpen className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 mt-0.5 flex-shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 transition-colors leading-snug">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDate(post.updateDate)}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 flex-shrink-0 ml-auto mt-0.5 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Recently Updated ──────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
            Recently Updated
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentlyUpdated.map((post) => {
              const meta = CATEGORY_META[post.category] ?? fallbackMeta;
              return (
                <Link
                  key={post.slug}
                  to={`/blogs/${post.slug}`}
                  className="rounded-2xl border border-gray-100 hover:border-indigo-300 hover:shadow-md p-5 transition-all group bg-white"
                >
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${meta.bg} ${meta.color} mb-3`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                    {post.category}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 leading-snug transition-colors mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" />Updated {fmtDate(post.updateDate)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── URL List for crawlers ─────────────────────────── */}
        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            Canonical URLs — All Blog Posts
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            All articles use canonical tags and are included in the XML sitemap at{" "}
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-mono">
              {BASE_URL}/sitemap.xml
            </a>
          </p>
          <div className="space-y-1.5">
            {allPosts.map((post) => (
              <div key={post.slug} className="flex items-center gap-3 text-sm font-mono text-gray-600 bg-white border border-gray-100 rounded-lg px-4 py-2 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group">
                <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">›</span>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="text-indigo-600 hover:underline truncate text-xs"
                >
                  {BASE_URL}/blogs/{post.slug}
                </Link>
                <span className="ml-auto text-[10px] text-gray-400 hidden sm:block whitespace-nowrap">{post.readTime}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <FileText className="w-4 h-4" /> View XML Sitemap
            </a>
            <Link
              to="/sitemap"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Globe className="w-4 h-4" /> Full Site Sitemap
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
