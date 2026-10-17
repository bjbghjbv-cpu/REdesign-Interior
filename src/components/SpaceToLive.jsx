import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { spaceCopy, spaceStats } from "../data/content.js";
import SplitTextReveal from "./ui/SplitTextReveal.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function SpaceToLive() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = sectionRef.current.querySelectorAll(".space-reveal");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: item, start: "top 90%" },
          }
        );
      });

      return () => {
        // matchMedia handles cleaning up triggers created within this context
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spaces"
      className="relative w-full bg-[var(--bg-parchment)] py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p className="space-reveal font-mono-telemetry text-[var(--accent-gold)] mb-4">
              {spaceCopy.kicker}
            </p>
            <SplitTextReveal
              variant="heading"
              as="h2"
              className="space-reveal font-display text-4xl md:text-6xl text-[var(--text-ink)] leading-[1.03] tracking-tight max-w-[16ch]"
            >
              {spaceCopy.title}
            </SplitTextReveal>
          </div>
          <div className="md:col-span-5">
            <SplitTextReveal
              variant="lines"
              as="p"
              delay={0.2}
              className="space-reveal text-base text-[var(--text-muted)] leading-relaxed max-w-[46ch]"
            >
              {spaceCopy.body}
            </SplitTextReveal>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <div className="space-reveal md:col-span-7 rounded-[2rem] overflow-hidden border border-[var(--border-subtle)]">
            <img
              src={spaceCopy.images[0]}
              alt="Open-plan dining and living space"
              className="w-full h-[320px] md:h-[520px] object-cover"
            />
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="space-reveal rounded-[2rem] overflow-hidden border border-[var(--border-subtle)]">
              <img
                src={spaceCopy.images[1]}
                alt="Living area with bespoke joinery"
                className="w-full h-[220px] md:h-[248px] object-cover"
              />
            </div>
            <div className="space-reveal grid grid-cols-2 gap-px rounded-[2rem] overflow-hidden border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
              {spaceStats.map((stat) => (
                <div key={stat.label} className="bg-[var(--bg-alabaster)] p-6">
                  <p className="font-display text-3xl md:text-4xl text-[var(--text-ink)] leading-none">
                    {stat.value}
                    <span className="ml-1 font-mono-telemetry text-sm text-[var(--accent-gold)]">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="mt-3 text-xs text-[var(--text-muted)] leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
