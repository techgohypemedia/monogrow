"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function MarketIntelligence() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section id="market-intelligence" className="py-20 lg:py-28 bg-[#edf5ee] relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Eyebrow + Massive Headline */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Category Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#57a42f]/10 text-[#57a42f] text-xs font-bold uppercase tracking-wider mb-5 w-fit">
              <span>Market Intelligence &amp; Crop Reports</span>
            </div>

            {/* Giant Bold Headline (Matching Screenshot Typography) */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight text-[#0a2907] leading-[1.08] max-w-md">
              Get Weekly Wholesale Spot Rates &amp; Harvest Updates
            </h2>
          </div>

          {/* Middle Column: Two Stacked Rounded Image Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 justify-center max-w-sm sm:max-w-md mx-auto lg:mx-0 w-full">
            {/* Top Image: Premium Wholesale Dry Fruits */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-sm bg-white">
              <Image
                src="/assets/dryfruits-showcase.jpg"
                alt="Monagrow wholesale premium dry fruits and nuts"
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>

            {/* Bottom Image: Extra Long Grain Basmati Rice */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-sm bg-white">
              <Image
                src="/assets/basmati-rice-grains.jpg"
                alt="Monagrow export grade basmati rice grains"
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Right Column: Newsletter Heading + Paragraph + Subscription Pill Input */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center">
            {/* Newsletter Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a2907] mb-3">
              Newsletter
            </h3>

            {/* Description Copy */}
            <p className="text-stone-700/85 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Subscribe to receive weekly FOB port commodity pricing, container availability, and upcoming seasonal harvest reports.
            </p>

            {/* Subscription Pill Form */}
            {isSubscribed ? (
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#57a42f] text-white text-xs sm:text-sm font-semibold shadow-sm w-fit">
                <CheckCircle2 className="w-4 h-4 text-emerald-100 shrink-0" />
                <span>Subscribed to Trade Dispatch</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-full p-1.5 pl-4 sm:pl-5 shadow-sm border border-stone-200/50 flex items-center gap-2 w-full max-w-md transition-all focus-within:ring-2 focus-within:ring-[#57a42f]/30"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="bg-transparent text-stone-800 placeholder-stone-400 text-xs sm:text-sm focus:outline-none flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-[#57a42f] hover:bg-[#478726] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm shrink-0 active:scale-95 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
