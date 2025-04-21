import { ISize } from "./size.interface";
export interface ICardItem {
  id: string;
  title: string;
  sizes: ISize[];
  price: number;
  brand: string;
  images: string[];
  colors: string[];
  rating: {
    value: number | string;
    count: number;
  };
}
