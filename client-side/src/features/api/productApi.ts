import { IGender, IProduct, IProductInput } from "@/shared/types/product.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получить все продукты
    getAllProducts: build.query<IProduct[], { searchTerm?: string | null }>({
      query: ({ searchTerm }) => ({
        url: "/products",
        method: "GET",
        params: searchTerm ? { searchTerm } : {},
      }),
    }),

    // Получить продукты по Store ID
    getProductsByStoreId: build.query<IProduct[], string>({
      query: (id) => ({
        url: `/products/by-storeId/${id}`,
        method: "GET",
      }),
    }),

    // Получить продукт по ID
    getProductById: build.query<IProduct, string>({
      query: (id) => ({
        url: `/products/by-id/${id}`,
        method: "GET",
      }),
    }),

    // Получить продукты по категории
    getProductsByCategory: build.query<IProduct[], string>({
      query: (categoryId) => ({
        url: `/products/by-category/${categoryId}`,
        method: "GET",
      }),
    }),

    // Получить самые популярные продукты
    getMostPopularProducts: build.query<IProduct[], void>({
      query: () => ({
        url: "/products/most-popular",
        method: "GET",
      }),
    }),

    // Получить похожие продукты
    getMostSimilarProducts: build.query<IProduct[], string>({
      query: (id) => ({
        url: `/products/similar/${id}`,
        method: "GET",
      }),
    }),

    // Создать новый продукт
    createProduct: build.mutation<IProduct, { data: IProductInput; storeId: string }>({
      query: ({ data, storeId }) => ({
        url: `/products/${storeId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Обновить продукт
    updateProduct: build.mutation<IProduct, { id: string; data: IProductInput }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Удалить продукт
    deleteProduct: build.mutation<IProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),

    getGenderCount: build.query<IGender[], void>({
      query: () => ({
        url: API_URL.products("/gender-counts"),
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByStoreIdQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetMostPopularProductsQuery,
  useGetMostSimilarProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetGenderCountQuery,
} = productApi;
