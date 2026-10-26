// Load the exact animation versions used by the reference. Content remains visible
// if a CDN is unavailable; no animation dependency is needed for rendering.
type Tween = { kill: () => void; scrollTrigger?: { start: number; end: number } };
type Media = { add: (query: string, setup: () => (() => void)) => void; revert: () => void };
export type AnimationLibraries = {
  gsap: {
    registerPlugin: (plugin: unknown) => void;
    matchMedia: () => Media;
    to: (target: object, options: Record<string, unknown>) => Tween;
    ticker: { add: (callback: (time: number) => void) => void; remove: (callback: (time: number) => void) => void; lagSmoothing: (value: number) => void };
  };
  ScrollTrigger: { update: () => void; refresh: () => void };
  Lenis: new (options: Record<string, unknown>) => {
    on: (event: string, callback: () => void) => void;
    raf: (time: number) => void;
    destroy: () => void;
    scrollTo: (target: number, options?: Record<string, unknown>) => void;
  };
};

const loads = new Map<string, Promise<void>>();
function script(src: string) {
  if (!loads.has(src)) {
    loads.set(src, new Promise<void>((resolve, reject) => {
      const element = document.createElement("script");
      element.src = src;
      element.async = true;
      const timeout = window.setTimeout(() => reject(new Error("Animation CDN timed out")), 12000);
      element.onload = () => { clearTimeout(timeout); resolve(); };
      element.onerror = () => { clearTimeout(timeout); reject(new Error("Animation CDN unavailable")); };
      document.head.appendChild(element);
    }));
  }
  return loads.get(src)!;
}

export async function loadHeroMotion(): Promise<AnimationLibraries> {
  await script("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
  await Promise.all([
    script("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"),
    script("https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"),
  ]);
  const libraries = window as unknown as AnimationLibraries;
  if (!libraries.gsap || !libraries.ScrollTrigger || !libraries.Lenis) throw new Error("Animation libraries unavailable");
  return libraries;
}
