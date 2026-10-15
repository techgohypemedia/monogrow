"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Menu, 
  X, 
  ArrowUpRight
} from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Categories", href: "#categories" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full overflow-x-clip ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs py-2.5 sm:py-3"
          : "bg-white py-3 sm:py-4"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 xl:px-8 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center shrink-0">
          <Image
            src="/assets/monagrow-logo-exact.jpg"
            alt="Monagrow"
            width={165}
            height={52}
            className="h-8 sm:h-9 xl:h-10 w-auto object-contain mix-blend-multiply transition-opacity hover:opacity-90"
            priority
          />
        </a>

        {/* Center: Desktop Navigation Links (Clean without button background) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 text-[15px] font-semibold text-stone-700 hover:text-[#57a42f] transition-colors duration-200 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Pill CTA Button + Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Primary CTA Pill Button: Get Wholesale Quote */}
          <button
            onClick={() => onOpenQuoteModal("Quick Wholesale Price List")}
            className="flex items-center gap-2 sm:gap-2.5 pl-3.5 sm:pl-5 pr-1.5 py-1.5 sm:py-2 rounded-full bg-[#57a42f] hover:bg-[#478726] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200 group shrink-0 whitespace-nowrap cursor-pointer"
          >
            <span className="tracking-wide">Get Wholesale Quote</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#57a42f] stroke-[2.5]" />
            </span>
          </button>

          {/* Mobile / Tablet Menu Toggle Button (Clean without button background) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white/98 backdrop-blur-md px-4 sm:px-6 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-3 text-sm font-semibold text-stone-700 hover:text-[#57a42f] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal("Quick Wholesale Price List");
              }}
              className="w-full py-3 rounded-full bg-[#57a42f] text-white font-medium text-sm text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Get Wholesale Quote</span>
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#57a42f] stroke-[2.5]" />
              </span>
            </button>
            
            <div className="text-xs text-stone-500 text-center pt-1">
              Export Desk: info@monagrow.com | +977 1 4589200
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
