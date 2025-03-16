import { ICategory, ICategoryInput } from "@/shared/types/category.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ICategory[], void>({
      query: () => ({
        url: API_URL.categories(),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
