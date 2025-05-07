import { Card as CardUI, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ICardItem, IFavoriteCardItem } from "@/shared/types/card.interface";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import CardImages from "./CardImages";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import Rating from "../Rating";
import { IActiveSize } from "../SizeSelector";
import AddToBasketButton from "./AddToBasketButton";
import { useGetAddedSizesQuery } from "@/features/api/basketApi";
import SizesScroller from "./SizesScroller";
interface ICardProps {
  product: ICardItem | IFavoriteCardItem;
  variant?: "catalog" | "favorite";
}

export default function Card({ product, variant = "catalog" }: ICardProps) {
  const [activeSize, setActiveSize] = useState<IActiveSize | null>(null);
  const [isAddToBasketOpen, setIsAddToBasketOpen] = useState(false);
  const [isBasket, setIsBasket] = useState(false);

  const { data } = useGetAddedSizesQuery(
    {
      productVariantId: product.id,
    },
    {
      skip: !product.id, // не запрашиваем, если id нет
    }
  );
  console.log(data);
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
  console.log(product.rating);
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
          <Rating value={String(product.rating.value)} count={product.rating.count} />
        </div>
        <SizesScroller product={product as ICardItem} />
      </CardContent>
      <CardFooter className="p-0">
        <AddToBasketButton
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          isFavorited={isBasket}
          setIsFavorited={setIsBasket}
          productVariantId={product.id}
          sizes={(product as ICardItem)?.sizes}
          setIsDialogOpen={setIsAddToBasketOpen}
          isDialogOpen={isAddToBasketOpen}
        />
      </CardFooter>
    </CardUI>
  );
}
