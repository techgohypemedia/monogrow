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
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-modal-title"
    >
      <div
        className="relative w-full max-w-[92vw] lg:max-w-4xl xl:max-w-5xl bg-[#FAF9F6] rounded-3xl border border-[#dfd5c6] shadow-2xl p-6 sm:p-8 lg:p-10 max-h-[92vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/50 transition-colors cursor-pointer z-10"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-start">
          {/* Left Column: Visual pack, Title, Tagline & CTA */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4">
            <div className="relative w-full h-44 sm:h-52 flex items-center justify-center">
              <Image
                src={product.packImg}
                alt={product.packAlt || product.name}
                width={180}
                height={230}
                className="max-h-40 sm:max-h-48 w-auto object-contain drop-shadow-md"
              />
            </div>

            <div>
              {product.kicker ? (
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#740707] block">
                  {product.kicker}
                </span>
              ) : null}
              <h3
                id="product-detail-modal-title"
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#262820] tracking-tight leading-snug mt-1"
              >
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#6b5d52] leading-relaxed mt-2">
                {product.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const qName = product.quoteName || product.name;
                onClose();
                onRequestQuote(qName);
              }}
              className="w-full py-3 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-[#740707] hover:bg-[#5e0606] active:bg-[#4a0404] shadow-md transition-all cursor-pointer hover:scale-[1.02]"
            >
              Request Quote for this Product
            </button>
          </div>

          {/* Right Column: Specs, Packaging Formats, Highlights */}
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                Product specifications
              </h4>
              <div className="grid grid-cols-2 gap-2.5 text-left">
                {product.specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="p-3 rounded-xl bg-white border border-[#dfd5c6]/70 shadow-2xs"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-[#6b5d52] font-semibold truncate">
                      {sp.label}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#262820] mt-0.5">
                      {sp.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#dfd5c6]/70">
                <span className="font-bold text-xs uppercase tracking-wider text-[#740707] block mb-1">
                  Retail Formats
                </span>
                <p className="text-xs text-[#6b5d52]">
                  {product.retailSizes.join(", ")}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#dfd5c6]/70">
                <span className="font-bold text-xs uppercase tracking-wider text-[#262820] block mb-1">
                  Wholesale &amp; Bulk
                </span>
                <p className="text-xs text-[#6b5d52]">
                  {product.bulkSizes.join(", ")}
                </p>
              </div>
            </div>

            {/* Highlights */}
            {product.keyHighlights && product.keyHighlights.length > 0 && (
              <div className="p-3.5 rounded-xl bg-white/70 border border-[#dfd5c6]/70">
                <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-500 block mb-2">
                  Key Quality Highlights
                </span>
                <ul className="text-xs text-[#6b5d52] space-y-1.5">
                  {product.keyHighlights.map((hl) => (
                    <li key={hl} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#740707] shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
