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
  /** CSS keyframe animation name */
  animationName: string;
  /** Fly-in stagger delay (ms) */
  delay: number;
  /** Parallax drift on scroll */
  parallaxY: number;
  parallaxX: number;
  /** How much the pack tilts dynamically as you scroll */
  tiltRate: number;
  zIndex: number;
}

/**
 * 4 Commodities:
 * - Straight (upright at 0deg) at initial load
 * - Last 2 images (Coffee and Sugar) positioned in the bottom half
 * - Dynamically tilts as the user scrolls
 */
const PACKS: Pack[] = [
  {
    id: "rice",
    image: "/assets/monagrow-rice-bag-cutout.png",
    alt: "Monagrow 5kg Basmati Rice Bag",
    commodityName: "Basmati Rice",
    className:
      "top-[10%] sm:top-[11%] lg:top-[12%] right-[2%] sm:right-[3%] lg:right-[4%] w-[38vw] sm:w-[30vw] lg:w-[23vw] max-w-[370px] min-w-[220px]",
    animationName: "curveInRice",
    delay: 100,
    parallaxY: -0.16,
    parallaxX: 0.03,
    tiltRate: 0.016, // tilts clockwise on scroll
    zIndex: 25,
  },
  {
    id: "cashews",
    image: "/assets/monagrow-cashews-bag-cutout.png",
    alt: "Monagrow 2.5kg Royal Cashews Pouch",
    commodityName: "Royal Cashews",
    className:
      "top-[44%] sm:top-[46%] lg:top-[48%] right-[16%] sm:right-[19%] lg:right-[21%] w-[32vw] sm:w-[25vw] lg:w-[19vw] max-w-[300px] min-w-[180px]",
    animationName: "curveInCashews",
    delay: 220,
    parallaxY: -0.24,
    parallaxX: 0.02,
    tiltRate: 0.011, // subtle clockwise tilt on scroll
    zIndex: 22,
  },
  {
    id: "coffee",
    image: "/assets/monagrow-coffee-bag-cutout.png",
    alt: "Monagrow 2.5kg Specialty Estate Coffee Bag",
    commodityName: "Estate Coffee",
    className:
      "bottom-[-10%] sm:bottom-[-8%] lg:bottom-[-6%] left-[34%] sm:left-[38%] lg:left-[41%] w-[34vw] sm:w-[26vw] lg:w-[20vw] max-w-[320px] min-w-[190px]",
    animationName: "curveInCoffee",
    delay: 340,
    parallaxY: -0.36,
    parallaxX: -0.02,
    tiltRate: -0.012, // tilts counter-clockwise on scroll
    zIndex: 20,
  },
  {
    id: "sugar",
    image: "/assets/monagrow-sugar-bag-cutout.png",
    alt: "Monagrow 5kg Refined Cane Sugar Bag",
    commodityName: "Refined Cane Sugar",
    className:
      "bottom-[-16%] sm:bottom-[-14%] lg:bottom-[-12%] left-[6%] sm:left-[8%] lg:left-[10%] w-[36vw] sm:w-[28vw] lg:w-[21vw] max-w-[340px] min-w-[200px]",
    animationName: "curveInSugar",
    delay: 460,
    parallaxY: -0.42,
    parallaxX: -0.03,
    tiltRate: -0.018, // tilts counter-clockwise on scroll
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

    // Initial slight pause then trigger entrance
    const readyTimer = setTimeout(() => setIsReady(true), 120);
    const settledTimer = setTimeout(() => setIsSettled(true), 2100);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
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
      className="relative h-screen min-h-[760px] sm:min-h-[800px] lg:min-h-[860px] max-h-[1050px] overflow-hidden text-neutral-900 select-none"
      style={{
        background: "radial-gradient(ellipse at 45% 25%, #FFFFFF 0%, #FAF8F4 60%, #F3EDE7 100%)",
      }}
    >
      <style>{`
        @keyframes curveInRice {
          0% {
            opacity: 0;
            transform: translate3d(24vw, -95vh, 0) rotate(24deg) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: translate3d(-2vw, -20px, 0) rotate(-3deg) scale(1.02);
          }
          75% {
            transform: translate3d(1vw, -4px, 0) rotate(1.5deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes curveInCashews {
          0% {
            opacity: 0;
            transform: translate3d(26vw, -105vh, 0) rotate(20deg) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: translate3d(-2.5vw, -30px, 0) rotate(-3deg) scale(1.02);
          }
          75% {
            transform: translate3d(1vw, -5px, 0) rotate(1deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes curveInCoffee {
          0% {
            opacity: 0;
            transform: translate3d(12vw, -112vh, 0) rotate(18deg) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: translate3d(-3vw, -35px, 0) rotate(-4deg) scale(1.02);
          }
          75% {
            transform: translate3d(1vw, -6px, 0) rotate(1deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes curveInSugar {
          0% {
            opacity: 0;
            transform: translate3d(-24vw, -102vh, 0) rotate(-22deg) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: translate3d(3vw, -35px, 0) rotate(4deg) scale(1.02);
          }
          75% {
            transform: translate3d(-1vw, -6px, 0) rotate(-1.5deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }
      `}</style>

      {/* Copy & Branding */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-18 flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pointer-events-none">
        <div className="max-w-xl lg:max-w-2xl pointer-events-auto">
          {/* Outlined Arched Label: The Taste of Purity hugging the top-left shoulder of Monagrow */}
          <div
            className="relative -mb-3 sm:-mb-5 -ml-2 sm:-ml-4 overflow-visible select-none inline-block pointer-events-none"
            style={textReveal(0)}
          >
            <svg
              viewBox="0 0 360 95"
              className="w-64 sm:w-76 md:w-88 h-16 sm:h-20 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <path id="heroArcPath" d="M 12,85 Q 165,10 335,42" fill="transparent" />
              </defs>
              <text
                className="font-sans text-[21px] sm:text-[23px] md:text-[26px] font-black tracking-wide select-none"
                style={{
                  fill: "transparent",
                  stroke: "#800020",
                  strokeWidth: "1.6px",
                  paintOrder: "stroke fill",
                }}
              >
                <textPath href="#heroArcPath" startOffset="50%" textAnchor="middle">
                  The Taste of Purity
                </textPath>
              </text>
            </svg>
          </div>

          {/* Headline: Company name MONAGROW in Bebas Neue display */}
          <h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[108px] xl:text-[124px] uppercase mb-6 select-none text-[#800020]"
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
              <span>Request wholesale quote</span>
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
        const driftX = (drift * pack.parallaxX).toFixed(1);
        const driftY = (drift * pack.parallaxY).toFixed(1);
        const dynamicTilt = (drift * pack.tiltRate).toFixed(2);

        return (
          <div
            key={pack.id}
            className={`absolute aspect-3/4 pointer-events-auto ${pack.className}`}
            style={{
              zIndex: pack.zIndex,
              transform: `translate3d(${driftX}px, ${driftY}px, 0) rotate(${dynamicTilt}deg)`,
              transition: isSettled ? "transform 0.08s ease-out" : "none",
              willChange: "transform",
            }}
          >
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => onOpenQuoteModal(pack.commodityName)}
              title={`Request wholesale quote for ${pack.commodityName}`}
              style={{
                opacity: isReady ? 1 : 0,
                animation: isReady && !reduceMotion
                  ? `${pack.animationName} 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${pack.delay}ms forwards`
                  : undefined,
                transform: reduceMotion ? "rotate(0deg)" : undefined,
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
