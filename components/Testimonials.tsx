"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  category: string;
  quote: string;
  avatar: string;
}

const REVIEWS: Review[] = [
  {
    id: "tariq",
    name: "Tariq Al-Mansoor",
    role: "Corporate buyer",
    location: "Dubai, UAE",
    category: "Basmati rice",
    quote:
      "We have imported over twelve 40ft containers of Monagrow 8.9mm basmati. Grain elongation after cooking exceeds 2.2x every time, and we have had zero broken-grain complaints from our supermarket clients across Dubai and Abu Dhabi.",
    avatar: "/assets/testimonial-tariq.jpg",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Roastmaster",
    location: "Oslo, Norway",
    category: "Specialty coffee",
    quote:
      "The washed Arabica arrived in hermetic GrainPro liners with cupping scores that matched the samples. Acidity was balanced, batch consistency was excellent, and delivery to Rotterdam was on schedule.",
    avatar: "/assets/testimonial-elena.jpg",
  },
  {
    id: "rajesh",
    name: "Rajesh Shrestha",
    role: "Retail director",
    location: "Kathmandu, Nepal",
    category: "Cashews and dry fruits",
    quote:
      "Monagrow's direct wholesale packaging lifted our dry fruit and sugar shelves. The 5kg basmati packs and W240 cashew pouches are top tier in quality, shelf appeal, and repeat purchases.",
    avatar: "/assets/testimonial-rajesh.jpg",
  },
  {
    id: "jeanluc",
    name: "Jean-Luc Mercier",
    role: "Sourcing lead",
    location: "Marseille, France",
    category: "ICUMSA 45 sugar",
    quote:
      "Their refined plantation white sugar meets European ICUMSA 45 purity without fail. Batch inspection certificates, bills of lading, and moisture-barrier liners make clearance at European ports effortless.",
    avatar: "/assets/testimonial-jeanluc.jpg",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Commodity broker",
    location: "London, UK",
    category: "Container cargo",
    quote:
      "Direct mill contracts with Monagrow removed three layers of brokerage markup. Port inspection reports and FOB schedules arrive like clockwork, so we have scaled allocations across several European hubs with confidence.",
    avatar: "/assets/hero-trade-director.jpg",
  },
];

/** Marquee speed in pixels per second. */
const SPEED = 40;

function ReviewCard({
  review,
  hidden,
  onHover,
}: {
  review: Review;
  hidden?: boolean;
  onHover: (paused: boolean) => void;
}) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      className="shrink-0 w-[320px] sm:w-[420px] lg:w-[460px] mr-4 sm:mr-5 bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-stone-200/70"
    >
      <blockquote className="font-serif text-[15px] sm:text-base text-navy leading-relaxed">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 pt-5 border-t border-stone-200 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Image
            src={review.avatar}
            alt=""
            fill
            className="object-cover object-top"
            sizes="40px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy truncate">{review.name}</p>
          <p className="text-xs text-stone-500 truncate">
            {review.role} · {review.location}
          </p>
        </div>
        <p className="ml-auto text-[11px] font-semibold uppercase tracking-wider text-[#800020] text-right shrink-0 hidden sm:block">
          {review.category}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Continuous marquee driven by requestAnimationFrame. The list is rendered
  // twice, so once the first copy has fully passed we snap back by half the
  // track width and the loop is seamless.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!pausedRef.current && !document.hidden) {
        const half = track.scrollWidth / 2;
        offset += (SPEED * dt) / 1000;
        if (half > 0 && offset >= half) offset -= half;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const setPaused = (paused: boolean) => {
    pausedRef.current = paused;
  };

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 bg-[#faf7f2] border-b border-stone-200/70 overflow-hidden"
    >
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <p className="text-[#800020] text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
            Testimonials
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-tight">
            Trusted across 18+ markets
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            From supermarket chains in the Gulf to coffee roasters in Europe,
            here is what procurement teams say about working with us.
          </p>
        </div>
      </div>

      {/* Marquee: full-bleed, list rendered twice for a seamless loop */}
      <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div ref={trackRef} className="flex w-max items-stretch will-change-transform">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} onHover={setPaused} />
          ))}
          {REVIEWS.map((review) => (
            <ReviewCard key={`${review.id}-copy`} review={review} hidden onHover={setPaused} />
          ))}
        </div>
      </div>
    </section>
  );
}
