"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommodityTicker from "@/components/CommodityTicker";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WholesaleCalculator from "@/components/WholesaleCalculator";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import QuoteModal from "@/components/QuoteModal";
import { MessageCircle, PhoneCall } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#fcfcf9] selection:bg-[#1c4a27] selection:text-white">
      {/* 1. Top Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 2. Hero Section with Video Loop & Flagship Rice Showcase */}
      <main className="flex-1">
        <Hero
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 3. Live Commodity Spot Ticker */}
        <CommodityTicker />

        {/* 4. Wholesale Commodity Categories (Rice, Coffee, Sugar, Dryfruits) */}
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
      </main>

      {/* 9. Premium Footer */}
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

      {/* Floating WhatsApp Action for High B2B Wholesale Conversion */}
      <aside aria-label="Quick wholesale contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <div className="hidden sm:block bg-white text-stone-800 text-xs font-bold py-1.5 px-3 rounded-full shadow-lg border border-stone-200">
          Chat with Export Desk
        </div>
        <button
          onClick={() => {
            const text = encodeURIComponent(
              "Hello Monagrow Global Wholesale! I want to inquire about container bulk pricing."
            );
            window.open(`https://wa.me/9779801234567?text=${text}`, "_blank");
          }}
          className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
          title="Direct WhatsApp Export Hotline"
          aria-label="Direct WhatsApp Export Hotline"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
        </button>
      </aside>
    </div>
  );
}
