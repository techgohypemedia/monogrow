"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
  immersiveHero?: boolean;
}

export default function Navbar({ onOpenQuoteModal, immersiveHero = false }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(immersiveHero);
  const [overCollection, setOverCollection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const collection = document.getElementById("categories")?.getBoundingClientRect();
      setOverCollection(Boolean(collection && collection.top <= 45 && collection.bottom > 45));
      if (immersiveHero) {
        const hero = document.getElementById("home");
        setOverHero(Boolean(hero && hero.getBoundingClientRect().bottom > 90));
      }

      // Hide navbar when footer appears
      const footerEl = document.getElementById("contact") || document.querySelector("footer");
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight);
      } else {
        setIsVisible(true);
      }
    };

    const handleResize = () => {
      handleScroll();
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [immersiveHero]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Categories", href: "/#categories" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        data-dark={overHero ? "true" : undefined}
        data-collection={overCollection ? "true" : undefined}
        style={{
          backgroundColor: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: "none",
          boxShadow: "none",
        }}
        className={`monagrow-hero-nav fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-auto ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${isScrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3.5"}`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 flex items-center justify-between">
          
          {/* Left: Navigation Links on Desktop, 3-Bar Hamburger Icon on Mobile */}
          <div className="flex-1 flex items-center justify-start">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#800020] hover:text-[#520014] font-bold text-base md:text-xl lg:text-[22px] tracking-wide transition-colors duration-200 py-1 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Button (Custom 3-Vertical-Bar Icon) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 -ml-2 rounded-lg text-[#800020] hover:bg-black/5 active:bg-black/10 transition-colors duration-200 cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                viewBox="0 0 18 22"
                fill="currentColor"
                className="w-5 h-6 drop-shadow-xs"
                aria-hidden="true"
              >
                <rect x="1" y="4" width="3.2" height="14" rx="1.6" />
                <rect x="7.4" y="1" width="3.2" height="20" rx="1.6" />
                <rect x="13.8" y="4" width="3.2" height="14" rx="1.6" />
              </svg>
            </button>
          </div>

          {/* Center: Official Brand Logo with Peacock Motif in pure Maroon */}
          <div className="flex items-center justify-center shrink-0 px-2 sm:px-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center select-none group py-0.5"
              aria-label="Monagrow Home"
            >
              <Image
                src="/assets/monagrow-official-logo.png"
                style={{ filter: "none" }}
                alt="Monagrow"
                width={320}
                height={160}
                priority
                className="h-12 sm:h-14 md:h-[68px] lg:h-[78px] xl:h-[84px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Right: "Get Wholesale Quote" CTA button with Maroon Color */}
          <div className="flex-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onOpenQuoteModal("Quick Wholesale Price List")}
              className="flex items-center gap-1.5 sm:gap-2.5 pl-3.5 sm:pl-4.5 md:pl-5 pr-1.5 sm:pr-2 py-2 sm:py-2.5 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-semibold text-xs sm:text-sm md:text-base border border-transparent hover:shadow-md transition-all duration-200 group shrink-0 whitespace-nowrap cursor-pointer shadow-none"
            >
              <span className="tracking-wide hidden xs:inline sm:inline">Get a Quote</span>
              <span className="tracking-wide xs:hidden sm:hidden">Quote</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#800020] stroke-[2.5]" />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay & Panel */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-start"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full bg-white/95 backdrop-blur-2xl border-b border-stone-200 shadow-2xl px-6 pt-5 pb-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row inside Drawer */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center"
              >
                <Image
                  src="/assets/monagrow-official-logo.png"
                  style={{ filter: "none" }}
                  alt="Monagrow"
                  width={220}
                  height={110}
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-stone-600 hover:text-[#800020] hover:bg-stone-100 active:bg-stone-200 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#800020] hover:text-[#520014] font-extrabold text-lg sm:text-xl tracking-tight py-2.5 px-3 rounded-lg hover:bg-[#800020]/5 active:bg-[#800020]/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Quote Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal("Quick Wholesale Price List");
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-bold text-sm sm:text-base tracking-wide shadow-md active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Get Wholesale Quote</span>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#800020] stroke-[2.5]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
