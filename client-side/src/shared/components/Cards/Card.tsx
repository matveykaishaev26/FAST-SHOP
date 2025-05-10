import { Card as CardUI, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ICardItem, IFavoriteCardItem } from "@/shared/types/card.interface";
import { useEffect, useState } from "react";
import CardImages from "./CardImages";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import Rating from "../Rating";
import { IActiveSize } from "../SizeSelector";
import AddToBasketButton from "./AddToBasketButton";
import { useGetAddedSizesQuery } from "@/features/api/basketApi";
import SizesScroller from "./SizesScroller";
import { useGetFavoriteSizesByProductQuery } from "@/features/api/userFavoritesApi";

interface ICardProps {
  product: ICardItem | IFavoriteCardItem;
  variant?: "catalog" | "favorite";
}

export default function Card({ product, variant = "catalog" }: ICardProps) {
  const [activeSize, setActiveSize] = useState<IActiveSize | null>(null);
  const [isAddToBasketOpen, setIsAddToBasketOpen] = useState(false);

  const productVariantId = variant === "catalog" ? product.id : (product as IFavoriteCardItem).productVariantId;

  const { data: addedToBasketData, isLoading: isAddedToBasketDataLoading } = useGetAddedSizesQuery(
    { productVariantId },
    { skip: !productVariantId }
  );

  const { data: addedFavoriteSizes, isLoading } = useGetFavoriteSizesByProductQuery(
    {
      productVariantId,
    },
    {
      skip: !productVariantId,
    }
  );
  console.log(addedFavoriteSizes);

  useEffect(() => {
    if (variant === "favorite") {
      const favProduct = product as IFavoriteCardItem;
      setActiveSize({ id: favProduct.size.id, title: favProduct.size.title });
    }
  }, [product, variant]);

  const router = useRouter();

  const handlePushToItemPage = () => {
    router.push(PUBLIC_URL.catalog(`/${productVariantId}`));
  };


  return (
    <CardUI
      key={product.id}
      className="relative rounded-none border-none shadow-none transition duration-300 hover:m-0"
    >
      <CardContent className="p-0">
        <CardImages
          addedFavoriteSizes={addedFavoriteSizes ?? {}}
          variant={variant}
          handlePushToItemPage={handlePushToItemPage}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          productVariantId={productVariantId}
          sizes={(product as ICardItem)?.sizes}
          className=""
          images={product.images}
          alt={product.title}
        />
        <div>
          <p className="text-md font-medium mt-2 sm:text-xl">{product.price} ₽</p>
          <h3 onClick={handlePushToItemPage} className="truncate hover:text-primary cursor-pointer">
            {product.title}
          </h3>
          <p className="text-sm truncate text-muted-foreground">{product.brand}</p>
          <Rating value={String(product.rating.value)} count={product.rating.count} />
          {variant === "catalog" && (
            <div className="sm:block hidden">
              <SizesScroller activeSize={activeSize} setActiveSize={setActiveSize} product={product as ICardItem} />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <AddToBasketButton
          addedToBasket={addedToBasketData}
          initialQuantity={addedToBasketData && activeSize ? addedToBasketData[activeSize?.id] : 0}
          activeSize={activeSize!}
          setActiveSize={setActiveSize}
          isAdded={activeSize && addedToBasketData ? addedToBasketData[activeSize.id] > 0 : false}
          productVariantId={productVariantId}
          sizes={(product as ICardItem)?.sizes}
          setIsDialogOpen={setIsAddToBasketOpen}
          isDialogOpen={isAddToBasketOpen}
        />
      </CardFooter>
    </CardUI>
  );
}
