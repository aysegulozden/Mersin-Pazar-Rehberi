import { useQuery } from "@tanstack/react-query";
import marketsData from "../data/markets.json";


async function fetchMarkets() {
  return marketsData;
}

export function useMarkets() {
  return useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
  });
}

export function useMarket(id) {
  const query = useMarkets();
  const market = query.data?.markets.find((m) => m.id === id) ?? null;
  return { ...query, market };
}
