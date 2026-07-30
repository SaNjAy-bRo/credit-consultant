'use client';

import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { useState, useMemo } from "react";
import { Link } from "./routerShim";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Home, Briefcase, User, Car, IndianRupee, Percent, Clock } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const loanTypes = [
  { id: "home", label: "Home Loan", icon: Home, defaultAmount: 5000000, defaultRate: 8.5, defaultTenure: 20, color: "#2563eb" },
  { id: "business", label: "Business Loan", icon: Briefcase, defaultAmount: 1000000, defaultRate: 11.0, defaultTenure: 5, color: "#4f46e5" },
  { id: "personal", label: "Personal Loan", icon: User, defaultAmount: 500000, defaultRate: 12.0, defaultTenure: 4, color: "#7c3aed" },
  { id: "car", label: "Car Loan", icon: Car, defaultAmount: 800000, defaultRate: 8.5, defaultTenure: 7, color: "#0891b2" },
];

function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function calcEMI(principal: number, annualRate: number, tenureYears: number) {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function Calculator() {
  const [activeType, setActiveType] = useState("home");
  const loan = loanTypes.find((l) => l.id === activeType)!;

  const [amount, setAmount] = useState(loan.defaultAmount);
  const [rate, setRate] = useState(loan.defaultRate);
  const [tenure, setTenure] = useState(loan.defaultTenure);

  const handleTypeChange = (id: string) => {
    const l = loanTypes.find((x) => x.id === id)!;
    setActiveType(id);
    setAmount(l.defaultAmount);
    setRate(l.defaultRate);
    setTenure(l.defaultTenure);
  };

  const emi = useMemo(() => calcEMI(amount, rate, tenure), [amount, rate, tenure]);
  const totalPayment = useMemo(() => emi * tenure * 12, [emi, tenure]);
  const totalInterest = useMemo(() => totalPayment - amount, [totalPayment, amount]);

  const pieData = [
    { name: "Principal", value: Math.round(amount) },
    { name: "Total Interest", value: Math.round(totalInterest) },
  ];

  const amountMax = activeType === "home" ? 50000000 : activeType === "car" ? 5000000 : activeType === "business" ? 20000000 : 4000000;
  const tenureMax = activeType === "home" ? 30 : activeType === "car" ? 7 : activeType === "business" ? 5 : 5;

  return (
    <div className="w-full">
      <SEOHead
        title="EMI Calculator — Home, Business, Personal & Car Loan | Credit Consultant"
        description="Calculate your monthly EMI instantly. Free online EMI calculator for home loans, business loans, personal loans and car loans. Includes amortisation schedule and payment breakdown."
        keywords="EMI calculator India, home loan EMI calculator, personal loan EMI, business loan calculator, car loan EMI"
        schema={ORG_SCHEMA}
      />
      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Financial Planning
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-4 tracking-tight text-slate-900">
            EMI <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">Calculator</span>
          </h1>
          <p className="text-base lg:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Calculate your monthly EMI instantly. Adjust loan amount, interest rate, and tenure to plan your finances.
          </p>
        </div>
      </section>

      {/* Loan Type Tabs */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-16 z-40 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 py-1 justify-start sm:justify-center">
            {loanTypes.map((l) => {
              const Icon = l.icon;
              const isActive = activeType === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => handleTypeChange(l.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 scale-105"
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

      {/* Calculator Body */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sliders */}
            <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-xl p-2">
              <CardHeader className="p-7 pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">{loan.label} Calculator</CardTitle>
              </CardHeader>
              <CardContent className="p-7 pt-2 space-y-10">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-teal-600" /> Loan Amount
                    </label>
                    <span className="text-base font-extrabold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">{formatINR(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={amountMax}
                    step={50000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                    <span>₹1 L</span>
                    <span>{formatINR(amountMax)}</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-teal-600" /> Interest Rate (p.a.)
                    </label>
                    <span className="text-base font-extrabold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">{rate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={24}
                    step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                    <span>6%</span>
                    <span>24%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-600" /> Tenure
                    </label>
                    <span className="text-base font-extrabold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">{tenure} {tenure === 1 ? "Year" : "Years"}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={tenureMax}
                    step={1}
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                    <span>1 Year</span>
                    <span>{tenureMax} Years</span>
                  </div>
                </div>

                {/* Manual Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Math.min(amountMax, Math.max(100000, Number(e.target.value))))}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Rate (%)</label>
                    <input
                      type="number"
                      step={0.1}
                      value={rate}
                      onChange={(e) => setRate(Math.min(24, Math.max(6, Number(e.target.value))))}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Tenure (Yrs)</label>
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Math.min(tenureMax, Math.max(1, Number(e.target.value))))}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* EMI Highlight */}
              <Card className="rounded-3xl shadow-xl bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white overflow-hidden relative border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
                <CardContent className="p-8 text-center relative z-10">
                  <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">Monthly EMI</p>
                  <p className="text-5xl font-black tracking-tight mb-2 text-white">{formatINR(Math.round(emi))}</p>
                  <p className="text-teal-200/90 text-sm font-medium">per month for {tenure * 12} months</p>
                </CardContent>
              </Card>

              {/* Breakup Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-5 text-center">
                    <p className="text-xs font-medium text-slate-500 mb-1">Principal Amount</p>
                    <p className="text-xl font-extrabold text-slate-900">{formatINR(Math.round(amount))}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-5 text-center">
                    <p className="text-xs font-medium text-slate-500 mb-1">Total Interest</p>
                    <p className="text-xl font-extrabold text-amber-600">{formatINR(Math.round(totalInterest))}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-sm col-span-2">
                  <CardContent className="p-5 text-center">
                    <p className="text-xs font-medium text-slate-500 mb-1">Total Payment</p>
                    <p className="text-2xl font-black text-slate-900">{formatINR(Math.round(totalPayment))}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Pie Chart */}
              <Card className="rounded-3xl border border-slate-200/80 bg-white shadow-sm p-2">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold text-slate-900">Payment Breakup</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${entry.name}`} fill={index === 0 ? "#0d9488" : "#f59e0b"} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatINR(Math.round(v))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-around mt-4 pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 justify-center mb-0.5">
                        <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                        <span className="text-xs font-medium text-slate-500">Principal</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {((amount / totalPayment) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 justify-center mb-0.5">
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="text-xs font-medium text-slate-500">Interest</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {((totalInterest / totalPayment) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Amortisation Table */}
          <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Year-wise Amortisation Schedule</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-5 py-3.5 text-left font-semibold">Year</th>
                    <th className="px-5 py-3.5 text-right font-semibold">Opening Balance</th>
                    <th className="px-5 py-3.5 text-right font-semibold">Principal Paid</th>
                    <th className="px-5 py-3.5 text-right font-semibold">Interest Paid</th>
                    <th className="px-5 py-3.5 text-right font-semibold">Closing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: tenure }).map((_, yi) => {
                    const monthlyRate = rate / 12 / 100;
                    const totalMonths = tenure * 12;
                    const startMonth = yi * 12;
                    let openingBalance = amount;
                    // compute opening balance for this year
                    for (let m = 0; m < startMonth; m++) {
                      const interest = openingBalance * monthlyRate;
                      const principal = emi - interest;
                      openingBalance -= principal;
                    }
                    openingBalance = Math.max(0, openingBalance);
                    let principalPaid = 0;
                    let interestPaid = 0;
                    let runningBalance = openingBalance;
                    const monthsThisYear = Math.min(12, totalMonths - startMonth);
                    for (let m = 0; m < monthsThisYear; m++) {
                      const interest = runningBalance * monthlyRate;
                      const principal = Math.min(emi - interest, runningBalance);
                      interestPaid += interest;
                      principalPaid += principal;
                      runningBalance -= principal;
                    }
                    const closingBalance = Math.max(0, runningBalance);
                    return (
                      <tr key={yi} className={yi % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                        <td className="px-5 py-3.5 font-bold text-slate-900">{yi + 1}</td>
                        <td className="px-5 py-3.5 text-right text-slate-600">{formatINR(Math.round(openingBalance))}</td>
                        <td className="px-5 py-3.5 text-right text-teal-700 font-semibold">{formatINR(Math.round(principalPaid))}</td>
                        <td className="px-5 py-3.5 text-right text-amber-600 font-semibold">{formatINR(Math.round(interestPaid))}</td>
                        <td className="px-5 py-3.5 text-right text-slate-600">{formatINR(Math.round(closingBalance))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
            <h3 className="text-3xl font-extrabold mb-3 tracking-tight">Happy with the numbers?</h3>
            <p className="text-teal-100/90 mb-6 max-w-md mx-auto text-base">
              Talk to our loan advisors and get the best rate for your profile.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold rounded-xl shadow-xl shadow-teal-950/50">
                Apply Now <ArrowRight className="ml-2 w-4 h-4 text-teal-700" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
