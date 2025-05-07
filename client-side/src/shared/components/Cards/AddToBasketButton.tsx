import { Heart } from "lucide-react";
import { getAccessToken } from "@/services/auth/auth-token.service";
import { useRouter } from "next13-progressbar";
import { Button } from "@/shared/components/ui/button";
import { ISize } from "@/shared/types/size.interface";
import toast from "react-hot-toast";
import { IActiveSize } from "../SizeSelector";
import { Plus, Minus } from "lucide-react";
import { useAddToBasketMutation } from "@/features/api/basketApi";
import ChooseSizeDialog from "./ChooseSizeDialog";
import { PROFILE_URL, PUBLIC_URL } from "@/config/url.config";
import { useState } from "react";

interface IFavoriteProps {
  className?: string;
  alwaysVisible?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
  isDialogOpen?: boolean;
  sizes?: ISize[];
  productVariantId: string;
  isFavorited: boolean;
  setIsFavorited: (state: boolean) => void;
  activeSize: IActiveSize | null;
  setActiveSize: React.Dispatch<React.SetStateAction<IActiveSize | null>>;
}

export default function AddToBasketButton({
  className,
  sizes,
  setIsDialogOpen = () => {},
  isDialogOpen = false,
  productVariantId,
  isFavorited,
  setIsFavorited,
  activeSize,
  setActiveSize,
  alwaysVisible = true,
}: IFavoriteProps) {
  const token = getAccessToken();
  const router = useRouter();
  const [addMutate] = useAddToBasketMutation(); // Updated hook name
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleAddToFavorite = async () => {
    if (activeSize) {
      try {
        await addMutate({ productVariantId, sizeId: activeSize.id });
        setIsFavorited(true);
        setIsDialogOpen(false);
        toast.success("Товар добавлен в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
      } catch (e) {
        toast.error("Ошибка добавления в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
        setIsFavorited(false);
      }
    }
  };

  const handleDeleteFavorite = async () => {
    if (!activeSize) return;
    router.push(PROFILE_URL.basket());
    try {
      toast.success("Товар удален из корзины!", {
        position: "bottom-right",
        style: { background: "#333", color: "#fff" },
      });
      setIsFavorited(false);
      setActiveSize(null);
    } catch (e) {
      toast.error("Ошибка!", {
        position: "bottom-right",
        style: { background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <ChooseSizeDialog
      open={isDialogOpen}
      sizes={sizes}
      onOpenChange={setIsDialogOpen}
      activeSize={activeSize}
      setActiveSize={setActiveSize}
      onConfirm={handleAddToFavorite}
      trigger={
        <div className="flex items-center justify-between w-full gap-4">
          <Button
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
            className="w-full"
            variant={isFavorited ? "outline" : "default"}
          >
            {isFavorited ? "Перейти в корзину" : "В корзину"}
          </Button>

          {isFavorited && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
              >
                <Minus size={16} />
              </Button>
              <span className="text-sm">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((q) => q + 1);
                }}
              >
                <Plus size={16} />
              </Button>
            </div>
          )}
        </div>
      }
    />
  );
}
