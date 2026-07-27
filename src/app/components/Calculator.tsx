import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { useState, useMemo } from "react";
import { Link } from "react-router";
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">EMI Calculator</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Calculate your monthly EMI instantly. Adjust loan amount, interest rate, and tenure to plan your finances.
          </p>
        </div>
      </section>

      {/* Loan Type Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {loanTypes.map((l) => {
              const Icon = l.icon;
              return (
                <button
                  key={l.id}
                  onClick={() => handleTypeChange(l.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeType === l.id
                      ? "border-teal-600 text-teal-600"
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

      {/* Calculator Body */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sliders */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>{loan.label} Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-10">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" /> Loan Amount
                    </label>
                    <span className="text-sm font-bold text-teal-600">{formatINR(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={amountMax}
                    step={50000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹1 L</span>
                    <span>{formatINR(amountMax)}</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Percent className="w-4 h-4" /> Interest Rate (p.a.)
                    </label>
                    <span className="text-sm font-bold text-teal-600">{rate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={24}
                    step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>6%</span>
                    <span>24%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Tenure
                    </label>
                    <span className="text-sm font-bold text-teal-600">{tenure} {tenure === 1 ? "Year" : "Years"}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={tenureMax}
                    step={1}
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 Year</span>
                    <span>{tenureMax} Years</span>
                  </div>
                </div>

                {/* Manual Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Math.min(amountMax, Math.max(100000, Number(e.target.value))))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Rate (%)</label>
                    <input
                      type="number"
                      step={0.1}
                      value={rate}
                      onChange={(e) => setRate(Math.min(24, Math.max(6, Number(e.target.value))))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Tenure (Yrs)</label>
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Math.min(tenureMax, Math.max(1, Number(e.target.value))))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* EMI Highlight */}
              <Card className="shadow-md bg-gradient-to-br from-teal-600 to-teal-900 text-white">
                <CardContent className="pt-8 pb-8 text-center">
                  <p className="text-teal-200 text-sm mb-2">Monthly EMI</p>
                  <p className="text-5xl font-bold mb-1">{formatINR(Math.round(emi))}</p>
                  <p className="text-teal-200 text-sm">per month for {tenure * 12} months</p>
                </CardContent>
              </Card>

              {/* Breakup Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-sm">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-xs text-gray-500 mb-1">Principal Amount</p>
                    <p className="text-xl font-bold text-gray-900">{formatINR(Math.round(amount))}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-orange-500">{formatINR(Math.round(totalInterest))}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm col-span-2">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Payment</p>
                    <p className="text-2xl font-bold text-gray-900">{formatINR(Math.round(totalPayment))}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Pie Chart */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Payment Breakup</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${entry.name}`} fill={index === 0 ? "#2563eb" : "#f97316"} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatINR(Math.round(v))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-around mt-2">
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-0.5">
                        <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                        <span className="text-xs text-gray-500">Principal</span>
                      </div>
                      <p className="text-sm font-semibold">
                        {((amount / totalPayment) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-0.5">
                        <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" />
                        <span className="text-xs text-gray-500">Interest</span>
                      </div>
                      <p className="text-sm font-semibold">
                        {((totalInterest / totalPayment) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Amortisation Table */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Year-wise Amortisation Schedule</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Year</th>
                    <th className="px-4 py-3 text-right">Opening Balance</th>
                    <th className="px-4 py-3 text-right">Principal Paid</th>
                    <th className="px-4 py-3 text-right">Interest Paid</th>
                    <th className="px-4 py-3 text-right">Closing Balance</th>
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
                      <tr key={yi} className={yi % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-medium text-gray-700">{yi + 1}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{formatINR(Math.round(openingBalance))}</td>
                        <td className="px-4 py-3 text-right text-blue-600 font-medium">{formatINR(Math.round(principalPaid))}</td>
                        <td className="px-4 py-3 text-right text-orange-500 font-medium">{formatINR(Math.round(interestPaid))}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{formatINR(Math.round(closingBalance))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-teal-600 to-teal-900 rounded-2xl p-10 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Happy with the numbers?</h3>
            <p className="text-teal-100 mb-6 max-w-md mx-auto">
              Talk to our loan advisors and get the best rate for your profile.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
