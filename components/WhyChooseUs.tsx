"use client";

import React from "react";
import Image from "next/image";
import { 
  Leaf, 
  CheckCircle, 
  ArrowUpRight,
  FlaskConical,
  Truck
} from "lucide-react";

const HandSproutIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 11c0-3.5 3-5.5 6-5.5 0 3.5-2.5 5.5-6 5.5z" />
    <path d="M12 11c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4z" />
    <path d="M12 11v4" />
    <path d="M7 16c1.5 0 2.5.5 3.5 1.5l1.5 1.5a2 2 0 0 0 2.8 0l4.2-4.2a1.8 1.8 0 0 1 2.5 2.5l-4.5 4.5a3 3 0 0 1-2.1.9H9a4 4 0 0 1-4-4v-1.5" />
  </svg>
);

const TrustedHandsIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="7.5" r="2.5" />
    <path d="M9.5 7.5a2.5 2.5 0 0 1 5 0" />
    <path d="M7 14c1-1 2.5-1.5 4-1.5h2c1.5 0 3 .5 4 1.5" />
    <path d="M5 16.5c1.5 1.5 3 2.5 5 2.5h4c2 0 3.5-1 5-2.5" />
    <path d="M4 12c-1 1-1 3 0 4l3 3" />
    <path d="M20 12c1 1 1 3 0 4l-3 3" />
  </svg>
);

export default function WhyChooseUs({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (topic?: string) => void;
}) {
  const advantages = [
    {
      icon: FlaskConical,
      title: "100% Certified Lab Purity",
      subtitle: "Zero adulteration, verified standards.",
      desc: "Every single container shipment is rigorously tested by accredited laboratories for grain elongation, moisture, aflatoxin, and pesticide residue limits.",
      tag: "Lab Tested",
    },
    {
      icon: Truck,
      title: "Direct Port & Freight Logistics",
      subtitle: "Direct freight, seamless clearance.",
      desc: "We coordinate end-to-end multimodal logistics from agricultural processing mills directly to primary international seaports and container freight stations.",
      tag: "Global Freight",
    },
    {
      icon: HandSproutIcon,
      title: "Direct Origin Sourcing & Mill Network",
      subtitle: "Primary grower & mill contracts.",
      desc: "Direct supply agreements with audited cultivation clusters and processing mills across South Asia, guaranteeing stable commodity availability and physical grade consistency.",
      tag: "Origin Sourced",
    },
    {
      icon: TrustedHandsIcon,
      title: "Private Label & Custom Packing",
      subtitle: "Your brand, our manufacturing power.",
      desc: "Custom printed 1kg, 5kg, 10kg, 25kg, and 50kg bags in BOPP, non-woven, jute, or kraft paper tailored to your supermarket and wholesale distributor specs.",
      tag: "OEM Ready",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white relative scroll-mt-16">
      <div id="about" className="absolute -top-20" />
      <div id="about-us" className="absolute -top-20" />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fae8eb] text-[#800020] text-xs font-bold uppercase tracking-wider mb-4 border border-[#f3c4ce]">
            <span>THE MONAGROW ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439]">
            Why Global Importers & Wholesalers Partner With Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            Reliability, standard consistency, and transparent commodity pricing make Monagrow the preferred supplier for supermarket chains and bulk distributors.
          </p>
        </div>

        {/* Layout matching Reference 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Large Visual Feature Card - Crystal Clear Sunny Farm Landscape */}
          <div className="lg:col-span-5 relative rounded-[12px] overflow-hidden shadow-xl border border-stone-200 min-h-[480px] lg:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 text-white group">
            {/* Crystal-clear bright sunny terraced farm hills image */}
            <Image
              src="/assets/monagrow-sunny-hills.jpg"
              alt="Monagrow Agricultural Sourcing Region"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Soft bottom-only gradient so upper hills and blue sunny sky remain 100% bright and clear */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0e2439]/90 via-[#0e2439]/45 to-transparent pointer-events-none" />

            {/* Top Badge: "Direct Origin Sourcing" */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/60 text-xs font-bold text-[#0e2439] shadow-md">
                <Leaf className="w-3.5 h-3.5 text-[#800020] fill-[#800020]" />
                <span>Direct Origin Sourcing</span>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-3 mt-auto pt-10">
              <h3 className="text-2xl sm:text-3xl font-black font-serif leading-tight text-white drop-shadow-sm">
                Uncompromising Origin Quality & Grade Consistency
              </h3>
              <p className="text-xs sm:text-sm text-stone-100/95 leading-relaxed drop-shadow-sm">
                From primary agricultural origin belts to state-of-the-art optical laser sorting mills, our commercial supply chain guarantees standardized specifications in every container.
              </p>

              {/* "Partner as a Distributor" floating card directly referring to the screenshot */}
              <button
                type="button"
                onClick={() => onOpenQuoteModal("Logistics & Sourcing Partnership")}
                className="mt-3 inline-flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/95 hover:bg-white text-stone-900 shadow-xl backdrop-blur-md border border-white/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-left group/partner"
              >
                {/* 3 Circular Avatars + Maroon Badge */}
                <div className="flex items-center -space-x-2 shrink-0">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                    <Image
                      src="/assets/hero-farmer-crisp.jpg"
                      alt="Partner 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                    <Image
                      src="/assets/hero-farmer-test.jpg"
                      alt="Partner 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                    <Image
                      src="/assets/hero-farmer.jpg"
                      alt="Partner 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#800020] text-white border-2 border-white flex items-center justify-center text-[10px] font-black shadow-sm">
                    +3.2k
                  </div>
                </div>

                {/* Text referring to screenshot */}
                <div className="pr-1">
                  <span className="text-[10px] font-bold text-[#800020] uppercase tracking-wider block">
                    Join Wholesale Network
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0e2439] group-hover/partner:text-[#800020] transition-colors flex items-center gap-1.5">
                    Partner as a distributor
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#800020] group-hover/partner:translate-x-0.5 group-hover/partner:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right 4 Grid Cards matching reference */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[12px] p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div>
                    {/* Top Icon & Tag with Speech-Bubble Shaped Container from Screenshot */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl rounded-bl-[4px] bg-[#fae8eb] text-[#800020] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-white transition-all duration-300 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-[#0e2439] group-hover:text-[#800020] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#c89d3c] mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Bar: Preserves Standard Guaranteed without any arrow */}
                  <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-[#800020]">
                    <span>Standard Guaranteed</span>
                    <CheckCircle className="w-4 h-4 text-[#800020]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

