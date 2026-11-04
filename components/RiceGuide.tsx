"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { varieties, nut, guides, calcTypes } from "@/data/riceGuide";
import styles from "./RiceGuide.module.css";

const basics = [
  ["Grain length", "A shape for every dish.", "Long grains tend to cook light and separate. Shorter grains cling together, lending themselves to sushi, rice bowls and creamy risotto."],
  ["Starch", "The secret to texture.", "The balance of starches influences how rice cooks. Some varieties stay firm and fluffy; others release starch for a creamy or sticky finish."],
  ["Aroma", "Distinctive from the start.", "Basmati and jasmine bring their own natural fragrance. Choose basmati for delicate, separate grains and jasmine for a softer, gently fragrant bowl."],
  ["Milling", "Whole grain or polished.", "Brown rice retains its bran for a nuttier flavour and more chew. White rice has the bran removed, giving it a softer texture and shorter cooking time."],
];
const faqs = [
  ["Should I rinse or soak rice?", "Rinse most plain rice to remove loose surface starch. Basmati often benefits from a short soak; drain well afterwards. Skip rinsing Arborio for risotto, where starch helps build creaminess. Follow your pack instructions."],
  ["How do white and brown rice differ?", "Brown rice retains its bran, giving it more fibre and a firmer, nuttier texture. White rice is milled for a softer, milder grain. Choose for your dish and allow more cooking time for brown rice."],
  ["Does glutinous rice contain gluten?", "The name describes its sticky texture, not gluten. Plain rice is naturally gluten-free; check flavoured rice and prepared products for added ingredients and allergen information."],
  ["Is wild rice actually rice?", "Wild rice is the seed of an aquatic grass in the genus Zizania. Its chewy texture makes it a useful addition to soups, salads and grain blends."],
  ["What does parboiled or sella mean?", "Rice is treated with water and heat while still in its husk, then dried and milled. The grains are firmer and tend to remain separate, making them useful for biryani and larger batches."],
  ["Why does jasmine rice smell fragrant?", "Like basmati, jasmine contains a naturally occurring aroma compound called 2-acetyl-1-pyrroline. Its fragrance changes with storage, which is why freshness matters when choosing aromatic rice."],
  ["How should I choose rice for my business?", "Start with the dish, grain length and cooking method. Then agree the grade, packaging, quantity and destination. Ask our team for current specifications and a sample before confirming your order."],
];
const metrics = { k: ["Energy", "kcal"], p: ["Protein", "g"], f: ["Fat", "g"], fi: ["Fibre", "g"] } as const;
const cookingLooks = [
  { pack: "/assets/monagrow-rice-bag-cutout.png" },
  { pack: null },
  { pack: null },
  { pack: null },
  { pack: null },
  { pack: "/assets/monagrow-brown-rice-bag-cutout.png" },
  { pack: null },
];

export default function RiceGuide({ onOpenQuoteModal }: { onOpenQuoteModal: (name?: string) => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (motion.matches) return;
        const element = entry.target as HTMLElement;
        const siblings = Array.from(element.parentElement?.children ?? []);
        const stagger = element.tagName === "ARTICLE" ? (siblings.indexOf(element) % 3) * 85 : 0;
        const animation = element.animate([
          { opacity: 0, transform: "translateY(30px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 750, delay: stagger, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.08 });
    container.querySelectorAll(`.${styles.heading}, article, .${styles.storyImage}, .${styles.story} > div:last-child, .${styles.chart}, .${styles.recipe}, .${styles.calculator}, .${styles.faq}`).forEach(element => observer.observe(element));
    const cancelAnimations = () => {
      if (motion.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    motion.addEventListener("change", cancelAnimations);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      motion.removeEventListener("change", cancelAnimations);
    };
  }, []);
  const [guideIndex, setGuideIndex] = useState(0);
  const [metric, setMetric] = useState<keyof typeof metrics>("fi");
  const [riceType, setRiceType] = useState(0);
  const [people, setPeople] = useState("4");
  const [portion, setPortion] = useState(60);
  const guide = guides[guideIndex];
  const look = cookingLooks[guideIndex];
  const count = Number(people);
  const valid = Number.isInteger(count) && count >= 1 && count <= 100;
  const raw = count * portion;
  // Volume ratios require conversion from dry rice weight, not grams treated as millilitres.
  const water = Math.round(raw / 185 * 240 * calcTypes[riceType].w);
  const max = Math.max(...nut.map(row => row[metric]));
  return <div ref={root} className={styles.guide}>
    
    <section className={styles.section} id="rice-story">
      <header className={styles.heading}><h2>Small grain.<br /><em>A world of difference.</em></h2><p>From a fragrant biryani to a comforting rice bowl, the right grain changes everything. Get to know its shape, texture and character.</p></header>
      <div className={styles.basics}>{basics.map(([label, title, text]) => <article key={label}><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className={styles.story}><div className={styles.storyImage}><Image src="/assets/about-banner-rice.jpg" alt="Rice fields at origin" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div><h2>Rooted in tradition.<br /><em>Shared at every table.</em></h2><p>Rice has been cultivated for thousands of years. Across Asia and beyond, generations of growers and cooks have shaped a remarkable family of grains.</p><p>Basmati is woven into the food traditions of the Indian subcontinent. Jasmine, sushi rice and Arborio tell other stories, each with its own texture, preparation and place at the table.</p><p>At Monagrow, choosing rice starts with understanding what you need it to do: cook beautifully, suit your menu and meet your market’s requirements.</p><button className={styles.button} onClick={() => onOpenQuoteModal("Rice sourcing inquiry")}>Find your rice ↗</button></div></div>
    </section>
    <section className={`${styles.section} ${styles.tinted}`} id="rice-varieties"><header className={styles.heading}><h2>A grain for<br /><em>every kind of cooking.</em></h2><p>Explore popular rice types around the world. This guide explains their differences; see our collection above for Monagrow products.</p></header><div className={styles.varieties}>{varieties.map(v => <article key={v.n}><h3>{v.n}</h3><p>{v.d}</p><dl><dt>Origin</dt><dd>{v.o}</dd><dt>Texture</dt><dd>{v.tx}</dd><dt>Best for</dt><dd>{v.use}</dd></dl></article>)}</div></section>
    <section className={`${styles.section} ${styles.split}`} id="rice-nutrition"><header className={styles.heading}><h2>Inside<br /><em>every bowl.</em></h2><p>Approximate nutrition per 100 g of plain cooked rice. These illustrative values vary with the grain and cooking method.</p></header><div><div className={styles.filters} aria-label="Choose nutrient">{(Object.keys(metrics) as (keyof typeof metrics)[]).map(key => <button key={key} aria-pressed={metric === key} onClick={() => setMetric(key)}>{metrics[key][0]}</button>)}</div><div className={styles.chart} aria-live="polite">{nut.map(row => <div key={row.n}><div className={styles.chartLabel}><span>{row.n}</span><strong>{row[metric]} {metrics[metric][1]}</strong></div><div className={styles.track}><span style={{ width: `${row[metric] / max * 100}%` }} /></div></div>)}</div><p className={styles.note}>A general comparison, not a Monagrow product declaration. For packaged products, use the nutrition information on the label.</p></div></section>
    <section className={`${styles.section} ${styles.cooking}`} id="rice-cooking"><header className={styles.heading}><h2>Make every<br /><em>grain count.</em></h2><p>Simple stovetop starting points. Check your pack and adjust for your pan, heat and preferred texture.</p></header><div className={styles.filters} aria-label="Choose cooking guide">{guides.map((g, i) => <button key={g.n} aria-pressed={i === guideIndex} onClick={() => setGuideIndex(i)}>{g.n}</button>)}</div><div className={styles.recipe} aria-live="polite"><div className={styles.cookingVisual} key={guide.n + "-visual"}><Image src={look.pack ?? "/assets/monagrow-rice-bag-cutout.png"} alt={guideIndex === 5 ? "Monagrow brown rice product pack" : "Monagrow basmati rice product pack"} width={400} height={500} sizes="(max-width: 760px) 75vw, 25vw" /><p>{look.pack ? "The Monagrow collection" : "From our collection: Monagrow Basmati Rice"}</p></div><div key={guide.n + "-details"} className={styles.cookingDetails}><h3>{guide.n}</h3><p>{guide.blurb}</p><dl><dt>Rice : liquid, by volume</dt><dd>{guide.ratio}</dd><dt>Preparation</dt><dd>{guide.grind}</dd><dt>Cooking time</dt><dd>{guide.time}</dd></dl></div><ol>{guide.steps.map(step => <li key={step}>{step}</li>)}</ol></div></section>
    <section className={`${styles.section} ${styles.split}`} id="rice-calculator">
      <header className={styles.heading}><h2>Just enough.<br /><em>Beautifully simple.</em></h2><p>Plan a meal without the guesswork. Choose your rice, set the number of people and find the right portion for your table.</p></header>
      <form className={styles.calculator} onSubmit={event => event.preventDefault()} aria-label="Rice portion calculator">
        <div className={styles.fields}>
          <label htmlFor="portion-rice">Rice variety<select id="portion-rice" value={riceType} onChange={e => setRiceType(Number(e.target.value))}>{calcTypes.map((type, i) => <option key={type.n} value={i}>{type.n}</option>)}</select></label>
          <div><label htmlFor="portion-people">People</label><div className={styles.stepper}><button type="button" aria-label="One fewer person" disabled={valid && count <= 1} onClick={() => setPeople(String(Math.max(1, (valid ? count : 2) - 1)))}>−</button><input id="portion-people" type="number" min="1" max="100" step="1" inputMode="numeric" value={people} onChange={e => setPeople(e.target.value)} aria-invalid={!valid} aria-describedby={!valid ? "rice-people-error" : undefined} /><button type="button" aria-label="One more person" disabled={valid && count >= 100} onClick={() => setPeople(String(Math.min(100, (valid ? count : 0) + 1)))}>+</button></div></div>
        </div>
        {!valid && <p className={styles.fieldError} id="rice-people-error">Enter a whole number from 1 to 100.</p>}
        <fieldset className={styles.servingChoices}><legend>Serving</legend>{[{value:60, title:"Side dish"}, {value:90, title:"Main dish"}].map(option => <label key={option.value}><input type="radio" name="rice-serving" value={option.value} checked={portion === option.value} onChange={() => setPortion(option.value)} /><span><strong>{option.title}</strong><b>{option.value} g per person</b></span></label>)}</fieldset>
        <div className={styles.resultPanel} aria-live="polite" aria-atomic="true"><div className={styles.results}><div><span>Dry rice</span><strong>{valid ? raw.toLocaleString() : "—"}<small> g</small></strong></div><div><span>Water</span><strong>{valid ? water.toLocaleString() : "—"}<small> ml</small></strong></div><div><span>Cooked, approx.</span><strong>{valid ? Math.round(raw * 2.8).toLocaleString() : "—"}<small> g</small></strong></div></div></div>
        <p className={styles.note}>Estimates only. Follow your pack instructions.</p><details className={styles.calculationNote}><summary>How we estimate quantities</summary><p>Water uses a 1 : {calcTypes[riceType].w} rice-to-water volume ratio, with an estimated 185 g of dry rice per 240 ml cup. Cooked weight is estimated at 2.8 times dry weight. Actual absorption and yield vary.</p></details>
      </form>
    </section>
    <section className={`${styles.section} ${styles.tinted}`} id="rice-storage"><header className={styles.heading}><h2>Store with care.<br /><em>Serve with confidence.</em></h2></header><div className={styles.basics}>{[["White rice", "Cool, dry and sealed.", "Keep uncooked rice airtight, away from moisture, heat and pests. Follow the pack’s best-before date and storage instructions."], ["Brown & wild rice", "Protect their natural oils.", "Store sealed in a cool place and follow the pack’s guidance. Whole-grain rice generally keeps for less time than white rice."], ["After cooking", "Cool promptly.", "If not serving immediately, cool rice quickly, ideally within an hour, and refrigerate. Dividing it into smaller portions helps it cool."], ["Ready to eat", "Reheat just once.", "Use refrigerated cooked rice within 24 hours. Reheat until steaming hot throughout, and do not reheat it more than once."]].map(([label, title, text]) => <article key={label}><h3>{title}</h3><p>{text}</p></article>)}</div><a className={styles.source} href="https://www.foodstandards.gov.scot/consumer-advice/food-safety/food-safety-in-the-kitchen/food-storage" target="_blank" rel="noreferrer">Food storage guidance from Food Standards Scotland ↗</a></section>
    <section className={`${styles.section} ${styles.split}`} id="rice-faq"><header className={styles.heading}><h2>A few questions.<br /><em>Clear answers.</em></h2></header><div className={styles.faq}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  </div>;
}
