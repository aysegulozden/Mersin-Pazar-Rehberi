import AppHeader from "../../components/layout/AppHeader.jsx";
import DayFilter from "../../components/ui/DayFilter.jsx";
import MarketMap from "../../components/market/MarketMap.jsx";
import { useMarkets } from "../../hooks/useMarkets.js";
import { useMarketFilters } from "../../hooks/useMarketFilters.js";

export default function MapPage() {
  const { data } = useMarkets();
  const markets = data?.markets ?? [];
  const f = useMarketFilters(markets);

  const noktaSayisi = f.filtered.filter(
    (m) => m.latitude != null && m.longitude != null
  ).length;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="Harita" subtitle={`${noktaSayisi} pazar haritada`} />

      <div className="px-4 pb-2 pt-1">
        <DayFilter value={f.day} onChange={f.setDay} />
      </div>

      <div className="relative flex-1 px-4 pb-4">
        <div className="h-full min-h-[60vh] overflow-hidden rounded-2xl shadow-soft">
          {/* key: gün değişince haritayı yeniden ortala */}
          <MarketMap key={f.day} markets={f.filtered} />
        </div>
        <p className="mt-2 text-center text-xs text-ink-faint">
          Konumlar mahalle düzeyinde yaklaşıktır. Kesin adres için pazara
          dokunup "Yol Tarifi" kullanın.
        </p>
      </div>
    </div>
  );
}
