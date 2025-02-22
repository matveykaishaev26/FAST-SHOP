import { IColor, IColorInput } from "@/shared/types/color.interface";
import { api } from "./api";

export const colorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получение всех цветов
    getAllColors: build.query<IColor[], null>({
      query: () => ({
        url: "/colors",
        method: "GET",
      }),
    }),

    // Получение цветов по storeId
    getColorsByStoreId: build.query<IColor[], string>({
      query: (id: string) => ({
        url: `/colors/by-storeId/${id}`,
        method: "GET",
      }),
    }),

    // Получение цвета по id
    getColorById: build.query<IColor, string>({
      query: (id: string) => ({
        url: `/colors/by-id/${id}`,
        method: "GET",
      }),
    }),

    // Создание нового цвета
    createColor: build.mutation<IColor, { data: IColorInput; storeId: string }>({
      query: ({ data, storeId }) => ({
        url: `/colors/${storeId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Обновление цвета
    updateColor: build.mutation<IColor, { id: string; data: IColorInput }>({
      query: ({ id, data }) => ({
        url: `/colors/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Удаление цвета
    deleteColor: build.mutation<IColor, string>({
      query: (id: string) => ({
        url: `/colors/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllColorsQuery,
  useGetColorsByStoreIdQuery,
  useGetColorByIdQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
