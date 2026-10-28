"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, MessageCircle, ShieldCheck, FileText, Send } from "lucide-react";

const COMMODITIES = [
  { id: "rice", label: "Basmati Rice", name: "Monagrow Basmati Rice (1121 Supreme)" },
  { id: "coffee", label: "Coffee", name: "Specialty Arabica Dark Roast" },
  { id: "sugar", label: "Sugar", name: "Refined Cane Sugar (ICUMSA 45)" },
  { id: "cashews", label: "Cashews", name: "Royal Whole Cashews W240" },
] as const;

const VOLUMES = [
  "Trial Lot (5 - 10 MT)",
  "1 x 20ft Container (25 MT)",
  "2 x 20ft Containers (50 MT)",
  "4 x 20ft Containers (100 MT)",
  "Bulk Contract (200+ MT)",
];

const PACKAGING_OPTIONS = [
  "5 kg Retail Standup Box Bag",
  "25 kg PP Woven Export Bag",
  "50 kg Heavy Jute Sack",
  "1 MT Industrial Jumbo Bag",
];

const INCOTERMS = [
  "CIF · Cost, Insurance & Freight",
  "FOB · Free on Board (Origin Port)",
  "CFR · Cost & Freight",
  "EXW · Ex-Works Origin Mill",
];

const INCLUDED = [
  "Direct origin pricing with zero broker markups",
  "SGS / Bureau Veritas pre-shipment inspection",
  "Flexible trade financing (L/C or T/T)",
];

export default function WholesaleCalculator({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (details?: string) => void;
}) {
  const [commodityId, setCommodityId] = useState<(typeof COMMODITIES)[number]["id"]>("rice");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    volume: VOLUMES[1],
    packaging: PACKAGING_OPTIONS[0],
    incoterm: "CIF",
    destinationPort: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCommodity = COMMODITIES.find((c) => c.id === commodityId) ?? COMMODITIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Monagrow Global Wholesale! I would like to request an official wholesale quotation:\n` +
      `• Commodity: ${selectedCommodity.name}\n` +
      `• Buyer Name: ${formData.name || "Trade Buyer"}\n` +
      `• Company: ${formData.company || "Direct Procurement"}\n` +
      `• Email: ${formData.email || "N/A"}\n` +
      `• Phone/WhatsApp: ${formData.phone || "N/A"}\n` +
      `• Volume: ${formData.volume}\n` +
      `• Packaging: ${formData.packaging}\n` +
      `• Delivery Term: ${formData.incoterm}\n` +
      `• Destination Port: ${formData.destinationPort || "To be confirmed"}\n` +
      (formData.message ? `• Note: ${formData.message}\n` : "") +
      `Please provide current export pricing, COA specifications, and container availability.`
    );
    window.open(`https://wa.me/9779801234567?text=${text}`, "_blank", "noopener");
  };

  return (
    <section
      id="calculator"
      className="relative overflow-hidden py-16 sm:py-24 text-white bg-linear-to-br from-[#4f0014] via-[#800020] to-[#a01c3c]"
    >
      {/* Soft ambient highlights */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-160 h-160 rounded-full bg-white/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 right-0 w-140 h-140 rounded-full bg-[#2a000b]/40 blur-3xl pointer-events-none"
      />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: B2B Procurement Trust Copy */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-widest text-white mb-4">
              <span className="w-2 h-2 rounded-full bg-[#e9c46a]" />
              <span>B2B Wholesale Procurement</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Request Your Direct-Origin Quotation
            </h2>

            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
              Direct-origin pricing, verified COA metrics, and fast proforma quotes within 24 hours.
            </p>

            <ul className="mt-6 max-w-md border-t border-white/15">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 py-2.5 border-b border-white/15 text-sm text-white/90"
                >
                  <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#e9c46a] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-white/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#e9c46a]" /> ISO 22000 Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#e9c46a]" /> 100% Sortex Clean
              </span>
            </div>
          </div>

          {/* Right Column: Direct Wholesale Quote Form */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="w-full bg-white text-neutral-900 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border border-white/20">
              {isSubmitted ? (
                /* Success Confirmation State */
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#fae8eb] text-[#800020] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#800020]">
                      RFQ Successfully Dispatched
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                      Thank You, {formData.name || "Trade Partner"}!
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Your wholesale inquiry for{" "}
                      <strong className="text-neutral-900 font-semibold">{formData.volume}</strong> of{" "}
                      <strong className="text-neutral-900 font-semibold">{selectedCommodity.name}</strong> has been logged. Our export desk will email your binding proforma invoice and laboratory certificates within 4 business hours.
                    </p>
                  </div>

                  {/* Summary of submitted values */}
                  <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left border border-stone-200 text-xs sm:text-sm space-y-2">
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Commodity:</span>
                      <span className="font-semibold text-neutral-900">{selectedCommodity.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Volume:</span>
                      <span className="font-semibold text-neutral-900">{formData.volume}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Destination:</span>
                      <span className="font-semibold text-neutral-900">{formData.destinationPort || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Contact:</span>
                      <span className="font-semibold text-neutral-900">{formData.email || formData.phone}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Instant Follow-Up on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          company: "",
                          email: "",
                          phone: "",
                          volume: VOLUMES[1],
                          packaging: PACKAGING_OPTIONS[0],
                          incoterm: "CIF",
                          destinationPort: "",
                          message: "",
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
                      Wholesale Order Specification
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Select your commodity and supply details for an immediate quotation review.
                    </p>
                  </div>

                  {/* 1. Commodity Selector Pills */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2.5">
                      Select Commodity
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {COMMODITIES.map((c) => {
                        const isActive = c.id === commodityId;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCommodityId(c.id)}
                            className={`h-11 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center text-center ${
                              isActive
                                ? "bg-[#800020] border-[#800020] text-white shadow-md"
                                : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700 hover:border-stone-300"
                            }`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Contact Information (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Your Full Name <span className="text-[#800020]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Al-Mansoor"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Company / Business Name <span className="text-[#800020]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Al-Madina Trading LLC"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* 3. Email & Phone (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Work Email Address <span className="text-[#800020]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tariq@almadinatrade.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Phone / WhatsApp Number <span className="text-[#800020]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* 4. Volume & Delivery Incoterm (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Required Volume
                      </label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer font-medium"
                      >
                        {VOLUMES.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Incoterm Delivery Term
                      </label>
                      <select
                        value={formData.incoterm}
                        onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer font-medium"
                      >
                        {INCOTERMS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 5. Destination Port & Packaging (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Destination Discharge Port <span className="text-[#800020]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destinationPort}
                        onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                        placeholder="e.g. Jebel Ali / Rotterdam / Jeddah"
                        className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Packaging Preference
                      </label>
                      <select
                        value={formData.packaging}
                        onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer font-medium"
                      >
                        {PACKAGING_OPTIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 6. Optional Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Specific Requirements or Target Delivery Date (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Please include SGS inspection report and dispatch sample box before contract signing."
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/70 text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* 7. Action Button (Centered) */}
                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto sm:min-w-[320px] py-4 px-8 rounded-xl bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                      <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Quotation Request"}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                    By submitting, your request is dispatched directly to Monagrow&apos;s trade desk. Your data is strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
