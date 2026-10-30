"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState("Monagrow Bulk Commodities");

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedCommodity(productName || "Monagrow Bulk Commodities");
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6efe6] selection:bg-[#800020] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} immersiveHero={false} />

      {/* 2. Main Contact Experience */}
      <main className="flex-1">
        <ContactSection onOpenQuoteModal={handleOpenQuoteModal} />
      </main>

      {/* 3. Global Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 4. Interactive Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCommodity={selectedCommodity}
      />
    </div>
  );
}

