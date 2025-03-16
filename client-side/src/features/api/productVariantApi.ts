import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { IPriceRangeResponse } from "@/shared/types/productVariant.interface";
export const productVariantApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPriceRange: build.query<IPriceRangeResponse, void>({
      query: () => ({
        url: API_URL.productVariants("/price-range"),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPriceRangeQuery } = productVariantApi;
