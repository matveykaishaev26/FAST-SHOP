import { IColor } from "@/shared/types/color.interface";
import {  IFilterItem, IPriceRange } from "@/shared/types/filter.interface";
import { IPriceRangeResponse } from "@/shared/types/productVariant.interface";

export interface IFiltersData {
  brands: IFilterItem[];
  materials: IFilterItem[];
  categories: IFilterItem[];
  sizes: IFilterItem[];
  genders: IFilterItem[];
  styles: IFilterItem[];
  colors: IColor[];
  priceRange: IPriceRangeResponse;
}
export async function fetchFilters() {
  try {
    const [brands, materials, colors, categories, sizes, genders, styles, priceRange] = await Promise.all([
      fetch("http://localhost:5000/brands?all=true", { cache: "force-cache" }),
      fetch("http://localhost:5000/materials", { cache: "force-cache" }),
      fetch("http://localhost:5000/colors", { cache: "force-cache" }),
      fetch("http://localhost:5000/categories", { cache: "force-cache" }),
      fetch("http://localhost:5000/sizes", { cache: "force-cache" }),
      fetch("http://localhost:5000/products/gender-counts", { cache: "force-cache" }),
      fetch("http://localhost:5000/styles", { cache: "force-cache" }),
      fetch("http://localhost:5000/product-variants/price-range", { cache: "force-cache" }),
    ]);

    const [brandsData, materialsData, colorsData, categoriesData, sizesData, gendersData, stylesData, priceRangeData] =
      await Promise.all([
        brands.json(),
        materials.json(),
        colors.json(),
        categories.json(),
        sizes.json(),
        genders.json(),
        styles.json(),
        priceRange.json(),
      ]);

    return {
      brands: brandsData,
      materials: materialsData,
      categories: categoriesData,
      sizes: sizesData,
      genders: gendersData,
      styles: stylesData,
      colors: colorsData,
      priceRange: priceRangeData,
    };
  } catch (error) {
    console.error("Ошибка при загрузке фильтров:", error);
    return {
      brands: [],
      materials: [],
      categories: [],
      sizes: [],
      genders: [],
      styles: [],
      colors: [],
      priceRange: [0, 0], // или null — в зависимости от твоей логики
    };
  }
}
