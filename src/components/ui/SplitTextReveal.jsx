import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * SplitTextReveal - Exact replication of ERA Residence's `animateTextH`, `animateTextA`, and `animateTextP`
 * Supports:
 * - variant="heading": 3D Y-axis character rotate & upward cascade
 * - variant="accent": 3D X-axis character flip
 * - variant="lines": masked paragraph line reveals
 */
export default function SplitTextReveal({
  children,
  variant = "heading", // "heading" | "accent" | "lines"
  className = "",
  delay = 0,
  as: Component = "div",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  if (typeof children !== "string") {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  const words = children.split(" ");

  if (variant === "heading") {
    return (
      <Component
        ref={ref}
        className={`inline-block overflow-hidden perspective-[1000px] ${className}`}
      >
        <span className="inline-flex flex-wrap">
          {words.map((word, wordIndex) => {
            const chars = Array.from(word);
            return (
              <span key={wordIndex} className="inline-flex mr-[0.28em] whitespace-nowrap">
                {chars.map((char, charIndex) => {
                  const index = wordIndex * 5 + charIndex;
                  return (
                    <motion.span
                      key={charIndex}
                      initial={{
                        opacity: 0,
                        y: "60%",
                        rotateY: 85,
                        rotateX: 20,
                      }}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              y: "0%",
                              rotateY: 0,
                              rotateX: 0,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.85,
                        delay: delay + index * 0.02,
                        ease: [0.25, 1, 0.5, 1], // ERA custom cubic-bezier
                      }}
                      className="inline-block transform-gpu origin-bottom-left"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </span>
      </Component>
    );
  }

  if (variant === "accent") {
    // 3D X-axis flip for italics and calligraphic accents
    return (
      <Component
        ref={ref}
        className={`inline-block overflow-hidden perspective-[800px] ${className}`}
      >
        <motion.span
          initial={{
            opacity: 0,
            rotateX: 90,
            x: "1.5rem",
            transformOrigin: "center bottom",
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  rotateX: 0,
                  x: "0rem",
                }
              : {}
          }
          transition={{
            duration: 0.95,
            delay,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="inline-block transform-gpu"
        >
          {children}
        </motion.span>
      </Component>
    );
  }

  // variant="lines"
  return (
    <Component ref={ref} className={`overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "115%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.32, 0.72, 0, 1],
        }}
        className="block transform-gpu"
      >
        {children}
      </motion.span>
    </Component>
  );
}
