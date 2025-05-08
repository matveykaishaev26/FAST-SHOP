import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { CARDS_RESPONSE_MODE } from "./productApi";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";
import { IFavoriteCardItem } from "@/shared/types/card.interface";

interface IAddToBasketPayload {
  productVariantId: string;
  sizeId: string;
}

export interface IFavoritesResponse {
  items: IFavoriteCardItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const basketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBasket: build.query<IAddToBasketPayload[], void>({
      query: () => ({
        url: API_URL.basket(),
      }),
      providesTags: ["Basket"],
    }),

    addToBasket: build.mutation<void, IAddToBasketPayload>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.basket()}/${productVariantId}/${sizeId}`,
        method: "POST",
      }),
      invalidatesTags: [
        "Basket",
        { type: "Basket", id: "COUNT" },
        // { type: "UserFavorites", id: "PARTIAL-LIST" },
      ],
    }),

    deleteFromBasket: build.mutation<void, IAddToBasketPayload>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.basket()}/${productVariantId}/${sizeId}`,
        method: "DELETE",
      }),

      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        console.log("✨ Optimistic update triggered");
        const patchResult = dispatch(
          basketApi.util.updateQueryData(
            "getBasketCards",
            { page: 1, limit: 20, mode: CARDS_RESPONSE_MODE.PAGINATION },
            (draft) => {
              if (!draft?.items) return;

              draft.items = draft.items.filter(
                (item) => !(item.productVariantId === productVariantId && item.size.id === sizeId)
              );

              draft.totalCount -= 1;
            }
          )
        );

        try {
          await queryFulfilled;
          console.log("✅ Server confirmed");
        } catch {
          patchResult.undo();
          console.error("❌ Server rejected / offline");
        }
      },

      invalidatesTags: [{ type: "Basket", id: "COUNT" }],
      // invalidatesTags: [
      //   { type: "UserFavorites", id: "COUNT" },
      //   { type: "UserFavorites", id: "PARTIAL-LIST" },
      // ],
    }),

    getBasketCount: build.query<{ count: number }, void>({
      query: () => ({
        url: API_URL.basket("/count"),
      }),
      providesTags: [{ type: "Basket", id: "COUNT" }],
    }),
    getAddedSizes: build.query<Record<string, number>, { productVariantId: string }>({
      query: ({ productVariantId }) => ({
        url: API_URL.basket(`/${productVariantId}`),
      }),
      providesTags: [{ type: "Basket", id: "COUNT" }],
    }),
    changeBasketQuantity: build.mutation<void, { productVariantId: string; sizeId: string; variant: "plus" | "minus" }>(
      {
        query: ({ productVariantId, sizeId, variant }) => ({
          url: `${API_URL.basket("/quantity")}`,
          method: "PATCH",
          body: { productVariantId, sizeId, variant },
        }),
        invalidatesTags: ["Basket"],
        // async onQueryStarted({ productVariantId, sizeId, variant }, { dispatch, queryFulfilled }) {
        //   console.log("✨ Optimistic update triggered");
        //   const patchResult = dispatch(
        //     basketApi.util.updateQueryData("getAddedSizes", { productVariantId }, (draft) => {
        //       if (!draft) return;

        //       if (variant === "plus") {
        //         draft[sizeId] = sizeId;
        //       } else if (variant === "minus") {
        //         // Предположим, что после "minus" quantity может стать 0 — тогда удаляем size
        //         delete draft[sizeId];
        //       }
        //     })
        //   );
        //   try {
        //     await queryFulfilled;
        //     console.log("✅ Server confirmed");
        //   } catch {
        //     patchResult.undo();
        //     console.error("❌ Server rejected / offline");
        //   }
        // },
      }
    ),

    getBasketCards: build.query<
      IPaginatedResponse<IFavoriteCardItem>,
      {
        page: number;
        limit: number;
        mode: CARDS_RESPONSE_MODE;
      }
    >({
      query: ({ page, limit, mode }) => ({
        url: API_URL.basket(`/cards?page=${page}&limit=${limit}&mode=${mode}`),
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.mode}-${queryArgs.page}`;
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
        if (currentArg.mode === CARDS_RESPONSE_MODE.INFINITE_SCROLL) {
          return currentArg.page !== previousArg.page;
        }
        return true;
      },
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: "UserFavorites" as const, id })),
              { type: "UserFavorites", id: "PARTIAL-LIST" },
            ]
          : [{ type: "UserFavorites", id: "PARTIAL-LIST" }],
      // providesTags:[{ type: "UserFavorites", id: "PARTIAL-LIST" }],
    }),
  }),
});

export const {
  useAddToBasketMutation,
  useDeleteFromBasketMutation,
  useGetBasketQuery,
  useGetBasketCountQuery,
  useChangeBasketQuantityMutation,
  useGetBasketCardsQuery,
  useGetAddedSizesQuery,
} = basketApi;
