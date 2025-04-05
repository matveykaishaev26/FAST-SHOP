
"use client";
import { useGetProductCardsQuery } from "@/features/api/productApi";
import { ICardItem } from "@/shared/types/card.interface";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Heart } from "lucide-react";
import CardImages from "./CardImages";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { CARDS_RESPONSE_MODE } from "@/features/api/productApi";
import { useEffect, useState } from "react";
import CardsSkeleton from "./CardsSkeleton";
const LIMIT = 20;

export default function Cards() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isMobile = useBreakpointMatch(768);
  const [isLocalFetching, setIsLocalFetching] = useState<boolean>(false);
  const { data, isLoading, isFetching, error } = useGetProductCardsQuery({
    page: page,
    limit: LIMIT,
    mode: isMobile ? CARDS_RESPONSE_MODE.INFINITE_SCROLL : CARDS_RESPONSE_MODE.PAGINATION,
  });

  const { items, totalCount, totalPages, currentPage } = data || {};

  const loadMore = () => {
    if (currentPage) {
      setIsLocalFetching(true);
      router.push(`/catalog/?page=${currentPage + 1}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (isFetching === false) {
      setIsLocalFetching(false);
    }
  }, [isFetching]);

  if (isLoading) {
    return <CardsSkeleton count={LIMIT} />;
  }

  if (error) {
    return <p className="text-red-500">Ошибка: {JSON.stringify(error)}</p>;
  }

  if (!items?.length) {
    return <p className="text-gray-500">Нет товаров для отображения</p>;
  }

  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  mb-10">
        {items &&
          items.map((product: ICardItem) => (
            <Card
              key={product.id}
              className="overflow-hidden relative rounded-none border-none shadow-none group/heart group  transition duration-300 hover:m-0"
            >
              <CardContent className="p-0">
                <div className="">
                  <div className="z-10 cursor-pointer absolute top-2 right-2 bg-background shadow-md p-2 rounded-full group/heart-light opacity-0 group-hover/heart:opacity-100">
                    <Heart className="text-muted-foreground group-hover/heart-light:text-primary" size={18} />
                  </div>
                  <CardImages className="" images={product.images} alt={product.title} />
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
            </Card>
          ))}
      </div>
      <div className="hidden md:block">
        <PaginationControl disabled={isLocalFetching} page={currentPage ?? 1} totalPages={totalPages ?? 1} />
      </div>
      {/* {isLocalFetching && <CardsSkeleton count={LIMIT} />} */}

      {items.length !== totalCount && (
        <Button
          onClick={loadMore}
          className="block uppercase md:hidden border-primary text-primary hover:text-primary w-full"
          variant={"outline"}
          disabled={isLocalFetching}
        >
          Загрузить еще
        </Button>
      )}
    </div>
  );
}