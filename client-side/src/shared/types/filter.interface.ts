export interface IFilterItem {
  id: string;
  title: string;
}

export interface IFilterOption {
  id: string;
  title: string;
}

export interface IFilterColor extends IFilterOption {
  hex: string;
}
export type IPriceRange = [number, number] | null;

export interface IFilters {
  category: IFilterOption[];
  size: IFilterOption[];
  color: IFilterColor[];
  gender: IFilterOption[];
  brand: IFilterOption[];
  material: IFilterOption[];
  style: IFilterOption[];
  priceRange: IPriceRange;
}
