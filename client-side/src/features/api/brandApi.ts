import { IBrand, IBrandPagination, IGetBrandsResponse } from "@/shared/types/brand.interface";
import { api } from "./api";
import { IFilterItem } from "@/shared/types/filter.interface";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";

type GetBrandsParams = {
  page?: number;
  limit?: number;
  all?: boolean;
};

export const brandApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query<IPaginatedResponse<IBrand>, GetBrandsParams>({
      query: ({ page = 1, limit = 20, all = false }) => {
        const params = new URLSearchParams();
        if (all) {
          params.append("all", "true");
        } else {
          params.append("page", String(page));
          params.append("limit", String(limit));
        }
        return {
          url: `/brands?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    createBrand: build.mutation<void, { title: string }[]>({
      query: (body) => ({
        url: `/brands`,
        method: "POST",
        body, // 👈 передаём title сюда
      }),
    }),
  }),
});

export const { useGetBrandsQuery, useCreateBrandMutation } = brandApi;
