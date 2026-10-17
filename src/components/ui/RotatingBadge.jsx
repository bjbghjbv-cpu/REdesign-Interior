import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * RotatingBadge - Exact replication of ERA Residence's `initLogo`
 * Continuously rotates the typographic circular SVG badge.
 * Accelerates dynamically based on scroll velocity and smoothly decelerates with inertia.
 */
export default function RotatingBadge({
  text = "REDESIGN • INTERIOR & BUILD • REDESIGN • EST. 2016 • ",
  size = 110,
  className = "",
  textColor = "text-white",
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    let rotation = 0;
    let targetSpeed = 30; // base deg/second
    let currentSpeed = 30;
    let lastScrollY = window.scrollY;
    let scrollTimeout = null;

    const handleScroll = () => {
      const deltaY = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const velocity = Math.abs(deltaY);

      // Accelerate rotation proportionally with velocity (ERA Residence formula)
      const boost = Math.min(240, 30 + velocity * 4);
      targetSpeed = deltaY >= 0 ? boost : -boost;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetSpeed = 30; // Return to peaceful idle rotation
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // GSAP Ticker for 60fps/120fps ultra-fluid motion
    const ticker = (time, deltaTime) => {
      // Lerp current speed towards target speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      const deltaSeconds = Math.min(deltaTime / 1000, 0.1);
      rotation += currentSpeed * deltaSeconds;
      gsap.set(el, { rotation, transformOrigin: "center center", force3D: true });
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(ticker);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Velocity-Driven Rotating SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="w-full h-full will-change-transform"
      >
        <path
          id="circlePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text
          className={`font-mono-telemetry fill-current text-[8px] uppercase tracking-[0.19em] ${textColor}`}
        >
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Architectural Emblem or Monogram */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
        <img
          src="/images/logo-emblem-transparent.png"
          alt="REdesign Emblem"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}
