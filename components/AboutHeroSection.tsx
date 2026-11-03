"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sprout, Check, FlaskConical, Ship, ArrowRight } from "lucide-react";
import styles from "./AboutHeroSection.module.css";

interface AboutHeroSectionProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

const PRODUCTS = [
  { name: "Basmati rice", background: "#e4eef0", image: "monagrow-rice-bag-cutout.png", description: "Delicate aroma. Beautifully long grains. Basmati for everyday meals and memorable occasions.", details: ["Extra-long grain", "Naturally aged", "Retail & bulk"] },
  { name: "Estate coffee", background: "#f0e5da", image: "monagrow-coffee-bag-cutout.png", description: "Rich, aromatic Arabica with a deep roast and a character all its own.", details: ["Estate Arabica", "Dark roast", "Whole bean & ground"] },
  { name: "Royal dry fruits", background: "#eee4f2", image: "monagrow-dryfruits-packaging.png", description: "A generous selection of cashews, almonds, walnuts and pistachios. Naturally rich in flavour and crunch.", details: ["Selected mixed nuts", "Resealable pack", "Retail & bulk"] },
  { name: "Cane sugar", background: "#edf0db", image: "monagrow-sugar-bag-cutout.png", description: "Fine, sparkling crystals with clean sweetness for kitchens, bakeries and confectionery.", details: ["Refined cane", "ICUMSA 45", "Retail & bulk"] },
];
const PROCESS_STEPS = [
  { step: "01", title: "Source", position: "0% 0%", alt: "Agricultural fields at the source", desc: "Connect with mills and growers.", icon: Sprout },
  { step: "02", title: "Select", position: "100% 0%", alt: "Hands selecting rice grains beside coffee and cashew samples", desc: "Find the right grade for your market.", icon: Check },
  { step: "03", title: "Verify", position: "0% 100%", alt: "Product quality evaluation in a laboratory", desc: "Confirm samples and specifications.", icon: FlaskConical },
  { step: "04", title: "Dispatch", position: "100% 100%", alt: "Jute sacks prepared for shipment in a freight container", desc: "Coordinate paperwork and shipping.", icon: Ship },
];

export default function AboutHeroSection({ onOpenQuoteModal }: AboutHeroSectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const showcase = useRef<HTMLDivElement>(null);
  const [connector, setConnector] = useState("");

  useEffect(() => {
    const container = showcase.current;
    if (!container) return;
    const update = () => {
      const box = container.querySelector<HTMLElement>("[data-detail-box]");
      const pack = container.querySelector<HTMLElement>(`[data-product-index="${activeProduct}"] [data-pack-image]`);
      if (!box || !pack) return;
      const bounds = container.getBoundingClientRect();
      const start = box.getBoundingClientRect();
      const end = pack.getBoundingClientRect();
      const x1 = start.left + start.width / 2 - bounds.left;
      const y1 = start.bottom - bounds.top;
      const x2 = end.left + end.width / 2 - bounds.left;
      const y2 = end.top - bounds.top + 8;
      const middle = y1 + (y2 - y1) * .5;
      setConnector(`M ${x1} ${y1} C ${x1} ${middle}, ${x2} ${middle}, ${x2} ${y2}`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    const box = container.querySelector<HTMLElement>("[data-detail-box]");
    if (box) observer.observe(box);
    update();
    return () => observer.disconnect();
  }, [activeProduct]);
  const approach = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    const section = hero.current;
    if (!element || !section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let frame = 0;
    let smoothProgress: number | undefined;
    let lastPaint = 0;
    const paint = () => {
      frame = 0;
      const process = approach.current;
      if (process) {
        const steps = Array.from(process.querySelectorAll<HTMLElement>("[data-process-step]"));
        const first = steps[0]?.getBoundingClientRect();
        const last = steps[steps.length - 1]?.getBoundingClientRect();
        if (first && last) {
          process.style.setProperty("--track-length", `${last.top - first.top}px`);
          const progress = Math.max(0, Math.min(1, (window.innerHeight * .52 - first.top - 30) / Math.max(1, last.top - first.top)));
          const now = performance.now();
          const elapsed = lastPaint ? Math.min(64, now - lastPaint) : 16;
          lastPaint = now;
          if (smoothProgress === undefined || motion.matches) smoothProgress = progress;
          else smoothProgress += (progress - smoothProgress) * (1 - Math.exp(-elapsed / 160));
          if (Math.abs(progress - smoothProgress) < .0001) smoothProgress = progress;
          const position = smoothProgress * (steps.length - 1);
          const active = Math.round(position);
          process.style.setProperty("--process-progress", String(motion.matches ? 1 : smoothProgress));
          steps.forEach((step, index) => {
            step.dataset.active = String(motion.matches || index <= active);
            step.setAttribute("aria-current", index === active ? "step" : "false");
          });
          process.querySelectorAll<HTMLElement>("[data-process-image]").forEach((image, index) => {
            const incoming = Math.max(0, Math.min(1, position - index + 1));
            const reveal = incoming * incoming * (3 - 2 * incoming);
            image.style.zIndex = String(index);
            image.style.opacity = motion.matches ? (index === active ? "1" : "0") : "1";
            image.style.visibility = "visible";
            image.style.transform = motion.matches ? "none" : `translateY(${index === 0 ? 0 : (1 - reveal) * 100}%)`;
            image.dataset.visible = String(index === active);
            image.setAttribute("aria-hidden", String(index !== active));
          });
          if (smoothProgress !== progress && !motion.matches) frame = requestAnimationFrame(paint);
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (motion.matches) return;
        const animation = entry.target.animate([
          { opacity: 0, transform: "translateY(36px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 950, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: .12 });
    element.querySelectorAll("[data-about-enter]").forEach(item => observer.observe(item));
    const reset = () => { animations.forEach(animation => animation.cancel()); animations.clear(); paint(); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", reset);
    paint();
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div ref={root} className={styles.about}>
      <section ref={hero} className={styles.hero} aria-labelledby="about-heading">
        <div className={styles.heading} data-about-enter>
          <h1 id="about-heading">Good ingredients<br /><span>Lasting partnerships</span></h1>
          <div className={styles.intro}>
            <p>Connecting origin growers with businesses worldwide</p>
          </div>
        </div>
        <div ref={showcase} className={styles.productShowcase}>
          <svg className={styles.productConnector} aria-hidden="true"><path key={connector} d={connector} pathLength={1} /></svg>
          <div data-detail-box id="about-product-details" className={styles.hoverDetails} aria-live="polite" aria-atomic="true">
            <h2 key={`title-${activeProduct}`} className={styles.detailTitle}>{PRODUCTS[activeProduct].name}</h2>
            <p key={`description-${activeProduct}`} className={styles.detailDescription}>{PRODUCTS[activeProduct].description}</p>
          </div>
          <div className={styles.productRow} role="group" aria-label="Choose a product to view its details">
            {PRODUCTS.map((product, index) => (
              <button key={product.name} data-product-index={index} type="button" className={styles.productChoice}
                aria-pressed={activeProduct === index} aria-controls="about-product-details"
                onPointerEnter={event => { if (event.pointerType === "mouse") setActiveProduct(index); }}
                onFocus={() => setActiveProduct(index)} onClick={() => setActiveProduct(index)}>
                <span data-pack-image className={styles.choiceImage}><Image src={`/assets/${product.image}`} alt="" fill sizes="(max-width: 600px) 40vw, 22vw" preload={index === 0} /></span>
                <span className={styles.choiceName}>{product.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section id="about-source" className={styles.foundation}>
        <div ref={approach} className={styles.approach}>
          <header className={styles.approachHeader}>
            <h2>From source<br /><em>to your doorstep.</em></h2>
            <div className={styles.processGallery}>
              {PROCESS_STEPS.map((step, index) => (
                <figure key={step.step} data-process-image data-visible={index === 0} aria-hidden={index !== 0} className={styles.processImage}>
                  <div className={styles.processPhoto} role="img" aria-label={step.alt} style={{ backgroundPosition: step.position }} />
                </figure>
              ))}
            </div>
          </header>
          <ol className={styles.processSteps}>
            {PROCESS_STEPS.map(step => {
              const Icon = step.icon;
              return (
                <li key={step.step} data-process-step className={styles.processStep}>
                  <div className={styles.stepMarker}><Icon size={21} aria-hidden="true" /></div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <div className={styles.mobileProcessImage}><div className={styles.processPhoto} role="img" aria-label={step.alt} style={{ backgroundPosition: step.position }} /></div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={styles.content}>
          <div className={styles.quoteStrip}>
            <div>
              <h2>Let?s plan your next shipment.</h2>
              <p>Tell us what you need and where it?s going.</p>
            </div>
            <button type="button" onClick={() => onOpenQuoteModal?.("Direct Origin Procurement Inquiry")}>
              Get a quote <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
