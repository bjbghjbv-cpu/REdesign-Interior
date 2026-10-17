import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpaceArchTransition() {
  const containerRef = useRef(null);
  const darkBackdropRef = useRef(null);
  const domeRef = useRef(null);
  const titleBlockRef = useRef(null);
  const amenitiesListRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const container = containerRef.current;
      const dome = domeRef.current;
      const titleBlock = titleBlockRef.current;
      const amenities = amenitiesListRef.current;

      if (!container || !dome) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Subtle parallax on the background services list
      if (amenities) {
        tl.to(amenities, { yPercent: -15, opacity: 0.3, ease: "none" }, 0);
      }

      // 2. White Arch Dome ("buletan") rises from bottom over the Deep Navy background
      tl.fromTo(
        dome,
        {
          yPercent: 75,
          scale: 0.92,
          borderRadius: "1200px 1200px 0 0",
        },
        {
          yPercent: 0,
          scale: 1.05,
          borderRadius: "0px 0px 0 0",
          ease: "power2.inOut",
        },
        0
      );

      // 3. "THE SPACE TO LIVE IN" title gently rises and settles
      if (titleBlock) {
        tl.fromTo(
          titleBlock,
          { y: 50, scale: 0.95 },
          { y: 0, scale: 1, ease: "power2.out" },
          0.2
        );
      }

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="space-arch-transition"
      className="relative w-full h-screen min-h-[100dvh] bg-[var(--bg-navy)] text-[var(--text-bone)] overflow-hidden select-none"
    >
      {/* ──────────────────────────────────────────────────────────
          1. Deep Navy Atmosphere (Continuing from About Section)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={darkBackdropRef}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 pointer-events-none"
      >
        {/* Top Telemetry */}
        <div className="flex items-center justify-between font-mono-telemetry text-xs text-[var(--text-bone)]/60">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent-gold)] font-bold">04</span>
            <span>/</span>
            <span>SPATIAL TRANSITION</span>
          </div>
          <span>FROM ABOUT TO LIVING FOOTPRINTS</span>
        </div>

        {/* Right Corner Architectural Pillars List (Exact ERA Image 1 Style) */}
        <div
          ref={amenitiesListRef}
          className="self-end text-right font-display text-2xl md:text-4xl text-[var(--text-bone)]/40 uppercase tracking-tight space-y-1 mb-24 will-change-transform"
        >
          <p className="hover:text-[var(--accent-gold)] transition-colors">Design Consultation</p>
          <p className="hover:text-[var(--accent-gold)] transition-colors">Interior Designing</p>
          <p className="hover:text-[var(--accent-gold)] transition-colors">Custom Furniture &amp; Build</p>
          <p className="hover:text-[var(--accent-gold)] transition-colors">Repair &amp; Maintenance</p>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. Rising White Arch Dome ("Buletan")
          Wipes smoothly from bottom over the Deep Navy into Light Canvas!
      ────────────────────────────────────────────────────────── */}
      <div
        ref={domeRef}
        className="absolute inset-x-0 bottom-0 h-full bg-[var(--bg-parchment)] text-[var(--text-ink)] flex flex-col items-center justify-between py-12 md:py-20 px-6 will-change-transform origin-bottom shadow-[0_-40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ borderRadius: "1200px 1200px 0 0" }}
      >
        {/* Top Decorative Line */}
        <div className="w-[1px] h-12 bg-[var(--border-subtle)]" />

        {/* Monolithic "THE SPACE TO LIVE IN" Title (Exact ERA Style Image 1) */}
        <div
          ref={titleBlockRef}
          className="text-center my-auto flex flex-col items-center will-change-transform"
        >
          <span className="font-mono-telemetry text-xs md:text-sm text-[var(--accent-gold)] tracking-[0.25em] uppercase mb-4">
            Spatial Concept
          </span>

          <h2
            className="text-[clamp(4.5rem,15vw,13rem)] leading-[0.82] tracking-tighter uppercase text-[var(--text-ink)]"
            style={{ fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, serif" }}
          >
            The
            <br />
            Space
          </h2>

          <div className="w-16 h-[2px] bg-[var(--accent-gold)] my-6" />

          <p
            className="text-sm md:text-base tracking-[0.28em] uppercase text-[var(--text-ink)] font-semibold"
            style={{ fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, serif" }}
          >
            To Live In
          </p>
        </div>

        {/* Bottom Telemetry & Hand-off */}
        <div className="w-full max-w-4xl flex items-center justify-between font-mono-telemetry text-[11px] text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-4">
          <span>RESIDENCES SIZED FOR REAL LIVING &bull; 85 &mdash; 240 M&sup2;</span>
          <span className="text-[var(--accent-gold)]">CONTINUE SCROLLING TO ENTER &darr;</span>
        </div>
      </div>
    </section>
  );
}
