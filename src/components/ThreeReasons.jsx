import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { reasons } from "../data/content.js";
import ButtonInButton from "./ui/ButtonInButton.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeReasons() {
  const sectionRef = useRef(null);
  const trackContainerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState("01");

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const trackContainer = trackContainerRef.current;

      if (!section || !track || !trackContainer) return;

      // Force recalculation after layout settles
      ScrollTrigger.refresh();

      const getScrollAmount = () => {
        return track.scrollWidth - trackContainer.clientWidth + 160;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() + 800}`, // Generous travel distance for deliberate, silky-smooth horizontal scroll
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update horizontal progress bar
            if (progressRef.current) {
              progressRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
            }
            // Update active index (01, 02, 03)
            const idx = Math.min(3, Math.floor(self.progress * 3) + 1);
            setActiveCardIndex(`0${idx}`);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const goToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative w-full h-screen min-h-[100dvh] bg-[var(--bg-parchment)] overflow-hidden flex flex-col justify-between py-8 md:py-12 select-none"
    >
      {/* Top Architectural Telemetry Bar */}
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between font-mono-telemetry text-xs text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent-gold)] font-bold">01</span>
          <span>/</span>
          <span>THE FOUNDATION &amp; CRAFT</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[var(--text-muted)]">
          <span>HORIZONTAL SPATIAL RUN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
          <span>ERA-STYLE PINNED MOTION</span>
        </div>
      </div>

      {/* Main Pinned Horizontal Stage */}
      <div className="flex-1 w-full flex items-center relative overflow-hidden my-auto">
        {/* Left Sticky Editorial Title Column */}
        <div className="w-[340px] md:w-[420px] lg:w-[460px] shrink-0 pl-6 md:pl-12 lg:pl-16 pr-6 z-20 flex flex-col justify-center">
          {/* ERA-style Kicker */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
            <span className="font-mono-telemetry text-[11px] text-[var(--accent-gold)] tracking-[0.2em] uppercase">
              The Concept
            </span>
          </div>

          <h2 className="relative z-10 font-display text-4xl md:text-5xl lg:text-6xl text-[var(--text-ink)] leading-[1.04] tracking-tight">
            Three reasons to choose{" "}
            <span className="relative inline-block">
              REdesign
              <span
                className="absolute -z-10 -inset-x-3 -inset-y-1 rounded-full bg-[var(--accent-gold)] opacity-55"
                style={{ transform: "scale(1.15)" }}
              />
            </span>
          </h2>

          <p className="mt-6 text-sm md:text-base text-[var(--text-muted)] max-w-[34ch] leading-relaxed">
            A decade of hands-on building, trusted by brands, and a stubborn commitment to quality.
          </p>

          {/* Telemetry Progress & Controls */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between font-mono-telemetry text-xs">
              <span className="text-[var(--text-muted)]">CARD INDEX</span>
              <span className="text-[var(--accent-gold)] font-bold tracking-widest">
                {activeCardIndex} / 03
              </span>
            </div>

            {/* Hairline Progress Bar */}
            <div className="w-full h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-[var(--accent-gold)] rounded-full transition-all duration-75 ease-out w-0"
              />
            </div>

            <p className="text-[11px] font-mono-telemetry text-[var(--text-muted)]/70 flex items-center gap-1.5 pt-1">
              <span>Scroll mouse down to glide right</span>
              <ArrowRight size={12} weight="bold" className="text-[var(--accent-gold)]" />
            </p>
          </div>
        </div>

        {/* Right Horizontal Sliding Cards Track */}
        <div
          ref={trackContainerRef}
          className="flex-1 h-full flex items-center relative overflow-hidden"
        >
          {/* Left subtle gradient vignette to soften card entry */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--bg-parchment)] to-transparent z-10 pointer-events-none hidden md:block" />

          <div
            ref={trackRef}
            className="flex items-center gap-6 md:gap-8 pl-4 md:pl-10 pr-24 md:pr-36 will-change-transform"
          >
            {reasons.map((reason, i) => (
              <article
                key={reason.index}
                className="group relative w-[340px] sm:w-[420px] md:w-[480px] lg:w-[520px] shrink-0 h-[480px] md:h-[540px] rounded-[2rem] overflow-hidden bg-[var(--bg-alabaster)] border border-[var(--border-subtle)] shadow-[0_24px_48px_-24px_rgba(23,28,31,0.08)] flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_32px_64px_-24px_rgba(23,28,31,0.18)] hover:-translate-y-1"
              >
                {/* Visual Image Header */}
                <div className="relative h-[240px] md:h-[280px] overflow-hidden">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                  />
                  {/* Floating Architectural Index Badge */}
                  <div className="absolute top-4 left-4 font-mono-telemetry text-xs text-[var(--text-bone)] bg-[var(--bg-navy)]/85 backdrop-blur px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
                    {reason.index} — ARCHITECTURAL MILESTONE
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-[var(--text-ink)] leading-snug">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                      {reason.copy}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono-telemetry text-[10px] text-[var(--text-muted)]">
                    <span>REdesign Studio Guarantee</span>
                    <span className="text-[var(--accent-gold)] font-bold tracking-wider">
                      SPECIFIED &bull; BUILT
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {/* 4th Concluding Finale Card — ERA Style Invitation */}
            <article className="relative w-[320px] md:w-[380px] shrink-0 h-[480px] md:h-[540px] rounded-[2rem] overflow-hidden bg-[var(--bg-navy)] text-[var(--text-bone)] border border-[var(--border-subtle-dark)] shadow-[0_30px_60px_-20px_rgba(32,41,46,0.6)] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono-telemetry text-[11px] text-[var(--accent-gold)] tracking-[0.2em] uppercase">
                  Next Chapter
                </span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight">
                  Spaces designed to return to, year after year.
                </h3>
                <p className="mt-4 text-sm text-[var(--text-bone)]/75 leading-relaxed">
                  Explore how we turn residential and commercial footprints into bespoke living experiences.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-[var(--border-subtle-dark)]">
                <ButtonInButton
                  label="Explore Spaces"
                  onClick={() => goToSection("#typologies")}
                  variant="gold"
                  className="w-full justify-between"
                />
                <button
                  type="button"
                  onClick={() => goToSection("#contact")}
                  className="w-full text-center text-xs font-mono-telemetry text-[var(--text-bone)]/60 hover:text-[var(--accent-gold)] transition-colors py-2"
                >
                  Or schedule a direct consultation &rarr;
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between font-mono-telemetry text-[11px] text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-4">
        <span>ESTEPONA &amp; MEDITERRANEAN ARCHITECTURAL STANDARDS</span>
        <span className="text-[var(--accent-gold)]">CONTINUE SCROLLING TO UNPIN &darr;</span>
      </div>
    </section>
  );
}
