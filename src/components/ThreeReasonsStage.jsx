import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeReasonsStage() {
  const containerRef = useRef(null);
  const domeRef = useRef(null);
  const arcTextRef = useRef(null);
  const builtToStayStageRef = useRef(null);
  const titleRef = useRef(null);
  const photoFrameRef = useRef(null);
  const copyRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(1); // 1: bedroom, 2: living sofa

  const slides = [
    {
      id: 1,
      image: "/images/redesign-bedroom.png",
      title: "BUILT TO STAY",
      subtitle:
        "Drawing on a decade of dedicated craftsmanship, our bespoke interior solutions blend modern lines with warm natural materials, custom vanity suites and timeless joinery.",
      kicker: "DESIGNED AS A SANCTUARY, NOT JUST A ROOM",
    },
    {
      id: 2,
      image: "/images/redesign-living-sofa.png",
      title: "CRAFTED FOR LIVING",
      subtitle:
        "Thoughtfully tailored living and lounge spaces, engineered with bespoke upholstered furnishings, harmonious accent walls and spaces you love returning to.",
      kicker: "DESIGNED AS A HOME, NOT JUST A COMPLEX",
    },
  ];

  const currentSlide = slides[activeSlide - 1];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const container = containerRef.current;
      const dome = domeRef.current;
      const arcText = arcTextRef.current;
      const builtStage = builtToStayStageRef.current;
      const title = titleRef.current;
      const photoFrame = photoFrameRef.current;
      const copy = copyRef.current;

      if (!container || !dome || !builtStage) return;

      // Master Pinned Timeline (Scrubs through ~180vh of smooth vertical scroll on pure white)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Arch outline & curved text gracefully settle
      tl.fromTo(
        arcText,
        { scale: 0.92, y: 30, opacity: 0.9 },
        { scale: 1, y: 0, opacity: 1, ease: "power2.out", duration: 0.4 },
        0
      );

      // 2. Curved SVG text glides up and dissolves as "BUILT TO STAY" arrives
      tl.to(
        arcText,
        {
          yPercent: -20,
          opacity: 0,
          ease: "power2.in",
          duration: 0.35,
        },
        0.4
      );

      // 3. Image 2 "BUILT TO STAY" stage cleanly reveals on solid white canvas
      tl.fromTo(
        builtStage,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.5,
        },
        0.45
      );

      // 4. Title, photo and narrative settle
      tl.fromTo(
        title,
        { yPercent: 20, letterSpacing: "0.1em" },
        { yPercent: 0, letterSpacing: "0.01em", ease: "power2.out", duration: 0.4 },
        0.55
      );

      tl.fromTo(
        photoFrame,
        { scale: 0.94, y: 20 },
        { scale: 1, y: 0, ease: "power2.out", duration: 0.4 },
        0.55
      );

      tl.fromTo(
        copy,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.65
      );

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="three-reasons-intro"
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none bg-white text-[var(--text-ink)]"
    >
      {/* ──────────────────────────────────────────────────────────
          Clean Solid White Editorial Canvas (NO Full-screen Background Photo)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={domeRef}
        className="relative w-full h-full bg-white flex flex-col items-center justify-between overflow-hidden"
      >
        {/* ─── STAGE A: Curved SVG Arc Text (Image 1 on Clean White) ─── */}
        <div
          ref={arcTextRef}
          className="absolute inset-x-0 top-12 md:top-20 flex flex-col items-center pointer-events-none will-change-transform z-10"
        >
          <div className="relative w-full max-w-5xl h-[300px] md:h-[440px] flex items-center justify-center">
            <svg
              viewBox="0 0 1600 800"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="archStageCurve"
                  d="M 120,720 A 680,680 0 0,1 1480,720"
                  fill="none"
                />
              </defs>

              <text className="font-display fill-[var(--text-ink)] text-[68px] md:text-[96px] tracking-[0.06em] uppercase">
                <textPath
                  href="#archStageCurve"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Three reasons to choose REdesign
                </textPath>
              </text>
            </svg>

            {/* Center Monogram at Base of Arc */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono-telemetry text-xs md:text-sm text-[var(--text-muted)] tracking-[0.2em]">
              <span>GADING SERPONG</span>
              <div className="w-5 h-5 flex items-center justify-center text-[var(--accent-gold)] font-bold text-base">
                ✦
              </div>
              <span>TANGERANG</span>
            </div>
          </div>

          <div className="w-[1px] h-12 bg-[var(--border-subtle)] mt-2" />
          <p className="font-mono-telemetry text-[11px] text-[var(--text-muted)] tracking-[0.25em] uppercase mt-2">
            A place to live &mdash; to return year after year
          </p>
        </div>

        {/* ─── STAGE B: Image 2 "BUILT TO STAY" Section (Crisp White Canvas) ─── */}
        <div
          ref={builtToStayStageRef}
          className="relative z-20 w-full h-full flex flex-col justify-between items-center py-8 md:py-12 px-6 md:px-12 max-w-6xl mx-auto opacity-0 will-change-transform"
        >
          {/* Top Bar Telemetry */}
          <div className="w-full flex items-center justify-between font-mono-telemetry text-xs text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[var(--text-ink)]">01</span>
              <span>/</span>
              <span>BUILT TO STAY</span>
            </div>
            <div className="flex items-center gap-2">
              <span>EST. 2016</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
              <span>BESPOKE JOINERY</span>
            </div>
          </div>

          {/* Huge Monumental Title (Exact ERA "BUILT TO STAY" Style) */}
          <div className="text-center my-auto pt-2">
            <h2
              ref={titleRef}
              className="font-display text-[clamp(3.5rem,10vw,8.5rem)] text-[var(--text-ink)] leading-[0.88] tracking-tight uppercase will-change-transform"
            >
              {currentSlide.title}
            </h2>

            {/* Center Framed Photo with Real User Image */}
            <div
              ref={photoFrameRef}
              className="relative mx-auto mt-6 md:mt-8 w-[320px] sm:w-[440px] md:w-[540px] lg:w-[600px] h-[220px] sm:h-[280px] md:h-[340px] rounded-none overflow-hidden shadow-[0_28px_60px_-16px_rgba(24,30,41,0.14)] border border-[var(--border-subtle)] bg-[var(--bg-alabaster)] will-change-transform"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
            </div>

            {/* Slider Pagination Controls: < 1 ────── 2 > */}
            <div className="mt-4 flex items-center justify-center gap-4 font-mono-telemetry text-xs text-[var(--text-ink)]">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev === 1 ? 2 : 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[var(--text-ink)]/10 transition-colors"
                aria-label="Previous slide"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <span className="font-bold">{activeSlide}</span>
              <div className="w-16 h-[1.5px] bg-[var(--border-subtle)] rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[var(--accent-gold)] transition-all duration-500"
                  style={{ width: activeSlide === 1 ? "50%" : "100%" }}
                />
              </div>
              <span className="text-[var(--text-muted)]">2</span>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev === 2 ? 1 : 2))}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[var(--text-ink)]/10 transition-colors"
                aria-label="Next slide"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>

          {/* Bottom Descriptive Narrative & Signature Kicker */}
          <div ref={copyRef} className="text-center max-w-2xl mx-auto space-y-3 pt-2">
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-sans">
              {currentSlide.subtitle}
            </p>
            <p className="font-mono-telemetry text-[11px] text-[var(--accent-gold)] font-bold tracking-[0.2em] uppercase">
              {currentSlide.kicker}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
