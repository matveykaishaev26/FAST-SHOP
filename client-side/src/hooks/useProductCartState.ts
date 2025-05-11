import { useState, useEffect } from "react";
import { useGetAddedSizesQuery } from "@/features/api/basketApi";
import { useGetFavoriteSizesByProductQuery } from "@/features/api/userFavoritesApi";
import { IActiveSize } from "@/shared/components/SizeSelector";
import { IFavoriteCardItem } from "@/shared/types/card.interface";
import { ISize } from "@/shared/types/size.interface";

export function useProductCartState(productVariantId: string, sizes?: ISize[], preselectedSize?: IActiveSize | null) {
  const [activeSize, setActiveSize] = useState<IActiveSize | null>(preselectedSize ?? null);
  const [isBasketDialogOpen, setIsBasketDialogOpen] = useState(false);
  const [isFavoriteDialogOpen, setIsFavoriteDialogOpen] = useState(false);

  const { data: addedToBasketData, isLoading: isBasketLoading } = useGetAddedSizesQuery(
    { productVariantId },
    { skip: !productVariantId }
  );

  const { data: addedFavoriteSizes, isLoading: isFavoriteLoading } = useGetFavoriteSizesByProductQuery(
    { productVariantId },
    { skip: !productVariantId }
  );

  const quantity = activeSize && addedToBasketData ? addedToBasketData[activeSize.id] ?? 0 : 0;
  const isAdded = quantity > 0;
  const isFavorited = !!(activeSize && addedFavoriteSizes?.[activeSize.id]);

  return {
    activeSize,
    setActiveSize,
    isBasketDialogOpen,
    setIsBasketDialogOpen,
    isFavoriteDialogOpen,
    setIsFavoriteDialogOpen,
    addedToBasketData,
    addedFavoriteSizes,
    isBasketLoading,
    isFavoriteLoading,
    quantity,
    isAdded,
    isFavorited,
  };
}
