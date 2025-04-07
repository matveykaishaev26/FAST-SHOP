import { IFilterOption, IFilters } from "@/features/slices/filtersSlice";

export interface IHandleCheckboxChange {
  handleCheckboxChange: (filterType: keyof IFilters, option: IFilterOption, isChecked: boolean) => void;
}

export interface IFilterProps extends IHandleCheckboxChange {
  filters: IFilters;
  deleteFilters: (filterType: keyof IFilters, itemId?: string) => void;
}
export interface IFilterProps extends IHandleCheckboxChange {
  filters: IFilters;
  deleteFilters: (filterType: keyof IFilters, itemId?: string) => void;
}
