"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadHeroMotion } from "./heroMotion";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setup = () => {
      dispose?.();
      dispose = undefined;
      if (preference.matches) return;
      loadHeroMotion().then(({ Lenis, gsap, ScrollTrigger }) => {
        if (cancelled || preference.matches || dispose) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          lerp: .09,
          smoothWheel: true,
          syncTouch: false,
          prevent: (node: HTMLElement) => Boolean(node.closest("[data-lenis-prevent], textarea, [role='dialog']")),
        });
        lenis.on("scroll", ScrollTrigger.update);
        let locked = false;
        const tick = (time: number) => {
          const shouldLock = document.body.style.overflow === "hidden" || Boolean(document.querySelector("[data-scroll-modal]"));
          if (shouldLock !== locked) {
            locked = shouldLock;
            if (locked) lenis.stop();
            else lenis.start();
          }
          lenis.raf(time * 1000);
        };
        const anchor = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || locked) return;
          const link = (event.target as Element)?.closest<HTMLAnchorElement>("a[href]");
          if (!link || link.target || link.hasAttribute("download")) return;
          const url = new URL(link.href, window.location.href);
          if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
          let id: string;
          try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
          const target = document.getElementById(id);
          if (!target) return;
          event.preventDefault();
          history.pushState(null, "", url.hash);
          lenis.scrollTo(window.scrollY + target.getBoundingClientRect().top - 100);
        };
        gsap.ticker.add(tick);
        document.addEventListener("click", anchor);
        dispose = () => {
          gsap.ticker.remove(tick);
          document.removeEventListener("click", anchor);
          lenis.destroy();
        };
      }).catch(() => { /* Native scrolling remains available if the CDN is unavailable. */ });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      cancelled = true;
      preference.removeEventListener("change", setup);
      dispose?.();
    };
  }, [pathname]);

  return null;
}
