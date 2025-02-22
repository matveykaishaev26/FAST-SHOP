import { removeFromStorage, saveTokenStorage } from "@/services/auth/auth-token.service";
import { api } from "./api";
import { IAuthForm } from "@/shared/types/auth.interface";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: IAuthForm) => ({
        url: "/login",
        method: "POST",
        data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) saveTokenStorage(data.accessToken);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: build.mutation({
      query: (data: IAuthForm) => ({
        url: "/register",
        method: "POST",
        data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) saveTokenStorage(data.accessToken);
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),
    getNewTokens: build.mutation({
      query: () => ({
        url: "/login/access-token",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) saveTokenStorage(data.accessToken);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) removeFromStorage();
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetNewTokensMutation, useLogoutMutation } = authApi;
