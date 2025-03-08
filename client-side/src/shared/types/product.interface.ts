import { ICategory } from "./category.interface";
import { IReview } from "./review.interface";
import { IStore } from "./store.interface";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory;
  reviews: IReview[];
  store: IStore;
}

export interface IProductInput
  extends Omit<IProduct, "id" | "reviews" | "store" | "category" | "color"> {
  categoryId: string;
  colorId: string;
}
