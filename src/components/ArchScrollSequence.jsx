import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonInButton from "./ui/ButtonInButton.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ArchScrollSequence() {
  const containerRef = useRef(null);
  const diptychStageRef = useRef(null);
  const leftWindowRef = useRef(null);
  const rightWindowRef = useRef(null);
  const fullScreenStageRef = useRef(null);
  const fullImageRef = useRef(null);
  const archTitleRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const container = containerRef.current;
      const diptychStage = diptychStageRef.current;
      const leftWin = leftWindowRef.current;
      const rightWin = rightWindowRef.current;
      const fullStage = fullScreenStageRef.current;
      const fullImg = fullImageRef.current;
      const title = archTitleRef.current;
      const quote = quoteRef.current;

      if (!container || !leftWin || !rightWin || !diptychStage || !fullStage) return;

      // Master Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ─── PHASE 1: Dual Windows Opposing Parallax (Clean & Flower-Free) ───
      tl.fromTo(
        leftWin,
        { y: 60, scale: 0.96 },
        { y: -30, scale: 1, ease: "none", duration: 1 },
        0
      );

      tl.fromTo(
        rightWin,
        { y: -60, scale: 0.96 },
        { y: 30, scale: 1, ease: "none", duration: 1 },
        0
      );

      // ─── PHASE 2: Seamless Transition to Full-Bleed ARCHITECTURE ───
      // Diptych stage smoothly fades out
      tl.to(diptychStage, { opacity: 0, scale: 1.05, ease: "power2.inOut", duration: 0.8 }, 1);

      // Full-screen architecture stage smoothly fades in
      tl.fromTo(
        fullStage,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, ease: "power2.inOut", duration: 0.8 },
        1
      );

      // Image gentle scale parallax
      tl.fromTo(
        fullImg,
        { scale: 1.02, yPercent: -4 },
        { scale: 1.12, yPercent: 4, ease: "none", duration: 1.2 },
        1
      );

      // Monumental "ARCHITECTURE" Title reveal
      tl.fromTo(
        title,
        { yPercent: 35, opacity: 0, letterSpacing: "0.12em" },
        { yPercent: 0, opacity: 1, letterSpacing: "0.02em", ease: "power2.out", duration: 0.8 },
        1.2
      );

      // Bottom quote row
      tl.fromTo(
        quote,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.6 },
        1.4
      );

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const goToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="architecture-sequence"
      className="relative w-full h-screen min-h-[100dvh] bg-[var(--bg-parchment)] overflow-hidden select-none"
    >
      {/* ──────────────────────────────────────────────────────────
          LAYER 1: Dual-Window Diptych Stage (Clean Solid Canvas, NO Flowers)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={diptychStageRef}
        className="absolute inset-0 z-20 flex flex-col justify-between items-center py-10 md:py-16 bg-[var(--bg-parchment)] pointer-events-none will-change-transform"
      >
        {/* Top Minimal Telemetry */}
        <div className="w-full px-6 md:px-16 flex items-center justify-between font-mono-telemetry text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent-gold)] font-bold">02</span>
            <span>/</span>
            <span>ARCHITECTURAL PROPORTIONS</span>
          </div>
          <span className="hidden sm:inline">DUAL SPATIAL PANELS &bull; ESTEPONA LINES</span>
        </div>

        {/* Center Dual Window Panels */}
        <div className="relative flex items-center gap-6 md:gap-10 lg:gap-14 px-6 my-auto">
          {/* Left Vertical Architectural Window */}
          <div
            ref={leftWindowRef}
            className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] h-[440px] sm:h-[520px] md:h-[600px] lg:h-[660px] overflow-hidden rounded-none shadow-[0_30px_70px_-20px_rgba(0,0,0,0.18)] bg-white border border-[var(--border-subtle)] will-change-transform"
          >
            <img
              src="/images/arch-terrace.webp"
              alt="White Mediterranean architecture left panel"
              className="w-full h-full object-cover object-left scale-125"
            />
          </div>

          {/* Right Vertical Architectural Window */}
          <div
            ref={rightWindowRef}
            className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] h-[440px] sm:h-[520px] md:h-[600px] lg:h-[660px] overflow-hidden rounded-none shadow-[0_30px_70px_-20px_rgba(0,0,0,0.18)] bg-white border border-[var(--border-subtle)] will-change-transform"
          >
            <img
              src="/images/arch-terrace.webp"
              alt="Pergola with climbing plants right panel"
              className="w-full h-full object-cover object-right scale-125"
            />
          </div>
        </div>

        {/* Bottom Minimal Hint */}
        <div className="w-full px-6 md:px-16 text-center font-mono-telemetry text-[11px] text-[var(--text-muted)]">
          <span>SCROLL DOWN TO EXPAND FULL VISION &darr;</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          LAYER 2: Full-Bleed ARCHITECTURE Stage
      ────────────────────────────────────────────────────────── */}
      <div
        ref={fullScreenStageRef}
        className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-16 opacity-0 pointer-events-auto will-change-transform"
      >
        {/* Full-bleed Backdrop Photo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            ref={fullImageRef}
            src="/images/arch-terrace.webp"
            alt="Mediterranean contemporary architecture full view"
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />
        </div>

        {/* Top Telemetry */}
        <div className="relative z-10 flex items-center justify-between font-mono-telemetry text-xs text-white/90 drop-shadow">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent-gold)] font-bold">02</span>
            <span>/</span>
            <span>SPATIAL DESIGN &amp; HARMONY</span>
          </div>
          <span className="hidden sm:inline">ESTEPONA INSPIRATION &bull; GADING SERPONG</span>
        </div>

        {/* Giant Monolithic "ARCHITECTURE" Display Title */}
        <div className="relative z-10 w-full overflow-hidden text-center my-auto py-4">
          <h2
            ref={archTitleRef}
            className="font-display text-[clamp(4.5rem,17vw,17rem)] text-white leading-[0.84] tracking-tight uppercase drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)] whitespace-nowrap will-change-transform"
          >
            Architecture
          </h2>
        </div>

        {/* Bottom Quote & Action Row */}
        <div
          ref={quoteRef}
          className="relative z-10 max-w-5xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6 border-t border-white/20 text-white"
        >
          <div className="max-w-xl">
            <div className="w-12 h-[2px] bg-[var(--accent-gold)] mb-3" />
            <h3 className="font-display text-xl md:text-3xl leading-snug drop-shadow-sm">
              The architecture of REdesign balances clean contemporary lines with warm materials and texture.
            </h3>
            <p className="mt-2 font-mono-telemetry text-xs text-white/70">
              BY REDESIGN INTERIOR &bull; BESPOKE ARCHITECTURAL JOINERY
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <ButtonInButton
              label="Book a Call Now"
              onClick={() => goToSection("#contact")}
              variant="gold"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
