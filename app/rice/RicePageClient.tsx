"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RiceHeroTransition from "@/components/RiceHeroTransition";
import styles from "./RiceProducts.module.css";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";
import QuoteModal from "@/components/QuoteModal";
import {
  COMMODITY_CATEGORIES,
  getProductsByCategory,
} from "@/data/commodityData";
import {
  CheckCircle2,
} from "lucide-react";

export default function RicePageClient() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCommodityForQuote, setSelectedCommodityForQuote] = useState(
    "Basmati Rice (1121 Supreme)"
  );

  const category = COMMODITY_CATEGORIES["rice"];
  const products = getProductsByCategory("rice");

  const handleOpenQuoteModal = (productName?: string) => {
    setSelectedCommodityForQuote(productName || "Basmati Rice (1121 Supreme)");
    setIsQuoteModalOpen(true);
  };

  // Other categories for cross-navigation
  const otherCategories = Object.values(COMMODITY_CATEGORIES).filter(
    (c) => c.key !== "rice"
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-[#800020] selection:text-white">
      {/* 1. Top Navbar with immersiveHero (matches main page hero styling) */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} immersiveHero />

      <main className="flex-1 relative">
        {/* Floating smooth pop-out transition from Hero to Basmati Product Card */}
        <RiceHeroTransition />

        {/* ========================================================
            2. HERO SECTION FROM MAIN PAGE
            Copied with all functionality, colors, animations,
            GSAP scrub, Lenis smooth scroll, particles & interactive scene
            ======================================================== */}
        <Hero
          filterProduct="rice"
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* ========================================================
            4. RICE PRODUCT SHOWCASE CARDS (1121 BASMATI & KATARNI)
            ======================================================== */}
        <section id="rice-collection" className={styles.section}>
          <div className={styles.inner}>
            <header className={styles.header}>
              <h2>Find your rice.</h2>
              <span>Monagrow · From origin to your table</span>
            </header>
            {products.map((product, index) => (
              <article key={product.id} id={product.id} className={styles.product}>
                <div className={styles.visual}>
                  <div id={index === 0 ? "rice-target-pack" : undefined} className={styles.pack}>
                    <Image src={product.packImg} alt={product.packAlt} fill className="object-contain drop-shadow-xl" sizes="(max-width: 767px) 200px, 250px" />
                  </div>
                  <div id={index === 0 ? "rice-target-bowl" : undefined} className={styles.bowl}>
                    <Image src={product.bowlImg} alt={product.bowlAlt} fill className="object-contain drop-shadow-lg" sizes="(max-width: 767px) 115px, 145px" />
                  </div>
                  <p className={styles.caption}>{product.originBadge}</p>
                </div>
                <div data-rice-details={index === 0 ? "" : undefined} className={styles.details}>
                  <p className={styles.kicker}>{product.kicker}</p>
                  <h3>{product.name}</h3>
                  <p className={styles.tagline}>{product.tagline}</p>
                  <p className={styles.description}>{product.description}</p>
                  <dl className={styles.specs}>
                    {product.specs.map(spec => (
                      <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
                    ))}
                  </dl>
                  <div className={styles.actions}>
                    <button type="button" className={styles.quote} onClick={() => handleOpenQuoteModal(product.quoteName)}>
                      Request a quote
                    </button>
                    <Link href="/#calculator" className={styles.link}>Estimate container volume</Link>
                  </div>
                  <details className={styles.more}>
                    <summary>Packaging &amp; sourcing details</summary>
                    <div className={styles.extra}>
                      <div className={styles.formats}>
                        <div><h4>Retail packaging</h4><ul>{product.retailSizes.map(size => <li key={size}>{size}</li>)}</ul></div>
                        <div><h4>Wholesale &amp; bulk</h4><ul>{product.bulkSizes.map(size => <li key={size}>{size}</li>)}</ul></div>
                      </div>
                      <h4>Sourcing highlights</h4>
                      <ul className={styles.highlights}>{product.keyHighlights.map(highlight => <li key={highlight}><CheckCircle2 size={13} /><span>{highlight}</span></li>)}</ul>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================
            5. RICE QUALITY & EXPORT READINESS
            ======================================================== */}
        <section className={styles.quality} aria-labelledby="rice-quality-heading">
          <div className={styles.inner}>
            <div className={styles.qualityHeading}>
              <div>
                <p className={styles.kicker}>Care at every step</p>
                <h2 id="rice-quality-heading">Good rice starts<br />long before your kitchen.</h2>
              </div>
              <p>From natural ageing to careful packing, discover the process behind every Monagrow rice lot.</p>
            </div>
            <div className={styles.qualityLayout}>
              <a href="#basmati-rice" className={styles.qualityProduct}>
                <span className={styles.kicker}>Meet the finished product</span>
                <div className={styles.qualityPack}>
                  <Image src={products[0].packImg} alt={products[0].packAlt} fill sizes="(max-width: 767px) 180px, 210px" className="object-contain drop-shadow-xl" />
                </div>
                <span className={styles.qualityProductName}>1121 Supreme Basmati</span>
                <span className={styles.link}>View product details</span>
              </a>
              <ol className={styles.qualitySteps}>
                {category.qualityBullets.map((bullet, index) => (
                  <li key={bullet.title}>
                    <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                    <h3>{bullet.title}</h3>
                    <p>{bullet.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. EXPLORE OTHER COMMODITIES
            ======================================================== */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#800020]">
                  Monagrow Product Portfolio
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                  Explore Other Commodities
                </h3>
              </div>
              <Link
                href="/categories"
                className="text-xs sm:text-sm font-bold text-[#800020] hover:text-[#520014] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View All 5 Commodities</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherCategories.map((other) => (
                <Link
                  key={other.key}
                  href={`/${other.slug}`}
                  className="group p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-[#800020]/40 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020]">
                      Monagrow {other.navName}
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900 group-hover:text-[#800020] transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {other.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#800020] border-t border-neutral-200/60 mt-4">
                    <span>View {other.navName} Specifications</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            7. DIRECT CONTAINER SOURCING CTA BANNER
            ======================================================== */}
        <section className="py-12 bg-gradient-to-r from-[#800020] to-[#5a0016] text-white">
          <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF9F6]/80">
                  Global Container Logistics &amp; CIF Contracts
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Source Monagrow Rice Directly from Origin
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 font-normal">
                  Inquire about full container loads (FCL), palletized export,
                  custom retail bagging, and SGS pre-shipment inspection.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenQuoteModal(products[0]?.quoteName)}
                  className="px-6 py-3 rounded-full bg-white text-[#800020] hover:bg-neutral-100 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Request Instant Quote</span>
                </button>

                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 transition-colors"
                >
                  Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Interactive Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCommodity={selectedCommodityForQuote}
      />
    </div>
  );
}
