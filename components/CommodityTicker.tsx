"use client";

import React from "react";
import { TrendingUp, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function CommodityTicker() {
  const items = [
    { name: "Monagrow Basmati Extra Long (8.9mm)", price: "$1,180 / MT", change: "+1.8%", status: "High Demand" },
    { name: "Specialty Arabica Dark Roast", price: "$4,650 / MT", change: "+0.9%", status: "Available" },
    { name: "Refined White Sugar (ICUMSA 45)", price: "$520 / MT", change: "-0.4%", status: "Steady" },
    { name: "California Jumbo Almonds (27/30)", price: "$6,200 / MT", change: "+2.1%", status: "Fresh Crop" },
    { name: "Premium W240 Cashews", price: "$7,450 / MT", change: "+1.2%", status: "Direct Estate" },
    { name: "1121 Golden Sella Rice", price: "$980 / MT", change: "+0.5%", status: "Ready Port" },
    { name: "Green Unroasted Coffee Beans", price: "$3,800 / MT", change: "+1.4%", status: "In Stock" },
  ];

  return (
    <div className="bg-[#0e2439] border-y border-white/10 text-white py-3 overflow-hidden select-none">
      <div className="flex items-center">
        {/* Label on left */}
        <div className="hidden sm:flex items-center gap-2 pl-6 pr-4 border-r border-white/20 shrink-0 text-xs font-bold uppercase tracking-wider text-[#fbbf24] z-10 bg-[#0e2439]">
          <TrendingUp className="w-4 h-4 text-[#fbbf24]" />
          <span>Live B2B Spot Indicators:</span>
        </div>

        {/* Animated Marquee Strip */}
        <div className="overflow-hidden whitespace-nowrap w-full relative">
          <div className="animate-marquee flex gap-8 items-center text-xs">
            {/* Duplicated list for seamless infinite loop */}
            {[...items, ...items].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 transition-colors shrink-0"
              >
                <span className="font-semibold text-white/90">{item.name}</span>
                <span className="font-bold text-[#fbbf24]">{item.price}</span>
                <span className="text-[11px] font-medium text-[#4ade80] flex items-center">
                  <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                  {item.change}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
