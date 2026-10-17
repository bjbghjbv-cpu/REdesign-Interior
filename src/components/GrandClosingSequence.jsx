import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone, ChatCircleText } from "@phosphor-icons/react";
import { siteMeta, partners } from "../data/content.js";

gsap.registerPlugin(ScrollTrigger);

export default function GrandClosingSequence({ onOpenBookModal }) {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const curtainRef = useRef(null);
  const contactContentRef = useRef(null);

  const goToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const container = containerRef.current;
      const photo = photoRef.current;
      const stage1 = stage1Ref.current;
      const stage2 = stage2Ref.current;
      const curtain = curtainRef.current;
      const contactContent = contactContentRef.current;

      if (!container || !photo || !stage1 || !curtain) return;

      // Master Pinned Timeline: Liquid smooth transition matching ERA Residence (Images 2 -> 3 -> 4)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ─── 1. Photo Cinematic Pan & Gentle Parallax ───
      tl.fromTo(
        photo,
        { scale: 1.02, yPercent: 0 },
        { scale: 1.12, yPercent: -10, ease: "none", duration: 1 },
        0
      );

      // ─── 2. Stage 1 (PERFECT LIVING SPACES - Image 2) glides up & dissolves ───
      tl.fromTo(
        stage1,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, ease: "power2.in", duration: 0.3 },
        0.26
      );

      // ─── 3. Stage 2 (Center Radar Button - Image 3) emerges & then smoothly fades ───
      if (stage2) {
        tl.fromTo(
          stage2,
          { opacity: 0, scale: 0.92, pointerEvents: "none" },
          { opacity: 1, scale: 1, pointerEvents: "auto", ease: "power2.out", duration: 0.22 },
          0.34
        );

        tl.to(
          stage2,
          { opacity: 0, scale: 1.04, pointerEvents: "none", ease: "power2.in", duration: 0.18 },
          0.54
        );
      }

      // ─── 4. Stage 3: Deep Slate-Navy Curtain Rises (Image 4) ───
      tl.fromTo(
        curtain,
        { yPercent: 100 },
        { yPercent: 44, ease: "power2.inOut", duration: 0.44 },
        0.52
      );

      // ─── 5. Monumental Phone & Studio Details Settle ───
      if (contactContent) {
        tl.fromTo(
          contactContent,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
          0.68
        );
      }

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="grand-closing"
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none bg-[var(--bg-navy)]"
    >
      {/* ──────────────────────────────────────────────────────────
          LAYER 0: Photo 5 Background (Color-Graded to Web Palette)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          ref={photoRef}
          src="/images/redesign-tv-piano.jpg"
          alt="REdesign bespoke living space with marble TV wall and piano"
          className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.78] will-change-transform"
        />
        {/* Architectural Vignette: Slate-Navy Gradient matching web palette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(32,41,46,0.65) 0%, rgba(32,41,46,0.28) 40%, rgba(32,41,46,0.85) 100%)",
          }}
        />
      </div>

      {/* ──────────────────────────────────────────────────────────
          PHASE 1: "PERFECT LIVING SPACES" Stage (Exact ERA Image 2)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={stage1Ref}
        className="absolute inset-0 z-10 flex flex-col justify-between py-12 md:py-16 px-6 md:px-12 will-change-transform pointer-events-auto"
      >
        {/* Top Editorial Telemetry (Matching ERA Image 2) */}
        <div className="w-full max-w-4xl mx-auto text-center pt-2">
          <p className="font-mono-telemetry text-[11px] md:text-xs text-white/90 tracking-[0.24em] uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            A short conversation is enough to understand your interior vision &mdash; whether a
            complete residential fit-out, bespoke joinery, or a flagship commercial space.
          </p>
        </div>

        {/* Center: Monumental Title */}
        <div className="text-center my-auto flex flex-col items-center">
          <h2
            className="text-[clamp(4rem,13vw,10.5rem)] leading-[0.82] tracking-tight uppercase text-white font-normal drop-shadow-[0_16px_40px_rgba(0,0,0,0.65)]"
            style={{
              fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, serif",
              textShadow: "0 4px 30px rgba(0,0,0,0.8)",
            }}
          >
            Perfect
            <br />
            Living Spaces
          </h2>

          <p className="font-mono-telemetry text-xs md:text-sm tracking-[0.32em] uppercase text-white/90 mt-5 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            From Private Residences to Renowned Brands
          </p>

          {/* Prestigious Brand Trust Badges (Duck King & Tomoro Coffee) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-mono-telemetry text-xs tracking-wider uppercase shadow-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                <span className="font-semibold">{partner.name}</span>
                <span className="text-white/60 text-[10px]">&bull; {partner.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="w-full text-center font-mono-telemetry text-[11px] tracking-[0.25em] text-white/70 uppercase">
          <span>SCROLL DOWN TO EXPLORE CONSULTATION &darr;</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          PHASE 2: Interactive Center Radar Button (Exact ERA Image 3)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={stage2Ref}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 will-change-transform"
      >
        <button
          type="button"
          onClick={() => {
            if (onOpenBookModal) onOpenBookModal();
            else goToSection("#contact");
          }}
          className="group relative flex flex-col items-center justify-center w-52 h-52 md:w-60 md:h-60 rounded-full border border-white/40 bg-black/35 backdrop-blur-md text-white transition-transform duration-500 hover:scale-105 pointer-events-auto cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          aria-label="Start project consultation"
        >
          {/* Subtle outer pulsing animated ring */}
          <div className="absolute inset-0 rounded-full border border-[var(--accent-gold)]/50 animate-ping opacity-30 pointer-events-none" />

          {/* Inner content */}
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)] mb-3 animate-pulse" />
          <span className="font-mono-telemetry text-xs tracking-[0.22em] uppercase text-white font-semibold text-center px-4">
            Start Your
            <br />
            Consultation
          </span>
          <span className="font-mono-telemetry text-[10px] text-white/70 tracking-widest mt-2 uppercase flex items-center gap-1 group-hover:text-[var(--accent-gold)] transition-colors">
            Connect With Us &rarr;
          </span>
        </button>
      </div>

      {/* ──────────────────────────────────────────────────────────
          PHASE 3: Deep Slate-Navy Curtain Rises (Exact ERA Image 4)
          Wipes smoothly from bottom, covering lower 56% with rich solid navy!
      ────────────────────────────────────────────────────────── */}
      <div
        ref={curtainRef}
        className="absolute inset-x-0 bottom-0 h-full bg-[var(--bg-navy)] text-[var(--text-bone)] z-30 flex flex-col items-center justify-between py-10 md:py-14 px-6 md:px-12 will-change-transform shadow-[0_-40px_100px_rgba(0,0,0,0.6)] border-t border-[var(--border-subtle-dark)]"
      >
        {/* Content Container Inside the Curtain */}
        <div
          ref={contactContentRef}
          className="my-auto flex flex-col items-center text-center max-w-4xl mx-auto w-full opacity-0 will-change-transform"
        >
          {/* Golden Architectural Emblem */}
          <div className="mb-4">
            <img
              src="/images/logo-emblem-transparent.png"
              alt="REdesign"
              className="w-12 h-12 md:w-14 md:h-14 object-contain filter drop-shadow-[0_4px_12px_rgba(193,95,60,0.4)]"
            />
          </div>

          {/* Monumental Phone Number (Exact ERA Image 4 Style) */}
          <a
            href={`tel:${siteMeta.phone.replace(/[\s-]/g, "")}`}
            className="group block text-[clamp(2.8rem,8.5vw,6.5rem)] leading-none text-white tracking-tight font-normal transition-colors hover:text-[var(--accent-gold)]"
            style={{
              fontFamily: "'Bodoni Moda', 'Instrument Serif', Didot, serif",
            }}
          >
            {siteMeta.phone}
          </a>

          {/* Studio Office Details */}
          <div className="mt-5 space-y-2 font-mono-telemetry text-xs md:text-sm text-[var(--text-bone)]/80 tracking-[0.2em] uppercase">
            <p className="text-[var(--accent-gold)] font-bold">SALES &amp; DESIGN STUDIO</p>
            <p className="max-w-md mx-auto text-[var(--text-bone)]/70 text-[11px] leading-relaxed">
              {siteMeta.address}
            </p>
            <p className="pt-1 text-[var(--text-bone)]/90">{siteMeta.email}</p>
          </div>

          {/* Action Call & WhatsApp Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6282138383856"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[var(--accent-gold)] text-white font-mono-telemetry text-xs tracking-wider uppercase font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
            >
              <ChatCircleText size={16} weight="bold" />
              <span>WhatsApp Direct</span>
            </a>
            <a
              href={`tel:${siteMeta.phone.replace(/[\s-]/g, "")}`}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono-telemetry text-xs tracking-wider uppercase font-semibold transition-colors duration-300"
            >
              <Phone size={16} />
              <span>Call Studio</span>
            </a>
          </div>
        </div>

        {/* Bottom Closing Telemetry */}
        <div className="w-full max-w-6xl flex items-center justify-between font-mono-telemetry text-[11px] text-[var(--text-bone)]/50 border-t border-[var(--border-subtle-dark)] pt-4">
          <span>REDESIGN INTERIOR &amp; BUILD &bull; EST. 2016</span>
          <span className="text-[var(--accent-gold)]">GADING SERPONG, TANGERANG</span>
        </div>
      </div>
    </section>
  );
}
