import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featureTrio } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureTrio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = sectionRef.current.querySelectorAll(".trio-item");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: item, start: "top 92%" },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--bg-parchment)] py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-3xl">
          <p className="trio-item font-mono-telemetry text-[var(--text-muted)] mb-4">
            Why it lasts
          </p>
          <h2 className="trio-item font-display text-4xl md:text-6xl text-[var(--text-ink)] leading-[1.03] tracking-tight">
            Built to stay, not to sell the trend.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
          {featureTrio.map((item) => (
            <article key={item.index} className="trio-item bg-[var(--bg-alabaster)] p-8 md:p-10 flex flex-col">
              <span className="font-mono-telemetry text-[var(--accent-gold)]">{item.index}</span>
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-[var(--text-ink)] leading-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
