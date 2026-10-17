import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonInButton from "./ui/ButtonInButton.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function MonumentalArchitecture() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const headline = headlineRef.current;
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;

      if (!headline || !containerRef.current) return;

      // Parallax translation for the giant letters
      gsap.to(headline, {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Dual card subtle opposing vertical parallax
      if (leftCard && rightCard) {
        gsap.to(leftCard, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        gsap.to(rightCard, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  const goToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="architecture"
      className="relative w-full min-h-[100dvh] bg-[var(--bg-parchment)] py-24 md:py-36 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Giant Monumental Typography (ERA Style "ARCHITECTURE") */}
      <div className="w-full overflow-hidden pointer-events-none opacity-90 mb-8 md:mb-12">
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(4.5rem,18vw,16rem)] text-[var(--text-ink)] leading-[0.82] tracking-tighter uppercase whitespace-nowrap will-change-transform pl-4"
        >
          Architecture &bull; Spatial &bull; Living &bull;
        </h2>
      </div>

      {/* 2. Dual Framed Photographs with Botanical Corner Accents */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        {/* Subtle Botanical corner illustration accents */}
        <div className="absolute -top-16 -left-12 w-48 h-48 pointer-events-none opacity-40 hidden md:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[var(--accent-gold)]">
            <path
              d="M20,180 Q80,120 120,40 Q160,100 180,180"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="120" cy="40" r="16" fill="currentColor" opacity="0.3" />
            <circle cx="80" cy="100" r="12" fill="currentColor" opacity="0.25" />
            <circle cx="150" cy="120" r="14" fill="currentColor" opacity="0.2" />
          </svg>
        </div>

        <div className="grid gap-8 md:grid-cols-12 items-center">
          {/* Left Editorial Card */}
          <div
            ref={leftCardRef}
            className="md:col-span-6 rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-alabaster)] shadow-[0_32px_64px_-24px_rgba(23,28,31,0.12)] will-change-transform"
          >
            <div className="h-[320px] md:h-[460px] overflow-hidden relative">
              <img
                src="/images/custom-study.jpg"
                alt="Architectural study space with bespoke joinery"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 font-mono-telemetry text-xs text-[var(--text-bone)] bg-[var(--bg-navy)]/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                01 &bull; MATERIAL HARMONY
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl md:text-3xl text-[var(--text-ink)] leading-snug">
                Balancing contemporary lines with organic warmth and texture.
              </h3>
              <p className="mt-3 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                Every line, wood veneer, and recessed detail is engineered to breathe effortless elegance into your daily environment.
              </p>
            </div>
          </div>

          {/* Right Editorial Card (Staggered offset) */}
          <div
            ref={rightCardRef}
            className="md:col-span-6 md:mt-16 rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-alabaster)] shadow-[0_32px_64px_-24px_rgba(23,28,31,0.12)] will-change-transform"
          >
            <div className="h-[320px] md:h-[460px] overflow-hidden relative">
              <img
                src="/images/dining-room.jpg"
                alt="Contemporary dining and living transition"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 font-mono-telemetry text-xs text-[var(--text-bone)] bg-[var(--bg-navy)]/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                02 &bull; BESPOKE LIVING
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl md:text-3xl text-[var(--text-ink)] leading-snug">
                Spaces designed around returning year after year.
              </h3>
              <p className="mt-3 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                From curated commercial spaces to serene private sanctuaries, our team handles design, build, and finishing turnkey.
              </p>
              <div className="mt-6">
                <ButtonInButton
                  label="View Portfolio"
                  onClick={() => goToSection("#typologies")}
                  variant="gold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 flex flex-wrap items-center justify-between font-mono-telemetry text-xs text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
        <span>REDESIGN ARCHITECTURAL WORKSHOP</span>
        <span className="text-[var(--accent-gold)] font-bold">TURNKEY INTERIOR &bull; BESPOKE BUILD</span>
      </div>
    </section>
  );
}
