import React from "react";
import { Metadata } from "next";
import RicePageClient from "./RicePageClient";

export const metadata: Metadata = {
  title: "Monagrow Rice | 1121 Supreme Basmati & Katarni Fragrant Rice",
  description:
    "Explore Monagrow's premium rice portfolio: 1121 Supreme Long Grain Basmati aged 2 seasons and authentic Katarni Fragrant Rice. 100% Sortex optical clean with SGS certified export purity.",
};

export default function RicePage() {
  return <RicePageClient />;
}
