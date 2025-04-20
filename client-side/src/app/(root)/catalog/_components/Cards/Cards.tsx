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
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { filtersOrder } from "@/shared/types/filter.interface";
import { setFilterId, setPriceRange } from "@/features/slices/filtersSlice";
const LIMIT = 20;

interface ICardsProps {
  isFiltersReady: boolean;
  setCardsCount: React.Dispatch<React.SetStateAction<string>>;
}
export default function Cards({ isFiltersReady, setCardsCount }: ICardsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isMobile = useBreakpointMatch(768);
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);
  const [isNewPageFetching, setIsNewPageFetching] = useState<boolean>(false);
  const { data, isLoading, isFetching, error } = useGetProductCardsQuery(
    {
      page: page,
      limit: LIMIT,
      mode: isMobile ? CARDS_RESPONSE_MODE.INFINITE_SCROLL : CARDS_RESPONSE_MODE.PAGINATION,
      filters: { priceRange, ...filters },
    },
    {
      skip: !isFiltersReady,
    }
  );
  const { items, totalCount, totalPages, currentPage } = data || {};

  const loadMore = () => {
    if (currentPage) {
      setIsNewPageFetching(true);
      router.push(`/catalog/?page=${currentPage + 1}`, { scroll: false });
    }
  };
  useEffect(() => {
    if (totalCount) setCardsCount(totalCount.toString());
  }, [data]);
  useEffect(() => {
    if (isFetching === false) {
      setIsNewPageFetching(false);
    }
  }, [isFetching]);

  if (isLoading || !isFiltersReady || (isFetching && !isMobile)) {
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
              className=" relative rounded-none border-none shadow-none    transition duration-300 hover:m-0"
            >
              <CardContent className="p-0">
                <div className="">
                  <CardImages
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
            </Card>
          ))}
      </div>
      <div className="hidden md:block">
        <PaginationControl disabled={isNewPageFetching} page={currentPage ?? 1} totalPages={totalPages ?? 1} />
      </div>

      {items.length !== totalCount && (
        <Button
          onClick={loadMore}
          className="block uppercase md:hidden border-primary text-primary hover:text-primary w-full"
          variant={"outline"}
          disabled={isNewPageFetching}
        >
          Загрузить еще
        </Button>
      )}
    </div>
  );
}
