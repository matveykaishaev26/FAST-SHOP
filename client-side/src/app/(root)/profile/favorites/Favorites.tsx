"use client";

import { useSearchParams } from "next/navigation";
import { useGetFavoritesCardsQuery } from "@/features/api/userFavoritesApi";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import Card from "@/shared/components/Cards/Card";
import CardsSkeleton from "@/shared/components/Cards/CardsSkeleton";
import { useState } from "react";
import { IFavoriteCardItem } from "@/shared/types/card.interface";
import { CARDS_RESPONSE_MODE } from "@/features/api/productApi";
import PageHeader from "../../_components/PageHeader";

const LIMIT = 20;

export default function Favorites() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = Number(pageParam) || 1;

  const isMobile = useBreakpointMatch(768);
  const [isNewPageFetching, setIsNewPageFetching] = useState(false);

  const { data, isLoading, error } = useGetFavoritesCardsQuery({
    page,
    limit: LIMIT,
    mode: isMobile ? CARDS_RESPONSE_MODE.INFINITE_SCROLL : CARDS_RESPONSE_MODE.PAGINATION,
  });

  const { items, totalPages, currentPage } = data || {};

  if (error) {
    return <p className="text-destructive">Ошибка: {JSON.stringify(error)}</p>;
  }

  return (
    <div className="h-full">
      <PageHeader header="Избранное" />
      {isLoading ? (
        <CardsSkeleton count={LIMIT} />
      ) : items?.length ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {items.map((product: IFavoriteCardItem) => (
              <Card key={product.id} variant="favorite" product={product} />
            ))}
          </div>
          <div className="hidden md:block">
            <PaginationControl disabled={isNewPageFetching} page={currentPage ?? 1} totalPages={totalPages ?? 1} />
          </div>
        </>
      ) : (
        <p className="text-gray-500">Нет товаров для отображения</p>
      )}
    </div>
  );
}
