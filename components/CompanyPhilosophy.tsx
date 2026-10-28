"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sprout, PackageCheck, Ship } from "lucide-react";
import styles from "./CompanyPhilosophy.module.css";

interface CompanyPhilosophyProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

const stages = [
  {
    name: "Origin", title: "Good things begin with good ground.",
    copy: "From Basmati-growing regions to coffee estates, we work directly with registered origin mills and growers. A shorter route to the source means a clearer story behind every lot.",
    tags: ["Direct sourcing", "Registered mills", "Origin traceability"],
    image: "/assets/about-farm-estate.jpg", alt: "Sunlight falling across green terraced farmland in a mountain valley",
  },
  {
    name: "Selection", title: "Carefully selected. Never left to chance.",
    copy: "Long-grain Basmati, estate Arabica, refined cane sugar and handpicked cashews. Each commodity is selected to its own specification, with attention to the details that matter to your business.",
    tags: ["Basmati & Arabica", "Sugar & cashews", "Lot specifications"],
    image: "/assets/why-grain-inspector.jpg", alt: "A quality specialist examining grain samples beside trays and jars of commodities",
  },
  {
    name: "Verification", title: "Purity you can put to the test.",
    copy: "Know what you are buying before you commit. Laboratory specifications, moisture metrics and harvest information bring clarity to the conversation, from your first sample to your shipment.",
    tags: ["Lab specifications", "Moisture checks", "Sample evaluation"],
    image: "/assets/monagrow-product-testing-lab.jpg", alt: "A laboratory specialist using a microscope to examine food commodity samples",
  },
  {
    name: "Dispatch", title: "From our origins to your next chapter.",
    copy: "Care continues beyond the harvest. Documented lots, coordinated container loading and export support connect the quality at origin with the needs of buyers around the world.",
    tags: ["Export documentation", "Container loading", "Global trade"],
    image: "/assets/about-global-port.jpg", alt: "Shipping containers and cargo cranes at an illuminated international port",
  },
];

export default function CompanyPhilosophy({ onOpenQuoteModal }: CompanyPhilosophyProps) {
  const [active, setActive] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const steps = useRef<(HTMLElement | null)[]>([]);
  const about = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = about.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reduced.matches) return;
        const elements = entry.target.querySelectorAll("[data-reveal-line], p, h3, li, a, :scope > svg");
        elements.forEach((element, index) => {
          const isLine = element.hasAttribute("data-reveal-line");
          const isIcon = element.tagName.toLowerCase() === "svg";
          const animation = element.animate([
            { opacity: 0, transform: isIcon ? "translateY(14px) scale(.75) rotate(-12deg)" : `translateY(${isLine ? 50 : 24}px)`, filter: "blur(3px)" },
            { opacity: 1, transform: "translateY(0) scale(1) rotate(0)", filter: "blur(0px)" },
          ], { duration: isLine ? 1050 : 800, delay: Math.min(index * 100, 600), easing: "cubic-bezier(.22, 1, .36, 1)", fill: "backwards" });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      });
    }, { threshold: .12, rootMargin: "0px 0px -32px 0px" });
    section.querySelectorAll("[data-about-reveal]").forEach(element => observer.observe(element));
    const stop = () => { if (reduced.matches) { animations.forEach(animation => animation.cancel()); animations.clear(); } };
    reduced.addEventListener("change", stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); reduced.removeEventListener("change", stop); };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const mobile = window.innerWidth < 768;
      // Track the center of the reading area below the sticky mobile image.
      // Its resting position stays stable while the browser toolbar changes.
      const panelBottom = panel.current
        ? parseFloat(getComputedStyle(panel.current).top) + panel.current.offsetHeight
        : height * .4;
      const target = mobile ? panelBottom + Math.max(0, height - panelBottom) * .5 : height * .52;
      let closest = 0;
      let distance = Infinity;
      steps.current.forEach((step, index) => {
        if (!step) return;
        const rect = step.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - target);
        if (nextDistance < distance) { distance = nextDistance; closest = index; }
      });
      const sideways = mobile && height >= 600 && !reduced.matches;
      if (story.current && viewport.current) {
        story.current.dataset.sideways = String(sideways);
        if (sideways) {
          const travel = story.current.offsetHeight - viewport.current.offsetHeight;
          const progress = Math.max(0, Math.min(1, (84 - story.current.getBoundingClientRect().top) / Math.max(1, travel)));
          // Pause briefly at each complete slide so its copy is easy to read.
          const position = progress * (stages.length - 1);
          const index = Math.min(stages.length - 1, Math.floor(position));
          const fraction = Math.max(0, Math.min(1, (position - index - .45) / .55));
          const slide = Math.min(stages.length - 1, index + fraction * fraction * (3 - 2 * fraction));
          story.current.style.setProperty("--journey-progress", String(slide));
          closest = Math.round(slide);
        }
      }
      setActive(closest);
      if (heading.current) {
        const top = heading.current.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, (height - top) / (height * .65)));
        const offset = reduced.matches ? 0 : Math.pow(1 - progress, 3) * Math.min(window.innerWidth * .45, 460);
        heading.current.style.setProperty("--split-offset", `${offset}px`);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section id="about-us" className={styles.section} aria-labelledby="origin-heading">
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}><span /> Our origin standard</p>
          <h2 id="origin-heading" ref={heading} className={styles.headline}>
            <span>Rooted in origin,</span>
            <span><em>delivered</em> with care.</span>
          </h2>
          <div className={styles.principles}>
            <p className={styles.lead}>Exceptional ingredients have a story. Ours starts at the source, with the people who grow them. No unnecessary layers. Just a shared respect for quality.</p>
            <div className={styles.principle}><span className={styles.mark}>i</span><h3>Closer to source</h3><p>Direct relationships with origin mills and estates.</p></div>
            <div className={styles.principle}><span className={styles.mark}>ii</span><h3>Clear by nature</h3><p>Documented specifications. Informed buying decisions.</p></div>
            <div className={styles.principle}><span className={styles.mark}>iii</span><h3>Care in every lot</h3><p>Thoughtful selection, from the first sample to dispatch.</p></div>
          </div>
        </header>

        <div className={styles.storyLabel}><span>From origin to opportunity</span><span>Follow the journey <ArrowDown size={14} aria-hidden="true" /></span></div>
        <div ref={story} className={styles.story}>
          <div ref={viewport} className={styles.storyViewport}>
          <div ref={panel} className={styles.photoPanel}>
            {stages.map((stage, index) => (
              <div key={stage.name} style={{ "--stage-index": index } as CSSProperties} className={`${styles.photo} ${active === index ? styles.photoActive : ""}`} aria-hidden={active !== index}>
                <Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 767px) 92vw, 48vw" />
              </div>
            ))}
            <div className={styles.shade} />
            <div className={styles.photoCaption}>
              <div className={styles.counter}>{String(active + 1).padStart(2, "0")}<span>/ 04</span></div>
              <div className={styles.photoMeta}><span>{stages[active].name}</span><div className={styles.progress} aria-hidden="true">{stages.map((stage, index) => <span key={stage.name} data-active={index === active} />)}</div></div>
            </div>
          </div>
          <div className={styles.steps}>
            {stages.map((stage, index) => (
              <article key={stage.name} ref={(el) => { steps.current[index] = el; }} className={styles.step} data-active={active === index}>
                <h3>{stage.title}</h3>
                <p className={styles.stepCopy}>{stage.copy}</p>
                <ul className={styles.tags}>{stage.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
          </div>
        </div>
        <section ref={about} className={styles.aboutMonagrow} aria-labelledby="about-monagrow-title">
          <div className={styles.aboutHeading}>
            <div data-about-reveal>
            <p className={styles.eyebrow}><span /> About Monagrow</p>
            <h2 id="about-monagrow-title"><span className={styles.revealLine}><span data-reveal-line>Good ingredients.</span></span><span className={styles.revealLine}><em data-reveal-line>Lasting partnerships.</em></span></h2>
            <p className={styles.aboutSummary}>From the first sourcing conversation to the next shipment, we make the details of wholesale trade easier to navigate.</p>
            <ul className={styles.aboutProducts} aria-label="Our commodities"><li>Basmati rice</li><li>Estate coffee</li><li>Cane sugar</li><li>Whole cashews</li></ul>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <div data-about-reveal>
            <p>Monagrow is an agricultural commodity wholesaler and exporter connecting origin mills and growers with businesses around the world. Our collection brings together Basmati rice, estate coffee, refined cane sugar and whole cashews.</p>
            <p>We help buyers move from product selection to shipment with clear specifications, sourcing information and coordinated export support. Whether you are planning a trial order or a regular supply, we start with what your business needs.</p>
            </div>
            <article data-about-reveal className={styles.aboutDetail}>
              <Sprout size={24} aria-hidden="true" />
              <div><h3>A closer connection to the source</h3><p>Our sourcing conversations begin with origin mills and growers. We bring product specifications and origin information into the buying process so you can compare the grain, roast, grade or refinement that suits your market.</p></div>
            </article>
            <article data-about-reveal className={styles.aboutDetail}>
              <PackageCheck size={24} aria-hidden="true" />
              <div><h3>The right format for your business</h3><p>Retail packs and bulk supply serve different needs. Tell us your required volume, preferred packaging and intended use, and we can discuss suitable options for your wholesale order, from a trial lot to recurring procurement.</p></div>
            </article>
            <article data-about-reveal className={styles.aboutDetail}>
              <Ship size={24} aria-hidden="true" />
              <div><h3>Clarity beyond the quotation</h3><p>A useful quote starts with the destination, delivery terms and product requirements. We help coordinate documentation and shipment details, giving your team a clearer basis for planning the next stage of supply.</p></div>
            </article>
            <div data-about-reveal className={styles.aboutNext}>
              <p>Planning your next order? Share the commodity, quantity and destination with our trade desk.</p>
              <a href="#calculator">Discuss your requirements <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a href="/about-us">More about Monagrow <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
