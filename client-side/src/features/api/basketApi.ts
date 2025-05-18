import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { CARDS_RESPONSE_MODE } from "./productApi";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";
import { IBasketCardItem } from "@/shared/types/card.interface";

interface IAddToBasketPayload {
  productVariantId: string;
  sizeId: string;
}



export const basketApi = api.injectEndpoints({
  endpoints: (build) => ({
    // getBasket: build.query<IBasketCardItem[], void>({
    //   query: () => ({
    //     url: API_URL.basket(),
    //   }),
    //   providesTags: ["Basket"],
    // }),

    addToBasket: build.mutation<void, IAddToBasketPayload>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.basket()}/${productVariantId}/${sizeId}`,
        method: "POST",
      }),
      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("getAddedSizes", { productVariantId }, (draft) => {
            if (!draft) return;
            draft[sizeId] = 1;
          })
        );
        const patchCountResult = dispatch(
          basketApi.util.updateQueryData("getBasketCount", undefined, (draft) => {
            if (!draft?.count) return;

            draft.count += 1;
          })
        );

        try {
          console.log("Optimistic update initiated");
          await queryFulfilled; // Ожидаем выполнения запроса
        } catch (e) {
          // Если ошибка, откатываем изменения
          patchResult.undo();
          patchCountResult.undo();
          console.error("Error during update: ", e);
        }
      },
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
          basketApi.util.updateQueryData("getBasketCards", { page: 1, limit: 20 }, (draft) => {
            if (!draft?.items) return;

            draft.items = draft.items.filter(
              (item) => !(item.productVariantId === productVariantId && sizeId === item.size.id)
            );

            draft.totalCount -= 1;
          })
        );
        const patchCountResult = dispatch(
          basketApi.util.updateQueryData("getBasketCount", undefined, (draft) => {
            if (!draft?.count) return;

            draft.count -= 1;
          })
        );

        try {
          await queryFulfilled;
          console.log("✅ Server confirmed");
        } catch {
          patchResult.undo();
          patchCountResult.undo();

          console.error("❌ Server rejected / offline");
        }
      },

      // invalidatesTags: [{ type: "Basket", id: "COUNT" }],

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

      providesTags: (result, error, { productVariantId }) => [{ type: "Basket", id: productVariantId }],
    }),
    changeBasketQuantity: build.mutation<void, { productVariantId: string; sizeId: string; variant: "plus" | "minus" }>(
      {
        query: ({ productVariantId, sizeId, variant }) => ({
          url: `${API_URL.basket("/quantity")}`,
          method: "PATCH",
          body: { productVariantId, sizeId, variant },
        }),
        async onQueryStarted({ productVariantId, sizeId, variant }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            basketApi.util.updateQueryData("getAddedSizes", { productVariantId }, (draft) => {
              if (!draft) return;

              const currentQty = draft[sizeId] || 0;
              const newQty = variant === "plus" ? currentQty + 1 : currentQty - 1;

              if (newQty <= 0) {
                delete draft[sizeId];
              } else {
                draft[sizeId] = newQty;
              }
            })
          );
          const patchGetBasketResult = dispatch(
            basketApi.util.updateQueryData("getBasketCards", { page: 1, limit: 2 }, (draft) => {
              if (!draft) return;

              const item = draft.items.find((item) => item.productVariantId === productVariantId && item.size.id === sizeId);
              if (!item) return;

              if (variant === "plus") {
                item.quantity += 1;
              } else {
                item.quantity = Math.max(1, item.quantity - 1); // или удалить, если нужно
              }
            })
          );
          try {
            console.log("Optimistic update initiated");
            await queryFulfilled; // Ожидаем выполнения запроса
          } catch (e) {
            // Если ошибка, откатываем изменения
            patchResult.undo();
            patchGetBasketResult.undo();
            console.error("Error during update: ", e);
          }
        },
        // invalidatesTags: ["Basket"],
        invalidatesTags: (result, error, { productVariantId }) => [
          { type: "Basket", id: productVariantId },
          { type: "Basket", id: "COUNT" },
        ],
      }
    ),

    getBasketCards: build.query<
      IPaginatedResponse<IBasketCardItem>,
      {
        page: number;
        limit: number;
      }
    >({
      query: ({ page, limit }) => ({
        url: API_URL.basket(`/cards?page=${page}&limit=${limit}`),
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.page}`;
      },
      // merge: (currentCache, newItems, { arg }) => {
      //   if (currentCache?.items && newItems?.items) {
      //     const existingIds = new Set(currentCache.items.map((item) => item.id));
      //     const newUniqueItems = newItems.items.filter((item) => !existingIds.has(item.id));
      //     return {
      //       ...newItems,
      //       items: [...currentCache.items, ...newUniqueItems],
      //     };
      //   }

      //   return newItems;
      // },

      providesTags: (result) =>
        result?.items
          ? [...result.items.map(({ id }) => ({ type: "Basket" as const, id })), { type: "Basket", id: "PARTIAL-LIST" }]
          : [{ type: "Basket", id: "PARTIAL-LIST" }],
      // providesTags:[{ type: "UserFavorites", id: "PARTIAL-LIST" }],
    }),
  }),
});

export const {
  useAddToBasketMutation,
  useDeleteFromBasketMutation,
  useGetBasketCountQuery,
  useChangeBasketQuantityMutation,
  useGetBasketCardsQuery,
  useGetAddedSizesQuery,
} = basketApi;
