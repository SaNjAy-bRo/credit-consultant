import { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { TrendingUp } from "lucide-react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ORG_SCHEMA } from "./SEOHead";
import { CheckScoreModal } from "./CheckScoreModal";

/**
 * ScrollToTop helper component: ensures every route change instantly scrolls
 * the browser window and document container to top (0, 0)
 */
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
}

function injectBaseHeadTags() {
  // Viewport
  if (!document.querySelector('meta[name="viewport"]')) {
    const vp = document.createElement("meta");
    vp.name = "viewport"; vp.content = "width=device-width, initial-scale=1";
    document.head.appendChild(vp);
  }
  // Charset
  if (!document.querySelector('meta[charset]')) {
    const cs = document.createElement("meta");
    cs.setAttribute("charset", "UTF-8");
    document.head.prepend(cs);
  }
  // Theme color
  if (!document.querySelector('meta[name="theme-color"]')) {
    const tc = document.createElement("meta");
    tc.name = "theme-color"; tc.content = "#2563eb";
    document.head.appendChild(tc);
  }
  // Author
  if (!document.querySelector('meta[name="author"]')) {
    const au = document.createElement("meta");
    au.name = "author"; au.content = "Credit Consultant India";
    document.head.appendChild(au);
  }
  // Geo tags (India)
  [
    { name: "geo.region",      content: "IN" },
    { name: "geo.placename",   content: "Bengaluru, Karnataka, India" },
    { name: "geo.position",    content: "12.9279;77.5837" },
    { name: "ICBM",            content: "12.9279, 77.5837" },
    { name: "language",        content: "English" },
    { name: "revisit-after",   content: "7 days" },
  ].forEach(({ name, content }) => {
    if (!document.querySelector(`meta[name="${name}"]`)) {
      const el = document.createElement("meta");
      el.name = name; el.content = content;
      document.head.appendChild(el);
    }
  });
  // Preconnect to critical origins
  ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].forEach((href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const l = document.createElement("link");
      l.rel = "preconnect"; l.href = href;
      document.head.appendChild(l);
    }
  });
  // Global org schema
  if (!document.getElementById("org-schema")) {
    const s = document.createElement("script");
    s.id = "org-schema"; s.type = "application/ld+json";
    s.textContent = JSON.stringify(ORG_SCHEMA);
    document.head.appendChild(s);
  }
}

export function Root() {
  const [scoreModalOpen, setScoreModalOpen] = useState(false);

  useEffect(() => { injectBaseHeadTags(); }, []);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden pb-16 sm:pb-0">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />

      {/* Floating Bottom Sticky Bar Card */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-full p-2 px-3 sm:px-4 flex items-center gap-2 sm:gap-3 max-w-[95vw] sm:max-w-max transition-all duration-300"
        style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      >
        <button
          onClick={() => setScoreModalOpen(true)}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-slate-950 font-black px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 border border-amber-300/40"
        >
          <TrendingUp className="w-4.5 h-4.5 text-slate-950" />
          <span>Boost your Score</span>
        </button>

        <a
          href="https://wa.me/919538049888?text=Hi%2C%20I%20need%20help%20with%20my%20CIBIL%20score"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Us on WhatsApp"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
        >
          <svg viewBox="0 0 32 32" className="w-4.5 h-4.5 fill-slate-950 flex-shrink-0">
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.64 4.73 1.76 6.72L2 30l7.5-1.73C11.38 29.38 13.64 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.18 19.54c-.3.84-1.77 1.6-2.44 1.7-.62.1-1.4.14-2.26-.14-.52-.17-1.19-.4-2.05-.78-3.6-1.56-5.94-5.18-6.12-6.12-5.42-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.62 1.25-2.98.3-.33.66-.41.88-.41.22 0 .44.002.63.01.2.01.48-.08.75.57.3.69 1.01 2.46 1.1 2.64.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.38-.16.74.21.36.95 1.57 2.05 2.54 1.41 1.26 2.6 1.65 2.97 1.84.37.18.58.15.8-.09.21-.24.92-1.07 1.16-1.44.24-.37.48-.3.8-.18.32.12 2.05.97 2.4 1.14.35.18.58.27.67.42.09.15.09.87-.21 1.71z"/>
          </svg>
          <span>Chat with Us</span>
        </a>
      </div>

      <CheckScoreModal open={scoreModalOpen} onClose={() => setScoreModalOpen(false)} />
    </div>
  );
}
