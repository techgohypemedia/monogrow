"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Boxes,
  Layers,
} from "lucide-react";
import { PRODUCTS, CommodityProduct } from "@/data/commodityData";
import ShopProductsBanner from "@/components/ShopProductsBanner";

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

  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const activeFilter = selectedTab ?? resolveCategory(categoryParam);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState("Monagrow Bulk Commodities");
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<CommodityProduct | null>(null);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    if (typeof window !== "undefined") {
      const url = tabId === "all" ? "/categories" : `/categories?category=${tabId}`;
      window.history.replaceState(null, "", url);
    }
  };

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedProductForQuote(productName || "Monagrow Bulk Commodities");
    setIsQuoteModalOpen(true);
  };

  const filterTabs = [
    { id: "all", label: "All Commodities", count: PRODUCTS.length },
    { id: "rice", label: "Rice", count: PRODUCTS.filter((p) => p.categoryKey === "rice").length },
    { id: "sugar", label: "Sugar", count: PRODUCTS.filter((p) => p.categoryKey === "sugar").length },
    { id: "coffee", label: "Coffee", count: PRODUCTS.filter((p) => p.categoryKey === "coffee").length },
    { id: "dry-fruits", label: "Dry Fruits", count: PRODUCTS.filter((p) => p.categoryKey === "dry-fruits").length },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoryKey === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-[#740707] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} immersiveHero={false} />

      <main className="flex-1">
        {/* ========================================================
            PANORAMIC PRODUCTS SHOWCASE BANNER (REPLACES HERO)
            "From Everyday Meals to Special Moments" with 8 Products
            ======================================================== */}
        <ShopProductsBanner />

        {/* ========================================================
            COMMODITY SHOWCASE CARDS (STREAMLINED & REDUCED CONTENT)
            ======================================================== */}
        <section id="shop-catalog" className="py-12 sm:py-16 bg-[#FAF5EE]">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Catalog Section Header with Interactive Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-[#dfd5c6]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#740707]">
                  Monagrow Product Catalog
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
                  Wholesale Commodity Cards
                </h2>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-[#740707] text-white shadow-sm shadow-[#740707]/30"
                          : "bg-white text-neutral-700 border border-[#dfd5c6] hover:border-[#740707]/40 hover:text-[#740707]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#FAF5EE] text-[#740707] border border-[#dfd5c6]/60"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Column Catalogue Cards Grid (Matches Screenshot) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  id={product.id}
                  className="group relative flex flex-col items-center justify-between text-center bg-white rounded-2xl p-6 sm:p-8 border border-[#dfd5c6] hover:border-[#740707] shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 h-full"
                >
                  {/* Visual Cutout Pack Image */}
                  <div
                    className="relative w-full h-52 sm:h-60 flex items-center justify-center mb-5 cursor-pointer"
                    onClick={() => setSelectedProductForDetails(product)}
                    title={`Click to view ${product.name} specifications`}
                  >
                    <Image
                      src={product.packImg}
                      alt={product.packAlt || product.name}
                      width={240}
                      height={320}
                      className="max-h-[190px] sm:max-h-[220px] w-auto object-contain drop-shadow-md group-hover:drop-shadow-2xl transition-all duration-500 ease-out group-hover:scale-106"
                      sizes="(max-width: 768px) 180px, 240px"
                    />
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 flex flex-col items-center justify-between w-full">
                    <div>
                      {/* Title */}
                      <h3
                        onClick={() => setSelectedProductForDetails(product)}
                        className="text-xl sm:text-2xl font-bold text-[#262820] group-hover:text-[#740707] transition-colors duration-300 tracking-tight leading-snug cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Subtitle / Tagline */}
                      <p
                        title={product.tagline}
                        className="text-xs sm:text-sm text-[#6b5d52] leading-relaxed mt-2 max-w-[280px] sm:max-w-[320px] mx-auto font-normal"
                      >
                        {product.tagline}
                      </p>
                    </div>

                    {/* Action CTA: Request Quote */}
                    <div className="mt-6 pt-1 flex items-center justify-center w-full">
                      <button
                        type="button"
                        onClick={() => handleOpenQuoteModal(product.quoteName)}
                        className="px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#740707] hover:bg-[#5e0606] active:bg-[#4a0404] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Custom Procurement Banner when viewing all */}
            {activeFilter === "all" && (
              <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#740707] via-[#5b0606] to-[#3a000e] text-white p-7 sm:p-10 relative overflow-hidden shadow-xl border border-[#740707]/40">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/25 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Bespoke Wholesale Trade</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                      Need Custom Specifications or Container Lots?
                    </h2>
                    <p className="text-xs sm:text-[13.5px] text-neutral-200 leading-relaxed font-normal">
                      We connect wholesale commodity buyers directly with origin mills for tailored grain elongation, specialty roasting curves, bulk raw cane grades, or customized private-label retail packaging.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">Direct Mill Contracts</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">Custom OEM Packaging</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">18+ Ports Ocean Freight</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenQuoteModal("Custom Commodity Procurement")}
                      className="w-full sm:w-auto py-3.5 px-7 rounded-full bg-white hover:bg-neutral-100 text-[#740707] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
                    >
                      <span>Discuss Custom Requirements</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            EXPORT LOGISTICS & PACKAGING INTEGRITY
            Theme: Off-White & Maroon
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-[#FAF9F6] border-t border-b border-neutral-200/70">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#740707]">
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
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#740707]">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Multi-Ply BOPP Laminate</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  High-strength biaxially-oriented polypropylene with moisture-resistant laminate prevents ambient moisture ingress during monsoon voyages.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#740707]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">One-Way Degassing Valves</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Allows freshly roasted specialty coffee beans to release CO2 while blocking oxygen ingress, preserving volatile aromatics for up to 24 months.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#740707]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Hermetic GrainPro Liners</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Ultra-hermetic gas and moisture-tight inner bag liners that create an insect-free, modified atmosphere for raw green coffee and bulk grain sacks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#740707]">
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

      {/* Product Full Specifications Modal */}
      <ProductDetailModal
        product={selectedProductForDetails}
        onClose={() => setSelectedProductForDetails(null)}
        onRequestQuote={handleOpenQuoteModal}
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
