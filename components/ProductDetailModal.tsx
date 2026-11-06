"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { CommodityProduct } from "@/data/commodityData";

interface ProductDetailModalProps {
  product: CommodityProduct | null;
  onClose: () => void;
  onRequestQuote: (quoteName: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onRequestQuote,
}: ProductDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-[#FAF9F6] rounded-3xl border border-[#dfd5c6] shadow-2xl p-5 sm:p-6 overflow-hidden animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/50 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Pack Cutout (Centered Vertical) */}
        <div className="relative w-full h-28 sm:h-32 flex items-center justify-center mb-2">
          <Image
            src={product.packImg}
            alt={product.packAlt || product.name}
            width={160}
            height={200}
            className="max-h-28 sm:max-h-32 w-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Category / Origin Kicker */}
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#740707] block">
          {product.kicker}
        </span>

        {/* Product Title */}
        <h3
          id="product-detail-modal-title"
          className="text-lg sm:text-xl font-bold text-[#262820] tracking-tight leading-snug mt-1"
        >
          {product.name}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-[#6b5d52] leading-relaxed mt-1 max-w-xs mx-auto line-clamp-2">
          {product.tagline}
        </p>

        {/* Key Specifications: Compact 2x2 Grid */}
        <div className="mt-3.5 pt-3 border-t border-[#dfd5c6]/70">
          <div className="grid grid-cols-2 gap-2 text-left">
            {product.specs.slice(0, 4).map((sp) => (
              <div
                key={sp.label}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-[#dfd5c6]/70 shadow-2xs"
              >
                <p className="text-[9px] uppercase tracking-wider text-[#6b5d52] font-semibold truncate">
                  {sp.label}
                </p>
                <p className="text-[11.5px] sm:text-xs font-bold text-[#262820] mt-0.5 truncate">
                  {sp.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Packaging Availability (Streamlined row) */}
        <div className="mt-2.5 px-3 py-2 rounded-xl bg-white/90 border border-[#dfd5c6]/70 text-[11px] flex items-center justify-between gap-2 text-[#262820]">
          <div className="truncate text-left">
            <span className="font-bold text-[#740707] mr-1">Retail:</span>
            <span className="text-[#6b5d52]">{product.retailSizes.slice(0, 2).join(", ")}</span>
          </div>
          <div className="truncate text-right">
            <span className="font-bold text-[#262820] mr-1">Bulk:</span>
            <span className="text-[#6b5d52]">{product.bulkSizes.slice(0, 2).join(", ")}</span>
          </div>
        </div>

        {/* Call-to-Action: Request Quote */}
        <div className="mt-4 pt-3 border-t border-[#dfd5c6]/70 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              const qName = product.quoteName || product.name;
              onClose();
              onRequestQuote(qName);
            }}
            className="w-full py-2.5 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-[#740707] hover:bg-[#5e0606] active:bg-[#4a0404] shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Request Quote for this Product
          </button>
        </div>
      </div>
    </div>
  );
}
