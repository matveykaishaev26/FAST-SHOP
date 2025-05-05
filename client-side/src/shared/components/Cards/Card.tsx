import { Card as CardUI, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ICardItem, IFavoriteCardItem } from "@/shared/types/card.interface";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import CardImages from "./CardImages";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import Rating from "../Rating";
interface ICardProps {
  product: ICardItem | IFavoriteCardItem;
  variant?: "catalog" | "favorite";
}

export interface IActiveSize {
  id: string;
  title: string;
}
export default function Card({ product, variant = "catalog" }: ICardProps) {
  const [activeSize, setActiveSize] = useState<IActiveSize | null>(null);
  const router = useRouter();
  const handlePushToItemPage = () => {
    router.push(
      PUBLIC_URL.catalog(`/${variant === "catalog" ? product.id : (product as IFavoriteCardItem).productVariantId}`)
    );
  };
  useEffect(() => {
    if (variant === "favorite") {
      setActiveSize({ id: (product as IFavoriteCardItem).size.id, title: (product as IFavoriteCardItem).size.title });
    }
  }, []);
  return (
    <CardUI
      key={product.id}
      className=" relative rounded-none border-none shadow-none    transition duration-300 hover:m-0"
    >
      <CardContent className="p-0">
        <div className="">
          <CardImages
            variant={variant}
            handlePushToItemPage={handlePushToItemPage}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            productVariantId={variant === "catalog" ? product.id : (product as IFavoriteCardItem).productVariantId}
            sizes={(product as ICardItem)?.sizes}
            className=""
            images={product.images}
            alt={product.title}
          />
        </div>
        <div className="">
          <p className="text-md font-medium mt-2   sm:text-xl">{product.price} ₽</p>
          <h3 onClick={handlePushToItemPage} className="truncate hover:text-primary cursor-pointer">
            {product.title}
          </h3>
          <p className="text-sm truncate text-muted-foreground">{product.brand}</p>
          <Rating
            value={product.rating.value as string}
            count={product.rating.count > 0 ? String(product.rating.count) : "Нет отзывов"}
          />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full">В корзину</Button>
      </CardFooter>
    </CardUI>
  );
}
