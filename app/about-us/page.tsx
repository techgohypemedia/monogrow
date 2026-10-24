"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Globe2,
  CheckCircle2,
  Boxes,
  Truck,
  FileCheck2,
  FlaskConical,
  Sparkles,
  ChevronRight,
  Anchor,
  Clock,
  Layers,
  Sprout,
  TrendingUp,
  MapPin,
  Check,
  RotateCw,
  X,
} from "lucide-react";

// The 4 Journey Milestones matching the requested S-curve winding ribbon layout
interface JourneyStage {
  id: string;
  phase: string;
  title: string;
  tagline: string;
  icon: typeof Sprout;
  iconBg: string;
  iconColor: string;
  description: string;
  highlightPill: string;
  features: string[];
  editorialImage: string;
  productCutout: string;
  productName: string;
  productWeight: string;
  align: "image-left" | "image-right";
  specs: { label: string; value: string }[];
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "genesis",
    phase: "Phase 01 · Origin Genesis",
    title: "From Humble Beginnings",
    tagline: "Direct Farm Partnerships in Himalayan Soil",
    icon: Sprout,
    iconBg: "#FAF1E6",
    iconColor: "#B45309",
    description:
      "Our story began in fertile Himalayan valleys, driven by a passion for pure agricultural harvests. What began with smallholder cooperatives has grown into a trusted origin brand known for ethical purity.",
    highlightPill: "100% Meltwater Fed · Zero Speculative Middlemen",
    features: [
      "Direct farmgate procurement with guaranteed fair compensation",
      "Traditional seed conservation and seasonal crop rotation",
      "Full digital lot traceability from rural mill to global port",
    ],
    editorialImage: "/assets/about-farm-estate.jpg",
    productCutout: "/assets/monagrow-rice-bag-cutout.png",
    productName: "1121 Supreme Basmati Rice",
    productWeight: "5kg Standup Box Bag",
    align: "image-left",
    specs: [
      { label: "Milled Grain Length", value: "8.9 mm+ Slender" },
      { label: "Cooked Elongation", value: "Over 2.2x Fluffiness" },
      { label: "Natural Aging", value: "2 Full Seasons Cured" },
      { label: "Sorting Grade", value: "100% Sortex Clean" },
    ],
  },
  {
    id: "standards",
    phase: "Phase 02 · Quality Architecture",
    title: "Milestones and Achievements",
    tagline: "Laser Optical Sorting & Certified Lab Verification",
    icon: Award,
    iconBg: "#FAF1E6",
    iconColor: "#B45309",
    description:
      "Over the years, we've achieved key milestones—implementing dual-camera laser Sortex optical cleaning across our mills, achieving ISO 22000 certification, and meeting strict global purity standards.",
    highlightPill: "0.01% Defect Threshold · Binding Lab COA",
    features: [
      "Dual-camera laser Sortex grain separation at microscopic scale",
      "Continuous moisture and polarization monitoring in accredited labs",
      "Third-party SGS and Bureau Veritas pre-shipment inspection seals",
    ],
    editorialImage: "/assets/about-purity-lab.jpg",
    productCutout: "/assets/monagrow-sugar-bag-cutout.png",
    productName: "Refined Cane Sugar ICUMSA 45",
    productWeight: "5kg Retail Pack",
    align: "image-right",
    specs: [
      { label: "Color Index", value: "ICUMSA 45 RBU Max" },
      { label: "Polarization", value: "99.85% Minimum" },
      { label: "Moisture Content", value: "Under 0.04% Pure" },
      { label: "Solubility", value: "Instant 100% Dissolve" },
    ],
  },
  {
    id: "innovation",
    phase: "Phase 03 · Preservation Technology",
    title: "Innovation and Growth",
    tagline: "High-Barrier Packaging & Aroma Lock Enclosures",
    icon: TrendingUp,
    iconBg: "#FAF1E6",
    iconColor: "#B45309",
    description:
      "Innovation has always guided our journey. In 2020, we introduced high-barrier packaging and GrainPro hermetic liners with degassing valves, locking in farm-fresh aroma for up to 24 months.",
    highlightPill: "GrainPro Hermetic Liners · Up to 24 Months Shelf Life",
    features: [
      "One-way degassing valves to preserve roasted specialty coffee aromatics",
      "Multi-ply BOPP standup box bags with moisture-resistant laminate",
      "Nitrogen-flushed retail pouches for cashew crunch preservation",
    ],
    editorialImage: "/assets/monagrow-studio-still.jpg",
    productCutout: "/assets/monagrow-coffee-bag-cutout.png",
    productName: "Specialty Estate Dark Arabica",
    productWeight: "2.5kg Valve Bag",
    align: "image-left",
    specs: [
      { label: "Estate Altitude", value: "1,400m - 1,850m MSL" },
      { label: "Specialty Score", value: "84+ Specialty Grade" },
      { label: "Roast Profile", value: "Slow Drum Roasted Dark" },
      { label: "Barrier Tech", value: "Degassing Valve Foil" },
    ],
  },
  {
    id: "reach",
    phase: "Phase 04 · Intermodal Network",
    title: "Our Global Reach",
    tagline: "Connecting Origin Mills with 18+ World Ports",
    icon: Globe2,
    iconBg: "#FAF1E6",
    iconColor: "#B45309",
    description:
      "Today, Monagrow serves institutional buyers worldwide. Scheduled container lines directly from deepwater maritime terminals ensure our commodities reach global destinations in pristine condition.",
    highlightPill: "18+ Deepwater Ports · CIF / FOB Incoterms",
    features: [
      "Direct carrier contracts with Maersk, MSC, and CMA CGM container lines",
      "Real-time GPS container tracking from dry port to ocean discharge",
      "End-to-end customs clearance documentation and phytosanitary certificates",
    ],
    editorialImage: "/assets/about-global-port.jpg",
    productCutout: "/assets/monagrow-cashews-packaging-new.png",
    productName: "Royal Whole Cashews W240",
    productWeight: "2.5kg Resealable Bag",
    align: "image-right",
    specs: [
      { label: "Grade Specification", value: "W240 King Size Whole" },
      { label: "Kernel Count", value: "220 - 240 / lb" },
      { label: "Nut Quality", value: "First Quality White" },
      { label: "Moisture Threshold", value: "Under 4.5% Butter Crunch" },
    ],
  },
];

// Interactive 3D Card with Mouse Parallax & Product Popout - Concentric with the Arc
function Journey3DCard({
  stage,
  curveSide,
}: {
  stage: JourneyStage;
  curveSide?: "left" | "right";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 6;
    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isLeft = curveSide === "left";
  const isRight = curveSide === "right";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden select-none group shadow-sm hover:shadow-lg transition-all duration-300 bg-neutral-100 ${
        isLeft
          ? "rounded-l-full rounded-r-2xl"
          : isRight
          ? "rounded-r-full rounded-l-2xl"
          : "rounded-2xl"
      }`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Editorial Image - Concentric with the arc */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${rotate.x * 0.4}deg) rotateY(${rotate.y * 0.4}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        <Image
          src={stage.editorialImage}
          alt={stage.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
        />
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
}

// Key Stats Banner
const STATS = [
  { num: "45,000+", label: "Metric Tons", sub: "Annual Export Capacity" },
  { num: "0%", label: "Broker Markup", sub: "Direct-Origin Mill Contracts" },
  { num: "18+", label: "Global Ports", sub: "Scheduled Container Lanes" },
  { num: "99.85%", label: "Purity Grade", sub: "Verified Polarization & Sortex" },
];

export default function AboutUsPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState("Monagrow Bulk Commodities");

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedProductForQuote(productName || "Monagrow Bulk Commodities");
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-[#800020] selection:text-white">
      {/* 3D Floating CSS Keyframes */}
      <style>{`
        @keyframes float3D {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(1deg);
          }
        }
        .animate-float {
          animation: float3D 4s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      <main className="flex-1">
        {/* ========================================================
            PAGE HERO HEADER (EXACT REFERENCE SCREENSHOT LAYOUT)
            Clean, elegant title case typography on pure white background
            ======================================================== */}
        <section className="pt-28 sm:pt-36 pb-8 sm:pb-12 text-center bg-white">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
            {/* Small subtle eyebrow matching screenshot */}
            <p className="text-xs sm:text-[13px] font-medium text-neutral-500 tracking-wide">
              Monagrow Provenance
            </p>

            {/* Main title in Title Case matching screenshot */}
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-900 tracking-tight leading-tight">
              The Monagrow Journey Story
            </h1>

            {/* Subtitle matching screenshot text and rhythm */}
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
              The Monagrow Journey: Delivering pure origin agricultural commodities with uncompromised integrity. Explore our story of direct Himalayan farming, laser optical sorting, hermetic preservation, and global port delivery.
            </p>
          </div>
        </section>

        {/* ========================================================
            THE CONTINUOUS S-CURVE SERPENTINE JOURNEY PIPELINE (EXACT REFERENCE)
            Deep Pine Green (#204b44) line wrapping around 4 tiers with 3D product popout
            ======================================================== */}
        <section className="pb-24 sm:pb-32 bg-white relative overflow-hidden">
          <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6">
            
            {/* DESKTOP S-CURVE SERPENTINE TRACK (>= 768px) */}
            <div className="hidden md:block relative w-full select-none">
              
              {/* ─── TIER 1: From Humble Beginnings (Left Card in Loop, Right Text) ─── */}
              <div className="relative w-full h-[260px] flex items-stretch">
                {/* Clean Top Bar for Tier 1 with rounded right cap at center */}
                <div className="absolute top-0 left-[145px] w-[calc(50%-145px)] h-[12px] bg-[#204b44] rounded-r-full z-20 pointer-events-none" />
                
                {/* Continuous Divider Line between Tier 1 and Tier 2 (bounded cleanly between arcs) */}
                <div className="absolute bottom-0 left-[145px] right-[145px] h-[12px] bg-[#204b44] z-20 pointer-events-none" />

                {/* Left 180° Arc Vector - Fully unclipped with 6px margin and overflow-visible */}
                <svg className="absolute top-0 bottom-0 left-0 w-[150px] h-[260px] pointer-events-none z-20 overflow-visible" viewBox="0 0 150 260" fill="none">
                  <path d="M 150 6 L 136 6 A 124 124 0 0 0 136 254 L 150 254" stroke="#204b44" strokeWidth="12" />
                </svg>

                {/* Left Half: Card 1 nested inside the green arc loop */}
                <div className="w-1/2 h-full relative z-10 pt-[22px] pb-[22px] pl-[28px] pr-4">
                  <Journey3DCard stage={JOURNEY_STAGES[0]} curveSide="left" />
                </div>

                {/* Right Half: Story Narrative */}
                <div className="w-1/2 h-full relative flex flex-col justify-center px-8 sm:px-10 py-6 z-10">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#B45309] shadow-2xs">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                      {JOURNEY_STAGES[0].title}
                    </h3>
                    <p className="text-[13.5px] text-neutral-600 leading-relaxed max-w-md">
                      {JOURNEY_STAGES[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* ─── TIER 2: Milestones and Achievements (Left Text, Right Card in Loop) ─── */}
              <div className="relative w-full h-[260px] -mt-[12px] flex items-stretch">
                {/* Continuous Divider Line between Tier 2 and Tier 3 (bounded cleanly between arcs) */}
                <div className="absolute bottom-0 left-[145px] right-[145px] h-[12px] bg-[#204b44] z-20 pointer-events-none" />

                {/* Right 180° Arc Vector - Fully unclipped with 6px margin and overflow-visible */}
                <svg className="absolute top-0 bottom-0 right-0 w-[150px] h-[260px] pointer-events-none z-20 overflow-visible" viewBox="0 0 150 260" fill="none">
                  <path d="M 0 6 L 14 6 A 124 124 0 0 1 14 254 L 0 254" stroke="#204b44" strokeWidth="12" />
                </svg>

                {/* Left Half: Story Narrative */}
                <div className="w-1/2 h-full relative flex flex-col justify-center px-8 sm:px-10 py-6 z-10">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#B45309] shadow-2xs">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                      {JOURNEY_STAGES[1].title}
                    </h3>
                    <p className="text-[13.5px] text-neutral-600 leading-relaxed max-w-md">
                      {JOURNEY_STAGES[1].description}
                    </p>
                  </div>
                </div>

                {/* Right Half: Card 2 nested inside the green arc loop */}
                <div className="w-1/2 h-full relative z-10 pt-[22px] pb-[22px] pr-[28px] pl-4">
                  <Journey3DCard stage={JOURNEY_STAGES[1]} curveSide="right" />
                </div>
              </div>

              {/* ─── TIER 3: Innovation and Growth (Left Card in Loop, Right Text) ─── */}
              <div className="relative w-full h-[260px] -mt-[12px] flex items-stretch">
                {/* Continuous Divider Line between Tier 3 and Tier 4 (bounded cleanly between arcs) */}
                <div className="absolute bottom-0 left-[145px] right-[145px] h-[12px] bg-[#204b44] z-20 pointer-events-none" />

                {/* Left 180° Arc Vector - Fully unclipped with 6px margin and overflow-visible */}
                <svg className="absolute top-0 bottom-0 left-0 w-[150px] h-[260px] pointer-events-none z-20 overflow-visible" viewBox="0 0 150 260" fill="none">
                  <path d="M 150 6 L 136 6 A 124 124 0 0 0 136 254 L 150 254" stroke="#204b44" strokeWidth="12" />
                </svg>

                {/* Left Half: Card 3 nested inside the green arc loop */}
                <div className="w-1/2 h-full relative z-10 pt-[22px] pb-[22px] pl-[28px] pr-4">
                  <Journey3DCard stage={JOURNEY_STAGES[2]} curveSide="left" />
                </div>

                {/* Right Half: Story Narrative */}
                <div className="w-1/2 h-full relative flex flex-col justify-center px-8 sm:px-10 py-6 z-10">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#B45309] shadow-2xs">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                      {JOURNEY_STAGES[2].title}
                    </h3>
                    <p className="text-[13.5px] text-neutral-600 leading-relaxed max-w-md">
                      {JOURNEY_STAGES[2].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* ─── TIER 4: Our Global Reach (Left Text, Right Card in Loop) ─── */}
              <div className="relative w-full h-[260px] -mt-[12px] flex items-stretch">
                {/* Continuous Bottom Bar terminating cleanly aligned with left arcs */}
                <div className="absolute bottom-0 left-[145px] right-[145px] h-[12px] bg-[#204b44] rounded-l-full z-20 pointer-events-none" />

                {/* Right 180° Arc Vector - Fully unclipped with 6px margin and overflow-visible */}
                <svg className="absolute top-0 bottom-0 right-0 w-[150px] h-[260px] pointer-events-none z-20 overflow-visible" viewBox="0 0 150 260" fill="none">
                  <path d="M 0 6 L 14 6 A 124 124 0 0 1 14 254 L 0 254" stroke="#204b44" strokeWidth="12" />
                </svg>

                {/* Left Half: Story Narrative */}
                <div className="w-1/2 h-full relative flex flex-col justify-center px-8 sm:px-10 py-6 z-10">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#B45309] shadow-2xs">
                      <Globe2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                      {JOURNEY_STAGES[3].title}
                    </h3>
                    <p className="text-[13.5px] text-neutral-600 leading-relaxed max-w-md">
                      {JOURNEY_STAGES[3].description}
                    </p>
                  </div>
                </div>

                {/* Right Half: Card 4 nested inside the green arc loop */}
                <div className="w-1/2 h-full relative z-10 pt-[22px] pb-[22px] pr-[28px] pl-4">
                  <Journey3DCard stage={JOURNEY_STAGES[3]} curveSide="right" />
                </div>
              </div>

            </div>

            {/* MOBILE TIMELINE (< 768px) */}
            <div className="md:hidden space-y-12 relative pl-6 border-l-4 border-[#204b44] ml-2">
              {JOURNEY_STAGES.map((stg, idx) => (
                <div key={stg.id} className="relative space-y-3.5 pt-1">
                  <div className="absolute -left-[35px] top-2 w-7 h-7 rounded-full bg-[#204b44] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                    0{idx + 1}
                  </div>
                  <div className="w-full h-[200px] sm:h-[220px]">
                    <Journey3DCard stage={stg} />
                  </div>
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF1E6] flex items-center justify-center text-[#B45309]">
                      <stg.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">{stg.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{stg.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            GLOBAL ACCREDITATIONS BADGE ROW
            ======================================================== */}
        <section className="py-14 bg-[#0e2439] text-white border-t border-neutral-800">
          <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <ShieldCheck className="w-7 h-7 text-[#fbbf24] mx-auto" />
                <p className="font-bold text-sm text-white">ISO 22000:2018</p>
                <p className="text-[11px] text-neutral-400">Certified Food Safety</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <FileCheck2 className="w-7 h-7 text-[#34d399] mx-auto" />
                <p className="font-bold text-sm text-white">SGS Verified</p>
                <p className="text-[11px] text-neutral-400">Pre-Shipment Container QC</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <CheckCircle2 className="w-7 h-7 text-[#60a5fa] mx-auto" />
                <p className="font-bold text-sm text-white">Sortex 100% Optical</p>
                <p className="text-[11px] text-neutral-400">Laser Grain Cleanliness</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <Award className="w-7 h-7 text-[#f472b6] mx-auto" />
                <p className="font-bold text-sm text-white">Phytosanitary Certified</p>
                <p className="text-[11px] text-neutral-400">Global Port Quarantine Pass</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CALL TO ACTION BANNER
            ======================================================== */}
        <section className="py-20 sm:py-24 bg-gradient-to-br from-[#4f0014] via-[#800020] to-[#a01c3c] text-white text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-black/30 blur-3xl pointer-events-none"
          />

          <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#ffd6a5]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Commercial Procurement</span>
            </span>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-tight"
              style={{
                fontFamily: "var(--font-bebas), var(--font-antonio), 'Impact', sans-serif",
              }}
            >
              Partner with Monagrow Origin Export Desk
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
              Request binding container quotations, sample presentation boxes, or verifiable laboratory certificates directly from our trade directors.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenQuoteModal("Commercial Trade Partnership")}
                className="px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-[#800020] font-extrabold text-sm uppercase tracking-wider shadow-2xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group hover:scale-105"
              >
                <span>Request Origin Samples &amp; Quote</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                href="/#calculator"
                className="px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm uppercase tracking-wider border border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer"
              >
                Volume Container Estimator
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCommodity={selectedProductForQuote}
      />
    </div>
  );
}
