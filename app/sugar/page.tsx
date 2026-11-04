import React from "react";
import { Metadata } from "next";
import PremiumCommodityPage from "@/components/PremiumCommodityPage";
import {
  getSugarPageProducts,
} from "@/data/commodityData";

export const metadata: Metadata = {
  title: "Monagrow Sugar | Sugar & Brown Sugar",
  description:
    "Explore Monagrow sugar and brown sugar, with baking guides and a simple quantity calculator.",
};

export default function SugarPage() {
  const products = getSugarPageProducts();

  return <PremiumCommodityPage category="sugar" products={products} />;
}
