"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onOpenQuoteModal: (productName?: string) => void;
  immersiveHero?: boolean;
  glassEffect?: boolean;
}

const CATEGORY_OPTIONS = [
  { name: "Rice", href: "/rice" },
  { name: "Coffee", href: "/coffee" },
  { name: "Sugar", href: "/sugar" },
  { name: "Dry Fruits", href: "/dry-fruits" },
];

const SECONDARY_NAV_LINKS = [
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({
  onOpenQuoteModal,
  immersiveHero = false,
  glassEffect = false,
}: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [overHero, setOverHero] = useState(immersiveHero);
  const [overCollection, setOverCollection] = useState(false);

  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const collection = document.getElementById("categories")?.getBoundingClientRect();
      setOverCollection(Boolean(collection && collection.top <= 45 && collection.bottom > 45));
      if (immersiveHero) {
        const hero = document.getElementById("home");
        setOverHero(Boolean(hero && hero.getBoundingClientRect().bottom > 80 && hero.getBoundingClientRect().top <= 80));
      }

      // Hide navbar when footer appears
      const isHome = typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "");
      const footerEl = isHome ? document.querySelector("footer") : null;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight);
      } else {
        setIsVisible(true);
      }
    };

    const handleResize = () => {
      handleScroll();
      if (window.innerWidth >= 1024) {
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

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Native modal behavior keeps keyboard focus inside the menu and restores it on close.
  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) return;
    if (!isMobileMenuOpen) {
      dialog.close();
      return;
    }
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        data-dark={overHero ? "true" : undefined}
        data-collection={overCollection ? "true" : undefined}
        style={{
          backgroundColor: (overHero || overCollection)
            ? "transparent"
            : glassEffect
            ? "#fcfbf7"
            : isScrolled
            ? "#fcfbf7"
            : "transparent",
          backdropFilter: (overHero || overCollection || (!glassEffect && !isScrolled))
            ? "none"
            : "blur(14px) saturate(160%)",
          WebkitBackdropFilter: (overHero || overCollection || (!glassEffect && !isScrolled))
            ? "none"
            : "blur(14px) saturate(160%)",
          borderBottom: (overHero || overCollection || (!glassEffect && !isScrolled))
            ? "none"
            : "1px solid rgba(116, 7, 7, 0.06)",
          boxShadow: (overHero || overCollection || (!glassEffect && !isScrolled))
            ? "none"
            : "0 4px 20px 0 rgba(0, 0, 0, 0.03)",
        }}
        className={`monagrow-hero-nav fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-auto ${isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
          } ${isScrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3.5"}`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">

          {/* Left: Navigation Links on Desktop, 3-Bar Hamburger Icon on Mobile */}
          <div className="flex-1 flex items-center justify-start">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Categories Dropdown Nav Button */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen((prev) => !prev)}
                  className={`font-semibold text-sm xl:text-base tracking-normal transition-colors duration-200 py-1 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${overHero
                      ? "text-white hover:text-[#740707]"
                      : "text-[#740707] hover:text-[#4a0404]"
                    }`}
                  aria-expanded={isCategoriesOpen}
                  aria-haspopup="true"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 lg:w-4 lg:h-4 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${isCategoriesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 -translate-y-2 pointer-events-none invisible"
                    }`}
                >
                  <div className="w-52 bg-white/95 backdrop-blur-2xl rounded-2xl border border-[#740707]/15 shadow-xl p-1.5 flex flex-col gap-0.5 text-left">
                    {CATEGORY_OPTIONS.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 hover:bg-[#740707]/8"
                      >
                        <span className="font-bold text-sm md:text-base text-[#30241e] group-hover:text-[#740707] transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary Navigation Links (About Us, Contact) */}
              {SECONDARY_NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-semibold text-sm xl:text-base tracking-normal transition-colors duration-200 py-1 whitespace-nowrap ${overHero
                      ? "text-white hover:text-[#740707]"
                      : "text-[#740707] hover:text-[#4a0404]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger Button (Custom 3-Vertical-Bar Icon) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center p-2 -ml-2 rounded-lg transition-colors duration-200 cursor-pointer ${overHero
                  ? "text-white hover:bg-white/10 active:bg-white/20"
                  : "text-[#740707] hover:bg-black/5 active:bg-black/10"
                }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
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
                className="h-12 sm:h-14 lg:h-[64px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Right: "Get Wholesale Quote" CTA button with Maroon Color */}
          <div className="flex-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onOpenQuoteModal("Quick Wholesale Price List")}
              className="flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full bg-[#740707] hover:bg-[#5e0606] active:bg-[#4a0404] text-white font-semibold text-xs sm:text-sm md:text-base border border-transparent hover:shadow-md transition-all duration-200 group shrink-0 whitespace-nowrap cursor-pointer shadow-none"
            >
              <span className="tracking-wide hidden sm:inline">Get a Quote</span>
              <span className="tracking-wide sm:hidden">Quote</span>
            </button>
          </div>

        </div>
      </header>

      <dialog
        ref={mobileDialogRef}
        id="mobile-navigation"
        aria-label="Main navigation"
        className={styles.drawer}
        onCancel={() => setIsMobileMenuOpen(false)}
        onClose={() => {
          setIsMobileMenuOpen(false);
          setIsMobileCategoriesOpen(false);
        }}
        onClick={event => {
          if (event.target === event.currentTarget) setIsMobileMenuOpen(false);
        }}
      >
        <div className={styles.panel}>
          <div className={styles.drawerHeader}>
            <Link href="/" aria-label="Monagrow home" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/assets/monagrow-official-logo.png" alt="Monagrow" width={220} height={110} className={styles.drawerLogo} />
            </Link>
            <button type="button" autoFocus className={styles.close} aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)}><X size={22} /></button>
          </div>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <div>
              <button type="button" className={styles.navLink} aria-expanded={isMobileCategoriesOpen} aria-controls="mobile-categories" onClick={() => setIsMobileCategoriesOpen(value => !value)}>
                Categories <ChevronDown size={20} className={styles.chevron} data-expanded={isMobileCategoriesOpen} />
              </button>
              <div id="mobile-categories" className={styles.accordion} data-expanded={isMobileCategoriesOpen} inert={!isMobileCategoriesOpen}>
                <div className={styles.accordionInner}>
                  <div className={styles.categoryLinks}>
                    {CATEGORY_OPTIONS.map(item => <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
                  </div>
                </div>
              </div>
            </div>
            {SECONDARY_NAV_LINKS.map(link => <Link key={link.href} href={link.href} className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>{link.name}<ArrowUpRight size={19} aria-hidden="true" /></Link>)}
          </nav>
          <button type="button" className={styles.quote} onClick={() => {
            setIsMobileMenuOpen(false);
            onOpenQuoteModal("Quick Wholesale Price List");
          }}>Get Wholesale Quote <ArrowUpRight size={19} aria-hidden="true" /></button>
        </div>
      </dialog>
    </>
  );
}
