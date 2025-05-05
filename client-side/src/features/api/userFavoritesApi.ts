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

export interface IGetFavoritesCount {
  favoritesCount: number;
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

    addToUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.userFavorites()}/${productVariantId}/${sizeId}`,
        method: "POST",
      }),
      invalidatesTags: [
        "UserFavorites",
        { type: "UserFavorites", id: "COUNT" },
        // { type: "UserFavorites", id: "PARTIAL-LIST" },
      ],
      // async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
      //   // Обновим локальный кэш избранного до ответа сервера
      //   const patchResult = dispatch(
      //     userFavoritesApi.util.updateQueryData('getUserFavorites', undefined, (draft) => {
      //       draft.push({
      //         productVariantId,
      //         size: { id: sizeId, title: '' }, // можно добавить title, если он у тебя есть
      //       });
      //     })
      //   );
    
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     // Откат, если ошибка
      //     patchResult.undo();
      //   }
      // },
      // async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     userFavoritesApi.util.updateQueryData("getUserFavorites", undefined, (draft) => {
      //       const index = draft.findIndex((item) => item.productVariantId === productVariantId);
      //       if (index >= 0) {
      //         draft.splice(index, 1);
      //       } else {
      //         draft.push({ productVariantId, sizeId });
      //       }
      //     })
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
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

        try {
          await queryFulfilled;
          console.log("✅ Server confirmed");
        } catch {
          patchResult.undo();
          console.error("❌ Server rejected / offline");
        }
      },

      invalidatesTags: [{ type: "UserFavorites", id: "COUNT" }],
      // invalidatesTags: [
      //   { type: "UserFavorites", id: "COUNT" },
      //   { type: "UserFavorites", id: "PARTIAL-LIST" },
      // ],
    }),

    getFavoritesCount: build.query<IGetFavoritesCount, void>({
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
  useAddToUserFavoritesMutation,
  useDeleteUserFavoritesMutation,
  useGetFavoritesCountQuery,
  useGetFavoritesCardsQuery,
  useGetUserFavoritesQuery,
} = userFavoritesApi;
