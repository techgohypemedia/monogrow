"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Hero from "./Hero";
import RiceHeroTransition from "./RiceHeroTransition";
import Footer from "./Footer";
import QuoteModal from "./QuoteModal";
import ProductDetailModal from "./ProductDetailModal";
import CategoryGuide, { type GuideCategory } from "./CategoryGuide";
import type { CommodityProduct } from "@/data/commodityData";
import s from "./RiceGuide.module.css";

const categoryNames: Record<GuideCategory, string> = {
  coffee: "Coffee",
  sugar: "Sugar",
  "dry-fruits": "Dry Fruits",
};

export default function PremiumCommodityPage({
  category,
  products,
}: {
  category: GuideCategory;
  products: CommodityProduct[];
}) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");
  const [selectedProductForDetails, setSelectedProductForDetails] =
    useState<CommodityProduct | null>(null);

  const openQuote = (productName?: string) => {
    setQuoteProduct(
      productName || products[0]?.quoteName || categoryNames[category]
    );
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] selection:bg-[#740707] selection:text-white">
      <Navbar immersiveHero onOpenQuoteModal={openQuote} />

      <main className="flex-1">
        {products[0] && (
          <RiceHeroTransition
            key={`${category}-transition`}
            heroPackId={`${category}-hero-pack`}
            targetPackId={`${category}-target-pack`}
            targetCardId={`${category}-target-card`}
            targetBowlId={`${category}-target-bowl`}
            packSrc={products[0].packImg}
          />
        )}

        <Hero
          key={`${category}-hero`}
          filterProduct={category}
          onOpenQuoteModal={openQuote}
        />

        {/* ========================================================
            CATEGORY PRODUCT COLLECTION
            Exact same 3-column card layout, dimensions & styling as Rice Page
            ======================================================== */}
        <section id="category-collection" className="py-16 sm:py-24 bg-[#fcfbf7] border-b border-[#dfd5c6]">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <span className="block text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-[#740707] mb-2.5">
                THE MONAGROW {categoryNames[category].toUpperCase()} COLLECTION
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#262820] tracking-tight leading-tight">
                {categoryNames[category]}, chosen with care.
              </h2>
            </header>

            {/* 3-Column Catalogue Cards Grid - Matching screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  id={index === 0 ? `${category}-target-card` : product.id}
                  className="group relative flex flex-col items-center justify-between text-center bg-white rounded-2xl p-6 sm:p-8 border border-[#dfd5c6] hover:border-[#740707] shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 h-full"
                >
                  {/* Visual Cutout Pack Image with Smooth Hover Scale */}
                  <div
                    className="relative w-full h-52 sm:h-60 flex items-center justify-center mb-5 cursor-pointer"
                    onClick={() => setSelectedProductForDetails(product)}
                    title={`Click to view ${product.name} details & specifications`}
                  >
                    <Image
                      id={index === 0 ? `${category}-target-pack` : undefined}
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
                      {/* Title in Elegant Bold Font */}
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
                        onClick={() => openQuote(product.quoteName)}
                        className="px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#740707] hover:bg-[#5e0606] active:bg-[#4a0404] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className={s.guide}>
          <CategoryGuide key={`${category}-guide`} category={category} onQuote={openQuote} />
        </div>
      </main>

      <Footer onOpenQuoteModal={openQuote} />

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialCommodity={quoteProduct}
      />

      {/* Product Full Specifications & Description Modal */}
      <ProductDetailModal
        product={selectedProductForDetails}
        onClose={() => setSelectedProductForDetails(null)}
        onRequestQuote={openQuote}
      />
    </div>
  );
}
