"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  Check,
  FlaskConical,
  Ship,
  ArrowRight,
} from "lucide-react";

interface AboutHeroSectionProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

interface CommodityItem {
  id: string;
  name: string;
  title: string;
  desc: string;
  pills: string[];
  gradient: string;
  overlayGradient: string;
  bgImage: string;
  link: string;
}

const COMMODITIES: CommodityItem[] = [
  {
    id: "rice",
    name: "Basmati rice",
    title: "1121 Supreme Basmati, aged to perfection.",
    desc: "Long, beautifully separate grains with a delicate Himalayan aroma. Matured for two full seasons for extraordinary fluffiness.",
    pills: ["8.9 mm+ Slender", "Two-season aged", "100% Sortex clean"],
    gradient: "from-[#207B86] via-[#16606A] to-[#0D3E45]",
    overlayGradient: "from-[#08282D]/95 via-[#08282D]/75 to-transparent",
    bgImage: "/assets/about-banner-rice.jpg",
    link: "/rice",
  },
  {
    id: "coffee",
    name: "Estate coffee",
    title: "Specialty estate coffee, slow drum roasted.",
    desc: "Cultivated at 1,450m+ MSL under natural rainforest shade. Slow roasted in artisan batch drums with notes of dark cocoa and pecan.",
    pills: ["1,450m+ Altitude", "Artisan dark roast", "Degassing valve"],
    gradient: "from-[#6E4228] via-[#4F2B17] to-[#2B140A]",
    overlayGradient: "from-[#1F0E06]/95 via-[#1F0E06]/75 to-transparent",
    bgImage: "/assets/about-banner-coffee.jpg",
    link: "/coffee",
  },
  {
    id: "cashews",
    name: "Royal cashews",
    title: "Royal whole dryfruits, rich & buttery.",
    desc: "King-size whole kernels sorted for uniform ivory color, sweet buttery crunch, and zero-defect wholesale export grade.",
    pills: ["W240 King size", "First quality white", "Nitrogen flushed"],
    gradient: "from-[#632FA2] via-[#491E7E] to-[#280D4B]",
    overlayGradient: "from-[#1B0733]/95 via-[#1B0733]/75 to-transparent",
    bgImage: "/assets/about-banner-dryfruits.jpg",
    link: "/dry-fruits",
  },
  {
    id: "sugar",
    name: "Pure cane sugar",
    title: "Pure cane sugar, clean and sparkling.",
    desc: "Fine, sparkling crystals with clean sweetness — made for kitchens, confectionery and more.",
    pills: ["ICUMSA 45 graded", "Refined cane sugar", "Export bulk"],
    gradient: "from-[#C49048] via-[#A87232] to-[#6E4318]",
    overlayGradient: "from-[#3B2205]/95 via-[#3B2205]/75 to-transparent",
    bgImage: "/assets/about-banner-sugar.jpg",
    link: "/sugar",
  },
];

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    title: "Source",
    desc: "Direct conversations with origin mills and growers.",
    icon: Sprout,
    iconColor: "text-[#16A34A]",
    borderColor: "border-[#16A34A]/25",
  },
  {
    step: "STEP 02",
    title: "Select",
    desc: "Grain, roast, grade or refinement matched to your market.",
    icon: Check,
    iconColor: "text-[#800020]",
    borderColor: "border-[#800020]/25",
  },
  {
    step: "STEP 03",
    title: "Verify",
    desc: "Specifications and sample evaluation before you commit.",
    icon: FlaskConical,
    iconColor: "text-[#0284C7]",
    borderColor: "border-[#0284C7]/25",
  },
  {
    step: "STEP 04",
    title: "Dispatch",
    desc: "Documentation and container loading, coordinated.",
    icon: Ship,
    iconColor: "text-[#E11D48]",
    borderColor: "border-[#E11D48]/25",
  },
];

const DETAIL_CARDS = [
  {
    roman: "i.",
    title: "A closer connection to the source",
    desc: "Our sourcing begins with origin mills and growers, so product specifications travel with every conversation.",
  },
  {
    roman: "ii.",
    title: "The right format for your business",
    desc: "Retail packs or bulk supply — tell us your volume, packaging and intended use, and we'll shape the offer.",
  },
  {
    roman: "iii.",
    title: "Clarity beyond the quotation",
    desc: "A useful quote starts with destination, delivery terms and requirements — a clearer basis for planning.",
  },
];

export default function AboutHeroSection({
  onOpenQuoteModal,
}: AboutHeroSectionProps) {
  // Default to 'rice' with the spilled rice background banner image
  const [activeCommodity, setActiveCommodity] = useState<string>("rice");

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#F6EFE6] border-b border-neutral-200/70 text-[#1F1916]">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. TOP HERO AREA: Headline, Overview & Rotating Origin Seal
            ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 sm:gap-12 mb-10 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow with leading dash */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#800020]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#800020]">
                About Monagrow
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-bold text-[#1F1916] tracking-tight leading-[1.05]">
              Good<br />
              ingredients.<br />
              <span className="font-serif italic font-normal text-[#800020]">
                Lasting partnerships.
              </span>
            </h1>
          </div>

          {/* Right Side: Narrative + Rotating Circular Stamp Badge */}
          <div className="flex items-center sm:items-start gap-6 lg:max-w-md pt-2 lg:pt-6">
            <p className="text-sm sm:text-base text-[#6B5E55] leading-relaxed flex-1">
              An agricultural commodity wholesaler and exporter connecting origin
              mills and growers with businesses around the world.
            </p>

            {/* Rotating Circular Stamp Seal */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0 select-none">
              <svg
                className="w-full h-full animate-[spin_18s_linear_infinite]"
                viewBox="0 0 100 100"
              >
                <path
                  id="sealCirclePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  fill="none"
                />
                <text className="text-[7.2px] font-bold uppercase tracking-[0.2em] fill-[#800020]">
                  <textPath href="#sealCirclePath" startOffset="0%">
                    ROOTED IN ORIGIN • SHIPPED WITH TRUST •
                  </textPath>
                </text>
              </svg>

              {/* Inner Maroon "M" Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#800020] text-white flex items-center justify-center font-serif font-bold text-base sm:text-lg shadow-md">
                  M
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. INTERACTIVE COMMODITY CARDS ACCORDION
            ======================================================== */}
        <div className="mb-14 sm:mb-18">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 h-auto md:h-[340px] lg:h-[370px] w-full">
            {COMMODITIES.map((c) => {
              const isExpanded = activeCommodity === c.id;

              if (isExpanded) {
                return (
                  <div
                    key={c.id}
                    className="relative flex-1 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl transition-all duration-500 ease-out overflow-hidden flex flex-col justify-end min-h-[320px] md:min-h-0 group"
                  >
                    {/* Background Spilled Commodity Image */}
                    <Image
                      src={c.bgImage}
                      alt={c.title}
                      fill
                      className="object-cover object-right md:object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 950px"
                      priority
                    />

                    {/* Gradient Overlay for Text Readability & Themed Ambiance */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${c.overlayGradient} z-1 pointer-events-none`}
                    />
                    <div className="absolute inset-0 bg-black/20 z-1 pointer-events-none" />

                    {/* Bottom Content: Title, Description & Badges */}
                    <div className="relative z-10 space-y-3 sm:space-y-4 max-w-2xl pt-6">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug drop-shadow-sm">
                        {c.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-[14.5px] text-white/95 leading-relaxed font-normal drop-shadow-sm">
                        {c.desc}
                      </p>

                      {/* Pill Tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {c.pills.map((pill) => (
                          <span
                            key={pill}
                            className="px-3.5 py-1.5 rounded-full bg-black/35 border border-white/25 text-white text-[11px] sm:text-xs font-medium backdrop-blur-md shadow-2xs"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Collapsed state
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setActiveCommodity(c.id)}
                  onMouseEnter={() => setActiveCommodity(c.id)}
                  className={`w-full md:w-20 lg:w-24 h-16 md:h-full rounded-2xl sm:rounded-3xl bg-gradient-to-b ${c.gradient} text-white shadow-md hover:shadow-lg transition-all duration-500 ease-out flex md:flex-col items-center justify-center md:justify-end p-4 md:py-8 cursor-pointer group shrink-0`}
                  aria-label={`Explore ${c.name}`}
                >
                  {/* Vertical Name (Desktop) / Horizontal Name (Mobile) */}
                  <span className="text-xs sm:text-sm font-bold tracking-wide text-white md:[writing-mode:vertical-rl] md:rotate-180 transition-transform group-hover:scale-105">
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. STEP PROCESS: From the first conversation to your next shipment
            ======================================================== */}
        <div className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1F1916] tracking-tight leading-[1.12]">
              From the first conversation<br />
              to{" "}
              <span className="font-serif italic font-normal text-[#800020]">
                your next shipment.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#75675D] max-w-sm leading-relaxed">
              We make the details of wholesale trade easier to navigate — a direct,
              clear path from origin to your port.
            </p>
          </div>

          {/* 4 Steps with connecting wavy dashed line */}
          <div className="relative">
            {/* SVG Wavy Dashed Line (Desktop only) */}
            <div className="hidden md:block absolute top-6 left-8 right-8 h-8 pointer-events-none z-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M 50,22 Q 180,36 300,20 T 540,18 T 780,24 T 960,18"
                  fill="none"
                  stroke="#800020"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.45"
                />
              </svg>
            </div>

            {/* 4 Process Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {PROCESS_STEPS.map((s) => {
                const StepIcon = s.icon;
                return (
                  <div key={s.step} className="space-y-3">
                    {/* Circle Node Icon */}
                    <div className="w-12 h-12 rounded-full bg-white border border-[#800020]/20 shadow-sm flex items-center justify-center">
                      <StepIcon className={`w-5 h-5 ${s.iconColor} stroke-[2]`} />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-[#800020] block">
                        {s.step}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#1F1916]">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#75675D] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            4. THREE DETAIL CARDS (i., ii., iii.)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-12">
          {DETAIL_CARDS.map((card) => (
            <div
              key={card.roman}
              className="bg-white rounded-2xl sm:rounded-[26px] p-6 sm:p-8 border border-[#E7E2DA] shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-start"
            >
              <span className="font-serif italic font-bold text-[#800020] text-2xl sm:text-3xl block mb-3">
                {card.roman}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#1F1916] mb-2 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#75675D] leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================
            5. BOTTOM MAROON CALL-TO-ACTION BANNER
            ======================================================== */}
        <div className="bg-[#7B0A21] rounded-2xl sm:rounded-[26px] p-6 sm:p-9 lg:p-11 relative overflow-hidden text-white shadow-xl">
          {/* Subtle large MONAGROW watermark */}
          <span
            className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 text-white/[0.045] font-black text-6xl sm:text-8xl lg:text-[140px] tracking-[0.25em] select-none pointer-events-none uppercase"
            aria-hidden="true"
          >
            MONAGROW
          </span>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Headline */}
            <div className="space-y-1 max-w-xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                Planning your next order?
              </h2>
              <p className="font-serif italic text-[#F59E0B] text-xl sm:text-2xl lg:text-3xl font-normal leading-tight">
                Share the commodity,<br className="hidden sm:inline" /> quantity and destination.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={() =>
                  onOpenQuoteModal?.("Direct Origin Procurement Inquiry")
                }
                className="px-6 py-3 rounded-full bg-white text-[#7B0A21] hover:bg-neutral-100 font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Discuss your requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/categories"
                className="px-6 py-3 rounded-full bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 font-bold text-xs sm:text-sm tracking-wide transition-colors inline-flex items-center gap-2"
              >
                <span>Explore the collection</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
