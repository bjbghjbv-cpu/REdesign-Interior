import { ArrowUpRight } from "@phosphor-icons/react";
import RollingText from "./RollingText.jsx";

export default function ButtonInButton({
  label,
  onClick,
  variant = "light",
  className = "",
}) {
  const isLight = variant === "light";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full py-2 pl-6 pr-2 text-sm font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer ${
        isLight
          ? "bg-[var(--text-ink)] text-[var(--text-bone)] hover:bg-[var(--accent-gold)]"
          : "bg-[var(--accent-gold)] text-white hover:bg-[var(--text-ink)]"
      } ${className}`}
    >
      <RollingText text={label} hoverColor={isLight ? "text-white" : "text-[var(--accent-gold)]"} />
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[2px] ${
          isLight ? "bg-white/10" : "bg-white/15"
        }`}
      >
        <ArrowUpRight size={16} weight="regular" />
      </span>
    </button>
  );
}