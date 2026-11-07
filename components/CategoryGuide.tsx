"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { coffeeOrigins, coffeeRoasts, coffeeMethods, sugarTypes, sugarGuides, dryFruitItems } from "@/data/categoryGuides";
import { categoryEditorial } from "@/data/categoryEditorial";
import { getProductById } from "@/data/commodityData";
import s from "./RiceGuide.module.css";
import c from "./CategoryGuide.module.css";

export type GuideCategory = keyof typeof categoryEditorial;
const dryMethods = [
  { n: "Breakfast", blurb: "A little crunch and chew make a simple breakfast more satisfying.", a: "Chopped nuts & fruit", b: "Scatter just before serving", steps: ["Choose unsalted nuts and dried fruit to suit your taste.", "Chop larger pieces into bite-sized pieces.", "Spoon over porridge, yoghurt or overnight oats.", "Add the nuts just before serving to keep their crunch."] },
  { n: "Baking", blurb: "Bring texture and richness to cookies, cakes and breads.", a: "Walnuts, almonds & raisins", b: "Follow your recipe", steps: ["Weigh your nuts and fruit before starting.", "Chop evenly so they distribute through the mixture.", "Soften firm dried fruit if your recipe calls for it, then drain.", "Fold in gently and bake using your recipe’s time and temperature."] },
  { n: "Salads", blurb: "Balance fresh leaves with a crunchy, naturally sweet finish.", a: "Nuts & sliced dried fruit", b: "Add at the end", steps: ["Prepare the salad and dressing separately.", "Roughly chop a small handful of nuts.", "Slice dates, figs or apricots into small pieces.", "Dress the salad, then scatter the nuts and fruit over the top."] },
  { n: "Cashew sauces", blurb: "A smooth base for creamy curries, dips and dressings.", a: "Plain cashews", b: "Blend until smooth", steps: ["Soften cashews according to your chosen recipe.", "Drain and transfer to a blender.", "Add fresh water a little at a time and blend until smooth.", "Season or add to your dish as directed; refrigerate any prepared leftovers promptly."] },
];
const metrics = { k: ["Energy", "kcal"], p: ["Protein", "g"], f: ["Fat", "g"], fi: ["Fibre", "g"] } as const;
const coffeeMethodProducts: Record<string, string> = {
  Espresso: "estate-coffee",
  "Pour-over (V60)": "himalayan-peaberry",
  "French Press": "monsooned-malabar",
  AeroPress: "medium-roast-arabica",
  "Cold Brew": "estate-coffee",
};
const sugarMethodProducts: Record<string, string> = {
  "Baking cakes and cookies": "natural-brown-sugar",
  Meringue: "cane-sugar",
  "Icing and frosting": "cane-sugar",
  Caramel: "cane-sugar",
  "Sweetening drinks": "natural-brown-sugar",
};
const dryMethodProducts: Record<string, string> = {
  Breakfast: "california-almonds",
  Baking: "kashmiri-walnuts",
  Salads: "golden-raisins",
  "Cashew sauces": "royal-cashews",
};

export default function CategoryGuide({ category, onQuote }: { category: GuideCategory; onQuote: (name?: string) => void }) {
  const content = categoryEditorial[category];
  const root = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState(0);
  const [roast, setRoast] = useState(1);
  const [metric, setMetric] = useState<keyof typeof metrics>("fi");
  const [calcChoice, setCalcChoice] = useState(category === "coffee" ? 1 : 0);
  const [amount, setAmount] = useState(category === "coffee" ? "320" : category === "sugar" ? "20" : "30");
  const isCoffee = category === "coffee";
  const isSugar = category === "sugar";
  const numeric = Number(amount);
  const valid = amount.trim() !== "" && Number.isFinite(numeric) && numeric > 0 && numeric <= 10000;
  const brewing = coffeeMethods[selection];
  const cooking = sugarGuides[selection];
  const pairing = dryMethods[selection];
  const methods = isCoffee ? coffeeMethods : isSugar ? sugarGuides : dryMethods;
  const selected = methods[selection];
  const methodProducts = isCoffee ? coffeeMethodProducts : isSugar ? sugarMethodProducts : dryMethodProducts;
  const product = getProductById(methodProducts[selected.n]);
  const pack = product?.packImg ?? content.pack;
  const packName = product?.name ?? content.packName;
  const rows = isCoffee ? coffeeOrigins.map(x => ({ name: x.n, description: x.desc, detail: x.notes.join(" · "), use: `${x.pr} · ${x.body} body` })) : isSugar ? sugarTypes.map(x => ({ name: x.n, description: x.d, detail: x.tx, use: x.use })) : dryFruitItems.map(x => ({ name: x.n, description: x.d, detail: x.tx, use: x.use }));
  const result = isCoffee ? [["Ground coffee", valid ? (numeric / coffeeMethods[calcChoice].ratio).toFixed(1) : "—", "g"], [calcChoice === 0 ? "Espresso yield" : "Water", valid ? numeric.toLocaleString() : "—", calcChoice === 0 ? "g" : "ml"], ["Brew ratio", coffeeMethods[calcChoice].rl, ""]] : isSugar ? [["Sugar", valid ? numeric.toLocaleString() : "—", "g"], ["Level teaspoons", valid ? (numeric / 4).toFixed(1) : "—", ""], ["Energy, approx.", valid ? Math.round(numeric * 4).toLocaleString() : "—", "kcal"]] : (Object.keys(metrics) as (keyof typeof metrics)[]).map(key => [metrics[key][0], valid ? (dryFruitItems[calcChoice][key] * numeric / 100).toFixed(key === "k" ? 0 : 1) : "—", metrics[key][1]]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (motion.matches) return;
      const animation = entry.target.animate([{ opacity: 0, transform: "translateY(26px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 750, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }), { threshold: .08 });
    element.querySelectorAll(`header, article, .${s.story}, .${s.recipe}, .${s.calculator}, .${s.faq}`).forEach(node => observer.observe(node));
    const cancel = () => { if (motion.matches) { animations.forEach(a => a.cancel()); animations.clear(); } };
    motion.addEventListener("change", cancel);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); motion.removeEventListener("change", cancel); };
  }, []);

  return <div ref={root} className={s.guide}>
    <section className={s.section}><header className={s.heading}><h2>{content.title}<br /><em>{content.emphasis}</em></h2><p>{content.intro}</p></header><div className={s.basics}>{content.basics.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className={s.story}><div className={s.storyImage}><Image src={content.image} alt={content.imageAlt} fill sizes="(max-width:760px) 100vw, 45vw" /></div><div><h2>{content.storyTitle}<br /><em>{content.storyEmphasis}</em></h2><p>{content.story}</p><p>{content.storyEnd}</p><button type="button" className={s.button} onClick={() => onQuote()}>Find your {isCoffee ? "coffee" : isSugar ? "sugar" : "selection"} ↗</button></div></div></section>

    <section className={`${s.section} ${s.tinted}`}><header className={s.heading}><h2>{isCoffee ? "Different origins." : "Know the variety."}<br /><em>{isCoffee ? "Distinctive cups." : "Find your favourite."}</em></h2><p>{isCoffee ? "Explore typical flavour profiles from coffee-growing regions. Origin offers a starting point; variety, processing and roast all influence the final cup." : "Explore textures, flavours and ways to use them. This is an ingredient guide; our available Monagrow products are shown in the collection above."}</p></header><div className={s.varieties}>{rows.map(row => <article key={row.name}><h3>{row.name}</h3><p>{row.description}</p><dl><dt>{isCoffee ? "Typical notes" : "Texture & character"}</dt><dd>{row.detail}</dd><dt>{isCoffee ? "Processing & body" : "Works well in"}</dt><dd>{row.use}</dd></dl></article>)}</div></section>

    <section className={`${s.section} ${s.split}`}><header className={s.heading}><h2>{isCoffee ? "Find your roast." : "A closer look."}<br /><em>{isCoffee ? "Make it your own." : "Understand your portion."}</em></h2><p>{isCoffee ? "Roast changes the balance of acidity, sweetness and body. These profiles are a sensory guide, not measurements of a particular coffee." : "Illustrative nutrition per 100 g, adapted from the supplied ingredient guide. Values vary by variety and processing; use the product label for your purchase."}</p></header><div>
      {isCoffee ? <><div className={s.filters} aria-label="Select roast">{coffeeRoasts.map((r, i) => <button key={r.n} type="button" aria-pressed={roast === i} onClick={() => setRoast(i)}>{r.n}</button>)}</div><div className={c.roast} aria-live="polite"><h3>{coffeeRoasts[roast].n} roast</h3><p>{coffeeRoasts[roast].d}</p><dl><dt>Try it with</dt><dd>{coffeeRoasts[roast].best}</dd></dl>{([['Acidity', 'acid'], ['Body', 'body'], ['Sweetness', 'sweet'], ['Bitterness', 'bitter']] as const).map(([label, key]) => <div className={c.roastRow} key={key}><span>{label}</span><div className={s.track}><span style={{ width: `${coffeeRoasts[roast][key]}%` }} /></div></div>)}</div></> : isSugar ? <div className={s.chart}>{[{n:"White sugar",k:390},{n:"Brown sugar",k:380},{n:"Muscovado",k:383},{n:"Molasses",k:290}].map(row => <div key={row.n}><div className={s.chartLabel}><span>{row.n}</span><strong>{row.k} kcal</strong></div><div className={s.track}><span style={{ width:`${row.k / 390 * 100}%` }} /></div></div>)}<p className={s.note}>Choose for flavour and function. These are general reference values, not product-specific nutrition declarations.</p></div> : <><div className={s.filters} aria-label="Select nutrient">{(Object.keys(metrics) as (keyof typeof metrics)[]).map(key => <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key)}>{metrics[key][0]}</button>)}</div><div className={s.chart} aria-live="polite">{dryFruitItems.map(row => <div key={row.n}><div className={s.chartLabel}><span>{row.n}</span><strong>{row[metric]} {metrics[metric][1]}</strong></div><div className={s.track}><span style={{ width:`${row[metric] / Math.max(...dryFruitItems.map(x => x[metric])) * 100}%` }} /></div></div>)}</div></>}
    </div></section>

    <section className={`${s.section} ${s.cooking}`}><header className={s.heading}><h2>{isCoffee ? "Brew with care." : isSugar ? "Sweetness with purpose." : "More than a handful."}<br /><em>{isCoffee ? "Enjoy every sip." : isSugar ? "Make something lovely." : "Make it part of your day."}</em></h2><p>{isCoffee ? "Choose a method for a practical starting recipe. Adjust one variable at a time to suit your beans and taste." : "Simple preparation ideas for everyday ingredients. Choose a method, then follow your recipe and product instructions."}</p></header><div className={s.filters} aria-label="Choose preparation method">{methods.map((method, i) => <button key={method.n} type="button" aria-pressed={selection === i} onClick={() => setSelection(i)}>{method.n}</button>)}</div><div className={s.recipe} aria-live="polite"><div className={s.cookingVisual} key={`${pack}-${selection}`}><Image src={pack} alt={packName} width={400} height={500} sizes="(max-width:760px) 75vw, 25vw" /><p>From our collection: {packName}</p></div><div className={s.cookingDetails} key={selected.n}><h3>{selected.n}</h3><p>{selected.blurb}</p><dl><dt>{isCoffee ? "Grind" : "Ingredients"}</dt><dd>{isCoffee ? brewing.grind : isSugar ? cooking.a : pairing.a}</dd><dt>{isCoffee ? "Time & temperature" : "Preparation"}</dt><dd>{isCoffee ? `${brewing.time} · ${brewing.temp}` : isSugar ? cooking.b : pairing.b}</dd>{isCoffee && <><dt>Starting recipe</dt><dd>{brewing.dose}</dd></>}</dl></div><ol>{selected.steps.map(step => <li key={step}>{step}</li>)}</ol></div></section>

    <section className={`${s.section} ${s.split}`}><header className={s.heading}><h2>{isCoffee ? "Your daily brew." : "Just the right amount."}<br /><em>Simply measured.</em></h2><p>{isCoffee ? "Set your method and batch size. We will work out a starting coffee dose." : isSugar ? "Convert grams to approximate level teaspoons and energy in one step." : "Choose an ingredient and portion to estimate its nutrition. Check the label for your exact product."}</p></header><form className={s.calculator} onSubmit={e => e.preventDefault()} aria-label={`${category} calculator`}><div className={s.fields}>
      {!isSugar && <label htmlFor={`${category}-choice`}>{isCoffee ? "Method" : "Variety"}<select id={`${category}-choice`} value={calcChoice} onChange={e => { const next = Number(e.target.value); setCalcChoice(next); if (isCoffee) setAmount(next === 0 ? "36" : "320"); }}>{(isCoffee ? coffeeMethods : dryFruitItems).map((item, i) => <option key={item.n} value={i}>{item.n}</option>)}</select></label>}
      <label htmlFor={`${category}-amount`}>{isCoffee ? calcChoice === 0 ? "Espresso yield (g)" : "Water (ml)" : isSugar ? "Sugar (g)" : "Portion (g)"}<input id={`${category}-amount`} type="number" min="0.1" max="10000" step="any" value={amount} onChange={e => setAmount(e.target.value)} aria-invalid={!valid} aria-describedby={!valid ? `${category}-error` : undefined} /></label></div>{!valid && <p className={s.fieldError} id={`${category}-error`}>Enter an amount greater than 0 and no more than 10,000.</p>}<div className={s.resultPanel} aria-live="polite" aria-atomic="true"><div className={`${s.results} ${!isCoffee && !isSugar ? c.fourResults : ""}`}>{result.map(([label, value, unit]) => <div key={label}><span>{label}</span><strong>{value}<small> {unit}</small></strong></div>)}</div></div><p className={s.note}>{isCoffee ? calcChoice === 0 ? "Espresso uses beverage yield by weight, not the water in your machine’s tank." : "Starting ratio by weight; 1 ml of water is approximately 1 g. Adjust to taste." : isSugar ? "Assumes 4 g per level teaspoon and roughly 4 kcal per gram. Spoon weights vary by sugar type." : "Approximate values for plain ingredients. Coatings, salt and added sugar change the result."}</p></form></section>

    <section className={`${s.section} ${s.tinted}`}><header className={s.heading}><h2>Store with care.<br /><em>Keep the character.</em></h2></header><div className={s.basics}>{content.storage.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className={`${s.section} ${s.split}`}><header className={s.heading}><h2>A few questions.<br /><em>Clear answers.</em></h2></header><div className={s.faq}>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  </div>;
}
