"use client";

import React from "react";
import Image from "next/image";
import { 
  Leaf, 
  CheckCircle, 
  Truck,
  ShieldCheck,
  Package
} from "lucide-react";

export default function WhyChooseUs({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (topic?: string) => void;
}) {
  return (
    <section id="why-choose-us" className="py-20 bg-white relative scroll-mt-16">
      <div id="about" className="absolute -top-20" />
      <div id="about-us" className="absolute -top-20" />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fae8eb] text-[#800020] text-xs font-bold uppercase tracking-wider mb-4 border border-[#f3c4ce]">
            <span>THE MONAGROW ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439]">
            Why Global Importers & Wholesalers Partner With Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Reliability, standard consistency, and transparent commodity pricing make Monagrow the preferred supplier for supermarket chains and bulk distributors worldwide.
          </p>
        </div>

        {/* Bento Grid: 3-Column Layout Matching Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* =========================================================
              COLUMN 1 (Left): Top Graphic Card + Bottom Tall Scenic Card
              ========================================================= */}
          <div className="flex flex-col gap-6">
            {/* Card 1A (Top): Direct Origin Sourcing & Mill Network (Full-Bleed Cover Card) */}
            <div className="relative rounded-[28px] overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col justify-between p-6 sm:p-7 text-white group border border-stone-200/70 shadow-2xs">
              {/* Full-Bleed Cover Background Image */}
              <Image
                src="/assets/why-rice-sheaves.jpg"
                alt="Direct Origin Agricultural Crops"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2439]/95 via-[#0e2439]/70 to-[#0e2439]/45 pointer-events-none" />

              {/* Content Layer (Above Image) */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0e2439] text-[11px] font-bold uppercase tracking-wider mb-3.5 shadow-md">
                    <Leaf className="w-3.5 h-3.5 text-[#800020]" />
                    <span>ORIGIN SOURCED</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight mb-1.5 group-hover:text-[#f3c4ce] transition-colors">
                    Direct Origin Sourcing & Mill Network
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#fbbf24] mb-3">
                    Primary grower & mill contracts.
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    Direct supply agreements with audited cultivation clusters and processing mills across South Asia, guaranteeing stable commodity availability and physical grade consistency.
                  </p>
                </div>

                {/* Standard Guaranteed Footer */}
                <div className="mt-6 pt-3.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-[#fecdd3]">
                  <span>Standard Guaranteed</span>
                  <CheckCircle className="w-4 h-4 text-[#fbbf24]" />
                </div>
              </div>
            </div>

            {/* Card 1B (Bottom): Full-Bleed Vertical Scenic Landscape Card */}
            <div className="relative rounded-[28px] overflow-hidden min-h-[320px] sm:min-h-[360px] flex-1 flex flex-col justify-between p-6 text-white group border border-stone-200/70 shadow-2xs">
              <Image
                src="/assets/why-terrace-scenic.jpg"
                alt="Primary Cultivation Clusters in South Asia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2439]/95 via-[#0e2439]/35 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0e2439] text-[11px] font-bold uppercase tracking-wider shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#800020] animate-pulse" />
                  <span>Primary Cultivation Belts</span>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 mt-auto pt-8">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-300 block mb-1">
                  Single-Origin Terraces & Basmati Plains
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-serif text-white leading-tight">
                  Direct Farm Clusters & Processing Mills
                </h4>
                <p className="text-xs sm:text-sm text-stone-200/90 mt-1.5 leading-relaxed">
                  Single-origin basmati plains and volcanic coffee slopes cultivated under certified GAP agricultural standards.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================
              COLUMN 2 (Center): Tall Full-Height Card with Feature + Inspection Visual
              ========================================================= */}
          <div className="bg-[#EEF5ED] border border-[#D7E5D6] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 h-full group">
            <div>
              {/* Feature: Private Label & Custom Packing */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#800020]/15 text-[#800020] text-[11px] font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
                  <Package className="w-3.5 h-3.5 text-[#800020]" />
                  <span>OEM READY</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-black text-[#0e2439] leading-tight mb-1.5 group-hover:text-[#800020] transition-colors">
                  Private Label & Custom Packing
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#b45309] mb-3">
                  Your brand, our manufacturing power.
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Custom printed 1kg, 5kg, 10kg, 25kg, and 50kg bags in BOPP, non-woven, jute, or kraft paper tailored to your supermarket and wholesale distributor specs.
                </p>
                <div className="mt-4 pt-3.5 border-t border-[#D5E3D5] flex items-center justify-between text-xs font-bold text-[#800020]">
                  <span>Standard Guaranteed</span>
                  <CheckCircle className="w-4 h-4 text-[#800020]" />
                </div>
              </div>
            </div>

            {/* Center Bottom Visual: Agricultural Quality Inspection Table */}
            <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden mt-6 shadow-xs border border-[#CDE0CC]">
              <Image
                src="/assets/why-grain-inspector.jpg"
                alt="Agricultural Quality Inspector at Laboratory Grading Table"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2439]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold flex items-center justify-between z-10">
                <span className="flex items-center gap-1.5 drop-shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Optical Grading & Quality Assurance
                </span>
                <span className="text-[10px] uppercase font-bold bg-[#800020] px-2.5 py-0.5 rounded-full text-white shadow-xs">
                  ISO 22000
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================
              COLUMN 3 (Right): Top Wide Scenic Card + Bottom Product Card
              ========================================================= */}
          <div className="flex flex-col gap-6">
            {/* Card 3A (Top): Full-Bleed Deep-Sea Port Logistics Card */}
            <div className="relative rounded-[28px] overflow-hidden min-h-[240px] sm:min-h-[260px] lg:min-h-[280px] flex flex-col justify-between p-6 text-white group border border-stone-200/70 shadow-2xs">
              <Image
                src="/assets/why-freight-port.jpg"
                alt="Global Multimodal Freight & Deep-Sea Port Terminal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2439]/95 via-[#0e2439]/35 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0e2439] text-[11px] font-bold uppercase tracking-wider shadow-md">
                  <Truck className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Deep-Sea Freight</span>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 mt-auto pt-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-300 block mb-1">
                  CFS & Containerized Logistics
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-serif text-white leading-tight">
                  Direct Port & Multimodal Marine Transit
                </h4>
              </div>
            </div>

            {/* Card 3B (Bottom): Direct Port & Freight Logistics Card (Full-Bleed Cover Card) */}
            <div className="relative rounded-[28px] overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col justify-between p-6 sm:p-7 text-white group border border-stone-200/70 shadow-2xs flex-1">
              {/* Full-Bleed Cover Background Image */}
              <Image
                src="/assets/why-jute-sack.jpg"
                alt="Direct Port & Freight Logistics"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2439]/95 via-[#0e2439]/70 to-[#0e2439]/45 pointer-events-none" />

              {/* Content Layer (Above Image) */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0e2439] text-[11px] font-bold uppercase tracking-wider mb-3.5 shadow-md">
                    <Truck className="w-3.5 h-3.5 text-[#800020]" />
                    <span>GLOBAL FREIGHT</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight mb-1.5 group-hover:text-[#f3c4ce] transition-colors">
                    Direct Port & Freight Logistics
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#fbbf24] mb-3">
                    Direct freight, seamless clearance.
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    We coordinate end-to-end multimodal logistics from agricultural processing mills directly to primary international seaports and container freight stations.
                  </p>
                </div>

                {/* Standard Guaranteed Footer */}
                <div className="mt-6 pt-3.5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-[#fecdd3]">
                  <span>Standard Guaranteed</span>
                  <CheckCircle className="w-4 h-4 text-[#fbbf24]" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
