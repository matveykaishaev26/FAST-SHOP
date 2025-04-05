import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { filtersSlice } from "./slices/filtersSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filters: filtersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware), // Добавляем middleware для работы с API
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
