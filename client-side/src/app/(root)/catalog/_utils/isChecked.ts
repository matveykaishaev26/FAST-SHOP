import { IFilters } from "@/shared/types/filter.interface";

export const isChecked = (
  filters: Omit<IFilters, "priceRange">,
  filterType: Exclude<keyof IFilters, "priceRange">,
  itemId: string
): boolean => {
  return filters?.[filterType]?.some((f) => f.id === itemId) ?? false;
};
