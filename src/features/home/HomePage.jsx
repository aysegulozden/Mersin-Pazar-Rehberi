import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppHeader from "../../components/layout/AppHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import MarketList from "../../components/market/MarketList.jsx";
import { useMarkets } from "../../hooks/useMarkets.js";
import { bugununGunu, HAFTA, gunSirasi } from "../../lib/days.js";

const URUN_EMOJILERI = [
  { emoji: "🍅", ad: "Domates" },
  { emoji: "🫑", ad: "Biber" },
  { emoji: "🫒", ad: "Zeytin" },
  { emoji: "🍋", ad: "Limon" },
  { emoji: "🥬", ad: "Marul" },
  { emoji: "🧅", ad: "Soğan" },
  { emoji: "🍇", ad: "Üzüm" },
  { emoji: "🌿", ad: "Nane" },
];

export default function HomePage() {
  const { data, isLoading } = useMarkets();
  const [query, setQuery] = useState("");
  const bugun = bugununGunu();

  const markets = data?.markets ?? [];

  const bugunkuler = useMemo(
    () => markets.filter((m) => m.day === bugun),
    [markets, bugun]
  );

  // Arama varsa tüm pazarlarda ara, yoksa bugünküleri göster
  const liste = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return bugunkuler;
    return markets
      .filter((m) =>
        `${m.neighborhood} ${m.district} ${m.address} ${m.day}`
          .toLocaleLowerCase("tr")
          .includes(q)
      )
      .sort((a, b) => gunSirasi(a.day) - gunSirasi(b.day));
  }, [query, bugunkuler, markets]);

  // Bugün pazar yoksa: sıradaki günü bul
  const sonrakiGun = useMemo(() => {
    if (bugunkuler.length || !markets.length) return null;
    const bugunIdx = HAFTA.indexOf(bugun);
    for (let i = 1; i <= 7; i++) {
      const g = HAFTA[(bugunIdx + i) % 7];
      if (markets.some((m) => m.day === g)) return g;
    }
    return null;
  }, [bugunkuler, markets, bugun]);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        title="Mersin Pazar Rehberi"
        subtitle={`Bugün ${bugun} · ${bugunkuler.length} pazar açık`}
        emoji="🛒"
      />

      <div className="space-y-4 px-4 pb-8 pt-1">
        {/* Bugün hero kartı */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(135deg, #e85a1e 0%, #b03410 60%, #8c2a10 100%)",
              boxShadow: "0 8px 32px rgba(232,90,30,0.3)",
            }}
          >
            {/* Dekoratif desen */}
            <div className="relative px-5 pt-5 pb-2">
              {/* Büyük arka plan emoji */}
              <div
                className="absolute right-4 top-2 text-7xl leading-none select-none"
                style={{ opacity: 0.12 }}
              >
                🛒
              </div>

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                  Bugün
                </p>
                <p className="text-3xl font-black text-white">{bugun}</p>
                <p className="mt-1 text-sm text-white/80">
                  {bugunkuler.length > 0
                    ? `${bugunkuler.length} mahallede taze pazar kuruluyor 🥦`
                    : "Bugün kayıtlı pazar yok"}
                </p>
              </div>

              {/* Ürün emojileri şeridi */}
              <div className="mt-4 -mx-5 overflow-x-auto hide-scrollbar">
                <div className="flex gap-3 px-5 pb-4">
                  {URUN_EMOJILERI.map(({ emoji, ad }, i) => (
                    <motion.div
                      key={ad}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex shrink-0 flex-col items-center gap-1"
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                      >
                        {emoji}
                      </span>
                      <span className="text-[10px] font-medium text-white/70">{ad}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Tüm pazarlarda ara (mahalle, ilçe...)"
        />

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-ink-faint">
            <span className="animate-spin text-lg">⟳</span>
            Yükleniyor...
          </div>
        )}

        {/* Bugün boşsa sıradaki güne yönlendir */}
        {!isLoading && !query && bugunkuler.length === 0 && sonrakiGun && (
          <div className="card p-5 text-center">
            <div className="mb-2 text-3xl">📅</div>
            <p className="text-sm font-semibold text-ink">Bugün pazar yok</p>
            <p className="mt-0.5 text-xs text-ink-faint">Sıradaki pazar günü:</p>
            <Link
              to="/takvim"
              className="mt-3 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #e85a1e 0%, #c23b0f 100%)",
                boxShadow: "0 4px 14px rgba(232,90,30,0.35)",
              }}
            >
              {sonrakiGun} pazarlarını gör →
            </Link>
          </div>
        )}

        {/* Pazar listesi başlığı */}
        {!isLoading && liste.length > 0 && (
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-1 rounded-full"
              style={{ background: "linear-gradient(180deg, #e85a1e, #c23b0f)" }}
            />
            <p className="text-sm font-bold text-ink">
              {query ? `${liste.length} sonuç` : `${bugun} pazarları`}
            </p>
          </div>
        )}

        <MarketList markets={liste} />
      </div>
    </div>
  );
}
