"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure browser does not preserve previous page scroll offset
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      // If navigating to a page without a specific anchor hash, start at the top
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    // 1. Immediate execution
    resetScroll();

    // 2. Scheduled checks to override any post-render scroll restoration from Next.js or Lenis
    const rafId = requestAnimationFrame(resetScroll);
    const timeoutId1 = setTimeout(resetScroll, 15);
    const timeoutId2 = setTimeout(resetScroll, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [pathname]);

  return null;
}

