import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import cibilLogo from "@/imports/CIBIL_Logo.png";
import { GetStartedModal } from "./GetStartedModal";

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
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={cibilLogo}
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
            <Button onClick={() => setShowGetStarted(true)} className="bg-teal-600 hover:bg-teal-700">
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
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                <Button variant="outline" className="w-full gap-2 border-gray-300 text-gray-700 hover:text-blue-600 justify-center h-11">
                  <LayoutDashboard className="w-4 h-4" /> My Dashboard
                </Button>
              </Link>
              <Button onClick={() => { setIsOpen(false); setShowGetStarted(true); }} className="w-full bg-teal-600 hover:bg-teal-700 h-11 text-base font-semibold">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}

      <GetStartedModal open={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </nav>
  );
}
