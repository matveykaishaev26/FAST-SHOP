"use client";
import SizeSelector from "@/shared/components/SizeSelector";
import { Button } from "@/shared/components/ui/button";
import { ISize } from "@/shared/types/size.interface";
import { useState } from "react";
import FavoriteComponent from "@/shared/components/Cards/FavoriteComponent";
interface IAddToCartFormProps {
  sizes: ISize[];
}
export default function AddToCartForm({ sizes }: IAddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  return (
    <div className="space-y-4">
      <SizeSelector sizes={sizes} setActiveSize={setSelectedSize} activeSize={selectedSize} />
      <div className="flex gap-x-2">
        <Button className="w-full">Добавить в корзину</Button>
        <FavoriteComponent />
      </div>
    </div>
  );
}
