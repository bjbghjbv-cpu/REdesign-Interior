import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, Envelope } from "@phosphor-icons/react";
import { navLinks, siteMeta } from "../data/content.js";
import ButtonInButton from "./ui/ButtonInButton.jsx";
import RollingText from "./ui/RollingText.jsx";

function FloorplanIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" />
      <path d="M3 12h18" />
      <path d="M12 3v18" />
      <path d="M9 3v9" />
      <path d="M15 12v9" />
    </svg>
  );
}

export default function Navbar({ onOpenBookModal }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 220);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSection = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg-parchment)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] text-[var(--text-ink)] shadow-sm"
            : "bg-transparent text-white pointer-events-auto"
        }`}
      >
        {/* Left Menu Drawer Trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`group flex items-center gap-2.5 text-sm font-semibold tracking-tight transition-colors ${
            scrolled ? "text-[var(--text-ink)]" : "text-white drop-shadow"
          }`}
          aria-label="Open menu drawer"
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              scrolled
                ? "border-[var(--border-subtle)] group-hover:bg-[var(--text-ink)] group-hover:text-[var(--text-bone)]"
                : "border-white/30 bg-black/25 backdrop-blur-md group-hover:bg-white group-hover:text-[var(--text-ink)] text-white"
            }`}
          >
            <FloorplanIcon />
          </span>
          <RollingText text="Menu" className="hidden md:inline font-mono-telemetry text-xs tracking-wider uppercase" />
        </button>

        {/* Center Logo: Hidden at very top when massive Hero RE DESIGN is visible, fades in on scroll */}
        <a
          href="#top"
          className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 ${
            scrolled
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
          aria-label="REdesign home"
        >
          <span className="font-display text-2xl tracking-tight text-[var(--text-ink)]">
            RE<span className="text-[var(--accent-gold)]">design</span>
          </span>
          <span className="font-mono-telemetry text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
            Interior &amp; Build
          </span>
        </a>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => goToSection("#typologies")}
            className={`hidden md:inline-flex items-center gap-1.5 text-xs font-mono-telemetry tracking-[0.18em] uppercase transition-all ${
              scrolled
                ? "text-[var(--text-ink)] hover:text-[var(--accent-gold)]"
                : "text-white/90 hover:text-white border-b border-white/60 pb-0.5 drop-shadow font-semibold"
            }`}
          >
            <RollingText text="Explore Spaces" />
          </button>
          <ButtonInButton
            label="Book a Call"
            onClick={() => {
              if (onOpenBookModal) onOpenBookModal();
              else goToSection("#contact");
            }}
            variant={scrolled ? "light" : "gold"}
          />
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-[var(--bg-navy)]/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 bottom-0 left-0 z-50 w-full max-w-lg bg-[var(--bg-parchment)] p-8 md:p-12 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/logo-emblem-transparent.png"
                      alt="REdesign"
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <p className="font-display text-xl leading-none text-[var(--text-ink)]">
                        RE<span className="text-[var(--accent-gold)]">design</span>
                      </p>
                      <p className="font-mono-telemetry text-[9px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                        Interior &amp; Build
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="font-mono-telemetry text-xs tracking-wider text-[var(--text-muted)] hover:text-[var(--text-ink)] uppercase px-3 py-1.5 rounded-full border border-[var(--border-subtle)]"
                  >
                    Close &times;
                  </button>
                </div>

                <nav className="mt-12 flex flex-col gap-5">
                  {navLinks.map((link, i) => (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => goToSection(link.href)}
                      className="group flex items-baseline justify-between text-left"
                    >
                      <RollingText
                        text={link.label}
                        className="font-display text-3xl md:text-4xl text-[var(--text-ink)] transition-transform duration-300 ease-out group-hover:translate-x-2"
                      />
                      <span className="font-mono-telemetry text-xs text-[var(--accent-gold)]">
                        0{i + 1}
                      </span>
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      if (onOpenBookModal) onOpenBookModal();
                      else goToSection("#contact");
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-[var(--accent-gold)] text-white font-mono-telemetry text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-between hover:opacity-95 transition-opacity shadow-md cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowUpRight size={16} weight="bold" />
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--accent-gold)]" />
                  <span>{siteMeta.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[var(--accent-gold)]" />
                  <span>{siteMeta.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Envelope size={14} className="text-[var(--accent-gold)]" />
                  <span>{siteMeta.email}</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}