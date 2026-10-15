"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WholesaleCalculator from "@/components/WholesaleCalculator";
import Testimonials from "@/components/Testimonials";
import MarketIntelligence from "@/components/MarketIntelligence";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCommodityForQuote, setSelectedCommodityForQuote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedCommodityForQuote(productName || "Monagrow Bulk Commodities");
    setIsQuoteModalOpen(true);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Smooth scroll down to products
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcf9] selection:bg-[#57a42f] selection:text-white">
      {/* 1. Top Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 2. Hero Section with Video Loop & Flagship Rice Showcase */}
      <main className="flex-1">
        <Hero
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 3. Wholesale Commodity Categories (Rice, Coffee, Sugar, Dryfruits) */}
        <CategorySection
          onSelectCategory={handleSelectCategory}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 5. Bulk Product Lots Showcase (Front & Back packaging for Monagrow Rice) */}
        <ProductSection
          selectedCategory={selectedCategory}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 6. Why Choose Us / Monagrow Wholesale Advantage (Matching Reference Layout) */}
        <WhyChooseUs onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 7. Interactive Bulk Container & Volume Estimator */}
        <WholesaleCalculator onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 8. Verified Buyer Reviews & Testimonials */}
        <Testimonials />

        {/* 9. Market Intelligence & Crop Reports (Matching Reference 3-Column Layout) */}
        <MarketIntelligence />
      </main>

      {/* 10. Premium Footer */}
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
