export interface IFilterOption {
  id: string; 
  title: string; 
}


export type IPriceRange = [number, number] | null;
export interface IFilters {
  category?: IFilterOption[];
  size?: IFilterOption[];
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
