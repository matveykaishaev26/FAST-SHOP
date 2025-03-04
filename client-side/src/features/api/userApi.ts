import { IUser } from "@/shared/types/user.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получить профиль пользователя
    getProfile: build.query<IUser, void>({
      query: () => ({
        url: API_URL.users("/profile"),
        method: "GET",
      }),
    }),

    // Переключить избранное для продукта
    toggleFavorite: build.mutation<IUser, string>({
      query: (productId) => ({
        url: API_URL.users(`/profile/favorites/${productId}`),
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useToggleFavoriteMutation } = userApi;
