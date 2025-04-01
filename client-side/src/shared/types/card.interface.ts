export interface ICardItem {
  id: number;
  title: string;
  sizes: string[];
  price: number;
  brand: string;
  images: string[];
  colors: string[];
  rating: {
    value: number | string;
    count: number;
  }
}
