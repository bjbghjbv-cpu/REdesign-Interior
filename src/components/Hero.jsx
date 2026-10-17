import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, CaretLeft, CaretRight, Plus, X } from "@phosphor-icons/react";
import RotatingBadge from "./ui/RotatingBadge.jsx";
import EraCircularButton from "./ui/EraCircularButton.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [mode, setMode] = useState("day");
  const [activeSlide, setActiveSlide] = useState(1); // 1: bedroom, 2: living sofa
  const [activePin, setActivePin] = useState(null);

  const heroPins = [
    {
      id: "crafted-to-endure",
      top: "56%",
      left: "64%",
      kicker: "CRAFTED TO ENDURE",
      title: "Travertine & Fluted Oak",
      desc: "Seamless bookmatched natural stone slab paired with 18mm custom fluted joinery.",
      image: "/images/dining-room.jpg",
    },
    {
      id: "light-flow",
      top: "46%",
      left: "18%",
      kicker: "LIGHT FLOW & ACOUSTICS",
      title: "Linear Cove & Slat Wall",
      desc: "2700K warm indirect cove lighting integrated with acoustic charcoal timber slats.",
      image: "/images/hero-living.jpg",
    },
    {
      id: "sanctuary",
      top: "70%",
      left: "80%",
      kicker: "YOUR PRIVATE SANCTUARY",
      title: "Cantilevered Credenza",
      desc: "Floating media credenza with Blum push-to-open concealed hardware.",
      image: "/images/gallery-grid/marble-tv.jpg",
    },
  ];

  const heroSectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const buletanStageRef = useRef(null);
  const builtStageRef = useRef(null);
  const titleRef = useRef(null);
  const photoFrameRef = useRef(null);
  const copyRef = useRef(null);

  const isDay = mode === "day";

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

    mm.add("all", () => {
      const heroSection = heroSectionRef.current;
      const bgImg = bgImageRef.current;
      const heroContent = heroContentRef.current;
      const buletanStage = buletanStageRef.current;
      const builtStage = builtStageRef.current;
      const title = titleRef.current;
      const photoFrame = photoFrameRef.current;
      const copy = copyRef.current;

      if (!heroSection || !buletanStage || !builtStage) return;

      ScrollTrigger.refresh();

      // Master Pinned Timeline: Exact choreography with the iconic Image 2 Buletan
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Subtle parallax & gentle zoom on background architecture
      if (bgImg) {
        tl.to(bgImg, { yPercent: 12, scale: 1.06, ease: "none" }, 0);
      }

      // 2. Initial hero title ("RE DESIGN") fades up and out
      if (heroContent) {
        tl.to(heroContent, { yPercent: -16, opacity: 0, ease: "power1.in", duration: 0.28 }, 0);
      }

      // 3. The Buletan (Image 2 Semicircular Arch Dome) rises up from the bottom over the photo
      tl.fromTo(
        buletanStage,
        {
          yPercent: 100,
          scale: 0.94,
        },
        {
          yPercent: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.38,
        },
        0
      );

      // HOLD THE BULETAN between 0.38 and 0.58 so the user enjoys the exact Image 2 scene!
      // 4. As user scrolls further past 0.58, the buletan expands and transitions into the project showcase
      tl.to(
        buletanStage,
        {
          scale: 1.3,
          yPercent: -15,
          opacity: 0,
          ease: "power2.in",
          duration: 0.22,
        },
        0.58
      );

      // 5. "BUILT TO STAY" showcase reveals cleanly on parchment canvas
      tl.fromTo(
        builtStage,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 0.24,
        },
        0.66
      );

      tl.fromTo(
        title,
        { yPercent: 12, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.18 },
        0.70
      );

      tl.fromTo(
        photoFrame,
        { scale: 0.94, y: 15 },
        { scale: 1, y: 0, ease: "power2.out", duration: 0.18 },
        0.72
      );

      tl.fromTo(
        copy,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.16 },
        0.76
      );

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="top"
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none bg-[#172026]"
    >
      {/* ──────────────────────────────────────────────────────────
          LAYER 0: Architectural Backdrop Photo (User Project Render)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          ref={bgImageRef}
          src="/images/redesign-tv-console.jpg"
          alt="REdesign Interior & Build bespoke TV console and living space"
          className={`w-full h-full object-cover object-center transition-all duration-1000 will-change-transform ${
            isDay ? "brightness-[0.68] contrast-[1.12]" : "brightness-[0.38] contrast-[1.2] saturate-[0.75]"
          }`}
        />
        {/* Contrast protection overlay to ensure flawless typography readability */}
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${
            isDay
              ? "bg-gradient-to-b from-black/65 via-black/45 to-black/80"
              : "bg-gradient-to-b from-[#09121a]/90 via-[#0e1c26]/80 to-[#070d12]/95"
          }`}
        />
      </div>

      {/* ──────────────────────────────────────────────────────────
          LAYER 1: Monumental Hero (Exact ERA Residence Style)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={heroContentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 will-change-transform"
      >
        {/* Top Floating Row: Rotating Logo on Left, Architectural Telemetry on Right */}
        <div className="w-full flex items-start justify-between">
          {/* Top-Left: Circular Rotating Logo Emblem Badge */}
          <div className="flex flex-col items-center">
            <RotatingBadge
              size={110}
              text="REDESIGN • INTERIOR & BUILD • REDESIGN • EST. 2016 • "
              textColor="text-white"
            />
            {/* Telemetry 00 indicator */}
            <span className="font-mono-telemetry text-xs tracking-[0.25em] text-white/70 mt-1 font-semibold">
              00
            </span>
          </div>

          {/* Top-Right: Editorial Telemetry (No duplication with Navbar) */}
          <div className="hidden sm:flex flex-col items-end gap-1 font-mono-telemetry text-[11px] tracking-[0.25em] text-white/70 uppercase">
            <span>RESIDENCES &bull; INTERIOR &bull; BESPOKE BUILD</span>
            <span className="text-[var(--accent-gold)]">EST. 2016 &bull; GADING SERPONG</span>
          </div>
        </div>

        {/* Contextual Spatial Hotspot Pins (ERA Residence Style) */}
        <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
          {heroPins.map((pin) => {
            const isActive = activePin === pin.id;
            return (
              <div
                key={pin.id}
                style={{ top: pin.top, left: pin.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                {/* Hotspot Pin Button */}
                <button
                  type="button"
                  onClick={() => setActivePin(isActive ? null : pin.id)}
                  className={`group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-[var(--accent-gold)] bg-[var(--accent-gold)] text-white scale-110 shadow-[0_0_25px_rgba(193,95,60,0.85)]"
                      : "border-white/40 bg-black/45 text-white backdrop-blur-md hover:border-white hover:scale-110 shadow-lg"
                  }`}
                  aria-label={pin.title}
                >
                  {/* Outer Pulsing Aura Ring */}
                  <span className="absolute inset-0 rounded-full border border-[var(--accent-gold)]/60 animate-ping opacity-40 pointer-events-none" />
                  {isActive ? (
                    <X size={14} weight="bold" />
                  ) : (
                    <Plus size={14} weight="bold" className="group-hover:rotate-90 transition-transform duration-300" />
                  )}
                </button>

                {/* Floating Tip Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 10 }}
                      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 md:w-72 rounded-2xl bg-[#172026]/95 text-white p-4 border border-white/20 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-30"
                    >
                      <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3 bg-black/20">
                        <img
                          src={pin.image}
                          alt={pin.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 font-mono-telemetry text-[9px] text-[var(--accent-gold)] bg-black/70 px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-widest">
                          SPECIFICATION
                        </span>
                      </div>
                      <p className="font-mono-telemetry text-[9px] text-[var(--accent-gold)] tracking-[0.2em] uppercase">
                        {pin.kicker}
                      </p>
                      <h4
                        className="text-base font-normal text-white mt-0.5 leading-snug"
                        style={{ fontFamily: "'Bodoni Moda', 'Instrument Serif', serif" }}
                      >
                        {pin.title}
                      </h4>
                      <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-sans">
                        {pin.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Center: Monumental "RE DESIGN" with Layered Cursive Calligraphy (Optimized for High Readability) */}
        <div className="relative flex flex-col items-center justify-center my-auto text-center px-4 select-none">
          <h1 className="relative font-normal uppercase text-white drop-shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
            <span
              className="block text-[clamp(4.8rem,16vw,13.5rem)] leading-[0.80] tracking-[-0.02em] font-normal"
              style={{
                fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, 'Bodoni MT', serif",
                textShadow: "0 4px 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)",
              }}
            >
              RE
            </span>
            <span
              className="block text-[clamp(4.8rem,16vw,13.5rem)] leading-[0.80] tracking-[-0.02em] font-normal"
              style={{
                fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, 'Bodoni MT', serif",
                textShadow: "0 4px 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)",
              }}
            >
              DESIGN
            </span>

            {/* Luxury Cursive Calligraphy in Warm Radiant Gold for Crystal-Clear Legibility */}
            <span
              className="absolute -bottom-5 sm:-bottom-7 md:-bottom-10 left-1/2 text-[clamp(2.4rem,7vw,5.8rem)] normal-case font-normal italic tracking-normal text-[#E5A967] drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)] whitespace-nowrap pointer-events-none"
              style={{
                fontFamily: "'Pinyon Script', cursive",
                transform: "translateX(-50%) rotate(-3deg)",
                textShadow: "0 3px 18px rgba(0,0,0,0.95), 0 0 35px rgba(0,0,0,0.8)",
              }}
            >
              Interior &amp; Build
            </span>
          </h1>
        </div>

        {/* Bottom Bar: A PLACE  •  BY DAY — BY NIGHT  •  TO RETURN TO */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-between text-white font-mono-telemetry text-xs tracking-[0.25em] uppercase px-2">
          {/* Left Phrase */}
          <span className="hidden sm:inline text-white/90 drop-shadow">A PLACE</span>

          {/* Center Ambience Switcher */}
          <div className="flex items-center gap-4 mx-auto sm:mx-0 bg-black/35 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 shadow-xl">
            <button
              type="button"
              onClick={() => setMode("day")}
              className={`transition-colors font-medium text-xs tracking-[0.2em] ${
                isDay ? "text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              BY DAY
            </button>

            <div
              onClick={() => setMode(isDay ? "night" : "day")}
              className="w-12 h-5 rounded-full bg-white/25 p-0.5 cursor-pointer flex items-center transition-all duration-300"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-4 h-4 rounded-full bg-[var(--accent-gold)] shadow-md ${
                  isDay ? "ml-0" : "ml-auto"
                }`}
              />
            </div>

            <button
              type="button"
              onClick={() => setMode("night")}
              className={`transition-colors font-medium text-xs tracking-[0.2em] ${
                !isDay ? "text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              BY NIGHT
            </button>
          </div>

          {/* Right Phrase */}
          <span className="hidden sm:inline text-white/90 drop-shadow">TO RETURN TO</span>
        </div>

        {/* ERA Residence Magnetic Circular CTA */}
        <div className="relative w-full flex justify-center mt-2 pointer-events-auto">
          <EraCircularButton
            text="Explore Spaces"
            size={120}
            onClick={() => document.querySelector("#typologies")?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>

        {/* Left Scroll Cue */}
        <div className="absolute left-6 md:left-12 bottom-8 hidden sm:flex flex-col items-center gap-2.5 font-mono-telemetry text-[10px] tracking-[0.25em] text-white/80">
          <span className="[writing-mode:vertical-lr] uppercase">SCROLL</span>
          <ArrowDown size={13} className="text-[var(--accent-gold)] animate-bounce" />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          LAYER 2: The Exact ERA Buletan (Arch Dome) from Image 2
          True semicircular arch dome rising from bottom over the photo!
          Exact match to user's uploaded reference (media_1792181477065_56b0b4d6.png)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={buletanStageRef}
        className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end items-center overflow-hidden will-change-transform"
      >
        <div className="relative w-full h-full flex flex-col justify-end items-center">
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full max-h-[92vh] overflow-visible drop-shadow-[0_-30px_90px_rgba(0,0,0,0.55)] pointer-events-auto"
            aria-hidden="true"
          >
            <defs>
              {/* Text Arc Curve (Concentric with the Buletan Semicircle) */}
              <path
                id="eraBuletanTextCurve"
                d="M 120,890 A 720,660 0 0,1 1480,890"
                fill="none"
              />
              <linearGradient id="buletanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BAC9D1" />
                <stop offset="100%" stopColor="#A8C3D1" />
              </linearGradient>
            </defs>

            {/* Semicircular Dome Path (The Buletan Semicircle) */}
            <path
              d="M 50,900 A 760,700 0 0,1 1550,900 L 1550,900 L 50,900 Z"
              fill="url(#buletanGrad)"
            />

            {/* Curved Typography: THREE REASONS TO CHOOSE REDESIGN */}
            <text
              className="fill-[#172026] select-none uppercase font-normal"
              style={{
                fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, 'Bodoni MT', serif",
                fontSize: "62px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                fontFeatureSettings: '"kern" 1, "liga" 1',
              }}
            >
              <textPath
                href="#eraBuletanTextCurve"
                xlinkHref="#eraBuletanTextCurve"
                startOffset="50%"
                textAnchor="middle"
              >
                THREE &nbsp;&nbsp;&nbsp;&nbsp; REASONS &nbsp;&nbsp;&nbsp;&nbsp; TO &nbsp;&nbsp;&nbsp;&nbsp; CHOOSE &nbsp;&nbsp;&nbsp;&nbsp; REDESIGN
              </textPath>
            </text>

            {/* Center Monogram (Exact match to COSTA ✦ DEL SOL in Image 2) */}
            <text
              x="800"
              y="600"
              textAnchor="middle"
              className="fill-[#172026] font-mono-telemetry text-xs md:text-sm tracking-[0.35em] uppercase font-bold"
              style={{ fontSize: "16px" }}
            >
              GADING SERPONG &nbsp;&nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;&nbsp; TANGERANG
            </text>
          </svg>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          LAYER 3: "BUILT TO STAY" Section (Reveals as user scrolls past Buletan)
          Showcases framed project photography & interactive slider
      ────────────────────────────────────────────────────────── */}
      <div
        ref={builtStageRef}
        className="absolute inset-0 z-40 w-full h-full bg-[#EFEFEC] flex flex-col justify-between items-center py-8 md:py-10 px-6 md:px-12 opacity-0 pointer-events-none will-change-transform"
      >
        {/* Top Bar Telemetry */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between font-mono-telemetry text-xs text-[var(--text-muted)] pb-2 border-b border-[#172026]/10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--accent-gold)]">01</span>
            <span>/</span>
            <span className="text-[var(--text-ink)] uppercase font-semibold">BUILT TO STAY</span>
          </div>
          <div className="flex items-center gap-2">
            <span>EST. 2016</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
            <span>BESPOKE JOINERY</span>
          </div>
        </div>

        {/* Center Showcase: Title + Photo Frame + Slider Controls */}
        <div className="flex flex-col items-center my-auto w-full text-center py-2 max-w-5xl mx-auto">
          <h2
            ref={titleRef}
            className="text-[clamp(2.4rem,5.5vw,4.5rem)] text-[var(--text-ink)] leading-none tracking-tight uppercase will-change-transform font-normal"
            style={{
              fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, serif",
            }}
          >
            {currentSlide.title}
          </h2>

          {/* Framed Project Photo */}
          <div
            ref={photoFrameRef}
            className="relative mx-auto mt-4 w-full max-w-[500px] h-[200px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-16px_rgba(24,30,41,0.18)] border border-[var(--border-subtle)] bg-[var(--bg-alabaster)] will-change-transform"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
          </div>

          {/* Slider Pagination Controls: < 1 ────── 2 > */}
          <div className="mt-3 flex items-center justify-center gap-4 font-mono-telemetry text-xs text-[var(--text-ink)] pointer-events-auto">
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev === 1 ? 2 : 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[var(--text-ink)]/10 transition-colors cursor-pointer"
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
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[var(--text-ink)]/10 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Bottom Descriptive Narrative & Kicker */}
        <div ref={copyRef} className="w-full max-w-xl mx-auto text-center space-y-1 pb-1">
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
            {currentSlide.subtitle}
          </p>
          <p className="font-mono-telemetry text-[11px] text-[var(--accent-gold)] font-bold tracking-[0.2em] uppercase">
            {currentSlide.kicker}
          </p>
        </div>
      </div>
    </section>
  );
}