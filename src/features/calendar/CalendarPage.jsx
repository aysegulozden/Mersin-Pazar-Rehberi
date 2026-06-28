import AppHeader from "../../components/layout/AppHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import WeekStrip from "../../components/ui/WeekStrip.jsx";
import MarketList from "../../components/market/MarketList.jsx";
import { useMarkets } from "../../hooks/useMarkets.js";
import { useMarketFilters } from "../../hooks/useMarketFilters.js";
import { bugununGunu, gunEtiketi } from "../../lib/days.js";

export default function CalendarPage() {
  const { data } = useMarkets();
  const markets = data?.markets ?? [];
  // Takvim bugünle açılsın ki sayfa gereksiz uzamasın.
  const f = useMarketFilters(markets, { initialDay: bugununGunu() });

  const baslik =
    f.day === "Hepsi" ? "Tüm pazarlar" : `${gunEtiketi(f.day)} · ${f.day}`;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        title="Haftalık Takvim"
        subtitle={`${f.filtered.length} pazar listeleniyor`}
        emoji="📅"
      />

      <div className="space-y-3 px-4 pb-6 pt-1">
        <WeekStrip value={f.day} onChange={f.setDay} counts={f.dayCounts} />

        <SearchBar value={f.query} onChange={f.setQuery} />

        {/* İlçe filtresi */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar">
          {f.districts.map((d) => (
            <button
              key={d}
              onClick={() => f.setDistrict(d)}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95"
              style={
                f.district === d
                  ? {
                      background: "#2c1810",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(44,24,16,0.25)",
                    }
                  : {
                      background: "#fff",
                      color: "#6b4f3a",
                      border: "1.5px solid rgba(232,90,30,0.2)",
                    }
              }
            >
              {d === "Hepsi" ? "🗺 Tüm İlçeler" : d}
            </button>
          ))}
        </div>

        {/* Seçili gün başlığı */}
        <div className="flex items-center gap-2 pt-1">
          <div
            className="h-5 w-1 rounded-full"
            style={{ background: "linear-gradient(180deg, #e85a1e, #c23b0f)" }}
          />
          <h2 className="text-sm font-bold text-ink">{baslik}</h2>
          <span
            className="ml-auto rounded-full px-2 py-0.5 text-xs font-semibold text-brand-600"
            style={{ background: "#feebd6" }}
          >
            {f.filtered.length} pazar
          </span>
        </div>

        <MarketList markets={f.filtered} groupByDay={f.day === "Hepsi"} />
      </div>
    </div>
  );
}
