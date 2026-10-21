"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onOpenVideoModal?: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

interface ChapterInfo {
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  quoteName: string;
  frameStart: number;
  frameEnd: number;
  glowColor: string;
}

const TOTAL_FRAMES = 240;

const CHAPTERS: ChapterInfo[] = [
  {
    id: "sugar",
    number: "01",
    label: "Refined Sugar",
    title: "ICUMSA 45 CANE SUGAR",
    accent: "#10b981", // Emerald
    tagline: "Direct Mill Origin • 100% Pure Sparkling Crystals",
    description: "Export-grade ultra-pure white refined cane sugar with superior solubility and consistent granulation for global confectionery and beverage industries.",
    specs: [
      { label: "Polarisation", value: "99.80% Min" },
      { label: "Moisture", value: "0.04% Max" },
      { label: "Solubility", value: "100% Free Flowing" },
      { label: "Packaging", value: "25kg / 50kg PP Bags" },
    ],
    quoteName: "Monagrow Pure Refined Cane Sugar",
    frameStart: 1,
    frameEnd: 58,
    glowColor: "rgba(16, 185, 129, 0.16)",
  },
  {
    id: "rice",
    number: "02",
    label: "Basmati Rice",
    title: "1121 EXTRA LONG GRAIN",
    accent: "#38bdf8", // Sky Blue
    tagline: "Himalayan Glacier Fed • Aged 24 Months",
    description: "Queen of aromatic grains. Sourced from the fertile Himalayan river basins, naturally matured to achieve an extraordinary 2.5x cooked elongation ratio.",
    specs: [
      { label: "Raw Grain Length", value: "8.4mm - 8.9mm" },
      { label: "Elongation Ratio", value: "2.5x Cooked" },
      { label: "Aging", value: "24 Months Matured" },
      { label: "Purity", value: "95% Sortex Cleaned" },
    ],
    quoteName: "Monagrow 1121 Extra Long Basmati Rice",
    frameStart: 59,
    frameEnd: 118,
    glowColor: "rgba(56, 189, 248, 0.16)",
  },
  {
    id: "coffee",
    number: "03",
    label: "Estate Coffee",
    title: "SPECIALTY DARK ARABICA",
    accent: "#f59e0b", // Amber/Gold
    tagline: "High-Altitude Estate • Master Drum Roasted",
    description: "Hand-picked high-elevation Arabica beans from shade-grown estates. Slow drum roasted to unlock deep notes of dark cocoa, roasted hazelnuts, and caramel.",
    specs: [
      { label: "Elevation", value: "1,400m+ Shade Grown" },
      { label: "Roast Profile", value: "Master Dark Drum Roast" },
      { label: "Cup Score", value: "SCAA 85+ Specialty" },
      { label: "Format", value: "Whole Bean & Custom Grind" },
    ],
    quoteName: "Monagrow Specialty Dark Arabica Coffee",
    frameStart: 119,
    frameEnd: 180,
    glowColor: "rgba(245, 158, 11, 0.16)",
  },
  {
    id: "cashews",
    number: "04",
    label: "Royal Cashews",
    title: "JUMBO W240 CASHEWS",
    accent: "#c084fc", // Purple/Violet
    tagline: "Hand-Selected King Size • Rich Buttery Crunch",
    description: "Premium whole white cashew kernels harvested at peak maturity. Nitrogen-flushed to lock in natural sweetness, crunch, and essential plant nutrients.",
    specs: [
      { label: "Grade", value: "W240 King Size" },
      { label: "Kernel Count", value: "220-240 / lb" },
      { label: "Preservation", value: "Vacuum Nitrogen Flushed" },
      { label: "Quality", value: "100% Whole Kernels" },
    ],
    quoteName: "Monagrow Royal Whole Cashews & Dry Fruits",
    frameStart: 181,
    frameEnd: 214,
    glowColor: "rgba(192, 132, 252, 0.16)",
  },
  {
    id: "suite",
    number: "05",
    label: "Global Suite",
    title: "DIRECT ORIGIN AGRI SUPPLY",
    accent: "#f43f5e", // Crimson / Maroon brand
    tagline: "The Complete Commodity Suite • Worldwide Freight",
    description: "Monagrow connects certified farm gates directly with global trade destinations. Full-container loads, certified quality, and multi-port ocean shipping.",
    specs: [
      { label: "Port Reach", value: "45+ Global Terminals" },
      { label: "Inspection", value: "SGS / Intertek Certified" },
      { label: "Contracts", value: "FOB / CIF / CFR Terms" },
      { label: "Fulfillment", value: "Multi-Commodity FCLs" },
    ],
    quoteName: "All Wholesale Commodities",
    frameStart: 215,
    frameEnd: 240,
    glowColor: "rgba(128, 0, 32, 0.28)",
  },
];

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded images cache (index 0 corresponds to frame 1)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Active chapter state
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Current smooth frame tracking for physics lerp
  const currentLerpFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const lastDrawnFrameRef = useRef(-1);

  // Helper to format frame path: frame_0001.webp -> frame_0240.webp
  const getFramePath = (frameIndex: number) => {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameIndex));
    const pad = String(clamped).padStart(4, "0");
    return `/frames-webp/frame_${pad}.webp`;
  };

  // 1. Intelligent progressive preloading
  useEffect(() => {
    let isMounted = true;

    // Priority 1: Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      drawFrame(1);
    };

    // Priority 2: Load keyframe milestones for smooth scrubbing
    const milestoneIndices: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 10) {
      if (i !== 1) milestoneIndices.push(i);
    }
    if (!milestoneIndices.includes(240)) milestoneIndices.push(240);

    const remainingIndices: number[] = [];
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (!milestoneIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    const loadSingle = (frameNum: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!isMounted) return resolve();
        if (imagesRef.current[frameNum - 1]) return resolve();

        const img = new Image();
        img.src = getFramePath(frameNum);
        img.onload = () => {
          if (!isMounted) return resolve();
          imagesRef.current[frameNum - 1] = img;
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    const loadBatch = async (list: number[], batchSize = 6) => {
      for (let i = 0; i < list.length; i += batchSize) {
        if (!isMounted) break;
        const slice = list.slice(i, i + batchSize);
        await Promise.all(slice.map(loadSingle));
      }
    };

    const runPreload = async () => {
      await loadBatch(milestoneIndices, 5);
      if (isMounted) {
        await loadBatch(remainingIndices, 6);
      }
    };

    runPreload();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-performance Canvas Renderer
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNumber)));

    // Look for exact image or closest available loaded image
    let img = imagesRef.current[clamped - 1];
    if (!img) {
      for (let offset = 1; offset < 40; offset++) {
        if (clamped - offset >= 1 && imagesRef.current[clamped - offset - 1]) {
          img = imagesRef.current[clamped - offset - 1];
          break;
        }
        if (clamped + offset <= TOTAL_FRAMES && imagesRef.current[clamped + offset - 1]) {
          img = imagesRef.current[clamped + offset - 1];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 16:9 Aspect Ratio calculation
    const imgAspect = 1280 / 720;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = clamped;
  }, []);

  // 3. Canvas resize handler with Device Pixel Ratio (HiDPI / Retina)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const newWidth = Math.floor(rect.width * dpr);
      const newHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        drawFrame(currentLerpFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // 4. Continuous physics animation loop for silky 60/120fps lerp
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const diff = targetFrameRef.current - currentLerpFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentLerpFrameRef.current += diff * 0.16;
        const frameToDraw = Math.round(currentLerpFrameRef.current);
        if (frameToDraw !== lastDrawnFrameRef.current) {
          drawFrame(frameToDraw);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // 5. Scroll listener to drive the parallax scrubbing
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

      // Target frame calculation: 1 to 240
      const newTarget = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = newTarget;

      // Determine active chapter
      const currentFrame = Math.round(newTarget);
      let foundIndex = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        if (currentFrame >= CHAPTERS[i].frameStart && currentFrame <= CHAPTERS[i].frameEnd) {
          foundIndex = i;
          break;
        }
      }
      setActiveChapterIndex(foundIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white select-none min-h-[360vh] sm:min-h-[400vh] lg:min-h-[440vh]"
    >
      {/* 
        STICKY FULLSCREEN VIEWPORT STAGE:
        Stays locked in place while the user scrolls through the 240 frames
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#000000] z-20">
        
        {/* Dynamic ambient color spotlight matching the active commodity */}
        <div 
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeChapter.glowColor} 0%, rgba(0,0,0,0.92) 65%, #000000 100%)`,
          }}
        />

        {/* Subtle grid pattern for luxury tech depth */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ========================================================
            CANVAS 3D PARALLAX FRAME RENDERER
            Renders the 240 webp frames with smooth hardware acceleration
            ======================================================== */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            style={{
              filter: "contrast(1.03) brightness(1.02)",
            }}
          />
        </div>

        {/* ========================================================
            CENTER CONTENT: BRAND HEADLINE, DESCRIPTION & CTA (IMAGE 2)
            Fixed in place over the 3D parallax frame canvas
            ======================================================== */}
        <div className="relative z-30 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-18 pointer-events-none flex items-center justify-start">
          
          {/* LEFT COLUMN: Arched Badge, Giant Headline, Description, Pill CTA */}
          <div 
            className="w-full max-w-xl text-left pointer-events-auto"
          >
            {/* 1. Arched Badge above main headline */}
            <div className="relative -mb-2 sm:-mb-3 -ml-1 sm:-ml-2 overflow-visible">
              <svg
                viewBox="0 0 300 85"
                className="w-36 sm:w-44 md:w-52 h-10 sm:h-14 overflow-visible"
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
                  className="font-navbar-brand text-[18px] sm:text-[22px] md:text-[25px] tracking-[0.16em] font-bold uppercase select-none"
                  style={{
                    fill: "#800020",
                    stroke: "#800020",
                    strokeWidth: "0.2px",
                    paintOrder: "stroke fill",
                  }}
                >
                  <textPath href="#heroArcPath" startOffset="50%" textAnchor="middle">
                    Direct Origin
                  </textPath>
                </text>
              </svg>
            </div>

            {/* 2. Headline: AGRI COMMODITIES (Decreased font size for elegant balance) */}
            <h1 className="font-navbar-brand text-4xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px] font-bold leading-[0.88] tracking-tight uppercase mb-5 select-none text-[#800020] drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              <span className="block">AGRI</span>
              <span className="block mt-1">COMMODITIES</span>
            </h1>

            {/* 3. Description: Shortened to "The Taste of Purity" + 1 concise line */}
            <p className="max-w-md mb-7 drop-shadow-sm leading-snug">
              <span className="block text-white font-semibold text-base sm:text-lg md:text-xl tracking-wide">
                The Taste of Purity.
              </span>
              <span className="block text-stone-300 text-xs sm:text-sm md:text-base font-normal mt-1 leading-relaxed">
                Direct-origin bulk commodities sourced for global markets.
              </span>
            </p>

            {/* 4. Action Button with offset shadow */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onOpenQuoteModal("All Wholesale Commodities")}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border-2 border-[#800020] shadow-[5px_7px_0px_#1c1917] hover:shadow-[2px_3px_0px_#1c1917] hover:translate-x-[3px] hover:translate-y-[4px] active:shadow-none active:translate-x-[5px] active:translate-y-[7px] transition-all cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>REQUEST WHOLESALE QUOTE</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
