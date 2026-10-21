"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isPastParallax, setIsPastParallax] = useState(false);

  // Track scroll position:
  // 1. When scrolled past the hero parallax section, buttons turn maroon
  // 2. Hide navbar ONLY when the footer appears
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero parallax section (#home)
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // rect.bottom is the bottom of the hero section relative to viewport top
        setIsPastParallax(rect.bottom <= 80);
      }

      // Check if footer has appeared
      const footerEl = document.getElementById("contact") || document.querySelector("footer");
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        // Hide when the footer begins appearing in the viewport
        setIsVisible(rect.top > window.innerHeight);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Categories", href: "#categories" },
    { name: "About Us", href: "#about-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-all duration-300 py-3 sm:py-4 pointer-events-auto ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 flex items-center justify-between">
        
        {/* Left: Navigation Buttons (White before parallax, Maroon after parallax) */}
        <div className="flex-1 flex items-center justify-start">
          <nav className="flex items-center gap-2.5 sm:gap-4 md:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${
                  isPastParallax
                    ? "text-[#800020] hover:text-[#520014]"
                    : "text-white hover:text-stone-300"
                } font-bold text-sm sm:text-base md:text-lg tracking-wide transition-colors duration-200 py-1 whitespace-nowrap`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo in pure Maroon without any glow effect */}
        <div className="flex items-center justify-center shrink-0">
          <a
            href="#"
            className="inline-flex items-center justify-center select-none group py-0.5"
            aria-label="MonaGrow Home"
          >
            <Image
              src="/assets/monagrow-logo-transparent.png"
              alt="MonaGrow"
              width={320}
              height={200}
              priority
              className="h-14 sm:h-18 md:h-22 lg:h-[84px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </a>
        </div>

        {/* Right: "Get Wholesale Quote" CTA button with Maroon Color and NO shadow */}
        <div className="flex-1 flex items-center justify-end">
          <button
            type="button"
            onClick={() => onOpenQuoteModal("Quick Wholesale Price List")}
            className="flex items-center gap-1.5 sm:gap-2.5 pl-3.5 sm:pl-4 md:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all duration-200 group shrink-0 whitespace-nowrap cursor-pointer shadow-none hover:shadow-none"
          >
            <span className="tracking-wide">Get Wholesale Quote</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-none">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#800020] stroke-[2.5]" />
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
