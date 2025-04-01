import { IGender, IProduct, IProductInput } from "@/shared/types/product.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { ICardItem } from "@/shared/types/card.interface";

interface ICardsResponse {
  items: ICardItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export enum CARDS_RESPONSE_MODE {
  PAGINATION = "pagination",
  INFINITE_SCROLL = "infinite-scroll",
}

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProductCards: build.query<
      ICardsResponse,
      {
        page: number;
        limit: number;
        mode: CARDS_RESPONSE_MODE;
      }
    >({
      query: ({ page, limit }) => ({
        url: API_URL.products(`/product-cards?page=${page}&limit=${limit}`),
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.mode === CARDS_RESPONSE_MODE.INFINITE_SCROLL) {
          return endpointName;
        }
        // Для пагинации добавляем номер страницы в ключ
        return `${endpointName}-${queryArgs.page}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.mode === CARDS_RESPONSE_MODE.PAGINATION || arg.page === 1) {
          return newItems;
        }

        if (currentCache?.items && newItems?.items) {
          const existingIds = new Set(currentCache.items.map((item) => item.id));
          const newUniqueItems = newItems.items.filter((item) => !existingIds.has(item.id));

          return {
            ...newItems,
            items: [...currentCache.items, ...newUniqueItems],
          };
        }

        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (currentArg?.mode === CARDS_RESPONSE_MODE.INFINITE_SCROLL) {
          return currentArg.page !== previousArg?.page;
        }
        return true;
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Product", id: "PARTIAL-LIST" }],
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
  // useGetAllProductsQuery,
  // useGetProductsByStoreIdQuery,
  // useGetProductByIdQuery,
  // useGetProductsByCategoryQuery,
  // useGetMostPopularProductsQuery,
  // useGetMostSimilarProductsQuery,
  // useCreateProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
  useGetGenderCountQuery,
  useGetProductCardsQuery,
} = productApi;
