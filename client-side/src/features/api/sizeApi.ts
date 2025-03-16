import { ISize } from "@/shared/types/size.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
export const sizeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSizes: build.query<ISize[], void>({
      query: () => ({
        url: API_URL.sizes(""),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSizesQuery } = sizeApi;
