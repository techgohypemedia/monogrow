"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Globe } from "lucide-react";

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
          BLOCK 2 — Global Presence (maroon band)
          ══════════════════════════════════════════════════════ */}
      <div className="bg-[#740707] text-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
            {/* Left — heading */}
            <div data-reveal data-delay="0">
              <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,46px)] leading-[1.15] tracking-tight text-white">
                Connecting South Asian Sourcing<br />
                <em className="not-italic text-[#c89d3c]">to Global Markets</em>
              </h2>
            </div>

            {/* Right — content */}
            <div data-reveal data-delay="120" className="space-y-8">
              <p className="text-[15px] sm:text-[16px] text-white leading-[1.9] font-sans">
                Monagrow Global Pvt. Ltd. was founded in 2026. From two complementary strategic hubs,
                we engineer direct-from-origin agricultural supply chains, connecting the world&apos;s finest
                origin ingredients to discerning businesses across the Gulf and beyond.
              </p>

              {/* Two hub rows */}
              <div className="space-y-6 pt-2">
                {/* Hub 1 */}
                <div
                  data-reveal
                  data-delay="180"
                  className="flex items-start gap-5 border-l-2 border-white/40 pl-5"
                >
                  <MapPin className="w-5 h-5 text-[#c89d3c] mt-1 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-base font-sans mb-0.5">
                      Kathmandu, Nepal &mdash;{" "}
                      <span className="text-[#c89d3c] font-semibold text-sm">Head Office &amp; Origin Desk</span>
                    </p>
                    <p className="text-white text-sm leading-relaxed font-sans">
                      Leads direct origin sourcing, harvest mill partnerships, laboratory quality control and export operations.
                    </p>
                  </div>
                </div>

                {/* Hub 2 */}
                <div
                  data-reveal
                  data-delay="240"
                  className="flex items-start gap-5 border-l-2 border-[#c89d3c] pl-5"
                >
                  <Globe className="w-5 h-5 text-[#c89d3c] mt-1 shrink-0" />
                  <div>
                    <p className="text-white font-bold text-base font-sans mb-0.5">
                      Dubai, UAE &mdash;{" "}
                      <span className="text-[#c89d3c] font-semibold text-sm">Trade Desk &amp; Middle East Hub</span>
                    </p>
                    <p className="text-white text-sm leading-relaxed font-sans">
                      Runs international trade execution, maritime container logistics, and Middle East &amp; Gulf distribution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Partner types */}
              <p
                data-reveal
                data-delay="300"
                className="text-white text-sm leading-relaxed font-sans border-t border-white/20 pt-6"
              >
                We partner with{" "}
                {["wholesalers", "distributors", "retail chains", "hotels", "restaurants", "cafés", "food manufacturers"].map((p, i, arr) => (
                  <span key={p}>
                    <strong className="text-white font-semibold">{p}</strong>
                    {i < arr.length - 1 ? ", " : ". "}
                  </span>
                ))}
                <span className="text-white font-semibold">Every partnership is built on supply they can count on.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BLOCK 3 — The Story Behind Our Name
          ══════════════════════════════════════════════════════ */}
      <div className="bg-[#fcfbf7]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
            {/* Left — logo + etymology */}
            <div data-reveal data-delay="0">
              <Image
                src="/assets/monagrow-official-logo.png"
                alt="Official Monagrow Logo — the Himalayan Monal (Danphe)"
                width={220}
                height={110}
                className="w-auto h-auto max-w-[180px] sm:max-w-[200px] object-contain mb-8"
              />
              {/* Word etymology */}
              <div className="space-y-1 font-sans">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif font-bold text-2xl text-[#740707]">Monal</span>
                  <span className="text-xs text-[#8b7e74] uppercase tracking-widest font-semibold">Himalayan roots</span>
                </div>
                <div className="text-black font-serif text-xl pl-1">+</div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif font-bold text-2xl text-[#740707]">grow</span>
                  <span className="text-xs text-[#8b7e74] uppercase tracking-widest font-semibold">Lasting purpose</span>
                </div>
                <div className="text-black font-serif text-xl pl-1">=</div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif font-bold text-2xl text-[#1c1a16]">Monagrow</span>
                </div>
              </div>
            </div>

            {/* Right — full story */}
            <div data-reveal data-delay="120" className="space-y-7">
              <h2 className="font-serif font-bold text-[clamp(26px,3vw,42px)] leading-[1.18] tracking-tight text-[#1c1a16]">
                The Himalayan Monal &amp;{" "}
                <span className="text-[#740707]">Steadfast Growth</span>
              </h2>

              <div className="space-y-5 text-[15px] sm:text-[16px] text-[#55524a] leading-[1.9] font-sans">
                <p data-reveal data-delay="180">
                  Our emblem is the{" "}
                  <strong className="text-[#1c1a16] font-semibold">Himalayan Monal (Danphe)</strong>,
                  the national bird of Nepal. It thrives high in the Himalayas, and its brilliant colours
                  have made it a lasting symbol of pride, beauty and resilience.
                </p>

                <p data-reveal data-delay="230">
                  <strong className="text-[#1c1a16] font-semibold">Monagrow</strong> brings together{" "}
                  <strong className="text-[#740707] font-semibold">Monal</strong> and{" "}
                  <strong className="text-[#740707] font-semibold">grow</strong>. It reflects our roots
                  in Nepal and our purpose: to grow partnerships, markets and trust. The vine and leaves
                  around the Monal represent the harvests we bring to the world, and the sprouting leaf
                  in our wordmark stands for steady, lasting growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
