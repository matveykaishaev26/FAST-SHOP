import { IFilters, IFilterOption } from "@/shared/types/filter.interface";

export interface IHandleCheckboxChange {
  handleCheckboxChange: (
    isChecked: boolean,
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
  ) => void;
}

export interface IFilterProps extends IHandleCheckboxChange {
  filters: Omit<IFilters, "priceRange">;
  deleteFilters: (filterType: Exclude<keyof IFilters, "priceRange">, itemId?: string) => void;
  variant?: "desktop" | "mobile";

  // setIsFiltersLoading:  React.Dispatch<React.SetStateAction<typeIsFiltersLoading>>;
}

export type typeIsFiltersLoading = Record<keyof IFilters, boolean>;