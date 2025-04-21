import { IFilterItem } from "./filter.interface";

export interface ICategory extends IFilterItem {}

export interface ICategoryInput extends Pick<ICategory, "title"> {}
