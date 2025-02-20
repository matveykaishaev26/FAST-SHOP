import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IUser } from "@/shared/types/user.interface";

class UserService {
  async getProfile() {
    const reponse = await axiosWithAuth<IUser>({
      url: API_URL.users("/profile"),
      method: "GET",
    });

    return reponse;
  }
  async toggleFavorite(productId: string) {
    return axiosWithAuth<IUser>({
      url: API_URL.users(`/profile/favorites/${productId}`),
      method: "PATCH",
    });
  }
}

export const userService = new UserService();
