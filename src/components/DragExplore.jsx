import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";
import { typologies } from "../data/content.js";
import SplitTextReveal from "./ui/SplitTextReveal.jsx";
import RollingText from "./ui/RollingText.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function DragExplore() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectMode, setInspectMode] = useState(false);

  const active = typologies[activeIndex] || typologies[0];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        ScrollTrigger.refresh();

        const getScrollDistance = () => {
          return Math.max(0, track.scrollWidth - window.innerWidth + 96);
        };

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance() + 800}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                typologies.length - 1,
                Math.max(0, Math.round(self.progress * (typologies.length - 1)))
              );
              setActiveIndex(idx);
            },
          },
        });

        tweenRef.current = tween;

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  const scrollToCard = (index) => {
    const nextIdx = Math.max(0, Math.min(typologies.length - 1, index));
    setActiveIndex(nextIdx);

    if (window.innerWidth >= 768 && tweenRef.current?.scrollTrigger) {
      const st = tweenRef.current.scrollTrigger;
      const targetProgress = nextIdx / (typologies.length - 1);
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const track = trackRef.current;
      const cards = track?.querySelectorAll(".typology-card");
      const target = cards?.[nextIdx];
      if (target && track) {
        track.scrollTo({ left: target.offsetLeft - 24, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    scrollToCard(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToCard(activeIndex + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="typologies"
      className="relative w-full bg-[var(--bg-parchment)] min-h-[100dvh] flex flex-col justify-center py-16 md:py-24 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
              <p className="font-mono-telemetry text-xs uppercase tracking-widest text-[var(--accent-gold)]">
                Spatial Portfolios · 07 Typologies
              </p>
            </div>
            <SplitTextReveal
              variant="heading"
              as="h2"
              className="font-display text-4xl md:text-6xl text-[var(--text-ink)] leading-[1.05]"
            >
              Walk through the craft
            </SplitTextReveal>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-telemetry text-xs tracking-widest text-[var(--accent-gold)] mr-2 font-bold">
              {String(activeIndex + 1).padStart(2, "0")} / {String(typologies.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-ink)] transition-all duration-300 hover:bg-[var(--text-ink)] hover:text-[var(--text-bone)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--text-ink)]"
              aria-label="Previous typology"
            >
              <CaretLeft size={18} weight="regular" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === typologies.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-ink)] transition-all duration-300 hover:bg-[var(--text-ink)] hover:text-[var(--text-bone)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--text-ink)]"
              aria-label="Next typology"
            >
              <CaretRight size={18} weight="regular" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width overflow-hidden track container */}
      <div className="w-full relative overflow-hidden">
        {/* Track with w-max on desktop so cards are NEVER squeezed or clipped */}
        <div
          ref={trackRef}
          className="flex w-max items-start gap-6 md:gap-8 px-6 md:px-12 will-change-transform overflow-x-auto md:overflow-visible scrollbar-hide snap-x md:snap-none"
        >
          {typologies.map((t, i) => (
            <article
              key={t.index}
              onClick={() => {
                setActiveIndex(i);
                scrollToCard(i);
              }}
              className={`typology-card group relative shrink-0 w-[85vw] sm:w-[420px] md:w-[460px] rounded-[2rem] overflow-hidden bg-[var(--bg-alabaster)] border border-[var(--border-subtle)] flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer shadow-[0_20px_40px_-20px_rgba(23,28,31,0.06)] hover:shadow-[0_28px_56px_-20px_rgba(23,28,31,0.16)] ${
                activeIndex === i
                  ? "ring-2 ring-[var(--accent-gold)] opacity-100 shadow-xl"
                  : "opacity-85 hover:opacity-100"
              } ${i % 3 === 1 ? "md:translate-y-3" : i % 3 === 2 ? "md:translate-y-6" : ""}`}
            >
              {/* Card Image */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden bg-black/5">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  onLoad={() => ScrollTrigger.refresh()}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <span className="absolute top-4 left-4 font-mono-telemetry text-xs tracking-wider text-[var(--accent-gold)] bg-[var(--bg-navy)]/90 backdrop-blur-sm rounded-full px-3.5 py-1 border border-white/10 shadow-sm">
                  {t.index} — TYPOLOGY
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--text-ink)] leading-snug">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="mt-6">
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-[var(--bg-parchment)] p-3.5 border border-[var(--border-subtle)]">
                      <dt className="font-mono-telemetry text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                        Scope
                      </dt>
                      <dd className="mt-1 font-semibold text-[var(--text-ink)] text-xs md:text-sm">
                        {t.scope}
                      </dd>
                    </div>
                    {t.area ? (
                      <div className="rounded-xl bg-[var(--bg-parchment)] p-3.5 border border-[var(--border-subtle)]">
                        <dt className="font-mono-telemetry text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                          Area
                        </dt>
                        <dd className="mt-1 font-semibold text-[var(--text-ink)] text-xs md:text-sm">
                          {t.area}
                        </dd>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-[var(--bg-parchment)] p-3.5 border border-[var(--border-subtle)]">
                        <dt className="font-mono-telemetry text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                          Clients
                        </dt>
                        <dd className="mt-1 font-semibold text-[var(--text-ink)] text-xs md:text-sm leading-snug">
                          {t.clients}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(i);
                      setInspectMode(true);
                    }}
                    className="mt-6 group/btn inline-flex items-center gap-2 rounded-full bg-[var(--text-ink)] text-[var(--text-bone)] pl-5 pr-2 py-2 text-sm font-semibold transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--bg-navy)] cursor-pointer"
                  >
                    <MagnifyingGlass size={16} weight="bold" />
                    <RollingText text="Inspect Room Specs" hoverColor="text-[var(--bg-navy)]" />
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 group-hover/btn:translate-x-1 transition-transform">
                      <CaretRight size={14} weight="bold" />
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Floating Specs Modal (doesn't distort pinned section height) */}
      {inspectMode && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setInspectMode(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-[2rem] bg-[var(--bg-navy)] text-[var(--text-bone)] p-8 md:p-10 border border-white/10 shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono-telemetry text-xs uppercase tracking-widest text-[var(--accent-gold)] mb-1">
                  Typology {active.index} · Architectural Spec Sheet
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-[var(--text-bone)]">
                  {active.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectMode(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--text-bone)] hover:bg-[var(--accent-gold)] hover:text-[var(--bg-navy)] transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[var(--text-bone)]/80 leading-relaxed mb-6">
              {active.description}
            </p>

            <dl className="grid gap-3 sm:grid-cols-3">
              {active.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-[var(--border-subtle-dark)] bg-white/5 p-4"
                >
                  <dt className="font-mono-telemetry text-xs text-[var(--accent-gold)]">
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 text-xs md:text-sm font-semibold text-[var(--text-bone)]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}