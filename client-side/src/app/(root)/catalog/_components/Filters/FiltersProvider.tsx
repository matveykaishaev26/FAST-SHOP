import { makeStore } from "@/features/store";
import { setFilterId, setPriceRange } from "@/features/slices/filtersSlice";
import { filtersOrder } from "@/shared/types/filter.interface";
import FiltersClient from "./FiltersClient";
import { brandApi } from "@/features/api/brandApi";
import { sizeApi } from "@/features/api/sizeApi";
import { categoryApi } from "@/features/api/categoryApi";
import { productApi } from "@/features/api/productApi";
import { materialApi } from "@/features/api/materialApi";
import { styleApi } from "@/features/api/styleApi";
import { colorApi } from "@/features/api/colorApi";
import { productVariantApi } from "@/features/api/productVariantApi";

type Props = {
  searchParams: Record<string, string | string[]>;
};

export default async function FiltersProvider({ searchParams }: Props) {
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

  await store.dispatch(brandApi.endpoints.getAllBrands.initiate());
  await Promise.all(store.dispatch(brandApi.util.getRunningQueriesThunk()));

  await store.dispatch(sizeApi.endpoints.getSizes.initiate());
  await Promise.all(store.dispatch(sizeApi.util.getRunningQueriesThunk()));

  await store.dispatch(categoryApi.endpoints.getCategories.initiate());
  await Promise.all(store.dispatch(categoryApi.util.getRunningQueriesThunk()));

  await store.dispatch(productApi.endpoints.getGenderCount.initiate());
  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));

  await store.dispatch(materialApi.endpoints.getMaterials.initiate());
  await Promise.all(store.dispatch(materialApi.util.getRunningQueriesThunk()));

  await store.dispatch(styleApi.endpoints.getStyles.initiate());
  await Promise.all(store.dispatch(styleApi.util.getRunningQueriesThunk()));

  await store.dispatch(colorApi.endpoints.getColors.initiate());
  await Promise.all(store.dispatch(colorApi.util.getRunningQueriesThunk()));


  await store.dispatch(productVariantApi.endpoints.getPriceRange.initiate());
  await Promise.all(store.dispatch(productVariantApi.util.getRunningQueriesThunk()));

  const initialState = store.getState();
  console.log("SSR-запрос брендов выполнен");
  console.log(store);

  return <FiltersClient initialState={initialState} />;
}
