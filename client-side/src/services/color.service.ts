import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IColor, IColorInput } from "@/shared/types/color.interface";
class ColorService {
  async getAllColors() {
    const { data } = await axiosClassic<IColor[]>({
      url: API_URL.colors(),
      method: "GET",
    });

    return data || [];
  }

  async getByStoreId(id: string) {
    const { data } = await axiosWithAuth<IColor[]>({
      url: API_URL.colors(`/by-storeId/${id}`),
      method: "GET",
    });
    return data || [];
  }

  async getById(id: string) {
    const { data } = await axiosClassic<IColor>({
      url: API_URL.colors(`/by-id/${id}`),
      method: "GET",
    });
    return data || null;
  }
  async create(data: IColorInput, storeId: string) {
    const { data: createdColor } = await axiosWithAuth({
      url: API_URL.colors(`/${storeId}`),
      method: "POST",
      data,
    });

    return createdColor;
  }

  async update(id: string, data: IColorInput) {
    const { data: updatedColor } = await axiosWithAuth({
      url: API_URL.colors(`/${id}`),
      method: "PUT",
      data,
    });

    return updatedColor;
  }

  async delete(id: string) {
    const { data: updatedColor } = await axiosWithAuth({
      url: API_URL.colors(`/${id}`),
      method: "DELETE",
    });

    return updatedColor;
  }
}

export const colorService = new ColorService();
