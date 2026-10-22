"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, MessageCircle, Check } from "lucide-react";

export default function WholesaleCalculator({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (details?: string) => void;
}) {
  const [commodity, setCommodity] = useState("rice");
  const [metricTons, setMetricTons] = useState(25);
  const [packaging, setPackaging] = useState("5kg");
  const [incoterm, setIncoterm] = useState("CIF");

  // Commodity baseline calculation
  const commodityData: Record<string, { name: string; ratePerTon: number; bagWeightKg: number }> = {
    rice: { name: "Monagrow Basmati Rice (8.9mm)", ratePerTon: 1180, bagWeightKg: 5 },
    coffee: { name: "Specialty Arabica Dark Roast", ratePerTon: 4650, bagWeightKg: 2.5 },
    sugar: { name: "Refined Cane Sugar (ICUMSA 45)", ratePerTon: 520, bagWeightKg: 50 },
    dryfruits: { name: "California Whole Almonds", ratePerTon: 6200, bagWeightKg: 10 },
  };

  const selectedData = commodityData[commodity] || commodityData.rice;
  const estimatedCost = metricTons * selectedData.ratePerTon;
  const totalBags = Math.round((metricTons * 1000) / (packaging === "5kg" ? 5 : packaging === "25kg" ? 25 : packaging === "50kg" ? 50 : 2.5));
  const containerCount = (metricTons / 25).toFixed(1);

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Monagrow Global Wholesale! I would like to request an official wholesale quotation for:\n• Commodity: ${selectedData.name}\n• Volume: ${metricTons} Metric Tons (~${containerCount} FCL Containers)\n• Packaging: ${packaging}\n• Term: ${incoterm}\nPlease send proforma invoice and sample policy.`
    );
    window.open(`https://wa.me/9779801234567?text=${text}`, "_blank");
  };

  return (
    <section 
      id="calculator" 
      className="py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-[#6b001b] via-[#800020] via-45% to-white border-y border-stone-200/80"
    >
      {/* Precision Blueprint Dual Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128, 0, 32, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 0, 32, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle radial ambient highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Explanation (Wider Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-[#fbbf24] text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-xs">
              <Calculator className="w-3.5 h-3.5" />
              <span>CONTAINER & BULK ESTIMATOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              Instant Wholesale Volume Estimator
            </h2>

            <p className="text-stone-100 text-sm sm:text-base leading-relaxed max-w-xl">
              Calculate container volumes, estimated packaging unit counts, and receive a binding proforma quotation tailored to your destination port.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-white text-sm font-medium">
                <div className="w-5.5 h-5.5 rounded-full bg-white text-[#800020] flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Direct Ex-Mill or Port Delivery (FOB, CFR, CIF)</span>
              </div>
              <div className="flex items-center gap-3 text-white text-sm font-medium">
                <div className="w-5.5 h-5.5 rounded-full bg-white text-[#800020] flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Flexible Payment: Irrevocable Confirmed L/C or T/T</span>
              </div>
              <div className="flex items-center gap-3 text-white text-sm font-medium">
                <div className="w-5.5 h-5.5 rounded-full bg-white text-[#800020] flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Physical Lab Sample Dispatch via DHL / FedEx</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Box (Decreased Size, Compact Elegance) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] bg-white text-stone-900 rounded-[20px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-stone-200/90">
              <h3 className="text-base sm:text-lg font-black text-[#0e2439] mb-4 flex items-center justify-between">
                <span>Calculate Container Requirements</span>
                <span className="text-[10px] font-bold uppercase text-[#800020] px-2.5 py-0.5 rounded-full bg-[#fae8eb] border border-[#f3c4ce]">
                  Interactive Tool
                </span>
              </h3>

              <div className="space-y-4">
                {/* 1. Select Commodity */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    1. Select Commodity
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { id: "rice", label: "Basmati Rice" },
                      { id: "coffee", label: "Specialty Coffee" },
                      { id: "sugar", label: "Refined Sugar" },
                      { id: "dryfruits", label: "Dry Fruits" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCommodity(c.id)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          commodity === c.id
                            ? "bg-[#800020] text-white border-[#800020] shadow-xs"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Volume Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                      2. Order Volume (Metric Tons)
                    </label>
                    <span className="text-sm font-black text-[#800020]">
                      {metricTons} MT
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={metricTons}
                    onChange={(e) => setMetricTons(Number(e.target.value))}
                    className="w-full accent-[#800020] cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-semibold mt-0.5">
                    <span>5 MT (Min MOQ)</span>
                    <span>50 MT</span>
                    <span>100 MT</span>
                    <span>200 MT (Max Bulk)</span>
                  </div>
                </div>

                {/* 3. Packaging & 4. Incoterm Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                      3. Packaging Option
                    </label>
                    <select
                      value={packaging}
                      onChange={(e) => setPackaging(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white cursor-pointer"
                    >
                      <option value="5kg">5kg Standup Box Bag (Retail Ready)</option>
                      <option value="25kg">25kg PP Non-Woven Bag</option>
                      <option value="50kg">50kg Heavy Jute / Poly Sack</option>
                      <option value="1mt">1 Metric Ton Jumbo Bulk Bag</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                      4. Trade Incoterm
                    </label>
                    <select
                      value={incoterm}
                      onChange={(e) => setIncoterm(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white cursor-pointer"
                    >
                      <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                      <option value="FOB">FOB (Free on Board)</option>
                      <option value="CFR">CFR (Cost & Freight)</option>
                      <option value="EXW">EXW (Ex-Works Kathmandu)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#fbfbf8] border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Total Equivalent Bags:</span>
                    <strong className="text-stone-900 font-bold">~{totalBags.toLocaleString()} Units</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Full Container Load (FCL):</span>
                    <strong className="text-stone-900 font-bold">~{containerCount} x 20ft Containers</strong>
                  </div>
                  <div className="flex justify-between text-stone-600 pt-0.5 border-t border-stone-200/60">
                    <span>Indicative Bulk Value ({incoterm}):</span>
                    <strong className="text-[#800020] font-black text-sm">
                      ~${estimatedCost.toLocaleString()} USD
                    </strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="py-2.5 px-3 rounded-xl bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Send to WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenQuoteModal(
                        `Estimated ${metricTons} MT of ${selectedData.name} in ${packaging} (${incoterm})`
                      )
                    }
                    className="py-2.5 px-3 rounded-xl bg-[#0e2439] hover:bg-[#800020] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Request Proforma</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
