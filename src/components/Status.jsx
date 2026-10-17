import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "@phosphor-icons/react";
import { statusCopy } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger);

export default function Status() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = sectionRef.current.querySelectorAll(".status-reveal");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
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
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--bg-navy)] text-[var(--text-bone)] py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-6">
            <p className="status-reveal font-mono-telemetry text-[var(--accent-gold)] mb-4">
              {statusCopy.kicker}
            </p>
            <h2 className="status-reveal font-display text-4xl md:text-6xl leading-[1.03] tracking-tight max-w-[14ch]">
              {statusCopy.title}
            </h2>
            <p className="status-reveal mt-8 text-base text-[var(--text-bone)]/70 leading-relaxed max-w-[52ch]">
              {statusCopy.body}
            </p>

            <ul className="mt-10 space-y-4">
              {statusCopy.points.map((point) => (
                <li key={point} className="status-reveal flex items-start gap-3">
                  <CheckCircle size={20} weight="regular" className="mt-0.5 shrink-0 text-[var(--accent-gold)]" />
                  <span className="text-sm text-[var(--text-bone)]/85 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="status-reveal md:col-span-6">
            <div className="relative rounded-[2rem] overflow-hidden border border-[var(--border-subtle-dark)]">
              <img
                src={statusCopy.image}
                alt="REdesign studio build in progress"
                className="w-full h-[320px] md:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-navy)]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 font-mono-telemetry text-[var(--text-bone)] bg-[var(--bg-navy)]/70 backdrop-blur rounded-full px-4 py-2">
                Studio / Live build
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
