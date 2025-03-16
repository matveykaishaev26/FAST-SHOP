import { IColor } from "@/shared/types/color.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
export const colorApi = api.injectEndpoints({
  endpoints: (build) => ({
    getColors: build.query<IColor[], void>({
      query: () => ({
        url: API_URL.colors(),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetColorsQuery } = colorApi;
