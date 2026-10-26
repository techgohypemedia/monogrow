"use client";

import { useEffect, useRef } from "react";
import { loadHeroMotion } from "./heroMotion";
import styles from "./ProductMarquee.module.css";

const ROWS = [
  ["Basmati rice", "Estate coffee", "Royal cashews", "Pure cane sugar"],
  ["Grown with care", "Packed at origin", "Shared with the world"],
];

export default function ProductMarquee() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadHeroMotion().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      const setup = (distance: number) => {
        const section = root.current!;
        section.dataset.animated = "true";
        const progress = { value: 0 };
        section.style.setProperty("--distance", `${distance}px`);
        const tween = gsap.to(progress, {
          value: 1,
          ease: "none",
          onUpdate: () => section.style.setProperty("--travel", `${progress.value * distance}px`),
          scrollTrigger: {
            trigger: section, start: "top bottom", end: "bottom top",
            scrub: 1.2, invalidateOnRefresh: true,
          },
        });
        ScrollTrigger.refresh();
        return () => {
          tween.kill();
          delete section.dataset.animated;
          section.removeAttribute("style");
        };
      };
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => setup(300));
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => setup(90));
      cleanup = () => media.revert();
    }).catch(() => { /* Keep both rows readable when animation libraries fail. */ });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={root} className={styles.section} aria-label="The Monagrow collection">
      <p className="sr-only">Basmati rice, estate coffee, royal cashews, and pure cane sugar. Grown with care. Packed at origin. Shared with the world.</p>
      {ROWS.map((words, row) => (
        <div key={row} className={`${styles.track} ${row === 1 ? styles.outline : ""}`} aria-hidden="true">
          {[0, 1].map(copy => (
            <div key={copy} className={`${styles.group} ${copy ? styles.repeat : ""}`}>
              {words.map(word => <span className={styles.item} key={word}>{word}<span className={styles.seed} /></span>)}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
