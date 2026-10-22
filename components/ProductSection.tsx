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
      priceRange: "₹125 - ₹160 / kg",
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
      image: "/assets/monagrow-rice-bag-cutout.png",
      origin: "Himalayan Basmati Belt",
      specs: {
        grade: "1121 Parboiled Golden Grain (8.4mm)",
        packaging: "25kg / 50kg Non-Woven & Jute Sacks",
        moq: "20 MT (1 x 20ft Container)",
        purityOrMoisture: "Moisture < 12.5%, Purity 98%",
      },
      priceRange: "₹82,000 - ₹98,000 / MT",
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
      priceRange: "₹395 - ₹475 / kg",
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
      priceRange: "₹3,25,000 - ₹3,60,000 / MT",
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
      priceRange: "₹44,000 - ₹48,000 / MT",
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
      priceRange: "₹41,000 - ₹45,000 / MT",
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
      priceRange: "₹640 - ₹710 / kg",
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
      priceRange: "₹730 - ₹850 / kg",
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
    <section id="products" className="py-20 sm:py-24 bg-[#fcfcf9] relative border-t border-stone-200/80 w-full">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-[#800020] text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
              Bulk catalog
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
              Wholesale lots and packages
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
              Open any product for lab specifications, packaging options, and
              container pricing.
            </p>
          </div>

          <label className="relative w-full md:w-72 shrink-0">
            <span className="sr-only">Search products</span>
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-full bg-white border border-stone-200 text-sm text-navy placeholder:text-stone-400 focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15"
            />
          </label>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={`h-10 px-5 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#800020] border-[#800020] text-white"
                    : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <p className="text-stone-600">
              No products match &ldquo;{searchTerm}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
              className="mt-3 text-sm font-semibold text-navy underline underline-offset-4 decoration-stone-300 hover:decoration-[#800020] hover:text-[#800020] transition-colors cursor-pointer"
            >
              Clear search and filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => openProductModal(product)}
                className="group text-left bg-white rounded-3xl overflow-hidden border border-stone-200/80 hover:border-stone-300 transition-colors duration-200 flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/30"
              >
                {/* Image */}
                <div className="relative aspect-square w-full bg-[#f6f3ec]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 sm:p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    {product.tag}
                  </p>
                  <h3 className="mt-1.5 text-[15px] sm:text-base font-semibold text-navy leading-snug">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] text-stone-400">Wholesale</p>
                      <p className="text-sm font-semibold text-navy tabular-nums truncate">
                        {product.priceRange}
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-stone-200 text-navy flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[#800020] group-hover:border-[#800020] group-hover:text-white">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    </span>
                  </div>
                </div>
              </button>
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
