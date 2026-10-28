"use client";

import React, { useState } from "react";
import { X, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

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

      {/* Modal Dialog Card: Wider max-w-2xl layout */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 z-10 max-h-[92vh] flex flex-col animate-fadeIn">
        
        {/* Simple Themed Header */}
        <div className="px-6 sm:px-10 pt-7 pb-4 bg-white border-b border-stone-100 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fae8eb] text-[#800020] text-[11px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
              <span>Direct Wholesale Quote</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Request Official Quotation
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Binding proforma invoice &amp; COA specs sent within 4 hours.
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 -mr-2 -mt-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="px-6 sm:px-10 py-6 overflow-y-auto">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Commodity Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Commodity
                </label>
                <select
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm font-medium text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer"
                >
                  {COMMODITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Company (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Your Full Name <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Company Name <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Al-Mansoor Trading"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Work Email & Phone / WhatsApp (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Work Email <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@company.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Phone / Contact Number <span className="text-[#800020]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Volume & Destination Port (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Order Volume
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm font-medium text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all cursor-pointer"
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
                    Destination Port / Country
                  </label>
                  <input
                    type="text"
                    value={formData.destinationPort}
                    onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                    placeholder="e.g. Jebel Ali / Rotterdam"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Packaging / Special Specs (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. 5kg box bag packaging, moisture limit under 12%, SGS certificate..."
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/80 text-xs sm:text-sm text-stone-900 focus:bg-white focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/15 outline-none transition-all resize-none"
                />
              </div>

              {/* Centered, Reduced Submit Button */}
              <div className="pt-3 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 sm:px-10 py-3 rounded-full bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Quote Request"}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* Trust Reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center pt-1">
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
