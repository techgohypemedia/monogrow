"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, ChevronDown } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommodity?: string;
}

const COMMODITIES = [
  "Basmati Rice (1121 Supreme)",
  "Katarni Premium Rice",
  "Specialty Estate Coffee",
  "Refined Cane Sugar (ICUMSA 45)",
  "Royal Jumbo Cashews W240",
  "All Wholesale Commodities",
];

const VOLUMES = [
  "Trial Lot (5 - 10 MT)",
  "1 x 20ft Container (25 MT)",
  "2 x 20ft Containers (50 MT)",
  "4 x 20ft Containers (100 MT)",
  "Annual Supply Contract (200+ MT)",
];

export default function QuoteModal({
  isOpen,
  onClose,
  initialCommodity = "",
}: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    commodity: initialCommodity || COMMODITIES[0],
    volume: VOLUMES[1],
    destinationPort: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevCommodity, setPrevCommodity] = useState(initialCommodity);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(54, textareaRef.current.scrollHeight)}px`;
    }
  }, [formData.message, isOpen]);

  if (initialCommodity !== prevCommodity) {
    setPrevCommodity(initialCommodity);
    setFormData((prev) => ({
      ...prev,
      commodity: initialCommodity || COMMODITIES[0],
    }));
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/50 backdrop-blur-md transition-all">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      {/* Modal Dialog Card: Spacious, elegant, premium B2B styling */}
      <div className="relative w-full max-w-2xl min-h-[640px] sm:min-h-[670px] bg-white rounded-2xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border border-stone-200/90 z-10 max-h-[96vh] flex flex-col animate-fadeIn">
        
        {/* Centered Themed Header with Signature Accent */}
        <div className="relative px-6 sm:px-10 py-6 bg-white border-b border-stone-100 flex items-center justify-center shrink-0">
          <h3 className="font-sans text-2xl sm:text-[28px] font-extrabold text-stone-900 tracking-tight leading-snug text-center">
            Request Official Quotation
          </h3>


          <button
            onClick={handleResetAndClose}
            className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-100/80 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body with spacious padding */}
        <div className="flex-1 px-6 sm:px-10 py-6 sm:py-7 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex flex-col justify-between">
          {submitted ? (
            /* Success State */
            <div className="text-center py-12 space-y-6 flex-1 flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-[#fae8eb] text-[#800020] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md">
                <h4 className="text-2xl font-extrabold text-stone-900">
                  Request Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Thank you, <strong className="text-stone-900">{formData.name || "Trade Buyer"}</strong>. Our export desk has received your request for{" "}
                  <strong className="text-stone-900">{formData.commodity}</strong> ({formData.volume}). An official proforma invoice will be delivered to your email shortly.
                </p>
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            /* Clean, Wide & Spacious Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 flex-1 flex flex-col justify-between">
              <div className="space-y-4 sm:space-y-4.5">
                
                {/* Commodity Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                    Commodity
                  </label>
                  <div className="relative group">
                    <select
                      value={formData.commodity}
                      onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                      className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm font-semibold text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all cursor-pointer appearance-none shadow-2xs"
                    >
                      {COMMODITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-600 group-focus-within:text-[#800020] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-colors" />
                  </div>
                </div>

                {/* Name & Company (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                      Your Full Name <span className="text-[#800020] font-bold">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                      Company Name <span className="text-[#800020] font-bold">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Al-Mansoor Trading"
                      className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Work Email & Phone / WhatsApp (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                      Work Email <span className="text-[#800020] font-bold">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="buyer@company.com"
                      className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                      Phone / Contact Number <span className="text-[#800020] font-bold">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Volume & Destination Port (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                      Order Volume
                    </label>
                    <div className="relative group">
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full h-11 sm:h-12 pl-4 pr-11 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm font-semibold text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all cursor-pointer appearance-none shadow-2xs"
                      >
                        {VOLUMES.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-600 group-focus-within:text-[#800020] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                      Destination Port / Country
                    </label>
                    <input
                      type="text"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      placeholder="e.g. Jebel Ali / Rotterdam"
                      className="w-full h-11 sm:h-12 px-4 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Packaging / Special Specs */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-stone-700 mb-1.5">
                    Packaging / Special Specs
                  </label>
                  <textarea
                    ref={textareaRef}
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. 5kg box bag packaging, moisture limit under 12%, SGS certificate..."
                    className="w-full min-h-[56px] py-2.5 px-4 rounded-xl border border-stone-200 bg-[#FAF9F6]/70 hover:bg-white hover:border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10 outline-none transition-all resize-none overflow-hidden shadow-2xs"
                  />
                </div>
              </div>

              {/* Bottom Actions Area */}
              <div className="pt-5 sm:pt-6 space-y-3">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[280px] h-12 px-10 rounded-full bg-gradient-to-r from-[#800020] via-[#941334] to-[#800020] hover:from-[#6d001b] hover:via-[#800020] hover:to-[#6d001b] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group disabled:opacity-70"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Quote Request"}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                {/* Trust Reassurance */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#800020]" />
                  <span>Direct mill pricing · Commercial confidentiality strictly observed</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
