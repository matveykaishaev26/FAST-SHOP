import { removeFromStorage, saveTokenStorage } from "@/services/auth/auth-token.service";
import { api } from "./api";
import {
  IAuthLogin,
  IAuthRegister,
  IAuthSendPasswordReset,
  IAuthResetPassword,
  IVerifyToken,
} from "@/shared/types/auth.interface";

import { API_URL } from "@/config/api.config";
export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: IAuthLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) saveTokenStorage(data.accessToken);
        } catch (error) {
          console.log("Login failed:", error);
        }
      },
    }),

    register: build.mutation({
      query: (data: IAuthRegister) => ({
        url: API_URL.auth("/register"),
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) saveTokenStorage(data.accessToken);
        } catch (error) {
          console.log("Registration failed:", error);
        }
      },
    }),
    getNewTokens: build.mutation({
      query: () => ({
        url: API_URL.auth("/login/accessToken"),
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
        url: API_URL.auth("/logout"),
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
    sendPasswordReset: build.mutation({
      query: (data: IAuthSendPasswordReset) => ({
        url: API_URL.auth("/send-password-reset-email"),
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data: IAuthResetPassword) => ({
        url: API_URL.auth(`/reset-password?token=${data.token}`),
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: build.mutation({
      query: (data: IVerifyToken) => ({
        url: API_URL.auth(`/verify-email?token=${data.token}`),
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetNewTokensMutation,
  useLogoutMutation,
  useSendPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} = authApi;
