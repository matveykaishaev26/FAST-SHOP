import { getAccessToken, removeFromStorage } from "@/services/auth/auth-token.service";
import { authService } from "@/services/auth/auth.service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
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
        await authService.getNewTokens();
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
