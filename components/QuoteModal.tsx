"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageCircle, FileText, ShieldCheck } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommodity?: string;
}

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
    commodity: initialCommodity || "Monagrow Basmati Rice 5kg",
    volume: "25 MT (1 FCL Container)",
    packaging: "5kg Standup Box Bag",
    destinationPort: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialCommodity) {
      setFormData((prev) => ({ ...prev, commodity: initialCommodity }));
    }
  }, [initialCommodity]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Monagrow Global Wholesale! I would like to request an official wholesale quotation.\n• Name: ${formData.name || "Trade Buyer"}\n• Company: ${formData.company || "N/A"}\n• Commodity: ${formData.commodity}\n• Volume: ${formData.volume}\n• Packaging: ${formData.packaging}\n• Destination Port: ${formData.destinationPort || "Not specified"}\n• Note: ${formData.message || "Please provide FOB/CIF price."}`
    );
    window.open(`https://wa.me/9779801234567?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0e2439] p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#fbbf24] block mb-1">
              B2B Wholesale Procurement
            </span>
            <h3 className="text-xl font-black font-serif">
              Request Official Quotation / Proforma
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#e8f5ec] text-[#1c4a27] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-[#0e2439]">
                RFQ Submitted Successfully!
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you! Our wholesale export director will email your binding proforma quotation and certificate of analysis within 4 business hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsApp}
                  className="px-6 py-3 rounded-full bg-[#25d366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Follow-up via WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-stone-100 text-stone-700 font-bold text-sm hover:bg-stone-200"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. John Doe"
                    className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Company / Trade Entity *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. Al-Mansoor Trading LLC"
                    className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="procurement@company.com"
                    className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+971 50 123 4567"
                    className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Commodity of Interest
                </label>
                <input
                  type="text"
                  value={formData.commodity}
                  onChange={(e) =>
                    setFormData({ ...formData, commodity: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Order Volume
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27] bg-white"
                  >
                    <option value="Sample Pack (5kg - 25kg)">Sample Pack (Lab Testing)</option>
                    <option value="5 Metric Tons LCL">5 Metric Tons</option>
                    <option value="25 MT (1 FCL Container)">25 MT (1 FCL Container)</option>
                    <option value="50 MT (2 Containers)">50 MT (2 Containers)</option>
                    <option value="100+ MT Bulk Contract">100+ MT Bulk Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Destination Port / Country
                  </label>
                  <input
                    type="text"
                    value={formData.destinationPort}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationPort: e.target.value })
                    }
                    placeholder="e.g. Jebel Ali, Dubai / Felixstowe, UK"
                    className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Additional Specifications / OEM Packaging Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us if you require custom private labelling, special moisture limits, or third party SGS inspection..."
                  className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1c4a27]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-[#1c4a27] hover:bg-[#14371d] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale RFQ</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="py-3.5 px-5 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quick WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1c4a27]" />
                <span>NDA & Trade confidentiality strictly observed. Direct mill pricing guaranteed.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
