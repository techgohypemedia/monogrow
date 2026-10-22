"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to 2nd card (matching reference screenshot)
  const [isPaused, setIsPaused] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const reviews = [
    {
      id: "rev-1",
      name: "Tariq Al-Mansoor",
      badge: "Verified Patron",
      reviewsCount: "14 Orders • Corporate Buyer",
      location: "Dubai, UAE 🇦🇪",
      category: "BASMATI EXPORT",
      commodity: "8.9mm Extra Long Grain Rice",
      shortText: "We have imported over twelve 40ft containers of Monagrow 8.9mm Extra Long Grain Basmati. Grain elongation after cooking exceeds 2.2x consistently. Zero broken grain complaints from our supermarket clients.",
      fullText: "We have imported over twelve 40ft containers of Monagrow 8.9mm Extra Long Grain Basmati. Grain elongation after cooking exceeds 2.2x consistently. Zero broken grain complaints from our supermarket clients across Dubai and Abu Dhabi. Packaging integrity and shipping documentation are always top tier.",
      avatar: "/assets/testimonial-tariq.jpg",
      rating: 5,
    },
    {
      id: "rev-2",
      name: "Elena Rostova",
      badge: "Verified Patron",
      reviewsCount: "8 Orders • Roastmaster",
      location: "Oslo, Norway 🇳🇴",
      category: "SPECIALTY COFFEE",
      commodity: "Highland Arabica Roastery Lot",
      shortText: "Monagrow's washed Arabica and dark roast beans arrived with hermetic GrainPro protection. Cupping scores were authentic, acidity perfectly balanced, and delivery to Rotterdam port was on schedule.",
      fullText: "Monagrow's washed Arabica and dark roast beans arrived with hermetic GrainPro protection. Cupping scores were authentic, acidity perfectly balanced, and delivery to Rotterdam port was on schedule. Their roastmaster batch consistency and single-origin terroir are exceptional.",
      avatar: "/assets/testimonial-elena.jpg",
      rating: 5,
    },
    {
      id: "rev-3",
      name: "Rajesh Shrestha",
      badge: "Verified Patron",
      reviewsCount: "32 Orders • Retail Director",
      location: "Kathmandu, NP 🇳🇵",
      category: "SUPERMARKET RETAIL",
      commodity: "Royal Cashews & Gourmet Dryfruits",
      shortText: "As a regional distributor, having Monagrow's direct wholesale packaging has elevated our dry fruits and sugar retail shelves. The 5kg Basmati packs are top tier in quality and shelf appeal.",
      fullText: "As a regional distributor, having Monagrow's direct wholesale packaging has elevated our dry fruits and sugar retail shelves. The 5kg Basmati packs and jumbo W240 cashew pouches are top tier in quality, shelf appeal, and customer retention.",
      avatar: "/assets/testimonial-rajesh.jpg",
      rating: 5,
    },
    {
      id: "rev-4",
      name: "Jean-Luc Mercier",
      badge: "Verified Patron",
      reviewsCount: "19 Orders • Sourcing Lead",
      location: "Marseille, France 🇫🇷",
      category: "ICUMSA 45 SUGAR",
      commodity: "Refined White Cane Sugar",
      shortText: "Monagrow's refined sulfur-free plantation white sugar meets European ICUMSA 45 purity standards without fail. Their batch inspection certificates, maritime bill of ladings, and liners are always impeccable.",
      fullText: "Monagrow's refined sulfur-free plantation white sugar meets European ICUMSA 45 purity standards without fail. Their batch inspection certificates, maritime bill of ladings, and moisture barrier liners make import clearance at European ports effortless.",
      avatar: "/assets/testimonial-jeanluc.jpg",
      rating: 5,
    },
    {
      id: "rev-5",
      name: "Marcus Vance",
      badge: "Verified Patron",
      reviewsCount: "22 Orders • Commodity Broker",
      location: "London, UK 🇬🇧",
      category: "CONTAINER CARGO",
      commodity: "Bulk Maritime Agro Cargo",
      shortText: "Direct mill contracts with Monagrow eliminated three layers of middleman brokerage markups. Their port inspection reports and FOB schedules are delivered like clockwork. Truly premier consistency.",
      fullText: "Direct mill contracts with Monagrow eliminated three layers of middleman brokerage markups. Their port inspection reports and FOB schedules are delivered like clockwork. We have scaled container allocations across multiple European hubs with complete confidence.",
      avatar: "/assets/hero-trade-director.jpg",
      rating: 5,
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 sm:py-24 bg-[#FAF7F2] relative border-b border-stone-200/70 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fae8eb] text-[#800020] text-xs font-bold uppercase tracking-wider mb-3.5 border border-[#f3c4ce]">
          <span>TESTIMONIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439] leading-tight">
          Trusted Across 18+ International Markets
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          From premier supermarket chains in the Gulf to European coffee houses, hear why wholesale procurement managers rely on Monagrow.
        </p>
      </div>

      {/* Multi-Card Track Container (Responsive card width & center alignment) */}
      <div 
        className="w-full relative overflow-hidden py-4 [--card-width:86vw] sm:[--card-width:440px] md:[--card-width:480px] lg:[--card-width:520px] [--card-gap:16px] sm:[--card-gap:20px] lg:[--card-gap:24px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex items-stretch transition-transform duration-550 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
          style={{
            transform: `translateX(calc(50% - (var(--card-width) / 2) - (${currentIndex} * (var(--card-width) + var(--card-gap)))))`,
            gap: "var(--card-gap)",
          }}
        >
          {reviews.map((rev, idx) => {
            const isCenter = idx === currentIndex;
            const isExpanded = expandedId === rev.id;

            return (
              <div
                key={rev.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-[var(--card-width)] shrink-0 bg-white rounded-[24px] p-6 sm:p-7 sm:px-8 border transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                  isCenter
                    ? "shadow-[0_16px_40px_rgba(0,0,0,0.06)] border-stone-200/90 scale-100 opacity-100"
                    : "shadow-2xs border-stone-150 scale-[0.97] opacity-80 hover:opacity-95"
                }`}
              >
                <div>
                  {/* Top Row: 5 Stars + Mint Circular Quote Badge */}
                  <div className="flex items-center justify-between mb-4">
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                    </div>

                    {/* Mint Quote Icon Badge (Matching Reference Screenshot) */}
                    <div className="w-8.5 h-8.5 rounded-full bg-[#EAF7EE] text-[#059669] flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  {/* Customer Written Quote in Serif Italic */}
                  <blockquote className="text-stone-800 text-sm sm:text-[15px] font-serif italic leading-relaxed mb-3">
                    &ldquo;{isExpanded ? rev.fullText : rev.shortText}&rdquo;
                  </blockquote>

                  {/* Read More Link (Matching Reference Screenshot) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(isExpanded ? null : rev.id);
                    }}
                    className="text-xs font-bold text-[#059669] hover:text-[#047857] underline decoration-[#059669]/60 underline-offset-2 transition-colors cursor-pointer"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                </div>

                {/* Bottom Separator & Author Information */}
                <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between gap-3">
                  {/* Left: Avatar + Author Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-stone-200/80 shadow-xs">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-serif font-bold text-sm sm:text-[15px] text-[#0e2439] truncate">
                          {rev.name}
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EAF7EE] text-[#059669] text-[9.5px] font-bold border border-[#D1F2D9] shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                        {rev.reviewsCount} &bull; {rev.location}
                      </p>
                    </div>
                  </div>

                  {/* Right: Commodity Category & Title (Matching Reference Screenshot) */}
                  <div className="text-right shrink-0 max-w-[130px] sm:max-w-[160px]">
                    <span className="text-[9px] sm:text-[9.5px] font-bold tracking-wider text-stone-400 uppercase block truncate">
                      {rev.category}
                    </span>
                    <span className="text-xs sm:text-[12.5px] font-bold text-[#059669] block truncate hover:text-[#047857]">
                      {rev.commodity}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls Below the Carousel (Matching Reference Screenshot) */}
      <div className="mt-7 sm:mt-9 flex items-center justify-center gap-4">
        {/* Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200/90 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
          aria-label="Previous testimonial"
          title="Previous Testimonial"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Indicator Dots with Expanded Pill for Active */}
        <div className="flex items-center gap-1.5">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-6 h-1.5 rounded-full bg-[#0e2439]"
                  : "w-1.5 h-1.5 rounded-full bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200/90 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
          aria-label="Next testimonial"
          title="Next Testimonial"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

    </section>
  );
}



