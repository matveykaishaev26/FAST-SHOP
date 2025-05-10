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
import { useChangeBasketQuantityMutation } from "@/features/api/basketApi";

interface AddToBasketButton {
  initialQuantity: number;
  className?: string;
  alwaysVisible?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
  isDialogOpen?: boolean;
  sizes?: ISize[];
  productVariantId: string;
  isAdded: boolean;
  addedToBasket: any;

  setIsAdded: (state: boolean) => void;
  activeSize: IActiveSize;
  setActiveSize: React.Dispatch<React.SetStateAction<IActiveSize | null>>;
}

export default function AddToBasketButton({
  className,
  sizes,
  setIsDialogOpen = () => {},
  isDialogOpen = false,
  productVariantId,
  isAdded,
  setIsAdded,
  activeSize,
  setActiveSize,
  alwaysVisible = true,
  initialQuantity,
  addedToBasket,
}: AddToBasketButton) {
  const token = getAccessToken();
  const router = useRouter();
  const [addMutate] = useAddToBasketMutation(); // Updated hook name
  const [changeMutate, { isLoading }] = useChangeBasketQuantityMutation();

  const handleAddToBasket = async (localActiveSize?: IActiveSize) => {
    if (activeSize) {
      try {
        await addMutate({ productVariantId, sizeId: activeSize.id });
        setIsAdded(true);
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
        setIsAdded(false);
      }
    } else if (localActiveSize) {
      if (addedToBasket[localActiveSize.id]) {
        setIsDialogOpen(false);

        setActiveSize(localActiveSize);

        changeMutate({
          productVariantId,
          sizeId: localActiveSize?.id,
          variant: "plus",
        });
        setIsDialogOpen(false);
      } else {
        await addMutate({ productVariantId, sizeId: localActiveSize.id });
        setActiveSize(localActiveSize);

        setIsAdded(true);
        setIsDialogOpen(false);
        toast.success("Товар добавлен в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
      }
    } else return;
  };

  return (
    <ChooseSizeDialog
      open={isDialogOpen}
      sizes={sizes}
      onOpenChange={setIsDialogOpen}
      activeSize={activeSize}
      setActiveSize={setActiveSize}
      onConfirm={handleAddToBasket}
      trigger={
        <div className="flex items-center justify-between w-full gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!token) router.push(PUBLIC_URL.auth("login"));
              else if (isAdded) router.push(PROFILE_URL.basket());
              else if (activeSize) {
                handleAddToBasket();
              } else setIsDialogOpen(true);
            }}
            className="w-full lg:text-sm text-xs"
            variant={isAdded ? "outline" : "default"}
          >
            {isAdded ? "Перейти в корзину" : "В корзину"}
          </Button>

          {isAdded && (
            <div className="hidden items-center gap-1  sm:flex">
              <Button
                disabled={initialQuantity === 1}
                type="button"
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  changeMutate({
                    productVariantId,
                    sizeId: activeSize?.id,
                    variant: "minus",
                  });
                }}
              >
                <Minus size={16} />
              </Button>
              <span className="text-xs">{initialQuantity}</span>
              <Button
                // disabled={isLoading}
                type="button"
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  changeMutate({
                    productVariantId,
                    sizeId: activeSize?.id,
                    variant: "plus",
                  });
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
