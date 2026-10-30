"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  PackageCheck,
  Ship,
  FileCheck2,
  CheckCircle2,
  Check,
  Scale,
  Layers,
  Sprout,
  Filter,
  Boxes,
} from "lucide-react";
import { PRODUCTS, CommodityProduct } from "@/data/commodityData";

const FILTER_TABS = [
  { id: "all", label: "All Commodities", count: 5 },
  { id: "rice", label: "Rice", count: 2 },
  { id: "coffee", label: "Coffee", count: 1 },
  { id: "sugar", label: "Sugar", count: 1 },
  { id: "dry-fruits", label: "Dry Fruits", count: 1 },
];

function CategoriesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || searchParams.get("filter");
  
  const resolveCategory = (param: string | null) => {
    if (param) {
      const key = param.toLowerCase();
      if (["rice", "coffee", "sugar", "dry-fruits", "all"].includes(key)) {
        return key;
      }
    }
    return "all";
  };

  const [activeFilter, setActiveFilter] = useState<string>(() => resolveCategory(categoryParam));
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState("Monagrow Bulk Commodities");

  useEffect(() => {
    setActiveFilter(resolveCategory(categoryParam));
  }, [categoryParam]);

  const handleTabClick = (tabId: string) => {
    setActiveFilter(tabId);
    const url = tabId === "all" ? "/categories" : `/categories?category=${tabId}`;
    window.history.replaceState(null, "", url);
  };

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedProductForQuote(productName || "Monagrow Bulk Commodities");
    setIsQuoteModalOpen(true);
  };

  const filteredProducts =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoryKey === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-[#800020] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} immersiveHero={false} />

      <main className="flex-1">
        {/* ========================================================
            HERO: CATEGORIES PORTFOLIO
            Theme: Signature Maroon (#800020) and Crisp White
            ======================================================== */}
        <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-[#FAF9F6] border-b border-neutral-200/70">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Centered Eyebrow */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#800020]/15 text-[#800020] text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
                The Monagrow Commodity Collection
              </span>
            </div>

            {/* Headline & Overview */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
                Five Staples.{" "}
                <span className="text-[#800020]">Exceptional Roots.</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
                Good food begins with good ingredients. Explore our portfolio of Basmati rice, Katarni rice, estate coffee, royal cashews, and refined cane sugar—packed at origin, laboratory verified, and shipped worldwide.
              </p>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-14 text-center">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-base sm:text-lg font-bold text-[#800020]">100% Sortex</p>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">Laser Optical Cleaning</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-base sm:text-lg font-bold text-[#800020]">0% Broker Markup</p>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">Direct Mill Contracts</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-base sm:text-lg font-bold text-[#800020]">18+ World Ports</p>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">CIF &amp; FOB Container Lanes</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-base sm:text-lg font-bold text-[#800020]">ISO 22000 &amp; SGS</p>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">Binding QC Lab COA</p>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#800020] text-white shadow-md shadow-[#800020]/25 scale-105"
                        : "bg-white text-neutral-700 border border-neutral-200 hover:border-[#800020]/30 hover:text-[#800020]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================
            COMMODITY SHOWCASE CARDS (ALL 5 PRODUCTS)
            Theme: Signature Maroon (#800020) and Crisp White
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            
            {filteredProducts.map((product, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={product.id}
                  id={product.id}
                  className="rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-[#800020]/35 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-12 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}>
                    
                    {/* Visual Column: Packaging & Filled Bowl (5 cols) */}
                    <div className={`lg:col-span-5 relative w-full ${isEven ? "" : "lg:order-2"}`}>
                      <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[430px] rounded-2xl bg-gradient-to-b from-white via-white to-[#FAF1E6] border border-[#800020]/10 flex items-center justify-center overflow-hidden p-6 shadow-inner">
                        
                        {/* Number Watermark */}
                        <span className="absolute top-4 left-6 text-5xl sm:text-6xl font-black text-[#800020]/10 select-none">
                          0{index + 1}
                        </span>

                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-radial from-[#800020]/5 via-transparent to-transparent pointer-events-none" />

                        {/* Ground Shadow */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />

                        {/* Packaging Cutout (Back/Center) */}
                        <div className="relative w-[180px] sm:w-[220px] h-[260px] sm:h-[310px] z-10 transition-transform duration-500 hover:scale-105">
                          <Image
                            src={product.packImg}
                            alt={product.packAlt}
                            fill
                            className="object-contain drop-shadow-xl"
                            sizes="(max-width: 768px) 200px, 260px"
                            priority={index < 2}
                          />
                        </div>

                        {/* Ceramic Filled Bowl (Foreground overlapping) */}
                        <div className="absolute bottom-4 right-4 sm:right-8 w-[120px] sm:w-[150px] h-[95px] sm:h-[120px] z-20 transition-transform duration-500 hover:scale-110">
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

                    {/* Details Column: Specs & Actions (7 cols) */}
                    <div className={`lg:col-span-7 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                      
                      {/* Title & Narrative */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                          {product.kicker}
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
                          {product.name}
                        </h2>
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

                      {/* Call to Actions Row */}
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
                          href={`/${product.categoryKey}`}
                          className="px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#800020] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#800020]/25 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>{product.categoryKey === "dry-fruits" ? "Dry Fruits" : product.categoryKey.charAt(0).toUpperCase() + product.categoryKey.slice(1)} Page</span>
                          <ArrowRight className="w-4 h-4 text-[#800020]" />
                        </Link>

                        <Link
                          href="/#calculator"
                          className="px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs sm:text-sm uppercase tracking-wider border border-neutral-200 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>Calculator</span>
                          <ArrowRight className="w-4 h-4 text-neutral-500" />
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
            EXPORT LOGISTICS & PACKAGING INTEGRITY
            Theme: Off-White & Maroon
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-[#FAF9F6] border-t border-b border-neutral-200/70">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                Commercial Export Readiness
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Engineered for Long Ocean Transit
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Agricultural commodities are sensitive to humidity and air exposure. Our barrier packaging technologies protect farmgate quality from our mills to global discharge ports.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#800020]">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Multi-Ply BOPP Laminate</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  High-strength biaxially-oriented polypropylene with moisture-resistant laminate prevents ambient moisture ingress during monsoon voyages.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#800020]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">One-Way Degassing Valves</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Allows freshly roasted specialty coffee beans to release CO2 while blocking oxygen ingress, preserving volatile aromatics for up to 24 months.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#800020]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Hermetic GrainPro Liners</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Ultra-hermetic gas and moisture-tight inner bag liners that create an insect-free, modified atmosphere for raw green coffee and bulk grain sacks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#800020]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Nitrogen Gas Flushing</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Displaces residual oxygen inside whole cashew retail pouches, preventing nut oxidation and keeping the kernel crunchy and fresh.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCommodity={selectedProductForQuote}
      />
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" />}>
      <CategoriesContent />
    </Suspense>
  );
}
