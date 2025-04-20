import { Heart } from "lucide-react";
import { getAccessToken } from "@/services/auth/auth-token.service";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useToggleUserFavoritesMutation } from "@/features/api/userFavoritesApi";

interface IFavoriteProps {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  setIsDialogOpen?: (open: boolean) => void;
  isDialogOpen?: boolean;
  sizes: { title: string; quantity: number }[];
  productVariantId: string;
  isFavorited: boolean;
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Favorite({
  className,
  onMouseEnter,
  onMouseLeave,
  sizes,
  setIsDialogOpen = () => {},
  isDialogOpen = false,
  productVariantId,
  isFavorited,
  setIsFavorited,
}: IFavoriteProps) {
  const token = getAccessToken();
  const router = useRouter();
  const [mutate, { isLoading, isSuccess, error, data }] = useToggleUserFavoritesMutation(); // Updated hook name
  const [activeSize, setActiveSize] = useState<string>("");
  const handleAddToFavorite = async () => {
    if (activeSize) {
      try {
        await mutate({ productVariantId });
        setIsFavorited(true);
        setIsDialogOpen(false);
      } catch (e) {
        console.error("Ошибка добавления в избранное", e);
        setIsFavorited(false);

      }
    }
  };
  

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!token) {
            router.push(PUBLIC_URL.auth("login"));
            return;
          }
          setIsDialogOpen(true);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`exclude-hover z-20 transition-all cursor-pointer absolute top-2 right-2 bg-background shadow-md p-2 rounded-full group/favorite-light lg:opacity-0 lg:group-hover/favorite:opacity-100 ${
          className ? className : ""
        } ${isFavorited  ? "lg:opacity-100" : ""}`}
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
          {sizes.map((size) => (
            <div
              onClick={() => setActiveSize(size.title)}
              key={size.title}
              className={`border rounded-lg flex justify-center items-center cursor-pointer select-none transition hover:border-primary aspect-square ${
                size.quantity < 0 ? "opacity-50 pointer-events-none" : ""
              } ${activeSize === size.title && "border-primary"}`}
            >
              {size.title}
            </div>
          ))}
        </div>

        <div className="mt-4">
          {isLoading && <p>Загрузка...</p>}
          {isSuccess && <p>Добавлено в избранное!</p>}
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
