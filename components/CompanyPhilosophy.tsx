"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface CompanyPhilosophyProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export default function CompanyPhilosophy({ onOpenQuoteModal: _onOpenQuoteModal }: CompanyPhilosophyProps) {
  return (
    <section id="about-us" className="relative w-full bg-white text-neutral-900 selection:bg-[#800020] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN WHITE CANVAS: "PURITY DIRECT FROM ORIGIN"
      ────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
        {/* Editorial Section Header */}
        <div className="text-center md:text-left mb-4 sm:mb-5 lg:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fae8eb] border border-[#800020]/20 text-xs font-bold uppercase tracking-widest text-[#800020] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#800020]" />
            <span>Our Origin Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-neutral-900 leading-[1.05]">
            Purity Direct <span className="text-[#800020]">From Origin</span>
          </h2>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Editorial paragraph + Angled Pouch Photo */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 sm:space-y-12">
            <div>
              <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-700 max-w-md">
                Monagrow bridges international buyers directly with registered origin mills and estates. We deliver certified Grade-A Basmati, single-estate Arabica coffee, pure refined cane sugar, and handpicked jumbo cashews with zero speculative broker layers.
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-[#800020]" />
                Direct Origin · Zero Speculative Middlemen
              </div>
            </div>

            {/* Artistic Angled Pouch Photo */}
            <div className="relative group max-w-md w-full">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-neutral-100 shadow-xl border border-neutral-200/70 transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src="/assets/monagrow-rice-sugar-pedestal.jpg"
                  alt="Monagrow Basmati Rice and Refined Cane Sugar export packs on architectural pedestal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Studio Still Life Photo + Bold Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col space-y-8 sm:space-y-10">
            {/* Primary Studio Still Image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl border border-neutral-200/80">
              <Image
                src="/assets/monagrow-studio-still.jpg"
                alt="Monagrow Basmati rice, dark Arabica coffee, and royal cashews with glass tasting jars"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>

            {/* Editorial Statement Below Studio Image */}
            <div className="max-w-xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-neutral-900 leading-snug">
                UNCOMPROMISING PURITY AT EVERY LINK OF THE COMMODITY CHAIN.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Every container shipment departs origin with verifiable moisture metrics, Sortex optical cleaning, and sealed container loading overseen by accredited inspection agencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PALE SAGE FRESH PANEL: "NO MARKETING JARGON"
      ────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#e8f1dc] py-16 sm:py-24 border-y border-[#d9e5cb]">
        <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Product Testing & Quality Lab Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-[#dfeaca]">
                <Image
                  src="/assets/monagrow-product-testing-lab.jpg"
                  alt="Monagrow quality assurance specialist conducting commodity lab testing and optical analysis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            {/* Right: Headline + Honest Philosophy + Standard Statement */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-neutral-900 leading-[1.05]">
                  TRANSPARENT<br /><span className="text-[#3f6b2f]">LAB SPECIFICATIONS</span>
                </h3>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-neutral-800 max-w-xl">
                We set out to build something transparent in a global trading ecosystem often clouded by broker markup and arbitrary quality claims. Monagrow provides verified laboratory specs, documented harvest dates, and guaranteed container moisture thresholds before contract signing.
              </p>

              {/* Condensed Accent Banner */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-black/10">
                <div className="max-w-md">
                  <p className="font-bold text-sm sm:text-base uppercase tracking-wide text-neutral-900 leading-snug">
                    We supply only certified origin harvests and will never compromise on Grade-A standards.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-neutral-800">
                  <span className="px-3 py-1 rounded-full bg-white/70 border border-black/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3f6b2f]" /> Sortex Clean
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/70 border border-black/10 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3f6b2f]" /> ISO 22000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. WARM HONEY MUSTARD PANEL: "REQUEST ORIGIN SAMPLES"
      ────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#ecd998] py-16 sm:py-24 border-b border-[#ddca88]">
        <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Headline + Description + Call to Action Button */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-neutral-900 leading-[1.05]">
                REQUEST ORIGIN<br />SAMPLES &amp; QUOTE
              </h3>

              <p className="text-base sm:text-lg lg:text-xl text-neutral-800 leading-relaxed max-w-lg font-medium">
                Leave a trade inquiry and be among the institutional procurement teams to receive an official origin sample box or container-lot proforma quote.
              </p>

              <div className="pt-2 border-l-2 border-neutral-900/70 pl-4 py-1 space-y-1.5">
                <p className="text-sm sm:text-base text-neutral-900 font-semibold leading-relaxed">
                  Every commercial sample kit includes complete COA specifications, Sortex purity metrics, and verified harvest analysis.
                </p>
                <p className="text-xs sm:text-sm font-medium text-neutral-800 tracking-wide">
                  Dispatched worldwide via priority air courier within 48 hours for institutional lab evaluation.
                </p>
              </div>
            </div>

            {/* Right: Monagrow Product Bag Showcase */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm aspect-3/4 flex items-center justify-center">
                <Image
                  src="/assets/monagrow-rice-bag-cutout.png"
                  alt="Monagrow 5kg Premium Basmati Rice export bag"
                  fill
                  className="object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.22)] hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
