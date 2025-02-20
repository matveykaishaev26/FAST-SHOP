import { axiosWithAuth } from "@/api/api.interceptors";

import { API_URL } from "@/config/api.config";

import { EnumOrderStatus, IPaymenentResponse } from "@/shared/types/order.interface";

type TypeData = {
  status?: EnumOrderStatus;
  items: {
    productId: string;
    quantity: number;
    price: number;
    storeId: string;
  }[];
};

class OrderService {
  async place(data: TypeData) {
    return axiosWithAuth<IPaymenentResponse>({
      url: API_URL.orders("/place"),
      method: "POST",
      data: data,
    });
  }
}

export const orderService = new OrderService();
