import { HAFTA, GUN_KISA, bugununGunu } from "../../lib/days.js";

export default function DayFilter({ value, onChange }) {
  const bugun = bugununGunu();

  const Chip = ({ active, isToday, children, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="touch-target shrink-0 rounded-full px-4 text-sm font-semibold transition-all duration-200 active:scale-95"
      style={
        active
          ? isToday
            ? {
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
              }
            : {
                background: "linear-gradient(135deg, #e85a1e 0%, #c23b0f 100%)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(232,90,30,0.35)",
              }
          : {
              background: "#fff",
              color: "#6b4f3a",
              border: "1.5px solid rgba(232,90,30,0.2)",
            }
      }
    >
      {children}
    </button>
  );

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
      <Chip
        active={value === bugun}
        isToday
        onClick={() => onChange(bugun)}
      >
        🌅 Bugün
      </Chip>
      <Chip active={value === "Hepsi"} onClick={() => onChange("Hepsi")}>
        Tümü
      </Chip>
      {HAFTA.map((g) => (
        <Chip key={g} active={value === g} onClick={() => onChange(g)}>
          {GUN_KISA[g]}
        </Chip>
      ))}
    </div>
  );
}
