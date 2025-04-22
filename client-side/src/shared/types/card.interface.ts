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


export interface IBaseItem {
  id: string;
  title: string;
  price: number;
  brand: string;
  images: string[];
  colors: string[];
  rating: {
    value: number | string;
    count: number;
  };
}


export interface IUserFavoriteItem extends IBaseItem {
  size: ISize;
}

// Для карточки товара - использует массив sizes
export interface ICardItem extends IBaseItem {
  sizes: ISize[];
}