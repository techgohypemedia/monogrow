"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface ProcessStep {
  step: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface CommodityJourney {
  id: string;
  tabLabel: string;
  icon: string;
  name: string;
  categoryTag: string;
  originBadge: string;
  productImage: string;
  productAlt: string;
  description: string;
  specs: { label: string; value: string }[];
  steps: {
    raw: ProcessStep;          // Top-Left: Card 1
    processing: ProcessStep;   // Bottom-Left: Card 2
    quality: ProcessStep;      // Top-Right: Card 3
    importTransit: ProcessStep;// Bottom-Right: Card 4
  };
}

const COMMODITY_JOURNEYS: CommodityJourney[] = [
  {
    id: "rice",
    tabLabel: "Basmati Rice",
    icon: "🌾",
    name: "Supreme 1121 Long Grain Basmati",
    categoryTag: "Flagship 5KG Export Pack",
    originBadge: "Himalayan Foothills",
    productImage: "/assets/monagrow-rice-bag-cutout.png",
    productAlt: "Monagrow 5kg Basmati Rice Box Bag",
    description:
      "Aged naturally over two full seasons for exquisite aroma, slender 8.9mm grain elongation, and non-sticky fluffiness upon cooking.",
    specs: [
      { label: "Milled Grain", value: "8.9 mm+ Slender" },
      { label: "Elongation", value: "Over 2.2x Fluffiness" },
      { label: "Moisture", value: "< 12.0% Certified" },
      { label: "Packaging", value: "5kg Box Bag / 25kg Sacks" },
    ],
    steps: {
      raw: {
        step: "Step 01",
        badge: "Raw Paddy Harvest",
        title: "Himalayan Meltwater Farm Belts",
        description:
          "Procured directly from audited farmer cooperatives across pristine Himalayan valleys, harvested at peak grain maturity.",
        image: "/assets/why-rice-sheaves.jpg",
        alt: "Golden basmati paddy crop at origin harvest",
      },
      processing: {
        step: "Step 02",
        badge: "Aging & Milling",
        title: "2-Season Natural Curing & De-Husking",
        description:
          "Naturally cured in temperature-controlled silos to lock in fragrant aroma, then gently milled to preserve full grain integrity.",
        image: "/assets/basmati-rice-grains.jpg",
        alt: "Long grain polished basmati rice grains",
      },
      quality: {
        step: "Step 03",
        badge: "Lab QC & Packing",
        title: "Dual-Camera Sortex & BOPP Seal",
        description:
          "Laser optical separation removes broken kernels; sealed at the origin mill in tamper-evident multi-ply barrier box bags.",
        image: "/assets/why-grain-inspector.jpg",
        alt: "Quality inspector examining grain sample lots",
      },
      importTransit: {
        step: "Step 04",
        badge: "Seaport Import",
        title: "Direct Port Maritime Delivery",
        description:
          "Containerized and loaded at international maritime deepwater terminals with certified phytosanitary clearance and GPS tracking.",
        image: "/assets/why-freight-port.jpg",
        alt: "Container terminal shipping freight at deep-sea port",
      },
    },
  },
  {
    id: "cashews",
    tabLabel: "Royal Cashews",
    icon: "🥜",
    name: "Monagrow Royal W240 Whole Cashews",
    categoryTag: "Royal 2.5KG Resealable Pouch",
    originBadge: "Tropical Coastal Plantations",
    productImage: "/assets/monagrow-cashews-packaging-new.png",
    productAlt: "Monagrow 2.5kg Royal Cashews Pouch",
    description:
      "Handpicked king-size ivory whole cashew kernels hand-graded for flawless crescent curve, natural butter crunch, and zero blemishes.",
    specs: [
      { label: "Grade", value: "White Whole W240" },
      { label: "Kernel Count", value: "220 - 240 / lb" },
      { label: "Moisture", value: "< 4.5% Butter Crunch" },
      { label: "Packaging", value: "2.5kg Pouch / 25lb Tins" },
    ],
    steps: {
      raw: {
        step: "Step 01",
        badge: "Raw Orchard Harvest",
        title: "Orchard Handpicked In-Shell Nuts",
        description:
          "Grown in mineral-rich tropical soil; ripe cashew apples are gathered by hand and raw in-shell nuts sun-cured on clean drying floors.",
        image: "/assets/dryfruits-farm-harvest.jpg",
        alt: "Cashew plantation harvest trees and orchards",
      },
      processing: {
        step: "Step 02",
        badge: "Shelling & Sizing",
        title: "Steam Opening & Mechanical Calibration",
        description:
          "Controlled steam de-shelling protects the tender kernel curve, followed by precision mechanical calibration for jumbo W240 crescents.",
        image: "/assets/cashew-kernels.jpg",
        alt: "Peeled white cashew kernels ready for export",
      },
      quality: {
        step: "Step 03",
        badge: "Lab QC & Gas Flush",
        title: "Laser Inspection & Nitrogen Barrier",
        description:
          "Rigorous moisture testing under 4.5% followed by nitrogen gas flushing into high-barrier pouches to prevent oxidation.",
        image: "/assets/monagrow-product-testing-lab.jpg",
        alt: "Food laboratory inspecting cashews under microscope",
      },
      importTransit: {
        step: "Step 04",
        badge: "Seaport Import",
        title: "Deep-Sea Multimodal Import Transit",
        description:
          "Sealed into moisture-desiccant maritime containers for scheduled direct ocean voyage under CIF/FOB terms to buyer ports.",
        image: "/assets/about-global-port.jpg",
        alt: "Container ship at international freight port",
      },
    },
  },
  {
    id: "coffee",
    tabLabel: "Estate Coffee",
    icon: "☕",
    name: "Specialty Estate Dark Arabica",
    categoryTag: "Specialty Roastery 2.5KG Pack",
    originBadge: "1,400m+ Volcanic Mountain Slopes",
    productImage: "/assets/monagrow-coffee-bag-cutout.png",
    productAlt: "Monagrow 2.5kg Specialty Coffee Bag",
    description:
      "Handpicked high-altitude Arabica cherries slow drum-roasted to develop rich notes of dark cocoa, roasted caramel, and toasted hazelnut.",
    specs: [
      { label: "Altitude", value: "1,400m - 1,850m MSL" },
      { label: "Screen Size", value: "Screen 18+ Large Bean" },
      { label: "Cupping", value: "84+ Specialty Grade" },
      { label: "Packaging", value: "2.5kg Valve Bag / Bulk" },
    ],
    steps: {
      raw: {
        step: "Step 01",
        badge: "Raw Cherry Harvest",
        title: "Selective Ripe Cherry Picking",
        description:
          "Shade-grown under high-altitude forest canopies; cherries are harvested exclusively at deep crimson peak sugar brix.",
        image: "/assets/coffee-farm-harvest.jpg",
        alt: "Farmers hand-picking ripe red coffee cherries",
      },
      processing: {
        step: "Step 02",
        badge: "Washing & Roasting",
        title: "Spring Pulped & Slow Drum Roasted",
        description:
          "Washed with pure mountain spring water, sun-dried on raised African beds, and slow drum-roasted in master craft batches.",
        image: "/assets/coffee-showcase.jpg",
        alt: "Slow-roasted whole Arabica coffee beans and burlap export sacks",
      },
      quality: {
        step: "Step 03",
        badge: "Lab QC & Degassing",
        title: "SCA Cupping & One-Way Valve Enclosure",
        description:
          "Strict sensory cupping analysis, sealed in multi-ply foil pouches with one-way degassing valves to lock in freshly roasted aroma.",
        image: "/assets/company-studio-still.jpg",
        alt: "Specialty coffee in tasting jars in quality studio",
      },
      importTransit: {
        step: "Step 04",
        badge: "Seaport Import",
        title: "GrainPro Hermetic Maritime Freight",
        description:
          "Protected by GrainPro moisture-barrier liners to preserve volatile bean aromatics during ocean transit to destination roasters.",
        image: "/assets/port-logistics-poster.jpg",
        alt: "Modern container shipping port operations",
      },
    },
  },
  {
    id: "sugar",
    tabLabel: "Refined Sugar",
    icon: "🍬",
    name: "Refined Cane Sugar ICUMSA 45",
    categoryTag: "Sparkling White Food Grade",
    originBadge: "Certified Agro Sugar Mills",
    productImage: "/assets/monagrow-sugar-bag-cutout.png",
    productAlt: "Monagrow 5kg Refined Sugar Bag",
    description:
      "Ultra-pure sparkling white crystal cane sugar with 99.85% polarization, zero chemical odor, and instant 100% solubility.",
    specs: [
      { label: "Purity Index", value: "ICUMSA 45 RBU Max" },
      { label: "Polarization", value: "99.85% Minimum" },
      { label: "Moisture", value: "< 0.04% Free-Flowing" },
      { label: "Packaging", value: "5kg Retail / 50kg Sacks" },
    ],
    steps: {
      raw: {
        step: "Step 01",
        badge: "Raw Cane Harvest",
        title: "Sun-Drenched Sugarcane Fields",
        description:
          "Cultivated in fertile subtropical basins; mature cane stalks are harvested at peak brix and milled immediately to preserve sucrose.",
        image: "/assets/sugar-farm-harvest.jpg",
        alt: "Sugarcane field harvest at peak maturity",
      },
      processing: {
        step: "Step 02",
        badge: "Crushing & Refining",
        title: "Vacuum Pan Crystallization",
        description:
          "Juice purified through non-chemical carbonatation and boiled in vacuum pans to produce sparkling, uniform 0.6mm crystals.",
        image: "/assets/sugar-showcase.jpg",
        alt: "Pure sparkling refined sugar crystals",
      },
      quality: {
        step: "Step 03",
        badge: "Lab Polarimetry",
        title: "Certified 99.85% Purity Polarimetry",
        description:
          "Accredited polarimetric testing ensures zero contaminants, followed by automatic packaging into hygienic poly-lined sacks.",
        image: "/assets/about-purity-lab.jpg",
        alt: "Sugar quality assurance laboratory testing",
      },
      importTransit: {
        step: "Step 04",
        badge: "Seaport Import",
        title: "Bulk Vessel & Container Discharge",
        description:
          "Containerized and breakbulk vessel dispatch with accredited SGS inspection seals and expedited customs clearance at destination.",
        image: "/assets/why-jute-sack.jpg",
        alt: "Export sacks ready for seaport vessel loading",
      },
    },
  },
];

const AUTO_INTERVAL_MS = 6000;

export default function WhyChooseUs({
  onOpenQuoteModal: _onOpenQuoteModal,
}: {
  onOpenQuoteModal?: (topic?: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeJourney = COMMODITY_JOURNEYS[activeIndex];

  // Robust, reliable auto-rotation interval (advances cleanly through 0 -> 1 -> 2 -> 3)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COMMODITY_JOURNEYS.length);
    }, AUTO_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="why-choose-us"
      className="py-20 sm:py-24 bg-white relative scroll-mt-16 select-none"
    >
      <div id="about" className="absolute -top-20" />
      <div id="about-us" className="absolute -top-20" />

      {/* Progress animation keyframe */}
      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fae8eb] border border-[#800020]/20 text-xs font-bold uppercase tracking-widest text-[#800020] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#800020]" />
            <span>Raw to Import Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight uppercase">
            WHY IMPORTERS AND WHOLESALERS PARTNER WITH US
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore our complete supply chain in action. Watch how each commodity transitions from pristine origin harvest through mill refinement, laboratory testing, and seamless seaport import.
          </p>
        </div>

        {/* Dynamic Bento Grid Container (Pauses on mouse hover) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {/* ========================================================
              COLUMN 1 (LEFT): Step 01 & Step 02
              ======================================================== */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Step 01: Raw Harvest Card */}
            <div className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white group min-h-[320px] sm:min-h-[350px] bg-stone-900 shadow-sm">
              <Image
                key={activeJourney.steps.raw.image}
                src={activeJourney.steps.raw.image}
                alt={activeJourney.steps.raw.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-10"
              />
              {/* Top: Step Badge */}
              <div className="relative z-20 flex items-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/85 border border-emerald-400/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{activeJourney.steps.raw.step} · {activeJourney.steps.raw.badge}</span>
                </div>
              </div>
              {/* Bottom: Title & Description */}
              <div className="relative z-20 space-y-2 pt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  {activeJourney.steps.raw.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
                  {activeJourney.steps.raw.description}
                </p>
              </div>
            </div>

            {/* Step 02: Processing & Milling Card */}
            <div className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white group min-h-[290px] sm:min-h-[310px] flex-1 bg-stone-900 shadow-sm">
              <Image
                key={activeJourney.steps.processing.image}
                src={activeJourney.steps.processing.image}
                alt={activeJourney.steps.processing.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-10"
              />
              {/* Top: Step Badge */}
              <div className="relative z-20 flex items-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/85 border border-amber-400/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{activeJourney.steps.processing.step} · {activeJourney.steps.processing.badge}</span>
                </div>
              </div>
              {/* Bottom: Title & Description */}
              <div className="relative z-20 space-y-2 pt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  {activeJourney.steps.processing.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
                  {activeJourney.steps.processing.description}
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMN 2 (CENTER): The Featured Product Showcase
              ======================================================== */}
          <div className="bg-[#f2f6f1] rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-[#dce6da] shadow-sm relative overflow-hidden transition-all duration-300">
            {/* Top Auto-Rotation Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/5 overflow-hidden">
              <div
                key={activeIndex}
                className="h-full bg-[#800020]"
                style={{
                  animation: isPaused ? "none" : `progressFill ${AUTO_INTERVAL_MS}ms linear forwards`,
                  width: isPaused ? "100%" : undefined,
                }}
              />
            </div>

            {/* Product Header & Information */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div>
                  <span className="text-[#800020] text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
                    {activeJourney.categoryTag}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                  {activeJourney.name}
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                  {activeJourney.description}
                </p>
              </div>

              {/* Product Pack Cutout Showcase - Heroic Size */}
              <div className="my-3 sm:my-4 relative w-full flex-1 min-h-[290px] sm:min-h-[330px] lg:min-h-[370px] flex items-center justify-center group cursor-pointer">
                {/* Gentle background spotlight pedestal */}
                <div className="absolute inset-x-6 inset-y-6 rounded-full bg-white/80 blur-2xl pointer-events-none" />
                <div className="relative w-full h-full">
                  <Image
                    key={activeJourney.productImage}
                    src={activeJourney.productImage}
                    alt={activeJourney.productAlt}
                    fill
                    className="object-contain drop-shadow-[0_24px_36px_rgba(20,15,5,0.22)] transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>

              {/* Streamlined Key Specs (Decreased Detail) & Minimal Origin Footer */}
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-2.5 border-t border-[#dce6da] pt-3">
                  <div className="bg-white/75 backdrop-blur-xs rounded-xl px-3 py-2 border border-black/5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                      Specification
                    </p>
                    <p className="text-xs sm:text-[13px] font-bold text-neutral-900 mt-0.5 truncate">
                      {activeJourney.specs[0].value}
                    </p>
                  </div>
                  <div className="bg-white/75 backdrop-blur-xs rounded-xl px-3 py-2 border border-black/5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                      Export Packing
                    </p>
                    <p className="text-xs sm:text-[13px] font-bold text-neutral-900 mt-0.5 truncate">
                      {activeJourney.specs[3].value}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Direct Origin Mill
                  </span>
                  <span className="text-[11px] text-stone-400">
                    ISO 22000 Graded
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMN 3 (RIGHT): Step 03 & Step 04
              ======================================================== */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Step 03: Optical Sortex & Lab QC Card */}
            <div className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white group min-h-[280px] sm:min-h-[300px] bg-stone-900 shadow-sm">
              <Image
                key={activeJourney.steps.quality.image}
                src={activeJourney.steps.quality.image}
                alt={activeJourney.steps.quality.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-10"
              />
              {/* Top: Step Badge */}
              <div className="relative z-20 flex items-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/85 border border-blue-400/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{activeJourney.steps.quality.step} · {activeJourney.steps.quality.badge}</span>
                </div>
              </div>
              {/* Bottom: Title & Description */}
              <div className="relative z-20 space-y-2 pt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  {activeJourney.steps.quality.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
                  {activeJourney.steps.quality.description}
                </p>
              </div>
            </div>

            {/* Step 04: Seaport Import Transit Card */}
            <div className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white group min-h-[330px] sm:min-h-[360px] flex-1 bg-stone-900 shadow-sm">
              <Image
                key={activeJourney.steps.importTransit.image}
                src={activeJourney.steps.importTransit.image}
                alt={activeJourney.steps.importTransit.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-10"
              />
              {/* Top: Step Badge */}
              <div className="relative z-20 flex items-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/85 border border-indigo-400/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{activeJourney.steps.importTransit.step} · {activeJourney.steps.importTransit.badge}</span>
                </div>
              </div>
              {/* Bottom: Title & Description */}
              <div className="relative z-20 space-y-2 pt-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  {activeJourney.steps.importTransit.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
                  {activeJourney.steps.importTransit.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
