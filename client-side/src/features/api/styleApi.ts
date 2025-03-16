import { IStyle } from "@/shared/types/style.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStyles: build.query<IStyle[], void>({
      query: () => ({
        url: API_URL.styles(),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStylesQuery } = categoryApi;
