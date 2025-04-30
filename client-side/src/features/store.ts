// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { filtersSlice } from "./slices/filtersSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// Все редьюсеры
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  filters: filtersSlice.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
      filters: {
        ...state.filters,
        ...action.payload.filters,
      },
    };
  }

  return rootReducer(state, action);
};

// Фабрика стора
export const makeStore = (state?: any) =>
  configureStore({
    reducer,
    preloadedState: state,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

// Типы
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Обёртка
export const wrapper = createWrapper<AppStore>(makeStore);
