import { api } from "./api";
import { IMaterial } from "@/shared/types/material.interface";
import { API_URL } from "@/config/api.config";
export const materialApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMaterials: build.query<IMaterial[], void>({
      query: () => ({
        url: API_URL.materials(""),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMaterialsQuery } = materialApi;
