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
  desc: string;
}

interface CommodityShowcase {
  id: string;
  category: string;
  name: string;
  shortTitle: string;
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
    name: "Monagrow 1121 Extra Long Basmati",
    shortTitle: "Basmati Rice",
    image: "/assets/monagrow-rice-bag-cutout.png",
    alt: "Monagrow 5kg Basmati Rice Bag",
    tagline: "Aged 24 Months • Himalayan Foothills",
    description: "Naturally matured for 24 months in fertile Himalayan foothills. Renowned for its exceptional slender elongation, non-sticky fluffiness, and delicate fragrance upon cooking.",
    glowGradient: "radial-gradient(circle, rgba(245, 190, 75, 0.30) 0%, rgba(217, 130, 25, 0.12) 48%, rgba(128, 0, 32, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "8.9mm Extra Long",
        desc: "2.5x cooked elongation ratio",
      },
      {
        icon: <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "< 12% Moisture",
        desc: "Optimum hardness & long shelf-life",
      },
      {
        icon: <Wheat className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "100% Sortex Clean",
        desc: "Zero chalky grains & export grade",
      },
    ],
  },
  {
    id: "sugar",
    category: "sugar",
    name: "Monagrow Pure Refined Cane Sugar",
    shortTitle: "Refined Sugar",
    image: "/assets/monagrow-sugar-bag-cutout.png",
    alt: "Monagrow 5kg Refined Cane Sugar Bag",
    tagline: "Pure Crystal Cane • Food & Beverage Standard",
    description: "Ultra-pure crystal white cane sugar refined to international ICUMSA 45 purity standards. Features uniform free-flowing granulation and rapid solubility for commercial confectionery and beverages.",
    glowGradient: "radial-gradient(circle, rgba(74, 222, 128, 0.28) 0%, rgba(34, 197, 94, 0.12) 48%, rgba(20, 83, 45, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "99.8% Sucrose",
        desc: "Sparkling crystal white purity",
      },
      {
        icon: <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "0.04% Max Moisture",
        desc: "Free-flowing uniform granulation",
      },
      {
        icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "ISO 22000 Certified",
        desc: "Commercial confectionery grade",
      },
    ],
  },
  {
    id: "coffee",
    category: "coffee",
    name: "Monagrow Specialty Dark Arabica",
    shortTitle: "Estate Coffee",
    image: "/assets/monagrow-coffee-bag-cutout.png",
    alt: "Monagrow 2.5kg Specialty Coffee Bag",
    tagline: "High-Altitude Estate • Slow Drum Roasted",
    description: "Single-origin shade-grown Arabica harvested from high-elevation plantations above 1,400 meters. Slow drum roasted to unlock deep aromatic layers of dark cocoa, roasted nuts, and creamy caramel.",
    glowGradient: "radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(180, 83, 9, 0.12) 48%, rgba(120, 53, 15, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "Slow Drum Roasted",
        desc: "Dark roast with rich cocoa & caramel",
      },
      {
        icon: <Coffee className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "1,400m+ Altitude",
        desc: "Single-origin shade grown lots",
      },
      {
        icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "Grade 1 Specialty",
        desc: "SCAA 85+ international cup score",
      },
    ],
  },
  {
    id: "dryfruits",
    category: "dryfruits",
    name: "Monagrow Royal Whole Cashews W240",
    shortTitle: "Royal Cashews",
    image: "/assets/monagrow-cashews-bag-cutout.png",
    alt: "Monagrow 2.5kg Royal Cashews Pouch",
    tagline: "Handpicked Jumbo Kernels • Natural Butter Crunch",
    description: "King-size W240 cashew kernels hand-graded for flawless crescent curve and natural ivory color. Nitrogen flushed at origin to seal in crisp freshness, buttery crunch, and rich nutrient profile.",
    glowGradient: "radial-gradient(circle, rgba(250, 204, 21, 0.30) 0%, rgba(234, 179, 8, 0.12) 48%, rgba(180, 83, 9, 0.04) 65%, transparent 75%)",
    features: [
      {
        icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "W240 Jumbo Count",
        desc: "220–240 whole kernels per pound",
      },
      {
        icon: <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "< 5% Moisture",
        desc: "Naturally crisp nutty sweetness",
      },
      {
        icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#800020] stroke-[2.2]" />,
        label: "Nitrogen Flushed",
        desc: "Vacuum sealed for export freshness",
      },
    ],
  },
];

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

  // Active product across scroll track (4 commodities evenly distributed across scroll progress)
  let activeIndex = 0;
  if (scrollProgress >= 0.75) {
    activeIndex = 3; // Royal Cashews
  } else if (scrollProgress >= 0.50) {
    activeIndex = 2; // Dark Arabica
  } else if (scrollProgress >= 0.25) {
    activeIndex = 1; // Refined Sugar
  } else {
    activeIndex = 0; // Basmati Rice
  }

  const currentProduct = COMMODITIES[activeIndex];

  return (
    <section
      id="categories"
      ref={containerRef}
      className="relative bg-white min-h-[280vh] w-full text-stone-900 select-none border-t border-stone-200/70"
    >
      {/* Sticky Fullscreen Stage: Clean minimal layout matching Screenshot 2 */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16">
        
        {/* ========================================================
            TOP HEADER GROUP in Maroon (#800020)
            Statically anchored cleanly at the top of the section
            ======================================================== */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 z-30 pointer-events-auto">
          {/* Top Kicker: "Direct Origin." in Maroon (#800020) */}
          <h3 className="text-[#800020] font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px] tracking-tight leading-tight">
            Direct Origin.
          </h3>

          {/* Condensed Display Headline: "GLOBALLY DISPATCHED" in Maroon (#800020) with decreased font size */}
          <h2 className="font-navbar-brand text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-black text-[#800020] uppercase leading-[0.92] tracking-tight select-none mt-1 drop-shadow-[0_2px_4px_rgba(128,0,32,0.08)]">
            GLOBALLY DISPATCHED
          </h2>

          {/* Subtitle: "4 Agro Commodities" in Maroon (#800020) */}
          <p className="text-[#800020] font-semibold text-xs sm:text-sm md:text-base tracking-normal mt-1 sm:mt-1.5">
            4 Agro Commodities
          </p>
        </div>

        {/* ========================================================
            MAIN STAGE (Left: Product Bag with Radiant Glow | Right: 3 Features + View Details Button)
            Crossfades smoothly across commodities without abrupt cuts!
            ======================================================== */}
        <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-25 my-auto">
          {/* Left Column: Product Bag with Radiant Glow & Smooth Dissolve Transition */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px]">
            
            {/* Soft Ambient Glow Layers behind the Product Bag */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              {COMMODITIES.map((prod, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={`glow-${prod.id}`}
                    className={`absolute w-60 sm:w-72 md:w-80 lg:w-[360px] xl:w-[400px] aspect-square rounded-full blur-3xl transition-all duration-700 ease-out ${
                      isActive ? "opacity-65 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={{
                      background: prod.glowGradient,
                    }}
                  />
                );
              })}
              {/* Soft diffused inner highlight */}
              <div className="absolute w-36 sm:w-44 md:w-52 aspect-square rounded-full bg-white/35 blur-xl pointer-events-none" />
            </div>

            {/* Interactive Bag Container with Increased Size */}
            <div 
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(COMMODITIES[activeIndex].category);
                } else {
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative w-60 sm:w-72 md:w-84 lg:w-[380px] xl:w-[420px] aspect-[3/4] group cursor-pointer"
              title={`View details for ${COMMODITIES[activeIndex].name}`}
            >
              {/* All 4 Product Images stacked for silky-smooth crossfade transitions */}
              {COMMODITIES.map((prod, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={prod.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out flex items-center justify-center ${
                      isActive
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto z-10"
                        : "opacity-0 scale-95 translate-y-2 pointer-events-none z-0"
                    }`}
                  >
                    <Image
                      src={prod.image}
                      alt={prod.alt}
                      fill
                      priority={idx === 0}
                      className="object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.16)] group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 420px"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Product Title, Dynamic Description, 3 Feature Bullets + View Details Button with Smooth Crossfade */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-start lg:pl-6 xl:pl-10 relative min-h-[380px] sm:min-h-[440px] w-full">
            {COMMODITIES.map((prod, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`details-${prod.id}`}
                  className={`w-full max-w-lg transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto relative z-10"
                      : "opacity-0 translate-y-3 pointer-events-none absolute top-0 left-0 z-0"
                  }`}
                >
                  {/* Dynamic Product Headline & Description */}
                  <div className="mb-6 max-w-lg">
                    <span className="text-[#800020] font-bold text-xs sm:text-sm uppercase tracking-widest block mb-1">
                      {prod.shortTitle} • {prod.tagline}
                    </span>
                    <h3 className="font-navbar-brand text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1917] tracking-tight uppercase leading-tight mb-2.5">
                      {prod.name}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* 3 Feature Bullets with Maroon Bullet Points */}
                  <div className="flex flex-col gap-4 sm:gap-5 max-w-md w-full">
                    {prod.features.map((feat, fIdx) => (
                      <div
                        key={`${prod.id}-${fIdx}`}
                        className="flex items-start gap-3 sm:gap-4 text-left group"
                      >
                        {/* Maroon Bullet Point */}
                        <span className="w-2.5 h-2.5 rounded-full bg-[#800020] shrink-0 mt-1.5 shadow-[0_0_6px_rgba(128,0,32,0.35)] group-hover:scale-125 transition-transform duration-200" />

                        {/* Feature Label & Metric */}
                        <div className="flex flex-col">
                          <span className="text-[#1c1917] font-extrabold text-base sm:text-lg tracking-tight leading-snug">
                            {feat.label}
                          </span>
                          <span className="text-stone-600 text-xs sm:text-sm font-medium leading-tight mt-0.5">
                            {feat.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View Details Action Button */}
                  <div className="mt-8 pt-1">
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
                      className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border-2 border-[#800020] shadow-[4px_6px_0px_#1c1917] hover:shadow-[2px_3px_0px_#1c1917] hover:translate-x-[2px] hover:translate-y-[3px] active:shadow-none active:translate-x-[4px] active:translate-y-[6px] transition-all cursor-pointer inline-flex items-center gap-2.5 group"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
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
