"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../../catalog/_components/Cards/Card";
import { useGetFavoritesCardsQuery } from "@/features/api/userFavoritesApi";
import { CARDS_RESPONSE_MODE } from "@/features/api/productApi";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import CardsSkeleton from "../../catalog/_components/Cards/CardsSkeleton";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { useState } from "react";

const LIMIT = 20;

export default function Favorites() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isMobile = useBreakpointMatch(768);
  const [isNewPageFetching, setIsNewPageFetching] = useState<boolean>(false);

  const { data, isLoading, isFetching, error } = useGetFavoritesCardsQuery({
    page: page,
    limit: LIMIT,
    mode: isMobile ? CARDS_RESPONSE_MODE.INFINITE_SCROLL : CARDS_RESPONSE_MODE.PAGINATION,
  });

  const { items, totalCount, totalPages, currentPage } = data || {};

  if (isLoading || (isFetching && !isMobile)) {
    return <CardsSkeleton count={LIMIT} />;
  }

  if (error) {
    return <p className="text-destructive">Ошибка: {JSON.stringify(error)}</p>;
  }

  if (!items?.length) {
    return <p className="text-gray-500">Нет товаров для отображения</p>;
  }
  return (
    <div className="h-full">
      <h2 className="text-2xl font-medium  mb-10 sm:text-4xl">
        <span className="text-2xl uppercase font-medium tracking-widest sm:text-4xl">ИЗБРАННОЕ</span>
        <div className="w-full flex flex-row gap-x-20">
          
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  mb-10">
          {items && items.map((product: ICardItem) => <Card key={product.id} product={product} />)}
        </div>
        <div className="hidden md:block">
          <PaginationControl disabled={isNewPageFetching} page={currentPage ?? 1} totalPages={totalPages ?? 1} />
        </div>
      </h2>
    </div>
  );
}
