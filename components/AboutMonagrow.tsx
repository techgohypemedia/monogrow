"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Sprout, PackageCheck, Ship } from "lucide-react";
import styles from "./AboutMonagrow.module.css";

interface AboutMonagrowProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export default function AboutMonagrow({ onOpenQuoteModal }: AboutMonagrowProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
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

  return (
    <section id="about-us" ref={sectionRef} className={styles.section} aria-labelledby="about-monagrow-title">
      <div className={styles.container}>
        <div data-about-reveal className={styles.eyebrowWrapper}>
          <p className={styles.eyebrow}>About Monagrow</p>
        </div>
        <div className={styles.aboutMonagrow}>
          <div className={styles.aboutHeading}>
            <div data-about-reveal>
              <h2 id="about-monagrow-title">
                <span className={styles.revealLine}><span data-reveal-line>Good ingredients.</span></span>
                <span className={styles.revealLine}><em data-reveal-line>Lasting partnerships.</em></span>
              </h2>
              <p className={styles.aboutSummary}>From the first sourcing conversation to the next shipment, we make the details of wholesale trade easier to navigate.</p>
              <ul className={styles.aboutProducts} aria-label="Our commodities">
                <li>Basmati rice</li>
                <li>Estate coffee</li>
                <li>Cane sugar</li>
                <li>Whole cashews</li>
              </ul>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <div data-about-reveal>
              <p>Monagrow is an agricultural commodity wholesaler and exporter connecting origin mills and growers with businesses around the world. Our collection brings together Basmati rice, estate coffee, refined cane sugar and whole cashews.</p>
              <p>We help buyers move from product selection to shipment with clear specifications, sourcing information and coordinated export support. Whether you are planning a trial order or a regular supply, we start with what your business needs.</p>
            </div>
            <article data-about-reveal className={styles.aboutDetail}>
              <Sprout size={24} aria-hidden="true" />
              <div>
                <h3>A closer connection to the source</h3>
                <p>Our sourcing conversations begin with origin mills and growers. We bring product specifications and origin information into the buying process so you can compare the grain, roast, grade or refinement that suits your market.</p>
              </div>
            </article>
            <article data-about-reveal className={styles.aboutDetail}>
              <PackageCheck size={24} aria-hidden="true" />
              <div>
                <h3>The right format for your business</h3>
                <p>Retail packs and bulk supply serve different needs. Tell us your required volume, preferred packaging and intended use, and we can discuss suitable options for your wholesale order, from a trial lot to recurring procurement.</p>
              </div>
            </article>
            <article data-about-reveal className={styles.aboutDetail}>
              <Ship size={24} aria-hidden="true" />
              <div>
                <h3>Clarity beyond the quotation</h3>
                <p>A useful quote starts with the destination, delivery terms and product requirements. We help coordinate documentation and shipment details, giving your team a clearer basis for planning the next stage of supply.</p>
              </div>
            </article>
            <div data-about-reveal className={styles.aboutNext}>
              <p>Planning your next order? Share the commodity, quantity and destination with our trade desk.</p>
              <a href="#calculator" onClick={() => onOpenQuoteModal?.("Direct Origin Procurement")}>
                Discuss your requirements <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="/about-us">
                More about Monagrow <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

