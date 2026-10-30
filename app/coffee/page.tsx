import React from "react";
import { Metadata } from "next";
import CommodityCategoryTemplate from "@/components/CommodityCategoryTemplate";
import {
  COMMODITY_CATEGORIES,
  getProductsByCategory,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Coffee | Specialty Estate Dark Arabica",
  description:
    "Monagrow high-elevation single-estate Arabica coffee (1,450m+ MSL). Slow drum roasted artisan dark roast with one-way aroma degassing valve packaging.",
};

export default function CoffeePage() {
  const category = COMMODITY_CATEGORIES["coffee"];
  const products = getProductsByCategory("coffee");

  return <CommodityCategoryTemplate category={category} products={products} />;
}

