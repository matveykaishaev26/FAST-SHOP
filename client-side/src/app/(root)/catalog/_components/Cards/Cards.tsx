"use client";
import { useGetProductCardsQuery } from "@/features/api/productApi";
import { ICardItem } from "@/shared/types/card.interface";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Heart } from "lucide-react";
import CardImages from "./CardImages";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CARDS_RESPONSE_MODE } from "@/features/api/productApi";
import CardsSkeleton from "./CardsSkeleton";
const LIMIT = 10;

export default function Cards() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isMobile = useIsMobile(768);
  const { data, isLoading, isFetching, error, refetch } = useGetProductCardsQuery({
    page: page,
    limit: LIMIT,
    mode: isMobile ? CARDS_RESPONSE_MODE.INFINITE_SCROLL : CARDS_RESPONSE_MODE.PAGINATION,
  });

  const { items, totalCount, totalPages, currentPage } = data || {};

  // useEffect(() => {
  //   if (!isMobile) return;

  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
  //       router.push(`/catalog/?page=${page + 1}`, { scroll: false }); //+
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isMobile, isFetching]);
  // useEffect(() => {
  //   refetch();
  // }, [isMobile, refetch]);
  const loadMore = () => {
    if (currentPage) {
      router.push(`/catalog/?page=${currentPage + 1}`, { scroll: false }); //+
    }
    
  };

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
      <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {items &&
          items.map((product: ICardItem) => (
            <Card key={product.id} className=" overflow-hidden rounded-none border-none shadow-none">
              <CardContent className="p-0 group/sizes">
                <div className="relative">
                  <div className="z-10 cursor-pointer absolute top-2 right-2 bg-background shadow-md p-2 rounded-full group">
                    <Heart className="text-muted-foreground group-hover:text-primary" size={18} />
                  </div>
                  <CardImages images={product.images} alt={product.title} />
                </div>

                <p className="text-md font-medium mt-2 sm:text-xl">{product.price} ₽</p>
                <h3 className="truncate">{product.title}</h3>
                <p className="text-sm truncate text-gray-500">{product.brand}</p>
                <div className="flex items-center gap-x-1">
                  <span className="text-primary text-lg">★</span>
                  <span className="text-sm truncate text-gray-500">{product.rating.value}</span>
                  <span className="text-xs text-gray-500">({product.rating.count})</span>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button className="w-full">В корзину</Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <div className="hidden md:block">
        <PaginationControl disabled={isFetching} page={currentPage ?? 1} totalPages={totalPages ?? 1} />
      </div>

      <Button
        onClick={loadMore}
        className="block uppercase md:hidden border-primary text-primary hover:text-primary w-full"
        variant={"outline"}
        disabled={isFetching || items.length === totalCount}
      >
        Загрузить еще
      </Button>
    </div>
  );
}
