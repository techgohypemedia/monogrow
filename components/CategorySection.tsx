"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Package, Shield, Scale, MapPin } from "lucide-react";

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenQuoteModal: (categoryName: string) => void;
}

export default function CategorySection({
  onSelectCategory,
  onOpenQuoteModal,
}: CategorySectionProps) {
  const categories = [
    {
      id: "rice",
      title: "Extra Long Grain Rice",
      tagline: "Naturally Aged Basmati & Sella",
      description:
        "Flagship 8.9mm Basmati rice cultivated in mineral-rich Himalayan paddy fields. Perfectly aged for non-sticky, aromatic fluffiness upon cooking.",
      image: "/assets/rice-pack-front.jpg",
      origin: "Himalayan Foothills, Nepal & India",
      moq: "1 Container (20-25 MT)",
      packaging: "5kg, 10kg, 25kg, 50kg PP/Jute Bags",
      capacity: "3,000 MT / Month",
      badge: "Flagship Category",
      color: "from-blue-900 to-[#0e2439]",
    },
    {
      id: "coffee",
      title: "Specialty Roasted & Green Coffee",
      tagline: "High-Altitude Arabica & Robusta",
      description:
        "Hand-picked mountain coffee cherries slowly drum-roasted or packed green. Deep chocolate and caramel tasting notes, vacuum packed for freshness.",
      image: "/assets/coffee-showcase.jpg",
      origin: "High Altitude Estates",
      moq: "5 Metric Tons",
      packaging: "2.5kg Valve Bags, 50kg Jute Sacks",
      capacity: "800 MT / Month",
      badge: "Specialty Grade",
      color: "from-amber-950 to-stone-900",
    },
    {
      id: "sugar",
      title: "Pure Refined & Raw Cane Sugar",
      tagline: "ICUMSA 45 White & Golden Crystal",
      description:
        "Pharmaceutical and beverage grade refined cane sugar crystals with 99.8% polarization. Also providing high-molasses golden raw crystal sugar.",
      image: "/assets/sugar-showcase.jpg",
      origin: "Certified Agro Mills",
      moq: "10 Metric Tons",
      packaging: "25kg, 50kg, 1 MT Jumbo Bags",
      capacity: "4,000 MT / Month",
      badge: "High Purity",
      color: "from-emerald-950 to-stone-900",
    },
    {
      id: "dryfruits",
      title: "Gourmet Dry Fruits & Nuts",
      tagline: "California Almonds, Cashews & Walnuts",
      description:
        "Top-tier whole almonds, jumbo W240 cashews, green pistachios, and golden raisins. Machine sorted, nitrogen flushed, and pest-free certified.",
      image: "/assets/dryfruits-showcase.jpg",
      origin: "California & International Orchards",
      moq: "2 Metric Tons",
      packaging: "1kg, 5kg, 10kg Vacuum Foil Boxes",
      capacity: "1,200 MT / Month",
      badge: "Premium Harvest",
      color: "from-amber-900 to-stone-900",
    },
  ];

  return (
    <section id="categories" className="py-20 bg-white relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5ec] text-[#1b5e20] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c3e6cd]">
            <span>WHOLESALE COMMODITY CATEGORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439]">
            Four Core Pillars of Agricultural Excellence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            Sourced directly from verified growers, standardized in ISO-certified processing facilities, and dispatched globally with complete export compliance.
          </p>
        </div>

        {/* Categories Grid (2x2 luxury layout matching reference aesthetics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-[#fbfbf8] rounded-[12px] border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8">
                {/* Top Badge & Tagline */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-[6px] text-xs font-bold bg-[#0e2439] text-[#fbbf24]">
                    {cat.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#1c4a27]">
                    {cat.tagline}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#0e2439] group-hover:text-[#1c4a27] transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
                  {cat.description}
                </p>

                {/* Image Showcase Card */}
                <div className="mt-6 relative h-64 sm:h-72 w-full rounded-[10px] overflow-hidden bg-stone-100 border border-stone-200">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Origin Overlay Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/90 backdrop-blur-md text-xs font-bold text-stone-800 shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#1c4a27]" />
                    <span>Origin: {cat.origin}</span>
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-[10px] border border-stone-200/80">
                  <div>
                    <span className="text-stone-400 block font-medium">Min Order Qty</span>
                    <strong className="text-stone-800 font-bold">{cat.moq}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Supply Capacity</span>
                    <strong className="text-stone-800 font-bold">{cat.capacity}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-stone-400 block font-medium">Packaging</span>
                    <strong className="text-stone-800 font-bold truncate block">{cat.packaging}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="px-6 sm:px-8 py-4 bg-stone-100/70 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1c4a27] hover:text-[#0e2439] transition-colors"
                >
                  <span>View Products in {cat.title.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenQuoteModal(`Bulk Category Quote: ${cat.title}`)}
                  className="px-4 py-2 rounded-[8px] bg-[#0e2439] hover:bg-[#1c4a27] text-white text-xs font-bold transition-all"
                >
                  Request Bulk Rate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
