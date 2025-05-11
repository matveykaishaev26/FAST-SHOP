"use client";

import SizeSelector from "@/shared/components/SizeSelector";
import { ISize } from "@/shared/types/size.interface";
import Favorite from "@/shared/components/Cards/Favorite";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import AddToBasketButton from "@/shared/components/Cards/AddToBasketButton";
import { useProductCartState } from "@/hooks/useProductCartState";

interface IAddToCartFormProps {
  sizes: ISize[];
  productVariantId: string;
}

export default function AddToCartBasket({ sizes, productVariantId }: IAddToCartFormProps) {
  const {
    activeSize,
    setActiveSize,
    isBasketDialogOpen,
    setIsBasketDialogOpen,
    isFavoriteDialogOpen,
    setIsFavoriteDialogOpen,
    addedToBasketData,
    isBasketLoading,
    isFavoriteLoading,
    isAdded,
    isFavorited,
    quantity,
    addedFavoriteSizes,
  } = useProductCartState(productVariantId, sizes);

  return (
    <div className="space-y-4">
      <SizeSelector sizes={sizes} setActiveSize={setActiveSize} activeSize={activeSize} />
      <div className="flex gap-x-2">
        {isBasketLoading || isFavoriteLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <>
            <AddToBasketButton
              addedToBasket={addedToBasketData}
              initialQuantity={quantity}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
              isAdded={isAdded}
              productVariantId={productVariantId}
              sizes={sizes}
              setIsDialogOpen={setIsBasketDialogOpen}
              isDialogOpen={isBasketDialogOpen}
            />
            <Favorite
              addedToFavorite={addedFavoriteSizes ?? {}}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
              isFavorited={isFavorited}
              productVariantId={productVariantId}
              sizes={sizes}
              setIsDialogOpen={setIsFavoriteDialogOpen}
              isDialogOpen={isFavoriteDialogOpen}
            />
          </>
        )}
      </div>
    </div>
  );
}
