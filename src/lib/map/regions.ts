import { MAP_EXTENT, REGION_GEOMETRY, type RegionGeometry } from "@/lib/map/region-geometry";
import type { Locale } from "@/i18n/routing";

export type RegionName = Record<Locale, string>;

const REGION_NAMES: Record<string, RegionName> = {
  karakalpakstan: { uz: "Qoraqalpogʻiston", ru: "Каракалпакстан", en: "Karakalpakstan" },
  khorezm: { uz: "Xorazm", ru: "Хорезм", en: "Khorezm" },
  navoiy: { uz: "Navoiy", ru: "Навои", en: "Navoiy" },
  bukhara: { uz: "Buxoro", ru: "Бухара", en: "Bukhara" },
  samarkand: { uz: "Samarqand", ru: "Самарканд", en: "Samarkand" },
  kashkadarya: { uz: "Qashqadaryo", ru: "Кашкадарья", en: "Kashkadarya" },
  surkhandarya: { uz: "Surxondaryo", ru: "Сурхандарья", en: "Surkhandarya" },
  jizzakh: { uz: "Jizzax", ru: "Джизак", en: "Jizzakh" },
  syrdarya: { uz: "Sirdaryo", ru: "Сырдарья", en: "Syrdarya" },
  "tashkent-region": { uz: "Toshkent viloyati", ru: "Ташкентская область", en: "Tashkent Region" },
  "tashkent-city": { uz: "Toshkent shahri", ru: "Ташкент", en: "Tashkent City" },
  namangan: { uz: "Namangan", ru: "Наманган", en: "Namangan" },
  andijan: { uz: "Andijon", ru: "Андижан", en: "Andijan" },
  fergana: { uz: "Fargʻona", ru: "Фергана", en: "Fergana" },
};

const REGION_LOCATIVES: Record<string, RegionName> = {
  karakalpakstan: { uz: "Qoraqalpogʻistonda", ru: "Каракалпакстане", en: "Karakalpakstan" },
  khorezm: { uz: "Xorazmda", ru: "Хорезме", en: "Khorezm" },
  navoiy: { uz: "Navoiyda", ru: "Навои", en: "Navoiy" },
  bukhara: { uz: "Buxoroda", ru: "Бухаре", en: "Bukhara" },
  samarkand: { uz: "Samarqandda", ru: "Самарканде", en: "Samarkand" },
  kashkadarya: { uz: "Qashqadaryoda", ru: "Кашкадарье", en: "Kashkadarya" },
  surkhandarya: { uz: "Surxondaryoda", ru: "Сурхандарье", en: "Surkhandarya" },
  jizzakh: { uz: "Jizzaxda", ru: "Джизаке", en: "Jizzakh" },
  syrdarya: { uz: "Sirdaryoda", ru: "Сырдарье", en: "Syrdarya" },
  "tashkent-region": {
    uz: "Toshkent viloyatida",
    ru: "Ташкентской области",
    en: "Tashkent Region",
  },
  "tashkent-city": { uz: "Toshkent shahrida", ru: "Ташкенте", en: "Tashkent" },
  namangan: { uz: "Namanganda", ru: "Намангане", en: "Namangan" },
  andijan: { uz: "Andijonda", ru: "Андижане", en: "Andijan" },
  fergana: { uz: "Fargʻonada", ru: "Фергане", en: "Fergana" },
};

export type Region = RegionGeometry & {
  readonly names: RegionName;
  readonly locatives: RegionName;
};

export const REGIONS: readonly Region[] = REGION_GEOMETRY.map((geometry) => {
  const names = REGION_NAMES[geometry.id];
  if (!names) throw new Error(`Region geometry without a name: ${geometry.id}`);
  const locatives = REGION_LOCATIVES[geometry.id];
  if (!locatives) throw new Error(`Region geometry without a locative name: ${geometry.id}`);
  return { ...geometry, names, locatives };
});

export { MAP_EXTENT };

export type LocalisedRegion = {
  readonly id: string;
  readonly name: string;
  readonly locative: string;
  readonly anchor: readonly [number, number];
};

export function localisedRegions(locale: Locale): LocalisedRegion[] {
  return REGIONS.map((region) => ({
    id: region.id,
    name: region.names[locale],
    locative: region.locatives[locale],
    anchor: region.anchor,
  }));
}
