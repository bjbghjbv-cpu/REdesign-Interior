import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "@phosphor-icons/react";

/**
 * ScrollTelemetry - Exact replication of ERA Residence's `initScrollBar`
 * Features interactive vertical scrollbar:
 * - Realtime illuminated track fill and progress %
 * - Active architectural section indicator
 * - Draggable scroll scrubbing with grab/grabbing cursor
 * - Fading bottom "Scroll" guide
 */
export default function ScrollTelemetry() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("00");
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);

      // Section indices
      const sections = [
        { id: "top", code: "00" },
        { id: "studio", code: "01" },
        { id: "typologies", code: "02" },
        { id: "about", code: "03" },
        { id: "space-to-live", code: "04" },
        { id: "materiality", code: "05" },
        { id: "services", code: "06" },
        { id: "grand-closing", code: "07" },
        { id: "contact", code: "08" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i].code);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubScroll(e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    scrubScroll(e.clientY);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const scrubScroll = (clientY) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: ratio * totalHeight,
      behavior: "auto",
    });
  };

  return (
    <>
      {/* ERA Residence Right-Edge Vertical Progress Bar */}
      <aside
        aria-label="Scroll Progress Indicator"
        className="fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2.5 select-none"
      >
        {/* Active Section Telemetry Index */}
        <div className="font-mono-telemetry text-[10px] text-[var(--accent-gold)] tracking-widest font-semibold py-0.5">
          {activeSection}
        </div>

        {/* Vertical Track with Draggable Scrub Area */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`relative w-4 h-36 md:h-48 flex justify-center items-center cursor-grab ${
            isDragging ? "cursor-grabbing" : ""
          } group touch-none`}
        >
          {/* Subtle Hover Broad Hitbox */}
          <div className="absolute inset-y-0 w-full rounded-full" />

          {/* Background Track Line */}
          <div className="relative w-[1.5px] h-full bg-[var(--text-ink)]/20 rounded-full overflow-hidden">
            {/* Illuminated Fill */}
            <div
              className="absolute top-0 left-0 w-full bg-[var(--accent-gold)] transition-all duration-100 ease-out rounded-full shadow-[0_0_8px_rgba(193,95,60,0.6)]"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* Thumb Pill Indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)] border border-white shadow-md transition-transform duration-75 group-hover:scale-125"
            style={{
              top: `${Math.min(96, Math.max(4, scrollProgress))}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Total Progress Percentage */}
        <div className="font-mono-telemetry text-[9px] text-[var(--text-muted)] tracking-wider opacity-70">
          {String(Math.round(scrollProgress)).padStart(2, "0")}
        </div>
      </aside>

      {/* ERA Residence Bottom "Scroll" Guide (fades as user scrolls) */}
      <div
        className={`fixed left-8 md:left-12 bottom-8 z-30 pointer-events-none hidden md:flex items-center gap-2 transition-opacity duration-700 select-none ${
          scrollProgress > 4 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="font-mono-telemetry text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ArrowDown
          size={14}
          weight="bold"
          className="text-[var(--accent-gold)] animate-bounce"
        />
      </div>
    </>
  );
}
