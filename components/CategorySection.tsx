"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { loadHeroMotion } from "./heroMotion";
import styles from "./CategorySection.module.css";

interface CategorySectionProps {
  onSelectCategory?: (categoryId: string) => void;
  onOpenQuoteModal?: (categoryName: string) => void;
}

const PRODUCTS = [
  { id: "rice", name: "Basmati rice", quote: "Basmati Rice (1121 Supreme)", image: "rice", pack: "monagrow-rice-bag-cutout.png", size: "5 kg", label: "EXTRA LONG GRAIN", description: "Long, beautifully separate grains with a delicate aroma. A staple, made extraordinary.", specs: [["Grain length", "8.9 mm+"], ["Moisture", "Under 11.5%"], ["Purity", "100% Sortex"]] },
  { id: "coffee", name: "Estate coffee", quote: "Specialty Estate Coffee", image: "coffee", pack: "monagrow-coffee-bag-cutout.png", size: "2.5 kg", label: "DARK ROAST ARABICA", description: "Deeply aromatic estate coffee with notes of dark cocoa, roasted pecan, and caramel.", specs: [["Roast", "Artisan dark"], ["Elevation", "1,450 m+"], ["Format", "Whole bean & ground"]] },
  { id: "dryfruits", name: "Royal cashews", quote: "Royal Jumbo Cashews W240", image: "cashew", pack: "monagrow-cashews-packaging-new.png", size: "2.5 kg", label: "WHOLE & SELECTED", description: "Whole golden kernels, a buttery bite, and natural richness. Carefully selected at origin.", specs: [["Grade", "W240 whole"], ["Moisture", "Under 4.5%"], ["Packaging", "Nitrogen flushed"]] },
  { id: "sugar", name: "Pure cane sugar", quote: "Refined Cane Sugar (ICUMSA 45)", image: "sugar", pack: "monagrow-sugar-bag-cutout.png", size: "1 kg", label: "REFINED CANE", description: "Fine, sparkling crystals with clean sweetness. Made for kitchens, confectionery, and more.", specs: [["Grade", "ICUMSA 45"], ["Polarization", "99.85%"], ["Source", "Refined sugarcane"]] },
];

export default function CategorySection({ onSelectCategory, onOpenQuoteModal }: CategorySectionProps) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadHeroMotion().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const viewport = stage.current!;
        const rail = track.current!;
        const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-product-card]"));
        const bowls = cards.map(card => card.querySelector<HTMLElement>("[data-card-bowl]")!);
        section.dataset.animated = "true";
        const driver = { progress: 0 };
        const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth + viewport.clientWidth * .06);
        const paint = () => {
          const x = driver.progress * distance();
          rail.style.transform = `translate3d(${-x}px, 0, 0)`;
          section.style.setProperty("--collection-progress", String(driver.progress));
          cards.forEach((card, i) => {
            const relative = (card.offsetLeft + card.offsetWidth / 2 - x - viewport.clientWidth / 2) / viewport.clientWidth;
            bowls[i].style.transform = `rotate(${relative * 65}deg)`;
          });
        };
        const tween = gsap.to(driver, {
          progress: 1, ease: "none", onUpdate: paint,
          scrollTrigger: { trigger: section, pin: viewport, start: "top top", end: () => `+=${Math.max(distance() * 1.3, window.innerHeight * 2)}`, scrub: 1, invalidateOnRefresh: true, onRefresh: paint },
        });
        const onFocus = (event: FocusEvent) => {
          if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
          const index = cards.findIndex(card => card.contains(event.target as Node));
          const trigger = tween.scrollTrigger;
          if (index < 0 || !trigger) return;
          const target = Math.max(0, Math.min(1, (cards[index].offsetLeft - viewport.clientWidth * .36) / distance()));
          window.scrollTo({ top: trigger.start + target * (trigger.end - trigger.start), behavior: "instant" });
        };
        rail.addEventListener("focusin", onFocus);
        paint();
        ScrollTrigger.refresh();
        return () => {
          rail.removeEventListener("focusin", onFocus);
          tween.kill();
          delete section.dataset.animated;
          section.style.removeProperty("--collection-progress");
          rail.style.removeProperty("transform");
          bowls.forEach(bowl => bowl.style.removeProperty("transform"));
        };
      });
      cleanup = () => media.revert();
    }).catch(() => { /* All four product cards remain visible without animation. */ });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section id="categories" ref={root} className={styles.section} aria-labelledby="collection-title">
      <div ref={stage} className={styles.stage}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}><span /> THE MONAGROW COLLECTION</p>
          <h2 id="collection-title">FOUR STAPLES.<br />EXCEPTIONAL ROOTS.</h2>
        </header>
        <div className={styles.intro}>
          <p>Good food starts with good ingredients. Explore our collection of rice, coffee, cashews, and sugar—packed at origin, ready for your business.</p>
          <span className={styles.origin}><span /> SOURCED WITH CARE. SUPPLIED IN BULK.</span>
          <span className={styles.scrollCue}>Scroll to explore <ArrowRight size={18} /></span>
        </div>
        <div className={styles.railWindow}>
          <div ref={track} className={styles.track}>
            {PRODUCTS.map((product, index) => (
              <article key={product.id} data-product-card className={styles.card}>
                <span className={styles.number}>0{index + 1}</span>
                <div className={styles.visual}>
                  <div data-card-bowl className={styles.bowl}><Image src={`/assets/hero-center-${product.image}.png`} alt={`A bowl of ${product.name.toLowerCase()}`} fill sizes="(max-width: 767px) 80vw, 28vw" className={styles.image} /></div>
                  <div className={styles.pack}><Image src={`/assets/${product.pack}`} alt={`Monagrow ${product.name} ${product.size} pack`} fill sizes="(max-width: 767px) 30vw, 10vw" className={styles.image} /></div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.label}>{product.label}</p>
                  <h3>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>
                  <dl className={styles.specs}>{product.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                  <div className={styles.action}><span>{product.size}<small>RETAIL PACK</small></span>
                    {onOpenQuoteModal || onSelectCategory ? <button onClick={() => { onSelectCategory?.(product.id); onOpenQuoteModal?.(product.quote); }}>Get a quote <ArrowUpRight size={17} /></button> : <a href="#calculator">View details <ArrowUpRight size={17} /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.progress} aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
