import React from "react";
import { Metadata } from "next";
import CommodityCategoryTemplate from "@/components/CommodityCategoryTemplate";
import {
  COMMODITY_CATEGORIES,
  getSugarPageProducts,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Sugar | Pure Cane Sugar ICUMSA 45 & Natural Brown Sugar",
  description:
    "Explore Monagrow's premium cane sugar range: Refined ICUMSA 45 sparkling crystals and 100% Natural Brown Sugar with unrefined molasses minerals.",
};

export default function SugarPage() {
  const category = COMMODITY_CATEGORIES["sugar"];
  const products = getSugarPageProducts();

  return <CommodityCategoryTemplate category={category} products={products} />;
}
