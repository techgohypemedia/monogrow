"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  Award,
  Layers,
  ChevronRight
} from "lucide-react";

interface HeroProps {
  onOpenVideoModal: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Hero({ onOpenVideoModal, onOpenQuoteModal }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"front" | "back">("front");

  return (
    <section className="relative overflow-hidden bg-[#fbfbf8] pb-16 lg:pb-24">
      {/* 1. Full Screen Hero Video Section (Zero Border Radius, Edge-to-Edge Full Screen) */}
      <div className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[calc(100vh-80px)] min-h-[560px] overflow-hidden bg-[#0c2016] rounded-none border-none group">
        {/* Full Screen HTML5 Ambient Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/hero-harvest.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-golden-wheat-field-in-the-wind-4122-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170f]/95 via-[#092115]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06140d]/95 via-transparent to-black/30" />

        {/* Inner Content spanning full width edge-to-edge */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 text-white max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold text-white shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-ping" />
              Live Farm Sourcing Stream & Bulk Export
            </div>

            <div className="hidden sm:flex items-center gap-5 text-xs sm:text-sm font-semibold text-white/90">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#34d399]" />
                Lab Verified Purity
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#fbbf24]" />
                Grade-A Quality
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#fbbf24] font-black block">
              Wholesale Commodities Trading Hub
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-serif tracking-tight text-white leading-[1.08] drop-shadow-lg">
              From Rich Soil to Global Ports
            </h1>
            <p className="text-sm sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal drop-shadow">
              Watch how Monagrow harvests, cures, laboratory tests, and ships metric tons of world-class Basmati, Specialty Coffee, Sugar, and Dry Fruits to international buyers.
            </p>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onOpenVideoModal}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0a1a12] font-black text-sm sm:text-base shadow-2xl hover:bg-[#fbbf24] transition-all duration-300 hover:scale-105 group/btn"
            >
              <span className="w-8 h-8 rounded-full bg-[#1c4a27] text-white flex items-center justify-center group-hover/btn:bg-[#0a1a12] transition-colors">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              <span>Play Farm Sourcing Film (2:45)</span>
            </button>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-bold text-sm sm:text-base transition-all"
            >
              <span>Browse Current Lots</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Headline & 3D Basmati Rice Section Below */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 lg:pt-20">

        {/* Main Grid: Left Value Proposition & Right Product 3D Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill matching the reference design */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8f5ec] border border-[#bfe4ca] text-xs sm:text-sm font-bold text-[#1b5e20] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#2e7d32]" />
              <span>100% TRUSTED WHOLESALE PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0e2439] leading-[1.12]">
              Fresh. Organic.{" "}
              <span className="block text-[#1c4a27] font-serif-luxury italic font-normal">
                Sustainable Wholesale.
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              Direct B2B supplier of export-grade agricultural commodities. Specializing in{" "}
              <strong className="text-stone-900 font-semibold">Extra Long Grain Basmati Rice</strong>,{" "}
              <strong className="text-stone-900 font-semibold">Estate Coffee Beans</strong>,{" "}
              <strong className="text-stone-900 font-semibold">Refined Pure Sugar</strong>, and{" "}
              <strong className="text-stone-900 font-semibold">California Dry Fruits</strong> with full traceability, lab certifications, and global container freight dispatch.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenQuoteModal("All Wholesale Commodities")}
                className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#1c4a27] hover:bg-[#14371d] text-white font-bold text-base shadow-xl shadow-[#1c4a27]/25 hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                <span>Shop Wholesale Products</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenQuoteModal("Price List & Spec Sheet")}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-800 font-bold text-base border border-stone-300 shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-[#c89d3c]" />
                <span>Download Catalog & Specs</span>
              </button>
            </div>

            {/* Trust Checklist Badges (Inspired by reference UI) */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-stone-200">
              <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1c4a27] shrink-0" />
                <span>Zero Middlemen Markups</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1c4a27] shrink-0" />
                <span>Custom Private Packaging</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1c4a27] shrink-0" />
                <span>FOB & CIF Port Shipping</span>
              </div>
            </div>

            {/* Live Stats Row */}
            <div className="pt-2 flex items-center gap-6 sm:gap-10">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0e2439]">5,000+ MT</div>
                <div className="text-xs text-stone-500 font-medium">Monthly Supply Volume</div>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#1c4a27]">99.8%</div>
                <div className="text-xs text-stone-500 font-medium">Lab Grain Purity</div>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#c89d3c]">18+</div>
                <div className="text-xs text-stone-500 font-medium">Export Destinations</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Monagrow Basmati Rice 3D Showcase Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Glowing Backdrop Ring */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-[#0e2439]/20 to-[#c89d3c]/20 blur-2xl -z-10 animate-pulse-glow" />

            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200/90 relative">
              {/* Top Tag & Switch Front / Back */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e2439] text-[#fbbf24] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  Flagship Product
                </div>

                {/* Flip Toggle Button */}
                <div className="inline-flex bg-stone-100 p-1 rounded-full text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("front")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeTab === "front"
                        ? "bg-[#1c4a27] text-white shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Front Pack
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("back")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activeTab === "back"
                        ? "bg-[#1c4a27] text-white shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Back Specs
                  </button>
                </div>
              </div>

              {/* Pack Image Display */}
              <div className="relative h-[380px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100/60 flex items-center justify-center p-2 group">
                <Image
                  src={
                    activeTab === "front"
                      ? "/assets/rice-pack-front.jpg"
                      : "/assets/rice-pack-back.jpg"
                  }
                  alt="Monagrow Extra Long Grain Premium Basmati Rice"
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                  priority
                />

                {/* Floating pill over image matching reference */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#0e2439]">
                      Monagrow Extra Long Grain
                    </div>
                    <div className="text-[11px] text-[#1c4a27] font-semibold">
                      Size: 8.9mm • Crop: 2025/2026
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal("Monagrow Basmati Rice 5kg / 25kg")}
                    className="px-3.5 py-1.5 rounded-full bg-[#1c4a27] hover:bg-[#14371d] text-white text-xs font-bold shadow-sm"
                  >
                    Quote Rice
                  </button>
                </div>
              </div>

              {/* Product Specifications Summary Under Image */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span className="font-semibold text-stone-900">Packed & Exported by:</span>
                <span className="text-[#0e2439] font-bold">Monagrow Global Pvt Ltd, Kathmandu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
