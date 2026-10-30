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
      textareaRef.current.style.height = `${Math.max(50, textareaRef.current.scrollHeight)}px`;
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

      {/* Modal Dialog Card: Compact, fits viewport without scrolling */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 z-10 max-h-[96vh] flex flex-col animate-fadeIn">
        
        {/* Centered Themed Header */}
        <div className="relative px-6 sm:px-9 py-4 bg-white border-b border-stone-100 flex items-center justify-center shrink-0">
          <h3 className="font-sans text-2xl sm:text-[28px] font-bold text-stone-900 leading-tight text-center">
            Request Official Quotation
          </h3>

          <button
            onClick={handleResetAndClose}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body without scrollbar */}
        <div className="px-6 sm:px-9 py-4 sm:py-5 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {submitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#fae8eb] text-[#800020] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-2xl font-bold text-stone-900">
                  Request Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-stone-900">{formData.name || "Trade Buyer"}</strong>. Our export desk has received your request for{" "}
                  <strong className="text-stone-900">{formData.commodity}</strong> ({formData.volume}). An official proforma invoice will be delivered to your email shortly.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
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
            /* Clean, Wide & Simple Form */
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              
              {/* Commodity Selector */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Commodity
                </label>
                <div className="relative">
                  <select
                    value={formData.commodity}
                    onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                    className="w-full h-10 pl-3.5 pr-11 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm font-medium text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer appearance-none"
                  >
                    {COMMODITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-500 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Name & Company (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Your Full Name <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Company Name <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Al-Mansoor Trading"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Work Email & Phone / WhatsApp (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Work Email <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@company.com"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Phone / Contact Number <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Volume & Destination Port (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Order Volume
                  </label>
                  <div className="relative">
                    <select
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full h-10 pl-3.5 pr-11 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm font-medium text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer appearance-none"
                    >
                      {VOLUMES.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-500 pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Destination Port / Country
                  </label>
                  <input
                    type="text"
                    value={formData.destinationPort}
                    onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                    placeholder="e.g. Jebel Ali / Rotterdam"
                    className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-[10.5px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Packaging / Special Specs
                </label>
                <textarea
                  ref={textareaRef}
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. 5kg box bag packaging, moisture limit under 12%, SGS certificate..."
                  className="w-full min-h-[50px] py-2 px-3 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all resize-none overflow-hidden"
                />
              </div>

              {/* Centered Submit Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 sm:px-10 py-2.5 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Quote Request"}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* Trust Reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-stone-400 text-center pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#800020]" />
                <span>Direct mill pricing · Commercial confidentiality strictly observed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
