import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { materials } from "../data/content.js";

export default function Materiality() {
  const [activeId, setActiveId] = useState(materials[0].id);
  const active = materials.find((m) => m.id === activeId);

  return (
    <section
      id="materials"
      className="relative w-full bg-[var(--bg-navy)] text-[var(--text-bone)] py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono-telemetry text-[var(--accent-gold)] mb-4">Material index</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Crafted to endure.
            </h2>
            <p className="mt-8 text-base text-[var(--text-bone)]/70 leading-relaxed max-w-[48ch]">
              Every detail was selected to create spaces that feel elegant, intuitive, and
              effortless to live in.
            </p>

            <div className="mt-10 flex flex-col gap-2" role="tablist" aria-label="Material categories">
              {materials.map((material) => (
                <button
                  key={material.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === material.id}
                  onClick={() => setActiveId(material.id)}
                  className={`group text-left rounded-2xl px-6 py-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    activeId === material.id
                      ? "bg-[var(--accent-gold)] text-[var(--text-ink)]"
                      : "bg-transparent border border-[var(--border-subtle-dark)] text-[var(--text-bone)] hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`font-mono-telemetry ${
                      activeId === material.id ? "text-[var(--text-ink)]/70" : "text-[var(--accent-gold)]"
                    }`}
                  >
                    {material.code}
                  </span>
                  <span className="mt-1 block font-semibold text-lg">{material.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-[2rem] border border-[var(--border-subtle-dark)] bg-[var(--bg-alabaster)]/5 p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  <p className="font-mono-telemetry text-[var(--accent-gold)]">{active.code}</p>
                  <h3 className="mt-3 font-display text-3xl text-[var(--text-bone)] leading-tight">
                    {active.label}
                  </h3>
                  <p className="mt-4 text-sm text-[var(--text-bone)]/70 leading-relaxed max-w-[60ch]">
                    {active.description}
                  </p>

                  <dl className="mt-10 grid gap-4 md:grid-cols-2">
                    {active.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-xl border border-[var(--border-subtle-dark)] bg-[var(--bg-navy)]/40 p-5"
                      >
                        <dt className="font-mono-telemetry text-[var(--accent-gold)]">{spec.label}</dt>
                        <dd className="mt-2 text-sm font-semibold text-[var(--text-bone)]">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}