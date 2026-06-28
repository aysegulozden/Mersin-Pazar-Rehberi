import { useState } from "react";
import MarketCard from "./MarketCard.jsx";
import { HAFTA, bugununGunu } from "../../lib/days.js";

export default function MarketList({ markets, groupByDay = false }) {
  if (!markets.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white/70 px-4 py-14 text-center">
        <span className="mb-3 text-4xl">🔍</span>
        <p className="text-sm font-semibold text-ink-soft">Bu filtreyle pazar bulunamadı.</p>
        <p className="mt-1 text-xs text-ink-faint">Farklı bir gün veya ilçe deneyin</p>
      </div>
    );
  }

  if (!groupByDay) {
    return (
      <div className="space-y-3">
        {markets.map((m) => (
          <MarketCard key={m.id} market={m} />
        ))}
      </div>
    );
  }

  return <GroupedList markets={markets} />;
}

function GroupedList({ markets }) {
  const gruplar = HAFTA.map((gun) => [
    gun,
    markets.filter((m) => m.day === gun),
  ]).filter(([, liste]) => liste.length > 0);

  const bugun = bugununGunu();
  const [acik, setAcik] = useState(() => {
    if (gruplar.some(([g]) => g === bugun)) return bugun;
    return gruplar[0]?.[0] ?? null;
  });

  return (
    <div className="space-y-2.5">
      {gruplar.map(([gun, liste]) => {
        const acikMi = acik === gun;
        const bugunMu = gun === bugun;
        return (
          <section
            key={gun}
            className="overflow-hidden rounded-2xl bg-white"
            style={{ border: "1px solid rgba(44,24,16,0.06)" }}
          >
            <button
              type="button"
              onClick={() => setAcik(acikMi ? null : gun)}
              className="flex w-full items-center gap-2.5 px-4 py-3.5 text-left transition-colors active:bg-brand-50/60"
            >
              <div
                className="h-5 w-1 shrink-0 rounded-full"
                style={{ background: "linear-gradient(180deg, #e85a1e, #c23b0f)" }}
              />
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
                {gun}
              </h2>
              {bugunMu && (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
                >
                  Bugün
                </span>
              )}
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-xs font-semibold text-brand-600"
                style={{ background: "#feebd6" }}
              >
                {liste.length} pazar
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-ink-faint transition-transform duration-200"
                style={{ transform: acikMi ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {acikMi && (
              <div className="space-y-3 px-3 pb-3">
                {liste.map((m) => (
                  <MarketCard key={m.id} market={m} showDay={false} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
