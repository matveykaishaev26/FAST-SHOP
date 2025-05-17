import { IParsedFilters } from "@/shared/types/filter.interface";

export async function parseFiltersFromSearchParams(params: Record<string, string | string[]>) {
  const getArray = (key: string): string[] => {
  const value = params[key];
  return Array.isArray(value) ? value : value ? value.split(",") : [];
};

  const priceRangeRaw = params["priceRange"];
  const priceRangeStr = Array.isArray(priceRangeRaw) ? priceRangeRaw[0] : priceRangeRaw;
  const priceRange = priceRangeStr?.split("-").map(Number) || null;

  return {
    brandIds: getArray("brandIds"),
    colorIds: getArray("colorIds"),
    priceRange,
    categoryIds: getArray("categoryIds"),
    sizeIds: getArray("sizeIds"),
    genderIds: getArray("genderIds"),
    materialIds: getArray("materialIds"),
    styleIds: getArray("styleIds"),
  } as IParsedFilters;
}
