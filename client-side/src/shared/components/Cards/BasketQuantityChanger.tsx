"use client";
import { useChangeBasketQuantityMutation } from "@/features/api/basketApi";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface IBasketQuantityChangerProps {
  initialQuantity: number;
  productVariantId: string;
  sizeId: string;
}
export default function BasketQuantityChanger({
  initialQuantity,
  productVariantId,
  sizeId,
}: IBasketQuantityChangerProps) {
  const [changeMutate] = useChangeBasketQuantityMutation();
  return (
    <div className=" items-center gap-1  flex">
      <Button
        disabled={initialQuantity === 1}
        type="button"
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          changeMutate({
            productVariantId,
            sizeId,
            variant: "minus",
          });
        }}
      >
        <Minus size={16} />
      </Button>

      <span className="text-xs">{initialQuantity}</span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          changeMutate({
            productVariantId,
            sizeId: sizeId,
            variant: "plus",
          });
        }}
      >
        <Plus size={10} />
      </Button>
    </div>
  );
}
