import { Card as CardUI, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ICardItem } from "@/shared/types/card.interface";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import CardImages from "./CardImages";

interface ICardProps {
  product: ICardItem ;
  variant?: "catalog" | "favorite";
}
export default function Card({ product, variant = 'catalog' }: ICardProps) {
  const [activeSize, setActiveSize] = useState<string>("");

  return (
    <CardUI
      key={product.id}
      className=" relative rounded-none border-none shadow-none    transition duration-300 hover:m-0"
    >
      <CardContent className="p-0">
        <div className="">
          <CardImages
            variant={variant}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            productVariantId={product.id}
            sizes={product.sizes}
            className=""
            images={product.images}
            alt={product.title}
          />
        </div>
        <div className="">
          <p className="text-md font-medium mt-2   sm:text-xl">{product.price} ₽</p>
          <h3 className="truncate ">{product.title}</h3>
          <p className="text-sm truncate text-gray-500">{product.brand}</p>
          <div className="flex items-center gap-x-1">
            <span className="text-primary text-lg">★</span>
            <span className="text-sm truncate text-gray-500">{product.rating.value}</span>
            <span className="text-xs text-gray-500">({product.rating.count})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full">В корзину</Button>
      </CardFooter>
    </CardUI>
  );
}
