"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
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
      </div>
    </section>
  );
}
