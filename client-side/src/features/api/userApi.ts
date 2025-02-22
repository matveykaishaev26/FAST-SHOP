import { IUser } from "@/shared/types/user.interface";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получить профиль пользователя
    getProfile: build.query<IUser, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),

    // Переключить избранное для продукта
    toggleFavorite: build.mutation<IUser, string>({
      query: (productId) => ({
        url: `/users/profile/favorites/${productId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useToggleFavoriteMutation } = userApi;
