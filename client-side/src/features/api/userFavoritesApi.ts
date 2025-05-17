import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { CARDS_RESPONSE_MODE } from "./productApi";
import { ISize } from "@/shared/types/size.interface";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";
import { IFavoriteCardItem } from "@/shared/types/card.interface";

export interface IUserFavorites {
  productVariantId: string;
  sizeId: string;
}

export interface IFavoritesResponse {
  items: IFavoriteCardItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const userFavoritesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserFavorites: build.query<IUserFavorites[], void>({
      query: () => ({
        url: API_URL.userFavorites(),
      }),
      providesTags: ["UserFavorites"],
    }),
    getFavoriteSizesByProduct: build.query<Record<string, boolean>, { productVariantId: string }>({
      query: ({ productVariantId }) => ({
        url: API_URL.userFavorites(`/sizeAdded/${productVariantId}`),
        method: "GET",
      }),
      providesTags: [{ type: "UserFavorites", id: "SIZES" }],
    }),

    addToUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.userFavorites()}/${productVariantId}/${sizeId}`,
        method: "POST",
      }),
      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userFavoritesApi.util.updateQueryData("getFavoriteSizesByProduct", { productVariantId }, (draft) => {
            if (!draft) return;
            draft[sizeId] = true;
          })
        );

        try {
          console.log("Optimistic update initiated");
          await queryFulfilled; // Ожидаем выполнения запроса
        } catch (e) {
          // Если ошибка, откатываем изменения
          patchResult.undo();
          console.error("Error during update: ", e);
        }
      },
      invalidatesTags: [
        // "UserFavorites",
        { type: "UserFavorites", id: "COUNT" },
        // { type: "UserFavorites", id: "PARTIAL-LIST" },
        { type: "UserFavorites", id: "SIZES" },
      ],
    }),

    deleteUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.userFavorites()}/${productVariantId}/${sizeId}`,
        method: "DELETE",
      }),

      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        console.log("✨ Optimistic update triggered");
        const patchResult = dispatch(
          userFavoritesApi.util.updateQueryData(
            "getFavoritesCards",
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
        const patchAddedSizes = dispatch(
          userFavoritesApi.util.updateQueryData("getFavoriteSizesByProduct", { productVariantId }, (draft) => {
            if (!draft) return;
            delete draft[sizeId];
            // draft[sizeId] = true;
          })
        );

        try {
          await queryFulfilled;
          console.log("✅ Server confirmed");
        } catch {
          patchResult.undo();
          patchAddedSizes.undo();
          console.error("❌ Server rejected / offline");
        }
      },

      invalidatesTags: [
        { type: "UserFavorites", id: "COUNT" },
        { type: "UserFavorites", id: "SIZES" },
      ],
      // invalidatesTags: [
      //   { type: "UserFavorites", id: "COUNT" },
      //   { type: "UserFavorites", id: "PARTIAL-LIST" },
      // ],
    }),

    getFavoritesCount: build.query<{ count: number }, void>({
      query: () => ({
        url: API_URL.userFavorites("/count"),
      }),
      providesTags: [{ type: "UserFavorites", id: "COUNT" }],
    }),

    getFavoritesCards: build.query<
      IPaginatedResponse<IFavoriteCardItem>,
      {
        page: number;
        limit: number;
        mode: CARDS_RESPONSE_MODE;
      }
    >({
      query: ({ page, limit, mode }) => ({
        url: API_URL.userFavorites(`/cards?page=${page}&limit=${limit}&mode=${mode}`),
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
      // forceRefetch({ currentArg, previousArg }) {
      //   if (!previousArg) return true;
      //   if (currentArg.mode === CARDS_RESPONSE_MODE.INFINITE_SCROLL) {
      //     return currentArg.page !== previousArg.page;
      //   }
      //   return true;
      // },
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
  useAddToUserFavoritesMutation,
  useDeleteUserFavoritesMutation,
  useGetFavoritesCountQuery,
  useGetFavoritesCardsQuery,
  useGetUserFavoritesQuery,
  useGetFavoriteSizesByProductQuery,
} = userFavoritesApi;
