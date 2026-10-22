"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const COMMODITIES = [
  { id: "rice", label: "Basmati Rice", name: "Monagrow Basmati Rice (8.9mm)", ratePerTon: 1180 },
  { id: "coffee", label: "Coffee", name: "Specialty Arabica Dark Roast", ratePerTon: 4650 },
  { id: "sugar", label: "Sugar", name: "Refined Cane Sugar (ICUMSA 45)", ratePerTon: 520 },
  { id: "dryfruits", label: "Cashews", name: "Royal Whole Cashews W240", ratePerTon: 6200 },
] as const;

const PACKAGING = [
  { id: "5kg", label: "5 kg retail bag", kg: 5 },
  { id: "25kg", label: "25 kg PP bag", kg: 25 },
  { id: "50kg", label: "50 kg jute sack", kg: 50 },
  { id: "1mt", label: "1 MT jumbo bag", kg: 1000 },
] as const;

const INCOTERMS = [
  { id: "CIF", label: "CIF · Cost, insurance and freight" },
  { id: "FOB", label: "FOB · Free on board" },
  { id: "CFR", label: "CFR · Cost and freight" },
  { id: "EXW", label: "EXW · Ex-works Kathmandu" },
] as const;

const INCLUDED = [
  "Ex-mill or port delivery on FOB, CFR, or CIF terms",
  "Payment by confirmed irrevocable L/C or T/T",
  "Lab samples dispatched by DHL or FedEx",
];

const MIN_MT = 5;
const MAX_MT = 200;
const MT_PER_CONTAINER = 25;

const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2";
const selectClass =
  "w-full h-11 px-3 rounded-xl border border-stone-200 bg-white text-sm font-medium text-navy focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 cursor-pointer";

export default function WholesaleCalculator({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (details?: string) => void;
}) {
  const [commodityId, setCommodityId] = useState<(typeof COMMODITIES)[number]["id"]>("rice");
  const [metricTons, setMetricTons] = useState(25);
  const [packagingId, setPackagingId] = useState<(typeof PACKAGING)[number]["id"]>("5kg");
  const [incoterm, setIncoterm] = useState<(typeof INCOTERMS)[number]["id"]>("CIF");

  const commodity = COMMODITIES.find((c) => c.id === commodityId) ?? COMMODITIES[0];
  const packaging = PACKAGING.find((p) => p.id === packagingId) ?? PACKAGING[0];

  const estimatedCost = metricTons * commodity.ratePerTon;
  const totalBags = Math.round((metricTons * 1000) / packaging.kg);
  const containers = (metricTons / MT_PER_CONTAINER).toFixed(1);
  const sliderPercent = ((metricTons - MIN_MT) / (MAX_MT - MIN_MT)) * 100;

  const summaryText = `${metricTons} MT of ${commodity.name}, ${packaging.label}, ${incoterm}`;

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Monagrow, I would like a wholesale quotation for:\n• Commodity: ${commodity.name}\n• Volume: ${metricTons} MT (about ${containers} x 20ft containers)\n• Packaging: ${packaging.label}\n• Term: ${incoterm}\nPlease send a proforma invoice and sample policy.`
    );
    window.open(`https://wa.me/9779801234567?text=${text}`, "_blank", "noopener");
  };

  return (
    <section
      id="calculator"
      className="relative overflow-hidden py-20 sm:py-24 text-white bg-linear-to-br from-[#4f0014] via-[#800020] to-[#a01c3c]"
    >
      {/* Soft highlight for depth */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-160 h-160 rounded-full bg-white/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 right-0 w-140 h-140 rounded-full bg-[#2a000b]/40 blur-3xl pointer-events-none"
      />
      <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              Container and bulk estimator
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Estimate your wholesale order in seconds
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              Pick a commodity, set the volume, and see bag counts, container
              loads, and an indicative value before you request a proforma.
            </p>

            <ul className="mt-8 max-w-xl border-t border-white/15">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3.5 border-b border-white/15 text-sm sm:text-[15px] text-white/90"
                >
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: calculator */}
          <div className="lg:col-span-6 xl:col-span-5 flex lg:justify-end">
            <div className="w-full max-w-130 bg-white text-navy rounded-3xl p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                Container requirements
              </h3>

              <div className="mt-6 space-y-6">
                {/* Commodity */}
                <div>
                  <span className={labelClass}>Commodity</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Commodity">
                    {COMMODITIES.map((c) => {
                      const isActive = c.id === commodityId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCommodityId(c.id)}
                          aria-pressed={isActive}
                          className={`h-10 px-2 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#800020] border-[#800020] text-white"
                              : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-navy"
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label htmlFor="calc-volume" className={`${labelClass} mb-0`}>
                      Order volume
                    </label>
                    <span className="text-sm font-bold tabular-nums">{metricTons} MT</span>
                  </div>
                  <input
                    id="calc-volume"
                    type="range"
                    min={MIN_MT}
                    max={MAX_MT}
                    step={5}
                    value={metricTons}
                    onChange={(e) => setMetricTons(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#800020] bg-stone-200"
                    style={{
                      background: `linear-gradient(to right, #800020 ${sliderPercent}%, #e7e5e4 ${sliderPercent}%)`,
                    }}
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-2 tabular-nums">
                    <span>{MIN_MT} MT minimum</span>
                    <span>{MAX_MT} MT</span>
                  </div>
                </div>

                {/* Packaging and incoterm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="calc-packaging" className={labelClass}>
                      Packaging
                    </label>
                    <select
                      id="calc-packaging"
                      value={packagingId}
                      onChange={(e) => setPackagingId(e.target.value as typeof packagingId)}
                      className={selectClass}
                    >
                      {PACKAGING.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="calc-incoterm" className={labelClass}>
                      Incoterm
                    </label>
                    <select
                      id="calc-incoterm"
                      value={incoterm}
                      onChange={(e) => setIncoterm(e.target.value as typeof incoterm)}
                      className={selectClass}
                    >
                      {INCOTERMS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <dl className="border-t border-stone-200 text-sm">
                  <div className="flex items-baseline justify-between gap-4 py-3 border-b border-stone-200">
                    <dt className="text-stone-500">Bags</dt>
                    <dd className="font-semibold tabular-nums">~{totalBags.toLocaleString()}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3 border-b border-stone-200">
                    <dt className="text-stone-500">20 ft containers</dt>
                    <dd className="font-semibold tabular-nums">~{containers}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3 border-b border-stone-200">
                    <dt className="text-stone-500">Indicative value ({incoterm})</dt>
                    <dd className="font-bold text-lg text-[#800020] tabular-nums">
                      ~${estimatedCost.toLocaleString()}
                    </dd>
                  </div>
                </dl>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(summaryText)}
                    className="inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full bg-[#800020] hover:bg-primary-dark active:bg-[#520014] text-white font-semibold text-sm transition-colors duration-200 cursor-pointer group"
                  >
                    <span>Request proforma</span>
                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowUpRight className="w-4 h-4 text-[#800020] stroke-[2.5]" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    className="text-sm font-semibold text-navy underline underline-offset-4 decoration-stone-300 hover:decoration-[#800020] hover:text-[#800020] transition-colors cursor-pointer"
                  >
                    Send on WhatsApp
                  </button>
                </div>

                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Indicative figures only. Final pricing depends on destination
                  port, season, and lot availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
