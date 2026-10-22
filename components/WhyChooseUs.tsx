"use client";

import React from "react";
import Image from "next/image";

interface PhotoCardProps {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
}

/** Full-bleed photo card with a quiet caption pinned to the bottom. */
function PhotoCard({ src, alt, eyebrow, title, text, className = "" }: PhotoCardProps) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden flex flex-col justify-end p-6 sm:p-7 text-white group ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent pointer-events-none"
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold leading-snug">
          {title}
        </h3>
        {text && (
          <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-sm">{text}</p>
        )}
      </div>
    </div>
  );
}

const PACKING_FACTS: { label: string; value: string }[] = [
  { label: "Bag sizes", value: "1, 5, 10, 25 and 50 kg" },
  { label: "Materials", value: "BOPP, non-woven, jute, kraft" },
  { label: "Quality system", value: "ISO 22000 graded lots" },
];

export default function WhyChooseUs({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (topic?: string) => void;
}) {
  return (
    <section id="why-choose-us" className="py-20 sm:py-24 bg-white relative scroll-mt-16">
      <div id="about" className="absolute -top-20" />
      <div id="about-us" className="absolute -top-20" />
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-[#800020] text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
            The Monagrow advantage
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
            Why importers and wholesalers partner with us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Consistent grades, transparent pricing, and dependable supply for
            supermarket chains and bulk distributors worldwide.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {/* Column 1 */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <PhotoCard
              src="/assets/why-rice-sheaves.jpg"
              alt="Rice sheaves and crop foliage at origin"
              eyebrow="Origin sourced"
              title="Direct origin sourcing and mill network"
              text="Supply agreements with audited growers and processing mills across South Asia keep availability and grade steady."
              className="min-h-90 sm:min-h-100"
            />
            <PhotoCard
              src="/assets/why-terrace-scenic.jpg"
              alt="Terraced farmland in South Asia"
              eyebrow="Primary cultivation belts"
              title="Farm clusters and processing mills"
              text="Single-origin basmati plains and volcanic coffee slopes grown under certified GAP standards."
              className="min-h-80 sm:min-h-90 flex-1"
            />
          </div>

          {/* Column 2: light card */}
          <div className="bg-[#f1f6f0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <p className="text-[#800020] text-[11px] font-semibold uppercase tracking-[0.18em]">
                Private label
              </p>
              <h3 className="mt-2 font-serif text-xl sm:text-2xl lg:text-[26px] font-semibold text-navy leading-snug">
                Custom packing under your brand
              </h3>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                Printed retail and bulk bags made to your supermarket or
                distributor specification, filled and sealed at the mill.
              </p>

              <dl className="mt-5 border-t border-[#d9e4d8]">
                {PACKING_FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[#d9e4d8]"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 shrink-0">
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-semibold text-navy text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => onOpenQuoteModal("Private Label Packing")}
                className="mt-5 text-sm font-semibold text-navy underline underline-offset-4 decoration-stone-300 hover:decoration-[#800020] hover:text-[#800020] transition-colors cursor-pointer"
              >
                Ask about private label
              </button>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden">
                <Image
                  src="/assets/why-grain-inspector.jpg"
                  alt="Quality inspector grading grain samples"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <p className="mt-3 text-xs text-stone-500">
                Optical grading and lab checks on every lot before dispatch.
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <PhotoCard
              src="/assets/why-freight-port.jpg"
              alt="Container terminal at a deep-sea port"
              eyebrow="Deep-sea freight"
              title="Direct port and multimodal marine transit"
              className="min-h-60 sm:min-h-65 lg:min-h-70"
            />
            <PhotoCard
              src="/assets/why-jute-sack.jpg"
              alt="Jute sacks of grain ready for export"
              eyebrow="Global freight"
              title="End-to-end freight and clearance"
              text="We coordinate logistics from processing mill to international seaport and container freight station."
              className="min-h-90 sm:min-h-100 flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
