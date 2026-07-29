'use client';

import { useEffect } from "react";

import { useLocation } from "./routerShim";

const BASE_URL = "https://creditconsultant.in";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = "Credit Consultant";
const DEFAULT_DESCRIPTION =
  "India's trusted credit repair and loan advisory service. Improve your CIBIL score, get the best home, business and personal loan deals. Free consultation. 10,000+ happy clients.";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  schema?: object | object[];
  keywords?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setSchema(schema: object | object[]) {
  const existing = document.getElementById("seo-schema");
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.id = "seo-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
  document.head.appendChild(script);
}

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noIndex = false,
  schema,
  keywords,
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = canonical ?? `${BASE_URL}${location.pathname}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Basic meta
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("googlebot", noIndex ? "noindex" : "index, follow");

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("og:type",        ogType,         "property");
    setMeta("og:title",       fullTitle,       "property");
    setMeta("og:description", description,     "property");
    setMeta("og:url",         canonicalUrl,    "property");
    setMeta("og:image",       ogImage,         "property");
    setMeta("og:site_name",   SITE_NAME,       "property");
    setMeta("og:locale",      "en_IN",         "property");

    // Twitter Card
    setMeta("twitter:card",        "summary_large_image");
    setMeta("twitter:title",       fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image",       ogImage);

    // Schema
    if (schema) setSchema(schema);

    // Cleanup on unmount — restore defaults
    return () => {
      document.title = `${SITE_NAME} — Live Life Debt Free`;
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noIndex, schema, keywords]);

  return null;
}

/* ── Org schema (used on every page) ───────────────────────── */
export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${BASE_URL}/#organization`,
  "name": "Credit Consultant",
  "alternateName": "creditconsultant.in",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "description": DEFAULT_DESCRIPTION,
  "telephone": "+919538049888",
  "email": "accounts@creditconsultant.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "184, 15, 5th Main Rd, near police station, 4th Block, Jayanagar",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560011",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.9279",
    "longitude": "77.5837",
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" },
  ],
  "areaServed": { "@type": "Country", "name": "India" },
  "serviceType": ["Credit Repair", "CIBIL Score Improvement", "Loan Advisory", "Debt Management"],
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.facebook.com/creditconsultant",
    "https://www.linkedin.com/company/creditconsultant",
    "https://twitter.com/creditconsultIN",
  ],
};

/* ── FAQ schema builder ─────────────────────────────────────── */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
}

/* ── Breadcrumb schema ──────────────────────────────────────── */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": `${BASE_URL}${c.path}`,
    })),
  };
}
