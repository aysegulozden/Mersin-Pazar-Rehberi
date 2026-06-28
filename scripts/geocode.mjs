/**
 * geocode.mjs
 * src/data/markets.json içindeki pazarların adreslerini OpenStreetMap Nominatim
 * ile YAKLAŞIK koordinata çevirir (ücretsiz, anahtarsız).
 *
 * Önemli: Bu koordinatlar mahalle/ilçe düzeyinde yaklaşıktır. Bu yüzden
 * coordsApproximate=true ve coordsVerified=false olarak işaretlenir.
 * Uydurma değil — gerçek bir geocoding servisinin döndürdüğü en iyi eşleşmedir.
 *
 * Nominatim kullanım politikası: saniyede en fazla 1 istek + tanımlayıcı
 * User-Agent. Bu yüzden istekler 1.1 sn aralıkla ve önbellekli yapılır.
 *
 * Kullanım:  npm run data:geocode
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "src/data/markets.json");

const data = JSON.parse(readFileSync(dataPath, "utf-8"));

const UA = "MersinPazarRehberi/1.0 (egitim/yerel proje)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocode(query) {
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=tr&q=" +
    encodeURIComponent(query);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json.length) return null;
  return { lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) };
}

const cache = new Map();
let yapildi = 0;
let basarili = 0;

for (const m of data.markets) {
  if (m.latitude != null && m.longitude != null && m.coordsApproximate) {
    continue; 
  }

  const key = `${m.neighborhood}|${m.district}`;
  let coord = cache.get(key);

  if (coord === undefined) {
    const queries = [
      `${m.neighborhood} Mahallesi, ${m.district}, Mersin`,
      `${m.neighborhood}, ${m.district}, Mersin`,
      `${m.district}, Mersin`,
    ];
    coord = null;
    for (const q of queries) {
      try {
        coord = await geocode(q);
      } catch (e) {
        console.warn(`  ! hata (${q}): ${e.message}`);
      }
      await sleep(1100); 
      if (coord) break;
    }
    cache.set(key, coord);
    console.log(
      coord
        ? `✓ ${key} -> ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`
        : `✗ ${key} -> bulunamadı`
    );
  }

  if (coord) {
    m.latitude = coord.lat;
    m.longitude = coord.lng;
    m.coordsApproximate = true;
    m.coordsVerified = false;
    basarili++;
  }
  yapildi++;
}

data.meta.geocodedAt = new Date().toISOString().slice(0, 10);
writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
console.log(
  `\n✓ ${basarili}/${yapildi} pazar geocode edildi (yaklaşık). markets.json güncellendi.`
);
