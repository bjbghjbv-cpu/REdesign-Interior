import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArchTransition({
  arcText = "THREE REASONS TO CHOOSE REDESIGN",
  subKickerLeft = "GADING SERPONG",
  subKickerRight = "TANGERANG",
  backgroundImage = "/images/commercial-lounge.jpg",
  targetId = "studio",
}) {
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const domeRef = useRef(null);
  const arcTextRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const container = containerRef.current;
      const backdrop = backdropRef.current;
      const dome = domeRef.current;

      if (!container || !dome || !backdrop) return;

      // Pin the section while the arch rises from bottom to top
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Slow parallax on background image
      tl.to(
        backdrop,
        {
          scale: 1.12,
          yPercent: -8,
          ease: "none",
        },
        0
      );

      // 2. Dome rises from bottom and expands to engulf screen
      tl.fromTo(
        dome,
        {
          yPercent: 70,
          scale: 0.9,
          borderRadius: "1000px 1000px 0 0",
        },
        {
          yPercent: -15,
          scale: 1.45,
          borderRadius: "0px 0px 0 0",
          ease: "power2.inOut",
        },
        0
      );

      // 3. Subtle rotation / tracking on the curved text
      if (arcTextRef.current) {
        tl.to(
          arcTextRef.current,
          {
            scale: 1.05,
            transformOrigin: "center center",
            ease: "none",
          },
          0
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
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none bg-[var(--bg-parchment)]"
    >
      {/* 1. Full-screen Photographic Canvas Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={backdropRef}
          src={backgroundImage}
          alt="Architectural space backdrop"
          className="w-full h-full object-cover will-change-transform scale-100"
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top Floating Badge */}
        <div className="absolute top-8 left-8 md:left-16 z-10 flex items-center gap-3 font-mono-telemetry text-xs text-white/90 drop-shadow">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
          <span>SPATIAL TRANSITION PORTAL</span>
        </div>
      </div>

      {/* 2. Rising Mediterranean Arch / Dome */}
      <div
        ref={domeRef}
        className="absolute inset-x-0 bottom-0 h-[105vh] bg-[var(--bg-parchment)] text-[var(--text-ink)] flex flex-col items-center justify-start pt-8 md:pt-14 shadow-[0_-30px_90px_rgba(0,0,0,0.35)] will-change-transform origin-bottom"
        style={{ borderRadius: "1000px 1000px 0 0" }}
      >
        {/* Curved SVG Typography Arc */}
        <div className="relative w-full max-w-5xl h-[320px] md:h-[460px] flex items-center justify-center">
          <svg
            ref={arcTextRef}
            viewBox="0 0 1600 800"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Semicircular top arc */}
              <path
                id="archCurvedPath"
                d="M 100,750 A 700,700 0 0,1 1500,750"
                fill="none"
              />
            </defs>

            <text className="font-display fill-current text-[64px] md:text-[88px] tracking-[0.08em] uppercase">
              <textPath
                href="#archCurvedPath"
                startOffset="50%"
                textAnchor="middle"
              >
                {arcText}
              </textPath>
            </text>
          </svg>

          {/* Center Emblem at the Base of the Arch */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono-telemetry text-xs md:text-sm text-[var(--text-muted)] tracking-[0.2em]">
            <span>{subKickerLeft}</span>
            <div className="w-5 h-5 flex items-center justify-center text-[var(--accent-gold)] font-bold text-base">
              ✦
            </div>
            <span>{subKickerRight}</span>
          </div>
        </div>

        {/* Subtle Vertical Hairline Motif */}
        <div className="w-[1px] h-16 bg-[var(--border-subtle)] mt-2" />
      </div>
    </section>
  );
}
