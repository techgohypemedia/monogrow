"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Globe, Leaf, Sprout } from "lucide-react";

interface AboutHeroBrandStoryProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export default function AboutHeroBrandStory(_props: AboutHeroBrandStoryProps = {}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");
    const animations = new Set<Animation>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (reducedMotion.matches) return;
          const delay = parseInt((entry.target as HTMLElement).dataset.delay || "0", 10);
          const anim = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(32px)", filter: "blur(2px)" },
              { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
            ],
            { duration: 850, delay, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" }
          );
          animations.add(anim);
          anim.onfinish = () => animations.delete(anim);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fcfbf7] pt-32 sm:pt-40 pb-0 overflow-hidden"
      aria-labelledby="about-hero-title"
    >
      {/* ══════════════════════════════════════════════════════
          BLOCK 1 — Hero Intro
          ══════════════════════════════════════════════════════ */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Centered Heading & Food Beyond Borders below */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h1
            id="about-hero-title"
            data-reveal
            data-delay="0"
            className="font-serif font-bold text-[clamp(44px,6.5vw,88px)] leading-[1.05] tracking-tight text-[#1c1a16]"
          >
            About&nbsp;<span className="text-[#740707]">Monagrow</span>
          </h1>

          <p
            data-reveal
            data-delay="80"
            className="text-sm sm:text-base lg:text-[17px] font-bold uppercase tracking-[0.25em] text-[#740707] font-sans mt-3.5 sm:mt-4"
          >
            Food Beyond Borders
          </p>
        </div>

        {/* Two-column intro: big pull quote left + body right */}
        <div
          data-reveal
          data-delay="160"
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 mb-16 sm:mb-20"
        >
          {/* Pull quote */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-6 -left-3 font-serif text-[90px] leading-none text-[#740707]/10 select-none pointer-events-none"
            >
              &ldquo;
            </span>
            <p className="font-serif italic text-[clamp(20px,2.4vw,28px)] leading-[1.5] text-[#4a3c30] relative z-10">
              We believe great food should travel without limits.
            </p>
          </div>

          {/* Body copy */}
          <p className="text-[16px] sm:text-[17px] text-[#55524a] leading-[1.85] font-sans">
            Monagrow is a food and beverage import, export and wholesale distribution company.
            We connect trusted origins with businesses that care about quality:{" "}
            <strong className="font-semibold text-[#1c1a16]">
              premium rice, sugar, coffee and dry fruits
            </strong>
            , delivered with consistency, transparency and care.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BLOCK 2 — Global Presence (Luminous Radiant Maroon Gradient)
          ══════════════════════════════════════════════════════ */}
      <div className="relative bg-gradient-to-br from-[#7a0808] via-[#8c1111] to-[#5e0505] text-white overflow-hidden border-y border-[#9c1818]/40 shadow-inner">
        {/* Warm radiant lighting & gold auras (Luminous & vibrant, never dark) */}
        <div className="absolute top-0 left-1/4 w-[650px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(227,184,115,0.22)_0%,transparent_70%)] blur-2xl pointer-events-none" />
        <div className="absolute top-1/4 left-[-60px] w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35)_0%,transparent_60%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(235,50,50,0.25)_0%,transparent_65%)] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_60%,rgba(60,4,4,0.35)_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-26">
          {/* 1. Header Grid: Left = Title & Badge, Right = Narrative Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-16 items-end mb-14 sm:mb-16 pb-10 border-b border-white/20">
            {/* Left — Heading */}
            <div data-reveal data-delay="0" className="space-y-4">
              <h2 className="font-serif font-bold text-[clamp(32px,3.8vw,52px)] leading-[1.12] tracking-tight text-white">
                Connecting South Asian Sourcing<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e3b873] via-[#fae3b7] to-[#e3b873]">
                  to Global Markets
                </span>
              </h2>
            </div>

            {/* Right — Narrative Mission */}
            <div data-reveal data-delay="100" className="space-y-3">
              <p className="text-[16px] sm:text-[17px] text-white/95 leading-[1.8] font-sans">
                <strong className="text-white font-semibold">Monagrow Global Pvt. Ltd.</strong> was founded in 2026. From two complementary strategic hubs, we engineer direct-from-origin agricultural supply chains, connecting the world&apos;s finest origin ingredients to discerning businesses across the Gulf and beyond.
              </p>
            </div>
          </div>

          {/* 2. Dual Epicenters: Kathmandu & Dubai (Full-Width 2-Column Showcase) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-14">
            {/* Kathmandu Card */}
            <div
              data-reveal
              data-delay="160"
              className="group relative p-7 sm:p-8 rounded-3xl bg-white/[0.10] hover:bg-white/[0.15] border border-white/25 hover:border-[#e3b873]/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-[#e3b873] via-[#e3b873]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e3b873]/25 border border-[#e3b873]/40 flex items-center justify-center text-[#e3b873] shrink-0 shadow-[0_2px_12px_rgba(227,184,115,0.25)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[#e3b873] font-bold text-xs tracking-wider uppercase block">
                    Origin Desk &amp; Head Office
                  </span>
                  <h3 className="text-white font-serif font-bold text-xl sm:text-2xl tracking-tight">
                    Kathmandu, Nepal
                  </h3>
                </div>
              </div>
              <p className="text-white/90 text-sm sm:text-[14.5px] leading-relaxed font-sans mb-4">
                Leads direct origin sourcing, harvest mill partnerships, laboratory quality control, and export operations.
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/15 text-[11px] font-semibold text-white/85">
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">Mill Partnerships</span>
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">Laboratory QC</span>
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">Origin Harvests</span>
              </div>
            </div>

            {/* Dubai Card */}
            <div
              data-reveal
              data-delay="220"
              className="group relative p-7 sm:p-8 rounded-3xl bg-white/[0.10] hover:bg-white/[0.15] border border-white/25 hover:border-[#e3b873]/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-[#e3b873] via-[#e3b873]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e3b873]/25 border border-[#e3b873]/40 flex items-center justify-center text-[#e3b873] shrink-0 shadow-[0_2px_12px_rgba(227,184,115,0.25)]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[#e3b873] font-bold text-xs tracking-wider uppercase block">
                    Trade Desk &amp; Middle East Hub
                  </span>
                  <h3 className="text-white font-serif font-bold text-xl sm:text-2xl tracking-tight">
                    Dubai, UAE
                  </h3>
                </div>
              </div>
              <p className="text-white/90 text-sm sm:text-[14.5px] leading-relaxed font-sans mb-4">
                Runs international trade execution, maritime container logistics, and Middle East &amp; Gulf distribution.
              </p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/15 text-[11px] font-semibold text-white/85">
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">Trade Execution</span>
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">Maritime Freight</span>
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15">Gulf Distribution</span>
              </div>
            </div>
          </div>

          {/* 3. Partner Network Commercial Bar */}
          <div
            data-reveal
            data-delay="280"
            className="p-6 sm:p-7 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-5"
          >
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              <span className="text-xs uppercase tracking-[0.2em] text-[#e3b873] font-bold font-sans mr-2">
                Supplying:
              </span>
              {["Wholesalers", "Distributors", "Retail Chains", "Hotels & Resorts", "Cafés & Roasters", "Food Manufacturers"].map((partner) => (
                <span
                  key={partner}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/12 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 shadow-2xs"
                >
                  {partner}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-white/95 font-sans font-medium text-center lg:text-right shrink-0">
              Every partnership is built on supply they can count on.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BLOCK 3 — The Heritage of the Monal & Steadfast Growth
          ══════════════════════════════════════════════════════ */}
      <div className="relative bg-[#fcfbf7] border-t border-[#dfd5c6]/60 overflow-hidden">
        {/* Ambient background decorations */}
        <div className="absolute top-20 left-[-80px] w-[340px] h-[340px] rounded-full bg-[#740707]/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-[-60px] w-[280px] h-[280px] rounded-full bg-[#e3b873]/[0.07] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-32">

          {/* ── SECTION EYEBROW + TITLE (Centered, Full-Width) ── */}
          <div data-reveal data-delay="0" className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
            <h2 className="font-serif font-bold text-[clamp(34px,4.5vw,58px)] leading-[1.1] tracking-tight text-[#1c1a16] mb-6">
              The Heritage of the Monal &amp;{" "}
              <span className="text-[#740707]">Steadfast Growth</span>
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#55524a] leading-[1.9] font-sans">
              Our emblem is the{" "}
              <strong className="text-[#1c1a16] font-semibold">Himalayan Monal (Danphe)</strong>,
              the national bird of Nepal — a lasting symbol of pride, beauty and resilience.
            </p>
          </div>

          {/* ── EMBLEM CENTREPIECE + NARRATIVE (Two-Column) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 sm:mb-28">

            {/* LEFT — Logo Hero with decorative ring */}
            <div
              data-reveal
              data-delay="80"
              className="flex flex-col items-center text-center group"
            >
              {/* Decorative ring behind logo */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-[#740707]/[0.06] scale-[1.35] blur-2xl transition-all duration-700 group-hover:scale-[1.5] group-hover:bg-[#740707]/[0.1]" />
                <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-[#dfd5c6] bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_40px_rgba(116,7,7,0.08)] transition-all duration-500 group-hover:shadow-[0_16px_60px_rgba(116,7,7,0.14)] group-hover:-translate-y-1">
                  <Image
                    src="/assets/monagrow-official-logo.png"
                    alt="Official Monagrow Logo — the Himalayan Monal (Danphe)"
                    width={300}
                    height={150}
                    className="w-auto h-auto max-w-[160px] sm:max-w-[190px] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    priority
                  />
                </div>
                {/* Thin orbit ring */}
                <div className="absolute inset-[-12px] rounded-full border border-dashed border-[#740707]/20 transition-all duration-700 group-hover:border-[#740707]/40" />
              </div>

              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#740707] font-sans block">
                The Himalayan Monal &bull; Danphe
              </span>
              <p className="text-xs sm:text-[13px] text-neutral-500 font-sans mt-1.5">
                National Bird of Nepal &bull; Living Brand Crest
              </p>
            </div>

            {/* RIGHT — Story Narrative */}
            <div data-reveal data-delay="160" className="space-y-7">
              <p className="text-[16px] sm:text-[18px] text-[#55524a] leading-[1.9] font-sans">
                <strong className="text-[#1c1a16] font-semibold">Monagrow</strong> brings together{" "}
                <strong className="text-[#740707] font-semibold">Monal</strong> and{" "}
                <strong className="text-[#740707] font-semibold">grow</strong>. It reflects our roots
                in Nepal and our purpose: to grow partnerships, markets and trust. The vine and leaves
                around the Monal represent the harvests we bring to the world, and the sprouting leaf
                in our wordmark stands for steady, lasting growth.
              </p>

              {/* Two Symbol Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-7 border-t border-[#dfd5c6]">
                {/* Vine & Leaves */}
                <div className="group/card relative p-5 rounded-2xl bg-white border border-[#dfd5c6]/80 shadow-[0_2px_16px_rgba(116,7,7,0.05)] hover:shadow-[0_6px_28px_rgba(116,7,7,0.11)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r from-[#740707] to-[#740707]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#740707]/10 flex items-center justify-center shrink-0">
                      <Leaf className="w-3.5 h-3.5 text-[#740707]" />
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1c1a16]">
                      The Vine &amp; Leaves
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-sans">
                    Represent the bountiful agricultural harvests we bring from origin to the world.
                  </p>
                </div>

                {/* Sprouting Leaf */}
                <div className="group/card relative p-5 rounded-2xl bg-white border border-[#dfd5c6]/80 shadow-[0_2px_16px_rgba(116,7,7,0.05)] hover:shadow-[0_6px_28px_rgba(116,7,7,0.11)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r from-[#740707] to-[#740707]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#740707]/10 flex items-center justify-center shrink-0">
                      <Sprout className="w-3.5 h-3.5 text-[#740707]" />
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1c1a16]">
                      The Sprouting Leaf
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-sans">
                    Stands for steady, authentic and lasting growth across all our trade partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── THE UNION OF HERITAGE & GLOBAL GROWTH BANNER ── */}
          <div
            data-reveal
            data-delay="240"
            className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#dfd5c6]/80 shadow-[0_8px_32px_rgba(116,7,7,0.06)] hover:shadow-[0_16px_48px_rgba(116,7,7,0.12)] transition-all duration-500 bg-[#fbf8f2]"
          >
            <Image
              src="/assets/monagrow-heritage-growth-banner-v5.jpg"
              alt="The Union of Heritage & Global Growth — Monal + Grow = Monagrow"
              width={1024}
              height={401}
              className="w-full h-auto object-contain block select-none"
              priority
              quality={95}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
