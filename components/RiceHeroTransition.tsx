"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface RiceHeroTransitionProps {
  heroPackId?: string;
  targetPackId?: string;
  targetBowlId?: string;
  targetCardId?: string;
}

export default function RiceHeroTransition({
  heroPackId = "rice-hero-pack",
  targetPackId = "rice-target-pack",
  targetBowlId = "rice-target-bowl",
  targetCardId = "basmati-rice",
}: RiceHeroTransitionProps) {
  const flyingPackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById(heroPackId);
    const target = document.getElementById(targetPackId);
    const bowl = document.getElementById(targetBowlId);
    const details = document.getElementById(targetCardId)?.querySelector<HTMLElement>("[data-rice-details]");
    const flying = flyingPackRef.current;
    if (!hero || !target || !flying) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    const restore = () => {
      flying.style.opacity = "0";
      hero.style.removeProperty("opacity");
      target.style.removeProperty("opacity");
      [bowl, details].forEach(element => {
        element?.style.removeProperty("opacity");
        element?.style.removeProperty("transform");
      });
    };
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;
    const paint = () => {
      frame = 0;
      if (motion.matches) { restore(); return; }
      const sourceRect = hero.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (!sourceRect.width || !targetRect.width) { restore(); return; }

      // Measure centers, not rotated bounding-box dimensions, so the handoff
      // preserves the hero pack's original size and 12-degree tilt.
      const scroll = window.scrollY;
      const sourceY = sourceRect.top + scroll + sourceRect.height / 2;
      const targetY = targetRect.top + scroll + targetRect.height / 2;
      // Give the hero bowl its opening rotation and gentle enlargement before
      // handing the pack over to the floating image.
      const heroSection = hero.closest("section");
      const heroTop = heroSection ? heroSection.getBoundingClientRect().top + scroll : 0;
      const start = Math.max(0, heroTop + window.innerHeight * .22, sourceY - window.innerHeight * .68);
      const end = Math.max(start + 200, targetY - window.innerHeight * .52);
      const progress = clamp((scroll - start) / (end - start));
      const ease = progress * progress * (3 - 2 * progress);
      const arriving = clamp((progress - .6) / .4);
      const reveal = arriving * arriving * (3 - 2 * arriving);
      const atStart = progress === 0;
      const atEnd = progress === 1;
      hero.style.opacity = atStart ? "1" : "0";
      target.style.opacity = atEnd ? "1" : "0";
      flying.style.opacity = atStart || atEnd ? "0" : "1";

      // Interpolating viewport positions keeps the pack visible throughout the
      // journey, even while the intervening collection introduction scrolls by.
      const x = mix(sourceRect.left + sourceRect.width / 2, targetRect.left + targetRect.width / 2, ease);
      const y = mix(sourceY - start, targetY - end, ease);
      const width = mix(hero.offsetWidth, target.offsetWidth, ease);
      const height = mix(hero.offsetHeight, target.offsetHeight, ease);
      flying.style.width = `${width}px`;
      flying.style.height = `${height}px`;
      flying.style.transform = `translate3d(${x - width / 2}px, ${y - height / 2}px, 0) rotate(${12 * (1 - ease)}deg)`;
      if (bowl) {
        bowl.style.opacity = String(reveal);
        bowl.style.transform = `translateY(${(1 - reveal) * 14}px) scale(${.9 + reveal * .1})`;
      }
      if (details) {
        // Reveal by the details' own viewport position, so the text is readable
        // even on mobile where it sits below the product image.
        const detailsTop = details.getBoundingClientRect().top;
        const visible = clamp((window.innerHeight - detailsTop) / (window.innerHeight * .35));
        const textReveal = visible * visible * (3 - 2 * visible);
        details.style.opacity = String(.65 + textReveal * .35);
      }
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(paint);
    };
    const observer = new ResizeObserver(schedule);
    // Hero enhancement and font loading can change either endpoint's layout.
    observer.observe(document.body);
    observer.observe(hero);
    observer.observe(target);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      restore();
    };
  }, [heroPackId, targetPackId, targetBowlId, targetCardId]);

  return (
    <div
      ref={flyingPackRef}
      className="fixed top-0 left-0 z-30 pointer-events-none will-change-transform"
      style={{ opacity: 0, transformOrigin: "center", filter: "drop-shadow(12px 20px 18px #0006)" }}
      aria-hidden="true"
    >
      <Image
        src="/assets/monagrow-rice-bag-cutout.png"
        alt=""
        fill
        className="object-contain"
        sizes="(max-width: 767px) 30vw, 21vw"
        preload
      />
    </div>
  );
}
