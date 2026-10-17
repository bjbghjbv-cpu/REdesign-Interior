import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.85,
  className = "",
  direction = "up", // "up" or "down"
}) {
  const yOffset = direction === "up" ? 48 : -48;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: yOffset, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{
          duration,
          delay,
          ease: [0.32, 0.72, 0, 1], // ERA Residence elegant curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
