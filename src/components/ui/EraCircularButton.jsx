import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton.jsx";
import RollingText from "./RollingText.jsx";

/**
 * EraCircularButton - Exact replication of ERA Residence's `[hover-btn-circle]` & `[data-magnetic-btn]`
 * Large architectural circle with dual dynamic SVG arcs that expand on hover,
 * combined with dual-layer magnetic cursor pull and rolling typography.
 */
export default function EraCircularButton({
  text = "View Portfolios",
  onClick,
  size = 180,
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 86;
  const circumference = 2 * Math.PI * radius; // ~540
  const idleArc = 0.08 * circumference; // ~43
  const activeArc = 0.46 * circumference; // ~248

  return (
    <MagneticButton strength={0.35} innerStrength={0.55} onClick={onClick}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: size, height: size }}
        className={`relative rounded-full flex items-center justify-center cursor-pointer select-none group ${className}`}
      >
        {/* SVG Arcs Background */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full pointer-events-none transform -rotate-45"
        >
          {/* Subtle Outer Guideline Ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-white/20"
          />

          {/* First Dynamic Expanding Arc */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke="var(--accent-gold)"
            strokeWidth="1.5"
            fill="none"
            initial={false}
            animate={{
              strokeDasharray: isHovered
                ? `${activeArc} ${circumference}`
                : `${idleArc} ${circumference}`,
              rotate: isHovered ? 45 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="transform-gpu origin-center"
          />

          {/* Second Dynamic Expanding Arc (Opposing) */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke="var(--accent-gold)"
            strokeWidth="1.5"
            fill="none"
            initial={false}
            animate={{
              strokeDasharray: isHovered
                ? `${activeArc} ${circumference}`
                : `${idleArc} ${circumference}`,
              rotate: isHovered ? 225 : 180,
            }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="transform-gpu origin-center"
          />
        </svg>

        {/* Inner Label with Rolling Text */}
        <div className="relative z-10 px-6 text-center">
          <RollingText
            text={text}
            className="font-mono-telemetry text-xs tracking-[0.2em] uppercase text-white font-medium text-center"
            hoverColor="text-[var(--accent-gold)]"
          />
        </div>
      </div>
    </MagneticButton>
  );
}
