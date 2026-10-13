"use client";

import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  Leaf, 
  Truck, 
  Award, 
  Globe2, 
  CheckCircle, 
  ArrowUpRight
} from "lucide-react";

export default function WhyChooseUs({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (topic?: string) => void;
}) {
  const advantages = [
    {
      icon: ShieldCheck,
      title: "100% Certified Lab Purity",
      subtitle: "Zero adulteration, verified standards.",
      desc: "Every single container shipment is rigorously tested by accredited laboratories for grain elongation, moisture, aflatoxin, and pesticide residue limits.",
      tag: "Lab Tested",
    },
    {
      icon: Truck,
      title: "Farm-to-Port Export Logistics",
      subtitle: "Direct freight, seamless clearance.",
      desc: "We coordinate end-to-end multimodal logistics from agricultural processing mills directly to primary international seaports and container freight stations.",
      tag: "Global Freight",
    },
    {
      icon: Leaf,
      title: "Sustainable & Ethical Farming",
      subtitle: "Direct farmer partnerships.",
      desc: "Partnered directly with over 3,200 rural farming families across Nepal and India, ensuring fair trade purchase prices and zero harmful synthetic residues.",
      tag: "Eco Integrity",
    },
    {
      icon: Award,
      title: "Private Label & Custom Packing",
      subtitle: "Your brand, our manufacturing power.",
      desc: "Custom printed 1kg, 5kg, 10kg, 25kg, and 50kg bags in BOPP, non-woven, jute, or kraft paper tailored to your supermarket and wholesale distributor specs.",
      tag: "OEM Ready",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5ec] text-[#1b5e20] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c3e6cd]">
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
          {/* Left Large Visual Feature Card */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 min-h-[420px] flex flex-col justify-end p-8 text-white group">
            <Image
              src="/assets/hero-harvest.jpg"
              alt="Monagrow Terraced Organic Farm"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e2439]/95 via-[#0e2439]/40 to-transparent" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-white">
                <Leaf className="w-3.5 h-3.5 text-[#fbbf24]" />
                Direct From Mountain Valleys
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-serif leading-tight text-white">
                Uncompromising Sourcing Ethics & Traceability
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                From lush Himalayan valleys to state-of-the-art optical laser sorting mills in Kathmandu, our supply chain guarantees purity in every grain.
              </p>

              <button
                onClick={() => onOpenQuoteModal("Logistics & Sourcing Partnership")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbbf24] text-[#0e2439] text-xs font-bold hover:bg-white transition-all shadow-md"
              >
                <span>Partner as a Distributor</span>
                <ArrowUpRight className="w-4 h-4" />
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
                  className="bg-[#fbfbf8] rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Icon & Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#e8f5ec] text-[#1c4a27] flex items-center justify-center group-hover:bg-[#1c4a27] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-[#0e2439] group-hover:text-[#1c4a27] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#c89d3c] mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-[#1c4a27]">
                    <span>Standard Guaranteed</span>
                    <CheckCircle className="w-4 h-4 text-[#1c4a27]" />
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
