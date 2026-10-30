import React from "react";
import { Metadata } from "next";
import CommodityCategoryTemplate from "@/components/CommodityCategoryTemplate";
import {
  COMMODITY_CATEGORIES,
  getProductsByCategory,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Sugar | Pure Refined Cane Sugar ICUMSA 45",
  description:
    "Monagrow Pure Refined Cane Sugar ICUMSA 45. 99.85% minimum sucrose polarization, ultra-low moisture (<0.04%), free-flowing sparkling white crystals for commercial export.",
};

export default function SugarPage() {
  const category = COMMODITY_CATEGORIES["sugar"];
  const products = getProductsByCategory("sugar");

  return <CommodityCategoryTemplate category={category} products={products} />;
}

