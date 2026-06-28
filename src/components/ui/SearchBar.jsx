
export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400"
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
          <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Mahalle, ilçe veya adres ara..."}
        aria-label="Pazar ara"
        className="touch-target w-full rounded-2xl border border-brand-100 bg-white pl-11 pr-4 py-3 text-[15px] text-ink outline-none shadow-card transition-all focus:border-brand-400 focus:shadow-glow focus:ring-2 focus:ring-brand-100 placeholder:text-ink-faint"
      />
    </div>
  );
}
