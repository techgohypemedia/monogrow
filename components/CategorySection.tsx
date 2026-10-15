"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Check } from "lucide-react";

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenQuoteModal: (categoryName: string) => void;
}

interface CommodityItem {
  id: string;
  title: string;
  category: "rice" | "coffee" | "sugar" | "dryfruits";
  price: string;
  unit: string;
  description: string;
  image: string;
  tag: string;
  origin: string;
  moq: string;
}

export default function CategorySection({
  onSelectCategory,
  onOpenQuoteModal,
}: CategorySectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const commodities: CommodityItem[] = [
    {
      id: "basmati-aged",
      title: "Organic Extra Long Basmati",
      category: "rice",
      price: "$1,450",
      unit: "/ MT",
      description: "Aged Himalayan harvest, 8.9mm slender fragrant grains.",
      image: "/assets/basmati-rice-grains.jpg",
      tag: "Flagship Basmati",
      origin: "Himalayan Foothills",
      moq: "1 Container (25 MT)",
    },
    {
      id: "arabica-dark",
      title: "Fresh Dark Roast Arabica",
      category: "coffee",
      price: "$4,800",
      unit: "/ MT",
      description: "Slow drum-roasted mountain beans with rich caramel notes.",
      image: "/assets/coffee-showcase.jpg",
      tag: "Specialty Grade",
      origin: "High Altitude Estates",
      moq: "5 Metric Tons",
    },
    {
      id: "cane-sugar-white",
      title: "Pure Refined Cane Sugar",
      category: "sugar",
      price: "$520",
      unit: "/ MT",
      description: "ICUMSA 45 sparkling crystal purity for food & beverage.",
      image: "/assets/sugar-showcase.jpg",
      tag: "ICUMSA 45",
      origin: "Agro Milling Centers",
      moq: "25 Metric Tons",
    },
    {
      id: "california-almonds",
      title: "California Jumbo Almonds",
      category: "dryfruits",
      price: "$6,400",
      unit: "/ MT",
      description: "Nonpareil Supreme 27/30 whole nuts, nitrogen-flushed.",
      image: "/assets/dryfruits-showcase.jpg",
      tag: "Count 27/30",
      origin: "California Orchards",
      moq: "2 Metric Tons",
    },
    {
      id: "royal-cashews",
      title: "Royal Whole Cashews W240",
      category: "dryfruits",
      price: "$7,800",
      unit: "/ MT",
      description: "King-size ivory whole crescent nuts, vacuum packed.",
      image: "/assets/cashew-kernels.jpg",
      tag: "Grade W240",
      origin: "Selected Coastal Groves",
      moq: "1 Metric Ton",
    },
    {
      id: "golden-sella",
      title: "1121 Golden Sella Basmati",
      category: "rice",
      price: "$980",
      unit: "/ MT",
      description: "Naturally parboiled golden grain, ideal for commercial catering.",
      image: "/assets/rice-pack-front.jpg",
      tag: "1121 Parboiled",
      origin: "Himalayan Basin",
      moq: "20 Metric Tons",
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Commodities" },
    { id: "rice", label: "Extra Long Rice" },
    { id: "coffee", label: "Coffee Beans" },
    { id: "sugar", label: "Refined Cane Sugar" },
    { id: "dryfruits", label: "Gourmet Dry Fruits" },
  ];

  const filteredItems = commodities.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const handleInquire = (item: CommodityItem) => {
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
    onOpenQuoteModal(`Wholesale Container Quote: ${item.title} (${item.price}${item.unit})`);
  };

  const handleCardClick = (item: CommodityItem) => {
    onSelectCategory(item.category);
  };

  return (
    <section id="categories" className="py-20 bg-[#fcfcf9] relative border-t border-stone-200/80">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5ec] text-[#57a42f] text-xs font-bold uppercase tracking-wider mb-3.5 border border-[#c3e6cd]">
              <Sparkles className="w-3.5 h-3.5 text-[#57a42f]" />
              <span>FRESH HARVEST COMMODITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439]">
              Sustainably Grown. Globally Exported.
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Standardized in ISO-certified processing facilities, packed under nitrogen flush, and dispatched worldwide in bulk commercial containers.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-[#57a42f] text-white shadow-md shadow-[#57a42f]/20"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Luxury Produce Layout (Matching Reference Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group flex flex-col cursor-pointer"
            >
              {/* 1. Large Image Container with Custom Inverted Rounded Corner Notch */}
              <div className="relative aspect-square w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                {/* Product Photograph */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Subtle Top-Left Category Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#57a42f] shadow-sm border border-stone-200/50">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom-Right Inverted Radius Cutout Dock */}
                <div className="absolute bottom-0 right-0 bg-[#fcfcf9] pt-2.5 pl-2.5 rounded-tl-[24px] z-10">
                  {/* Top Concave Scoop Curve (Vector Crisp) */}
                  <div className="absolute -top-6 right-0 w-6 h-6 pointer-events-none overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#fcfcf9]">
                      <path d="M24 0 A24 24 0 0 0 0 24 L24 24 Z" />
                    </svg>
                  </div>

                  {/* Left Concave Scoop Curve (Vector Crisp) */}
                  <div className="absolute bottom-0 -left-6 w-6 h-6 pointer-events-none overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#fcfcf9]">
                      <path d="M0 24 A24 24 0 0 0 24 0 L24 24 Z" />
                    </svg>
                  </div>

                  {/* The Signature Dark Green Floating Action / Submit Arrow Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquire(item);
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#57a42f] hover:bg-[#478726] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group/btn cursor-pointer"
                    aria-label={`View details for ${item.title}`}
                    title="View Details"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-5 h-5 text-[#65b938] animate-bounce" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-white stroke-[2.5] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* 2. Content Row 1: Title (Left) + Price (Right) */}
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-[#142319] group-hover:text-[#57a42f] transition-colors tracking-tight leading-snug truncate">
                  {item.title}
                </h3>
                <div className="shrink-0 flex items-baseline gap-0.5">
                  <span className="text-base sm:text-lg font-bold text-[#142319]">
                    {item.price}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {item.unit}
                  </span>
                </div>
              </div>

              {/* 3. Content Row 2: Short Description / Subtitle */}
              <p className="mt-1 text-xs sm:text-sm text-stone-500 font-normal leading-relaxed line-clamp-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Wholesale Advantage Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-[24px] bg-[#edf5ee] border border-[#d6ebd9] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#57a42f] text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6 text-[#fbbf24]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#0e2439]">
                Need Custom Container Packing or Private Labeling?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                We support custom branded jute sacks, vacuum pouches, and mixed container dispatches.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenQuoteModal("Custom Private Labeling & Container Sourcing")}
            className="shrink-0 px-6 py-3 rounded-full bg-[#57a42f] hover:bg-[#478726] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Request Container Rate</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
