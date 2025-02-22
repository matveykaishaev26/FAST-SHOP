import { IStore, IStoreCreate, IStoreEdit } from "@/shared/types/store.interface";
import { api } from "./api";

export const storeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получить все магазины
    getAllStores: build.query<IStore[], void>({
      query: () => ({
        url: "/stores",
        method: "GET",
      }),
    }),

    // Создать новый магазин
    createStore: build.mutation<IStore, IStoreCreate>({
      query: (data) => ({
        url: "/stores",
        method: "POST",
        body: data,
      }),
    }),

    // Обновить магазин
    updateStore: build.mutation<IStore, { id: string; data: IStoreEdit }>({
      query: ({ id, data }) => ({
        url: `/stores/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Удалить магазин
    deleteStore: build.mutation<IStore, string>({
      query: (id) => ({
        url: `/stores/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllStoresQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
