import { useMemo, useState } from "react";
import { gunSirasi, HAFTA } from "../lib/days.js";


export function useMarketFilters(markets = [], opts = {}) {
  const { initialDay = "Hepsi" } = opts;
  const [day, setDay] = useState(initialDay);
  const [district, setDistrict] = useState("Hepsi");
  const [query, setQuery] = useState("");

  const districts = useMemo(
    () =>
      ["Hepsi", ...Array.from(new Set(markets.map((m) => m.district))).sort()],
    [markets]
  );

  const gunHaricFiltreli = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    return markets.filter((m) => {
      if (district !== "Hepsi" && m.district !== district) return false;
      if (q) {
        const text = `${m.neighborhood} ${m.district} ${m.address}`.toLocaleLowerCase(
          "tr"
        );
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [markets, district, query]);

  const dayCounts = useMemo(() => {
    const sayac = Object.fromEntries(HAFTA.map((g) => [g, 0]));
    for (const m of gunHaricFiltreli) {
      if (sayac[m.day] != null) sayac[m.day] += 1;
    }
    return sayac;
  }, [gunHaricFiltreli]);

  const filtered = useMemo(() => {
    return gunHaricFiltreli
      .filter((m) => day === "Hepsi" || m.day === day)
      .sort(
        (a, b) =>
          gunSirasi(a.day) - gunSirasi(b.day) ||
          a.district.localeCompare(b.district, "tr") ||
          a.neighborhood.localeCompare(b.neighborhood, "tr")
      );
  }, [gunHaricFiltreli, day]);

  return {
    day,
    setDay,
    district,
    setDistrict,
    query,
    setQuery,
    districts,
    dayCounts,
    filtered,
  };
}
