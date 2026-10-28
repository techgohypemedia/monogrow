"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { loadHeroMotion } from "./heroMotion";

interface FooterProps {
  onOpenQuoteModal?: (topic?: string) => void;
}

export default function Footer({ onOpenQuoteModal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // ========================================================
  // SCROLL-DRIVEN SLIDING ANIMATION ("MONAGROW")
  // Tracks viewport intersection of the footer directly.
  // As the user scrolls into the footer, "MONAGROW" visibly slides
  // in from right to left, and firmly STOPS when fully shown.
  // ========================================================
  useEffect(() => {
    let cancelled = false;
    let cleanupGsap: (() => void) | undefined;
    let gsapActive = false;

    // Apply translation to text element
    const setOffset = (offset: number) => {
      if (!textRef.current) return;
      textRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    // 1. Direct viewport calculation (guaranteed to work immediately without CDN wait)
    const updatePosition = () => {
      if (!footerRef.current || !textRef.current || cancelled || gsapActive) return;

      // Honor accessibility preferences
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setOffset(0);
        return;
      }

      const rect = footerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // If footer is entirely below the viewport:
      if (rect.top >= vh) {
        const maxSlide = Math.min(window.innerWidth * 0.52, 600);
        setOffset(maxSlide);
        return;
      }

      // Exact scroll range:
      // start: when footer top enters the bottom of the viewport (rect.top = vh)
      // end: when footer reaches the bottom of the screen (rect.bottom <= vh)
      const footerHeight = Math.max(rect.height, 300);
      const scrolled = vh - rect.top;
      let progress = scrolled / footerHeight;
      progress = Math.max(0, Math.min(1, progress));

      // Ease out curve: starts with swift slide, smoothly decelerates and stops at 0
      const ease = 1 - Math.pow(1 - progress, 2.4);
      const maxSlide = Math.min(window.innerWidth * 0.52, 600);
      const currentOffset = maxSlide * (1 - ease);

      setOffset(currentOffset);
    };

    // 2. High-frequency continuous render loop (catches Lenis, mouse wheel, trackpad, touch)
    let rafId: number;
    const loop = () => {
      updatePosition();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    updatePosition();

    // 3. Hook into GSAP ScrollTrigger if available (matches CategorySection and ProductMarquee)
    loadHeroMotion()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !footerRef.current || !textRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const footer = footerRef.current!;
          const slideDist = Math.min(window.innerWidth * 0.52, 600);
          gsapActive = true;

          const progress = { value: 0 };
          const tween = gsap.to(progress, {
            value: 1,
            ease: "none",
            onUpdate: () => {
              const ease = 1 - Math.pow(1 - progress.value, 2.4);
              const offset = slideDist * (1 - ease);
              setOffset(offset);
            },
            scrollTrigger: {
              trigger: footer,
              start: "top bottom", // Starts as soon as footer enters viewport
              end: "bottom bottom", // Stops when footer is in view at bottom of page
              scrub: 1, // Smooth interpolation tied directly to Lenis/scroll
              invalidateOnRefresh: true,
            },
          });

          ScrollTrigger.refresh();

          return () => {
            tween.kill();
            gsapActive = false;
          };
        });

        cleanupGsap = () => {
          media.revert();
        };
      })
      .catch(() => {
        // Fallback ticker continues smoothly if CDN is unavailable
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (cleanupGsap) cleanupGsap();
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full bg-[#800020] text-[#800020] px-3 sm:px-6 lg:pl-10 lg:pr-0 pt-4 sm:pt-6 lg:pt-14 pb-4 sm:pb-6 lg:pb-14 overflow-hidden select-none"
    >
      {/* ========================================================
          SIGNATURE CURVED WHITE CARD ON MAROON BACKDROP
          Mobile: Arched dome top matching mobile reference screenshot.
          Desktop: Iconic deep sculptural stadium curve on the left.
          ======================================================== */}
      <div className="relative w-full bg-white text-[#800020] rounded-t-[140px] sm:rounded-t-[200px] rounded-b-none lg:rounded-t-none lg:rounded-tl-[420px] lg:rounded-bl-[420px] xl:rounded-tl-[520px] xl:rounded-bl-[520px] lg:rounded-r-none overflow-hidden shadow-2xl pt-20 sm:pt-28 lg:pt-16 pb-4 sm:pb-6 lg:pb-10 px-6 sm:px-10 lg:pl-36 lg:pr-14 border-x border-t lg:border-x-0 lg:border-l lg:border-y border-[#800020]/15">
        
        {/* Subtle interior lighting depth */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#800020]/5 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#800020]/5 blur-3xl pointer-events-none"
        />

        {/* ========================================================
            TOP ZONE: RESPONSIVE CONTENT GRID
            Mobile: Stacks into:
              1. Brand Logo + "The Taste of Purity" + Copyright
              2. Navigation & Support side by side in 2 columns
              3. Newsletter Pill & Socials
            Desktop: Elegant 4-column layout
            ======================================================== */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-start">
          
          {/* Section 1: Brand Logo, Tagline & Direct Contact */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between">
            <div>
              {/* Monagrow Official Peacock Brand Logo (from Uploaded PDF) */}
              <div className="mb-1 sm:mb-1.5">
                <a href="/" className="inline-block group select-none" aria-label="Monagrow Home">
                  <Image
                    src="/assets/monagrow-official-logo.png"
                    alt="Monagrow Global"
                    width={280}
                    height={140}
                    priority
                    className="h-14 sm:h-18 lg:h-22 w-auto object-contain object-left transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </a>
              </div>

              {/* Official Brand Tagline in Maroon */}
              <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#800020] tracking-tight leading-snug max-w-sm -mt-0.5 sm:-mt-1">
                The Taste of Purity
              </h2>

              {/* Copyright & accreditation */}
              <p className="mt-3 sm:mt-5 text-xs sm:text-[13px] text-[#800020]/70 leading-relaxed font-normal">
                &copy; 2026 Monagrow Global / Direct Origin Agro Export &bull; ISO 22000 Certified
              </p>
            </div>

            {/* Direct Contact Snapshot */}
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#800020]/15 space-y-2 text-xs text-[#800020]/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                <span className="font-semibold text-[#800020]">+977 1 4589200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                <span className="font-semibold text-[#800020]">info@monagrow.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                <span>Kathmandu, Nepal (Port &amp; CFS Network)</span>
              </div>
            </div>
          </div>

          {/* Section 2: NAVIGATION & SUPPORT
              Mobile: Side-by-side 2-column grid matching the mobile reference screenshot!
              Desktop: Unwraps via lg:contents into two dedicated 2-column grid spans. */}
          <div className="w-full grid grid-cols-2 gap-6 sm:gap-8 lg:contents">
            
            {/* Column 2: NAVIGATION */}
            <div className="lg:col-span-2 xl:col-span-2">
              <h3 className="text-xs font-bold tracking-widest text-[#800020] uppercase mb-3.5 sm:mb-4">
                NAVIGATION
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] text-[#800020]/80 font-medium">
                <li>
                  <a href="/" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Home Overview
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    About Monagrow
                  </a>
                </li>
                <li>
                  <a href="/#categories" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Basmati Rice 8.9mm
                  </a>
                </li>
                <li>
                  <a href="/#categories" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Specialty Coffee
                  </a>
                </li>
                <li>
                  <a href="/#categories" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Refined Sugar ICUMSA
                  </a>
                </li>
                <li>
                  <a href="/#categories" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Royal Cashew Kernels
                  </a>
                </li>
                <li>
                  <a href="/#calculator" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Trade Cost Estimator
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: SUPPORT */}
            <div className="lg:col-span-2 xl:col-span-2">
              <h3 className="text-xs font-bold tracking-widest text-[#800020] uppercase mb-3.5 sm:mb-4">
                SUPPORT
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] text-[#800020]/80 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal?.("Export Inquiries")}
                    className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5 text-left cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal?.("Proforma Invoice")}
                    className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5 text-left cursor-pointer"
                  >
                    Shipping &amp; Returns
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal?.("Customer Support")}
                    className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5 text-left cursor-pointer"
                  >
                    Customer Support
                  </button>
                </li>
                <li>
                  <a href="/#philosophy" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Food Safety Compliance
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-[#800020] hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5">
                    Incoterms 2020 Rules
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Section 3: GET THE LATEST FROM MONAGROW & FOLLOW US */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-start">
            <h3 className="text-xs font-bold tracking-widest text-[#800020] uppercase mb-3">
              GET THE LATEST FROM MONAGROW.
            </h3>

            {/* Pill Newsletter Form in Maroon Theme */}
            {isSubscribed ? (
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#800020] text-white text-xs sm:text-sm font-bold w-fit shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-md bg-[#800020]/5 border border-[#800020]/30 rounded-full p-1 pl-4 sm:pl-5 flex items-center justify-between gap-2 focus-within:border-[#800020] focus-within:bg-[#800020]/8 focus-within:ring-2 focus-within:ring-[#800020]/15 transition-all duration-200"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="bg-transparent text-[#800020] placeholder-[#800020]/50 text-xs sm:text-sm focus:outline-none flex-1 min-w-0 py-1.5"
                />
                <button
                  type="submit"
                  className="bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer active:scale-95 shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* FOLLOW US Section with Circular Social Icons */}
            <div className="mt-6 sm:mt-7">
              <h4 className="text-xs font-bold tracking-widest text-[#800020] uppercase mb-3">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#800020]/5 hover:bg-[#800020] text-[#800020] hover:text-white border border-[#800020]/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#800020]/5 hover:bg-[#800020] text-[#800020] hover:text-white border border-[#800020]/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Quote Trigger */}
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => onOpenQuoteModal?.("Direct Inquiry")}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#800020] hover:bg-[#68001a] text-white text-xs font-semibold transition-all cursor-pointer group shadow-sm active:scale-95"
              >
                <span>Request B2B Wholesale Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================
            BOTTOM ZONE: OFFICIAL "MONAGROW" WORDMARK SLIDING TEXT
            Uses the official brand serif wordmark (with the signature leaves inside the 'O')
            in pure brand Maroon with refined, elegant weight.
            Scroll-driven: slides in smoothly from right towards left as you scroll into the footer,
            and stops cleanly when the full wordmark is completely displayed.
            ======================================================== */}
        <div className="relative w-full overflow-hidden flex justify-center items-center pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-8 lg:pb-12 select-none px-4 sm:px-8 lg:px-18">
          <div
            ref={textRef}
            className="w-full flex justify-center items-center will-change-transform pointer-events-none select-none"
            style={{
              willChange: "transform",
            }}
          >
            <Image
              src="/assets/monagrow-official-wordmark-maroon.png"
              alt="MONAGROW"
              width={1043}
              height={150}
              priority
              className="w-auto h-[12vw] sm:h-[10.5vw] max-h-[145px] min-h-[38px] max-w-[95%] object-contain drop-shadow-[0_4px_16px_rgba(128,0,32,0.06)]"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
