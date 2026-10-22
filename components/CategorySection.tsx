"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CategorySectionProps {
  onSelectCategory?: (categoryId: string) => void;
  onOpenQuoteModal?: (categoryName: string) => void;
}

interface Spec {
  label: string;
  value: string;
}

interface Commodity {
  id: string;
  category: string;
  word: string;
  name: string;
  shortTitle: string;
  size: string;
  image: string;
  alt: string;
  blurb: string;
  specs: Spec[];
  /** Resting tilt of the pack, in degrees. */
  tilt: number;
  /** Stage background, blob, and display-word colours. */
  bg: string;
  blob: string;
  ink: string;
  /** Which side the blurb sits on at desktop widths. */
  blurbSide: "left" | "right";
  /** Optional custom base scale for the pack image */
  scale?: number;
}

const COMMODITIES: Commodity[] = [
  {
    id: "rice",
    category: "rice",
    word: "Basmati",
    name: "1121 Supreme Long Grain Basmati",
    shortTitle: "Basmati Rice",
    size: "5 kg",
    image: "/assets/monagrow-rice-bag-cutout.png",
    alt: "Monagrow 5kg Basmati Rice Bag",
    blurb:
      "Aged two full seasons in Himalayan silos. Grains cook past 22mm with clean separation and a full aroma.",
    specs: [
      { label: "Grain length", value: "8.9 mm+" },
      { label: "Moisture", value: "under 11.5%" },
      { label: "Purity", value: "100% Sortex" },
    ],
    tilt: -7,
    bg: "#e8eef6",
    blob: "#cfdcec",
    ink: "#2b4a6f",
    blurbSide: "left",
  },
  {
    id: "sugar",
    category: "sugar",
    word: "Sugar",
    name: "Pure Refined Cane Sugar",
    shortTitle: "Refined Sugar",
    size: "5 kg",
    image: "/assets/monagrow-sugar-bag-cutout.png",
    alt: "Monagrow 5kg Refined Cane Sugar Bag",
    blurb:
      "Triple-clarified to ICUMSA 45. Free-flowing crystals with instant solubility for bottling and confectionery.",
    specs: [
      { label: "Optical clarity", value: "ICUMSA 45" },
      { label: "Polarization", value: "99.85%" },
      { label: "Certification", value: "ISO 22000" },
    ],
    tilt: 8,
    bg: "#eaf3e3",
    blob: "#cfe3bf",
    ink: "#3f6b2f",
    blurbSide: "right",
  },
  {
    id: "coffee",
    category: "coffee",
    word: "Coffee",
    name: "Highland Dark Roast Arabica",
    shortTitle: "Estate Coffee",
    size: "2.5 kg",
    image: "/assets/monagrow-coffee-bag-cutout.png",
    alt: "Monagrow 2.5kg Specialty Coffee Bag",
    blurb:
      "Shade-grown above 1,450 metres and drum-roasted in small batches. Dark cocoa, roasted pecan, caramel.",
    specs: [
      { label: "Roast", value: "Artisan dark" },
      { label: "Elevation", value: "1,450 m+" },
      { label: "Cupping score", value: "SCAA 86+" },
    ],
    tilt: -8,
    bg: "#f3e9de",
    blob: "#e2cdb6",
    ink: "#5a3a22",
    blurbSide: "left",
  },
  {
    id: "dryfruits",
    category: "dryfruits",
    word: "Cashews",
    name: "Royal Whole Cashews W240",
    shortTitle: "Royal Cashews",
    size: "2.5 kg",
    image: "/assets/monagrow-cashews-packaging-new.png",
    alt: "Monagrow 2.5kg Royal Cashews Pouch",
    blurb:
      "Hand-picked jumbo kernels with a sweet, buttery snap. Nitrogen-flushed at origin to stay crisp for 24 months.",
    specs: [
      { label: "Kernel count", value: "W240 jumbo" },
      { label: "Moisture", value: "under 4.5%" },
      { label: "Packaging", value: "Nitrogen flushed" },
    ],
    tilt: 7,
    bg: "#efe6f3",
    blob: "#dac8e5",
    ink: "#4a2d63",
    blurbSide: "right",
    scale: 0.82,
  },
];

const TOTAL = COMMODITIES.length;
/** Scroll distance (in vh) spent moving from one product to the next. */
const SEGMENT_VH = 90;
/** Half-width of the zone around each product where it is fully shown. */
const HOLD = 0.22;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface VisualStyles {
  pack: React.CSSProperties;
  word: React.CSSProperties;
  blob: React.CSSProperties;
}

/**
 * Scroll-driven styles for one product's pack, display word, and blob.
 * `p` runs from 0 (first product) to TOTAL - 1 (last product).
 */
function getVisualStyles(item: Commodity, idx: number, p: number, reduceMotion: boolean): VisualStyles {
  const diff = p - idx;
  const dist = Math.abs(diff);
  const hidden: React.CSSProperties = { opacity: 0, visibility: "hidden" };

  if (dist >= 0.5) {
    return { pack: hidden, word: hidden, blob: hidden };
  }

  const fade = dist <= HOLD ? 1 : smoothstep(1 - (dist - HOLD) / (0.5 - HOLD));
  const m = reduceMotion ? 0 : 1;

  const packY = -diff * 110 * m;
  const packRotate = item.tilt + -diff * 18 * m;
  const baseScale = item.scale ?? 1;
  const packScale = baseScale * (1 - (1 - fade) * 0.08 * m);

  const wordX = -diff * 220 * m;
  const blobScale = 0.86 + 0.14 * fade;

  return {
    pack: {
      opacity: fade,
      visibility: "visible",
      transform: `translate3d(0, ${packY.toFixed(1)}px, 0) rotate(${packRotate.toFixed(2)}deg) scale(${packScale.toFixed(3)})`,
    },
    word: {
      opacity: fade,
      visibility: "visible",
      transform: `translate3d(${wordX.toFixed(1)}px, 0, 0)`,
    },
    blob: {
      opacity: fade,
      visibility: "visible",
      transform: `scale(${blobScale.toFixed(3)}) rotate(${(-diff * 10 * m).toFixed(2)}deg)`,
    },
  };
}

export default function CategorySection({
  onSelectCategory,
  onOpenQuoteModal,
}: CategorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress(Math.max(0, Math.min(1, -rect.top / scrollable)));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const p = progress * (TOTAL - 1);
  const activeIndex = Math.min(TOTAL - 1, Math.max(0, Math.round(p)));
  const active = COMMODITIES[activeIndex];

  const viewDetails = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
      return;
    }
    onOpenQuoteModal?.(category);
  };

  const textState = (isActive: boolean) =>
    isActive
      ? "opacity-100 translate-y-0 pointer-events-auto"
      : "opacity-0 translate-y-3 pointer-events-none";

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${100 + (TOTAL - 1) * SEGMENT_VH}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full flex flex-col overflow-hidden pt-16 sm:pt-20 pb-4 sm:pb-6 transition-colors duration-700 ease-out"
        style={{ backgroundColor: active.bg }}
      >
        <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col flex-1 min-h-0">


          {/* Stage */}
          <div className="relative flex-1 min-h-0">
            {/* Blob + display word, behind the pack */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              {COMMODITIES.map((item, idx) => {
                const s = getVisualStyles(item, idx, p, reduceMotion);
                return (
                  <React.Fragment key={item.id}>
                    <div
                      aria-hidden
                      className="absolute h-[52%] sm:h-[58%] lg:h-[64%] aspect-square will-change-transform"
                      style={{
                        ...s.blob,
                        backgroundColor: item.blob,
                        borderRadius: "46% 54% 52% 48% / 58% 42% 58% 42%",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute font-sans font-extrabold tracking-tight leading-none whitespace-nowrap text-[clamp(72px,22vw,200px)] lg:text-[clamp(96px,13vw,200px)] will-change-transform"
                      style={{ ...s.word, color: item.ink }}
                    >
                      {item.word}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Pack */}
            <button
              type="button"
              onClick={() => viewDetails(active.category)}
              aria-label={`View details for ${active.name}`}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <div className="relative h-[72%] sm:h-[84%] lg:h-[88%] aspect-3/4 max-w-full">
                {COMMODITIES.map((item, idx) => {
                  const s = getVisualStyles(item, idx, p, reduceMotion);
                  return (
                    <div key={item.id} className="absolute inset-0 will-change-transform" style={s.pack}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        preload={idx === 0}
                        className="object-contain drop-shadow-[0_30px_40px_rgba(20,20,30,0.22)]"
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 460px, 560px"
                      />
                    </div>
                  );
                })}
              </div>
            </button>

            {/* Desktop text blocks, pinned to opposite corners */}
            {COMMODITIES.map((item, idx) => {
              const isActive = idx === activeIndex;
              const blurbLeft = item.blurbSide === "left";
              return (
                <React.Fragment key={item.id}>
                  <div
                    aria-hidden={!isActive}
                    className={`hidden lg:block absolute top-[8%] max-w-xs transition-all duration-500 ease-out ${
                      blurbLeft ? "left-0" : "right-0 text-right"
                    } ${textState(isActive)}`}
                  >
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: item.ink }}
                    >
                      {item.name}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{item.blurb}</p>
                  </div>

                  <div
                    aria-hidden={!isActive}
                    className={`hidden lg:block absolute bottom-[6%] w-72 transition-all duration-500 ease-out ${
                      blurbLeft ? "right-0" : "left-0"
                    } ${textState(isActive)}`}
                  >
                    <p className="font-serif text-3xl font-semibold text-navy">{item.size}</p>
                    <dl className="mt-3 border-t border-black/10">
                      {item.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-baseline justify-between gap-4 py-2.5 border-b border-black/10"
                        >
                          <dt className="text-xs uppercase tracking-wider text-stone-500">{spec.label}</dt>
                          <dd className="text-sm font-semibold text-navy">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-5 flex items-center gap-5">
                      <button
                        type="button"
                        onClick={() => viewDetails(item.category)}
                        className="inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-[#800020] hover:bg-primary-dark text-white font-semibold text-sm transition-colors duration-200 cursor-pointer group"
                      >
                        <span>View details</span>
                        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                          <ArrowUpRight className="w-4 h-4 text-[#800020] stroke-[2.5]" />
                        </span>
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile and tablet text, below the stage */}
          <div className="lg:hidden relative pt-3 min-h-37.5">
            {COMMODITIES.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  aria-hidden={!isActive}
                  className={`transition-all duration-500 ease-out ${
                    isActive ? "relative" : "absolute inset-x-0 top-3"
                  } ${textState(isActive)}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: item.ink }}>
                      {item.name}
                    </p>
                    <p className="font-serif text-lg font-semibold text-navy shrink-0">{item.size}</p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-700 line-clamp-2">{item.blurb}</p>
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
                    {item.specs.map((spec) => (
                      <span key={spec.label}>
                        <span className="text-stone-400">{spec.label} </span>
                        <span className="font-semibold text-navy">{spec.value}</span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => viewDetails(item.category)}
                      className="inline-flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-full bg-[#800020] text-white font-semibold text-xs cursor-pointer"
                    >
                      <span>View details</span>
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#800020] stroke-[2.5]" />
                      </span>
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
