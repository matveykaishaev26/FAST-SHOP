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
import { useChangeBasketQuantityMutation } from "@/features/api/basketApi";
import BasketQuantityChanger from "./BasketQuantityChanger";
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

  // setIsAdded: (state: boolean) => void;
  activeSize: IActiveSize | null;
  setActiveSize: React.Dispatch<React.SetStateAction<IActiveSize | null>>;
}

export default function AddToBasketButton({
  className,
  sizes,
  setIsDialogOpen = () => {},
  isDialogOpen = false,
  productVariantId,
  isAdded,
  // setIsAdded,
  activeSize,
  setActiveSize,
  alwaysVisible = true,
  initialQuantity,
  addedToBasket,
}: AddToBasketButton) {
  const token = getAccessToken();
  const router = useRouter();
  const [addMutate] = useAddToBasketMutation(); // Updated hook name
  const [changeMutate] = useChangeBasketQuantityMutation();

  const handleAddToBasket = async (localActiveSize?: IActiveSize) => {
    if (activeSize) {
      try {
        setIsDialogOpen(false);
        await addMutate({ productVariantId, sizeId: activeSize.id });
        toast.success("Товар добавлен в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
      } catch (e) {
        toast.error("Ошибка добавления в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
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
        setIsDialogOpen(false);
        setActiveSize(localActiveSize); // ✅ сначала
        await addMutate({ productVariantId, sizeId: localActiveSize.id }).unwrap(); // потом

        toast.success("Товар добавлен в корзину!", {
          position: "bottom-right",
          style: { background: "#333", color: "#fff" },
        });
      }
    } else
      toast.error("Ошибка добавления в корзину!", {
        position: "bottom-right",
        style: { background: "#333", color: "#fff" },
      });
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
        <div className="flex items-center select-none aspect-auto justify-between w-full gap-1">
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
            className="w-full 2xl:text-sm text-xs"
            variant={isAdded ? "outline" : "default"}
          >
            {isAdded ? "Перейти в корзину" : "В корзину"}
          </Button>

          {isAdded && activeSize && (
            <div className="hidden sm:flex">
              <BasketQuantityChanger
                productVariantId={productVariantId}
                sizeId={activeSize?.id}
                initialQuantity={initialQuantity}
              />
            </div>
          )}
        </div>
      }
    />
  );
}
