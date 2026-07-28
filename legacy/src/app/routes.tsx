import { createBrowserRouter, Navigate, useParams } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { LoanProducts } from "./components/LoanProducts";
import { Blogs } from "./components/Blogs";
import { BlogPost } from "./components/BlogPost";
import { FAQPage } from "./components/FAQPage";
import { Calculator } from "./components/Calculator";
import { AdminDashboard } from "./components/AdminDashboard";
import { UserDashboard } from "./components/UserDashboard";
import { CityPage } from "./components/CityPage";
import { Sitemap } from "./components/Sitemap";
import { BlogSitemap } from "./components/BlogSitemap";
import { NotFound } from "./components/NotFound";

// Topic Hub + Spoke pages
import { CibilScoreHubPage, CibilScoreSpokePage } from "./components/CibilScoreHub";
import { CreditRepairHubPage, CreditRepairSpokePage } from "./components/CreditRepairHub";

// Individual Hub + Regional + City pages
import {
  IndividualMainHub, IndividualRegionHub, IndividualCityPage,
} from "./components/IndividualHub";

// Commercial Hub + Regional + City pages
import {
  CommercialMainHub, CommercialRegionHub, CommercialCityPage,
} from "./components/CommercialHub";

/* ── 301-style redirect shims for old nested city URLs ─────── */
function IndividualCityRedirect() {
  const { city } = useParams<{ city: string }>();
  return <Navigate to={`/credit-report-repair-agency/${city}`} replace />;
}

function CommercialCityRedirect() {
  const { city } = useParams<{ city: string }>();
  return <Navigate to={`/company-credit-information-report/${city}`} replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // ── Core pages ───────────────────────────────────────
      { index: true,              Component: Home },
      { path: "services",         Component: Services },
      { path: "about",            Component: About },
      { path: "contact",          Component: Contact },
      { path: "calculator",       Component: Calculator },
      { path: "faq",              Component: FAQPage },
      { path: "sitemap",          Component: Sitemap },

      // ── Loans hub ────────────────────────────────────────
      { path: "loans",            Component: LoanProducts },

      // ── Blog hub + spokes ────────────────────────────────
      { path: "blogs",            Component: Blogs },
      { path: "blogs/sitemap",    Component: BlogSitemap },
      { path: "blogs/:slug",      Component: BlogPost },

      // ── Topic Hub 1: CIBIL Score ─────────────────────────
      { path: "cibil-score",           Component: CibilScoreHubPage },
      { path: "cibil-score/:topic",    Component: CibilScoreSpokePage },

      // ── Topic Hub 2: Credit Repair ───────────────────────
      { path: "credit-repair",         Component: CreditRepairHubPage },
      { path: "credit-repair/:topic",  Component: CreditRepairSpokePage },

      // ══ SERVICE HUB 1: INDIVIDUAL ════════════════════════
      { path: "individual",            Component: IndividualMainHub },
      { path: "individual/:region",    Component: IndividualRegionHub },
      // New SEO-friendly flat city URL
      { path: "credit-report-repair-agency/:city", Component: IndividualCityPage },
      // Old nested URL → 301 redirect to new flat URL
      { path: "individual/:region/:city",          Component: IndividualCityRedirect },

      // ══ SERVICE HUB 2: COMMERCIAL ════════════════════════
      { path: "commercial",            Component: CommercialMainHub },
      { path: "commercial/:region",    Component: CommercialRegionHub },
      // New SEO-friendly flat city URL
      { path: "company-credit-information-report/:city", Component: CommercialCityPage },
      // Old nested URL → 301 redirect to new flat URL
      { path: "commercial/:region/:city",                Component: CommercialCityRedirect },

      // ── Legacy root city spokes (/:city) ─────────────────
      { path: ":city",            Component: CityPage },
      { path: "*",                Component: NotFound },
    ],
  },
  // Standalone dashboards
  { path: "/admin",     Component: AdminDashboard },
  { path: "/dashboard", Component: UserDashboard  },
]);
