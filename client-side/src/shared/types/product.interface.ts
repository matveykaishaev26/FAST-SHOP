import { ICategory } from "./category.interface";
import { IFilterItem } from "./entity.interface";
import { IReview } from "./review.interface";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory;
  reviews: IReview[];
}

export interface IProductInput extends Omit<IProduct, "id" | "reviews" | "store" | "category" | "color"> {
  categoryId: string;
  colorId: string;
}

export interface IGender extends IFilterItem {}
