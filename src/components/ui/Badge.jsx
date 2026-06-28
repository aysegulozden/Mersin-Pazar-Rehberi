
const STILLER = {
  brand:   "bg-brand-100 text-brand-700",
  accent:  "bg-gold-100 text-gold-600",
  warning: "bg-brand-50 text-brand-600",
  neutral: "bg-[#f5ede3] text-ink-soft",
};

export default function Badge({ tone = "neutral", children, className = "" }) {
  return (
    <span className={`pill ${STILLER[tone] ?? STILLER.neutral} ${className}`}>
      {children}
    </span>
  );
}
