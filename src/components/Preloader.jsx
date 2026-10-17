import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment loading percentage smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1], // ERA Residence custom cubic-bezier
            },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-[#172026] text-[#EFEFEC] select-none overflow-hidden"
        >
          {/* Architectural Corner Vectors (ERA Residence Style) */}
          <div className="absolute top-6 left-6 font-mono-telemetry text-xs text-[var(--accent-gold)] opacity-70">
            +
          </div>
          <div className="absolute top-6 right-6 font-mono-telemetry text-xs text-[var(--accent-gold)] opacity-70">
            +
          </div>
          <div className="absolute bottom-6 left-6 font-mono-telemetry text-xs text-[var(--accent-gold)] opacity-70">
            +
          </div>
          <div className="absolute bottom-6 right-6 font-mono-telemetry text-xs text-[var(--accent-gold)] opacity-70">
            +
          </div>

          {/* Top Telemetry */}
          <div className="flex items-center justify-between font-mono-telemetry text-xs text-[var(--accent-gold)]">
            <span>REdesign Studio</span>
            <span>Est. 2016 — Gading Serpong</span>
          </div>

          {/* Center Brand Identity (Exact ERA Residence Architecture) */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Geometric Emblem */}
              <div className="w-12 h-12 mb-2">
                <img
                  src="/images/logo-emblem-transparent.png"
                  alt="REdesign"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(193,95,60,0.5)]"
                />
              </div>

              <span className="font-mono-telemetry text-[11px] tracking-[0.25em] text-[var(--accent-gold)]">
                SPACES CRAFTED FOR LIVING
              </span>
              <h1 className="font-display text-5xl md:text-8xl tracking-tight text-[var(--text-bone)]">
                RE<span className="text-[var(--accent-gold)]">design</span>
              </h1>
              <p className="font-display italic text-lg md:text-2xl text-[var(--text-bone)]/80">
                A space to return to.
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Telemetry */}
          <div className="w-full max-w-md mx-auto space-y-3">
            <div className="flex justify-between items-center font-mono-telemetry text-[10px] text-[var(--text-bone)]/60">
              <span>INITIALIZING SPATIAL CANVAS</span>
              <span>{Math.min(100, progress)}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent-gold)]"
                style={{ width: `${Math.min(100, progress)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
