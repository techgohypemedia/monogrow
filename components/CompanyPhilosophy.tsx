"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

interface CompanyPhilosophyProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export default function CompanyPhilosophy({ onOpenQuoteModal }: CompanyPhilosophyProps) {
  return (
    <section id="about-us" className="relative w-full bg-white text-neutral-900 selection:bg-[#800020] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN WHITE CANVAS: "SAY NO MORE"
      ────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12 pt-20 sm:pt-28 pb-16 sm:pb-24">
        {/* Giant Top Headline */}
        <div className="text-center md:text-left mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-[clamp(44px,8vw,112px)] font-bold uppercase tracking-wide text-neutral-900 leading-[0.95]">
            SAY NO MORE
          </h2>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Editorial paragraph + Angled Pouch Photo */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 sm:space-y-12">
            <div>
              <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-800 max-w-md">
                Monagrow is engineered as the direct, unadulterated alternative to layered broker networks. We source certified Grade-A Basmati, single-estate Arabica, pure refined cane sugar, and handpicked cashews straight from registered origin mills to global ports.
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
                  src="/assets/company-editorial-angle.jpg"
                  alt="Monagrow single origin commodity packs in studio setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider font-semibold text-neutral-500">
                Single-origin harvest lots · Farm-to-vessel preservation
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Studio Still Life Photo + Bold Editorial Statement */}
          <div className="lg:col-span-7 flex flex-col space-y-8 sm:space-y-10">
            {/* Primary Studio Still Image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl border border-neutral-200/80">
              <Image
                src="/assets/company-studio-still.jpg"
                alt="Minimalist studio still life of premium basmati, roasted coffee, and jumbo cashews"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>

            {/* Editorial Statement Below Studio Image */}
            <div className="max-w-xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-normal text-neutral-900 leading-snug">
                A REFINED SOURCE CREATES A PERFECT COMPOSITION OF PURITY AND COMMODITY EXCELLENCE.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Every container load leaves origin with independent SGS/Bureau Veritas inspection, verifiable moisture metrics, and airtight maritime packaging.
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
            {/* Left: Tilted Pouch Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-[#dfeaca]">
                <Image
                  src="/assets/company-pouch-sage.jpg"
                  alt="Monagrow export pack resting on pale sage background"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            {/* Right: Headline + Honest Philosophy + Standard Statement */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="text-[clamp(38px,6vw,84px)] font-bold uppercase tracking-wide text-neutral-900 leading-[0.95]">
                  NO MARKETING<br />JARGON
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
          3. WARM HONEY MUSTARD PANEL: "WHY NOT TRY RIGHT NOW?"
      ────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#ecd998] py-16 sm:py-24 border-b border-[#ddca88]">
        <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Headline + Description + Call to Action Button */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <h3 className="text-[clamp(40px,7.5vw,96px)] font-bold uppercase tracking-wide text-neutral-900 leading-[0.95]">
                WHY NOT<br />VERIFY RIGHT<br />NOW?
              </h3>

              <p className="text-base sm:text-lg lg:text-xl text-neutral-800 leading-relaxed max-w-lg font-medium">
                Leave a trade inquiry and be among the institutional procurement teams to receive an official origin sample box or container-lot proforma quote.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal("Commercial Origin Sample Kit")}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer group"
                >
                  <span>Request Samples</span>
                  <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenQuoteModal("Bulk Lot Proforma Invoice")}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-neutral-900/10 text-neutral-900 font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer"
                >
                  Request Proforma Invoice
                </button>
              </div>
            </div>

            {/* Right: Hand Holding Sample Jar */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#e4d08e]">
                <Image
                  src="/assets/company-sample-hand.jpg"
                  alt="Hand holding Monagrow export sample jar with golden basmati rice"
                  fill
                  className="object-cover"
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
