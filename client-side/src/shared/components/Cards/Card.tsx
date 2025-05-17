'use client'
import { Card as CardUI, CardContent, CardFooter } from "@/shared/components/ui/card";
import { ICardItem, IFavoriteCardItem } from "@/shared/types/card.interface";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import Rating from "../Rating";
import AddToBasketButton from "./AddToBasketButton";
import SizesScroller from "./SizesScroller";
import CardImages from "./CardImages";
import { Skeleton } from "../ui/Skeleton/Skeleton";
import { useProductCartState } from "@/hooks/useProductCartState";

interface ICardProps {
  product: ICardItem | IFavoriteCardItem;
  variant?: "catalog" | "favorite";
}

export default function Card({ product, variant = "catalog" }: ICardProps) {
  const productVariantId = variant === "catalog" ? product.id : (product as IFavoriteCardItem).productVariantId;
  const sizes = variant === "catalog" ? (product as ICardItem).sizes : [(product as IFavoriteCardItem).size];
  const preselectedSize = variant === "favorite" ? { id: (product as IFavoriteCardItem).size.id, title: (product as IFavoriteCardItem).size.title } : null;

  const {
    activeSize,
    setActiveSize,
    isBasketDialogOpen,
    setIsBasketDialogOpen,
    addedToBasketData,
    isBasketLoading,
    isAdded,
    quantity,
    addedFavoriteSizes,
    isFavoriteLoading,
  } = useProductCartState(productVariantId, sizes, preselectedSize);

  const router = useRouter();
  const handlePushToItemPage = () => {
    router.push(PUBLIC_URL.catalog(`/${productVariantId}`));
  };

  return (
    <CardUI className="relative rounded-none border-none shadow-none transition duration-300 hover:m-0">
      <CardContent className="p-0">
        <CardImages
          addedFavoriteSizes={addedFavoriteSizes ?? {}}
          variant={variant}
          handlePushToItemPage={handlePushToItemPage}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          productVariantId={productVariantId}
          sizes={sizes}
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
        {isBasketLoading ? (
          <Skeleton className="h-icon w-full" />
        ) : (
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
        )}
      </CardFooter>
    </CardUI>
  );
}
