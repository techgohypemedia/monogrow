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
    <section id="calculator" className="py-20 bg-[#0e2439] text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#800020]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c89d3c]/20 rounded-full blur-3xl -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold uppercase tracking-wider border border-white/20">
              <Calculator className="w-3.5 h-3.5" />
              <span>CONTAINER & BULK ESTIMATOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              Instant Wholesale Volume Estimator
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Calculate container volumes, estimated packaging unit counts, and receive a binding proforma quotation tailored to your destination port.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-stone-200 text-sm font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#800020] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Direct Ex-Mill or Port Delivery (FOB, CFR, CIF)</span>
              </div>
              <div className="flex items-center gap-3 text-stone-200 text-sm font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#800020] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Flexible Payment: Irrevocable Confirmed L/C or T/T</span>
              </div>
              <div className="flex items-center gap-3 text-stone-200 text-sm font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#800020] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Physical Lab Sample Dispatch via DHL / FedEx</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-white text-stone-900 rounded-[12px] p-6 sm:p-8 shadow-2xl border border-stone-200">
            <h3 className="text-xl font-black text-[#0e2439] mb-6 flex items-center justify-between">
              <span>Calculate Container Requirements</span>
              <span className="text-xs font-bold uppercase text-[#800020] px-3 py-1 rounded-full bg-[#fae8eb]">
                Interactive Tool
              </span>
            </h3>

            <div className="space-y-6">
              {/* Select Commodity */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  1. Select Commodity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        commodity === c.id
                          ? "bg-[#800020] text-white border-[#800020] shadow"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    2. Order Volume (Metric Tons)
                  </label>
                  <span className="text-base font-black text-[#800020]">
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
                  className="w-full accent-[#800020] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                  <span>5 MT (Min MOQ)</span>
                  <span>50 MT</span>
                  <span>100 MT</span>
                  <span>200 MT (Max Bulk)</span>
                </div>
              </div>

              {/* Packaging & Incoterm Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    3. Packaging Option
                  </label>
                  <select
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white"
                  >
                    <option value="5kg">5kg Standup Box Bag (Retail Ready)</option>
                    <option value="25kg">25kg PP Non-Woven Bag</option>
                    <option value="50kg">50kg Heavy Jute / Poly Sack</option>
                    <option value="1mt">1 Metric Ton Jumbo Bulk Bag</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    4. Trade Incoterm
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#800020] bg-white"
                  >
                    <option value="CIF">CIF (Cost, Insurance & Freight to Port)</option>
                    <option value="FOB">FOB (Free on Board - Origin Port)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="EXW">EXW (Ex-Works Kathmandu Mill)</option>
                  </select>
                </div>
              </div>

              {/* Calculation Summary Box */}
              <div className="p-4 rounded-2xl bg-[#fbfbf8] border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Total Equivalent Bags:</span>
                  <strong className="text-stone-900 font-bold">~{totalBags.toLocaleString()} Units</strong>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Full Container Load (FCL):</span>
                  <strong className="text-stone-900 font-bold">~{containerCount} x 20ft Containers</strong>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Indicative Bulk Value ({incoterm}):</span>
                  <strong className="text-[#800020] font-black text-sm">
                    ~${estimatedCost.toLocaleString()} USD
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="py-3 px-4 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Quote to WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenQuoteModal(
                      `Estimated ${metricTons} MT of ${selectedData.name} in ${packaging} (${incoterm})`
                    )
                  }
                  className="py-3 px-4 rounded-xl bg-[#0e2439] hover:bg-[#800020] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Request Official Proforma</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
