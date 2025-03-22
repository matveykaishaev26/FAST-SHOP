import { IFilters } from "../_components/Filters/Filters";

export const isChecked = (filters: IFilters, filterType: keyof IFilters, itemId: string): boolean => {
  return filters?.[filterType]?.some((f) => f.id === itemId) ?? false;
};
