"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onOpenVideoModal?: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

interface Pack {
  id: string;
  image: string;
  alt: string;
  commodityName: string;
  /** Positioning classes along the curve */
  className: string;
  /** Fly-in stagger delay (ms) */
  delay: number;
  /** Upward drift rate on scroll */
  parallaxY: number;
  /** Rightward drift rate on scroll */
  parallaxX: number;
  /** Non-linear rightward arc factor (curvature) */
  curveX: number;
  /** Non-linear upward arc factor (curvature) */
  curveY: number;
  /** How much the pack tilts dynamically as you scroll */
  tiltRate: number;
  zIndex: number;
}

/**
 * 4 Commodities:
 * - Straight (upright at 0deg) at initial load
 * - Visible along their curve formation with a smooth entrance transition
 * - Dynamically curves upwards and to the right on scroll
 */
const PACKS: Pack[] = [
  {
    id: "rice",
    image: "/assets/monagrow-rice-bag-cutout.png",
    alt: "Monagrow 5kg Basmati Rice Bag",
    commodityName: "Basmati Rice",
    className:
      "top-[6%] sm:top-[7%] lg:top-[8%] right-[5%] sm:right-[6%] lg:right-[8%] w-[33vw] sm:w-[26vw] lg:w-[20vw] max-w-[325px] min-w-[195px]",
    delay: 80,
    parallaxY: -0.16,
    parallaxX: 0.12,
    curveX: 90,
    curveY: 45,
    tiltRate: 0.012, // tilts clockwise into the rightward curve
    zIndex: 25,
  },
  {
    id: "cashews",
    image: "/assets/monagrow-cashews-packaging-new.png",
    alt: "Monagrow 2.5kg Royal Cashews Pouch",
    commodityName: "Royal Cashews",
    className:
      "top-[33%] sm:top-[34%] lg:top-[35%] right-[19%] sm:right-[22%] lg:right-[25%] w-[28vw] sm:w-[22vw] lg:w-[17vw] max-w-[270px] min-w-[160px]",
    delay: 160,
    parallaxY: -0.22,
    parallaxX: 0.16,
    curveX: 130,
    curveY: 60,
    tiltRate: 0.014,
    zIndex: 22,
  },
  {
    id: "coffee",
    image: "/assets/monagrow-coffee-bag-cutout.png",
    alt: "Monagrow 2.5kg Specialty Estate Coffee Bag",
    commodityName: "Estate Coffee",
    className:
      "bottom-[8%] sm:bottom-[8.5%] lg:bottom-[9%] left-[28%] sm:left-[31%] lg:left-[34%] w-[37vw] sm:w-[29vw] lg:w-[22vw] max-w-[355px] min-w-[210px]",
    delay: 240,
    parallaxY: -0.28,
    parallaxX: 0.20,
    curveX: 160,
    curveY: 75,
    tiltRate: 0.016,
    zIndex: 20,
  },
  {
    id: "sugar",
    image: "/assets/monagrow-sugar-bag-cutout.png",
    alt: "Monagrow 5kg Refined Cane Sugar Bag",
    commodityName: "Refined Cane Sugar",
    className:
      "bottom-[2%] sm:bottom-[2.5%] lg:bottom-[3%] left-[2%] sm:left-[3%] lg:left-[4%] w-[39vw] sm:w-[31vw] lg:w-[23vw] max-w-[375px] min-w-[220px]",
    delay: 320,
    parallaxY: -0.34,
    parallaxX: 0.24,
    curveX: 190,
    curveY: 90,
    tiltRate: 0.018,
    zIndex: 18,
  },
];

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const [isReady, setIsReady] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);

    // Initial slight pause then trigger smooth entrance
    const readyTimer = setTimeout(() => setIsReady(true), 80);
    const settledTimer = setTimeout(() => setIsSettled(true), 600);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        if (window.scrollY > 8) {
          setIsSettled(true);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(settledTimer);
      mq.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const drift = isSettled && !reduceMotion ? Math.min(scrollY, 1100) : 0;

  const textReveal = (delayMs: number): React.CSSProperties => ({
    opacity: isReady ? 1 : 0,
    transform: isReady || reduceMotion ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
    transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease-out",
    transitionDelay: `${delayMs}ms`,
  });

  return (
    <section
      id="home"
      className="relative min-h-[760px] sm:min-h-[820px] lg:min-h-[900px] xl:min-h-[950px] h-[96vh] lg:h-[98vh] overflow-hidden text-neutral-900 select-none"
      style={{
        background: "radial-gradient(ellipse at 45% 25%, #FFFFFF 0%, #FAF8F4 60%, #F3EDE7 100%)",
      }}
    >


      {/* Copy & Branding */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-18 flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pointer-events-none">
        <div className="max-w-xl lg:max-w-2xl pointer-events-auto ml-4 sm:ml-10 lg:ml-16 xl:ml-20">
          {/* Outlined Straight Label: The Taste of Purity cleanly aligned over Monagrow */}
          <div
            className="relative mb-2 sm:mb-2.5 ml-1 sm:ml-1.5 overflow-visible select-none inline-block pointer-events-none"
            style={textReveal(0)}
          >
            <svg
              viewBox="0 0 260 26"
              className="w-48 sm:w-56 md:w-64 h-6 sm:h-7 overflow-visible block"
              aria-hidden="true"
            >
              <text
                x="0"
                y="19"
                className="font-sans text-[18px] sm:text-[19px] md:text-[20px] font-bold tracking-wider select-none"
                style={{
                  fill: "transparent",
                  stroke: "#800020",
                  strokeWidth: "1.4px",
                  paintOrder: "stroke fill",
                }}
              >
                The Taste of Purity
              </text>
            </svg>
          </div>

          {/* Headline: Company name MONAGROW in Bebas Neue display */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[92px] xl:text-[104px] uppercase mb-5 sm:mb-6 select-none text-[#800020]"
            style={{
              fontFamily: "var(--font-bebas), var(--font-antonio), 'Impact', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.025em",
              lineHeight: 0.88,
              ...textReveal(80),
            }}
          >
            Monagrow
          </h1>

          {/* Description */}
          <p
            className="text-stone-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-lg mb-7"
            style={textReveal(180)}
          >
            Premium Basmati rice, refined cane sugar, estate coffee, and royal cashews, packed at origin and shipped in bulk to markets worldwide.
          </p>

          {/* Button: Completely clear of Sugar bag */}
          <div className="mb-8 sm:mb-10" style={textReveal(260)}>
            <button
              type="button"
              onClick={() => onOpenQuoteModal("All Wholesale Commodities")}
              className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border-2 border-[#800020] shadow-[5px_7px_0px_#1c1917] hover:shadow-[2px_3px_0px_#1c1917] hover:translate-x-[3px] hover:translate-y-[4px] active:shadow-none active:translate-x-[5px] active:translate-y-[7px] transition-all cursor-pointer inline-flex items-center gap-2.5 group"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        COMMODITY PRODUCTS:
        - Straight (0deg) at initial rest
        - Tilts dynamically as the user scrolls
        - Last 2 images in the bottom half rising with scroll
      */}
      {PACKS.map((pack) => {
        // Normalized scroll factor
        const t = drift / 1000;
        // Non-linear rightward and upward curved trajectory
        const curveFactor = Math.pow(t, 1.35);
        const driftX = (drift * pack.parallaxX + curveFactor * pack.curveX).toFixed(1);
        const driftY = (drift * pack.parallaxY - curveFactor * pack.curveY).toFixed(1);
        const dynamicTilt = (drift * pack.tiltRate).toFixed(2);

        return (
          <div
            key={pack.id}
            className={`absolute aspect-3/4 pointer-events-auto ${pack.className}`}
            style={{
              zIndex: pack.zIndex,
              transform: `translate3d(${driftX}px, ${driftY}px, 0) rotate(${dynamicTilt}deg)`,
              transition: isSettled ? "transform 0.06s ease-out" : "none",
              willChange: "transform",
            }}
          >
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => onOpenQuoteModal(pack.commodityName)}
              title={`Request wholesale quote for ${pack.commodityName}`}
              style={{
                opacity: isReady ? 1 : 0,
                transform: isReady || reduceMotion
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(0, 18px, 0) scale(0.96)",
                transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${pack.delay}ms`,
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={pack.image}
                alt={pack.alt}
                fill
                preload={pack.id === "rice"}
                className="object-contain drop-shadow-[0_24px_38px_rgba(25,15,5,0.18)] group-hover:scale-105 group-hover:drop-shadow-[0_32px_48px_rgba(25,15,5,0.25)] transition-all duration-300"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
