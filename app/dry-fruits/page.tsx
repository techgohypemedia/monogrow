import React from "react";
import { Metadata } from "next";
import CommodityCategoryTemplate from "@/components/CommodityCategoryTemplate";
import {
  COMMODITY_CATEGORIES,
  getProductsByCategory,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Dry Fruits | Royal Jumbo Whole Cashews W240",
  description:
    "Monagrow Royal Jumbo Whole Cashews W240. First quality white grade, crisp buttery crunch, nitrogen flushed for export freshness across worldwide container routes.",
};

export default function DryFruitsPage() {
  const category = COMMODITY_CATEGORIES["dry-fruits"];
  const products = getProductsByCategory("dry-fruits");

  return <CommodityCategoryTemplate category={category} products={products} />;
}

