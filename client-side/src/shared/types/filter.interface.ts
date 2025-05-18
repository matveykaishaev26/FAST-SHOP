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
  brandIds: IFilterOption[];
  colorIds: IFilterColor[];
  priceRange: null | [number, number];
  categoryIds: IFilterOption[];
  sizeIds: IFilterOption[];
  genderIds: IFilterOption[];
  materialIds: IFilterOption[];
  styleIds: IFilterOption[];
}
export interface IParsedFilters {
    brandIds: string[];
  colorIds: string[];
  priceRange: null | [number, number];
  categoryIds: string[];
  sizeIds: string[];
  genderIds: string[];
  materialIds: string[];
  styleIds: string[];
}


// export interface temp {
//   [id: number]: {
//     title: string;
//   };
// }
