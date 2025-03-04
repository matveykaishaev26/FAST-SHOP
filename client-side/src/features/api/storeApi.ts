import { IStore, IStoreCreate, IStoreEdit } from "@/shared/types/store.interface";
import { api } from "./api";
import { API_URL } from "@/config/api.config";
export const storeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получить все магазины
    getAllStores: build.query<IStore[], void>({
      query: () => ({
        url: API_URL.stores(),
        method: "GET",
      }),
    }),

    // Создать новый магазин
    createStore: build.mutation<IStore, IStoreCreate>({
      query: (data) => ({
        url: API_URL.stores(),
        method: "POST",
        body: data,
      }),
    }),

    // Обновить магазин
    updateStore: build.mutation<IStore, { id: string; data: IStoreEdit }>({
      query: ({ id, data }) => ({
        url: API_URL.stores(`/${id}`),
        method: "PUT",
        body: data,
      }),
    }),

    // Удалить магазин
    deleteStore: build.mutation<IStore, string>({
      query: (id) => ({
        url: API_URL.stores(`/${id}`),
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllStoresQuery, useCreateStoreMutation, useUpdateStoreMutation, useDeleteStoreMutation } =
  storeApi;
