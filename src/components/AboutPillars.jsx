import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutCopy, pillars } from "../data/content.js";
import SplitTextReveal from "./ui/SplitTextReveal.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPillars() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const items = sectionRef.current.querySelectorAll(".pillar-card");

        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: i * 0.12,
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
              },
            }
          );
        });

        return () => {
          // matchMedia handles cleaning up triggers created within this context
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative w-full bg-[var(--bg-navy)] text-[var(--text-bone)] py-32 md:py-48 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono-telemetry text-[var(--accent-gold)] mb-4">About REdesign</p>
            <SplitTextReveal
              variant="heading"
              as="h2"
              className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-[var(--text-bone)]"
            >
              We bring ideas to life with innovative interior design and build solutions.
            </SplitTextReveal>
            <SplitTextReveal
              variant="lines"
              as="p"
              delay={0.2}
              className="mt-8 text-base md:text-lg text-[var(--text-bone)]/75 leading-relaxed max-w-[52ch]"
            >
              {aboutCopy}
            </SplitTextReveal>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              {pillars.map((pillar, i) => (
                <article
                  key={pillar.title}
                  className={`pillar-card group relative rounded-[2rem] overflow-hidden border border-[var(--border-subtle-dark)] bg-[var(--bg-alabaster)]/5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] ${
                    i % 2 === 1 ? "md:translate-y-12" : ""
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                    <span className="absolute top-3 left-3 font-mono-telemetry text-[var(--accent-gold)] bg-[var(--bg-navy)]/80 rounded-full px-3 py-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-[var(--text-bone)] leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--text-bone)]/65 leading-relaxed">
                      {pillar.copy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}