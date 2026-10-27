"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const NEWSLETTER_PRODUCTS = [
  {
    name: "Basmati Rice 8.9mm",
    tag: "Flagship Grain",
    image: "/assets/monagrow-rice-bag-cutout.png",
    alt: "Monagrow Extra Long Grain Basmati Rice",
  },
  {
    name: "Specialty Estate Coffee",
    tag: "Highland Arabica",
    image: "/assets/monagrow-coffee-bag-cutout.png",
    alt: "Monagrow Specialty Estate Coffee",
  },
  {
    name: "Refined Sugar ICUMSA 45",
    tag: "Pure Cane Sugar",
    image: "/assets/monagrow-sugar-bag-cutout.png",
    alt: "Monagrow Refined Sugar ICUMSA 45",
  },
  {
    name: "Royal Cashew Kernels",
    tag: "Export W320 Grade",
    image: "/assets/monagrow-cashews-bag-cutout.png",
    alt: "Monagrow Royal Cashew Kernels",
  },
];

export default function Footer({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal?: (topic?: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Auto-cycle products one by one with a smooth crossfade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % NEWSLETTER_PRODUCTS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div id="contact" className="relative bg-[#fbf9f8] pt-12 sm:pt-16 lg:pt-20">
      
      {/* ========================================================
          1. FLOATING NEWSLETTER BANNER (Matching Screenshot 1 Layout)
          Overlaps the white footer below with negative bottom margin
          ======================================================== */}
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-20 -mb-16 sm:-mb-20 lg:-mb-24">
        <div className="rounded-3xl px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 relative overflow-hidden text-white bg-linear-to-br from-[#4f0014] via-[#800020] to-[#a01c3c]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Column: Automated Cycling Monagrow Products with Smooth Crossfade */}
            <div className="flex items-center justify-center">
              <div className="relative w-56 sm:w-64 lg:w-72 aspect-square flex items-center justify-center">
                {/* Glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white/20 blur-3xl scale-110 pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute inset-6 rounded-full bg-[#ffd6a5]/20 blur-2xl pointer-events-none"
                />

                {/* All 4 Real Website Products Crossfading One by One */}
                {NEWSLETTER_PRODUCTS.map((prod, idx) => {
                  const isActive = idx === activeProductIndex;
                  return (
                    <div
                      key={prod.name}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                        isActive
                          ? "opacity-100 scale-100 translate-y-0 z-10 pointer-events-auto"
                          : "opacity-0 scale-95 translate-y-2 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={prod.image}
                        alt={prod.alt}
                        fill
                        preload={idx === 0}
                        className="object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.4)]"
                        sizes="(max-width: 640px) 224px, 288px"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Newsletter Heading, Subtitle, Pill Form & Disclaimers */}
            <div className="flex flex-col justify-center text-white text-center lg:text-left items-center lg:items-start">

              {/* Streamlined Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-white mb-2">
                Weekly wholesale rates and harvest updates
              </h2>

              {/* Streamlined Subtitle */}
              <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed mb-5 max-w-lg">
                FOB port pricing, container availability, and seasonal harvest reports, every week.
              </p>

              {/* 14px Border Radius Email Field */}
              {isSubscribed ? (
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-[14px] bg-white text-[#800020] text-xs sm:text-sm font-bold shadow-none w-fit">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  style={{ boxShadow: "none" }}
                  className="bg-white/15 backdrop-blur-md border border-white/30 rounded-[14px] p-1.5 pl-4 sm:pl-5 flex items-center gap-2 w-full max-w-lg transition-all focus-within:bg-white/20 focus-within:border-white shadow-none"
                >
                  <Mail className="w-4 h-4 text-white/70 shrink-0 hidden sm:block" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent text-white placeholder-white/70 text-xs sm:text-sm focus:outline-none flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    style={{ boxShadow: "none" }}
                    className="bg-white hover:bg-stone-100 text-[#800020] text-[15px] sm:text-base font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-[10px] transition-all duration-200 shrink-0 active:scale-95 cursor-pointer flex items-center gap-2 group shadow-none"
                  >
                    <span className="text-[15px] sm:text-base font-bold tracking-normal">Subscribe</span>
                    <ArrowRight className="w-4.5 h-4.5 text-[#800020] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}

              {/* Streamlined Single-Line Disclaimer */}
              <p className="mt-3 text-xs text-white/70">
                Unsubscribe anytime &bull;{" "}
                <a href="#privacy" className="underline underline-offset-2 text-white/80 hover:text-white transition-colors">
                  Privacy policy
                </a>
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          2. MAIN WHITE FOOTER (Matching Screenshot 1 Layout)
          Clean 5-column structure with pure white background
          ======================================================== */}
      <footer className="bg-white pt-28 sm:pt-32 lg:pt-36 pb-10 border-t border-stone-200/80">
        <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          
          {/* Main Layout: Brand Column on Left, 4 Evenly Spaced Columns on Right */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-8 xl:gap-12 pb-10 border-b border-stone-200/80 w-full">
            
            {/* Column 1 (Left): Brand Logo, Description & Social Icons */}
            <div className="w-full lg:w-[240px] xl:w-[280px] shrink-0 flex flex-col justify-between">
              <div>
                {/* Original Brand Logo */}
                <div className="mb-5">
                  <a href="#" className="inline-block select-none group" aria-label="Monagrow Home">
                    <Image
                      src="/assets/monagrow-logo-transparent.png"
                      alt="Monagrow"
                      width={240}
                      height={160}
                      className="h-16 sm:h-24 lg:h-32 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  </a>
                </div>

                {/* Description from Screenshot 2 */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-sm mb-5">
                  Premier agricultural commodity wholesaler &amp; exporter of certified premium agro products.
                </p>
              </div>

              {/* Social Media Icons Row: Facebook, Twitter/X, Instagram Only */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-[#800020] text-stone-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 active:scale-95"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-[#800020] text-stone-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 active:scale-95"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-[#800020] text-stone-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 active:scale-95"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Container: 4 Evenly Distributed Columns (Company, Support, Resources, Contact Us) */}
            <div className="flex-1 w-full grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:flex-row sm:justify-between sm:items-start sm:gap-6 lg:gap-0">
              
              {/* Column 1: Company Navigation */}
              <div className="sm:min-w-[130px]">
                <h4 className="text-xs sm:text-sm font-bold text-[#0e2439] uppercase tracking-wider mb-3.5">
                  Company
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  <li>
                    <a href="/" className="hover:text-[#800020] transition-colors">Home Overview</a>
                  </li>
                  <li>
                    <a href="/about-us" className="hover:text-[#800020] transition-colors">About Monagrow</a>
                  </li>
                  <li>
                    <a href="/#categories" className="hover:text-[#800020] transition-colors">Commodity Categories</a>
                  </li>
                  <li>
                    <a href="/#calculator" className="hover:text-[#800020] transition-colors">Trade Cost Estimator</a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Support & Export Logistics */}
              <div className="sm:min-w-[130px]">
                <h4 className="text-xs sm:text-sm font-bold text-[#0e2439] uppercase tracking-wider mb-3.5">
                  Support
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  <li>
                    <a 
                      href="#contact" 
                      onClick={(e) => {
                        if (onOpenQuoteModal) {
                          e.preventDefault();
                          onOpenQuoteModal("Export Inquiries");
                        }
                      }}
                      className="hover:text-[#800020] transition-colors"
                    >
                      Export Inquiry Desk
                    </a>
                  </li>
                  <li>
                    <a href="/#calculator" className="hover:text-[#800020] transition-colors">Multimodal Freight</a>
                  </li>
                  <li>
                    <a 
                      href="#contact" 
                      onClick={(e) => {
                        if (onOpenQuoteModal) {
                          e.preventDefault();
                          onOpenQuoteModal("Proforma Invoice");
                        }
                      }}
                      className="hover:text-[#800020] transition-colors font-medium text-[#800020]"
                    >
                      Proforma Invoice
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Resources & Quality Certifications */}
              <div className="sm:min-w-[165px]">
                <h4 className="text-xs sm:text-sm font-bold text-[#0e2439] uppercase tracking-wider mb-3.5">
                  Resources
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  <li>
                    <a href="#categories" className="hover:text-[#800020] transition-colors">Basmati Rice 8.9mm</a>
                  </li>
                  <li>
                    <a href="#categories" className="hover:text-[#800020] transition-colors">Estate Arabica Coffee</a>
                  </li>
                  <li>
                    <a href="#categories" className="hover:text-[#800020] transition-colors">Refined Sugar ICUMSA</a>
                  </li>
                  <li className="pt-0.5">
                    <span className="text-[#800020] font-semibold text-xs block whitespace-nowrap">
                      ✓ ISO 22000 &amp; Halal Certified
                    </span>
                  </li>
                </ul>
              </div>

              {/* Column 4: Contact Us */}
              <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0 border-t border-stone-200/80 sm:border-0 sm:min-w-45 sm:max-w-57.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#0e2439] uppercase tracking-wider mb-3.5">
                  Contact Us
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  {/* Phone */}
                  <li className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                    <span className="font-semibold text-stone-800 text-xs sm:text-sm">+977 1 4589200</span>
                  </li>

                  {/* Email */}
                  <li className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                    <span className="font-semibold text-stone-800 text-xs sm:text-sm break-all">info@monagrow.com</span>
                  </li>

                  {/* Location & Ports */}
                  <li className="flex items-start gap-2 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                    <span className="text-stone-600 text-xs leading-snug">
                      Kathmandu, Nepal (Port &amp; CFS Network)
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => onOpenQuoteModal?.("Footer Inquiry")}
                  className="mt-5 inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-[#800020] hover:bg-primary-dark active:bg-[#520014] text-white font-semibold text-sm whitespace-nowrap transition-colors duration-200 cursor-pointer group"
                >
                  <span>Get wholesale quote</span>
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4 text-[#800020] stroke-[2.5]" />
                  </span>
                </button>
                <p className="mt-3 text-xs text-stone-500">
                  Replies within one business day.
                </p>
              </div>

            </div>

          </div>

          {/* ========================================================
              3. BOTTOM COPYRIGHT & LEGAL BAR (Matching Screenshot 1)
              ======================================================== */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              &copy; Copyright by Monagrow. All rights reserved. 2026
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-stone-500">
              <a href="#privacy" className="hover:text-stone-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-stone-900 transition-colors">
                Terms of Use
              </a>
              <a href="#legal" className="hover:text-stone-900 transition-colors">
                Export Terms &amp; Incoterms 2020
              </a>
              <a href="#safety" className="hover:text-stone-900 transition-colors">
                Food Safety Compliance
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
