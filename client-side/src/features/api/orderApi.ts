import { EnumOrderStatus, IOrder, IPaymenentResponse } from "@/shared/types/order.interface";
import { api } from "./api";
import { IBasketCardItem } from "@/shared/types/card.interface";

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
    getOrders: build.query<IOrder[], void>({
      query: (data) => ({
        url: "/orders",
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation, useGetOrdersQuery } = orderApi;
