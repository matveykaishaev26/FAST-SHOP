import { IBrandPagination, IGetBrandsResponse } from "@/shared/types/brand.interface";
import { api } from "./api";
import { IFilterItem } from "@/shared/types/filter.interface";
export const brandApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query<IGetBrandsResponse, IBrandPagination>({
      query: (data) => ({
        url: `/brands?page=${data.page}&limit=${data.limit}`,
        method: "GET",
      }),
    }),
    getAllBrands: build.query<IFilterItem[], void>({
      query: () => ({
        url: `/brands?all=true`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrandsQuery, useGetAllBrandsQuery } = brandApi;
