import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "../ui/Badge.jsx";
import { gunEtiketi, bugununGunu } from "../../lib/days.js";
import { haritadaAcLink } from "../../lib/maps.js";


export default function MarketCard({ market, showDay = true }) {
  const bugun = bugununGunu();
  const bugunMu = market.day === bugun;
  const etiket = gunEtiketi(market.day);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={`/pazar/${market.id}`}
        className="card block overflow-hidden transition-all duration-200 hover:shadow-lift active:scale-[0.99]"
      >
        <div className="flex items-stretch">
          <div
            className="w-1.5 shrink-0 rounded-l-2xl"
            style={{
              background: bugunMu
                ? "linear-gradient(180deg, #f59e0b 0%, #e85a1e 100%)"
                : "linear-gradient(180deg, #fdd3a8 0%, #fba96a 100%)",
            }}
          />

          <div className="flex flex-1 items-start gap-3 p-4">
            <div className="flex-1 min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                <span className="text-base leading-none">🛒</span>
                <h3 className="truncate text-[15px] font-bold text-ink">
                  {market.neighborhood} Mah.
                </h3>
                <Badge tone="brand">{market.district}</Badge>
                {showDay && (
                  <Badge tone={bugunMu ? "accent" : "neutral"}>{etiket}</Badge>
                )}
              </div>

              <p className="line-clamp-2 text-sm text-ink-soft leading-relaxed">
                {market.address}
              </p>

              {!market.verified && (
                <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-brand-500 font-medium">
                  <span>⚠</span> Resmi kaynakla doğrulanmadı
                </p>
              )}
            </div>

            <a
              href={haritadaAcLink(market)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${market.neighborhood} pazarını haritada aç`}
              className="touch-target shrink-0 flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #e85a1e 0%, #c23b0f 100%)",
                boxShadow: "0 4px 12px rgba(232,90,30,0.3)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              Harita
            </a>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
