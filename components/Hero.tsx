"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { loadHeroMotion } from "./heroMotion";
import styles from "./Hero.module.css";

interface HeroProps {
  onOpenVideoModal?: () => void;
  onOpenQuoteModal: (productName?: string) => void;
}

const PRODUCTS = [
  { name: "Basmati Rice", short: "Rice", title: ["Every grain.", "Exceptional."], image: "/assets/monagrow-rice-bag-cutout.png", colour: "#a6c8d3", glow: "#234c58", note: "EXTRA LONG GRAIN", description: "A delicate aroma. An extraordinary length. Basmati that makes every meal worth remembering.", detail: "Extra-long grain · Premium basmati", size: "5 kg", ingredient: "rice", atlas: "0% 0%" },
  { name: "Estate Coffee", short: "Coffee", title: ["Deep roots.", "Deeper flavour."], image: "/assets/monagrow-coffee-bag-cutout.png", colour: "#e7ad76", glow: "#633318", note: "SPECIALTY ESTATE COFFEE", description: "Rich, aromatic Arabica. Carefully sourced from the estate, for a cup with a character all its own.", detail: "Dark Arabica · Whole bean & ground", size: "2.5 kg", ingredient: "coffee", atlas: "100% 0%" },
  { name: "Royal Cashews", short: "Cashews", title: ["Naturally rich.", "Royally good."], image: "/assets/monagrow-cashews-packaging-new.png", colour: "#dab2ed", glow: "#4e245c", note: "WHOLE & SELECTED", description: "Beautifully whole. Naturally buttery. Selected cashews that bring a little richness to the everyday.", detail: "W240 · Whole & selected", size: "2.5 kg", ingredient: "cashew", atlas: "0% 100%" },
  { name: "Refined Cane Sugar", short: "Sugar", title: ["Pure cane.", "Sweet simplicity."], image: "/assets/monagrow-sugar-bag-cutout.png", colour: "#d1db94", glow: "#46552a", note: "REFINED CANE · ICUMSA 45", description: "Sparkling crystals. Consistent purity. Refined cane sugar, ready for everything you create.", detail: "ICUMSA 45 · Refined cane", size: "1 kg", ingredient: "sugar", atlas: "100% 100%" },
];

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  x: ((i * 137.508) % 100), y: 14 + ((i * 31.71) % 73),
  rotation: (i * 67) % 360, size: i % 9 === 0 ? 74 : 12 + (i % 5) * 7,
  depth: i % 3,
}));
const QUOTE_NAMES = ["Basmati Rice (1121 Supreme)", "Specialty Estate Coffee", "Royal Jumbo Cashews W240", "Refined Cane Sugar (ICUMSA 45)"];
const BACKGROUNDS = ["#102d36", "#382014", "#301a3c", "#26351a"];
function blendColour(from: string, to: string, progress: number) {
  const channels = [1, 3, 5].map(offset => {
    const start = parseInt(from.slice(offset, offset + 2), 16);
    return Math.round(start + (parseInt(to.slice(offset, offset + 2), 16) - start) * progress);
  });
  return `rgb(${channels.join(",")})`;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstScene = stage.current?.querySelector<HTMLElement>("[data-scene]");
    if (!firstScene) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bowl = firstScene.querySelector<HTMLElement>(`.${styles.ingredientEntrance}`);
    const pack = firstScene.querySelector<HTMLElement>(`.${styles.packEntrance}`);
    const animations: Animation[] = [];
    let cancelled = false;
    const stop = () => animations.forEach(animation => animation.cancel());
    const images = [bowl, pack].map(element => element?.querySelector("img"));

    // Start together after both images decode, including images from cache.
    Promise.all(images.map(image => image?.decode().catch(() => undefined))).then(() => {
      if (cancelled || motion.matches || window.scrollY > window.innerHeight * .25) return;
      if (bowl) animations.push(bowl.animate([
        { opacity: 0, transform: "translateY(55px) scale(.82) rotate(-7deg)" },
        { opacity: 1, transform: "translateY(-5px) scale(1.025) rotate(1deg)", offset: .72 },
        { opacity: 1, transform: "translateY(0) scale(1) rotate(0)" },
      ], { duration: 1150, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "backwards" }));
      if (pack) animations.push(pack.animate([
        { opacity: 0, transform: "translateY(65px) scale(.88)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 950, delay: 160, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "backwards" }));
    });
    motion.addEventListener("change", stop);
    return () => { cancelled = true; stop(); motion.removeEventListener("change", stop); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    // Static product scenes are the default for reduced motion,
    // JavaScript/CDN failure, and the server-rendered page.
    loadHeroMotion().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (cancelled || !root.current || !stage.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const viewport = stage.current!;
        const scenes = Array.from(viewport.querySelectorAll<HTMLElement>("[data-scene]"));
        const layers = scenes.map(scene => ({
          pack: scene.querySelector<HTMLElement>("[data-pack]")!,
          orbit: scene.querySelector<HTMLElement>("[data-orbit]")!,
          particles: Array.from(scene.querySelectorAll<SVGElement>("[data-particle]")),
          sides: Array.from(scene.querySelectorAll<HTMLElement>("[data-side]")),
        }));
        section.dataset.enhanced = "true";
        const driver = { value: 0 };
        const paint = () => {
          const index = Math.min(3, Math.round(driver.value));
          const from = Math.max(0, Math.min(3, Math.floor(driver.value)));
          const to = Math.min(3, from + 1);
          const blend = Math.max(0, Math.min(1, driver.value - from));
          viewport.style.setProperty("--glow", blendColour(PRODUCTS[from].glow, PRODUCTS[to].glow, blend));
          viewport.style.setProperty("--backdrop", blendColour(BACKGROUNDS[from], BACKGROUNDS[to], blend));
          viewport.style.setProperty("--accent", blendColour(PRODUCTS[from].colour, PRODUCTS[to].colour, blend));
          scenes.forEach((scene, i) => {
            const distance = i - driver.value;
            const amount = Math.min(1, Math.abs(distance));
            scene.style.opacity = String(1 - amount * amount * (3 - 2 * amount));
            scene.style.visibility = amount < 1 ? "visible" : "hidden";
            scene.inert = i !== index;
            scene.setAttribute("aria-hidden", String(i !== index));
            if (amount >= 1) return;
            layers[i].pack.style.transform = `rotate(${-distance * 135}deg) scale(${1 - amount * .12})`;
            layers[i].orbit.style.transform = `rotate(${driver.value * 240}deg)`;
            layers[i].sides.forEach(side => {
              // Arc through the resting position: enter from the lower right,
              // then curve back toward the upper right without spinning.
              const arcX = distance * distance * viewport.clientWidth * .18;
              const arcY = distance * viewport.clientHeight * .65;
              side.style.transform = `translate(${arcX}px, ${arcY}px) rotate(12deg)`;
            });
            layers[i].particles.forEach((particle, j) => {
              const p = PARTICLES[j];
              particle.style.transform = `translate3d(${(p.x - 50) * amount * 10}px,${-amount * (100 + p.depth * 150)}px,0) rotate(${p.rotation + distance * 150}deg)`;
            });
          });
        };
        paint();
        const lenis = new Lenis({ lerp: .09, smoothWheel: true, anchors: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        const tween = gsap.to(driver, {
          value: 3, ease: "none", onUpdate: paint,
          scrollTrigger: { trigger: section, pin: viewport, start: "top top", end: () => `+=${viewport.clientHeight * 3.3}`, scrub: .8, invalidateOnRefresh: true },
        });
        const pointer = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          viewport.style.setProperty("--mouse-x", `${(event.clientX / window.innerWidth - .5) * 22}px`);
          viewport.style.setProperty("--mouse-y", `${(event.clientY / window.innerHeight - .5) * 18}px`);
        };
        const resetPointer = () => { viewport.style.setProperty("--mouse-x", "0px"); viewport.style.setProperty("--mouse-y", "0px"); };
        viewport.addEventListener("pointermove", pointer);
        viewport.addEventListener("pointerleave", resetPointer);
        ScrollTrigger.refresh();
        return () => {
          viewport.removeEventListener("pointermove", pointer);
          viewport.removeEventListener("pointerleave", resetPointer);
          gsap.ticker.remove(tick);
          lenis.destroy();
          tween.kill();
          delete section.dataset.enhanced;
          viewport.removeAttribute("style");
          scenes.forEach(scene => {
            scene.style.removeProperty("opacity"); scene.style.removeProperty("visibility");
            scene.removeAttribute("aria-hidden"); scene.inert = false;
            scene.querySelectorAll<HTMLElement>("[data-pack], [data-orbit], [data-side]").forEach(el => el.removeAttribute("style"));
            scene.querySelectorAll<SVGElement>("[data-particle]").forEach((el, j) => { el.style.transform = `rotate(${PARTICLES[j].rotation}deg)`; });
          });
        };
      });
      dispose = () => media.revert();
    }).catch(() => { /* The fully visible static scenes are the fallback. */ });
    return () => { cancelled = true; dispose?.(); };
  }, []);

  return (
    <section id="home" ref={root} className={styles.hero} aria-label="Discover Monagrow commodities">
      <svg className={styles.definitions} aria-hidden="true"><defs>
        <radialGradient id="mg-bean" cx="32%" cy="25%"><stop stopColor="#b6814d"/><stop offset=".45" stopColor="#6b351c"/><stop offset="1" stopColor="#261107"/></radialGradient>
        <linearGradient id="mg-grain" x2="1" y2="1"><stop stopColor="#fff7d9"/><stop offset="1" stopColor="#c9ad79"/></linearGradient>
        <symbol id="mg-coffee" viewBox="0 0 60 60"><ellipse cx="30" cy="30" rx="20" ry="27" fill="url(#mg-bean)" transform="rotate(30 30 30)"/><path d="M42 8C17 24 43 34 17 52" stroke="#241005" strokeWidth="4" fill="none"/><path d="M38 9C20 22 38 36 17 49" stroke="#ca9256" strokeWidth="1.2" fill="none"/><path d="M20 14Q9 25 12 35" fill="none" stroke="#e0b083" strokeWidth="2" opacity=".4"/></symbol>
        <symbol id="mg-rice" viewBox="0 0 60 60"><ellipse cx="30" cy="30" rx="7" ry="27" fill="url(#mg-grain)" transform="rotate(25 30 30)"/><path d="M39 8L21 51" stroke="#fff9e9" opacity=".5"/></symbol>
        <symbol id="mg-cashew" viewBox="0 0 60 60"><path d="M39 6C8 0 0 38 24 51C43 63 62 42 51 35C44 30 43 43 32 39C18 34 24 19 34 22C47 26 51 10 39 6Z" fill="url(#mg-grain)"/><path d="M35 12C15 9 8 34 26 44" fill="none" stroke="#b9904d" strokeWidth="2" opacity=".6"/></symbol>
        <symbol id="mg-sugar" viewBox="0 0 60 60"><path d="M13 14L39 7L51 24L44 49L17 52L7 33Z" fill="#eee8d6" fillOpacity=".75" stroke="#fff8e1"/><path d="M13 14L26 29L51 24M26 29L17 52M26 29L39 7" stroke="#fff" opacity=".6" fill="none"/></symbol>
      </defs></svg>
      <div ref={stage} className={styles.stage}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.topline}><span>ROOTED IN INDIA. SHARED WITH THE WORLD.</span><span>THE MONAGROW COLLECTION</span></div>
        <h1 className="sr-only">Monagrow — the taste of purity</h1>
        {PRODUCTS.map((product, index) => (
          <article id={`hero-product-${index}`} key={product.name} data-scene className={styles.scene} style={{ "--scene-accent": product.colour, "--scene-glow": product.glow, "--scene-backdrop": BACKGROUNDS[index] } as CSSProperties} aria-label={product.name}>
            <div className={styles.atmosphere} aria-hidden="true" />
            <div className={styles.wordmark} aria-hidden="true" style={{ "--name-size": `${Math.min(18, 146 / product.name.length)}vw` } as CSSProperties}>{product.name}</div>
            <div className={styles.particles} aria-hidden="true">{PARTICLES.map((particle, i) => <svg key={i} data-particle className={styles.particle} style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size, height: particle.size, opacity: particle.depth === 0 ? .25 : .7, filter: `blur(${particle.depth === 0 ? 3 : particle.size > 60 ? 2 : 0}px)`, transform: `rotate(${particle.rotation}deg)` }}><use href={`#mg-${product.ingredient}`} /></svg>)}</div>
            <div className={styles.copy}>
              <p className={styles.eyebrow}><span /> THE TASTE OF PURITY</p>
              <h2>{product.title[0]}<br/><em>{product.title[1]}</em></h2>
              <p className={styles.description}>{product.description}</p>
              <button className={styles.quote} onClick={() => onOpenQuoteModal(QUOTE_NAMES[index])} onPointerMove={event => {
                if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * .12}px, ${(event.clientY - bounds.top - bounds.height / 2) * .18}px)`;
              }} onPointerLeave={event => { event.currentTarget.style.transform = ""; }}>Get a wholesale quote <ArrowUpRight size={18}/></button>
            </div>
            <div className={styles.productStage}>
              <div className={styles.halo} aria-hidden="true" />
              <svg data-orbit className={styles.orbit} viewBox="0 0 500 500" aria-hidden="true"><defs><path id={`mg-orbit-${index}`} d="M250,250 m-220,0 a220,220 0 1,1 440,0 a220,220 0 1,1 -440,0"/></defs><text><textPath href={`#mg-orbit-${index}`} textLength="1382">PACKED AT ORIGIN · MADE FOR THE WORLD · THE TASTE OF PURITY · MONAGROW · </textPath></text></svg>
              <div className={styles.mouseLayer}><div data-pack className={styles.mainPack}><div className={styles.ingredientEntrance}><Image src={`/assets/hero-center-${product.ingredient}.png`} alt={`A wooden bowl of ${product.name.toLowerCase()}`} fill sizes="(max-width: 767px) 90vw, 43vw" preload={index === 0} className={styles.packImage}/></div></div></div>
              <div className={styles.productShadow} aria-hidden="true"/>
            </div>
            <div className={`${styles.ingredientCluster} ${styles.clusterLeft}`} style={{ backgroundPosition: product.atlas }} aria-hidden="true"/>
            <div className={`${styles.ingredientCluster} ${styles.clusterRight}`} style={{ backgroundPosition: product.atlas }} aria-hidden="true"/>
            <button data-side className={styles.sidePack} onClick={() => onOpenQuoteModal(QUOTE_NAMES[index])} aria-label={`Get a quote for Monagrow ${product.name}`}><span className={styles.packEntrance}><Image src={product.image} alt={`Monagrow ${product.name}, ${product.size} pack`} fill sizes="(max-width: 767px) 30vw, 21vw" preload={index === 0} className={styles.packImage}/></span></button>
            <div className={styles.productInfo}><span className={styles.infoLine}/><p className={styles.eyebrow}>{product.note}</p><h3>{product.name}</h3><p>{product.detail}</p><span className={styles.weight}>{product.size} <span>PACKED AT ORIGIN</span></span><button onClick={() => onOpenQuoteModal(QUOTE_NAMES[index])}>Explore this product <ArrowRight size={17}/></button></div>
            <span className={styles.sceneNumber} aria-hidden="true">0{index + 1} / 04</span>
          </article>
        ))}
      </div>
    </section>
  );
}
