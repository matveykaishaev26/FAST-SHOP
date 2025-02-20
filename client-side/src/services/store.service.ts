import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IStore, IStoreCreate, IStoreEdit } from "@/shared/types/store.interface";
class StoreService {
  async getAllStores() {
    const { data } = await axiosClassic<IStore[]>({
      url: API_URL.stores(),
      method: "GET",
    });

    return data || [];
  }

  async create(data: IStoreCreate) {
    const { data: createdStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(),
      method: "POST",
      data,
    });
    return createdStore;
  }

  async update(id: string, data: IStoreEdit) {
    const { data: updatedStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: "PUT",
      data,
    });
    return updatedStore;
  }

  async delete(id: string) {
    const { data: deletedStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: "PUT",
    });
    return deletedStore;
  }
}

export const storeService = new StoreService();
