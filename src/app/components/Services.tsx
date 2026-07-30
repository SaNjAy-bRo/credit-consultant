"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "./routerShim";
import { CheckScoreButton } from "./CheckScoreModal";
import { SEOHead, ORG_SCHEMA } from "./SEOHead";
import { HowItWorks } from "./HowItWorks";
import {
  TrendingUp,
  BarChart,
  FileText,
  Shield,
  UserCheck,
  Award,
  CheckCircle,
  ArrowRight,
  CreditCard,
  PieChart,
  Users,
  BookOpen,
} from "lucide-react";

export function Services() {
  const services = [
    {
      icon: TrendingUp,
      title: "Credit Repair Services",
      description: "Comprehensive credit repair solutions to remove negative items and improve your credit score.",
      features: [
        "Remove inaccurate negative items",
        "Dispute errors with credit bureaus",
        "Negotiate with creditors",
        "Improve credit utilization",
        "Build positive credit history",
      ],
    },
    {
      icon: BarChart,
      title: "Credit Analysis & Monitoring",
      description: "In-depth analysis of your credit report with ongoing monitoring and alerts.",
      features: [
        "Detailed credit report analysis",
        "Credit score tracking",
        "Real-time credit monitoring",
        "Identity theft protection",
        "Monthly progress reports",
      ],
    },
    {
      icon: FileText,
      title: "Debt Management",
      description: "Strategic debt consolidation and management plans tailored to your financial situation.",
      features: [
        "Debt consolidation planning",
        "Payment strategy development",
        "Creditor negotiation",
        "Interest rate reduction",
        "Budget optimization",
      ],
    },
    {
      icon: CreditCard,
      title: "Credit Building",
      description: "Build strong credit from scratch or rebuild after financial difficulties.",
      features: [
        "Secured credit card recommendations",
        "Credit builder loans",
        "Authorized user strategies",
        "Payment history optimization",
        "Credit mix diversification",
      ],
    },
    {
      icon: Shield,
      title: "Identity Protection",
      description: "Comprehensive identity theft protection and credit monitoring services.",
      features: [
        "Dark web monitoring",
        "Identity theft insurance",
        "Credit freeze assistance",
        "Fraud alert setup",
        "Resolution support",
      ],
    },
    {
      icon: PieChart,
      title: "Financial Planning",
      description: "Expert guidance on building a strong financial future and achieving your goals.",
      features: [
        "Personalized financial planning",
        "Budget creation and management",
        "Savings strategies",
        "Investment guidance",
        "Retirement planning basics",
      ],
    },
    {
      icon: BookOpen,
      title: "Credit Education",
      description: "Learn the best practices to maintain and improve your credit score over time.",
      features: [
        "Credit basics workshop",
        "Score improvement strategies",
        "Credit report reading",
        "Financial literacy courses",
        "One-on-one coaching",
      ],
    },
    {
      icon: Users,
      title: "Business Credit Services",
      description: "Specialized credit services for entrepreneurs and business owners.",
      features: [
        "Business credit building",
        "Vendor credit establishment",
        "Business credit monitoring",
        "Corporate credit repair",
        "Trade line development",
      ],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Free Consultation",
      description: "Schedule a free consultation to discuss your credit situation and goals.",
    },
    {
      step: "02",
      title: "Credit Analysis",
      description: "We analyze your credit report and identify areas for improvement.",
    },
    {
      step: "03",
      title: "Custom Plan",
      description: "Receive a personalized action plan tailored to your specific needs.",
    },
    {
      step: "04",
      title: "Implementation",
      description: "We work on your behalf to dispute errors and negotiate with creditors.",
    },
    {
      step: "05",
      title: "Monitoring & Support",
      description: "Track your progress with regular updates and ongoing support.",
    },
  ];

  return (
    <div className="w-full">
      <SEOHead
        title="Credit Repair & Financial Services — Credit Consultant India"
        description="Comprehensive credit repair, CIBIL score improvement, debt management and financial planning services. Remove negative items, dispute errors, and get loan-ready in 3–6 months."
        keywords="credit repair services India, CIBIL score improvement, debt management, identity protection, credit education, financial planning"
        schema={ORG_SCHEMA}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-sky-50/60 to-blue-50/80 border-b border-sky-100/90 text-slate-900">
        {/* Faded checks / grid design pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/40 rounded-full filter blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              What We Offer
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-600">Services</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-normal">
              Comprehensive credit and financial services designed to help you achieve your goals and build lasting financial strength.
            </p>
          </div>
        </div>

        {/* Decorative floating card */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex-col gap-4 text-white shadow-2xl shadow-teal-950/50 w-72">
          {[
            { label: "Credit Score Improved", value: "+150 pts" },
            { label: "Clients Served", value: "10,000+" },
            { label: "Success Rate", value: "98%" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between pb-3 border-b border-white/10 last:border-0 last:pb-0">
              <span className="text-xs font-medium text-teal-200">{s.label}</span>
              <span className="text-sm font-extrabold text-amber-300">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works — CIBIL Dispute Process */}
      <HowItWorks
        title="How It Works"
        subtitle="Our credit repair process follows the official CIBIL dispute methodology — certified experts manage every step on your behalf."
        bg="white"
        showCTA={false}
      />

      {/* What We Fix — Service Grid with interactive icons */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Complete Solutions</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">What We Fix For You</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">Every credit issue we resolve follows the dispute and repair process above</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const { icon: Icon } = service as any;
              return (
                <Card key={index} className="border border-slate-200/80 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group">
                  <CardHeader className="p-7 pb-4">
                    <div className="mb-4 w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                      {Icon ? <Icon className="w-7 h-7" /> : null}
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-slate-500 text-sm leading-relaxed mt-1.5">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-7 pt-2">
                    <ul className="space-y-2.5">
                      {service.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <span className="text-slate-700 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Step-by-Step</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Our Process
            </h2>
            <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
              A simple, proven process to help you improve your credit score
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {process.map((item, index) => (
              <div key={index} className="bg-slate-50/80 rounded-2xl p-6 text-center border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-tr from-teal-600 to-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-5 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 3D image banner above plans */}
          <div className="relative rounded-3xl overflow-hidden mb-16 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1634117622592-114e3024ff27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="3D financial growth chart"
              className="w-full h-56 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-teal-950/75 to-teal-900/60 flex items-center px-8 sm:px-12">
              <div>
                <span className="inline-block bg-teal-400/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-teal-400/30">Transparent Options</span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight">Our Plans</h2>
                <p className="text-teal-100/90 text-base lg:text-lg">Choose the plan that works best for you</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm hover:shadow-xl transition-all">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-slate-900">Basic</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Credit report analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Dispute 3 negative items</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Monthly progress reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Email support</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full rounded-xl border-slate-300 hover:bg-slate-50 text-slate-800 font-bold" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-2 border-teal-600 bg-white p-2 shadow-xl shadow-teal-600/10 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-slate-900">Professional</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Unlimited disputes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Credit monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Priority phone support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Financial planning session</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg shadow-teal-600/30">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm hover:shadow-xl transition-all">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-slate-900">Premium</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Identity theft protection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">24/7 priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">Complete financial planning</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full rounded-xl border-slate-300 hover:bg-slate-50 text-slate-800 font-bold" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Take Action Today
          </span>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-base lg:text-xl mb-8 text-teal-100/90 max-w-2xl mx-auto font-normal">
            Schedule your free consultation today and take the first step towards better credit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold rounded-xl shadow-xl shadow-teal-950/50">
                Get Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 text-teal-700" />
              </Button>
            </Link>
            <CheckScoreButton variant="white" className="h-11 text-sm px-6 rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
