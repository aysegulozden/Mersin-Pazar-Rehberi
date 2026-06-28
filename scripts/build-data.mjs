/**
 * build-data.mjs
 * Ham araştırma verisini (mersin_semt_pazarlari.json) brief'teki data model'e
 * normalize eder ve src/data/markets.json olarak yazar.
 *
 * Uydurma yok: kaynakta olmayan alanlar (openingHours, categories, koordinat)
 * boş/null bırakılır.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const ham = JSON.parse(
  readFileSync(join(root, "mersin_semt_pazarlari.json"), "utf-8")
);

const TR_MAP = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
function slug(s) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşü]/g, (c) => TR_MAP[c] || c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const markets = ham.pazarlar.map((p, i) => {
  const id = `${slug(p.ilce)}-${slug(p.mahalle)}-${slug(p.gun)}-${i + 1}`;
  return {
    id,
    name: `${p.mahalle} ${p.gun} Pazarı`,
    district: p.ilce,
    neighborhood: p.mahalle,
    day: p.gun,
    address: p.adres,
    latitude: p.koordinat?.lat ?? null,
    longitude: p.koordinat?.lng ?? null,
    coordsApproximate: false,
    coordsVerified: p.koordinat_verified ?? false,
    openingHours: null, 
    categories: [],
    verified: p.verified === true,
    source: p.kaynak ?? null,
    note: p.not ?? null,
  };
});

const out = {
  meta: {
    title: "Mersin Pazar Rehberi",
    city: "Mersin",
    lastUpdated: ham.meta?.derlenme_tarihi ?? null,
    sources: ham.meta?.kaynaklar ?? {},
    notes: ham.meta?.onemli_notlar ?? [],
    count: markets.length,
  },
  markets,
};

writeFileSync(
  join(root, "src/data/markets.json"),
  JSON.stringify(out, null, 2),
  "utf-8"
);

console.log(`✓ ${markets.length} pazar -> src/data/markets.json`);
