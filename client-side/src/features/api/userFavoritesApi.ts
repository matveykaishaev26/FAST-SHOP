import { api } from "./api";
import { API_URL } from "@/config/api.config";
import { CARDS_RESPONSE_MODE } from "./productApi";
import { ISize } from "@/shared/types/size.interface";
import { IUserFavoriteItem } from "@/shared/types/card.interface";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";

export interface IUserFavorites {
  productVariantId: string;
  sizeId: string;
}

export interface IGetFavoritesCount {
  favoritesCount: number;
}


export interface IFavoritesResponse {
  items: IUserFavoriteItem[];
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
    }),
    addToUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.userFavorites()}/${productVariantId}/${sizeId}`,

        method: "POST",
      }),
      invalidatesTags: ["UserFavorites"],

      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userFavoritesApi.util.updateQueryData("getUserFavorites", undefined, (draft) => {
            const index = draft.findIndex((item) => item.productVariantId === productVariantId);
            if (index >= 0) {
              draft.splice(index, 1);
            } else {
              draft.push({ productVariantId, sizeId });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.userFavorites()}/${productVariantId}/${sizeId}`,

        method: "DELETE",
      }),
      invalidatesTags: ["UserFavorites"],

      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userFavoritesApi.util.updateQueryData("getUserFavorites", undefined, (draft) => {
            const index = draft.findIndex((item) => item.productVariantId === productVariantId);
            if (index >= 0) {
              draft.splice(index, 1);
            } else {
              draft.push({ productVariantId, sizeId });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId, sizeId }) => ({
        url: `${API_URL.userFavorites()}/toggle/${productVariantId}/${sizeId}`,

        method: "POST",
      }),

      async onQueryStarted({ productVariantId, sizeId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userFavoritesApi.util.updateQueryData("getUserFavorites", undefined, (draft) => {
            const index = draft.findIndex((item) => item.productVariantId === productVariantId);
            if (index >= 0) {
              draft.splice(index, 1);
            } else {
              draft.push({ productVariantId, sizeId });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    getFavoritesCount: build.query<{ favoritesCount: number }, void>({
      query: () => ({
        url: API_URL.userFavorites("/count"),
      }),
      providesTags: ["UserFavorites"],
    }),

    getFavoritesCards: build.query<
      IPaginatedResponse<IUserFavoriteItem>,
      {
        page: number;
        limit: number;
        mode: CARDS_RESPONSE_MODE;
      }
    >({
      query: ({ page, limit }) => {
        return {
          url: API_URL.userFavorites(`/cards?page=${page}&limit=${limit}`),
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
          return currentArg.page !== previousArg?.page;
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
    }),
  }),
});

export const {
  useToggleUserFavoritesMutation,
  useAddToUserFavoritesMutation,
  useDeleteUserFavoritesMutation,
  useGetFavoritesCountQuery,
  useGetFavoritesCardsQuery,
} = userFavoritesApi;
