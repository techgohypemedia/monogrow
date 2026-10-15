"use client";

import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  ArrowUpRight, 
  MapPin, 
  Play
} from "lucide-react";

interface HeroProps {
  onOpenVideoModal: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Hero({ onOpenVideoModal, onOpenQuoteModal }: HeroProps) {
  return (
    <section className="bg-white py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Main 2-Column Hero Grid matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* Left Column (Main Headline Card + Bottom 2 Cards Row) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-5">
            
            {/* 1. Top Main Hero Card */}
            <div className="flex-1 bg-[#edf5ee] border border-[#dbece0] rounded-[32px] p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
              {/* Top Trust Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dbeee0] border border-[#c6e4cc] text-[#57a42f] text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#57a42f]" />
                <span>100% TRUSTED WHOLESALE PLATFORM</span>
              </div>

              {/* Main Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0e2439] tracking-tight leading-[1.12] mb-4">
                Fresh. Organic. <br />
                <span className="text-[#57a42f]">Sustainable.</span>
              </h1>

              {/* Subtitle / Value Proposition */}
              <p className="text-stone-600 text-xs sm:text-sm md:text-base font-medium max-w-lg mb-7 leading-relaxed">
                Direct export-grade supplier of Extra Long Basmati Rice, Estate Coffee Beans, Pure Refined Sugar, and California Dry Fruits.
              </p>

              {/* CTA Button: Lime Green Pill with Up-Right Arrow (Exact Reference Style) */}
              <button
                type="button"
                onClick={() => onOpenQuoteModal("All Wholesale Commodities")}
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#65b938] hover:bg-[#57a42f] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#65b938]/30 hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <span>Shop Wholesale Products</span>
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4 text-[#65b938] stroke-[2.5]" />
                </span>
              </button>
            </div>

            {/* 2. Bottom Row: 2 Cards (Farm Aerial Card & Harvest Proof Card) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 lg:gap-5">
              
              {/* Bottom-Left Card: Farm Aerial View with Interactive Pins & Video Background */}
              <div className="sm:col-span-7 relative rounded-[28px] overflow-hidden min-h-[220px] sm:min-h-[240px] border border-stone-200/80 shadow-md group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/hero-harvest.jpg"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                >
                  <source src="/assets/paddy-fields-loop.webm" type="video/webm" />
                  <source src="/assets/paddy-fields-loop.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors z-[1]" />

                {/* Location Map Pin 1 (Top Left with radar pulse) */}
                <div className="absolute top-5 left-6 flex items-center justify-center z-10">
                  <span className="absolute w-7 h-7 rounded-full bg-[#22c55e]/40 animate-ping" />
                  <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-3 h-3" />
                  </div>
                </div>

                {/* Location Map Pin 2 (Top Right with radar pulse) */}
                <div className="absolute top-5 right-7 flex items-center justify-center z-10">
                  <span className="absolute w-7 h-7 rounded-full bg-[#22c55e]/40 animate-ping" />
                  <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-3 h-3" />
                  </div>
                </div>

                {/* Location Map Pin 3 (Bottom Left) */}
                <div className="absolute bottom-5 left-7 flex items-center justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-3 h-3" />
                  </div>
                </div>

                {/* Location Map Pin 4 (Bottom Right) */}
                <div className="absolute bottom-5 right-7 flex items-center justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-3 h-3" />
                  </div>
                </div>

                {/* Center Floating Sourcing Card */}
                <div className="absolute inset-0 m-auto w-fit h-fit bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200/90 shadow-xl flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-105 z-10">
                  <div className="w-8 h-8 rounded-xl bg-[#e8f5ec] flex items-center justify-center text-base shrink-0">
                    🌾
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0e2439] leading-tight">
                      Basmati Paddy Belt
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium">
                      Terai Basin • Direct Farm Sourcing
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom-Right Card: Harvest Proof & Certification Badge */}
              <div className="sm:col-span-5 relative rounded-[28px] overflow-hidden min-h-[220px] sm:min-h-[240px] border border-stone-200/80 shadow-md group">
                <Image
                  src="/assets/dryfruits-showcase.jpg"
                  alt="Monagrow Premium Harvest Commodities"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                {/* Top Overlay Badge: Social Proof */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-stone-200/90 shadow-md flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    <span className="w-4 h-4 rounded-full bg-[#57a42f] text-[9px] text-white flex items-center justify-center font-bold">M</span>
                    <span className="w-4 h-4 rounded-full bg-[#fbbf24] text-[9px] text-[#0e2439] flex items-center justify-center font-bold">G</span>
                    <span className="w-4 h-4 rounded-full bg-[#22c55e] text-[9px] text-white flex items-center justify-center font-bold">18+</span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-800">+1,200 Shipments</span>
                </div>

                {/* Bottom Overlay Badge: Lab Quality Assurance */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-stone-200/90 shadow-lg text-center">
                  <span className="text-[11px] font-black text-[#57a42f] block leading-tight">
                    100% SGS Lab Tested
                  </span>
                  <span className="text-[10px] text-stone-600 font-medium">
                    Export Grade & ISO 22000
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (Tall Agricultural Specialist Showcase Card) */}
          <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden min-h-[480px] lg:min-h-full border border-stone-200/80 shadow-lg group">
            <Image
              src="/assets/hero-farmer-hd.jpg"
              alt="Monagrow Agricultural Producer & Farm Specialist"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Top-Right Quick Sourcing Film Button */}
            <button
              type="button"
              onClick={onOpenVideoModal}
              className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 hover:bg-white backdrop-blur-md text-[#0e2439] text-xs font-bold px-3.5 py-2 rounded-full shadow-lg border border-stone-200 transition-all hover:scale-105 cursor-pointer z-10"
              title="Play farm sourcing film"
            >
              <span className="w-5 h-5 rounded-full bg-[#57a42f] text-white flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </span>
              <span>Sourcing Film</span>
            </button>

            {/* Bottom-Left Floating Tag: Monagrow Agro Commodities */}
            <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-stone-200/90 shadow-xl flex items-center gap-2 font-bold text-xs sm:text-sm text-[#0e2439] z-10">
              <span>Monagrow Agro Commodities</span>
              <span className="text-sm">🌾☕🌱</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
