"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import AboutHeroBrandStory from "@/components/AboutHeroBrandStory";
import AboutHeroSection from "@/components/AboutHeroSection";
import styles from "./AboutPage.module.css";


const PARTNER_PILLARS = [
  {
    id: "quality",
    label: "Quality",
    title: "Assured Quality",
    description: "Every product is checked and documented before it ships.",
    image: "/assets/about-purity-lab.jpg",
    alt: "Quality testing and purity analysis in laboratory",
  },
  {
    id: "supply",
    label: "Supply",
    title: "Reliable Supply",
    description: "We source through a trusted network of origins.",
    image: "/assets/about-harvest-origin.jpg",
    alt: "Agricultural harvest and trusted origin supply network",
  },
  {
    id: "trade",
    label: "Trade",
    title: "Transparent Trade",
    description: "Pricing, terms and documentation are always clear.",
    image: "/assets/about-global-port.jpg",
    alt: "Global shipping port, freight logistics and transparent trade",
  },
  {
    id: "partnership",
    label: "Partnership",
    title: "Partnership First",
    description: "Your growth is our growth.",
    image: "/assets/monagrow-studio-still.jpg",
    alt: "Packaged Monagrow commodities and wholesale partnerships",
  },
];

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
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#740707] selection:text-white">
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
            BRAND FOUNDATION STORY: ABOUT MONAGROW & LIVING EMBLEM
            Top of Page: Food Beyond Borders, Dual Hubs & The Monal
            ======================================================== */}
        <AboutHeroBrandStory onOpenQuoteModal={handleOpenQuoteModal} />

        {/* ========================================================
            PAGE HERO & PRODUCT SHOWCASE: ABOUT MONAGROW
            Matching Second Screenshot Design
            ======================================================== */}
        <AboutHeroSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* ========================================================
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
            {/* ========================================================
                WHY PARTNER WITH MONAGROW
                Image cards matching second screenshot content
                ======================================================== */}
            <div data-about-reveal className="mt-16 sm:mt-24 pt-2">
              <header className="mb-10 sm:mb-14 text-center">
                <h2 className="font-serif font-bold text-[28px] sm:text-[38px] text-black tracking-tight leading-tight">
                  Why Partner <span className="text-[#740707]">With Monagrow</span>
                </h2>
              </header>

              <div className={styles.storyGrid}>
                {PARTNER_PILLARS.map((pillar) => (
                  <article key={pillar.id} className={styles.storyCard} data-about-reveal>
                    <div className={styles.storyVisual} data-reveal-card>
                      <Image
                        src={pillar.image}
                        alt={pillar.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      />
                    </div>
                    <div className={styles.storyCopy}>
                      <span className={styles.storyLabel}>{pillar.label}</span>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            LET'S GROW TOGETHER - CONTACT & PARTNERSHIP
            Replaces Accreditations Section (Matching Second Screenshot)
            ======================================================== */}
        <section data-about-reveal className="py-16 sm:py-24 bg-white border-t border-neutral-200/70">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
            <header className="mb-6 sm:mb-8">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#740707] tracking-tight">
                Let&apos;s Grow Together
              </h2>
              <div className="w-full h-[2px] bg-[#740707] mt-2.5 mb-6 sm:mb-8" />
            </header>

            <p className="text-[16px] sm:text-[18px] text-neutral-800 leading-[1.8] font-sans mb-8 max-w-4xl">
              Whether you&apos;re stocking shelves, supplying kitchens or building your own brand, Monagrow is ready to serve you.
            </p>

            <div className="space-y-3.5 font-sans text-[15px] sm:text-[17px] text-neutral-800">
              <p>
                <strong className="font-bold text-[#740707]">Email:</strong>{" "}
                <a href="mailto:hello@monagrow.com" className="hover:underline text-neutral-900 font-medium">
                  hello@monagrow.com
                </a>
              </p>
              <p>
                <strong className="font-bold text-[#740707]">WhatsApp:</strong>{" "}
                <a href="https://wa.me/97153462527" target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-900 font-medium">
                  +971 53 462 527
                </a>
              </p>
              <p>
                <strong className="font-bold text-[#740707]">Website:</strong>{" "}
                <a href="https://monagrow.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-900 font-medium">
                  monagrow.com
                </a>
              </p>
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
