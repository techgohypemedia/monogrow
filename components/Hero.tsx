"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onOpenVideoModal?: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    // 1. Smoothly trigger the GPU slide-out transition once after page mount
    const timer = setTimeout(() => {
      setIsSpread(true);
    }, 180);

    const completeTimer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 1450);

    // 2. Ultra-smooth 60fps/120fps scroll tracking
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll drift calculations:
  // As user scrolls down, products subtly glide upwards and towards the right along the half circle
  const scrollOffset = isIntroComplete ? Math.min(scrollY, 700) : 0;
  const driftX = scrollOffset * 0.22; // moves rightwards
  const driftY = -(scrollOffset * 0.18); // moves upwards
  const driftTilt = scrollOffset * 0.025; // curves along the right half circle

  // GPU Hardware-accelerated transforms (translate3d):
  // Initial 3D stack is positioned on the middle product, then smoothly unfolds once on visit
  const riceTransform = !isSpread
    ? "translate3d(-10vw, 40vh, 0) rotate(3deg) scale(0.96)"
    : `translate3d(${driftX * 0.85}px, ${driftY * 0.85}px, 0) rotate(${14 + driftTilt}deg) scale(1)`;

  const middleTransform = !isSpread
    ? "translate3d(0, 0, 0) rotate(-6deg) scale(0.98)"
    : `translate3d(${driftX * 1.0}px, ${driftY * 1.0}px, 0) rotate(${-6 + driftTilt}deg) scale(1)`;

  const sugarTransform = !isSpread
    ? "translate3d(46vw, -27vh, 0) rotate(-14deg) scale(0.94)"
    : `translate3d(${driftX * 1.15}px, ${driftY * 1.15}px, 0) rotate(${-12 + driftTilt}deg) scale(1)`;

  // High-performance transition curve:
  const transitionStyle = !isIntroComplete
    ? "transform 1.25s cubic-bezier(0.2, 0.95, 0.3, 1)"
    : "transform 0.08s ease-out";

  return (
    <section
      id="home"
      className="relative min-h-[105vh] lg:min-h-[120vh] bg-white flex flex-col justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-36 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-18 relative z-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          
          {/* LEFT COLUMN: Arched Badge, Giant Headline, Description, Pill CTA, then Product 3 placed cleanly BELOW */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20 pt-4 lg:pt-0">
            
            {/* 1. Arched Badge above the main headline (matching "Alcohol Infused" arc from screenshot) */}
            <div className="relative -mb-3 sm:-mb-5 -ml-2 sm:-ml-4 overflow-visible">
              <svg
                viewBox="0 0 300 85"
                className="w-56 sm:w-64 md:w-72 h-16 sm:h-20 overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="heroArcPath"
                    d="M 20,78 Q 150,12 280,78"
                    fill="transparent"
                  />
                </defs>
                <text
                  className="font-navbar-brand text-[26px] sm:text-[30px] md:text-[34px] tracking-[0.16em] font-black uppercase select-none"
                  style={{
                    fill: "#800020",
                    stroke: "#800020",
                    strokeWidth: "0.5px",
                    paintOrder: "stroke fill",
                  }}
                >
                  <textPath href="#heroArcPath" startOffset="50%" textAnchor="middle">
                    Direct Origin
                  </textPath>
                </text>
              </svg>
            </div>

            {/* 2. Giant Headline (Matching "FRUIT JAM" layout & condensed typography from screenshot) */}
            <h1 className="font-navbar-brand text-6xl sm:text-7xl md:text-8xl lg:text-[108px] xl:text-[128px] font-black leading-[0.84] tracking-tight uppercase mb-7 select-none text-[#800020]">
              <span className="block">AGRI</span>
              <span className="block mt-1">COMMODITIES</span>
            </h1>

            {/* 3. Subtitle / Value Proposition from website */}
            <p className="text-stone-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-9">
              An amazing, all-natural bulk commodity supply of premium Basmati Rice, Refined Cane Sugar, and Specialty Estate Coffee for global markets.
            </p>

            {/* 4. Action Button (Pill button with offset shadow matching reference screenshot, zero green) */}
            <div className="flex items-center mb-16 sm:mb-20 lg:mb-24">
              <button
                type="button"
                onClick={() => onOpenQuoteModal("All Wholesale Commodities")}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border-2 border-[#800020] shadow-[5px_7px_0px_#1c1917] hover:shadow-[2px_3px_0px_#1c1917] hover:translate-x-[3px] hover:translate-y-[4px] active:shadow-none active:translate-x-[5px] active:translate-y-[7px] transition-all cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>REQUEST WHOLESALE QUOTE</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* 
              PRODUCT 3: Monagrow 5kg Refined Sugar Bag (Green Bag)
              Starts stacked in 3D on the middle product, then smoothly slides down-left below the text!
            */}
            <div 
              className="relative ml-10 sm:ml-20 lg:ml-36 pointer-events-auto transform-gpu"
              style={{
                zIndex: !isSpread ? 10 : 25,
                transform: sugarTransform,
                transition: transitionStyle,
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="relative w-44 sm:w-52 md:w-60 lg:w-72 xl:w-80 aspect-[3/4] group">
                <Image
                  src="/assets/monagrow-sugar-bag-cutout.png"
                  alt="Monagrow 5kg Refined Cane Sugar Bag"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 208px, 320px"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN SPACER FOR DESKTOP (Allows the two right products to have ample breathing room) */}
          <div className="hidden lg:block w-1/2 h-full pointer-events-none" />

        </div>
      </div>

      {/* 
        RIGHT SIDE PRODUCTS:
        - Product 1 (Basmati Rice): Slides from 3D stack up-right to Top-Right
        - Product 2 (Middle Product): Base of the 3D stack, anchors Center-Right
      */}

      {/* PRODUCT 1: Monagrow 5kg Basmati Rice Bag (Top-Right) */}
      <div 
        className="absolute top-[5%] sm:top-[6%] lg:top-[7%] right-[4%] sm:right-[7%] lg:right-[9%] pointer-events-auto select-none transform-gpu"
        style={{
          zIndex: !isSpread ? 30 : 20,
          transform: riceTransform,
          transition: transitionStyle,
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="relative w-40 sm:w-48 md:w-56 lg:w-68 xl:w-72 aspect-[3/4] group">
          <Image
            src="/assets/monagrow-rice-bag-cutout.png"
            alt="Monagrow 5kg Basmati Rice Bag"
            fill
            priority
            className="object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 192px, 288px"
          />
        </div>
      </div>

      {/* PRODUCT 2: Middle Product / Specialty Coffee Bag (Center-Right Anchor of the 3D Stack) */}
      <div 
        className="absolute top-[44%] sm:top-[46%] lg:top-[48%] right-[6%] sm:right-[12%] lg:right-[19%] pointer-events-auto select-none transform-gpu"
        style={{
          zIndex: !isSpread ? 20 : 15,
          transform: middleTransform,
          transition: transitionStyle,
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="relative w-40 sm:w-48 md:w-56 lg:w-68 xl:w-72 aspect-[3/4] group">
          <Image
            src="/assets/monagrow-coffee-bag-cutout.png"
            alt="Monagrow 2.5kg Specialty Estate Coffee Bag"
            fill
            priority
            className="object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 192px, 288px"
          />
        </div>
      </div>

    </section>
  );
}
