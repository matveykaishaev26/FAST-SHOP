import { api } from "./api";
import { API_URL } from "@/config/api.config";

export interface IUserFavorites {
  productVariantId: string;
}
export const userFavoritesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserFavorites: build.query<IUserFavorites[], void>({
      query: () => ({
        url: API_URL.userFavorites(),
      }),
    }),

    toggleUserFavorites: build.mutation<void, IUserFavorites>({
      query: ({ productVariantId }) => ({
        url: API_URL.userFavorites(`/toggle/${productVariantId}`),
        method: "POST",
      }),

      async onQueryStarted({ productVariantId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userFavoritesApi.util.updateQueryData("getUserFavorites", undefined, (draft) => {
            const index = draft.findIndex((item) => item.productVariantId === productVariantId);
            if (index >= 0) {
              draft.splice(index, 1);
            } else {
              draft.push({ productVariantId });
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
  }),
});

export const { useToggleUserFavoritesMutation } = userFavoritesApi;
