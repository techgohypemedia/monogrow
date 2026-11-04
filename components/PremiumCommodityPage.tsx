"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Hero from "./Hero";
import RiceHeroTransition from "./RiceHeroTransition";
import Footer from "./Footer";
import QuoteModal from "./QuoteModal";
import CategoryGuide, { type GuideCategory } from "./CategoryGuide";
import type { CommodityProduct } from "@/data/commodityData";
import s from "./RiceGuide.module.css";
import c from "./CategoryGuide.module.css";

const categoryNames = { rice:"Rice", coffee:"Coffee", sugar:"Sugar", "dry-fruits":"Dry Fruits" };
export default function PremiumCommodityPage({ category, products }: { category: GuideCategory; products: CommodityProduct[] }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");
  const openQuote = (productName?: string) => { setQuoteProduct(productName || products[0]?.quoteName || categoryNames[category]); setQuoteOpen(true); };
  return <div className="min-h-screen flex flex-col bg-[#fcfbf7] selection:bg-[#740707] selection:text-white"><Navbar immersiveHero onOpenQuoteModal={openQuote} /><main className="flex-1">{products[0] && <RiceHeroTransition key={category} heroPackId={`${category}-hero-pack`} targetPackId={`${category}-target-pack`} targetCardId={`${category}-target-card`} targetBowlId={`${category}-target-bowl`} packSrc={products[0].packImg} />}<Hero key={category} filterProduct={category} onOpenQuoteModal={openQuote} />
    <div className={s.guide}><section id="category-collection" className={s.section}><header className={s.heading}><h2>{categoryNames[category]},<br /><em>chosen with care.</em></h2><p>Choose your product. Ask us for samples and pack sizes.</p></header><div className={c.collection}>{products.map((product, index) => <article id={index === 0 ? `${category}-target-card` : undefined} className={c.product} key={product.id}><Image id={index === 0 ? `${category}-target-pack` : undefined} src={product.packImg} alt={product.packAlt} width={300} height={400} sizes="(max-width:760px) 70vw, 25vw" /><div><h3>{product.name}</h3><p>{product.tagline}</p><details><summary>Details & packaging</summary><dl>{product.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl><ul><li>Retail: {product.retailSizes.join(" · ")}</li><li>Bulk: {product.bulkSizes.join(" · ")}</li></ul><p className={s.note}>Confirm current lot specifications and availability with our team.</p></details><button type="button" className={s.button} onClick={() => openQuote(product.quoteName)}>Request a quote ↗</button></div></article>)}</div></section>
    <CategoryGuide key={category} category={category} onQuote={openQuote} />
  </div></main><Footer onOpenQuoteModal={openQuote} /><QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} initialCommodity={quoteProduct} /></div>;
}
