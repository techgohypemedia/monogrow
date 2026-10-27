"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductMarquee from "@/components/ProductMarquee";
import CategorySection from "@/components/CategorySection";
import CompanyPhilosophy from "@/components/CompanyPhilosophy";
import WholesaleCalculator from "@/components/WholesaleCalculator";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCommodityForQuote, setSelectedCommodityForQuote] = useState("");

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedCommodityForQuote(productName || "Monagrow Bulk Commodities");
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#800020] selection:text-white">
      {/* 1. Top Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} immersiveHero />

      {/* 2. Scroll-driven commodity showcase */}
      <main className="flex-1">
        <Hero
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        <ProductMarquee />

        {/* 3. Wholesale Commodity Categories (Rice, Coffee, Sugar, Dryfruits) */}
        <CategorySection
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 4. Company Philosophy & Details (Direct Origin Story & Purity Manifesto) */}
        <CompanyPhilosophy onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. Interactive Bulk Container & Volume Estimator */}
        <WholesaleCalculator onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 8. Verified Buyer Reviews & Testimonials */}
        <Testimonials />
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
