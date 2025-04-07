import { IFilters } from "@/features/slices/filtersSlice";

export const isChecked = (filters: IFilters, filterType: keyof IFilters, itemId: string): boolean => {
  return filters?.[filterType]?.some((f) => f.id === itemId) ?? false;
};
