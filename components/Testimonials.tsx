"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: "rev-1",
      name: "Tariq Al-Mansoor",
      role: "Procurement Director",
      company: "Gulf Food Logistics (Dubai, UAE)",
      text: "We have imported over twelve 40ft containers of Monagrow 8.9mm Extra Long Grain Basmati. Grain elongation after cooking exceeds 2.2x consistently. Zero broken grain complaints from our supermarket clients.",
      commodity: "Monagrow Extra Long Basmati Rice",
      commodityTag: "12 x 40ft Containers Dispatched",
      productImage: "/assets/basmati-rice-grains.jpg",
      buyerImage: "/assets/hero-farmer-crisp.jpg",
      rating: 5,
    },
    {
      id: "rev-2",
      name: "Elena Rostova",
      role: "Head of Roasting & Sourcing",
      company: "Nordic Coffee Collective (Oslo)",
      text: "Monagrow's washed Arabica and dark roast beans arrived with hermetic GrainPro protection. Cupping scores were authentic, acidity perfectly balanced, and delivery to Rotterdam port was on schedule.",
      commodity: "Specialty Arabica Coffee Beans",
      commodityTag: "Rotterdam Sea Freight Delivery",
      productImage: "/assets/coffee-showcase.jpg",
      buyerImage: "/assets/hero-farmer-test.jpg",
      rating: 5,
    },
    {
      id: "rev-3",
      name: "Rajesh Shrestha",
      role: "Managing Director",
      company: "Himalayan Retail Marts (Kathmandu)",
      text: "As a local distributor, having Monagrow's direct wholesale packaging has elevated our dry fruits and sugar retail shelves. The 5kg Basmati packs are top tier in quality and shelf appeal.",
      commodity: "Royal Whole Cashews & Gourmet Dryfruits",
      commodityTag: "Wholesale Supermarket Distribution",
      productImage: "/assets/cashew-kernels.jpg",
      buyerImage: "/assets/hero-farmer.jpg",
      rating: 5,
    },
  ];

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#fcfcf9] relative border-b border-stone-200/80">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Statement, Customer Quote & Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5ec] text-[#57a42f] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c3e6cd] w-fit">
              <span>Testimonial</span>
            </div>

            {/* Main Headline on the Left Side */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439] leading-tight">
              Trusted Across 18+ International Markets
            </h2>

            {/* Website Statement Below Headline */}
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
              From premier supermarket chains in the Gulf to European coffee houses, hear why wholesale procurement managers rely on Monagrow.
            </p>

            {/* Active Customer Review Quote */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              {/* Star Rating */}
              <div className="flex gap-1 text-[#fbbf24] mb-4">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#fbbf24]" />
                ))}
              </div>

              {/* Customer Written Text */}
              <blockquote className="text-base sm:text-lg lg:text-xl text-stone-800 font-medium leading-relaxed font-serif italic mb-6">
                &ldquo;{activeReview.text}&rdquo;
              </blockquote>

              {/* Customer Name, Role & Company (matching Sarah W | Top customer style) */}
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-bold text-[#0e2439] text-base sm:text-lg">
                  {activeReview.name}
                </span>
                <span className="text-stone-300 font-medium">|</span>
                <span className="text-xs sm:text-sm font-semibold text-[#57a42f]">
                  {activeReview.role}, {activeReview.company}
                </span>
              </div>

              {/* What they bought from us */}
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e8f5ec] text-[#57a42f] border border-[#c3e6cd]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#57a42f]" />
                  <span>Verified Purchase: {activeReview.commodity} ({activeReview.commodityTag})</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Photo Block from Screenshot */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-t-[32px] sm:rounded-t-[40px] rounded-br-[32px] sm:rounded-br-[40px] rounded-bl-none overflow-hidden bg-stone-100 shadow-xl">
              {/* Main Commodity Photograph corresponding to what they bought */}
              <Image
                key={activeReview.id}
                src={activeReview.productImage}
                alt={activeReview.commodity}
                fill
                className="object-cover transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Top-Right Commodity Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#57a42f] shadow-sm border border-stone-200/60">
                  {activeReview.commodity}
                </span>
              </div>

              {/* Bottom-Left S-Curve Flowing Notch Dock (Pixel-identical to Reference Image 2) */}
              <div className="absolute bottom-0 left-0 w-[76px] h-[132px] z-10 pointer-events-none">
                <svg viewBox="0 0 76 132" className="w-full h-full fill-[#fcfcf9]">
                  <path d="
                    M 0 0
                    C 0 10, 11 20, 25 20
                    C 38 20, 54 32, 54 44
                    L 54 106
                    C 54 120, 62 132, 76 132
                    L 0 132
                    Z
                  " />
                </svg>
              </div>

              {/* Navigation Controls Dock Nestled Perfectly in the S-Curve Contour */}
              <div className="absolute bottom-0 left-0 w-[54px] h-[132px] z-20 flex flex-col items-center justify-start pt-7 pb-2">
                {/* Next Button (Black Circle, 38px) */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-[38px] h-[38px] rounded-full bg-[#111827] hover:bg-[#57a42f] text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group/next cursor-pointer shrink-0"
                  aria-label="Next review"
                  title="Next Review"
                >
                  <ArrowRight className="w-4 h-4 text-white stroke-[2] transition-transform duration-200 group-hover/next:translate-x-0.5" />
                </button>

                {/* Prev Button (White/Light Circle, 30px) */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="mt-2 w-[30px] h-[30px] rounded-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/90 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group/prev cursor-pointer shrink-0"
                  aria-label="Previous review"
                  title="Previous Review"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-600 stroke-[1.8] transition-transform duration-200 group-hover/prev:-translate-x-0.5" />
                </button>

                {/* Counter (1/3 with slate total matching Image 2) */}
                <div className="mt-2 text-[11px] font-bold font-mono tracking-tight leading-none select-none">
                  <span className="text-[#0e2439]">{currentIndex + 1}</span>
                  <span className="text-[#94a3b8] font-medium">/{reviews.length}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


