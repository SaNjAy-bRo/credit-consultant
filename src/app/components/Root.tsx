import { useEffect } from "react";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ORG_SCHEMA } from "./SEOHead";

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
  useEffect(() => { injectBaseHeadTags(); }, []);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navigation />
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919538049888?text=Hi%2C%20I%20need%20help%20with%20my%20CIBIL%20score"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Credit Consultant on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2"
      >
        <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg">
          Chat with Expert
        </span>
        <div className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center animate-pulse-slow"
          style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.64 4.73 1.76 6.72L2 30l7.5-1.73C11.38 29.38 13.64 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.18 19.54c-.3.84-1.77 1.6-2.44 1.7-.62.1-1.4.14-2.26-.14-.52-.17-1.19-.4-2.05-.78-3.6-1.56-5.94-5.18-6.12-5.42-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.62 1.25-2.98.3-.33.66-.41.88-.41.22 0 .44.002.63.01.2.01.48-.08.75.57.3.69 1.01 2.46 1.1 2.64.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.38-.16.74.21.36.95 1.57 2.05 2.54 1.41 1.26 2.6 1.65 2.97 1.84.37.18.58.15.8-.09.21-.24.92-1.07 1.16-1.44.24-.37.48-.3.8-.18.32.12 2.05.97 2.4 1.14.35.18.58.27.67.42.09.15.09.87-.21 1.71z"/>
          </svg>
        </div>
      </a>
    </div>
  );
}
