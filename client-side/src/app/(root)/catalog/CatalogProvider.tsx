import { makeStore } from "@/features/store";
import { setFilterId, setPriceRange, updateFilterTitles } from "@/features/slices/filtersSlice";
import { filtersOrder, IFilterItem, IFilterOption, IFilters } from "@/shared/types/filter.interface";

import CatalogClient from "./CatalogClient";

type Props = {
  searchParams: Record<string, string | string[]>;
};
async function fetchFilters() {
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

export default async function CatalogProvider({ searchParams }: Props) {
  // await store.dispatch(brandApi.endpoints.getAllBrands.initiate());
  // await Promise.all(store.dispatch(brandApi.util.getRunningQueriesThunk()));

  // await store.dispatch(sizeApi.endpoints.getSizes.initiate());
  // await Promise.all(store.dispatch(sizeApi.util.getRunningQueriesThunk()));

  // await store.dispatch(categoryApi.endpoints.getCategories.initiate());
  // await Promise.all(store.dispatch(categoryApi.util.getRunningQueriesThunk()));

  // await store.dispatch(productApi.endpoints.getGenderCount.initiate());
  // await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));

  // await store.dispatch(materialApi.endpoints.getMaterials.initiate());
  // await Promise.all(store.dispatch(materialApi.util.getRunningQueriesThunk()));

  // await store.dispatch(styleApi.endpoints.getStyles.initiate());
  // await Promise.all(store.dispatch(styleApi.util.getRunningQueriesThunk()));

  // await store.dispatch(colorApi.endpoints.getColors.initiate());
  // await Promise.all(store.dispatch(colorApi.util.getRunningQueriesThunk()));

  // await store.dispatch(productVariantApi.endpoints.getPriceRange.initiate());
  // await Promise.all(store.dispatch(productVariantApi.util.getRunningQueriesThunk()));
  const store = makeStore();

  filtersOrder.forEach((filterType) => {
    const param = searchParams[filterType];
    if (param) {
      const ids = typeof param === "string" ? param.split(",") : param;
      ids.forEach((id) => {
        store.dispatch(setFilterId({ filterType, filterId: id }));
      });
    }
  });

  const priceParam = searchParams["priceRange"];
  if (typeof priceParam === "string") {
    const [minStr, maxStr] = priceParam.split("-");
    const min = parseInt(minStr);
    const max = parseInt(maxStr);
    if (!isNaN(min) && !isNaN(max)) {
      store.dispatch(setPriceRange([min, max]));
    }
  }
  const filtersData = await fetchFilters();
  const filters = store.getState().filters;

  const filterKeyMap: Record<string, keyof Omit<IFilters, "priceRange">> = {
    brands: "brandIds",
    materials: "materialIds",
    categories: "categoryIds",
    sizes: "sizeIds",
    genders: "genderIds",
    styles: "styleIds",
    colors: "colorIds",
  };

  Object.entries(filterKeyMap).forEach(([key, values]) => {
    const typedKey = key as keyof typeof filtersData;
    const itemsToUpdate = filtersData[typedKey]
      .filter((item: IFilterItem) => filters[values]?.some((f: IFilterOption) => f.id === item.id))
      .map((item: IFilterItem) => ({
        id: item.id,
        title: item.title,
        ...(values === "colorIds" && { hex: (item as any).hex }),
      }));

    if (itemsToUpdate.length > 0) {
      store.dispatch(updateFilterTitles({ filterType: values, items: itemsToUpdate }));
    }
  });

  const initialState = store.getState();
  return <CatalogClient filtersData={filtersData} initialState={initialState} />;
}
