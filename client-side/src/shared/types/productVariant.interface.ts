export interface IPriceRangeResponse {
  minPrice: number | null;
  maxPrice: number | null;
}

export interface IProductVariant {
  id: string;
  title: string;
  description: string;
  category?: string;
  season?: string;
  brand?: string;
  technology?: string;
  gender?: string;
  style?: string;
  price?: number;
  images?: string[];
  materials?: string[];
  colors?: string[];
}
