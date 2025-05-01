import { IsNotEmpty, IsOptional, IsEnum, IsDecimal } from 'class-validator';

export enum SORT_TYPE {
  BY_RATING = 'rating_desc',
  BY_PRICE_ASC = 'price_asc',
  BY_PRICE_DESC = 'price_desc',
}
export class GetProductCardsDto {
  page: number;
  limit: number;
  @IsEnum(SORT_TYPE)
  sortType: SORT_TYPE;
  filters: {
    brandIds: string[];
    materialIds: string[];
    genderIds: string[];
    styleIds: string[];
    categoryIds: string[];
    sizeIds: string[];
    colorIds: string[];
    priceRange: string[];
  };
}
