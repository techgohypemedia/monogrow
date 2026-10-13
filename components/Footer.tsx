"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Send
} from "lucide-react";

export default function Footer({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (topic?: string) => void;
}) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#0b1b2b] text-white pt-20 pb-12 border-t border-white/10">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Top Newsletter & Updates Banner (Matching reference image design) */}
        <div className="bg-gradient-to-r from-[#112d45] to-[#1c4a27] rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#fbbf24] mb-2 block">
              Market Intelligence & Crop Reports
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Get Weekly Wholesale Spot Rates & Harvest Updates
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-2">
              Subscribe to receive weekly FOB port commodity pricing, container availability, and upcoming seasonal harvest reports.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#1c4a27] text-white px-6 py-3 rounded-full text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
                <span>Thank you! You are subscribed to Monagrow Trade Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your business email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#fbbf24] flex-1"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#fbbf24] hover:bg-white text-[#0e2439] text-sm font-bold shadow-lg transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* EXACT MONAGROW LOGO ONLY */}
            <div className="inline-block bg-white px-5 py-2.5 rounded-2xl shadow-lg">
              <Image
                src="/assets/monagrow-logo-exact.jpg"
                alt="Monagrow"
                width={200}
                height={60}
                className="h-9 w-auto object-contain"
              />
            </div>

            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Premier agricultural commodity wholesaler and exporter. Specializing in Extra Long Grain Basmati Rice, Specialty Estate Coffee, Refined Sugar, and Premium Dry Fruits.
            </p>

            <div className="space-y-2.5 text-xs text-stone-300 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-[11px] font-bold text-[#fbbf24] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                Wholesale Export Desk & Inquiries
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span className="font-semibold text-white">Hotline: +977 1 4589200 / +977 9801234567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>info@monagrow.com • wholesale@monagrow.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span>Kathmandu, Bagmati, Nepal (Direct Mill & Port Logistics)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>Global Shipping: FOB, CIF & CFR to 18+ Ports Worldwide</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#fbbf24] pl-2.5">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home Overview</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">Commodity Categories</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Wholesale Product Lots</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">Why Choose Monagrow</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">Container Volume Estimator</a>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="text-[#fbbf24] font-semibold hover:underline"
                >
                  Request Proforma Invoice
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#22c55e] pl-2.5">
              Core Commodities
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a href="#products" className="hover:text-white transition-colors">Monagrow Basmati Rice 8.9mm</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">1121 Golden Sella Rice</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Dark Arabica Whole Beans</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Green Unroasted Coffee</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Refined Sugar ICUMSA 45</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">California Jumbo Almonds</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Royal W240 Cashew Nuts</a>
              </li>
            </ul>
          </div>

          {/* Export Certifications */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#fbbf24] pl-2.5">
              Quality Certifications
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>ISO 22000:2018 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>HACCP Food Safety Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>Halal World Council Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>SGS & Bureau Veritas Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                <span>Phytosanitary & Fumigation Pass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 Monagrow Global Pvt Ltd. All rights reserved. Kathmandu, Bagmati, Nepal.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Export Terms & Incoterms 2020</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Food Safety Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
