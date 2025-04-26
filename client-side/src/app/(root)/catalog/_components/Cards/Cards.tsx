"use client";
import { useGetProductCardsQuery } from "@/features/api/productApi";
import { ICardItem } from "@/shared/types/card.interface";
import { Button } from "@/shared/components/ui/button";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { CARDS_RESPONSE_MODE } from "@/features/api/productApi";
import { useEffect, useState } from "react";
import CardsSkeleton from "./CardsSkeleton";
import {useAppSelector } from "@/hooks/useAppDispatch";
import Card from "./Card";
const LIMIT = 20;

interface ICardsProps {
  isFiltersReady: boolean;
  setCardsCount: React.Dispatch<React.SetStateAction<number>>;
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
    if (totalCount) setCardsCount(totalCount);
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
    return <p className="text-destructive">Ошибка: {JSON.stringify(error)}</p>;
  }

  if (!items?.length) {
    return <p className="text-gray-500">Нет товаров для отображения</p>;
  }

  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  mb-10">
        {items && items.map((product: ICardItem) => <Card key={product.id} product={product} />)}
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