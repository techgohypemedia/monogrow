"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RiceHeroTransition from "@/components/RiceHeroTransition";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import QuoteModal from "@/components/QuoteModal";
import {
  COMMODITY_CATEGORIES,
  getProductsByCategory,
} from "@/data/commodityData";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  PackageCheck,
  Ship,
  CheckCircle2,
} from "lucide-react";

export default function RicePageClient() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCommodityForQuote, setSelectedCommodityForQuote] = useState(
    "Basmati Rice (1121 Supreme)"
  );

  const category = COMMODITY_CATEGORIES["rice"];
  const products = getProductsByCategory("rice");

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedCommodityForQuote(productName || "Basmati Rice (1121 Supreme)");
    setIsQuoteModalOpen(true);
  };

  // Other categories for cross-navigation
  const otherCategories = Object.values(COMMODITY_CATEGORIES).filter(
    (c) => c.key !== "rice"
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-[#800020] selection:text-white">
      {/* 1. Top Navbar with immersiveHero (matches main page hero styling) */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} immersiveHero />

      <main className="flex-1 relative">
        {/* Floating smooth pop-out transition from Hero to Basmati Product Card */}
        <RiceHeroTransition />

        {/* ========================================================
            2. HERO SECTION FROM MAIN PAGE
            Copied with all functionality, colors, animations,
            GSAP scrub, Lenis smooth scroll, particles & interactive scene
            ======================================================== */}
        <Hero
          filterProduct="rice"
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* ========================================================
            3. RICE PORTFOLIO INTRODUCTION & METRICS
            Theme: Signature Maroon (#800020) and Warm Off-White
            ======================================================== */}
        <section
          id="rice-collection"
          className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#FAF9F6] border-b border-neutral-200/70"
        >
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center justify-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
              <Link href="/" className="hover:text-[#800020] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <Link
                href="/categories"
                className="hover:text-[#800020] transition-colors"
              >
                Categories
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[#800020] font-bold">Rice</span>
            </nav>

            {/* Eyebrow Badge */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#800020]/15 text-[#800020] text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
                {category.eyebrow}
              </span>
            </div>

            {/* Headline & Overview */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
                {category.title}
              </h2>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
                {category.subtitle}
              </p>
            </div>

            {/* 4-Metric Highlights Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto text-center">
              {category.heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs"
                >
                  <p className="text-xl sm:text-2xl font-extrabold text-[#800020]">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-neutral-800 mt-1">
                    {metric.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-0.5">
                    {metric.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            4. RICE PRODUCT SHOWCASE CARDS (1121 BASMATI & KATARNI)
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                Origin Specifications &amp; Lots
              </span>
              <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Monagrow Rice Varieties ({products.length})
              </h3>
            </div>

            {products.map((product, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={product.id}
                  id={product.id}
                  className="rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-[#800020]/35 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-12 ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Visual Column: Packaging & Filled Ceramic Bowl */}
                    <div
                      className={`lg:col-span-5 relative w-full ${
                        isEven ? "" : "lg:order-2"
                      }`}
                    >
                      <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[430px] rounded-2xl bg-gradient-to-b from-white via-white to-[#FAF1E6] border border-[#800020]/10 flex items-center justify-center overflow-hidden p-6 shadow-inner">
                        {/* Number Watermark */}
                        <span className="absolute top-4 left-6 text-5xl sm:text-6xl font-black text-[#800020]/10 select-none">
                          0{index + 1}
                        </span>

                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-radial from-[#800020]/5 via-transparent to-transparent pointer-events-none" />

                        {/* Ground Shadow */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />

                        {/* Packaging Cutout */}
                        <div
                          id={index === 0 ? "rice-target-pack" : undefined}
                          className="relative w-[180px] sm:w-[220px] h-[260px] sm:h-[310px] z-10 transition-transform duration-500 hover:scale-105"
                        >
                          <Image
                            src={product.packImg}
                            alt={product.packAlt}
                            fill
                            className="object-contain drop-shadow-xl"
                            sizes="(max-width: 768px) 200px, 260px"
                            priority={index === 0}
                          />
                        </div>

                        {/* Ceramic Filled Bowl */}
                        <div
                          id={index === 0 ? "rice-target-bowl" : undefined}
                          className="absolute bottom-4 right-4 sm:right-8 w-[120px] sm:w-[150px] h-[95px] sm:h-[120px] z-20 transition-transform duration-500 hover:scale-110"
                        >
                          <Image
                            src={product.bowlImg}
                            alt={product.bowlAlt}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 768px) 130px, 160px"
                          />
                        </div>

                        {/* Origin Spec Footnote */}
                        <div className="absolute bottom-3 left-4 z-20">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-600 bg-white/80 px-2.5 py-0.5 rounded-md border border-neutral-200/60">
                            {product.originBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details Column: Specs & Actions */}
                    <div
                      className={`lg:col-span-7 space-y-6 ${
                        isEven ? "" : "lg:order-1"
                      }`}
                    >
                      {/* Title & Narrative */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                          {product.kicker}
                        </span>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#800020]/90">
                          {product.tagline}
                        </p>
                        <p className="text-xs sm:text-sm md:text-[14.5px] text-neutral-600 leading-relaxed font-normal pt-1">
                          {product.description}
                        </p>
                      </div>

                      {/* 6-Grid Specification Table */}
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Verified Lot Specifications &amp; Quality Metrics
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {product.specs.map((sp) => (
                            <div
                              key={sp.label}
                              className="p-3 rounded-xl bg-white border border-neutral-200/80 shadow-2xs"
                            >
                              <p className="text-[10.5px] uppercase tracking-wider text-neutral-500 font-medium">
                                {sp.label}
                              </p>
                              <p className="text-xs sm:text-[13px] font-bold text-neutral-900 mt-0.5">
                                {sp.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Available Formats (Retail vs Bulk) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-white border border-neutral-200/70">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5 mb-1.5">
                            <PackageCheck className="w-3.5 h-3.5 text-[#800020]" />
                            Retail Packaging Formats
                          </p>
                          <ul className="text-xs text-neutral-600 space-y-1">
                            {product.retailSizes.map((s) => (
                              <li key={s} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]/60" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-neutral-200/70">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5 mb-1.5">
                            <Ship className="w-3.5 h-3.5 text-[#800020]" />
                            Wholesale &amp; Bulk Container Formats
                          </p>
                          <ul className="text-xs text-neutral-600 space-y-1">
                            {product.bulkSizes.map((b) => (
                              <li key={b} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]/60" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Commercial Highlights */}
                      <div className="p-3.5 rounded-xl bg-white/70 border border-neutral-200/60">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                          Commercial Highlights
                        </p>
                        <ul className="space-y-1 text-xs text-neutral-600">
                          {product.keyHighlights.map((hl) => (
                            <li key={hl} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => handleOpenQuoteModal(product.quoteName)}
                          className="px-6 sm:px-8 py-3.5 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#800020]/25 transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group hover:scale-[1.02]"
                        >
                          <span>Request Quote &amp; Lot Specs</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        <Link
                          href="/#calculator"
                          className="px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#800020] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#800020]/25 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>Container Volume Estimator</span>
                          <ArrowRight className="w-4 h-4 text-[#800020]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            5. RICE QUALITY & EXPORT READINESS
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-[#FAF9F6] border-t border-b border-neutral-200/70">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                Rigorous Quality Control
              </span>
              <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Origin Processing &amp; Verified Standards
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Every lot of Monagrow Rice undergoes dual-camera laser Sortex
                optical cleaning, SGS moisture certification, and export-grade
                barrier packaging before loading.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.qualityBullets.map((bullet, i) => (
                <div
                  key={bullet.title}
                  className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#800020] font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">
                    {bullet.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {bullet.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            6. EXPLORE OTHER COMMODITIES
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                  Monagrow Product Portfolio
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                  Explore Other Commodities
                </h3>
              </div>
              <Link
                href="/categories"
                className="text-xs sm:text-sm font-bold text-[#800020] hover:text-[#520014] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View All 5 Commodities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherCategories.map((other) => (
                <Link
                  key={other.key}
                  href={`/${other.slug}`}
                  className="group p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-[#800020]/40 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020]">
                      Monagrow {other.navName}
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900 group-hover:text-[#800020] transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {other.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#800020] border-t border-neutral-200/60 mt-4">
                    <span>View {other.navName} Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            7. DIRECT CONTAINER SOURCING CTA BANNER
            ======================================================== */}
        <section className="py-12 bg-gradient-to-r from-[#800020] to-[#5a0016] text-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF9F6]/80">
                  Global Container Logistics &amp; CIF Contracts
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Source Monagrow Rice Directly from Origin
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 font-normal">
                  Inquire about full container loads (FCL), palletized export,
                  custom retail bagging, and SGS pre-shipment inspection.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenQuoteModal(products[0]?.quoteName)}
                  className="px-6 py-3 rounded-full bg-white text-[#800020] hover:bg-neutral-100 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Request Instant Quote</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 transition-colors"
                >
                  Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Interactive Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCommodity={selectedCommodityForQuote}
      />
    </div>
  );
}
