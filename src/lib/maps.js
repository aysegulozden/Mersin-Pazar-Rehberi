
export function haritadaAcLink(market) {
  if (market.latitude != null && market.longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${market.latitude},${market.longitude}`;
  }
  const q = encodeURIComponent(
    `${market.address} ${market.neighborhood} Mahallesi ${market.district} Mersin`
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function yolTarifiLink(market) {
  const dest =
    market.latitude != null && market.longitude != null
      ? `${market.latitude},${market.longitude}`
      : `${market.address} ${market.neighborhood} ${market.district} Mersin`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    dest
  )}`;
}

export function mesafeKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
