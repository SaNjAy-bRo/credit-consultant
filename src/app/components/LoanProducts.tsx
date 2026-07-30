'use client';

import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { useState, useMemo } from "react";
import { Link } from "./routerShim";
import { CheckScoreButton } from "./CheckScoreModal";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Home,
  Briefcase,
  User,
  Car,
  CheckCircle,
  ArrowRight,
  IndianRupee,
  Clock,
  Percent,
  FileText,
} from "lucide-react";

const loans = [
  {
    id: "home",
    label: "Home Loan",
    icon: Home,
    color: "blue",
    tagline: "Make Your Dream Home a Reality",
    description:
      "Our home loan solutions come with competitive interest rates, flexible repayment tenures, and a seamless application process. Whether you're buying your first home, constructing, or renovating — we have a plan built for you.",
    highlights: [
      { icon: Percent, label: "Interest Rate", value: "Starting at 8.40% p.a." },
      { icon: IndianRupee, label: "Loan Amount", value: "Up to ₹5 Crore" },
      { icon: Clock, label: "Tenure", value: "Up to 30 years" },
      { icon: FileText, label: "Processing Fee", value: "0.5% of loan amount" },
    ],
    features: [
      "No prepayment penalty on floating rate loans",
      "Balance transfer facility with top-up option",
      "Tax benefits under Section 80C & 24(b)",
      "Doorstep document pickup",
      "Quick approval in 48 hours",
      "Dedicated relationship manager",
    ],
    eligibility: [
      "Age: 21–65 years",
      "Salaried or self-employed individuals",
      "Minimum income: ₹25,000/month",
      "CIBIL score: 700+",
      "Work experience: 2+ years",
    ],
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "business",
    label: "Business Loan",
    icon: Briefcase,
    color: "indigo",
    tagline: "Fuel Your Business Growth",
    description:
      "Access the capital your business needs to expand, purchase equipment, manage working capital, or seize new opportunities. Our business loans are tailored for SMEs, startups, and established enterprises.",
    highlights: [
      { icon: Percent, label: "Interest Rate", value: "Starting at 10.5% p.a." },
      { icon: IndianRupee, label: "Loan Amount", value: "₹1 Lakh – ₹2 Crore" },
      { icon: Clock, label: "Tenure", value: "12 – 60 months" },
      { icon: FileText, label: "Processing Fee", value: "Up to 2% of loan amount" },
    ],
    features: [
      "Collateral-free loans up to ₹50 Lakhs",
      "Minimal documentation",
      "Flexible repayment options",
      "Overdraft & term loan variants",
      "Approval in 72 hours",
      "Online account management",
    ],
    eligibility: [
      "Business vintage: 2+ years",
      "Annual turnover: ₹10 Lakhs+",
      "Proprietorships, partnerships, Pvt Ltd companies",
      "CIBIL score: 700+",
      "GST registered businesses preferred",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "personal",
    label: "Personal Loan",
    icon: User,
    color: "purple",
    tagline: "Meet Every Financial Need with Ease",
    description:
      "From medical emergencies and weddings to travel and education — our personal loans give you quick access to funds with no collateral required. Simple application, fast disbursal.",
    highlights: [
      { icon: Percent, label: "Interest Rate", value: "Starting at 10.99% p.a." },
      { icon: IndianRupee, label: "Loan Amount", value: "₹50,000 – ₹40 Lakhs" },
      { icon: Clock, label: "Tenure", value: "12 – 60 months" },
      { icon: FileText, label: "Processing Fee", value: "1–3% of loan amount" },
    ],
    features: [
      "100% collateral-free",
      "Same-day disbursal for pre-approved offers",
      "Fixed & flexible EMI options",
      "No end-use restrictions",
      "Digital KYC & paperless process",
      "Part-prepayment allowed after 6 months",
    ],
    eligibility: [
      "Age: 21–60 years",
      "Salaried employees & self-employed professionals",
      "Minimum net monthly income: ₹20,000",
      "CIBIL score: 720+",
      "Employment tenure: 1+ year",
    ],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "car",
    label: "Car Loan",
    icon: Car,
    color: "cyan",
    tagline: "Drive Your Dream Car Today",
    description:
      "Whether you're eyeing a brand-new hatchback or a premium SUV, our car loans offer up to 100% on-road financing with attractive rates and a fast approval process. Used cars covered too.",
    highlights: [
      { icon: Percent, label: "Interest Rate", value: "Starting at 7.99% p.a." },
      { icon: IndianRupee, label: "Loan Amount", value: "Up to 100% of car value" },
      { icon: Clock, label: "Tenure", value: "12 – 84 months" },
      { icon: FileText, label: "Processing Fee", value: "₹1,500 – ₹5,000" },
    ],
    features: [
      "Up to 100% on-road price financing for new cars",
      "Used car loans up to 80% of market value",
      "Quick 24-hour approvals",
      "Insurance & accessory financing included",
      "No foreclosure charges after 12 months",
      "Special rates for women applicants",
    ],
    eligibility: [
      "Age: 21–70 years",
      "Salaried or self-employed individuals",
      "Minimum income: ₹15,000/month",
      "CIBIL score: 680+",
      "Valid driving licence required",
    ],
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const colorMap: Record<string, { tab: string; badge: string; highlight: string; btn: string }> = {
  blue: {
    tab: "bg-teal-600 text-white",
    badge: "bg-teal-100 text-teal-700",
    highlight: "bg-blue-50 border-blue-100",
    btn: "bg-teal-600 hover:bg-teal-700",
  },
  indigo: {
    tab: "bg-indigo-600 text-white",
    badge: "bg-indigo-100 text-indigo-700",
    highlight: "bg-indigo-50 border-indigo-100",
    btn: "bg-indigo-600 hover:bg-indigo-700",
  },
  purple: {
    tab: "bg-purple-600 text-white",
    badge: "bg-purple-100 text-purple-700",
    highlight: "bg-purple-50 border-purple-100",
    btn: "bg-purple-600 hover:bg-purple-700",
  },
  cyan: {
    tab: "bg-cyan-600 text-white",
    badge: "bg-cyan-100 text-cyan-700",
    highlight: "bg-cyan-50 border-cyan-100",
    btn: "bg-cyan-600 hover:bg-cyan-700",
  },
};

/* ── EMI config per loan type ───────────────────────────────── */
const emiDefaults: Record<string, { amount: number; rate: number; tenure: number; maxAmount: number; maxTenure: number }> = {
  home:     { amount: 5000000,  rate: 8.5,  tenure: 20, maxAmount: 50000000, maxTenure: 30 },
  business: { amount: 1000000,  rate: 11.0, tenure: 5,  maxAmount: 20000000, maxTenure: 5  },
  personal: { amount: 500000,   rate: 12.0, tenure: 4,  maxAmount: 4000000,  maxTenure: 5  },
  car:      { amount: 800000,   rate: 8.5,  tenure: 7,  maxAmount: 5000000,  maxTenure: 7  },
};

function calcEMI(p: number, r: number, n: number) {
  const mr = r / 12 / 100;
  if (mr === 0) return p / n;
  return (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
}

function fmtINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function LoanProducts() {
  const [activeTab, setActiveTab] = useState("home");
  const loan   = loans.find((l) => l.id === activeTab)!;
  const colors = colorMap[loan.color];
  const def    = emiDefaults[activeTab];

  const [amount,  setAmount]  = useState(def.amount);
  const [rate,    setRate]    = useState(def.rate);
  const [tenure,  setTenure]  = useState(def.tenure);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    const d = emiDefaults[id];
    setAmount(d.amount); setRate(d.rate); setTenure(d.tenure);
  };

  const emi          = useMemo(() => calcEMI(amount, rate, tenure), [amount, rate, tenure]);
  const totalPayment = useMemo(() => emi * tenure * 12, [emi, tenure]);
  const totalInterest = useMemo(() => totalPayment - amount, [totalPayment, amount]);
  const principalPct  = Math.round((amount / totalPayment) * 100);
  const interestPct   = 100 - principalPct;

  return (
    <div className="w-full">
      <SEOHead
        title="Home Loan, Business Loan, Personal Loan & Car Loan — Credit Consultant"
        description="Tailored loan products for every milestone. Home loans from 8.4%, business loans up to ₹2 Cr, personal loans up to ₹40 L, car loans with 100% on-road financing. Free loan advisory."
        keywords="home loan India, business loan, personal loan, car loan, loan advisory, best loan rates, loan eligibility"
        schema={ORG_SCHEMA}
      />
      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Tailored Financing
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight">Loan <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300">Products</span></h1>
          <p className="text-base lg:text-xl text-teal-100/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Tailored financing solutions for every milestone — home, business, personal needs, and beyond.
          </p>
          <CheckScoreButton variant="white" className="h-12 text-sm font-bold px-8 rounded-xl shadow-xl shadow-teal-950/50" />
        </div>
      </section>

      {/* Tab Bar */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 py-1 justify-start sm:justify-center scrollbar-hide">
            {loans.map((l) => {
              const Icon = l.icon;
              const isActive = l.id === activeTab;
              return (
                <button
                  key={l.id}
                  onClick={() => handleTabChange(l.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 scale-105`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loan Detail */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${colors.badge}`}>
                {loan.label}
              </span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{loan.tagline}</h2>
              <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed">{loan.description}</p>
              <Link to="/contact">
                <Button className={`bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl h-12 px-8 shadow-lg shadow-teal-600/30`}>
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 filter blur-lg -z-10" />
              <img
                src={loan.image}
                alt={loan.label}
                className="rounded-3xl shadow-xl w-full h-80 object-cover border border-slate-100"
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {loan.highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className={`rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm hover:shadow-lg transition-all ${colors.highlight}`}>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-1">{h.label}</p>
                  <p className="font-extrabold text-slate-900 text-base">{h.value}</p>
                </div>
              );
            })}
          </div>

          {/* Features + Eligibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-sm p-2">
              <CardHeader className="p-7 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Key Features</CardTitle>
                <CardDescription className="text-slate-500 text-sm">What makes our {loan.label.toLowerCase()} stand out</CardDescription>
              </CardHeader>
              <CardContent className="p-7 pt-0">
                <ul className="space-y-3.5">
                  {loan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-sm p-2">
              <CardHeader className="p-7 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Eligibility Criteria</CardTitle>
                <CardDescription className="text-slate-500 text-sm">Requirements to apply for this loan</CardDescription>
              </CardHeader>
              <CardContent className="p-7 pt-0">
                <ul className="space-y-3.5">
                  {loan.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{e}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* ── Inline EMI Calculator ──────────────────────────── */}
          <div className="mt-20 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {loan.label} EMI Calculator
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mb-8">
              Adjust the sliders to estimate your monthly repayment for a {loan.label.toLowerCase()}.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Sliders */}
              <Card className="rounded-2xl border border-slate-100 bg-slate-50/50 shadow-inner p-2">
                <CardContent className="p-6 space-y-8">
                  {/* Amount */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Loan Amount</label>
                      <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-100">{fmtINR(amount)}</span>
                    </div>
                    <input type="range" min={100000} max={def.maxAmount} step={50000}
                      value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer" />
                    <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                      <span>₹1 L</span><span>{fmtINR(def.maxAmount)}</span>
                    </div>
                  </div>

                  {/* Rate */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Interest Rate (p.a.)</label>
                      <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-100">{rate.toFixed(1)}%</span>
                    </div>
                    <input type="range" min={6} max={24} step={0.1}
                      value={rate} onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer" />
                    <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                      <span>6%</span><span>24%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Tenure</label>
                      <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-100">{tenure} {tenure === 1 ? "Year" : "Years"}</span>
                    </div>
                    <input type="range" min={1} max={def.maxTenure} step={1}
                      value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer" />
                    <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                      <span>1 Yr</span><span>{def.maxTenure} Yrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-4">
                {/* EMI */}
                <div className="rounded-2xl p-6 text-white text-center bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 border border-slate-800 shadow-xl">
                  <p className="text-xs font-bold text-teal-300 uppercase tracking-widest mb-1">Monthly EMI</p>
                  <p className="text-4xl font-black">{fmtINR(Math.round(emi))}</p>
                  <p className="text-xs text-teal-200/80 mt-1 font-medium">for {tenure * 12} months</p>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Principal",       value: fmtINR(amount),                      color: "text-slate-900" },
                    { label: "Total Interest",  value: fmtINR(Math.round(totalInterest)),   color: "text-amber-600" },
                    { label: "Total Payment",   value: fmtINR(Math.round(totalPayment)),    color: "text-teal-700" },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 text-center">
                      <p className={`text-base font-extrabold ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Visual bar */}
                <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-500 mb-3">Payment Breakup</p>
                  <div className="h-4 rounded-full overflow-hidden flex bg-slate-200">
                    <div className="bg-teal-600 h-full transition-all duration-500" style={{ width: `${principalPct}%` }} />
                    <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${interestPct}%` }} />
                  </div>
                  <div className="flex gap-4 mt-2.5 text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" /> Principal {principalPct}%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Interest {interestPct}%</span>
                  </div>
                </div>

                <Link to="/contact" className="block">
                  <Button className="w-full text-white bg-gradient-to-r from-teal-600 to-emerald-600 font-bold rounded-xl h-12 shadow-lg shadow-teal-600/30">
                    Apply for {loan.label} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 tracking-tight">Ready to Get Your Loan Approved?</h2>
          <p className="text-teal-100/90 text-base lg:text-xl mb-8 max-w-xl mx-auto font-normal">
            Our loan advisors will guide you through the entire process — from application to disbursal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold rounded-xl shadow-xl shadow-teal-950/50">
                Talk to a Loan Expert <ArrowRight className="ml-2 w-5 h-5 text-teal-700" />
              </Button>
            </Link>
            <CheckScoreButton variant="white" className="h-11 text-sm px-6 rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
