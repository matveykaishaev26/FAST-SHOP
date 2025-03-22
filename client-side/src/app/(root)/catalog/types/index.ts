export interface IFilterOption {
  id: string; // уникальный ID фильтра
  title: string; // название фильтра, которое отображается пользователю
}

// export type IPriceRange = [number, number];
export type IPriceRange = [number, number] | null;
export interface IFilters {
  category?: IFilterOption[];
  size?: IFilterOption[];
  // priceRange?: IPriceRange;
  color?: IFilterOption[];
  gender?: IFilterOption[];
  brand?: IFilterOption[];
  material?: IFilterOption[];
  style?: IFilterOption[];
}
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
