import { ICategory, ICategoryInput } from "@/shared/types/category.interface";
import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получение всех категорий
    getAllCategories: build.query<ICategory[], null>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),

    // Получение категорий по storeId
    getCategoryByStoreId: build.query<ICategory[], string>({
      query: (id: string) => ({
        url: `/categories/by-storeId/${id}`,
        method: "GET",
      }),
    }),

    // Получение категории по id
    getCategoryById: build.query<ICategory, string>({
      query: (id: string) => ({
        url: `/categories/by-id/${id}`,
        method: "GET",
      }),
    }),

    // Создание новой категории
    createCategory: build.mutation<ICategory, { data: ICategoryInput; storeId: string }>({
      query: ({ data, storeId }) => ({
        url: `/categories/${storeId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Обновление категории
    updateCategory: build.mutation<ICategory, { id: string; data: ICategoryInput }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Удаление категории
    deleteCategory: build.mutation<ICategory, string>({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByStoreIdQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
