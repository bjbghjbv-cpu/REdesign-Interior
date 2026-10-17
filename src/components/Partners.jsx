import { partners } from "../data/content.js";

export default function Partners() {
  return (
    <section className="relative w-full bg-[var(--bg-alabaster)] py-24 md:py-32 border-y border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-4">
            <p className="font-mono-telemetry text-[var(--accent-gold)] mb-3">Trusted by</p>
            <h2 className="font-display text-2xl md:text-3xl text-[var(--text-ink)] leading-tight">
              Renowned brands we build for.
            </h2>
          </div>

          <div className="md:col-span-8 grid gap-4 sm:grid-cols-2">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-parchment)] px-6 py-6 transition-colors duration-500 hover:border-[var(--accent-gold)]"
              >
                <div>
                  <p className="font-display text-xl md:text-2xl text-[var(--text-ink)] leading-tight">
                    {partner.name}
                  </p>
                  <p className="mt-1 font-mono-telemetry text-[var(--text-muted)]">{partner.role}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-ink)] transition-colors duration-500 group-hover:bg-[var(--accent-gold)] group-hover:text-[var(--text-bone)] group-hover:border-[var(--accent-gold)]">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M4 12L12 4M12 4H5.5M12 4V10.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
