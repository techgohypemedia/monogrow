"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  Globe, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  FileText
} from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Categories", href: "#categories" },
    { name: "Bulk Products", href: "#products" },
    { name: "Why Monagrow", href: "#why-choose-us" },
    { name: "Wholesale RFQ", href: "#calculator" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Wholesale Highlights Bar (Monagrow Best Things / USPs) */}
      <div className="bg-[#0e2439] text-[#e0e9f1] text-xs py-2.5 px-4 sm:px-8 lg:px-12 border-b border-white/10 hidden md:block w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <span className="flex items-center gap-1.5 text-[#fbbf24] font-bold uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24]" />
              Why Monagrow:
            </span>
            <span className="flex items-center gap-1.5 text-white/95 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              100% Direct Farm Sourcing
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-white/95 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              8.9mm Extra Long Basmati (2.2x Elongation)
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-white/95 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              Zero Middlemen • Direct Ex-Mill Bulk Rates
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-white/95 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              Custom OEM & Private Labelling
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-[#4ade80] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
              SGS Lab Tested & ISO 22000
            </span>
            <span className="text-white/30">•</span>
            <button
              onClick={() => onOpenQuoteModal("Bulk Commodity Sample Kit")}
              className="text-[#fbbf24] font-bold hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Request Sample Kit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3"
            : "bg-white/90 backdrop-blur-sm py-4 border-b border-black/5"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Logo Brandmark - EXACT LOGO ONLY */}
          <a href="#" className="flex items-center group">
            <Image
              src="/assets/monagrow-logo-exact.jpg"
              alt="Monagrow"
              width={220}
              height={70}
              className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply group-hover:opacity-90 transition-opacity"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/80 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-sm font-semibold text-stone-700 hover:text-stone-950 hover:bg-white transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title="Search wholesale catalog"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuoteModal("Quick Wholesale Price List")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1c4a27] to-[#256837] text-white text-sm font-bold shadow-md shadow-[#1c4a27]/20 hover:shadow-lg hover:shadow-[#1c4a27]/30 hover:brightness-110 transition-all duration-200"
            >
              <span>Get Wholesale Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3.5 py-1.5 rounded-full bg-[#1c4a27] text-white text-xs font-bold sm:hidden"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-100 text-stone-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="max-w-4xl mx-auto mt-3 px-4 pb-2 transition-all">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search commodities: Basmati Rice, Arabica Coffee, Refined Sugar, California Almonds..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-stone-300 shadow-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 text-xs bg-stone-100 px-2 py-1 rounded-md text-stone-600 hover:bg-stone-200"
              >
                ESC
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white/98 backdrop-blur-md px-6 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-stone-800 hover:text-[#1c4a27] py-2 border-b border-stone-100"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-xl bg-[#1c4a27] text-white font-bold text-center flex items-center justify-center gap-2"
              >
                <span>Request Wholesale Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="text-xs text-stone-500 text-center pt-2">
                Export Desk: info@monagrow.com | +977 1 4589200
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
