import React from "react";
import { Metadata } from "next";
import CommodityCategoryTemplate from "@/components/CommodityCategoryTemplate";
import {
  COMMODITY_CATEGORIES,
  getProductsByCategory,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Rice | 1121 Supreme Basmati & Katarni Fragrant Rice",
  description:
    "Explore Monagrow's premium rice portfolio: 1121 Supreme Long Grain Basmati aged 2 seasons and authentic Katarni Fragrant Rice. 100% Sortex optical clean with SGS certified export purity.",
};

export default function RicePage() {
  const category = COMMODITY_CATEGORIES["rice"];
  const products = getProductsByCategory("rice");

  return <CommodityCategoryTemplate category={category} products={products} />;
}

