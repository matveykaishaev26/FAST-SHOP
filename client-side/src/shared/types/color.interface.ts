import { IFilterItem, IProductCount } from "./entity.interface";
export interface IColor extends IFilterItem {
  id: string;
  title: string;
  hex: string;
}
