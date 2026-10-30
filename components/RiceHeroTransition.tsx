"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Respect user's motion preferences
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const heroPack = document.getElementById(heroPackId);
    const targetPack = document.getElementById(targetPackId);
    const targetBowl = targetBowlId ? document.getElementById(targetBowlId) : null;
    const flyingEl = flyingPackRef.current;

    if (!heroPack || !targetPack || !flyingEl) return;

    let heroDoc = { left: 0, top: 0, width: 0, height: 0 };
    let targetDoc = { left: 0, top: 0, width: 0, height: 0 };
    let scrollStart = 0;
    let scrollEnd = 1000;

    const updateMeasurements = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      const heroRect = heroPack.getBoundingClientRect();
      const targetRect = targetPack.getBoundingClientRect();

      if (heroRect.width > 0 && targetRect.width > 0) {
        heroDoc = {
          left: heroRect.left + scrollX,
          top: heroRect.top + scrollY,
          width: heroRect.width,
          height: heroRect.height,
        };
        targetDoc = {
          left: targetRect.left + scrollX,
          top: targetRect.top + scrollY,
          width: targetRect.width,
          height: targetRect.height,
        };

        // Transition starts as soon as user begins scrolling past the top
        scrollStart = 0;
        // Transition completes when the target pack reaches the upper-middle reading area of viewport
        const viewportH = window.innerHeight;
        scrollEnd = Math.max(
          200,
          targetDoc.top + targetDoc.height * 0.5 - viewportH * 0.5
        );
      }
    };

    updateMeasurements();

    const renderFrame = () => {
      if (heroDoc.width === 0 || targetDoc.width === 0) {
        updateMeasurements();
        if (heroDoc.width === 0) return;
      }

      const scrollY = window.scrollY;
      const rawProgress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
      const progress = Math.max(0, Math.min(1, rawProgress));

      // 1. Initial State: Resting at the Hero section
      if (progress <= 0.005) {
        flyingEl.style.opacity = "0";
        flyingEl.style.pointerEvents = "none";
        heroPack.style.opacity = "1";
        heroPack.style.visibility = "visible";
        targetPack.style.opacity = "0";
        if (targetBowl) {
          targetBowl.style.opacity = "0";
          targetBowl.style.transform = "scale(0.8) translateY(12px)";
        }
        return;
      }

      // 2. Docked State: Arrived at the Product Card
      if (progress >= 0.99) {
        flyingEl.style.opacity = "0";
        flyingEl.style.pointerEvents = "none";
        heroPack.style.opacity = "0";
        targetPack.style.opacity = "1";
        if (targetBowl) {
          targetBowl.style.opacity = "1";
          targetBowl.style.transform = "scale(1) translateY(0px)";
        }
        return;
      }

      // 3. Active Flight State (0.005 < progress < 0.99)
      flyingEl.style.opacity = "1";
      // Hero pack quickly fades out as flying pack takes over
      heroPack.style.opacity = String(Math.max(0, 1 - progress * 10));
      targetPack.style.opacity = "0";

      // Ceramic bowl in target card gracefully fades in and settles as pack approaches
      if (targetBowl) {
        const bowlProgress = Math.max(0, Math.min(1, (progress - 0.65) / 0.35));
        targetBowl.style.opacity = String(bowlProgress);
        targetBowl.style.transform = `scale(${0.8 + bowlProgress * 0.2}) translateY(${(1 - bowlProgress) * 14}px)`;
      }

      // Smooth organic cubic easing
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // 3D Pop Out scale: reaches ~1.16 peak elevation mid-flight, then gently settles to 1.0
      const popScale = 1 + Math.sin(progress * Math.PI) * 0.16;

      // Interpolate document coordinates
      const currentX = heroDoc.left + (targetDoc.left - heroDoc.left) * ease;
      const currentY = heroDoc.top + (targetDoc.top - heroDoc.top) * ease;
      const currentW = heroDoc.width + (targetDoc.width - heroDoc.width) * ease;
      const currentH = heroDoc.height + (targetDoc.height - heroDoc.height) * ease;

      // Rotation from hero's natural 12deg tilt to the card's 0deg upright alignment
      const rotation = 12 * (1 - ease);

      // Organic lateral arc curving out towards center before docking
      const isDesktop = window.innerWidth >= 1024;
      const arcX = Math.sin(progress * Math.PI) * (isDesktop ? 30 : 10);

      // Elevated drop shadow with subtle brand glow during flight
      const shadowBlur = 22 + Math.sin(progress * Math.PI) * 28;
      const shadowY = 16 + Math.sin(progress * Math.PI) * 22;
      const shadowAlpha = 0.28 + Math.sin(progress * Math.PI) * 0.22;

      flyingEl.style.width = `${currentW}px`;
      flyingEl.style.height = `${currentH}px`;
      flyingEl.style.transform = `translate3d(${currentX + arcX}px, ${currentY}px, 0) scale(${popScale}) rotate(${rotation}deg)`;
      flyingEl.style.filter = `drop-shadow(0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})) drop-shadow(0 10px 22px rgba(128, 0, 32, ${shadowAlpha * 0.55}))`;
    };

    let rafId: number | null = null;
    const tick = () => {
      renderFrame();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("scroll", updateMeasurements, { passive: true });

    // Initial recalculations after fonts and assets settle
    const t1 = setTimeout(updateMeasurements, 200);
    const t2 = setTimeout(updateMeasurements, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("scroll", updateMeasurements);

      // Restore elements cleanly
      if (heroPack) {
        heroPack.style.removeProperty("opacity");
        heroPack.style.removeProperty("visibility");
      }
      if (targetPack) targetPack.style.removeProperty("opacity");
      if (targetBowl) {
        targetBowl.style.removeProperty("opacity");
        targetBowl.style.removeProperty("transform");
      }
    };
  }, [heroPackId, targetPackId, targetBowlId, targetCardId]);

  if (!isMounted) return null;

  return (
    <div
      ref={flyingPackRef}
      className="absolute top-0 left-0 z-50 pointer-events-none will-change-transform"
      style={{
        opacity: 0,
        transformOrigin: "center center",
      }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {/* Soft Radial Ambient Aura during flight */}
        <div className="absolute inset-0 -m-10 rounded-full bg-radial from-[#800020]/20 via-[#a6c8d3]/12 to-transparent blur-2xl pointer-events-none opacity-85" />
        <Image
          src="/assets/monagrow-rice-bag-cutout.png"
          alt="Monagrow Basmati Rice"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 240px, 320px"
          priority
        />
      </div>
    </div>
  );
}

