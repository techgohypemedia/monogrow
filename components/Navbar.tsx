"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  X, 
  ArrowUpRight,
  Package,
  Calculator,
  ShieldCheck,
  PhoneCall,
  Mail,
  ChevronRight
} from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePos({ x, y });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when menu is open on mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Categories", href: "#categories" },
    { name: "About Us", href: "#about-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full bg-white ${
          isScrolled
            ? "py-2.5 sm:py-3 bg-white/98 backdrop-blur-md"
            : "py-3 sm:py-3.5 bg-white"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 flex items-center justify-between">
          
          {/* Left: 3-Vertical-Bar Hamburger Menu Icon with Taller Center Bar (Exact Replica of Provided Screenshot) */}
          <div className="flex-1 flex items-center justify-start">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 sm:p-2.5 -ml-2 rounded-lg hover:bg-stone-100 active:scale-95 transition-all text-[#800020] flex items-center justify-center cursor-pointer group"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              title="Menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#800020] stroke-[2.5]" />
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#800020] group-hover:text-[#650019] transition-colors"
                  aria-hidden="true"
                >
                  {/* Three vertical parallel pill bars: middle bar is taller, outer bars are shorter (exact replica of provided screenshot) */}
                  <rect x="4.5" y="5.5" width="2.6" height="13" rx="1.3" />
                  <rect x="10.7" y="2.5" width="2.6" height="19" rx="1.3" />
                  <rect x="16.9" y="5.5" width="2.6" height="13" rx="1.3" />
                </svg>
              )}
            </button>
          </div>

          {/* Center: Brand Typography in ONE LINE with Exact Same Tall Condensed Font-Style */}
          <div className="flex items-center justify-center shrink-0">
            <a
              href="#"
              className="inline-flex items-center justify-center font-navbar-brand select-none group py-0.5"
              aria-label="MonaGrow Home"
            >
              <span className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#800020] tracking-[0.06em] leading-none transition-transform duration-200 group-hover:scale-[1.02] uppercase whitespace-nowrap">
                MonaGrow
              </span>
            </a>
          </div>

          {/* Right: "Get Wholesale Quote" CTA button with Maroon Color (Replaces Cart Icon) */}
          <div className="flex-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onOpenQuoteModal("Quick Wholesale Price List")}
              className="flex items-center gap-1.5 sm:gap-2.5 pl-3 sm:pl-4 md:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 group shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span className="tracking-wide">Get Wholesale Quote</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#800020] stroke-[2.5]" />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Full-screen Hamburger Navigation Overlay (Matching Reference Screenshot Layout) */}
      {menuOpen && (
        <div 
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-50 w-screen h-screen bg-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-300 select-none"
        >
          {/* Top Bar inside Fullscreen Menu */}
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-5 sm:pt-7 pb-4 flex items-center justify-between shrink-0 z-30">
            {/* Left: Close Button */}
            <div className="flex-1 flex items-center justify-start">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 sm:p-2.5 -ml-2 rounded-xl hover:bg-stone-100 text-[#800020] flex items-center gap-2 cursor-pointer transition-all group"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] text-[#800020] group-hover:rotate-90 transition-transform duration-200" />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-[#800020] transition-colors">
                  Close
                </span>
              </button>
            </div>

            {/* Center: Brand Typography in ONE line with exact tall condensed display font */}
            <div className="flex items-center justify-center shrink-0">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="font-navbar-brand text-2xl sm:text-3xl md:text-[34px] font-bold text-[#800020] tracking-[0.06em] leading-none uppercase"
                aria-label="MonaGrow Home"
              >
                MonaGrow
              </a>
            </div>

            {/* Right: Balanced empty spacer */}
            <div className="flex-1" />
          </div>

          {/* Center Main Stage: Huge Typography on Left + Movable Products on Right */}
          <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden my-auto">
            
            {/* Left Column: Big Condensed Typography Links matching Screenshot */}
            <nav className="w-full lg:w-1/2 flex flex-col justify-center space-y-2 sm:space-y-4 lg:space-y-5 z-20 py-4 lg:py-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group block font-navbar-brand text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold text-[#800020] hover:text-[#420010] leading-[0.95] tracking-tight transition-all duration-200 cursor-pointer"
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-4">
                    {item.name}
                  </span>
                </a>
              ))}
            </nav>

            {/* Right Column: Interactive Movable Floating Cutout Bags with Cursor Parallax */}
            <div className="w-full lg:w-1/2 h-[340px] sm:h-[440px] lg:h-[600px] relative flex items-center justify-center pointer-events-none lg:pointer-events-auto">
              
              {/* Product 1: Pure Cutout Bag of Monagrow Basmati Rice (Top-Left quadrant, tilted left like reference) */}
              <div
                className="absolute z-20 transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing group select-none"
                style={{
                  top: "4%",
                  left: "4%",
                  transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 12}px) rotate(${-7 + mousePos.x * 4}deg)`,
                }}
              >
                <div className="relative w-32 sm:w-40 md:w-48 lg:w-52 aspect-[3/4] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/assets/monagrow-rice-bag-cutout.png"
                    alt="Monagrow 5kg Premium Basmati Rice Bag Cutout"
                    fill
                    className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.14)]"
                    sizes="(max-width: 768px) 140px, 208px"
                    priority
                  />
                </div>
              </div>

              {/* Product 2: Pure Cutout Bag of Monagrow Refined Cane Sugar (Lower-Center, closer but non-overlapping) */}
              <div
                className="absolute z-30 transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing group select-none"
                style={{
                  bottom: "8%",
                  left: "54%",
                  transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 10}px) rotate(${3 + mousePos.x * 3}deg)`,
                }}
              >
                <div className="relative w-32 sm:w-40 md:w-48 lg:w-52 aspect-[3/4] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/assets/monagrow-sugar-bag-cutout.png"
                    alt="Monagrow 5kg Premium Refined Cane Sugar Bag Cutout"
                    fill
                    className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.14)]"
                    sizes="(max-width: 768px) 140px, 208px"
                  />
                </div>
              </div>

              {/* Product 3: Pure Cutout Bag of Monagrow Specialty Estate Coffee (Upper-Right quadrant, non-overlapping) */}
              <div
                className="absolute z-10 transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing group select-none"
                style={{
                  top: "14%",
                  right: "4%",
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px) rotate(${8 + mousePos.x * 5}deg)`,
                }}
              >
                <div className="relative w-32 sm:w-40 md:w-48 lg:w-52 aspect-[3/4] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/assets/monagrow-coffee-bag-cutout.png"
                    alt="Monagrow 2.5kg Specialty Estate Coffee Bag Cutout"
                    fill
                    className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.14)]"
                    sizes="(max-width: 768px) 140px, 208px"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Row: Social Links (Matching Reference Screenshot: FACEBOOK INSTAGRAM TWITTER) */}
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-6 sm:pb-8 pt-3 flex items-center justify-between shrink-0 border-t border-stone-100 z-30">
            <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold uppercase tracking-widest text-stone-500">
              <a href="#" className="hover:text-[#800020] transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-[#800020] transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-[#800020] transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-[#800020] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
