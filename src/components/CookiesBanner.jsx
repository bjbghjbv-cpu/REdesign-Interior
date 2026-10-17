import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookiesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("redesign_cookies_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type) => {
    localStorage.setItem("redesign_cookies_consent", type);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed left-6 md:left-12 bottom-6 md:bottom-10 z-40 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl bg-[#172026]/95 text-[#EFEFEC] p-6 backdrop-blur-md border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)] select-none"
        >
          {/* Architectural Corner Vectors */}
          <div className="absolute top-2.5 left-2.5 font-mono-telemetry text-[9px] text-[var(--accent-gold)] opacity-70">
            +
          </div>
          <div className="absolute top-2.5 right-2.5 font-mono-telemetry text-[9px] text-[var(--accent-gold)] opacity-70">
            +
          </div>
          <div className="absolute bottom-2.5 left-2.5 font-mono-telemetry text-[9px] text-[var(--accent-gold)] opacity-70">
            +
          </div>
          <div className="absolute bottom-2.5 right-2.5 font-mono-telemetry text-[9px] text-[var(--accent-gold)] opacity-70">
            +
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span
              className="text-xl text-white font-normal"
              style={{ fontFamily: "'Bodoni Moda', 'Instrument Serif', serif" }}
            >
              Cookies
            </span>
            <span className="font-mono-telemetry text-[9px] tracking-widest text-[var(--accent-gold)] uppercase">
              PRIVACY &bull; AESTHETICS
            </span>
          </div>

          <p className="mt-3 text-xs text-white/70 leading-relaxed font-sans">
            This portfolio uses essential cookies and anonymous analytics to ensure optimal spatial rendering and interactive performance across viewports.
          </p>

          <div className="mt-5 flex items-center justify-end gap-3 font-mono-telemetry text-xs tracking-wider uppercase">
            <button
              type="button"
              onClick={() => handleAction("declined")}
              className="px-3 py-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Decline
            </button>
            <span className="text-white/30">/</span>
            <button
              type="button"
              onClick={() => handleAction("accepted")}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-[var(--accent-gold)] hover:text-white text-white border border-white/20 transition-all duration-300 font-semibold cursor-pointer"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
