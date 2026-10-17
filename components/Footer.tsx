"use client";

import React from "react";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ArrowUpRight, 
  ShieldCheck 
} from "lucide-react";

export default function Footer({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (topic?: string) => void;
}) {
  return (
    <footer id="contact" className="bg-[#fcfcf9] py-14 sm:py-20 border-t border-stone-200/60">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main Bento Box Grid (Matching Reference Screenshot Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* 1. LEFT TALL CARD: Brand, Mission & CTA Button */}
          <div className="lg:col-span-4 xl:col-span-4 bg-[#f9faf9] rounded-[12px] p-8 sm:p-10 border border-stone-200/60 shadow-xs flex flex-col justify-between">
            {/* Top Logo */}
            <div>
              <div className="inline-block bg-white px-5 py-2.5 rounded-2xl shadow-xs border border-stone-200/60">
                <Image
                  src="/assets/monagrow-logo-exact.jpg"
                  alt="Monagrow"
                  width={180}
                  height={50}
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0e2439] tracking-tight mt-8 mb-4">
                Get in Touch
              </h3>

              {/* Description from current website */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Premier agricultural commodity wholesaler and exporter. Specializing in Extra Long Grain Basmati Rice, Specialty Estate Coffee, Refined Sugar, and Premium Dry Fruits.
              </p>
            </div>

            {/* Bottom CTA Pill Button */}
            <div className="pt-8">
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto inline-flex items-center justify-between gap-4 bg-[#71d932] hover:bg-[#62c428] text-stone-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-98 group cursor-pointer"
              >
                <span>Request Proforma Invoice</span>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-stone-900 stroke-[2.4]" />
                </span>
              </button>
            </div>
          </div>

          {/* 2. RIGHT CONTAINER: Top Links Card + Bottom Social Media Card */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-5 sm:gap-6 justify-between">
            
            {/* Top-Right Card: Quick Link, Contact & Core Commodities */}
            <div className="bg-[#f6f9f8] rounded-[12px] p-8 sm:p-10 border border-stone-200/60 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
                
                {/* Column 1: Quick Navigation */}
                <div>
                  <h4 className="text-base font-bold text-[#0e2439] mb-4">
                    Quick Link
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                    <li>
                      <a href="#" className="hover:text-[#57a42f] transition-colors">Home Overview</a>
                    </li>
                    <li>
                      <a href="#categories" className="hover:text-[#57a42f] transition-colors">Commodity Categories</a>
                    </li>
                    <li>
                      <a href="#products" className="hover:text-[#57a42f] transition-colors">Wholesale Product Lots</a>
                    </li>
                    <li>
                      <a href="#why-choose-us" className="hover:text-[#57a42f] transition-colors">Why Choose Us</a>
                    </li>
                    <li>
                      <a href="#calculator" className="hover:text-[#57a42f] transition-colors">Container Estimator</a>
                    </li>
                    <li>
                      <a href="#testimonials" className="hover:text-[#57a42f] transition-colors">Buyer Testimonials</a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Contact (Wholesale Export Desk & Inquiries) */}
                <div>
                  <h4 className="text-base font-bold text-[#0e2439] mb-4">
                    Contact
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                    <li className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#57a42f] shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-medium text-stone-800">+977 1 4589200</span>
                        <span className="block text-stone-500 text-xs">+977 9801234567</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-[#57a42f] shrink-0 mt-0.5" />
                      <div className="break-all">
                        <span className="block font-medium text-stone-800">info@monagrow.com</span>
                        <span className="block text-stone-500 text-xs">wholesale@monagrow.com</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#57a42f] shrink-0 mt-0.5" />
                      <span className="text-stone-600 leading-snug">
                        Kathmandu, Bagmati, Nepal (Direct Mill &amp; Port Logistics)
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Globe className="w-4 h-4 text-[#57a42f] shrink-0 mt-0.5" />
                      <span className="text-stone-600 leading-snug">
                        FOB, CIF &amp; CFR to 18+ Ports Worldwide
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Core Commodities & Certifications (Resource) */}
                <div>
                  <h4 className="text-base font-bold text-[#0e2439] mb-4">
                    Resource
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                    <li>
                      <a href="#products" className="hover:text-[#57a42f] transition-colors">Monagrow Basmati Rice 8.9mm</a>
                    </li>
                    <li>
                      <a href="#products" className="hover:text-[#57a42f] transition-colors">Specialty Estate Arabica Coffee</a>
                    </li>
                    <li>
                      <a href="#products" className="hover:text-[#57a42f] transition-colors">Refined Sugar ICUMSA 45</a>
                    </li>
                    <li>
                      <a href="#products" className="hover:text-[#57a42f] transition-colors">California Jumbo Almonds</a>
                    </li>
                    <li className="pt-1 flex items-center gap-1.5 text-xs text-[#57a42f] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>ISO 22000 &amp; HACCP Certified</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-xs text-[#57a42f] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>Halal World Council Approved</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Bottom-Right Card: Produce Accents & Centered Social Media Buttons */}
            <div className="bg-[#f9faf9] rounded-[12px] p-6 sm:p-8 border border-stone-200/60 shadow-xs flex items-center justify-between overflow-hidden">
              
              {/* Left Produce Graphic Badge */}
              <div className="w-12 h-16 sm:w-16 sm:h-20 shrink-0 relative overflow-hidden rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm shadow-xs border border-stone-200/60 bg-stone-100">
                <Image
                  src="/assets/dryfruits-showcase.jpg"
                  alt="Monagrow wholesale dry fruits"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Centered Social Media Buttons (Discord, X, Instagram, LinkedIn) */}
              <div className="flex items-center gap-3 sm:gap-4 justify-center">
                
                {/* 1. Discord Button */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-800 hover:text-[#57a42f] hover:border-[#57a42f]/30 hover:scale-105 active:scale-95 transition-all"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>

                {/* 2. X (Twitter) Button */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-800 hover:text-[#57a42f] hover:border-[#57a42f]/30 hover:scale-105 active:scale-95 transition-all"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* 3. Instagram Button */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-800 hover:text-[#57a42f] hover:border-[#57a42f]/30 hover:scale-105 active:scale-95 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* 4. LinkedIn Button */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-800 hover:text-[#57a42f] hover:border-[#57a42f]/30 hover:scale-105 active:scale-95 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66Z" />
                  </svg>
                </a>

              </div>

              {/* Right Produce Graphic Badge */}
              <div className="w-12 h-16 sm:w-16 sm:h-20 shrink-0 relative overflow-hidden rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm shadow-xs border border-stone-200/60 bg-stone-100">
                <Image
                  src="/assets/basmati-rice-grains.jpg"
                  alt="Monagrow export grade basmati rice"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

          </div>

        </div>

        {/* 3. BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy;Copyright Monagrow.com. All rights reserved. 2026
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-stone-500">
            <span className="hover:text-stone-900 cursor-pointer transition-colors">
              Export Terms &amp; Incoterms 2020
            </span>
            <span>&bull;</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>&bull;</span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">
              Food Safety Compliance
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
