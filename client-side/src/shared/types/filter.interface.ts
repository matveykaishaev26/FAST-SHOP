export const filtersOrder: Exclude<keyof IFilters, "priceRange">[] = [
  "brandIds",
  "colorIds",
  "sizeIds",
  "categoryIds",
  "styleIds",
  "genderIds",
  "materialIds",
];
// export interface IFilterItem {
//   id: string;
//   title: string;
// }
export interface IFilterItem {
  title: string;
  id: string;
  productCount: number;
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
  categoryIds: IFilterOption[];
  sizeIds: IFilterOption[];
  colorIds: IFilterColor[];
  genderIds: IFilterOption[];
  brandIds: IFilterOption[];
  materialIds: IFilterOption[];
  styleIds: IFilterOption[];
  priceRange: IPriceRange;
}

// export interface temp {
//   [id: number]: {
//     title: string;
//   };
// }
