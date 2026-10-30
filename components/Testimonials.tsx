"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { loadHeroMotion } from "./heroMotion";

interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  category: string;
  avatar: string;
  rating?: number;
}

// Verified customer reviews sourced from existing repository data
const REVIEWS: ReviewItem[] = [
  {
    id: "tariq",
    author: "Tariq Al-Mansoor",
    role: "Corporate Buyer",
    location: "Dubai, UAE",
    category: "Basmati Rice 8.9mm",
    quote:
      "“We have imported over twelve 40ft containers of Monagrow 8.9mm basmati. Grain elongation after cooking exceeds 2.2x every time, and we have had zero broken-grain complaints from our supermarket clients across Dubai and Abu Dhabi.”",
    avatar: "/assets/testimonial-tariq.jpg",
    rating: 5,
  },
  {
    id: "elena",
    author: "Elena Rostova",
    role: "Roastmaster",
    location: "Oslo, Norway",
    category: "Specialty Estate Coffee",
    quote:
      "“The washed Arabica arrived in hermetic GrainPro liners with cupping scores that matched the samples. Acidity was balanced, batch consistency was excellent, and delivery to Rotterdam was on schedule.”",
    avatar: "/assets/testimonial-elena.jpg",
    rating: 5,
  },
  {
    id: "rajesh",
    author: "Rajesh Shrestha",
    role: "Retail Director",
    location: "Kathmandu, Nepal",
    category: "Royal Cashews W240",
    quote:
      "“Monagrow's direct wholesale packaging lifted our dry fruit and sugar shelves. The 5kg basmati packs and W240 cashew pouches are top tier in quality, shelf appeal, and repeat purchases.”",
    avatar: "/assets/testimonial-rajesh.jpg",
    rating: 5,
  },
  {
    id: "jeanluc",
    author: "Jean-Luc Mercier",
    role: "Sourcing Lead",
    location: "Marseille, France",
    category: "Refined Sugar ICUMSA 45",
    quote:
      "“Their refined plantation white sugar meets European ICUMSA 45 purity without fail. Batch inspection certificates, bills of lading, and moisture-barrier liners make clearance at European ports effortless.”",
    avatar: "/assets/testimonial-jeanluc.jpg",
    rating: 5,
  },
  {
    id: "marcus",
    author: "Marcus Vance",
    role: "Commodity Broker",
    location: "London, UK",
    category: "Container Freight",
    quote:
      "“Direct mill contracts with Monagrow removed three layers of brokerage markup. Port inspection reports and FOB schedules arrive like clockwork, so we have scaled allocations across European hubs with confidence.”",
    avatar: "/assets/hero-trade-director.jpg",
    rating: 5,
  },
];

// Tripled list for infinite horizontal seamless wrap
const DISPLAY_REVIEWS: ReviewItem[] = [...REVIEWS, ...REVIEWS, ...REVIEWS];
const TOTAL_BASE = REVIEWS.length;

// Five stars in Vivid Maroon (#800020)
function FiveStarsMaroon() {
  return (
    <div
      className="flex items-center gap-1.5 text-[#800020] text-sm tracking-wider mb-4 select-none"
      aria-label="5 stars rating"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 drop-shadow-[0_1px_3px_rgba(128,0,32,0.25)]"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Parallel scroll delta offset (in px) applied to heading and center card
  const [parallelOffset, setParallelOffset] = useState(0);

  // Horizontal auto-scrolling carousel state
  // Start at index TOTAL_BASE (middle set) for seamless infinite wrapping
  const [currentIndex, setCurrentIndex] = useState(TOTAL_BASE);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Scroll dynamics: Keep Left & Right fixed (0px), while Center Card & Heading glide in parallel
  // Natural flow: No pinning, section scrolls continuously with page
  useEffect(() => {
    let cancelled = false;
    let cleanupMotion: (() => void) | undefined;

    const applyOffset = (offsetY: number) => {
      setParallelOffset(offsetY);
      if (headingRef.current) {
        headingRef.current.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      }
    };

    loadHeroMotion()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const media = gsap.matchMedia();
        media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          const container = containerRef.current!;
          const driver = { value: 0 };

          const tween = gsap.to(driver, {
            value: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3,
              invalidateOnRefresh: true,
              onUpdate: (self: { progress: number }) => {
                // Noticeable, responsive parallel glide as section scrolls with page flow
                const currentY = (0.5 - self.progress) * 130;
                applyOffset(currentY);
              },
            },
          });

          return () => {
            tween.kill();
            applyOffset(0);
          };
        });

        cleanupMotion = () => media.revert();
      })
      .catch(() => {
        const handleNativeScroll = () => {
          if (!containerRef.current || window.innerWidth < 768) {
            applyOffset(0);
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const winH = window.innerHeight;
          const totalDistance = rect.height + winH;
          if (totalDistance <= 0) return;

          const progress = Math.max(0, Math.min(1, (winH - rect.top) / totalDistance));
          const currentY = (0.5 - progress) * 130;
          applyOffset(currentY);
        };

        window.addEventListener("scroll", handleNativeScroll, { passive: true });
        handleNativeScroll();
        cleanupMotion = () => window.removeEventListener("scroll", handleNativeScroll);
      });

    return () => {
      cancelled = true;
      cleanupMotion?.();
    };
  }, []);

  // Horizontal auto-scroll interval (advances every 3.5s, pauses on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Handle seamless infinite loop reset
  const handleTransitionEnd = useCallback(() => {
    if (currentIndex >= TOTAL_BASE * 2) {
      // Reached near the end of duplicated array: silently reset back to middle set
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - TOTAL_BASE);
    } else if (currentIndex < TOTAL_BASE) {
      // Reached start: silently reset forward
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + TOTAL_BASE);
    }
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Screen size detection for responsive transform step: 1 (mobile < 640), 2 (tablet 640-1023), 3 (desktop >= 1024)
  const [cardsPerView, setCardsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe if deltaX is dominant and over threshold (35px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  // Dynamic CSS transform string based on active responsive breakpoint
  const getTransform = () => {
    if (cardsPerView === 1) {
      return `translate3d(calc(-${currentIndex} * (100% + 1.5rem)), 0, 0)`;
    }
    if (cardsPerView === 2) {
      return `translate3d(calc(-${currentIndex} * (50% + 0.75rem)), 0, 0)`;
    }
    return `translate3d(calc(-${currentIndex} * (100% / 3 + 0.5rem)), 0, 0)`;
  };

  // Center review index in original base array (0 to 4)
  const activeBaseIndex = cardsPerView === 1
    ? ((currentIndex % TOTAL_BASE) + TOTAL_BASE) % TOTAL_BASE
    : (((currentIndex + 1) % TOTAL_BASE) + TOTAL_BASE) % TOTAL_BASE;

  return (
    <section
      id="testimonials"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative text-neutral-900 overflow-hidden select-none py-12 sm:py-16 lg:py-20 border-b border-stone-200/80"
      aria-label="Verified Customer Testimonials"
    >
      {/* Background Image: Bowls of Rice, Sugar, Coffee Beans and Dry Fruits */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAF9F6]">
        <Image
          src="/assets/testimonials-commodities-bg.jpg"
          alt="Artisan ceramic bowls with basmati rice, white sugar, roasted coffee beans, and dry fruits"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center scale-100 opacity-60"
        />
        {/* Softening veil to gently fade background photographic contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/20 to-white/30"
        />
      </div>

      {/* Main Section Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center">
        
        {/* ========================================================
            TOP HEADER: Rating Display (4.8 + Reviews Text in Vivid Maroon)
            Moves parallel with the Center Card on vertical scroll!
            ======================================================== */}
        <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center justify-between">
          <div
            ref={headingRef}
            style={{
              transform: `translate3d(0, ${parallelOffset}px, 0)`,
              willChange: "transform",
            }}
            className="flex items-center gap-4 sm:gap-5"
          >
            {/* 4.8 Rating in Vivid Maroon (#800020) */}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #800020 0%, #a81c3e 50%, #800020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(128,0,32,0.18)] shrink-0"
            >
              4.8
            </span>

            {/* Text Description in Vivid Maroon (#800020) */}
            <p className="text-xs sm:text-sm text-[#800020] font-semibold leading-snug max-w-[220px] sm:max-w-[280px] drop-shadow-xs">
              average from 3,200 reviews of our containers, sacks and retail packs.
            </p>
          </div>

          {/* Navigation Controls: Stationary in header, visible & accessible on all screens */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              title="Previous reviews"
              aria-label="Previous reviews"
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[#800020] border border-stone-200 hover:border-[#800020] flex items-center justify-center text-sm font-bold text-[#800020] hover:text-white transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              title="Next reviews"
              aria-label="Next reviews"
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[#800020] border border-stone-200 hover:border-[#800020] flex items-center justify-center text-sm font-bold text-[#800020] hover:text-white transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              →
            </button>
          </div>
        </div>

        {/* ========================================================
            HORIZONTAL AUTO-SCROLLING RESPONSIVE CAROUSEL:
            - Seamless on mobile (1 card), tablet (2 cards), desktop (3 cards)
            - With generous vertical clearance (py-18 sm:py-20 -my-12 sm:-my-14)
            - Touch swipe support (left/right) for natural mobile interaction
            - Highlighted card moves subtly in parallel with vertical page scroll
            ======================================================== */}
        <div 
          className="relative w-full overflow-hidden py-18 sm:py-20 -my-12 sm:-my-14 px-1 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: getTransform(),
              transition: isTransitioning
                ? "transform 650ms cubic-bezier(0.2, 0.9, 0.3, 1)"
                : "none",
            }}
            className="flex items-start gap-6 will-change-transform"
          >
            {DISPLAY_REVIEWS.map((review, idx) => {
              // Highlighted card: on mobile it is current card (idx === currentIndex), on tablet/desktop it is the center card (idx === currentIndex + 1)
              const isHighlighted = cardsPerView === 1 
                ? idx === currentIndex 
                : idx === currentIndex + 1;
              const cardYOffset = isHighlighted 
                ? (cardsPerView === 1 ? parallelOffset * 0.35 : parallelOffset) 
                : 0;

              return (
                <div
                  key={`${review.id}-${idx}`}
                  style={{
                    transform: `translate3d(0, ${cardYOffset}px, 0)`,
                    willChange: "transform",
                  }}
                  className={`w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] shrink-0 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[250px] sm:min-h-[270px] lg:min-h-[290px] backdrop-blur-xl transition-colors duration-300 relative group ${
                    isHighlighted
                      ? "bg-white/95 border border-stone-200/90 shadow-[0_16px_40px_rgba(128,0,32,0.12)] hover:shadow-[0_24px_50px_rgba(128,0,32,0.18)] hover:border-[#800020]/60"
                      : "bg-white/90 border border-stone-200/80 shadow-[0_10px_28px_rgba(28,25,23,0.06)] hover:shadow-[0_18px_40px_rgba(128,0,32,0.12)] hover:border-[#800020]/40"
                  }`}
                >
                  {/* Subtle top vivid maroon accent highlight for center card */}
                  {isHighlighted && (
                    <div className="absolute -top-px left-8 right-8 h-0.5 bg-linear-to-r from-transparent via-[#800020]/60 to-transparent pointer-events-none" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <FiveStarsMaroon />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#800020]/8 px-2.5 py-1 rounded-full border border-[#800020]/15">
                        {review.category}
                      </span>
                    </div>

                    <p className="font-sans text-sm sm:text-base lg:text-[16px] text-neutral-800 font-normal leading-[1.5] tracking-tight">
                      {review.quote}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center gap-3">
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-2xs">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        fill
                        className="object-cover object-top"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-[15px] font-bold text-neutral-900 truncate tracking-tight">
                        {review.author}
                      </p>
                      <p className="text-xs text-stone-500 truncate">
                        {review.role} · {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            BOTTOM PAGINATION DOTS:
            Indicators for the 5 real customer reviews
            ======================================================== */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(cardsPerView === 1 ? TOTAL_BASE + dotIdx : TOTAL_BASE + dotIdx - 1);
              }}
              title={`Jump to review ${dotIdx + 1}`}
              aria-label={`Jump to review ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeBaseIndex === dotIdx
                  ? "w-6 bg-[#800020]"
                  : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
