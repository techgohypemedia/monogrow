"use client";

import React from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0e2439] rounded-[12px] overflow-hidden shadow-2xl border border-white/20 z-10">
        {/* Top Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
            <span>Monagrow Origin-to-Port Global Supply Chain</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            playsInline
            poster="/assets/hero-harvest.jpg"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-golden-wheat-field-in-the-wind-4122-large.mp4"
              type="video/mp4"
            />
            Your browser does not support video playback.
          </video>
        </div>

        {/* Bottom Details */}
        <div className="p-6 bg-[#0a1a29] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">
              Cultivated in Nepal & India • Laser Graded in Kathmandu
            </h4>
            <p className="text-xs text-stone-400 mt-1">
              Experience the optical sorters, moisture tests, and certified export packing process for Monagrow Extra Long Grain Basmati Rice.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#57a42f] text-white text-xs font-bold hover:bg-[#478726] shrink-0"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
