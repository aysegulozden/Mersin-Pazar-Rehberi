import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "../../components/ui/Badge.jsx";
import MarketMap from "../../components/market/MarketMap.jsx";
import { useMarket } from "../../hooks/useMarkets.js";
import { gunEtiketi, bugununGunu } from "../../lib/days.js";
import { haritadaAcLink, yolTarifiLink } from "../../lib/maps.js";

export default function MarketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { market, isLoading } = useMarket(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-10 text-ink-faint">
        <span className="text-3xl animate-spin">⟳</span>
        <p className="text-sm">Yükleniyor...</p>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="p-6 text-center">
        <div className="mb-3 text-4xl">😕</div>
        <p className="font-semibold text-ink">Pazar bulunamadı.</p>
        <Link to="/" className="mt-3 inline-block text-brand-500 underline text-sm">
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  const bugun = bugununGunu();
  const bugunMu = market.day === bugun;
  const koordVar = market.latitude != null && market.longitude != null;

  return (
    <div className="flex flex-1 flex-col">
      {/* Geri butonu — hero gradient */}
      <div
        className="safe-top sticky top-0 z-20 px-4 pb-3 pt-4"
        style={{
          background: "linear-gradient(135deg, #e85a1e 0%, #c23b0f 100%)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="touch-target inline-flex items-center gap-1.5 text-sm font-semibold text-white/90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Geri
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 px-4 pb-8 pt-4"
      >
        {/* Başlık */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{market.district}</Badge>
            <Badge tone={bugunMu ? "accent" : "neutral"}>
              {gunEtiketi(market.day)}
            </Badge>
            {!market.verified && <Badge tone="warning">⚠ Doğrulanmadı</Badge>}
          </div>
          <h1 className="text-2xl font-extrabold text-ink leading-tight">
            🛒 {market.neighborhood} Mahallesi Pazarı
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{market.address}</p>
        </div>

        {/* Bilgi kartı */}
        <div className="card divide-y overflow-hidden" style={{ divideColor: "rgba(44,24,16,0.06)" }}>
          <Row icon="📅" label="Kurulduğu gün" value={market.day} />
          <Row icon="📍" label="İlçe" value={market.district} />
          <Row icon="🏘" label="Mahalle" value={market.neighborhood} />
          {market.openingHours && (
            <Row icon="🕐" label="Saatler" value={market.openingHours} />
          )}
          <Row
            icon="🗺"
            label="Konum"
            value={
              koordVar
                ? market.coordsApproximate
                  ? "Haritada (yaklaşık)"
                  : "Haritada göster"
                : "Koordinat yok"
            }
          />
        </div>

        {/* Aksiyon butonları */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={yolTarifiLink(market)}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target flex items-center justify-center gap-2 rounded-2xl py-3 font-bold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #e85a1e 0%, #c23b0f 100%)",
              boxShadow: "0 4px 14px rgba(232,90,30,0.35)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="m2 17 10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            Yol Tarifi
          </a>
          <a
            href={haritadaAcLink(market)}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target flex items-center justify-center gap-2 rounded-2xl border-2 py-3 font-bold transition-all active:scale-95"
            style={{
              borderColor: "#e85a1e",
              color: "#e85a1e",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            Haritada Aç
          </a>
        </div>

        {/* Mini harita */}
        {koordVar && (
          <div className="h-56 overflow-hidden rounded-2xl shadow-soft">
            <MarketMap markets={[market]} />
          </div>
        )}

        {market.note && (
          <div
            className="flex items-start gap-2 rounded-2xl px-4 py-3 text-sm"
            style={{ background: "#feebd6", color: "#b03410" }}
          >
            <span>ⓘ</span>
            <p>{market.note}</p>
          </div>
        )}

        {/* Kaynak */}
        {market.source && (
          <p className="text-xs text-ink-faint">
            Kaynak:{" "}
            <a
              href={market.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 underline"
            >
              {new URL(market.source).hostname}
            </a>
            {market.coordsApproximate && " · Koordinat: OpenStreetMap (yaklaşık)"}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-3">
      <div className="flex items-center gap-2">
        <span className="text-base leading-none">{icon}</span>
        <span className="text-sm text-ink-faint">{label}</span>
      </div>
      <span className="text-sm font-semibold text-ink text-right">{value}</span>
    </div>
  );
}

