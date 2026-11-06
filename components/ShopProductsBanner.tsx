"use client";

import React from "react";
import Image from "next/image";
import styles from "./ShopProductsBanner.module.css";

interface BannerProduct {
  id: string;
  name: string;
  category: string;
  packImg: string;
  leftPercent: number; // percentage X position from left
  bottomPercent: number; // percentage Y position from bottom
  heightPercent: number; // percentage of banner frame height
  zIndex: number;
  floatClass: string;
  animationDelay: string;
}

const BANNER_PRODUCTS: BannerProduct[] = [
  {
    id: "estate-coffee",
    name: "Specialty Estate Coffee",
    category: "Dark Arabica",
    packImg: "/assets/monagrow-coffee-bag-cutout.png",
    leftPercent: 16.5,
    bottomPercent: 24.5,
    heightPercent: 32.5,
    zIndex: 14,
    floatClass: styles.float1,
    animationDelay: "0.6s",
  },
  {
    id: "sella-basmati-rice",
    name: "1121 Golden Sella Basmati",
    category: "Parboiled Rice",
    packImg: "/assets/monagrow-golden-sella-bag-cutout.png",
    leftPercent: 27.0,
    bottomPercent: 31.0,
    heightPercent: 38.0,
    zIndex: 12,
    floatClass: styles.float2,
    animationDelay: "1.4s",
  },
  {
    id: "katarni-rice",
    name: "Katarni Premium Fragrant Rice",
    category: "Heritage Heirloom",
    packImg: "/assets/monagrow-katarni-bag-cutout.png",
    leftPercent: 36.5,
    bottomPercent: 19.0,
    heightPercent: 40.0,
    zIndex: 22,
    floatClass: styles.float3,
    animationDelay: "0.8s",
  },
  {
    id: "basmati-rice",
    name: "1121 Supreme Basmati Rice",
    category: "Flagship Basmati",
    packImg: "/assets/monagrow-rice-bag-cutout.png",
    leftPercent: 50.0,
    bottomPercent: 32.0,
    heightPercent: 46.5,
    zIndex: 16,
    floatClass: styles.float4,
    animationDelay: "0s",
  },
  {
    id: "jeera-masino-rice",
    name: "Jeera Masino Premium Rice",
    category: "Fine Slender Rice",
    packImg: "/assets/monagrow-jeera-masino-bag-cutout.png",
    leftPercent: 61.5,
    bottomPercent: 30.0,
    heightPercent: 38.5,
    zIndex: 13,
    floatClass: styles.float1,
    animationDelay: "1.8s",
  },
  {
    id: "cane-sugar",
    name: "Pure Refined Cane Sugar",
    category: "ICUMSA 45",
    packImg: "/assets/monagrow-sugar-bag-cutout.png",
    leftPercent: 71.0,
    bottomPercent: 19.0,
    heightPercent: 38.5,
    zIndex: 22,
    floatClass: styles.float2,
    animationDelay: "1.0s",
  },
  {
    id: "natural-brown-sugar",
    name: "Natural Brown Cane Sugar",
    category: "Demerara Sugar",
    packImg: "/assets/monagrow-brown-sugar-box-cutout.png",
    leftPercent: 80.0,
    bottomPercent: 31.0,
    heightPercent: 34.5,
    zIndex: 12,
    floatClass: styles.float3,
    animationDelay: "1.6s",
  },
  {
    id: "royal-cashews",
    name: "Royal Mixed Dry Fruits",
    category: "Select Dry Fruits",
    packImg: "/assets/monagrow-dryfruits-packaging.png",
    leftPercent: 88.5,
    bottomPercent: 24.5,
    heightPercent: 34.0,
    zIndex: 14,
    floatClass: styles.float4,
    animationDelay: "0.4s",
  },
];

export default function ShopProductsBanner() {
  const scrollToProduct = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="shop-hero-banner"
      className={`${styles.bannerOuter} pt-20 sm:pt-24 lg:pt-28`}
      aria-label="From Everyday Meals to Special Moments - Monagrow Wholesale Commodities"
    >
      <h1 className="sr-only">
        From Everyday Meals to Special Moments — Monagrow Wholesale Commodity Showcase
      </h1>

      <div className={styles.stageFrame}>
        {/* Photorealistic Agrarian Stage Background (Title, Sky, Mandalas, Birds, Podiums, Grain Bowls) */}
        <Image
          src="/assets/banner-stage-empty.jpg"
          alt="From Everyday Meals to Special Moments - Monagrow Agrarian Stage with Stepped Wooden Podiums"
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className={styles.stageBackground}
        />

        {/* 8 Product Packs Layered Over the 5 Podiums with Floating Motion & Contact Shadows */}
        {BANNER_PRODUCTS.map((product) => (
          <div
            key={product.id}
            onClick={() => scrollToProduct(product.id)}
            style={{
              left: `${product.leftPercent}%`,
              bottom: `${product.bottomPercent}%`,
              height: `${product.heightPercent}%`,
              zIndex: product.zIndex,
              animationDelay: product.animationDelay,
            }}
            className={`${styles.productWrapper} ${product.floatClass}`}
            title={`Click to view ${product.name} specifications`}
          >
            {/* Tooltip badge on hover */}
            <div className={styles.tooltipBadge}>
              <span>{product.name} ↓</span>
            </div>

            {/* Contact drop shadow on wood */}
            <div className={styles.productShadow} />

            {/* High-res product pack cutout */}
            <div className={styles.productImgContainer}>
              <Image
                src={product.packImg}
                alt={product.name}
                width={240}
                height={320}
                className={styles.productImg}
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
