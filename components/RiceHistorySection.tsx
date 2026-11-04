"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sprout,
  Mountain,
  Crown,
  Landmark,
  Ship,
  Sparkles,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { CommodityProduct } from "@/data/commodityData";
import styles from "./RiceHistorySection.module.css";

interface RiceHistorySectionProps {
  products: CommodityProduct[];
  onOpenQuoteModal?: (productName?: string) => void;
}

export default function RiceHistorySection({
  products,
}: RiceHistorySectionProps) {
  // Active variety filter tab
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Active era in the History Heritage timeline (Default: 8,000 BCE Paddy Domestication - Step 01)
  const [activeEraIndex, setActiveEraIndex] = useState<number>(0);

  // Parallax scroll tracking for 10,000-Year Heritage section
  const heritageSectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Active nutritional tab
  const [activeNutritionTab, setActiveNutritionTab] = useState<"white" | "brown" | "sella">("white");

  // Active FAQ index (hover to reveal)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active pillar in the Four Pillars accordion (Screenshot 1 Layout)
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  // Four Pillars Accordion Data (Matching Screenshot 1 Layout with Monagrow Luxury Palette & Reduced Content)
  const pillarsData = [
    {
      num: "01",
      badge: "GEOMETRY",
      title: "Kernel Architecture,",
      italicTitle: "long and slender.",
      desc: "Slender grains engineered by nature to elongate over 2.2 times their raw length upon boiling, preserving an immaculate separate texture without clumping.",
      pills: ["8.9mm+ Benchmark Length", "Over 2.2x Elongation", "Zero Clumping"],
      icon: Compass,
      bgGradient: "bg-gradient-to-br from-[#740707] via-[#5c0606] to-[#3a0404]",
      shortLabel: "01 · Kernel Architecture",
    },
    {
      num: "02",
      badge: "BIOCHEMISTRY",
      title: "Molecular Starch,",
      italicTitle: "firm and crystalline.",
      desc: "An optimal 23% amylose starch structure cured through natural two-season aging stabilizes kernel cellular integrity, ensuring light, fluffy rice with steady metabolic release.",
      pills: ["23% Amylose Starch", "Low Glycemic Index", "Two-Season Natural Aging"],
      icon: Sparkles,
      bgGradient: "bg-gradient-to-br from-[#541c15] via-[#3d130e] to-[#260a07]",
      shortLabel: "02 · Molecular Starch",
    },
    {
      num: "03",
      badge: "TERROIR",
      title: "Himalayan Terroir,",
      italicTitle: "fragrance born of snow.",
      desc: "Mineral-rich glacial meltwaters and crisp alpine night temperatures synthesize high concentrations of natural 2-AP volatile aroma, imparting toasted popcorn sweetness.",
      pills: ["Glacial Meltwater Inflow", "Natural 2-AP Aroma", "Protected Alpine GI"],
      icon: Mountain,
      bgGradient: "bg-gradient-to-br from-[#4a2618] via-[#361a0f] to-[#220f08]",
      shortLabel: "03 · Himalayan Terroir",
    },
    {
      num: "04",
      badge: "MILLING",
      title: "Sortex Precision,",
      italicTitle: "pure and defect-free.",
      desc: "High-resolution optical camera sorting and dual laser verification eliminate micro-debris and chalky grains, ensuring verified aerospace-grade 100% whole grain purity.",
      pills: ["Dual-Camera Laser Sortex", "Zero Broken Kernels", "Digital Lot Traceability"],
      icon: ShieldCheck,
      bgGradient: "bg-gradient-to-br from-[#2d221e] via-[#201815] to-[#140e0c]",
      shortLabel: "04 · Sortex Precision",
    },
  ];

  // Filter products for the Varieties Showcase
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "basmati") return p.id.includes("basmati");
    if (selectedFilter === "heritage") return p.id.includes("katarni") || p.id.includes("traditional");
    if (selectedFilter === "sella") return p.id.includes("sella");
    return true;
  });

  // History timeline milestones with icons & short text matching Step Timeline (Screenshot 2)
  const timelineMilestones = [
    {
      step: "STEP 01",
      era: "8,000 BCE",
      period: "8,000 – 7,000 BCE",
      title: "Paddy Domestication",
      shortDesc: "Neolithic farmers along the Yangtze basin domesticate wild grasses into settled river paddies.",
      region: "Yangtze River Valley",
      summary:
        "Archaeological excavations along the lower Yangtze basin confirm the transition from gathering wild Oryza rufipogon grasses to intentional paddy irrigation, giving birth to permanent river settlements.",
      milestone: "First archaeological evidence of flooded paddy dikes",
      significance: "Established rice as the foundational carbohydrate of emerging civilizations.",
      icon: Sprout,
      iconColor: "text-emerald-700",
    },
    {
      step: "STEP 02",
      era: "2,500 BCE",
      period: "3,000 – 2,500 BCE",
      title: "Himalayan Basmati",
      shortDesc: "Selective breeding in Indus glacial meltwater plains yields the slender fragrant 'Vāsamatī'.",
      region: "Indus River Basin & Himalayan Foothills",
      summary:
        "In the mineral-rich glacial meltwater floodplains of the Indus Valley and Vedic communities, farmers selectively bred indigenous indica varieties, producing the slender, naturally fragrant grain named 'Vāsamatī'.",
      milestone: "Vedic Sanskrit records designating 'Vāsamatī' (the fragrant grain)",
      significance: "Birthed the extra-long slender kernel unique to the Himalayan alpine terroir.",
      icon: Mountain,
      iconColor: "text-[#740707]",
    },
    {
      step: "STEP 03",
      era: "400 CE",
      period: "300 – 500 CE",
      title: "Silk Road Pilafs",
      shortDesc: "Overland caravans carry Himalayan grain to royal Persian courts, elevating it into festive pilafs.",
      region: "Persia, Mesopotamia & The Levant",
      summary:
        "Himalayan grain crossed overland mountain passes and Persian Gulf maritime routes, where royal Persian chefs perfected slow-steamed saffron pilafs and established Basmati as an imperial luxury commodity.",
      milestone: "Adoption across Persian and Mughal court banquets",
      significance: "Cemented rice aging and multi-layered steaming as elite culinary traditions.",
      icon: Crown,
      iconColor: "text-[#c89d3c]",
    },
    {
      step: "STEP 04",
      era: "1400 CE",
      period: "8th – 15th Century",
      title: "European Terraces",
      shortDesc: "Moors engineer canal networks into Spain and Italy's Po Valley, birthing paella and risotto.",
      region: "Spain (Al-Andalus) & Northern Italy",
      summary:
        "Moors engineered canal irrigation into Valencia and Seville, while cultivation later expanded into the damp plains of Lombardy and Piedmont, birthing Europe's rich Paella and Risotto gastronomic cultures.",
      milestone: "Founding of the Albufera and Po Valley wetland cultivation networks",
      significance: "Demonstrated rice adaptability across Mediterranean microclimates.",
      icon: Landmark,
      iconColor: "text-amber-800",
    },
    {
      step: "STEP 05",
      era: "1700 CE",
      period: "1600s – 1700s",
      title: "Transatlantic Trade",
      shortDesc: "Merchant vessels carry seed varieties across oceans, establishing tidal estate agriculture worldwide.",
      region: "Lowcountry Americas & Caribbean",
      summary:
        "Trading vessels carried seeds across the Atlantic, establishing large tidal wetland estates like Carolina Gold in coastal estuaries and fertile South American river deltas.",
      milestone: "Establishment of transatlantic rice commerce across five continents",
      significance: "Transformed rice into the primary international grain exchange commodity.",
      icon: Ship,
      iconColor: "text-sky-700",
    },
    {
      step: "STEP 06",
      era: "Present",
      period: "Modern Era",
      title: "Sortex Laser Purity",
      shortDesc: "Dual-camera optical laser sorting and GI certifications guarantee 100% purity and digital lot traceability.",
      region: "Himalayan Basmati Belt & Global Ports",
      summary:
        "Today, high-resolution optical camera sorting, laser purity verification, and strict Geographical Indication (GI) laws guarantee varieties like Monagrow 1121 Supreme deliver unmatched length, zero broken grains, and verifiable origin.",
      milestone: "Laser sortex 100% purity and digital lot-level origin certification",
      significance: "Unites ten millennia of botanical heritage with aerospace-grade sorting technology.",
      icon: Sparkles,
      iconColor: "text-[#740707]",
    },
  ];

  // Scroll-driven parallax listener for 10,000-Year Heritage section
  useEffect(() => {
    const section = heritageSectionRef.current;
    if (!section) return;

    let frame = 0;

    const onScroll = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const pinTop = 80; // sticky offset under fixed navbar
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // When above section, currentScrollTop < 0 -> progress 0 (Step 1)
      // While pinned in section, progress smoothly scrubs 0 -> 1 across steps 1 through 6
      // When scrolling finishes Step 6, section natural unpins and scrolls away to next section
      const currentScrollTop = pinTop - rect.top;
      const progress = Math.max(0, Math.min(1, currentScrollTop / totalScrollable));

      setScrollProgress(progress);

      // Map progress evenly into each of the 6 steps (0 to 5)
      const targetIndex = Math.min(
        timelineMilestones.length - 1,
        Math.max(0, Math.floor(progress * timelineMilestones.length))
      );

      setActiveEraIndex(targetIndex);
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [timelineMilestones.length]);

  // Click on milestone to smoothly scroll to its position in the timeline
  const handleSelectEra = (index: number) => {
    setActiveEraIndex(index);
    const section = heritageSectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const pinTop = 80;
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable > 0) {
      const stepProgress = (index + 0.5) / timelineMilestones.length;
      const targetScroll =
        window.scrollY +
        (rect.top - pinTop) +
        stepProgress * totalScrollable;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Nutritional profiles (per 100g cooked)
  const nutritionProfiles = {
    white: {
      name: "1121 Supreme White Basmati",
      calories: 130,
      carbs: 28,
      protein: 2.7,
      fiber: 0.6,
      gi: 52,
      giLabel: "Low GI (Slow Digestion)",
      description:
        "Naturally cured for two harvest cycles. High in amylose starch (23%), resulting in separate, elongated, fluffy grains that digest gradually without sudden glycemic spikes.",
      culinaryUse: "Biryani, Persian Chelow, Royal Pilafs, Saffron Steamed Rice",
    },
    brown: {
      name: "100% Whole Grain Brown Basmati",
      calories: 122,
      carbs: 25,
      protein: 3.1,
      fiber: 2.2,
      gi: 50,
      giLabel: "Ultra-Low GI (Whole Grain)",
      description:
        "100% unpolished with the mineral-dense outer bran and germ completely intact. Delivers quadruple the dietary fiber of white rice, rich in manganese, magnesium, and natural antioxidants.",
      culinaryUse: "Wellness Bowls, High-Fiber Salads, Daily Wholesome Steaming",
    },
    sella: {
      name: "1121 Golden Sella (Parboiled)",
      calories: 134,
      carbs: 29,
      protein: 2.9,
      fiber: 1.1,
      gi: 54,
      giLabel: "Low GI (Nutrient-Infused)",
      description:
        "Hydrothermally steamed under high pressure while still encased in the natural husk. Nutrients are driven into the kernel core, gelatinizing the starch for zero breakage during cooking.",
      culinaryUse: "Commercial Catering, Large-Scale Biryanis, Slow Stews",
    },
  };

  const activeNutri = nutritionProfiles[activeNutritionTab];

  // FAQ Accordion items
  const faqItems = [
    {
      question: "Why is Monagrow Basmati naturally aged for two full harvest seasons?",
      answer:
        "Aging reduces natural grain moisture to an optimal 11–12% while allowing internal enzymes to firm the kernel starch matrix. This prevents grains from breaking or becoming sticky upon boiling, allowing the cooked grain to elongate up to 2.2 times its raw length while remaining completely separate and feather-light.",
    },
    {
      question: "What gives authentic Himalayan Basmati its distinctive fragrance?",
      answer:
        "The delicate, toasted-popcorn fragrance stems from 2-acetyl-1-pyrroline (2-AP), an organic compound that synthesizes naturally in the grain during the Himalayan growing cycle. Alpine glacial meltwater, dramatic day-night temperature swings, and fertile alluvial soil work synergistically to concentrate this aroma.",
    },
    {
      question: "How does Brown Basmati differ nutritionally from White Basmati?",
      answer:
        "Brown Basmati is completely unpolished, preserving the outer bran and germ. It contains roughly four times the dietary fiber of white rice, higher concentrations of manganese, magnesium, and essential B-complex vitamins, while offering a nutty profile and firm, chewy grain bite.",
    },
    {
      question: "Why is Basmati recommended for low glycemic index (GI) diets?",
      answer:
        "Because of its high amylose starch concentration (over 22%) and dense crystalline cellular matrix, aged Basmati breaks down and digests significantly slower than ordinary short-grain or sticky rices. With a glycemic index between 50 and 58, it provides steady, prolonged metabolic energy.",
    },
    {
      question: "What is Golden Sella (parboiled) rice, and why is it preferred for catering?",
      answer:
        "Golden Sella undergoes a specialized hydrothermal steaming and pressure process while still in the husk before milling. This infuses the water-soluble vitamins from the bran directly into the kernel core and hardens the grain, making it practically impossible to overcook or turn mushy during catering service.",
    },
    {
      question: "What are the recommended storage protocols for maintaining grain freshness?",
      answer:
        "Dry raw white Basmati should be stored in an airtight container in a cool, dry pantry; because it contains no oils, it has an indefinite shelf life. Whole grain brown rice contains natural bran oils and should be kept in airtight bags in a cool pantry or refrigerator for up to 12 months.",
    },
  ];

  const activeEra = timelineMilestones[activeEraIndex];

  return (
    <div className={styles.sectionWrapper}>
      {/* ========================================================
          1. EDITORIAL HEADER (WARM BRAND PALETTE: CREAM & MAROON)
          ======================================================== */}
      <section className="relative py-20 sm:py-28 bg-[#FAF5EE] border-b border-[#dfd5c6]">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Majestic Serif Headline */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal text-[#231815] tracking-tight leading-snug max-w-3xl mx-auto">
            The Story, Origins &amp; Science of Rice
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#5a4d44] max-w-2xl mx-auto leading-relaxed font-normal">
            A comprehensive monograph on the grain that nourishes humanity—from ancient river valleys and starch biochemistry to our curated Himalayan cultivars.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. THE FOUR PILLARS OF RICE SCIENCE & CRAFT (EXPANDING ACCORDION - SCREENSHOT 1 DESIGN)
          ======================================================== */}
      <section id="the-four-pillars" className="py-20 sm:py-28 bg-[#FAF5EE] border-b border-[#dfd5c6]">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#231815] tracking-tight">
              What Makes Rice Different?
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#5a4d44] leading-relaxed">
              Every rice kernel is defined by kernel geometry, starch molecular ratios, soil terroir, and post-harvest precision.
            </p>
          </div>

          {/* Interactive Expanding Accordion Panels (Matching Screenshot 1 with Monagrow Luxury Palette & Reduced Content) */}
          <div className={styles.pillarAccordionContainer}>
            {pillarsData.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              const isExpanded = activePillarIndex === idx;

              return (
                <article
                  key={pillar.num}
                  onClick={() => setActivePillarIndex(idx)}
                  onMouseEnter={() => setActivePillarIndex(idx)}
                  className={`${styles.pillarAccordionCard} ${pillar.bgGradient} ${
                    isExpanded
                      ? styles.pillarAccordionCardExpanded
                      : styles.pillarAccordionCardCollapsed
                  }`}
                  aria-expanded={isExpanded}
                  role="button"
                  tabIndex={0}
                >
                  {isExpanded ? (
                    <>
                      {/* Giant Watermark Numeral */}
                      <span className={styles.watermarkNumeral} aria-hidden="true">
                        {pillar.num}
                      </span>

                      {/* Top Bar: Numeral & Icon Badge */}
                      <div className="relative z-10 flex items-center justify-between w-full mb-8">
                        <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/80 border border-white/25 rounded-full px-3.5 py-1 backdrop-blur-xs">
                          {pillar.num} · {pillar.badge}
                        </span>
                        <div className="w-11 h-11 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white backdrop-blur-md shadow-inner">
                          <PillarIcon className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Bottom Content Area */}
                      <div className="relative z-10 max-w-2xl mt-auto">
                        <h4 className="font-serif text-2xl sm:text-3xl md:text-[38px] font-normal text-white tracking-tight leading-snug mb-3">
                          {pillar.title}{" "}
                          <span className="italic font-light opacity-90">
                            {pillar.italicTitle}
                          </span>
                        </h4>

                        <p className="text-xs sm:text-sm md:text-[15px] text-white/85 leading-relaxed font-normal mb-6 max-w-xl">
                          {pillar.desc}
                        </p>

                        {/* Glassmorphic Feature Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                          {pillar.pills.map((pill) => (
                            <span
                              key={pill}
                              className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md transition-colors"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Collapsed State: Top Icon Badge */}
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 backdrop-blur-md shrink-0">
                        <PillarIcon className="w-5 h-5 stroke-[2]" />
                      </div>

                      {/* Collapsed Desktop: Vertical Rotated Label */}
                      <div className="hidden md:flex flex-1 items-center justify-center py-6">
                        <span className={styles.verticalText}>
                          {pillar.shortLabel}
                        </span>
                      </div>

                      {/* Collapsed Mobile: Horizontal Label */}
                      <div className="md:hidden flex-1 px-4 text-left">
                        <span className="text-sm font-bold text-white tracking-wide">
                          {pillar.shortLabel}
                        </span>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. 10,000-YEAR HERITAGE OF RICE (PARALLAX SCROLL WAVY TIMELINE)
          ======================================================== */}
      <section id="heritage-archive" ref={heritageSectionRef} className={styles.stickyHeritageSection}>
        <div className={styles.stickyHeritageInner}>
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-2.5">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-[#231815] tracking-tight">
                10,000-Year Heritage of Rice
              </h3>
              <p className="mt-0.5 text-xs text-[#5a4d44] leading-relaxed">
                From neolithic river paddies to Himalayan court banquets, trace historical milestones.
              </p>
            </div>

            {/* Continuous Wavy Dashed Step Timeline (matching Screenshot 2) */}
            <div className={styles.wavyTimelineWrapper}>
              <div className={styles.wavyTimelineScroll}>
                <div className={styles.wavyTimelineTrack}>
                  {/* SVG Wavy Inactive Dashed Ribbon */}
                  <svg
                    className={styles.wavySvgPath}
                    viewBox="0 0 1200 70"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 0,50 C 50,50 50,30 100,30 C 150,30 150,58 200,58 C 250,58 250,30 300,30 C 350,30 350,58 400,58 C 450,58 450,30 500,30 C 550,30 550,58 600,58 C 650,58 650,30 700,30 C 750,30 750,58 800,58 C 850,58 850,30 900,30 C 950,30 950,58 1000,58 C 1050,58 1050,30 1100,30 C 1150,30 1150,50 1200,50"
                      stroke="#dfd5c6"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                    />
                  </svg>

                  {/* SVG Wavy Active Progressive Stroke Animated with Scroll Parallax */}
                  <svg
                    className={styles.wavySvgPathActive}
                    viewBox="0 0 1200 70"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 0,50 C 50,50 50,30 100,30 C 150,30 150,58 200,58 C 250,58 250,30 300,30 C 350,30 350,58 400,58 C 450,58 450,30 500,30 C 550,30 550,58 600,58 C 650,58 650,30 700,30 C 750,30 750,58 800,58 C 850,58 850,30 900,30 C 950,30 950,58 1000,58 C 1050,58 1050,30 1100,30 C 1150,30 1150,50 1200,50"
                      stroke="#740707"
                      strokeWidth="3.5"
                      strokeDasharray="1250"
                      strokeDashoffset={
                        1250 -
                        Math.max(
                          0.08,
                          (activeEraIndex / (timelineMilestones.length - 1)) * 0.84 + 0.08
                        ) *
                          1250
                      }
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* 6 Step Nodes Grid - strictly scroll & click driven (no hover) */}
                  <div className={styles.wavyGrid}>
                    {timelineMilestones.map((m, idx) => {
                      const StepIcon = m.icon;
                      const isActive = activeEraIndex === idx;
                      return (
                        <div
                          key={m.era}
                          onClick={() => handleSelectEra(idx)}
                          className={styles.wavyStepItem}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isActive}
                          aria-label={`View era ${m.era}: ${m.title}`}
                        >
                          {/* Circle Node Icon sitting directly on the curve */}
                          <div
                            className={`${styles.wavyCircleNode} ${
                              isActive ? styles.wavyCircleActive : ""
                            }`}
                          >
                            <StepIcon
                              className={`w-5 h-5 ${m.iconColor} stroke-[2] transition-transform duration-300 ${
                                isActive ? "scale-110" : ""
                              }`}
                            />
                          </div>

                          {/* Step & Title Block */}
                          <div className="space-y-1 px-1 w-full">
                            <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.18em] uppercase text-[#740707] block">
                              {m.step} · {m.era}
                            </span>
                            <h4
                              className={`text-xs sm:text-[13px] font-bold transition-colors duration-200 leading-tight ${
                                isActive ? "text-[#740707]" : "text-[#231815]"
                              }`}
                            >
                              {m.title}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile swipe helper */}
              <div className="lg:hidden text-center mt-1 mb-2 text-[11px] text-[#5a4d44] flex items-center justify-center gap-1.5">
                <span>← Swipe horizontally to trace all 10,000 years →</span>
              </div>
            </div>

            {/* Featured Era Archive Dossier (Detail View of the Selected Milestone) */}
            <div
              key={activeEra.era}
              className={`${styles.eraCardActive} bg-white rounded-2xl p-4 sm:p-5 border border-[#dfd5c6] shadow-sm max-w-4xl mx-auto mt-2 sm:mt-2.5`}
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-4 sm:gap-6">
                {/* Left Column: Era Dossier */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#740707] text-white tracking-wider">
                      {activeEra.period}
                    </span>
                    <span className="text-xs font-semibold text-[#5a4d44]">
                      Region: <strong className="text-[#231815]">{activeEra.region}</strong>
                    </span>
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl lg:text-2xl font-normal text-[#231815] tracking-tight mb-1.5">
                    {activeEra.title}
                  </h4>

                  <p className="text-xs text-[#5a4d44] leading-relaxed mb-2.5 font-normal">
                    {activeEra.summary}
                  </p>

                  <div className="p-2.5 rounded-lg bg-[#FAF5EE] border-l-4 border-[#740707]">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#740707] block mb-0.5">
                      Archival Milestone
                    </span>
                    <p className="text-xs font-semibold text-[#231815] leading-snug">
                      {activeEra.milestone}
                    </p>
                  </div>
                </div>

                {/* Right Column: Agrarian Significance */}
                <div className="w-full md:w-64 p-3 sm:p-3.5 rounded-xl bg-[#FAF5EE] border border-[#dfd5c6] flex flex-col justify-between self-stretch">
                  <div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#740707] block mb-1">
                      Agrarian Significance
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#231815] leading-relaxed font-medium">
                      {activeEra.significance}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#dfd5c6]">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#5a4d44] block mb-0.5">
                      Monagrow Heritage Link
                    </span>
                    <p className="text-[10.5px] text-[#5a4d44] leading-relaxed">
                      Preserving authentic non-hybrid Himalayan rootstocks through verified agricultural farm trusts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. POPULAR RICE VARIETIES IN OUR COLLECTION (PURE INFO ONLY - NO QUOTE BUTTONS)
          ======================================================== */}
      <section id="monagrow-portfolio" className="py-14 sm:py-20 bg-white border-b border-[#dfd5c6]">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#231815] tracking-tight">
              Popular Rice Varieties in Our Collection
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#5a4d44] leading-relaxed">
              Explore physical parameters, aging standards, and dining attributes of authentic cultivars in our export portfolio.
            </p>
          </div>

          {/* Variety Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
            {[
              { id: "all", label: "All Portfolio Varieties" },
              { id: "basmati", label: "Extra Long Basmati" },
              { id: "heritage", label: "Heritage Fragrant" },
              { id: "sella", label: "Golden Sella Parboiled" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`${styles.filterPill} px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all ${
                  selectedFilter === tab.id
                    ? "bg-[#740707] text-white shadow-sm"
                    : "bg-white text-[#231815] hover:bg-[#FAF5EE] border border-[#dfd5c6]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Variety Cards Grid - PURE INFORMATION ONLY */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className={`${styles.productCard} bg-white rounded-xl p-5 border border-[#dfd5c6] hover:border-[#740707] transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Grain Pack Cutout Visual with Smooth Scale */}
                  <div className="relative w-full h-36 sm:h-40 flex items-center justify-center mb-3">
                    <div className={styles.productImageWrap}>
                      <Image
                        src={p.packImg}
                        alt={p.packAlt}
                        width={180}
                        height={240}
                        className="max-h-32 sm:max-h-36 w-auto object-contain drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* Kicker & Origin */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#740707]">
                      {p.kicker}
                    </span>
                    <span className="text-[10px] font-semibold text-[#5a4d44] bg-[#FAF5EE] px-2 py-0.5 rounded-full border border-[#dfd5c6]/60">
                      100% Sortex
                    </span>
                  </div>

                  {/* Product Title in Elegant Serif */}
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#231815] tracking-tight mb-1">
                    {p.name}
                  </h4>

                  {/* Tagline */}
                  <p className="text-xs font-medium text-[#740707] mb-2.5">
                    {p.tagline}
                  </p>
                </div>

                {/* Simplified Key Specs Pills (Reduced Content) */}
                <div className="pt-2.5 border-t border-[#dfd5c6]/60 flex flex-wrap gap-2">
                  {p.specs.slice(0, 2).map((sp) => (
                    <span
                      key={sp.label}
                      className="text-[11px] font-semibold text-[#5a4d44] bg-[#FAF5EE] px-3 py-1 rounded-full border border-[#dfd5c6]/60"
                    >
                      {sp.label}: <strong className="text-[#231815]">{sp.value}</strong>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. NUTRITIONAL SCIENCE PER 100g (WARM BRAND PALETTE: CREAM & WHITE)
          ======================================================== */}
      <section id="nutritional-science" className="py-20 sm:py-28 bg-[#FAF5EE] border-b border-[#dfd5c6]">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#231815] tracking-tight">
              Nutrition per 100 g (Cooked)
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#5a4d44] leading-relaxed">
              Compare macronutrient density, glycemic index rating, and dietary profiles across our key rice preparations.
            </p>
          </div>

          {/* Interactive Variety Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            <button
              type="button"
              onClick={() => setActiveNutritionTab("white")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeNutritionTab === "white"
                  ? "bg-[#740707] text-white shadow-md scale-105"
                  : "bg-white text-[#231815] hover:bg-neutral-100 border border-[#dfd5c6]"
              }`}
            >
              1121 White Basmati
            </button>
            <button
              type="button"
              onClick={() => setActiveNutritionTab("brown")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeNutritionTab === "brown"
                  ? "bg-[#740707] text-white shadow-md scale-105"
                  : "bg-white text-[#231815] hover:bg-neutral-100 border border-[#dfd5c6]"
              }`}
            >
              Whole Grain Brown
            </button>
            <button
              type="button"
              onClick={() => setActiveNutritionTab("sella")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeNutritionTab === "sella"
                  ? "bg-[#740707] text-white shadow-md scale-105"
                  : "bg-white text-[#231815] hover:bg-neutral-100 border border-[#dfd5c6]"
              }`}
            >
              Golden Sella (Parboiled)
            </button>
          </div>

          {/* Nutrition Card - Pure Brand Cream/White Palette */}
          <div
            key={activeNutritionTab}
            className={`${styles.tabContentFade} bg-white rounded-3xl p-8 sm:p-12 border border-[#dfd5c6] shadow-sm max-w-3xl mx-auto`}
          >
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-3 border-b border-[#dfd5c6] pb-6 mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#740707]">
                  Active Variety Profile
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#231815] mt-1">
                  {activeNutri.name}
                </h4>
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#740707]/10 text-[#740707] border border-[#740707]/20">
                {activeNutri.giLabel}
              </span>
            </div>

            {/* Macro Comparison Bars */}
            <div className="space-y-6">
              {/* Calories */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#5a4d44] mb-2">
                  <span>Energy / Caloric Value</span>
                  <span className="text-[#231815] font-bold">{activeNutri.calories} kcal</span>
                </div>
                <div className="h-2.5 w-full bg-[#FAF5EE] rounded-full overflow-hidden border border-[#dfd5c6]/40">
                  <div
                    className={`${styles.progressFill} h-full bg-[#740707] rounded-full`}
                    style={{ width: `${(activeNutri.calories / 160) * 100}%` }}
                  />
                </div>
              </div>

              {/* Carbohydrates */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#5a4d44] mb-2">
                  <span>Complex Carbohydrates (Slow Release)</span>
                  <span className="text-[#231815] font-bold">{activeNutri.carbs} g</span>
                </div>
                <div className="h-2.5 w-full bg-[#FAF5EE] rounded-full overflow-hidden border border-[#dfd5c6]/40">
                  <div
                    className={`${styles.progressFill} h-full bg-[#c89d3c] rounded-full`}
                    style={{ width: `${(activeNutri.carbs / 35) * 100}%` }}
                  />
                </div>
              </div>

              {/* Protein */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#5a4d44] mb-2">
                  <span>Plant Protein Content</span>
                  <span className="text-[#231815] font-bold">{activeNutri.protein} g</span>
                </div>
                <div className="h-2.5 w-full bg-[#FAF5EE] rounded-full overflow-hidden border border-[#dfd5c6]/40">
                  <div
                    className={`${styles.progressFill} h-full bg-[#740707] rounded-full`}
                    style={{ width: `${(activeNutri.protein / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Dietary Fiber */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#5a4d44] mb-2">
                  <span>Dietary Fiber &amp; Resistant Starch</span>
                  <span className="text-[#231815] font-bold">{activeNutri.fiber} g</span>
                </div>
                <div className="h-2.5 w-full bg-[#FAF5EE] rounded-full overflow-hidden border border-[#dfd5c6]/40">
                  <div
                    className={`${styles.progressFill} h-full bg-[#a47e27] rounded-full`}
                    style={{ width: `${(activeNutri.fiber / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Narrative & Culinary Recommendation */}
            <div className="mt-8 pt-6 border-t border-[#dfd5c6] space-y-3">
              <p className="text-xs sm:text-sm text-[#5a4d44] leading-relaxed">
                {activeNutri.description}
              </p>
              <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#dfd5c6] text-xs">
                <strong className="text-[#740707]">Ideal Culinary Preparation:</strong>{" "}
                <span className="text-[#231815]">{activeNutri.culinaryUse}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. STORAGE & PRESERVATION STANDARDS
          ======================================================== */}
      <section id="storage-standards" className="py-20 sm:py-28 bg-white border-b border-[#dfd5c6]">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#231815] tracking-tight">
              Storage and Food Safety Standards
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#5a4d44] leading-relaxed">
              Scientific protocols for preserving grain integrity and ensuring food safety across wholesale and kitchen environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage 01: Raw White Storage */}
            <div className={`${styles.luxuryCard} p-7 flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#740707] block mb-1">
                  STAGE 01
                </span>
                <h4 className="font-serif text-lg font-bold text-[#231815] mb-2.5">
                  Raw White &amp; Basmati Grain
                </h4>
                <p className="text-xs text-[#5a4d44] leading-relaxed font-normal">
                  Store in an airtight container in a cool, dry, and dark pantry. Because the outer lipid-containing bran is polished away, raw white Basmati has an indefinite shelf life when shielded from ambient humidity.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#dfd5c6] text-[11px] font-bold text-[#740707]">
                Indefinite shelf stability below 65% RH
              </div>
            </div>

            {/* Stage 02: Whole Grain Brown */}
            <div className={`${styles.luxuryCard} p-7 flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#740707] block mb-1">
                  STAGE 02
                </span>
                <h4 className="font-serif text-lg font-bold text-[#231815] mb-2.5">
                  Whole Grain Brown Rice
                </h4>
                <p className="text-xs text-[#5a4d44] leading-relaxed font-normal">
                  Because brown rice retains natural vegetable lipids in its outer bran, exposure to heat or oxygen causes oxidation. Store in sealed barrier packaging in a cool pantry or refrigerator for 6 to 12 months.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#dfd5c6] text-[11px] font-bold text-[#740707]">
                Refrigerate to preserve natural bran oils
              </div>
            </div>

            {/* Stage 03: Rapid Cooling Protocol */}
            <div className={`${styles.luxuryCard} p-7 flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#740707] block mb-1">
                  STAGE 03
                </span>
                <h4 className="font-serif text-lg font-bold text-[#231815] mb-2.5">
                  Rapid Cooling Protocol
                </h4>
                <p className="text-xs text-[#5a4d44] leading-relaxed font-normal">
                  Never leave cooked rice at room temperature for over 1 to 2 hours. Microscopic spores of <em>Bacillus cereus</em> survive boiling and multiply in warm rice; cool rapidly and refrigerate below 4°C immediately.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#dfd5c6] text-[11px] font-bold text-[#740707]">
                Refrigerate within 60 minutes of cooking
              </div>
            </div>

            {/* Stage 04: Reheating Standards */}
            <div className={`${styles.luxuryCard} p-7 flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#740707] block mb-1">
                  STAGE 04
                </span>
                <h4 className="font-serif text-lg font-bold text-[#231815] mb-2.5">
                  Reheating &amp; Consumption
                </h4>
                <p className="text-xs text-[#5a4d44] leading-relaxed font-normal">
                  Consume refrigerated cooked rice within 3 to 4 days. Always reheat until steaming hot throughout (at least 74°C / 165°F), and never reheat the same cooked batch more than once.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#dfd5c6] text-[11px] font-bold text-[#740707]">
                Heat to 74°C throughout before serving
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FREQUENTLY ASKED QUESTIONS (HOVER-TO-REVEAL ACCORDION)
          ======================================================== */}
      <section id="rice-faq-accordion" className="py-20 sm:py-28 bg-[#FAF5EE]">
        <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#231815] tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#5a4d44] leading-relaxed">
              Hover over any question below to immediately expand detailed culinary, biochemical, and storage guidance.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  onMouseEnter={() => setOpenFaqIndex(index)}
                  className={`${styles.faqCard} ${isOpen ? styles.faqCardActive : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-serif text-base sm:text-lg font-semibold pr-4 transition-colors duration-200 ${
                        isOpen ? "text-[#740707]" : "text-[#231815]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Minimalist Indicator: Rotates smoothly */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? "bg-[#740707] text-white border-[#740707] rotate-180"
                          : "bg-white text-[#740707] border-[#dfd5c6]"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Smooth Grid-Template-Rows Accordion Dropdown */}
                  <div
                    className={`${styles.faqGridCollapse} ${
                      isOpen ? styles.faqGridExpand : ""
                    }`}
                  >
                    <div className={styles.faqInner}>
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-[13.5px] text-[#5a4d44] leading-relaxed border-t border-[#dfd5c6]/40">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
