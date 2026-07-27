import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { useState, useMemo } from "react";
import { Link } from "react-router";
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Loan Products</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8">
            Tailored financing solutions for every milestone — home, business, personal needs, and beyond.
          </p>
          <CheckScoreButton variant="white" className="h-11 text-sm px-7 mx-auto" />
        </div>
      </section>

      {/* Tab Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {loans.map((l) => {
              const Icon = l.icon;
              const isActive = l.id === activeTab;
              return (
                <button
                  key={l.id}
                  onClick={() => handleTabChange(l.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    isActive
                      ? `border-teal-600 text-teal-600`
                      : "border-transparent text-gray-600 hover:text-teal-600 hover:border-teal-300"
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${colors.badge}`}>
                {loan.label}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{loan.tagline}</h2>
              <p className="text-lg text-gray-600 mb-8">{loan.description}</p>
              <Link to="/contact">
                <Button className={`${colors.btn} text-white`}>
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div>
              <img
                src={loan.image}
                alt={loan.label}
                className="rounded-2xl shadow-xl w-full h-72 object-cover"
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {loan.highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className={`rounded-xl border p-6 text-center ${colors.highlight}`}>
                  <Icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                  <p className="text-xs text-gray-500 mb-1">{h.label}</p>
                  <p className="font-bold text-gray-900 text-sm">{h.value}</p>
                </div>
              );
            })}
          </div>

          {/* Features + Eligibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What makes our {loan.label.toLowerCase()} stand out</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {loan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>Requirements to apply for this loan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {loan.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{e}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* ── Inline EMI Calculator ──────────────────────────── */}
          <div className="mt-14">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {loan.label} EMI Calculator
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              Adjust the sliders to estimate your monthly repayment for a {loan.label.toLowerCase()}.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sliders */}
              <Card className="shadow-sm">
                <CardContent className="pt-6 space-y-8">
                  {/* Amount */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                      <span className="text-sm font-bold text-teal-600">{fmtINR(amount)}</span>
                    </div>
                    <input type="range" min={100000} max={def.maxAmount} step={50000}
                      value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-teal-600" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>₹1 L</span><span>{fmtINR(def.maxAmount)}</span>
                    </div>
                  </div>

                  {/* Rate */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Interest Rate (p.a.)</label>
                      <span className="text-sm font-bold text-teal-600">{rate.toFixed(1)}%</span>
                    </div>
                    <input type="range" min={6} max={24} step={0.1}
                      value={rate} onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full accent-teal-600" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>6%</span><span>24%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Tenure</label>
                      <span className="text-sm font-bold text-teal-600">{tenure} {tenure === 1 ? "Year" : "Years"}</span>
                    </div>
                    <input type="range" min={1} max={def.maxTenure} step={1}
                      value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full accent-teal-600" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1 Yr</span><span>{def.maxTenure} Yrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-4">
                {/* EMI */}
                <div className={`rounded-2xl p-6 text-white text-center ${
                  activeTab === "home" ? "bg-teal-600" : activeTab === "business" ? "bg-indigo-600" : activeTab === "personal" ? "bg-purple-600" : "bg-cyan-600"
                }`}>
                  <p className="text-sm opacity-80 mb-1">Monthly EMI</p>
                  <p className="text-4xl font-black">{fmtINR(Math.round(emi))}</p>
                  <p className="text-xs opacity-70 mt-1">for {tenure * 12} months</p>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Principal",       value: fmtINR(amount),                      color: "text-gray-900" },
                    { label: "Total Interest",  value: fmtINR(Math.round(totalInterest)),   color: "text-orange-500" },
                    { label: "Total Payment",   value: fmtINR(Math.round(totalPayment)),    color: "text-teal-600" },
                  ].map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Visual bar */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-3">Payment Breakup</p>
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${principalPct}%` }} />
                    <div className="bg-orange-400 h-full transition-all duration-500" style={{ width: `${interestPct}%` }} />
                  </div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Principal {principalPct}%</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" /> Interest {interestPct}%</span>
                  </div>
                </div>

                <Link to="/contact" className="block">
                  <Button className={`w-full text-white ${
                    activeTab === "home" ? "bg-teal-600 hover:bg-teal-700" : activeTab === "business" ? "bg-indigo-600 hover:bg-indigo-700" : activeTab === "personal" ? "bg-purple-600 hover:bg-purple-700" : "bg-cyan-600 hover:bg-cyan-700"
                  }`}>
                    Apply for {loan.label} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Loan Approved?</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
            Our loan advisors will guide you through the entire process — from application to disbursal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                Talk to a Loan Expert <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <CheckScoreButton variant="white" className="h-11 text-sm px-6" />
          </div>
        </div>
      </section>
    </div>
  );
}
