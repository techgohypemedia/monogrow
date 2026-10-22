"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Flame,
  Droplets,
  Wheat,
  ShieldCheck,
  Sparkles,
  Coffee,
  Award,
  ArrowUpRight,
} from "lucide-react";

interface CategorySectionProps {
  onSelectCategory?: (categoryId: string) => void;
  onOpenQuoteModal: (categoryName: string) => void;
}

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
  metric: string;
  desc: string;
}

interface CommodityShowcase {
  id: string;
  category: string;
  name: string;
  shortTitle: string;
  badgeText: string;
  image: string;
  alt: string;
  tagline: string;
  description: string;
  glowGradient: string;
  features: FeatureItem[];
}

const COMMODITIES: CommodityShowcase[] = [
  {
    id: "rice",
    category: "rice",
    name: "Monagrow 1121 Supreme Long Grain Basmati",
    shortTitle: "Basmati Rice",
    badgeText: "HERITAGE RESERVE • AGED 24 MONTHS",
    image: "/assets/monagrow-rice-bag-cutout.png",
    alt: "Monagrow 5kg Basmati Rice Bag",
    tagline: "Glacier-Fed Terraces • Himalayan Terroir",
    description: "Matured over two full harvest seasons in traditional Himalayan aeration silos. Cooked grains expand to over 22mm with feather-light separation, zero starch clumping, and an authentic aromatic bouquet.",
    glowGradient: "radial-gradient(circle, rgba(245, 190, 75, 0.32) 0%, rgba(217, 130, 25, 0.14) 48%, rgba(128, 0, 32, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Flame className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Raw Grain Length",
        metric: "8.9mm+",
        desc: "Expands 2.5× to 22mm cooked",
      },
      {
        icon: <Droplets className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Aged Moisture",
        metric: "< 11.5%",
        desc: "24-mo natural aeration silo aged",
      },
      {
        icon: <Wheat className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Purity Index",
        metric: "100% Sortex",
        desc: "Zero chalky grains or broken tips",
      },
    ],
  },
  {
    id: "sugar",
    category: "sugar",
    name: "Monagrow Pure Refined Cane Sugar",
    shortTitle: "Refined Sugar",
    badgeText: "CONFECTIONERY & PHARMA GRADE • ICUMSA 45",
    image: "/assets/monagrow-sugar-bag-cutout.png",
    alt: "Monagrow 5kg Refined Cane Sugar Bag",
    tagline: "Ultra-Pure Crystals • 99.85% Sucrose",
    description: "Triple-clarified to international ICUMSA 45 optical purity. Features uniform free-flowing granulation and rapid solubility with zero sediment—engineered for commercial bottling, confectionery, and food processing.",
    glowGradient: "radial-gradient(circle, rgba(74, 222, 128, 0.28) 0%, rgba(34, 197, 94, 0.12) 48%, rgba(20, 83, 45, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Sparkles className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Optical Clarity",
        metric: "ICUMSA 45",
        desc: "Sparkling crystal white purity",
      },
      {
        icon: <Droplets className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Polarization",
        metric: "99.85% Pure",
        desc: "Free-flowing, instant solubility",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Certification",
        metric: "ISO 22000",
        desc: "Pharma & commercial confectionery",
      },
    ],
  },
  {
    id: "coffee",
    category: "coffee",
    name: "Monagrow Highland Dark Roast Arabica",
    shortTitle: "Estate Coffee",
    badgeText: "SPECIALTY MICROLOT • SCAA 86+ RATED",
    image: "/assets/monagrow-coffee-bag-cutout.png",
    alt: "Monagrow 2.5kg Specialty Coffee Bag",
    tagline: "Elevation 1,450m+ • Shade-Grown Single Origin",
    description: "Harvested from cloud-mist volcanic slopes above 1,450 meters. Precision drum-roasted in small batches to develop rich natural oils, delivering luxurious notes of dark Belgian cocoa, roasted pecan, and caramelized panela.",
    glowGradient: "radial-gradient(circle, rgba(245, 158, 11, 0.30) 0%, rgba(180, 83, 9, 0.14) 48%, rgba(120, 53, 15, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Flame className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Roast Profile",
        metric: "Artisan Dark",
        desc: "Belgian cocoa, pecan & caramel",
      },
      {
        icon: <Coffee className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Estate Elevation",
        metric: "1,450m+",
        desc: "Cloud-mist volcanic single origin",
      },
      {
        icon: <Award className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Cupping Score",
        metric: "SCAA 86+",
        desc: "Certified specialty microlot",
      },
    ],
  },
  {
    id: "dryfruits",
    category: "dryfruits",
    name: "Monagrow Royal Whole Cashews W240",
    shortTitle: "Royal Cashews",
    badgeText: "DIRECT LOT EXPORT • GRADE W240 JUMBO",
    image: "/assets/monagrow-cashews-bag-cutout.png",
    alt: "Monagrow 2.5kg Royal Cashews Pouch",
    tagline: "Handpicked Jumbo Kernels • Natural Butter Crunch",
    description: "Cultivated in fertile coastal loam and harvested at peak ripeness. Each W240 kernel is hand-inspected for perfect crescent symmetry, pearlescent ivory tone, and sweet buttery snap. Nitrogen-flushed at origin to preserve farm-fresh crispness.",
    glowGradient: "radial-gradient(circle, rgba(250, 204, 21, 0.32) 0%, rgba(234, 179, 8, 0.14) 48%, rgba(180, 83, 9, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Award className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Kernel Count",
        metric: "W240 Jumbo",
        desc: "220–240 whole nuts per pound",
      },
      {
        icon: <Droplets className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Moisture Index",
        metric: "< 4.5%",
        desc: "Crisp natural butter snap",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 stroke-[2.2] text-current" />,
        label: "Packaging",
        metric: "Active N₂",
        desc: "Vacuum sealed for 24-month life",
      },
    ],
  },
];

/**
 * Calculates dynamic rotation, 3D perspective tilt, and smooth crossfade opacity
 * as the user scrolls through the category stage.
 * When scrolling within a product, the image rotates slightly (0 to ~ -7deg).
 * At the boundary, it smoothly transitions out while the next image transitions in.
 */
function getImageTransform(idx: number, scrollProgress: number, total: number) {
  const productProgress = scrollProgress * (total - 1);
  const diff = productProgress - idx;

  let opacity = 0;
  let rotateZ = 0;
  let rotateY = 0;
  let scale = 1;
  let translateY = 0;
  let zIndex = 0;
  let pointerEvents: "auto" | "none" = "none";

  if (Math.abs(diff) > 1.25) {
    opacity = 0;
    rotateZ = diff > 0 ? -16 : 16;
    rotateY = diff > 0 ? -10 : 10;
    scale = 0.92;
    translateY = diff > 0 ? -16 : 16;
    zIndex = 0;
    pointerEvents = "none";
  } else if (diff >= 0) {
    // Current item scrolling forward (diff 0 to 1.25)
    zIndex = diff <= 0.5 ? 10 : 5;
    if (diff <= 0.35) {
      // Phase 1: Product stays active, but rotates gently as user scrolls (0deg -> -7deg)
      const t = diff / 0.35;
      rotateZ = t * -7;
      rotateY = t * -5;
      opacity = 1;
      scale = 1;
      translateY = 0;
      pointerEvents = "auto";
    } else {
      // Phase 2: Smoothly transitions out into the next product
      const t = Math.min(1, Math.max(0, (diff - 0.35) / 0.65));
      rotateZ = -7 + t * -9; // -7deg -> -16deg
      rotateY = -5 + t * -7; // -5deg -> -12deg
      opacity = 1 - t;       // 1 -> 0
      scale = 1 - t * 0.08;  // 1 -> 0.92
      translateY = t * -14;  // 0 -> -14px
      pointerEvents = t < 0.4 ? "auto" : "none";
    }
  } else {
    // Upcoming item approaching from below (diff -1.25 to 0)
    zIndex = diff >= -0.5 ? 10 : 5;
    if (diff < -0.45) {
      // Phase 1: Incoming from below
      const t = Math.min(1, Math.max(0, (diff - (-1.0)) / 0.55));
      rotateZ = 16 - t * 9;   // 16deg -> 7deg
      rotateY = 12 - t * 7;   // 12deg -> 5deg
      opacity = t;            // 0 -> 1
      scale = 0.92 + t * 0.08;// 0.92 -> 1
      translateY = 14 - t * 14;
      pointerEvents = "none";
    } else {
      // Phase 2: Settling upright from 7deg to 0deg
      const t = Math.min(1, Math.max(0, (diff - (-0.45)) / 0.45));
      rotateZ = 7 - t * 7;   // 7deg -> 0deg
      rotateY = 5 - t * 5;   // 5deg -> 0deg
      opacity = 1;
      scale = 1;
      translateY = 0;
      pointerEvents = t > 0.6 ? "auto" : "none";
    }
  }

  return {
    opacity,
    transform: `perspective(1000px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`,
    zIndex,
    pointerEvents,
  };
}

export default function CategorySection({
  onSelectCategory,
  onOpenQuoteModal,
}: CategorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // High precision scroll observer
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      // 0 when section enters top, 1 when scrolled to bottom of section
      const rawProgress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Continuous scroll progress across commodities (0 to 3 for 4 commodities)
  const productProgress = scrollProgress * (COMMODITIES.length - 1);
  const activeIndex = Math.min(
    COMMODITIES.length - 1,
    Math.max(0, Math.round(productProgress))
  );

  const currentProduct = COMMODITIES[activeIndex];

  return (
    <section
      id="categories"
      ref={containerRef}
      className="relative bg-white min-h-[300vh] w-full text-stone-900 select-none border-t border-b border-stone-200/80 overflow-x-clip"
    >
      {/* Sticky Stage: Generous vertical breathing room with bottom clearance */}
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-between pt-10 sm:pt-12 lg:pt-14 pb-14 sm:pb-18 lg:pb-24">
        
        {/* ========================================================
            TOP HEADER GROUP in Maroon (#800020)
            Statically anchored cleanly at the top of the section
            ======================================================== */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 z-30 pointer-events-auto">
          {/* Top Kicker: "Direct Origin." in Maroon (#800020) */}
          <h3 className="text-[#800020] font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight leading-tight">
            Direct Origin.
          </h3>

          {/* Condensed Display Headline: "GLOBALLY DISPATCHED" in Maroon (#800020) */}
          <h2 className="font-navbar-brand text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black text-[#800020] uppercase leading-[0.92] tracking-tight select-none mt-1 drop-shadow-[0_2px_4px_rgba(128,0,32,0.08)]">
            GLOBALLY DISPATCHED
          </h2>

          {/* Subtitle: "4 Agro Commodities" in Maroon (#800020) */}
          <p className="text-[#800020] font-semibold text-xs sm:text-sm md:text-base tracking-normal mt-1">
            4 Agro Commodities
          </p>
        </div>

        {/* ========================================================
            MAIN STAGE (Left: 3D Grounded Product Bag | Right: Glassmorphic Bento Showcase)
            Crossfades smoothly across commodities without abrupt cuts!
            ======================================================== */}
        <div className="flex-1 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-14 relative z-25 my-auto">
          {/* Left Column: Product Bag with Radiant Glow & 3D Stage Grounding */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[400px] lg:min-h-[460px]">
            
            {/* Soft Ambient Glow Layers behind the Product Bag */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              {COMMODITIES.map((prod, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={`glow-${prod.id}`}
                    className={`absolute w-72 sm:w-96 md:w-[440px] lg:w-[500px] xl:w-[560px] aspect-square rounded-full blur-3xl transition-all duration-700 ease-out ${
                      isActive ? "opacity-70 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={{
                      background: prod.glowGradient,
                    }}
                  />
                );
              })}
              {/* Soft diffused inner highlight */}
              <div className="absolute w-48 sm:w-64 md:w-80 aspect-square rounded-full bg-white/45 blur-2xl pointer-events-none" />
            </div>

            {/* Interactive Bag Container with Generous Sizing & 3D Float */}
            <div 
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(COMMODITIES[activeIndex].category);
                } else {
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative w-64 sm:w-80 md:w-[350px] lg:w-[390px] xl:w-[440px] 2xl:w-[480px] max-h-[52vh] aspect-[3/4] group cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2"
              title={`View details for ${COMMODITIES[activeIndex].name}`}
            >
              {/* All 4 Product Images stacked with dynamic scroll-driven rotation and silky-smooth crossfade transitions */}
              {COMMODITIES.map((prod, idx) => {
                const imgStyle = getImageTransform(idx, scrollProgress, COMMODITIES.length);
                return (
                  <div
                    key={prod.id}
                    style={{
                      opacity: imgStyle.opacity,
                      transform: imgStyle.transform,
                      zIndex: imgStyle.zIndex,
                      pointerEvents: imgStyle.pointerEvents,
                      transition:
                        "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.alt}
                      fill
                      priority={idx === 0}
                      className="object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.20)] group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 340px, (max-width: 1024px) 460px, 540px"
                    />
                  </div>
                );
              })}
            </div>

            {/* 3D Radial Stage Grounding Floor Shadow */}
            <div className="w-52 sm:w-72 lg:w-88 xl:w-96 h-5 sm:h-6 bg-stone-900/15 rounded-[100%] blur-md mt-2 mx-auto pointer-events-none" />
          </div>

          {/* Right Column: Enlarged Ultra-Luxury Showcase Section */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-start lg:pl-4 xl:pl-6 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] w-full">
            {COMMODITIES.map((prod, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`details-${prod.id}`}
                  className={`w-full max-w-2xl xl:max-w-[720px] 2xl:max-w-[780px] transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto relative z-10"
                      : "opacity-0 translate-y-3 pointer-events-none absolute top-0 left-0 z-0"
                  }`}
                >
                  {/* Clean Borderless Showcase Container */}
                  <div className="bg-white/90 sm:bg-white/95 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 lg:p-8 xl:p-9 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border-0 relative">
                    
                    {/* Top Row: Dynamic Badge */}
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#800020]/8 text-[#800020] text-xs sm:text-[12px] font-bold uppercase tracking-wider mb-3.5">
                      <span className="w-2 h-2 rounded-full bg-[#800020] animate-pulse" />
                      <span>{prod.badgeText}</span>
                    </div>

                    {/* Product Headline & Origin Tagline */}
                    <div className="mb-4 max-w-2xl">
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-[#0e2439] tracking-tight leading-[1.12] mb-1.5">
                        {prod.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-[#c89d3c] tracking-wide mb-2 flex items-center gap-2">
                        <span>{prod.tagline}</span>
                      </p>
                      <p className="text-stone-600 text-xs sm:text-sm lg:text-[14.5px] font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {prod.description}
                      </p>
                    </div>

                    {/* 3 Enlarged Premium Feature Spec Cards in Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-5 sm:mb-6">
                      {prod.features.map((feat, fIdx) => (
                        <div
                          key={`${prod.id}-${fIdx}`}
                          className="p-3.5 sm:p-4 xl:p-4.5 rounded-2xl bg-[#faf8f5] hover:bg-white border border-[#ede8e1] hover:border-[#800020]/30 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-default"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl bg-white text-[#800020] shadow-2xs border border-stone-200/60 flex items-center justify-center shrink-0 group-hover:bg-[#800020] group-hover:text-white group-hover:border-[#800020] transition-all duration-300 [&_svg]:text-current [&_svg]:stroke-current">
                              {feat.icon}
                            </span>
                            <span className="text-[10.5px] font-bold text-stone-400 uppercase tracking-wider">
                              {feat.label}
                            </span>
                          </div>
                          <div>
                            <span className="block font-black text-[#0e2439] text-base sm:text-lg lg:text-[20px] tracking-tight leading-snug mb-0.5 group-hover:text-[#800020] transition-colors">
                              {feat.metric}
                            </span>
                            <span className="block text-stone-500 text-xs sm:text-[12.5px] font-normal leading-relaxed">
                              {feat.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Button: View Details */}
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectCategory) {
                            onSelectCategory(prod.category);
                          } else {
                            const el = document.getElementById("products");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_10px_24px_rgba(128,0,32,0.28)] hover:shadow-[0_14px_34px_rgba(128,0,32,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer inline-flex items-center justify-center gap-2.5 group"
                      >
                        <span>View details</span>
                        <span className="w-5.5 h-5.5 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
                        </span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
