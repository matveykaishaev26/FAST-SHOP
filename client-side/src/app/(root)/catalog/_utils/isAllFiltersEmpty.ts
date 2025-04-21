import { IFilters, IPriceRange } from "@/shared/types/filter.interface";

export const isAllFiltersEmpty = (filters: Omit<IFilters, "priceRange">, priceRange: IPriceRange) => {
  const isFiltersEmpty = Object.values(filters).every((values) => values.length === 0);
  const isPriceRangeEmpty = priceRange === null;

  return isFiltersEmpty && isPriceRangeEmpty;
};
