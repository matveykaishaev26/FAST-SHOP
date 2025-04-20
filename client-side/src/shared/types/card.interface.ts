export interface ICardItem {
  id: string;
  title: string;
  sizes: { title: string; quantity: number }[];
  price: number;
  brand: string;
  images: string[];
  colors: string[];
  rating: {
    value: number | string;
    count: number;
  };
}
