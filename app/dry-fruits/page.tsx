import React from "react";
import { Metadata } from "next";
import PremiumCommodityPage from "@/components/PremiumCommodityPage";
import {
  getProductsByCategory,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Dry Fruits | Nuts, Varieties & Everyday Inspiration",
  description:
    "Explore Monagrow dry fruits, compare nuts and dried fruit, find preparation ideas and estimate portion nutrition with our simple serving calculator.",
};

export default function DryFruitsPage() {
  const products = getProductsByCategory("dry-fruits");

  return <PremiumCommodityPage category="dry-fruits" products={products} />;
}

