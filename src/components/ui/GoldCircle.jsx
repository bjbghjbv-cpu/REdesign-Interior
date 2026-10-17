export default function GoldCircle({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`gold-circle pointer-events-none absolute ${className}`}
    />
  );
}