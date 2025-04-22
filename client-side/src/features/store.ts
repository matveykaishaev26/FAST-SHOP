import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { filtersSlice } from "./slices/filtersSlice";

export const store = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      filters: filtersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Типы для TypeScript
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];