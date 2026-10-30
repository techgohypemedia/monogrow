"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import AboutMonagrow from "@/components/AboutMonagrow";
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
  PackageCheck,
  Ship,
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

// Interactive 3D Card with Mouse Parallax
function Journey3DCard({
  stage,
}: {
  stage: JourneyStage;
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
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;
    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden select-none group shadow-md hover:shadow-xl border border-neutral-200/80 transition-all duration-300 bg-neutral-100"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${rotate.x * 0.4}deg) rotateY(${rotate.y * 0.4}deg) scale(${isHovered ? 1.03 : 1})`,
        }}
      >
        <Image
          src={stage.editorialImage}
          alt={stage.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 650px"
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
  const journeySectionRef = useRef<HTMLElement>(null);

  // Exact IntersectionObserver scroll reveal animation from Home Page AboutMonagrow
  useEffect(() => {
    const section = journeySectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (reduced.matches) return;

          const elements = entry.target.querySelectorAll(
            "[data-reveal-line], [data-reveal-card], p, h3, h2, li, a, :scope > svg"
          );
          elements.forEach((element, index) => {
            const isLine = element.hasAttribute("data-reveal-line");
            const isCard = element.hasAttribute("data-reveal-card");
            const isIcon = element.tagName.toLowerCase() === "svg";

            const animation = element.animate(
              [
                {
                  opacity: 0,
                  transform: isIcon
                    ? "translateY(14px) scale(.75) rotate(-12deg)"
                    : `translateY(${isLine ? 50 : (isCard ? 36 : 24)}px)`,
                  filter: "blur(3px)",
                },
                {
                  opacity: 1,
                  transform: "translateY(0) scale(1) rotate(0)",
                  filter: "blur(0px)",
                },
              ],
              {
                duration: isLine ? 1050 : 800,
                delay: Math.min(index * 90, 600),
                easing: "cubic-bezier(.22, 1, .36, 1)",
                fill: "backwards",
              }
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    section.querySelectorAll("[data-about-reveal]").forEach((el) => observer.observe(el));

    const stop = () => {
      if (reduced.matches) {
        animations.forEach((a) => a.cancel());
        animations.clear();
      }
    };
    reduced.addEventListener("change", stop);

    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
      reduced.removeEventListener("change", stop);
    };
  }, []);

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
            PAGE HERO & FOUNDATION: ABOUT MONAGROW
            Identical in styling, layout, and functionality to Home Page
            ======================================================== */}
        <AboutMonagrow onOpenQuoteModal={handleOpenQuoteModal} />

        {/* ========================================================
            THE MONAGROW JOURNEY STORY
            Alternating Editorial Presentation with Home Page About Monagrow Reveal Functionality
            ======================================================== */}
        <section
          ref={journeySectionRef}
          className="pt-16 sm:pt-24 pb-20 sm:pb-32 bg-white relative overflow-hidden"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center mb-14 sm:mb-20">
            <div data-about-reveal>
              <p className="text-xs sm:text-[13px] font-bold text-[#800020] uppercase tracking-[0.18em]">
                Origin Provenance &amp; Milestones
              </p>
              <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                <span className="block overflow-clip pb-[0.12em] -mb-[0.12em]">
                  <span data-reveal-line>The Monagrow Journey Story</span>
                </span>
              </h2>
              <p className="mt-3 text-xs sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
                Explore our four-phase path from fertile Himalayan soil to deepwater international ports—delivering pure origin agricultural commodities with uncompromised integrity.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="space-y-16 sm:space-y-20 lg:space-y-28">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={stage.id}
                    data-about-reveal
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-center"
                  >
                    {/* Visual Card (Alternates left / right on desktop matching screenshot) */}
                    <div
                      data-reveal-card
                      className={`w-full ${isEven ? "md:order-1" : "md:order-2"}`}
                    >
                      <Journey3DCard stage={stage} />
                    </div>

                    {/* Narrative Text (Alternates right / left on desktop matching screenshot) */}
                    <div
                      className={`space-y-3 sm:space-y-4 max-w-xl ${
                        isEven ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
                          {stage.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-[15px] font-semibold text-[#800020]/85 mt-1.5 sm:mt-2">
                          {stage.tagline}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm md:text-[15px] text-neutral-600 leading-relaxed font-normal">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            GLOBAL ACCREDITATIONS BADGE ROW
            ======================================================== */}
        <section className="py-14 bg-[#FAF9F6] border-y border-neutral-200/70">
          <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs space-y-1">
                <ShieldCheck className="w-7 h-7 text-[#800020] mx-auto" />
                <p className="font-bold text-sm text-neutral-900">ISO 22000:2018</p>
                <p className="text-[11px] text-neutral-500">Certified Food Safety</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs space-y-1">
                <FileCheck2 className="w-7 h-7 text-[#800020] mx-auto" />
                <p className="font-bold text-sm text-neutral-900">SGS Verified</p>
                <p className="text-[11px] text-neutral-500">Pre-Shipment Container QC</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs space-y-1">
                <CheckCircle2 className="w-7 h-7 text-[#800020] mx-auto" />
                <p className="font-bold text-sm text-neutral-900">Sortex 100% Optical</p>
                <p className="text-[11px] text-neutral-500">Laser Grain Cleanliness</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs space-y-1">
                <Award className="w-7 h-7 text-[#800020] mx-auto" />
                <p className="font-bold text-sm text-neutral-900">Phytosanitary Certified</p>
                <p className="text-[11px] text-neutral-500">Global Port Quarantine Pass</p>
              </div>
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
