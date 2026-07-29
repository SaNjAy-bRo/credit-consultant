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
      <section className="relative overflow-hidden min-h-[420px] flex items-center">
        {/* 3D finance image */}
        <img
          src="https://images.unsplash.com/photo-1772413438631-a4bc7ccf0f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Gold coins with upward growth arrow"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay gradient so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 via-teal-800/70 to-transparent" />
        {/* Subtle shimmer layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
              What We Offer
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-lg lg:text-xl text-teal-100 leading-relaxed">
              Comprehensive credit and financial services designed to help you achieve your goals and build lasting financial strength.
            </p>
          </div>
        </div>

        {/* Decorative floating card */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex-col gap-3 text-white shadow-2xl">
          {[
            { label: "Credit Score Improved", value: "+150 pts" },
            { label: "Clients Served", value: "10,000+" },
            { label: "Success Rate", value: "98%" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-10">
              <span className="text-sm text-teal-200">{s.label}</span>
              <span className="text-base font-bold text-yellow-300">{s.value}</span>
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Fix For You</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every credit issue we resolve follows the dispute and repair process above</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const { Icon } = service as any;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="mb-3">{Icon ? <Icon size={64} /> : null}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, proven process to help you improve your credit score
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 3D image banner above plans */}
          <div className="relative rounded-3xl overflow-hidden mb-14 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1634117622592-114e3024ff27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="3D financial growth chart"
              className="w-full h-56 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-700/60 flex items-center px-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Our Plans</h2>
                <p className="text-teal-100 text-lg">Choose the plan that works best for you</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Basic</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Credit report analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Dispute 3 negative items</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Monthly progress reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-teal-600 border-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited disputes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Credit monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Priority phone support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Financial planning session</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Identity theft protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>24/7 priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Complete financial planning</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg lg:text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
            Schedule your free consultation today and take the first step towards better credit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
                Get Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <CheckScoreButton variant="white" className="h-11 text-sm px-6" />
          </div>
        </div>
      </section>
    </div>
  );
}
