'use client';

import { useState } from "react";
import { Link, useLocation } from "./routerShim";
import { Menu, X, LayoutDashboard, Calculator, Star, Building2, ShieldCheck, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import cibilLogo from "@/imports/CIBIL_Logo.png";
import { GetStartedModal } from "./GetStartedModal";

function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#e0f2fe] via-[#dbeafe] to-[#e0f2fe] border-b border-sky-200/80 text-slate-800 text-xs py-1.5 overflow-hidden relative font-medium">
      <div className="animate-marquee flex items-center">
        <div className="flex items-center gap-8 px-4">
          <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> <strong className="text-blue-900 font-semibold">India's #1 Credit Repair &amp; Loan Advisory</strong></span>
          <span className="text-sky-300">•</span>
          <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-blue-600" /> <strong className="text-slate-800">10,000+ Happy Clients Across India</strong></span>
          <span className="text-sky-300">•</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> <strong className="text-slate-800">100% RBI Compliant &amp; Confidential</strong></span>
          <span className="text-sky-300">•</span>
          <span className="inline-flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-blue-700" /> <strong className="text-blue-700 font-semibold">Free Expert Advisory: +91 95380 49888</strong></span>
        </div>
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> <strong className="text-blue-900 font-semibold">India's #1 Credit Repair &amp; Loan Advisory</strong></span>
          <span className="text-sky-300">•</span>
          <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-blue-600" /> <strong className="text-slate-800">10,000+ Happy Clients Across India</strong></span>
          <span className="text-sky-300">•</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> <strong className="text-slate-800">100% RBI Compliant &amp; Confidential</strong></span>
          <span className="text-sky-300">•</span>
          <span className="inline-flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-blue-700" /> <strong className="text-blue-700 font-semibold">Free Expert Advisory: +91 95380 49888</strong></span>
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/individual", label: "Individual" },
    { path: "/commercial", label: "Commercial" },
    { path: "/cibil-score", label: "CIBIL Score" },
    { path: "/loans", label: "Loans" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <TopBar />

      <nav className="bg-white shadow-md border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={cibilLogo.src ?? (cibilLogo as any)}
                alt="Credit Consultant — Live life debt free"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    isActive(link.path)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-teal-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/dashboard" title="My Dashboard">
                <Button variant="outline" size="sm" className="gap-1.5 border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400">
                  <LayoutDashboard className="w-4 h-4" /> My Dashboard
                </Button>
              </Link>
              <Button onClick={() => setShowGetStarted(true)} className="bg-gradient-to-r from-blue-600 to-[#31b0d0] hover:from-blue-700 hover:to-[#259ab8] text-white font-bold shadow-md shadow-sky-500/20">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link to="/calculator" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="outline" className="w-full gap-2 border-blue-200 text-blue-700 bg-blue-50/60 hover:bg-blue-100 justify-center h-11 font-semibold">
                    <Calculator className="w-4 h-4 text-blue-600" /> EMI Calculator
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="outline" className="w-full gap-2 border-gray-300 text-gray-700 hover:text-blue-600 justify-center h-11">
                    <LayoutDashboard className="w-4 h-4" /> My Dashboard
                  </Button>
                </Link>
                <Button onClick={() => { setIsOpen(false); setShowGetStarted(true); }} className="w-full bg-gradient-to-r from-blue-600 to-[#31b0d0] hover:from-blue-700 hover:to-[#259ab8] text-white h-11 text-base font-bold shadow-md shadow-sky-500/20">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}

        <GetStartedModal open={showGetStarted} onClose={() => setShowGetStarted(false)} />
      </nav>
    </header>
  );
}
