import { useEffect, useState } from "react";
import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  TrendingUp,
  Shield,
  UserCheck,
  Award,
  CheckCircle,
  ArrowRight,
  BarChart,
  FileText,
  Home as HomeIcon,
  Briefcase,
  User,
  Car,
  Star,
  Zap,
  Calculator,
  ShieldCheck,
  Lock,
  Building2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckScoreButton } from "./CheckScoreModal";
import { HowItWorks } from "./HowItWorks";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

/* ── Animated score counter ─────────────────────────────────── */
function ScoreRing({ target = 780 }: { target?: number }) {
  const [count, setCount] = useState(300);
  useEffect(() => {
    let start = 300;
    const step = () => {
      start += 4;
      if (start >= target) { setCount(target); return; }
      setCount(start);
      requestAnimationFrame(step);
    };
    const id = setTimeout(() => requestAnimationFrame(step), 600);
    return () => clearTimeout(id);
  }, [target]);

  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const pct = (count - 300) / (850 - 300);
  const dash = circ * pct;
  const color = count < 580 ? "#f97316" : count < 700 ? "#2563eb" : "#16a34a";

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#dbeafe" strokeWidth="10" />
        <circle
          cx="72" cy="72" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.05s linear, stroke 0.5s" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-3xl font-black text-slate-900 tabular-nums">{count}</div>
        <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">CIBIL Score</div>
      </div>
    </div>
  );
}

/* ── Floating 3-D card ───────────────────────────────────────── */
function FloatCard({
  children, delay = "0s", className = "",
}: { children: React.ReactNode; delay?: string; className?: string }) {
  return (
    <div
      className={`animate-float backdrop-blur-xl bg-white/90 border border-white/90 rounded-2xl shadow-xl shadow-blue-900/5 ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

/* ── Rising bar chart (pure CSS + SVG grid) ─────────────── */
function BarChart3D() {
  const bars = [
    { height: "38%", score: "600", label: "Q1", color: "from-blue-500 to-blue-600" },
    { height: "50%", score: "640", label: "Q2", color: "from-sky-400 to-blue-500" },
    { height: "45%", score: "630", label: "Q3", color: "from-indigo-400 to-blue-600" },
    { height: "70%", score: "700", label: "Q4", color: "from-blue-600 to-indigo-600" },
    { height: "85%", score: "740", label: "Q5", color: "from-emerald-500 to-teal-600" },
    { height: "98%", score: "780", label: "Q6", color: "from-amber-400 to-orange-500" },
  ];
  return (
    <div className="relative w-full">
      {/* Background grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-30 pointer-events-none mb-5">
        <div className="w-full border-b border-dashed border-slate-200" />
        <div className="w-full border-b border-dashed border-slate-200" />
        <div className="w-full border-b border-dashed border-slate-200" />
      </div>

      <div className="flex items-end gap-1.5 h-28 px-0.5 relative z-10 pt-2">
        {bars.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end group">
            <span className="text-[9px] font-bold text-blue-700 group-hover:text-blue-900 transition-colors">
              {b.score}
            </span>
            <div className="w-full bg-slate-100 rounded-t-md overflow-hidden p-0.5 flex items-end h-full max-h-[75px]">
              <div
                className={`w-full rounded-t-sm bg-gradient-to-t ${b.color} shadow-md shadow-blue-500/20 transition-all duration-700 hover:brightness-110`}
                style={{
                  height: b.height,
                  animation: `rise 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1 + 0.2}s both`,
                  transformOrigin: "bottom",
                }}
              />
            </div>
            <span className="text-[9px] font-medium text-slate-500 uppercase">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Particle dots ───────────────────────────────────────────── */
function Particles() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-particle"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Home() {
  const services = [
    {
      icon: TrendingUp,
      title: "Credit Repair",
      description: "Remove negative items and improve your credit score with our proven strategies.",
    },
    {
      icon: BarChart,
      title: "Credit Analysis",
      description: "Comprehensive analysis of your credit report with actionable insights.",
    },
    {
      icon: FileText,
      title: "Debt Management",
      description: "Strategic debt consolidation and management plans tailored to your needs.",
    },
    {
      icon: Shield,
      title: "Identity Protection",
      description: "Monitor and protect your credit from fraud and identity theft.",
    },
    {
      icon: UserCheck,
      title: "Credit Education",
      description: "Learn the best practices to maintain and improve your credit score.",
    },
    {
      icon: Award,
      title: "Financial Planning",
      description: "Expert guidance on building a strong financial future.",
    },
  ];

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "10,000+", label: "Happy Clients" },
    { value: "98%", label: "Success Rate" },
    { value: "₹500Cr+", label: "Loans Facilitated" },
    { value: "+150 pts", label: "Avg Score Gain" },
    { value: "4.9", label: "Google Rating", isStar: true },
  ];

  const bankLogos = [
    {
      name: "SBI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/State_Bank_of_India_logo.svg/512px-State_Bank_of_India_logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48"><rect width="160" height="48" rx="8" fill="%23FFFFFF"/><circle cx="24" cy="24" r="14" fill="%230084ca"/><circle cx="24" cy="19" r="4.5" fill="%23FFFFFF"/><rect x="22.5" y="19" width="3" height="11" fill="%23FFFFFF"/><text x="48" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="20" fill="%230084ca">SBI</text></svg>`,
    },
    {
      name: "HDFC Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/512px-HDFC_Bank_Logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 48"><rect width="190" height="48" rx="8" fill="%23FFFFFF"/><rect x="8" y="9" width="30" height="30" fill="%23004C8F"/><rect x="16" y="17" width="14" height="14" fill="%23ED232A"/><rect x="20" y="9" width="6" height="30" fill="%23FFFFFF"/><rect x="8" y="21" width="30" height="6" fill="%23FFFFFF"/><text x="46" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%23004C8F">HDFC BANK</text></svg>`,
    },
    {
      name: "ICICI Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/512px-ICICI_Bank_Logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 48"><rect width="190" height="48" rx="8" fill="%23FFFFFF"/><circle cx="24" cy="24" r="14" fill="%23F37021"/><text x="24" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%23052F5F" text-anchor="middle">i</text><text x="46" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%23052F5F">ICICI Bank</text></svg>`,
    },
    {
      name: "Axis Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/512px-Axis_Bank_logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48"><rect width="180" height="48" rx="8" fill="%23FFFFFF"/><polygon points="10,38 24,10 38,38" fill="%2397144D"/><text x="46" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%2397144D">AXIS BANK</text></svg>`,
    },
    {
      name: "Kotak Mahindra Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Kotak_Mahindra_Bank_logo.svg/512px-Kotak_Mahindra_Bank_logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48"><rect width="210" height="48" rx="8" fill="%23FFFFFF"/><rect x="8" y="9" width="30" height="30" rx="6" fill="%23ED1C24"/><text x="23" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="20" fill="%23FFFFFF" text-anchor="middle">k</text><text x="46" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="20" fill="%23ED1C24">kotak</text></svg>`,
    },
    {
      name: "Bajaj Finserv",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bajaj_Finserv_Logo.svg/512px-Bajaj_Finserv_Logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48"><rect width="210" height="48" rx="8" fill="%23FFFFFF"/><rect x="8" y="9" width="30" height="30" rx="6" fill="%2300529B"/><text x="23" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="20" fill="%23FFFFFF" text-anchor="middle">B</text><text x="46" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="16" fill="%2300529B">BAJAJ FINSERV</text></svg>`,
    },
    {
      name: "IDFC FIRST Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/IDFC_FIRST_Bank_logo.svg/512px-IDFC_FIRST_Bank_logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48"><rect width="210" height="48" rx="8" fill="%23FFFFFF"/><rect x="8" y="9" width="30" height="30" rx="6" fill="%23991B1E"/><text x="23" y="29" font-family="system-ui,sans-serif" font-weight="900" font-size="13" fill="%23FFFFFF" text-anchor="middle">IDFC</text><text x="46" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="16" fill="%23991B1E">IDFC FIRST</text></svg>`,
    },
    {
      name: "YES BANK",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Yes_Bank_Logo.svg/512px-Yes_Bank_Logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48"><rect width="180" height="48" rx="8" fill="%23FFFFFF"/><rect x="8" y="9" width="30" height="30" rx="6" fill="%23004B87"/><text x="23" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%23ED1C24" text-anchor="middle">Y</text><text x="46" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%23004B87">YES BANK</text></svg>`,
    },
    {
      name: "PNB",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Punjab_National_Bank_Logo.svg/512px-Punjab_National_Bank_Logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 48"><rect width="160" height="48" rx="8" fill="%23FFFFFF"/><circle cx="24" cy="24" r="14" fill="%23A02020"/><text x="24" y="30" font-family="system-ui,sans-serif" font-weight="900" font-size="14" fill="%23F5B800" text-anchor="middle">pnb</text><text x="46" y="32" font-family="system-ui,sans-serif" font-weight="900" font-size="20" fill="%23A02020">PNB</text></svg>`,
    },
    {
      name: "Bank of Baroda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Bank_of_Baroda_Logo.svg/512px-Bank_of_Baroda_Logo.svg.png",
      fallbackSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48"><rect width="210" height="48" rx="8" fill="%23FFFFFF"/><circle cx="24" cy="24" r="14" fill="%23F26522"/><text x="24" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="18" fill="%23FFFFFF" text-anchor="middle">B</text><text x="46" y="31" font-family="system-ui,sans-serif" font-weight="900" font-size="16" fill="%23F26522">Bank of Baroda</text></svg>`,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "Credit Consultant helped me improve my credit score by 150 points in just 6 months. Highly recommended!",
      image: "https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGJ1c2luZXNzJTIwY29uc3VsdGFudHxlbnwxfHx8fDE3NzQ4Nzg4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content: "Professional service and excellent results. They made the credit repair process so easy and stress-free.",
      image: "https://images.unsplash.com/photo-1739298061766-e2751d92e9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzQ4MzkxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Amit Patel",
      role: "Entrepreneur",
      content: "Their expertise in credit management is unmatched. Thanks to them, I secured a business loan with great terms.",
      image: "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzQ4NjQ1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const benefits = [
    "Free credit consultation",
    "Personalized credit repair plan",
    "Expert credit counseling",
    "No upfront fees",
    "Money-back guarantee",
    "24/7 customer support",
  ];

  return (
    <div className="w-full">
      <SEOHead
        title="Credit Consultant India — CIBIL Score Repair & Loan Advisory"
        description="India's #1 credit repair and loan advisory service. Improve your CIBIL score by 100–200 points. Get the best home, business and personal loan deals. Free consultation. 10,000+ happy clients across India."
        keywords="credit repair India, CIBIL score improvement, credit consultant, home loan advisory, personal loan, business loan, debt management"
        schema={ORG_SCHEMA}
      />
      {/* ── Hero Section — Light Blue & Dominant White ───────────────────── */}
      <section
        className="relative overflow-hidden w-full max-w-full text-slate-900"
        style={{ minHeight: "92vh", background: "linear-gradient(180deg, #ffffff 0%, #fafcff 60%, #f0f7ff 100%)" }}
        aria-label="Credit Consultant — India's trusted credit repair and loan advisory service"
      >
        {/* Strictly clipped background container for decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none w-full max-w-full">
          {/* Animated mesh blobs — ultra-soft royal blue & sky blue */}
          <div className="absolute -top-40 -left-40 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full opacity-10 blur-3xl animate-blob"
            style={{ background: "radial-gradient(circle, #bfdbfe 0%, #3b82f6 100%)" }} />
          <div className="absolute -bottom-40 -right-40 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full opacity-10 blur-3xl animate-blob"
            style={{ background: "radial-gradient(circle, #bae6fd 0%, #0284c7 100%)", animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[400px] h-72 sm:h-[400px] rounded-full opacity-5 blur-3xl animate-blob"
            style={{ background: "radial-gradient(circle, #c7d2fe 0%, #6366f1 100%)", animationDelay: "6s" }} />

          {/* Particle field */}
          <Particles />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(37,99,235,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.05) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-12 py-12 sm:py-16 lg:py-0 lg:min-h-[92vh]">

          {/* LEFT — copy */}
          <div className="flex-1 text-center lg:text-left w-full max-w-2xl lg:max-w-none mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-5 sm:mb-6 text-slate-800 tracking-tight">
              <span className="font-normal text-slate-700">Transform Your</span>{" "}
              <span className="relative inline-block">
                <span className="font-black text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg,#1d4ed8 0%,#2563eb 50%,#31b0d0 100%)" }}>
                  Credit Score
                </span>
              </span>{" "}
              <span className="block sm:inline font-normal text-slate-700 mt-1 sm:mt-0">&amp; Financial Future</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-[22px] mb-6 sm:mb-8 text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Expert credit repair, CIBIL score improvement, and home &amp; business loan advisory services.
              Over 10,000 happy clients across India.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg"
                  className="w-full sm:w-auto h-12 sm:h-11 rounded-xl text-base sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-xl shadow-orange-500/30 border border-white/20 flex items-center justify-center gap-2">
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </Button>
              </Link>
              <Link to="/calculator" className="hidden sm:inline-flex w-full sm:w-auto">
                <button className="w-full sm:w-auto h-12 sm:h-11 px-6 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/80 transition-all flex items-center justify-center gap-2 shadow-md hover:border-slate-400 active:scale-95 text-base sm:text-sm">
                  <Calculator className="w-4.5 h-4.5 text-[#31b0d0] flex-shrink-0" />
                  <span>EMI Calculator</span>
                </button>
              </Link>
              <CheckScoreButton variant="primary" className="w-full sm:w-auto h-12 sm:h-11 text-base sm:text-sm px-6 justify-center rounded-xl font-bold bg-[#00bc7d] hover:bg-[#00a36c] text-white shadow-lg shadow-[#00bc7d]/30 border border-white/20" />
            </div>

            {/* Trust badges — ultra-clean inline feature list */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100 px-3 py-1.5 rounded-lg text-slate-700 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>No Hidden Fees</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50/80 border border-amber-100 px-3 py-1.5 rounded-lg text-slate-700 shadow-sm">
                <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>RBI Compliant</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-100 px-3 py-1.5 rounded-lg text-slate-700 shadow-sm">
                <Building2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Trusted by Banks &amp; NBFCs</span>
              </span>
            </div>

            {/* Google rating row */}
            <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="text-slate-800 text-sm font-bold">4.9</span>
              <span className="text-slate-500 text-xs font-medium">· 500+ Google Reviews</span>
            </div>
          </div>

          {/* RIGHT — 3-D animated visual stage */}
          <div className="flex-1 relative h-[480px] hidden lg:block" aria-hidden="true">

            {/* Perspective container */}
            <div className="absolute inset-0" style={{ perspective: "1200px" }}>

              {/* Central glowing orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full animate-pulse-slow"
                style={{ background: "radial-gradient(circle at 40% 40%, #60a5fa 0%, #2563eb 50%, #1e3a8a 100%)", boxShadow: "0 0 60px 15px rgba(59,130,246,0.3)" }} />

              {/* Score ring — centre */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <ScoreRing target={780} />
              </div>

              {/* Floating card — top left: Growth chart */}
              <FloatCard delay="0s" className="absolute top-4 left-2 w-60 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Credit Growth</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-900">+180</span>
                      <span className="text-[10px] font-bold text-emerald-600">pts gain</span>
                    </div>
                  </div>
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    +24%
                  </span>
                </div>
                <BarChart3D />
              </FloatCard>

              {/* Floating card — top right: Approval */}
              <FloatCard delay="1s" className="absolute top-6 right-0 w-44 p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">Loan Approved!</span>
                </div>
                <p className="text-2xl font-black text-slate-900">₹25 L</p>
                <p className="text-[10px] text-slate-500 font-medium">Home Loan · 8.4% p.a.</p>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-progress" style={{ width: "72%" }} />
                </div>
              </FloatCard>

              {/* Floating card — bottom left: Stats */}
              <FloatCard delay="0.5s" className="absolute bottom-8 left-0 w-44 p-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Clients Helped</p>
                <p className="text-3xl font-black text-slate-900">10K+</p>
                <div className="flex gap-0.5 mt-1.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-[10px] text-blue-600 font-semibold mt-1">98% success rate</p>
              </FloatCard>

              {/* Floating card — bottom right: EMI */}
              <FloatCard delay="1.5s" className="absolute bottom-4 right-2 w-48 p-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Monthly EMI</p>
                <p className="text-2xl font-black text-blue-600">₹18,240</p>
                <p className="text-[10px] text-slate-500 font-medium">Personal Loan · 5 yrs</p>
                <div className="mt-2 flex gap-1 items-end h-7">
                  {[40,60,80,55,90,70].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-blue-500/80 shadow-sm"
                      style={{ height: `${h}%`, animation: `rise 0.8s ease-out ${i * 0.1 + 1}s both`, transformOrigin: "bottom" }} />
                  ))}
                </div>
              </FloatCard>

              {/* Orbit ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-blue-200/50 animate-spin-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-blue-100/50 animate-spin-reverse" />

              {/* Orbiting dot */}
              <div className="absolute top-1/2 left-1/2 animate-orbit">
                <div className="w-3 h-3 rounded-full bg-blue-600 shadow-lg shadow-blue-500/60" style={{ marginTop: "-144px" }} />
              </div>
              <div className="absolute top-1/2 left-1/2 animate-orbit" style={{ animationDelay: "-4s" }}>
                <div className="w-2 h-2 rounded-full bg-sky-400 shadow-lg shadow-sky-400/60" style={{ marginTop: "-160px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Stats — SINGLE Combined Floating Card Container (Left Aligned on Desktop) */}
        <div className="relative z-20 max-w-6xl mx-auto lg:mx-0 lg:max-w-none px-4 sm:px-6 lg:px-8 pb-12 pt-4">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 lg:gap-y-0 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/80">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-3 py-1">
                  <div className="text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-[#31b0d0] mb-0.5 flex items-center justify-center lg:justify-start gap-1">
                    <span>{stat.value}</span>
                    {stat.isStar && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                  </div>
                  <div className="text-slate-600 text-xs font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Partner Banks & NBFCs — Authentic Logo Carousel with Cohesive Single Background */}
      <section className="py-10 bg-slate-50/80 border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest leading-snug">
              TRUSTED BY CLIENTS AT
            </p>
            <p className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-widest leading-snug mt-1">
              INDIA'S LEADING BANKS &amp; NBFCs
            </p>
          </div>
        </div>

        {/* Slow continuous carousel */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-6 sm:gap-8 px-4">
              {bankLogos.map((bank) => (
                <div key={bank.name} className="flex items-center justify-center h-12 sm:h-14 px-4 py-2 bg-white border border-slate-200/90 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-blue-200 hover:scale-[1.02] transition-all duration-300">
                  <ImageWithFallback
                    src={bank.logo}
                    fallbackSrc={bank.fallbackSvg}
                    alt={bank.name}
                    className="h-7 sm:h-9 w-auto object-contain max-w-[130px] sm:max-w-[160px]"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 sm:gap-8 px-4" aria-hidden="true">
              {bankLogos.map((bank) => (
                <div key={`${bank.name}-dup`} className="flex items-center justify-center h-12 sm:h-14 px-4 py-2 bg-white border border-slate-200/90 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-blue-200 hover:scale-[1.02] transition-all duration-300">
                  <ImageWithFallback
                    src={bank.logo}
                    fallbackSrc={bank.fallbackSvg}
                    alt={bank.name}
                    className="h-7 sm:h-9 w-auto object-contain max-w-[130px] sm:max-w-[160px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks bg="white" showCTA={true} />

      {/* Why Choose Us Section — Informative & Premium Redesign */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full inline-block mb-3">
              THE CREDIT CONSULTANT ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why 10,000+ Clients Trust Credit Consultant
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              We combine deep credit bureau expertise, RBI-compliant legal processes, and direct lender advisory to deliver guaranteed CIBIL score improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Image & Overlay Badges — Authentic Indian Advisory Team */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -left-6 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Professional Indian Credit Advisory Team"
                className="rounded-3xl shadow-2xl border border-slate-200 w-full h-[480px] object-cover relative z-10"
              />

              {/* Floating Badge 1: RBI Compliant */}
              <div className="absolute -bottom-6 -right-2 sm:right-4 z-20 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">100% RBI Compliant</p>
                  <p className="text-xs text-slate-500 font-medium">CICRA Act, 2005 Dispute Guidelines</p>
                </div>
              </div>

              {/* Floating Badge 2: Average Score Gain */}
              <div className="absolute top-6 -left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-lg hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-xs">+150 Points Avg. Gain</p>
                  <p className="text-[10px] text-slate-500">Achieved in 30–90 Days</p>
                </div>
              </div>
            </div>

            {/* Right Rich Feature Grid */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: "100% Legal & Bureau-Sanctioned Disputes",
                  desc: "We file formal disputes under Section 21 of the Credit Information Companies (Regulation) Act, 2005 directly with CIBIL, Equifax, Experian and CRIF.",
                  icon: ShieldCheck,
                  iconBg: "bg-blue-50 border-blue-200 text-blue-600",
                },
                {
                  title: "Personalized Case Strategy & Expert Advisory",
                  desc: "No generic automated dispute templates. A dedicated senior credit manager analyzes your bureau report item-by-item and creates a tailored resolution plan.",
                  icon: User,
                  iconBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
                },
                {
                  title: "Multi-Bureau Settlement & Error Corrections",
                  desc: "We clean up settled accounts, written-off tags, identity errors, wrong delinquency reporting, and unauthorized hard inquiries across all 4 bureaus.",
                  icon: CheckCircle,
                  iconBg: "bg-purple-50 border-purple-200 text-purple-600",
                },
                {
                  title: "Direct Bank Loan Approval Advisory",
                  desc: "Once your score reaches 750+, we assist in securing home, personal, and business loans from leading partner banks at pre-approved low interest rates.",
                  icon: Building2,
                  iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
                },
                {
                  title: "Zero Hidden Fees & Transparent Process",
                  desc: "Free initial CIBIL credit report analysis. Clear milestone-based resolution steps with 100% transparency — no surprise charges or hidden clauses.",
                  icon: Lock,
                  iconBg: "bg-amber-50 border-amber-200 text-amber-600",
                },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 ${item.iconBg}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to="/about">
                  <Button size="lg" className="rounded-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-[#31b0d0] hover:from-blue-800 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20">
                    Learn More About Our Team <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <button className="px-5 py-3 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all text-sm shadow-sm">
                    Book Free Consultation
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Carousel — Positioned after Why 10,000+ Clients Trust Credit Consultant */}
      <TestimonialsCarousel />

      {/* Loan Products Teaser — Rich Visual Cards with Overlay Text */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full inline-block mb-3">
              PRE-APPROVED FINANCIAL SOLUTIONS
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Loan Products &amp; Advisory</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base mt-2 font-normal">
              Financing solutions tailored to every need — home, business, personal, or vehicle loans at pre-approved interest rates.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: HomeIcon,
                label: "Home Loan",
                desc: "Rates from 8.35% p.a., up to ₹5 Cr, 30-year tenure.",
                img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                tag: "Rates from 8.35%",
              },
              {
                icon: Briefcase,
                label: "Business Loan",
                desc: "Collateral-free SME loans up to ₹50 L with 48-hr disbursal.",
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                tag: "Up to ₹50 Lakhs",
              },
              {
                icon: User,
                label: "Personal Loan",
                desc: "Instant approval, no collateral, flexible repayment up to ₹40 L.",
                img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                tag: "Instant Approval",
              },
              {
                icon: Car,
                label: "Car Loan",
                desc: "100% on-road price financing with minimal documentation.",
                img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                tag: "100% On-Road",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link to="/loans" key={item.label} className="block h-full group">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 h-80 flex flex-col justify-end p-6 border border-slate-200">
                    <ImageWithFallback src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/20" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[11px] font-bold bg-[#31b0d0] text-white px-2.5 py-1 rounded-full shadow-sm">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-1.5">{item.label}</h3>
                      <p className="text-slate-200 text-xs font-normal leading-relaxed mb-4 line-clamp-2">{item.desc}</p>
                      <div className="flex items-center gap-1.5 text-white font-bold text-xs group-hover:gap-2.5 transition-all">
                        <span>Explore Rates &amp; Eligibility</span>
                        <ArrowRight className="w-4 h-4 text-[#31b0d0]" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/loans">
              <Button size="lg" className="rounded-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-[#31b0d0] hover:from-blue-800 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20 px-8 py-3">
                Explore All Loan Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Hub Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Our Services</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Individual & Commercial Credit Services
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              We keep individual and commercial credit services completely separate — choose the one that fits your need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Individual Hub Card */}
            <Link to="/individual" className="group block rounded-3xl border-2 border-teal-100 bg-gradient-to-br from-teal-50 to-teal-100 p-8 hover:shadow-xl hover:border-teal-300 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold bg-teal-600 text-white px-3 py-1 rounded-full">For Individuals</span>
              </div>
              <h3 className="text-2xl font-black text-blue-900 mb-2">Individual Credit Report Services</h3>
              <p className="text-blue-700 text-sm mb-4 leading-relaxed">
                Personal CIBIL score repair, home loan advisory and credit dispute resolution for salaried professionals, self-employed individuals and NRIs — available across North, South, East and West India.
              </p>

              {/* Dummy PAN Card Illustration */}
              <div className="relative mb-5">
                <div className="absolute -top-1.5 -right-1 z-10">
                  <span className="text-[9px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full tracking-wide shadow">SAMPLE</span>
                </div>
                <svg
                  viewBox="0 0 380 220"
                  className="w-full max-w-sm mx-auto rounded-xl shadow-lg border border-blue-200"
                  style={{ filter: "drop-shadow(0 4px 16px rgba(0,97,178,0.18))" }}
                  aria-label="Sample PAN Card — for illustration only"
                >
                  {/* Card background */}
                  <defs>
                    <linearGradient id="panBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0f7ff" />
                      <stop offset="100%" stopColor="#dbeafe" />
                    </linearGradient>
                    <linearGradient id="panHeader" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1a3a6b" />
                      <stop offset="100%" stopColor="#0e4f9e" />
                    </linearGradient>
                    <pattern id="ashoka" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="15" cy="15" r="10" fill="none" stroke="#1e40af" strokeWidth="0.3" strokeDasharray="2,2" opacity="0.15" />
                    </pattern>
                  </defs>

                  {/* Card body */}
                  <rect width="380" height="220" rx="12" ry="12" fill="url(#panBg)" />
                  <rect width="380" height="220" rx="12" ry="12" fill="url(#ashoka)" />

                  {/* Header bar */}
                  <rect width="380" height="42" rx="0" ry="0" fill="url(#panHeader)" />
                  <rect width="380" height="42" rx="12" ry="12" fill="url(#panHeader)" />
                  <rect y="20" width="380" height="22" fill="url(#panHeader)" />

                  {/* Ashoka Pillar icon (simplified) */}
                  <g transform="translate(18, 6)">
                    <rect x="10" y="8" width="4" height="18" rx="1" fill="#f59e0b" />
                    <ellipse cx="12" cy="8" rx="7" ry="4" fill="#f59e0b" />
                    <ellipse cx="12" cy="4" rx="4" ry="2.5" fill="#fbbf24" />
                  </g>

                  {/* Header text */}
                  <text x="50" y="16" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#fde68a" letterSpacing="1.5">INCOME TAX DEPARTMENT</text>
                  <text x="50" y="28" fontFamily="serif" fontSize="7" fill="#bfdbfe" letterSpacing="0.8">GOVT. OF INDIA</text>

                  {/* Permanent Account Number label */}
                  <text x="18" y="62" fontFamily="serif" fontSize="7.5" fill="#1e3a5f" letterSpacing="0.5">Permanent Account Number</text>
                  {/* PAN number */}
                  <text x="18" y="80" fontFamily="monospace" fontSize="14" fontWeight="bold" fill="#1a3a6b" letterSpacing="3">ABCDE1234F</text>

                  {/* Photo placeholder */}
                  <rect x="295" y="50" width="68" height="82" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.2" />
                  <text x="329" y="88" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="#60a5fa">Photo</text>
                  <circle cx="329" cy="78" r="14" fill="#bfdbfe" />
                  <ellipse cx="329" cy="105" rx="18" ry="10" fill="#bfdbfe" />

                  {/* Fields */}
                  <text x="18" y="105" fontFamily="sans-serif" fontSize="6.5" fill="#6b7280">Name</text>
                  <text x="18" y="117" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#1e293b">RAHUL KUMAR SHARMA</text>

                  <text x="18" y="133" fontFamily="sans-serif" fontSize="6.5" fill="#6b7280">{"Father's Name"}</text>
                  <text x="18" y="145" fontFamily="serif" fontSize="9.5" fontWeight="bold" fill="#1e293b">SURESH KUMAR SHARMA</text>

                  <text x="18" y="161" fontFamily="sans-serif" fontSize="6.5" fill="#6b7280">Date of Birth</text>
                  <text x="18" y="173" fontFamily="serif" fontSize="9.5" fontWeight="bold" fill="#1e293b">01/01/1990</text>

                  {/* Signature line */}
                  <line x1="18" y1="198" x2="150" y2="198" stroke="#94a3b8" strokeWidth="0.8" />
                  <text x="18" y="210" fontFamily="sans-serif" fontSize="6.5" fill="#94a3b8">Signature</text>

                  {/* Hologram */}
                  <circle cx="262" cy="185" r="22" fill="none" stroke="#7c3aed" strokeWidth="0.7" strokeDasharray="3,2" opacity="0.5" />
                  <circle cx="262" cy="185" r="14" fill="none" stroke="#0891b2" strokeWidth="0.7" opacity="0.5" />
                  <text x="262" y="189" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="#7c3aed" opacity="0.7">◈ ITD</text>

                  {/* Watermark */}
                  <text x="190" y="130" textAnchor="middle" fontFamily="sans-serif" fontSize="28" fontWeight="bold" fill="#1e40af" opacity="0.04" transform="rotate(-22, 190, 130)">SAMPLE</text>
                </svg>
                <p className="text-center text-[10px] text-blue-400 mt-1.5 italic">Sample PAN card — for illustration only</p>
              </div>

              <ul className="space-y-2 mb-6">
                {["Personal CIBIL Score Repair", "Credit Report Dispute", "Home & Personal Loan Advisory", "Identity Protection"].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm group-hover:gap-3 transition-all">
                Explore Individual Credit Services <ArrowRight className="w-4 h-4" />
              </div>
              <p className="text-xs text-blue-500 mt-3">Available in 66 cities across all 4 regions</p>
            </Link>

            {/* Commercial Hub Card */}
            <Link to="/commercial" className="group block rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 hover:shadow-xl hover:border-slate-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold bg-slate-700 text-white px-3 py-1 rounded-full">For Businesses</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Commercial Credit Information Report Services</h3>
              <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                Business CIBIL CMR repair, commercial credit building, MSME loan advisory and B2B debt management for proprietorships, partnerships, LLPs and private limited companies across India.
              </p>
              <ul className="space-y-2 mb-6">
                {["Business CIBIL CMR Rank Repair", "Commercial Loan Advisory", "MSME / Mudra Loan Facilitation", "B2B Debt Management"].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm group-hover:gap-3 transition-all">
                Explore Commercial Credit Services <ArrowRight className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-400 mt-3">Available in 66 cities across all 4 regions</p>
            </Link>
          </div>

          {/* Region quick links */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">Browse by Region</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                { region: "north", label: "North India", cities: "Delhi, Gurgaon, Noida, Chandigarh, Jaipur…", color: "bg-blue-50 border-blue-200 text-blue-800" },
                { region: "south", label: "South India", cities: "Bengaluru, Chennai, Hyderabad, Kochi…", color: "bg-indigo-50 border-indigo-200 text-indigo-800" },
                { region: "east",  label: "East India",  cities: "Kolkata, Patna, Bhubaneswar, Guwahati…", color: "bg-purple-50 border-purple-200 text-purple-800" },
                { region: "west",  label: "West India",  cities: "Mumbai, Pune, Ahmedabad, Surat…", color: "bg-green-50 border-green-200 text-green-800" },
              ].map((r) => (
                <div key={r.region} className={`rounded-xl border p-3 ${r.color}`}>
                  <p className="font-bold text-sm mb-1">{r.label}</p>
                  <p className="text-xs opacity-70 mb-2">{r.cities}</p>
                  <div className="flex gap-2">
                    <Link to={`/individual/${r.region}`} className="text-xs font-semibold underline hover:no-underline">Individual</Link>
                    <span className="text-xs opacity-40">·</span>
                    <Link to={`/commercial/${r.region}`} className="text-xs font-semibold underline hover:no-underline">Commercial</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Awards & Recognition</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Recognised for Excellence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { year: "2024", award: "Best Credit Advisory Firm", body: "FinTech Leaders Council India", icon: "🏆" },
              { year: "2023", award: "Excellence in Credit Repair", body: "Indian Financial Empowerment Forum", icon: "🥇" },
              { year: "2022", award: "Innovation in Debt Resolution", body: "Debt Recovery Outlook Summit", icon: "🎖️" },
            ].map((a) => (
              <div key={a.award} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="text-3xl flex-shrink-0">{a.icon}</div>
                <div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{a.year}</span>
                  <p className="font-bold text-gray-900 mt-1.5 text-sm">{a.award}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Real Results</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Client Success Stories</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">Before and after CIBIL scores from real Credit Consultant clients across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh K.", city: "Bengaluru", issue: "Settled loan + missed EMIs", before: 541, after: 762, months: 5 },
              { name: "Priya S.", city: "Mumbai", issue: "Write-off entry on report", before: 488, after: 714, months: 7 },
              { name: "Amit P.", city: "Delhi NCR", issue: "Multiple hard enquiries", before: 623, after: 798, months: 4 },
            ].map((c) => {
              const gain = c.after - c.before;
              const pct = Math.round(((c.after - 300) / 600) * 100);
              return (
                <div key={c.name} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-blue-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.city} · {c.issue}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">+{gain} pts</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-2xl font-black text-red-500">{c.before}</p>
                      <p className="text-[10px] text-gray-400">Before</p>
                    </div>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-400 to-green-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-green-600">{c.after}</p>
                      <p className="text-[10px] text-gray-400">After</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">Achieved in <strong>{c.months} months</strong></p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section — Clean Royal Blue & Glass Card */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-blue-50/50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                FREE FINANCIAL INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Stay Financially Informed</h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6 leading-relaxed font-normal">
                Get weekly CIBIL score repair tips, RBI policy updates, and loan interest rate alerts delivered straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button type="submit" className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all whitespace-nowrap">
                  Subscribe Free
                </button>
              </form>
              <p className="text-slate-400 text-xs mt-3.5 font-medium">Join 5,000+ subscribers · No spam ever · Unsubscribe anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section — Medium Blue Gradient Theme */}
      <section className="py-20 bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#38bdf8] text-white relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-3.5 py-1 rounded-full mb-4 uppercase tracking-widest backdrop-blur-sm">
            START YOUR CREDIT RECOVERY TODAY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight text-white">
            Ready to Improve Your Credit Score?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Get started today with a 100% free consultation. Our certified CIBIL experts analyze your credit report and map out a step-by-step resolution strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-xl shadow-orange-500/25 border border-white/20 flex items-center justify-center gap-2">
                <span>Get Free Consultation</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </Button>
            </Link>
            <a href="https://wa.me/919538049888?text=Hi%2C%20I%20need%20help%20with%20my%20CIBIL%20score" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 rounded-xl text-base font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-[#25D366]/25 border border-white/20 flex items-center justify-center gap-2.5">
                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white flex-shrink-0">
                  <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.64 4.73 1.76 6.72L2 30l7.5-1.73C11.38 29.38 13.64 30 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.18 19.54c-.3.84-1.77 1.6-2.44 1.7-.62.1-1.4.14-2.26-.14-.52-.17-1.19-.4-2.05-.78-3.6-1.56-5.94-5.18-6.12-5.42-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.62 1.25-2.98.3-.33.66-.41.88-.41.22 0 .44.002.63.01.2.01.48-.08.75.57.3.69 1.01 2.46 1.1 2.64.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.38-.16.74.21.36.95 1.57 2.05 2.54 1.41 1.26 2.6 1.65 2.97 1.84.37.18.58.15.8-.09.21-.24.92-1.07 1.16-1.44.24-.37.48-.3.8-.18.32.12 2.05.97 2.4 1.14.35.18.58.27.67.42.09.15.09.87-.21 1.71z"/>
                </svg>
                <span>WhatsApp Us</span>
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
