
export const GUNLER_JS = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

export const HAFTA = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

export const GUN_KISA = {
  Pazartesi: "Pzt",
  Salı: "Sal",
  Çarşamba: "Çar",
  Perşembe: "Per",
  Cuma: "Cum",
  Cumartesi: "Cmt",
  Pazar: "Paz",
};

export function bugununGunu(date = new Date()) {
  return GUNLER_JS[date.getDay()];
}

export function gunSirasi(gun) {
  const i = HAFTA.indexOf(gun);
  return i === -1 ? 99 : i;
}

export function gunEtiketi(gun, date = new Date()) {
  const bugun = bugununGunu(date);
  const yarin = GUNLER_JS[(date.getDay() + 1) % 7];
  if (gun === bugun) return "Bugün";
  if (gun === yarin) return "Yarın";
  return gun;
}
