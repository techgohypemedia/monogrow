"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  ArrowUpRight,
  Check, 
  RotateCw, 
  Search,
  X,
  MessageCircle
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: "rice" | "coffee" | "sugar" | "dryfruits";
  tag: string;
  image: string;
  backImage?: string;
  origin: string;
  specs: {
    grade: string;
    packaging: string;
    moq: string;
    purityOrMoisture: string;
  };
  priceRange: string;
  features: string[];
  description: string;
  isFlagship?: boolean;
}

interface ProductSectionProps {
  selectedCategory: string;
  onOpenQuoteModal: (productName: string) => void;
}

export default function ProductSection({
  selectedCategory,
  onOpenQuoteModal,
}: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(selectedCategory || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [modalIsFlipped, setModalIsFlipped] = useState(false);

  const products: Product[] = [
    {
      id: "monagrow-basmati-5kg",
      name: "Monagrow Extra Long Grain Premium Basmati Rice",
      category: "rice",
      tag: "Flagship 5KG Pack",
      image: "/assets/monagrow-rice-bag-cutout.png",
      backImage: "/assets/rice-pack-back.jpg",
      origin: "Himalayan Foothills, Nepal & India",
      isFlagship: true,
      specs: {
        grade: "Size 8.9mm Extra Long Grain",
        packaging: "5kg Standup Box Bag (Master Cartons)",
        moq: "500 Bags (or 2.5 MT Container)",
        purityOrMoisture: "100% Pure, Naturally Aged",
      },
      priceRange: "$1.45 - $1.85 / kg (Bulk FOB)",
      description:
        "Carefully sourced from the finest paddy fields, naturally aged to perfection, and laser-processed to deliver extra long, slender grains with an exquisite aroma and non-sticky fluffiness upon cooking.",
      features: [
        "Aged to perfection for maximum cooked elongation over 2.2x",
        "Zero chalkiness, pearly white slender texture",
        "Complete nutritional facts, cooking instructions & barcode printed",
        "Packed & Exported by Monagrow Global Pvt Ltd, Kathmandu, Nepal",
      ],
    },
    {
      id: "monagrow-sella-1121",
      name: "Monagrow 1121 Golden Sella Parboiled Basmati",
      category: "rice",
      tag: "High Volume Catering",
      image: "/assets/rice-pack-front.jpg",
      origin: "Himalayan Basmati Belt",
      specs: {
        grade: "1121 Parboiled Golden Grain (8.4mm)",
        packaging: "25kg / 50kg Non-Woven & Jute Sacks",
        moq: "20 MT (1 x 20ft Container)",
        purityOrMoisture: "Moisture < 12.5%, Purity 98%",
      },
      priceRange: "$950 - $1,150 / Metric Ton",
      description:
        "Specially parboiled to seal in natural grain nutrients. Withstands commercial batch cooking and prolonged warming tables without breaking, making it the top choice for international hotels and catering distributors.",
      features: [
        "Extraordinary elongation ratio exceeding 2.2x",
        "Non-sticky golden hue, ideal for restaurant chains & biryani",
        "Extended shelf life up to 24 months with zero infestation",
      ],
    },
    {
      id: "monagrow-arabica-dark",
      name: "Monagrow Dark Arabica Roastery Blend",
      category: "coffee",
      tag: "Specialty Grade",
      image: "/assets/monagrow-coffee-bag-cutout.png",
      origin: "High Altitude Estates",
      specs: {
        grade: "Specialty Screen 18+ Whole Bean",
        packaging: "2.5kg Valve Bag / 25kg Bulk Box",
        moq: "500 kg Wholesale",
        purityOrMoisture: "Moisture < 11.5%, Slow Drum Roasted",
      },
      priceRange: "$4.60 - $5.50 / kg",
      description:
        "Slow-roasted dark Arabica blend crafted from handpicked high-altitude beans. Yields a full-bodied cup with tasting notes of bitter chocolate, roasted caramel, and toasted hazelnut.",
      features: [
        "Dark chocolate, honey, and roasted hazelnut cup profile",
        "One-way degassing valve foil packaging for aroma preservation",
        "Fresh batch roasted upon confirmed export dispatch",
      ],
    },
    {
      id: "monagrow-green-coffee",
      name: "High-Altitude Green Unroasted Coffee Beans",
      category: "coffee",
      tag: "Commercial Export",
      image: "/assets/monagrow-coffee-bag-cutout.png",
      origin: "Mountain Plantation Belt",
      specs: {
        grade: "Washed Arabica Plantation A",
        packaging: "60kg GrainPro Lined Jute Sacks",
        moq: "3 Metric Tons",
        purityOrMoisture: "Moisture 10-12%, Defect count < 5",
      },
      priceRange: "$3,800 - $4,200 / MT",
      description:
        "Clean, wet-processed unroasted green coffee beans ready for commercial roasters. Hermetically protected inside GrainPro liners to maintain stable cup freshness across sea freight voyages.",
      features: [
        "Single-origin mountain estate harvest",
        "GrainPro hermetic lining to prevent moisture loss",
        "Cupping score 84+ specialty threshold certified",
      ],
    },
    {
      id: "monagrow-white-sugar-icumsa",
      name: "Refined Cane Sugar Crystals (ICUMSA 45)",
      category: "sugar",
      tag: "Sparkling White",
      image: "/assets/monagrow-sugar-bag-cutout.png",
      origin: "Certified Agro Mills",
      specs: {
        grade: "ICUMSA 45 RBU (Food & Pharma Grade)",
        packaging: "50kg Poly-Lined Sacks & 1 MT Bags",
        moq: "25 Metric Tons",
        purityOrMoisture: "99.8% Polarization, Moisture < 0.04%",
      },
      priceRange: "$510 - $560 / Metric Ton",
      description:
        "High-purity refined crystal white cane sugar suitable for confectioneries, carbonated beverages, bakeries, and consumer packaging. Free flowing with 99.8% polarization minimum.",
      features: [
        "Free-flowing, dry sparkling crystal size 0.6mm",
        "Zero artificial chemical odors or yellow tinting",
        "Compliant with international Codex Alimentarius standards",
      ],
    },
    {
      id: "monagrow-raw-cane-sugar",
      name: "Crystal Gold Unrefined Raw Cane Sugar",
      category: "sugar",
      tag: "Natural Golden",
      image: "/assets/monagrow-sugar-bag-cutout.png",
      origin: "Cane Agro Mills",
      specs: {
        grade: "ICUMSA 600-1200 Natural Raw",
        packaging: "25kg / 50kg Heavy Jute Bags",
        moq: "10 Metric Tons",
        purityOrMoisture: "Rich Molasses Content, 98.2% Pol",
      },
      priceRange: "$480 - $520 / Metric Ton",
      description:
        "Natural raw cane sugar retaining delicious golden molasses minerals. Excellent for specialty artisan food brands, baking, and gourmet retail packaging.",
      features: [
        "Natural caramel aroma and mineral content",
        "Unbleached golden crystal structure",
        "High commercial demand across retail packaging and food service",
      ],
    },
    {
      id: "monagrow-w240-cashews",
      name: "Monagrow Royal W240 Whole Cashews",
      category: "dryfruits",
      tag: "Royal 2.5KG Pack",
      image: "/assets/monagrow-cashews-bag-cutout.png",
      origin: "Certified Cashew Plantations",
      specs: {
        grade: "White Whole W240 (220-240 nuts/lb)",
        packaging: "2.5kg Resealable Bag & 25lb Bulk Tins",
        moq: "500 kg Wholesale",
        purityOrMoisture: "Zero Infestation, Moisture < 5%",
      },
      priceRange: "$7.40 - $8.20 / kg",
      description:
        "King-size ivory whole cashew kernels hand-graded for flawless crescent curve and natural butter crunch.",
      features: [
        "Creamy buttery profile and unbroken crescent integrity",
        "Peeled with gentle optical and laser grading",
        "Available raw or custom slow roasted and salted",
      ],
    },
    {
      id: "monagrow-phool-makhana",
      name: "Monagrow Organic Phool Makhana (Jumbo)",
      category: "dryfruits",
      tag: "Organic 2.5KG Pack",
      image: "/assets/monagrow-makhana-bag-cutout.png",
      origin: "Wetland Organic Lotus Farms",
      specs: {
        grade: "Grade A 6+ Suta Jumbo Popped Seeds",
        packaging: "2.5kg Nitrogen Flush Pouch / 10kg Master Carton",
        moq: "500 kg Wholesale",
        purityOrMoisture: "100% Organic, Moisture < 8%",
      },
      priceRange: "$8.50 - $9.80 / kg",
      description:
        "Handpicked jumbo organic lotus seeds roasted and hygienically packed for superfood crunch and nutrition.",
      features: [
        "Superfood rich in protein, calcium, and antioxidants",
        "Nitrogen flushed zip-lock pouch for lasting crispness",
        "Export grade sorting with zero shell residues",
      ],
    },
  ];

  const currentTab = activeTab;

  const filteredProducts = products.filter((p) => {
    const matchesTab = currentTab === "all" || p.category === currentTab;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specs.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openProductModal = (product: Product) => {
    setActiveModalProduct(product);
    setModalIsFlipped(false);
  };

  const tabs = [
    { id: "all", label: "All Commodities" },
    { id: "rice", label: "Extra Long Rice" },
    { id: "dryfruits", label: "Royal Dry Fruits" },
    { id: "coffee", label: "Specialty Coffee" },
    { id: "sugar", label: "Refined & Raw Sugar" },
  ];

  return (
    <section id="products" className="py-20 bg-[#fcfcf9] relative border-t border-stone-200/80 w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fae8eb] text-[#800020] text-xs font-bold uppercase tracking-wider mb-3 border border-[#f3c4ce]">
              <span>B2B BULK CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439]">
              Featured Wholesale Lots & Packages
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Click any commodity card to inspect complete lab specifications, packaging options, and request instant container pricing.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search Basmati, Cashews, Makhana, Coffee, Sugar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] shadow-sm"
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#800020] text-white shadow-md shadow-[#800020]/25 scale-105"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid: Responsive Cards with Image -> Name -> 1-Line Description -> Maroon Button */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <p className="text-stone-600 font-medium">
              No commodities found matching &ldquo;{searchTerm}&rdquo;
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
              className="mt-3 text-xs font-bold text-[#800020] hover:underline cursor-pointer"
            >
              Reset filters & search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openProductModal(product)}
                className="group bg-white rounded-[8px] overflow-hidden border border-stone-200/90 hover:border-[#800020]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* 1. End-to-End Product Image */}
                  <div className="relative aspect-[4/3] w-full bg-[#f8f8f5] flex items-center justify-center p-3 border-b border-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Subtle Tag / Grade Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2.5 py-1 rounded-[4px] text-[10px] sm:text-[11px] font-bold bg-white/95 text-[#800020] border border-stone-200/80 shadow-xs">
                        {product.tag}
                      </span>
                    </div>
                  </div>

                  {/* 2. Below Image: Product Name & Price */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3
                        className="text-base font-bold text-stone-900 group-hover:text-[#800020] transition-colors leading-snug line-clamp-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      <span className="shrink-0 text-xs sm:text-sm font-bold text-[#800020] whitespace-nowrap pt-0.5">
                        {product.priceRange}
                      </span>
                    </div>

                    {/* 3. Below: Description */}
                    <p
                      className="text-xs sm:text-sm text-stone-500 font-normal leading-relaxed line-clamp-2"
                      title={product.description}
                    >
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULL PRODUCT DETAILS MODAL (Opens on Card Click) */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setActiveModalProduct(null)}
          />

          <div className="relative w-full max-w-4xl bg-white rounded-[12px] overflow-hidden shadow-2xl border border-stone-200 z-10 max-h-[92vh] flex flex-col">
            {/* Modal Top Header */}
            <div className="bg-[#0e2439] p-5 sm:p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#fbbf24] block mb-0.5">
                  Wholesale Commodity Specifications
                </span>
                <h3 className="text-lg sm:text-2xl font-black font-serif text-white">
                  {activeModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left: Product Image & Flip Option */}
                <div className="md:col-span-5 bg-stone-50 rounded-[8px] p-4 border border-stone-200 relative">
                  <div className="relative h-72 sm:h-80 w-full flex items-center justify-center">
                    <Image
                      src={
                        modalIsFlipped && activeModalProduct.backImage
                          ? activeModalProduct.backImage
                          : activeModalProduct.image
                      }
                      alt={activeModalProduct.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Flip button if back image exists */}
                  {activeModalProduct.backImage && (
                    <div className="mt-3 flex justify-center">
                      <button
                        onClick={() => setModalIsFlipped(!modalIsFlipped)}
                        className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-[#800020] text-xs font-bold border border-stone-300 shadow-sm flex items-center gap-2 transition-all"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>
                          {modalIsFlipped ? "View Front Pack" : "Flip to View Back Specs & Nutrition"}
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="mt-3 text-center text-xs font-semibold text-[#800020] bg-[#fae8eb] py-2 px-3 rounded-[6px] border border-[#f3c4ce]">
                    Indicative Price: {activeModalProduct.priceRange}
                  </div>
                </div>

                {/* Right: Detailed Wholesale Specs */}
                <div className="md:col-span-7 space-y-5">
                  <div>
                    <span className="text-xs font-bold text-[#c89d3c] uppercase tracking-wider">
                      Product Overview
                    </span>
                    <p className="mt-1 text-sm text-stone-700 leading-relaxed">
                      {activeModalProduct.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="bg-stone-50 rounded-[8px] p-4 border border-stone-200 space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500 font-medium">Standard Grade:</span>
                      <strong className="text-stone-900 font-bold">{activeModalProduct.specs.grade}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500 font-medium">Country / Origin:</span>
                      <strong className="text-stone-900 font-bold">{activeModalProduct.origin}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500 font-medium">Packaging Variants:</span>
                      <strong className="text-stone-900 font-bold">{activeModalProduct.specs.packaging}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-200">
                      <span className="text-stone-500 font-medium">Min Order Qty (MOQ):</span>
                      <strong className="text-[#800020] font-bold">{activeModalProduct.specs.moq}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-500 font-medium">Purity / Moisture Standards:</span>
                      <strong className="text-stone-900 font-bold">{activeModalProduct.specs.purityOrMoisture}</strong>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
                      Key Highlights & Quality Certifications
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {activeModalProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons inside modal */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const name = activeModalProduct.name;
                        setActiveModalProduct(null);
                        onOpenQuoteModal(name);
                      }}
                      className="flex-1 py-3.5 rounded-xl bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <span>Request Quotation / Proforma</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const text = encodeURIComponent(
                          `Hello Monagrow Global Wholesale! I want to inquire about container bulk pricing for: ${activeModalProduct.name}`
                        );
                        window.open(`https://wa.me/9779801234567?text=${text}`, "_blank");
                      }}
                      className="py-3.5 px-5 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>WhatsApp Desk</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
