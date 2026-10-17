import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/content.js";
import SplitTextReveal from "./ui/SplitTextReveal.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesBento() {
  const gridRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const items = gridRef.current?.querySelectorAll(".service-card");
        if (!items) return;

        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.06,
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
              },
            }
          );
        });
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="services"
      className="relative w-full bg-[var(--bg-parchment)] py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14">
          <p className="font-mono-telemetry text-[var(--text-muted)] mb-4">Our 8 specialized services</p>
          <SplitTextReveal
            variant="heading"
            as="h2"
            className="font-display text-4xl md:text-6xl text-[var(--text-ink)] leading-[1.05]"
          >
            A complete build studio, under one roof.
          </SplitTextReveal>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-dense gap-4"
        >
          {services.map((service, i) => (
            <article
              key={service.title}
              className={`service-card group relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--bg-alabaster)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01] ${service.col}`}
            >
              <div className={`relative w-full overflow-hidden ${service.large ? "h-full min-h-[420px] md:min-h-[520px]" : "h-56 md:h-64"}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-navy)]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-mono-telemetry text-[var(--accent-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-[var(--text-bone)] leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-bone)]/85 max-w-[48ch]">
                    {service.copy}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}