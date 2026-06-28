# Mersin Pazar Rehberi

Mersin'deki haftalık semt pazarlarını gün gün gösteren, mobil öncelikli bir React uygulaması.

Temel hedef basit: **Bugün hangi pazar var? Nerede? Nasıl giderim?** — 5 saniyede cevap.

## Kurulum & Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production derlemesi (dist/)
npm run preview    # derlenmiş sürümü önizle
```

## Teknolojiler

React (JS) · Vite · Tailwind CSS · React Router · React Query · Framer Motion · Leaflet

Backend yok, veri statik JSON olarak tutuluyor. İleride Firebase veya bir REST API'ye geçmek gerekirse yalnızca `src/hooks/useMarkets.js` içindeki `queryFn` değişecek, başka bir şeye dokunmak gerekmeyecek.



## Veri Hakkında

Veri üç kamuya açık kaynaktan derlendi: **Yenişehir Belediyesi** (resmi), **PazarMap** ve **İmece Gazetesi**.

Ham veri `mersin_semt_pazarlari.json`'da, uygulamanın kullandığı veri `src/data/markets.json`'da.

Birkaç önemli not:

- **`verified: true`** yalnızca resmi belediye kaynağıyla teyit edilen kayıtlarda var. Diğerleri `false` ve arayüzde "Doğrulanmadı" etiketi taşıyor.
- **Koordinatlar yaklaşık.** Kaynaklarda koordinat yoktu, `npm run data:geocode` ile OpenStreetMap Nominatim üzerinden mahalle/ilçe düzeyinde üretildi. Bu yüzden her kayıtta `coordsApproximate: true` var ve harita "yaklaşık konum" uyarısı gösteriyor. Kesin adres için pazar detay sayfasındaki **Yol Tarifi** bağlantısını kullanabilirsiniz.
- **`openingHours` ve `categories`** kaynaklarda yoktu, uydurmak yerine `null`/`[]` bıraktım.

### Veriyi Yeniden Üretmek İçin

```bash
npm run data:build      # mersin_semt_pazarlari.json → src/data/markets.json
npm run data:geocode    # koordinatları doldurur (~1-2 dk, internet gerekir)
```

## Özellikler (V1)

- Bugünün pazarları — ana ekran
- Haftalık takvim, gün/ilçe filtresi ve arama
- Leaflet interaktif harita (bugün turuncu, diğerleri yeşil pin)
- Pazar detay sayfası (yol tarifi, kaynak, doğrulama durumu)
  
https://mersin-pazar-rehberi.vercel.app/
