import { HAFTA, GUN_KISA, bugununGunu } from "../../lib/days.js";

/**
 * Kompakt haftalık şerit. 7 gün kutucuğu (her birinde pazar sayısı),
 * bugün vurgulu, seçili gün dolgulu. "Tümü" ile gün filtresi sıfırlanır.
 *
 * @param {{ value: string, onChange: (g: string) => void, counts: Record<string, number> }} props
 */
export default function WeekStrip({ value, onChange, counts = {} }) {
  const bugun = bugununGunu();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-soft">
          Bu hafta
        </span>
        <button
          type="button"
          onClick={() => onChange("Hepsi")}
          className="rounded-full px-3 py-1 text-xs font-semibold transition-all active:scale-95"
          style={
            value === "Hepsi"
              ? { background: "#2c1810", color: "#fff" }
              : { background: "#fff", color: "#6b4f3a", border: "1.5px solid rgba(232,90,30,0.2)" }
          }
        >
          Tümü
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {HAFTA.map((gun) => {
          const sayi = counts[gun] ?? 0;
          const aktif = value === gun;
          const bugunMu = gun === bugun;
          const bos = sayi === 0;

          return (
            <button
              key={gun}
              type="button"
              onClick={() => onChange(gun)}
              className="flex flex-col items-center gap-1 rounded-2xl py-2 transition-all duration-200 active:scale-95"
              style={
                aktif
                  ? {
                      background: bugunMu
                        ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                        : "linear-gradient(135deg, #e85a1e 0%, #c23b0f 100%)",
                      color: "#fff",
                      boxShadow: bugunMu
                        ? "0 4px 12px rgba(245,158,11,0.4)"
                        : "0 4px 12px rgba(232,90,30,0.35)",
                    }
                  : {
                      background: "#fff",
                      color: bos ? "#b9a896" : "#6b4f3a",
                      border: bugunMu
                        ? "1.5px solid rgba(245,158,11,0.6)"
                        : "1.5px solid rgba(232,90,30,0.15)",
                    }
              }
            >
              <span className="text-[11px] font-semibold leading-none">
                {GUN_KISA[gun]}
              </span>
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold leading-none"
                style={
                  aktif
                    ? { background: "rgba(255,255,255,0.22)", color: "#fff" }
                    : bos
                    ? { background: "transparent", color: "#cbbba8" }
                    : { background: "#feebd6", color: "#c23b0f" }
                }
              >
                {sayi}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
