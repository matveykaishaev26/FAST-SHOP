import { IFilterItem } from "./filter.interface";

export interface IBrand extends IFilterItem {
  id: string;
  title: string;
}

export interface IBrandPagination {
  page: number;
  limit: number;
}

export interface IGetBrandsResponse {
  brands: IBrand[];
  total: number;
}
export interface IBrandInput extends Pick<IBrand, "title"> {}
