import React from "react";
import { Metadata } from "next";
import PremiumCommodityPage from "@/components/PremiumCommodityPage";
import {
  getProductsByCategory,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Coffee | Specialty Estate Dark Arabica",
  description:
    "Explore Monagrow estate coffee, discover origins and roast styles, and brew with confidence using practical guides and a coffee ratio calculator.",
};

export default function CoffeePage() {
  const products = getProductsByCategory("coffee");

  return <PremiumCommodityPage category="coffee" products={products} />;
}

