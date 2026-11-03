"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import AboutHeroSection from "@/components/AboutHeroSection";
import styles from "./AboutPage.module.css";
import { ShieldCheck, Award, CheckCircle2, FileCheck2 } from "lucide-react";

const JOURNEY_STAGES = [
  { id: "origin", title: "Rooted in good origins.", label: "Our beginnings", description: "Our story starts with growers and origin mills. Those relationships remain at the heart of everything we source.", image: "/assets/about-farm-estate.jpg", alt: "Sunlight across terraced agricultural fields in a mountain valley" },
  { id: "quality", title: "Care in every detail.", label: "Quality", description: "From sample to shipment, clear specifications guide the way.", image: "/assets/about-purity-lab.jpg", alt: "Agricultural product testing in a quality laboratory" },
  { id: "preservation", title: "Goodness, protected.", label: "Packaging", description: "Considered packaging helps preserve flavour, aroma and freshness.", image: "/assets/monagrow-studio-still.jpg", alt: "Packaged Monagrow rice, coffee and dry fruits" },
  { id: "reach", title: "A world of connections.", label: "Global reach", description: "Bringing origin ingredients to businesses across borders.", image: "/assets/about-global-port.jpg", alt: "Freight containers and vessels at a global shipping port" },
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
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#800020] selection:text-white">
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
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} glassEffect />

      <main className="flex-1">
        {/* ========================================================
            PAGE HERO & FOUNDATION: ABOUT MONAGROW
            Matching Second Screenshot Design
            ======================================================== */}
        <AboutHeroSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* ========================================================
            THE MONAGROW JOURNEY STORY        {/* ========================================================
            THE MONAGROW JOURNEY STORY
            Alternating Editorial Presentation with Home Page About Monagrow Reveal Functionality
            ======================================================== */}
        <section
          ref={journeySectionRef}
          className={styles.journey}
        >
          <div className={styles.journeyInner}>
            <header className={styles.journeyHeading} data-about-reveal>
              <h2>Good things<br /><span>grow from here.</span></h2>
              <p>A closer connection to the source.<br />Care that carries through every shipment.</p>
            </header>
            <article className={styles.originFeature} data-about-reveal>
              <div className={styles.originVisual} data-reveal-card>
                <Image src={JOURNEY_STAGES[0].image} alt={JOURNEY_STAGES[0].alt} fill sizes="(max-width: 767px) 100vw, 1200px" />
              </div>
              <div className={styles.originStory}>
                <span className={styles.storyLabel}>{JOURNEY_STAGES[0].label}</span>
                <h3>{JOURNEY_STAGES[0].title}</h3>
                <p>{JOURNEY_STAGES[0].description}</p>
              </div>
            </article>
            <div className={styles.storyGrid}>
              {JOURNEY_STAGES.slice(1).map(stage => (
                <article key={stage.id} className={styles.storyCard} data-about-reveal>
                  <div className={styles.storyVisual} data-reveal-card>
                    <Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 767px) 100vw, 400px" />
                  </div>
                  <div className={styles.storyCopy}>
                    <span className={styles.storyLabel}>{stage.label}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            GLOBAL ACCREDITATIONS BADGE ROW
            ======================================================== */}
        <section className={styles.companyOverview} aria-label="About Monagrow">
          <p>
            Monagrow is an agricultural commodity wholesaler and exporter connecting
            origin mills and growers with businesses around the world. Our collection
            includes basmati rice, estate coffee, dry fruits and refined cane sugar,
            with retail and bulk supply options to suit different markets. We work
            with buyers to understand their product specifications, packaging needs,
            order volumes and destinations, coordinating sourcing, sample evaluation
            and shipment requirements. From the first enquiry to the next order,
            our focus is on clear communication, carefully selected ingredients and
            lasting business relationships.
          </p>
        </section>

        <section className={`${styles.credentials} py-14 bg-[#FAF9F6] border-y border-neutral-200/70`}>
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
