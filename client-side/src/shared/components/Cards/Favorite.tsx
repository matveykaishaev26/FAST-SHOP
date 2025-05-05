import { Heart } from "lucide-react";
import { getAccessToken } from "@/services/auth/auth-token.service";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useAddToUserFavoritesMutation, useDeleteUserFavoritesMutation } from "@/features/api/userFavoritesApi";
import { ISize } from "@/shared/types/size.interface";
import toast from "react-hot-toast";
import { IActiveSize } from "./Card";

interface IFavoriteProps {
  className?: string;
  setIsDialogOpen?: (open: boolean) => void;
  isDialogOpen?: boolean;
  sizes?: ISize[];
  productVariantId: string;
  isFavorited: boolean;
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
  activeSize: IActiveSize | null;
  setActiveSize: React.Dispatch<React.SetStateAction<IActiveSize>>;
  variant?: "catalog" | "favorite";
}

export default function Favorite({
  className,
  sizes,
  setIsDialogOpen = () => {},
  isDialogOpen = false,
  productVariantId,
  isFavorited,
  setIsFavorited,
  activeSize,
  setActiveSize,
  variant = "catalog",
}: IFavoriteProps) {
  const token = getAccessToken();
  const router = useRouter();
  const [addMutate] = useAddToUserFavoritesMutation(); // Updated hook name
  const [deleteMutate] = useDeleteUserFavoritesMutation(); // Updated hook name
  const handleAddToFavorite = async () => {
    if (activeSize) {
      try {
        await addMutate({ productVariantId, sizeId: activeSize.id });
        console.log({ productVariantId, sizeId: activeSize.id });
        setIsFavorited((prev) => !prev);

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
        setIsFavorited(false);
      }
    }
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
      setIsFavorited(false);
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
        onClick={(e) => {
          handleDeleteFavorite();
        }}
        className={`exclude-hover z-20 transition-all cursor-pointer absolute top-2 right-2 bg-background shadow-md p-2 rounded-full group/favorite-light lg:opacity-0 lg:group-hover/favorite:opacity-100 ${
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          if (isFavorited) {
            handleDeleteFavorite();
          } else {

            if (!token) {
              router.push(PUBLIC_URL.auth("login"));
              return;
            }

            setIsDialogOpen(true); // показать выбор размера
          }
        }}
        className={`exclude-hover z-20 transition-all cursor-pointer absolute top-2 right-2 bg-background shadow-md p-2 rounded-full group/favorite-light lg:opacity-0 lg:group-hover/favorite:opacity-100 ${
          className ? className : ""
        } ${isFavorited ? "lg:opacity-100" : ""}`}
      >
        <Heart
          className={`transition-colors ${
            isFavorited ? "text-primary" : "text-muted-foreground"
          } group-hover/favorite-light:text-primary`}
          size={18}
        />
      </div>

      <DialogContent className="sm:max-w-[450px] z-50 h-auto max-w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">Выберите размер</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sizes?.map((size) => (
            <div
              onClick={() => setActiveSize({ id: size.id, title: size.title })}
              key={size.title}
              className={`border rounded-lg flex justify-center items-center cursor-pointer select-none transition hover:border-primary aspect-square ${
                size.quantity < 0 ? "opacity-50 pointer-events-none" : ""
              } ${activeSize?.id === size.id && "border-primary"}`}
            >
              {size.title}
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex justify-center gap-x-5">
            <Button variant={"outline"} className="uppercase" onClick={() => setIsDialogOpen(false)}>
              ОТМЕНА
            </Button>
            <Button disabled={!activeSize} className="uppercase" type="submit" onClick={handleAddToFavorite}>
              ДОБАВИТЬ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
