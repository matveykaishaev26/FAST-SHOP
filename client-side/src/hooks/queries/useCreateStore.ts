import { useRouter } from "next/navigation";
import { useCreateStoreMutation } from "@/features/api/storeApi";
import { IStoreCreate, IStore } from "@/shared/types/store.interface";
import toast from "react-hot-toast";
import { STORE_URL } from "@/config/url.config";
export function useCreateStore() {
  const router = useRouter();

  const [mutate, { data, isLoading, error }] = useCreateStoreMutation();
  const createStore = async (newStore: IStoreCreate) => {
    await mutate({
      ...newStore,
    })
      .then((store) => {
        toast.success(`Магазин "${store?.data?.title}" успешно создан!`);
        router.push(STORE_URL.home(store?.data?.id));
      })
      .catch(() => toast.error("Ошибка создания"));
  };
  return {
    createStore,
    isLoading,
    error,
  };
}
