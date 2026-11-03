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
    if (typeof window !== "undefined") {
      const isShop = window.location.pathname.startsWith("/shop");
      const basePath = isShop ? "/shop" : "/categories";
      const url = tabId === "all" ? basePath : `${basePath}?category=${tabId}`;
      window.history.replaceState(null, "", url);
    }
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
            HERO: COMMODITY SHOP PORTFOLIO
            Theme: Signature Maroon (#800020) and Crisp White
            ======================================================== */}
        <section className="pt-28 sm:pt-32 pb-8 sm:pb-10 bg-[#FAF9F6] border-b border-neutral-200/80">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Headline & Overview */}
            <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800020] mb-2 block">
                Direct Origin Wholesale Catalog
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
                Five Staples.{" "}
                <span className="text-[#800020]">Exceptional Roots.</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
                Good food begins with good ingredients. Explore our portfolio of Basmati rice, Katarni rice, estate coffee, royal cashews, and refined cane sugar—packed at origin, laboratory verified, and shipped worldwide.
              </p>
            </div>

            {/* Category Filter Tabs (Positioned right above cards for instant access) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-7 sm:mb-8">
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

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-center">
              <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-sm sm:text-base font-bold text-[#800020]">100% Sortex</p>
                <p className="text-[10.5px] text-neutral-500 font-medium">Laser Optical Cleaning</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-sm sm:text-base font-bold text-[#800020]">0% Broker Markup</p>
                <p className="text-[10.5px] text-neutral-500 font-medium">Direct Mill Contracts</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-sm sm:text-base font-bold text-[#800020]">18+ World Ports</p>
                <p className="text-[10.5px] text-neutral-500 font-medium">CIF &amp; FOB Container Lanes</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <p className="text-sm sm:text-base font-bold text-[#800020]">ISO 22000 &amp; SGS</p>
                <p className="text-[10.5px] text-neutral-500 font-medium">Binding QC Lab COA</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            COMMODITY SHOWCASE CARDS (CARD STYLE - 2 CARDS IN A ROW)
            High-contrast crisp white cards on warm luxury background
            ======================================================== */}
        <section id="shop-catalog" className="py-12 sm:py-16 bg-[#F6F4EE]">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Catalog Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10 pb-4 border-b border-neutral-300/80">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#800020]">
                  Monagrow Product Catalog
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
                  Wholesale Commodity Cards
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                Showing {filteredProducts.length} commodities · 2 cards per row
              </p>
            </div>

            {/* 2 Cards in a Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id}
                  id={product.id}
                  className="flex flex-col h-full rounded-3xl bg-white border border-neutral-300/90 hover:border-[#800020]/60 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group min-h-[580px]"
                >
                  {/* Visual Top Area: Packaging & Filled Bowl */}
                  <div className="relative w-full h-[280px] sm:h-[320px] bg-gradient-to-b from-[#fdfbf9] to-[#f4ede4] border-b border-neutral-200/90 flex items-center justify-center overflow-hidden p-6">
                    {/* Number Watermark */}
                    <span className="absolute top-4 left-6 text-5xl sm:text-6xl font-black text-[#800020]/15 select-none">
                      0{index + 1}
                    </span>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-radial from-[#800020]/5 via-transparent to-transparent pointer-events-none" />

                    {/* Ground Shadow */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />

                    {/* Packaging Cutout (Back/Center) */}
                    <div className="relative w-[170px] sm:w-[200px] h-[230px] sm:h-[270px] z-10 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={product.packImg}
                        alt={product.packAlt}
                        fill
                        className="object-contain drop-shadow-xl"
                        sizes="(max-width: 768px) 180px, 240px"
                        priority={index < 2}
                      />
                    </div>

                    {/* Ceramic Filled Bowl (Foreground overlapping) */}
                    <div className="absolute bottom-4 right-4 sm:right-6 w-[110px] sm:w-[135px] h-[85px] sm:h-[105px] z-20 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={product.bowlImg}
                        alt={product.bowlAlt}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </div>

                    {/* Origin Spec Footnote Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-800 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-neutral-300/80 shadow-2xs">
                        {product.originBadge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Info, Description, Specs & Actions */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6 bg-white">
                    {/* Title, Tagline & Description */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                        {product.kicker}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug group-hover:text-[#800020] transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-[#800020]/90">
                        {product.tagline}
                      </p>
                      <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal pt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Lot Specifications Grid */}
                    <div className="space-y-2">
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Verified Lot Specifications &amp; Quality Metrics
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {product.specs.slice(0, 3).map((sp) => (
                          <div
                            key={sp.label}
                            className="p-2.5 rounded-xl bg-[#FAF9F6] border border-neutral-200/90 shadow-2xs text-center"
                          >
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium truncate">
                              {sp.label}
                            </p>
                            <p className="text-xs sm:text-[12.5px] font-bold text-neutral-900 mt-0.5 truncate">
                              {sp.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packaging Formats Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-[#FAF9F6] border border-neutral-200/80">
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5 mb-1">
                          <PackageCheck className="w-3.5 h-3.5 text-[#800020]" />
                          Retail Formats
                        </p>
                        <p className="text-xs text-neutral-600 truncate">
                          {product.retailSizes.join(" · ")}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF9F6] border border-neutral-200/80">
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5 mb-1">
                          <Ship className="w-3.5 h-3.5 text-[#800020]" />
                          Bulk Export
                        </p>
                        <p className="text-xs text-neutral-600 truncate">
                          {product.bulkSizes[0]}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-2 border-t border-neutral-200 flex flex-wrap sm:flex-nowrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenQuoteModal(product.quoteName)}
                        className="flex-1 py-3.5 px-5 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#800020]/25 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Request Quote</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      <Link
                        href={`/${product.categoryKey}`}
                        className="py-3.5 px-5 rounded-full bg-white hover:bg-neutral-50 text-[#800020] font-bold text-xs uppercase tracking-wider border border-[#800020]/25 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <span>{product.categoryKey === "dry-fruits" ? "Dry Fruits" : product.categoryKey.charAt(0).toUpperCase() + product.categoryKey.slice(1)}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#800020]" />
                      </Link>

                      <Link
                        href="/#calculator"
                        className="py-3.5 px-4 rounded-full bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs uppercase tracking-wider border border-neutral-200 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1 shrink-0"
                      >
                        <span>Calc</span>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {/* 6th Card: Custom Procurement & Private Labeling (Balances 2-in-a-row grid when viewing all) */}
              {activeFilter === "all" && (
                <article className="flex flex-col h-full rounded-3xl bg-gradient-to-br from-[#800020] via-[#650019] to-[#3a000e] text-white p-7 sm:p-9 justify-between relative overflow-hidden shadow-xl border border-[#800020]/40 group min-h-[580px]">
                  {/* Decorative background glow & pattern */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/25 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-5 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Bespoke Wholesale Trade</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                        Tailored Procurement &amp; Export
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                        Need Custom Specifications or Container Lots?
                      </h2>
                      <p className="text-xs sm:text-[13.5px] text-neutral-200 leading-relaxed font-normal pt-1">
                        We connect wholesale commodity buyers directly with origin mills for tailored grain elongation, specialty roasting curves, bulk raw cane grades, or customized private-label retail packaging.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Direct Origin Mill Contracts</p>
                          <p className="text-[11px] text-neutral-300 mt-0.5">Fixed volume pricing with zero speculative broker markups.</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Custom Packaging &amp; OEM Branding</p>
                          <p className="text-[11px] text-neutral-300 mt-0.5">Standup box bags, degassing foil pouches, vacuum tins &amp; barcode printing.</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Ocean Container Freight to 18+ Ports</p>
                          <p className="text-[11px] text-neutral-300 mt-0.5">CIF, CFR, FOB with SGS laboratory certificates of analysis.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 relative z-10 border-t border-white/15">
                    <button
                      type="button"
                      onClick={() => handleOpenQuoteModal("Custom Commodity Procurement")}
                      className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-100 text-[#800020] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
                    >
                      <span>Discuss Custom Requirements</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
        {/* ========================================================
            COMMODITY SHOWCASE CARDS (CARD STYLE - 2 CARDS IN A ROW)
            Theme: Signature Maroon (#800020) and Crisp White
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id}
                  id={product.id}
                  className="flex flex-col h-full rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-[#800020]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Visual Top Area: Packaging & Filled Bowl */}
                  <div className="relative w-full h-[280px] sm:h-[320px] bg-gradient-to-b from-white via-white to-[#FAF1E6] border-b border-neutral-200/80 flex items-center justify-center overflow-hidden p-6">
                    {/* Number Watermark */}
                    <span className="absolute top-4 left-6 text-5xl sm:text-6xl font-black text-[#800020]/10 select-none">
                      0{index + 1}
                    </span>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-radial from-[#800020]/5 via-transparent to-transparent pointer-events-none" />

                    {/* Ground Shadow */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />

                    {/* Packaging Cutout (Back/Center) */}
                    <div className="relative w-[170px] sm:w-[200px] h-[230px] sm:h-[270px] z-10 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={product.packImg}
                        alt={product.packAlt}
                        fill
                        className="object-contain drop-shadow-xl"
                        sizes="(max-width: 768px) 180px, 240px"
                        priority={index < 2}
                      />
                    </div>

                    {/* Ceramic Filled Bowl (Foreground overlapping) */}
                    <div className="absolute bottom-4 right-4 sm:right-6 w-[110px] sm:w-[135px] h-[85px] sm:h-[105px] z-20 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={product.bowlImg}
                        alt={product.bowlAlt}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </div>

                    {/* Origin Spec Footnote Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-700 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-neutral-200/80 shadow-2xs">
                        {product.originBadge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Info, Description, Specs & Actions */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                    {/* Title, Tagline & Description */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                        {product.kicker}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug group-hover:text-[#800020] transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-[#800020]/90">
                        {product.tagline}
                      </p>
                      <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal pt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Lot Specifications Grid */}
                    <div className="space-y-2">
                      <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                        Verified Lot Specifications &amp; Quality Metrics
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {product.specs.slice(0, 3).map((sp) => (
                          <div
                            key={sp.label}
                            className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs text-center"
                          >
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium truncate">
                              {sp.label}
                            </p>
                            <p className="text-xs sm:text-[12.5px] font-bold text-neutral-900 mt-0.5 truncate">
                              {sp.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packaging Formats Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-white border border-neutral-200/70">
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5 mb-1">
                          <PackageCheck className="w-3.5 h-3.5 text-[#800020]" />
                          Retail Formats
                        </p>
                        <p className="text-xs text-neutral-600 truncate">
                          {product.retailSizes.join(" · ")}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-neutral-200/70">
                        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5 mb-1">
                          <Ship className="w-3.5 h-3.5 text-[#800020]" />
                          Bulk Export
                        </p>
                        <p className="text-xs text-neutral-600 truncate">
                          {product.bulkSizes[0]}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-2 border-t border-neutral-200/80 flex flex-wrap sm:flex-nowrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenQuoteModal(product.quoteName)}
                        className="flex-1 py-3.5 px-5 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#800020]/25 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Request Quote</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      <Link
                        href={`/${product.categoryKey}`}
                        className="py-3.5 px-5 rounded-full bg-white hover:bg-neutral-50 text-[#800020] font-bold text-xs uppercase tracking-wider border border-[#800020]/25 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <span>{product.categoryKey === "dry-fruits" ? "Dry Fruits" : product.categoryKey.charAt(0).toUpperCase() + product.categoryKey.slice(1)}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#800020]" />
                      </Link>

                      <Link
                        href="/#calculator"
                        className="py-3.5 px-4 rounded-full bg-white hover:bg-neutral-50 text-neutral-700 font-bold text-xs uppercase tracking-wider border border-neutral-200 shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1 shrink-0"
                      >
                        <span>Calc</span>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {/* 6th Card: Custom Procurement & Private Labeling (Balances 2-in-a-row grid when viewing all) */}
              {activeFilter === "all" && (
                <article className="flex flex-col h-full rounded-3xl bg-gradient-to-br from-[#800020] via-[#650019] to-[#3a000e] text-white p-7 sm:p-9 justify-between relative overflow-hidden shadow-xl border border-[#800020]/40 group min-h-[580px]">
                  {/* Decorative background glow & pattern */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/25 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-5 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Bespoke Wholesale Trade</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                        Tailored Procurement &amp; Export
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                        Need Custom Specifications or Container Lots?
                      </h2>
                      <p className="text-xs sm:text-[13.5px] text-neutral-200 leading-relaxed font-normal pt-1">
                        We connect wholesale commodity buyers directly with origin mills for tailored grain elongation, specialty roasting curves, bulk raw cane grades, or customized private-label retail packaging.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Direct Origin Mill Contracts</p>
                          <p className="text-[11px] text-neutral-300 mt-0.5">Fixed volume pricing with zero speculative broker markups.</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Custom Packaging &amp; OEM Branding</p>
                          <p className="text-[11px] text-neutral-300 mt-0.5">Standup box bags, degassing foil pouches, vacuum tins &amp; barcode printing.</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-white">Ocean Container Freight to 18+ Ports</p>
                          <p className="text-[11px] text-neutral-300 mt-0.5">CIF, CFR, FOB with SGS laboratory certificates of analysis.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 relative z-10 border-t border-white/15">
                    <button
                      type="button"
                      onClick={() => handleOpenQuoteModal("Custom Commodity Procurement")}
                      className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-100 text-[#800020] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
                    >
                      <span>Discuss Custom Requirements</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              )}
            </div>
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
