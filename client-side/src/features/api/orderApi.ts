import { EnumOrderStatus, IPaymenentResponse } from "@/shared/types/order.interface";
import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Создание заказа
    placeOrder: build.mutation<
      IPaymenentResponse,
      {
        status?: EnumOrderStatus;
        items: { productVariantId: string; quantity: number; price: number; sizeId: string }[];
      }
    >({
      query: (data) => ({
        url: "/orders/place",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
