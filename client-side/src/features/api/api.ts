import { getAccessToken, removeFromStorage, saveTokenStorage } from "@/services/auth/auth-token.service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/config/api.config";

interface TokenResponse {
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",

  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const originalRequest = args;
      try {
        const response = await baseQuery(
          { url: API_URL.auth("/login/access-token"), method: "POST" },
          api,
          extraOptions
        );

        if (response.data && typeof response.data === 'object' && 'accessToken' in response.data) {
          const tokenResponse = response.data as TokenResponse;
          saveTokenStorage(tokenResponse.accessToken);
        }

        return baseQuery(originalRequest, api, extraOptions);
      } catch (err) {
        removeFromStorage();
        throw err;
      }
    }

    return result;
  },

  endpoints: () => ({}),
});