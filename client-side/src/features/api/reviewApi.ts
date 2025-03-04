import { IReview, IReviewInput } from "@/shared/types/review.interface";
import { api } from "./api";

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получить отзывы по Store ID
    getReviewsByStoreId: build.query<IReview[], string>({
      query: (id) => ({
        url: `/reviews/by-storeId/${id}`,
        method: "GET",
      }),
    }),

    // Создать новый отзыв
    createReview: build.mutation<IReview, { data: IReviewInput; productId: string; storeId: string }>({
      query: ({ data, productId, storeId }) => ({
        url: `/reviews/${productId}/${storeId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Удалить отзыв
    deleteReview: build.mutation<IReview, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReviewsByStoreIdQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
