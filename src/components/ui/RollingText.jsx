import { useState } from "react";
import { motion } from "framer-motion";

/**
 * RollingText - Exact replication of ERA Residence's `[hover-nav-item]` and `[hover-link]`
 * Dual-layered typographic roll: On hover, top characters slide up and fade out,
 * while bottom characters slide up from below with a smooth wave stagger.
 */
export default function RollingText({
  text,
  className = "",
  hoverColor = "text-[var(--accent-gold)]",
  staggerDelay = 0.015,
  duration = 0.45,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const chars = Array.from(text);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex overflow-hidden cursor-pointer select-none leading-none ${className}`}
    >
      {/* Primary Line (Slides Up on Hover) */}
      <span className="inline-flex">
        {chars.map((char, i) => (
          <motion.span
            key={`top-${i}`}
            initial={false}
            animate={{
              y: isHovered ? "-115%" : "0%",
              opacity: isHovered ? 0 : 1,
              rotateX: isHovered ? -45 : 0,
            }}
            transition={{
              duration,
              delay: i * staggerDelay,
              ease: [0.32, 0.72, 0, 1], // ERA custom ease
            }}
            className="inline-block transform-gpu"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Secondary Line (Slides In from Below on Hover) */}
      <span className={`absolute inset-0 inline-flex ${hoverColor}`}>
        {chars.map((char, i) => (
          <motion.span
            key={`bot-${i}`}
            initial={false}
            animate={{
              y: isHovered ? "0%" : "115%",
              opacity: isHovered ? 1 : 0,
              rotateX: isHovered ? 0 : 45,
            }}
            transition={{
              duration,
              delay: i * staggerDelay,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="inline-block transform-gpu"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
