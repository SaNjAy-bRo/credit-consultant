'use client';

import { Link } from "./routerShim";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import cibilLogo from "@/imports/CIBIL_Logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4 inline-block bg-white p-2.5 rounded-xl border border-slate-700/60 shadow-sm">
              <img
                src={cibilLogo.src ?? (cibilLogo as any)}
                alt="Credit Consultant — Live life debt free"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm mb-4">
              Your trusted partner in credit repair and financial consulting. We help you achieve your financial goals.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-blue-400 transition-colors">
                  Loan Products
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-400 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-blue-400 transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Loan Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Loan Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/loans" className="hover:text-blue-400 transition-colors">
                  Home Loan
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-blue-400 transition-colors">
                  Business Loan
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-blue-400 transition-colors">
                  Personal Loan
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-blue-400 transition-colors">
                  Car Loan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>184, 15, 5th Main Rd, near police station, 4th Block, Jayanagar, Bengaluru, Karnataka 560011</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+919538049888" className="hover:text-blue-400 transition-colors">
                  +91 95380 49888
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:accounts@creditconsultant.in" className="hover:text-blue-400 transition-colors">
                  accounts@creditconsultant.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {new Date().getFullYear()} Credit Consultant. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <Link to="/sitemap" className="hover:text-blue-400 transition-colors">Sitemap</Link>
            <span>·</span>
            <Link to="/dashboard" className="hover:text-blue-400 transition-colors">My Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
