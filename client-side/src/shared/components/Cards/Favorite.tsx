import { Heart } from "lucide-react";
import { getAccessToken } from "@/services/auth/auth-token.service";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useAddToUserFavoritesMutation, useDeleteUserFavoritesMutation } from "@/features/api/userFavoritesApi";
import { ISize } from "@/shared/types/size.interface";
import toast from "react-hot-toast";
import { IActiveSize } from "../SizeSelector";
import ChooseSizeDialog from "./ChooseSizeDialog";
import SizeSelector from "../SizeSelector";
interface IFavoriteProps {
  className?: string;
  alwaysVisible?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
  isDialogOpen?: boolean;
  sizes?: ISize[];
  productVariantId: string;
  isFavorited: boolean | null;
  addedToFavorite: any;

  // setIsFavorited: (state: boolean) => void;
  activeSize: IActiveSize | null;
  setActiveSize: React.Dispatch<React.SetStateAction<IActiveSize | null>>;
  variant?: "catalog" | "favorite";
}

export default function Favorite({
  className,
  sizes,
  setIsDialogOpen = () => {},
  isDialogOpen = false,
  productVariantId,
  isFavorited,
  // setIsFavorited,
  activeSize,
  setActiveSize,
  alwaysVisible = true,
  addedToFavorite,
  variant = "catalog",
}: IFavoriteProps) {
  const token = getAccessToken();
  const router = useRouter();
  const [addMutate] = useAddToUserFavoritesMutation(); // Updated hook name
  const [deleteMutate] = useDeleteUserFavoritesMutation(); // Updated hook name
  const handleAddToFavorite = async (localActiveSize?: IActiveSize) => {
    if (activeSize) {
      try {
        await addMutate({ productVariantId, sizeId: activeSize.id });
        console.log({ productVariantId, sizeId: activeSize.id });
        // setIsFavorited(true);

        setIsDialogOpen(false);
        toast.success("Товар добавлен в избранное!", {
          position: "bottom-right",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      } catch (e) {
        console.error("Ошибка добавления в избранное", e);
        toast.success("Ошибка добавления в избранное!", {
          position: "bottom-right",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        // setIsFavorited(false);
      }
    } else if (localActiveSize) {
      if (addedToFavorite[localActiveSize.id]) {
        setIsDialogOpen(false);

        setActiveSize(localActiveSize);

        await addMutate({ productVariantId, sizeId: localActiveSize.id });
        setIsDialogOpen(false);
      } else {
        setActiveSize(localActiveSize);
        setIsDialogOpen(false);
        await addMutate({ productVariantId, sizeId: localActiveSize.id });

        // setIsAdded(true);
        toast.success("Товар добавлен в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
      }
    } else return;
  };

  const handleDeleteFavorite = async () => {
    if (!activeSize) return;
    try {
      await deleteMutate({ productVariantId, sizeId: activeSize.id });
      toast.success("Товар удален из избранного!", {
        position: "bottom-right",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      // setIsFavorited(false);
    } catch (e) {
      console.error("Ошибка удаления из избранного", e);
      toast.error("Ошибка!", {
        position: "bottom-right",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  if (variant == "favorite") {
    return (
      <div
        onClick={() => {
          handleDeleteFavorite();
        }}
        className={`exclude-hover z-20 transition-all border cursor-pointer  bg-background shadow-md p-2 rounded-full group/favorite-light lg:opacity-0 lg:group-hover/favorite:opacity-100 ${
          className ? className : ""
        } ${isFavorited || variant == "favorite" ? "lg:opacity-100" : ""}`}
      >
        {" "}
        <Heart
          className={`transition-colors ${
            isFavorited || variant == "favorite" ? "text-primary" : "text-muted-foreground"
          } group-hover/favorite-light:text-primary`}
          size={18}
        />
      </div>
    );
  }

  return (
    <ChooseSizeDialog
      open={isDialogOpen}
      sizes={sizes}
      onOpenChange={setIsDialogOpen}
      activeSize={activeSize}
      setActiveSize={setActiveSize}
      onConfirm={handleAddToFavorite}
      trigger={
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (isFavorited) {
              handleDeleteFavorite();
            } else if (!token) router.push(PUBLIC_URL.auth("login"));
            else if (activeSize) {
              handleAddToFavorite();
            } else setIsDialogOpen(true);
          }}
          className={`exclude-hover z-20 transition-all border cursor-pointer  bg-background shadow-md p-2 rounded-full group/favorite-light ${
            alwaysVisible ? "opacity-100" : "lg:opacity-0 lg:group-hover/favorite:opacity-100"
          } ${isFavorited ? "opacity-100" : "opacity-100"} ${className ?? "opacity-100"}`}
        >
          <Heart
            className={`transition-colors ${
              isFavorited ? "text-primary" : "text-muted-foreground"
            } group-hover/favorite-light:text-primary`}
            size={18}
          />
        </div>
      }
    />
  );
}
