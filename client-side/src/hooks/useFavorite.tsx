// hooks/useFavorite.ts
import { useAddToUserFavoritesMutation, useDeleteUserFavoritesMutation } from "@/features/api/userFavoritesApi";
import toast from "react-hot-toast";

export const useFavorite = ({
  productVariantId,
  activeSize,
  setIsFavorited,
  setIsDialogOpen,
}: {
  productVariantId: string;
  activeSize: { id: string } | null;
  setIsFavorited: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
}) => {
  const toastConfig = {
    position: "bottom-right",
    style: {
      background: "#333",
      color: "#fff",
    },
  } as const;
  const [addMutate] = useAddToUserFavoritesMutation();
  const [deleteMutate] = useDeleteUserFavoritesMutation();

  const handleAddToFavorite = async () => {
    if (!activeSize) return;

    try {
      await addMutate({ productVariantId, sizeId: activeSize.id });
      setIsFavorited(true);
      setIsDialogOpen(false);
      toast.success("Товар добавлен в избранное!", toastConfig);
    } catch (e) {
      console.error("Ошибка добавления в избранное", e);
      toast.error("Ошибка добавления в избранное!", toastConfig);
      setIsFavorited(false);
    }
  };

  const handleDeleteFavorite = async () => {
    if (!activeSize) return;

    try {
      await deleteMutate({ productVariantId, sizeId: activeSize.id });
      setIsFavorited(false);
      toast.success("Товар удален из избранного!", toastConfig);
    } catch (e) {
      console.error("Ошибка удаления из избранного", e);
      toast.error("Ошибка удаления из избранного!", toastConfig);
    }
  };

  return { handleAddToFavorite, handleDeleteFavorite };
};
