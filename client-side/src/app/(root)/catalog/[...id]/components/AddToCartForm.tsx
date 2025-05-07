"use client";
import SizeSelector, { IActiveSize } from "@/shared/components/SizeSelector";
import { Button } from "@/shared/components/ui/button";
import { ISize } from "@/shared/types/size.interface";
import { useEffect, useState } from "react";
import FavoriteComponent from "@/shared/components/Cards/FavoriteComponent";
import Favorite from "@/shared/components/Cards/Favorite";
interface IAddToCartFormProps {
  sizes: ISize[];
  productVariantId: string;
}
export default function AddToCartForm({ sizes, productVariantId }: IAddToCartFormProps) {
  const [activeSize, setActiveSize] = useState<IActiveSize | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isFavoritedState = sizes.reduce(function (result, size) {
    return {
      ...result,
      [size.id]: false,
    };
  }, {});
  const [isFavoritedArr, setIsFavoritedArr] = useState<Record<string, boolean>>(isFavoritedState);
  const toggleFavoriteForSize = (state: boolean) => {
    if (!activeSize) return;
    // const isFavorited = isFavoritedArr[selectedSize.id];
    if (activeSize)
      setIsFavoritedArr((prev) => ({
        ...prev,
        [activeSize.id]: state,
      }));
  };

  return (
    <div className="space-y-4">
      <SizeSelector sizes={sizes} setActiveSize={setActiveSize} activeSize={activeSize} />
      <div className="flex gap-x-2">
        <Button disabled={activeSize !== null ? false : true} className="w-full">
          Добавить в корзину
        </Button>
        <Favorite
          sizes={sizes}
          setIsFavorited={toggleFavoriteForSize}
          setActiveSize={setActiveSize}
          productVariantId={productVariantId}
          isFavorited={activeSize ? isFavoritedArr[activeSize.id] : false}

          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
          activeSize={activeSize}
        />
      </div>
    </div>
  );
}
