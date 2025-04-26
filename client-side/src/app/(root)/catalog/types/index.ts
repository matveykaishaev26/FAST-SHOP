import { IFilters, IFilterOption } from "@/shared/types/filter.interface";

export interface IHandleCheckboxChange {
  handleCheckboxChange: (
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
    isChecked: boolean
  ) => void;
}

export interface IFilterProps {
  filters: Omit<IFilters, "priceRange">;
  deleteFilters: (filterType: Exclude<keyof IFilters, "priceRange">, itemId?: string) => void;
  // setIsFiltersLoading:  React.Dispatch<React.SetStateAction<typeIsFiltersLoading>>;
}

export type typeIsFiltersLoading = Record<keyof IFilters, boolean>;