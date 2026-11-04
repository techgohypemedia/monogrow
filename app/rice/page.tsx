import React from "react";
import { Metadata } from "next";
import RicePageClient from "./RicePageClient";

export const metadata: Metadata = {
  title: "Monagrow Rice | 1121 Basmati, Katarni, Jeera Masino & Brown Rice",
  description:
    "Explore Monagrow's premium rice portfolio: 1121 Supreme Basmati, Katarni Fragrant Rice, Jeera Masino Rice, and Whole Grain Basmati Brown Rice. Compare varieties, explore cooking guides and plan your rice requirements with Monagrow.",
};

export default function RicePage() {
  return <RicePageClient />;
}
