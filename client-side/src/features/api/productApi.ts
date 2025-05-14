import { IGender, IProduct, IProductInput } from "@/shared/types/product.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { ICardItem } from "@/shared/types/card.interface";
import { serializeFiltersForQuery } from "@/shared/utils/serializeFiltersForQuery";
import { IFilters } from "@/shared/types/filter.interface";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";

export enum CARDS_RESPONSE_MODE {
  PAGINATION = "pagination",
  INFINITE_SCROLL = "infinite-scroll",
}

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProductCards: build.query<
      IPaginatedResponse<ICardItem>,
      {
        page: number;
        limit: number;
        filters: Record<string, string[]>;
        mode: CARDS_RESPONSE_MODE;
        sortType?: string;
      }
    >({
      query: ({ page, limit, filters, sortType }) => {
        const filterQuery = serializeFiltersForQuery(filters);
        return {
          url: API_URL.products(`/product-cards?page=${page}&limit=${limit}&${filterQuery}&sortType=${sortType}`),
          method: "GET",
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.mode === CARDS_RESPONSE_MODE.INFINITE_SCROLL) {
          return endpointName;
        }
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
        if (!previousArg) return true;
        if (currentArg?.mode === CARDS_RESPONSE_MODE.INFINITE_SCROLL) {
          return (
            currentArg.page !== previousArg?.page ||
            JSON.stringify(currentArg.filters) !== JSON.stringify(previousArg.filters)
          );
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

export const { useGetGenderCountQuery, useGetProductCardsQuery } = productApi;
