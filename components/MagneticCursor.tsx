"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable for pointer: fine devices (desktop mouse, not touch screens)
    if (typeof window === "undefined") return;
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    if (!finePointerQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-magnetic], .cursor-pointer, summary'
      );
      setIsHovered(Boolean(interactive));
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeaveDoc = () => setIsVisible(false);
    const onMouseEnterDoc = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("mouseenter", onMouseEnterDoc);

    const updateCursor = () => {
      // Lerp ring with smooth inertia
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      // Lerp dot with tighter tracking
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.42;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.42;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(updateCursor);
    };

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("mouseenter", onMouseEnterDoc);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Follower Ring - Increased size with prominent vivid maroon border & backdrop glow */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-opacity duration-200 ease-out hidden md:block will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-20 h-20 border-2 border-[#800020]/85 bg-[#800020]/15 scale-110 shadow-[0_0_32px_rgba(128,0,32,0.35)] backdrop-blur-xs"
            : isClicked
            ? "w-12 h-12 border-2 border-[#800020] bg-[#800020]/25 scale-90"
            : "w-14 h-14 border-2 border-[#800020]/50 bg-[#800020]/8 shadow-[0_0_18px_rgba(128,0,32,0.18)] backdrop-blur-[2px]"
        }`}
        style={{
          transitionProperty: "width, height, background-color, border-color, transform, opacity, box-shadow",
        }}
      />

      {/* Inner Dot - Increased size in Vivid Maroon (#800020) with luminous halo */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#800020] shadow-[0_0_16px_rgba(128,0,32,0.95)] transition-all duration-150 hidden md:block will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "w-5 h-5 scale-110 shadow-[0_0_24px_rgba(128,0,32,1)]" : "w-3.5 h-3.5"}`}
      />
    </>
  );
}
