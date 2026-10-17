import { ArrowUpRight, Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import { navLinks, siteMeta } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[var(--bg-navy)] text-[var(--text-bone)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono-telemetry text-[var(--accent-gold)] mb-4">REdesign Interior & Build</p>
            <a href="#top" className="block w-full" aria-label="Back to top">
              <span className="font-display text-[clamp(4rem,16vw,12rem)] leading-none tracking-tight text-[var(--text-bone)] transition-colors hover:text-[var(--accent-gold)]">
                REdesign
              </span>
            </a>
            <p className="mt-6 text-sm text-[var(--text-bone)]/60 leading-relaxed max-w-[42ch]">
              Crafted for living, by day and by night. Bespoke furniture, interiors, and
              architectural details for residential and commercial spaces.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono-telemetry text-[var(--text-muted)] mb-6 text-[var(--accent-gold)]">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group inline-flex items-center gap-2 text-lg font-medium text-[var(--text-bone)]/85 transition-colors hover:text-[var(--accent-gold)]"
                  >
                    {link.label}
                    <ArrowUpRight size={16} weight="regular" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono-telemetry text-[var(--accent-gold)] mb-6">Studio</p>
            <div className="space-y-5 text-sm text-[var(--text-bone)]/75">
              <a href={`tel:${siteMeta.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[var(--accent-gold)] transition-colors">
                <Phone size={16} weight="regular" className="text-[var(--accent-gold)]" />
                {siteMeta.phone}
              </a>
              <a href={`mailto:${siteMeta.email}`} className="flex items-center gap-3 hover:text-[var(--accent-gold)] transition-colors">
                <EnvelopeSimple size={16} weight="regular" className="text-[var(--accent-gold)]" />
                {siteMeta.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin size={16} weight="regular" className="text-[var(--accent-gold)] mt-1 shrink-0" />
                {siteMeta.address}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border-subtle-dark)] flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono-telemetry text-[var(--text-bone)]/50">
            © {new Date().getFullYear()} REdesign Interior & Build
          </p>
          <p className="font-mono-telemetry text-[var(--text-bone)]/50">
            Gading Serpong · Tangerang · Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}