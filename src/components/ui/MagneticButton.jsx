import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticButton - Exact replication of ERA Residence's `initMagneticEffect`
 * Features dual-layer magnetic cursor pull with elastic spring return:
 * - Outer button frame pulls towards cursor
 * - Inner content moves with amplified delta creating spatial depth
 * - Recoils with elastic physics on leave
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.32,
  innerStrength = 0.55,
  onClick,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Outer frame spring
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.8 });

  // Inner element spring (amplified for layered depth)
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);
  const springInnerX = useSpring(innerX, { stiffness: 220, damping: 16, mass: 0.5 });
  const springInnerY = useSpring(innerY, { stiffness: 220, damping: 16, mass: 0.5 });

  const handleMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    x.set(dx * strength);
    y.set(dy * strength);

    innerX.set(dx * innerStrength);
    innerY.set(dy * innerStrength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      <motion.div
        style={{ x: springInnerX, y: springInnerY }}
        className="w-full h-full will-change-transform"
      >
        {typeof children === "function" ? children({ isHovered }) : children}
      </motion.div>
    </motion.div>
  );
}