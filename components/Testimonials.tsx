"use client";

import React from "react";
import { Star, Quote, Building2, Globe, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Tariq Al-Mansoor",
      role: "Procurement Director",
      company: "Gulf Food Logistics (Dubai, UAE)",
      text: "We have imported over twelve 40ft containers of Monagrow 8.9mm Extra Long Grain Basmati. Grain elongation after cooking exceeds 2.2x consistently. Zero broken grain complaints from our supermarket clients.",
      commodity: "Monagrow Basmati Rice",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Head of Roasting & Sourcing",
      company: "Nordic Coffee Collective (Oslo)",
      text: "Monagrow's washed Arabica and dark roast beans arrived with hermetic GrainPro protection. Cupping scores were authentic, acidity perfectly balanced, and delivery to Rotterdam port was on schedule.",
      commodity: "Specialty Arabica Beans",
      rating: 5,
    },
    {
      name: "Rajesh Shrestha",
      role: "Managing Director",
      company: "Himalayan Retail Marts (Kathmandu)",
      text: "As a local distributor, having Monagrow's direct wholesale packaging has elevated our dry fruits and sugar retail shelves. The 5kg Basmati packs are top tier in quality and shelf appeal.",
      commodity: "Full FMCG Commodity Line",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white relative border-b border-stone-200">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5ec] text-[#1b5e20] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c3e6cd]">
            <span>VERIFIED BUYER EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0e2439]">
            Trusted Across 18+ International Markets
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            From premier supermarket chains in the Gulf to European coffee houses, hear why wholesale procurement managers rely on Monagrow.
          </p>
        </div>

        {/* Testimonials 3 Card Grid matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#fbfbf8] rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Commodity Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#fbbf24]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#fbbf24]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700">
                    {rev.commodity}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-[#1c4a27]/20 mb-2" />
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-6 mt-6 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{rev.name}</h4>
                  <div className="text-xs text-[#1c4a27] font-semibold">{rev.role}</div>
                  <div className="text-xs text-stone-500 font-medium">{rev.company}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#e8f5ec] text-[#1c4a27] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#1c4a27]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
