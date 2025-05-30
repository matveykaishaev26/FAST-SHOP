import PageHeader from "../_components/PageHeader";
import CatalogCards from "./_components/CatalogCards/CatalogCards";
import SortSelect from "./_components/SortSelect";
import { Metadata } from "next";
import { Suspense } from "react";
import FiltersProvider from "./_components/Filters/FiltersProvider";
import CardsSkeleton from "@/shared/components/Cards/CardsSkeleton";
import createFiltersApiUrl from "@/shared/utils/createFiltersApiUrl";
import fetchProductCards from "./utils/fetchProductCards";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
type Props = {
  searchParams: Promise<Record<string, string | string[]>>;
};
export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Полный каталог товаров интернет-магазина: одежда, обувь, аксессуары и многое другое. Большой выбор и быстрая доставка.",
  keywords: ["каталог", "интернет-магазин", "одежда", "обувь", "аксессуары", "купить онлайн"],
  openGraph: {
    title: "Каталог товаров – Название магазина",
    description: "Смотрите полный каталог товаров нашего интернет-магазина.",
    url: "https://example.com/catalog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог товаров – Название магазина",
    description: "Ознакомьтесь с ассортиментом товаров в нашем каталоге.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Catalog({ searchParams }: Props) {
  const params = await searchParams;
  const filtersUrl = createFiltersApiUrl(params, 20);

  const productCards = await fetchProductCards(await filtersUrl);
  return (
    <div className=" h-full">
      <PageHeader header="Каталог" />
      <div className="w-full flex flex-row gap-x-20">
        <Suspense fallback={<Skeleton className="w-[350px]" />}>
          <FiltersProvider params={params} />
        </Suspense>

        <div className="w-full ">
          <div className="flex justify-between items-center  mb-4">
            <SortSelect />
            <div className="block lg:hidden">
              {/* <FiltersSheet filtersData={filtersData} initialState={initialState} /> */}
            </div>
          </div>
          <div className="w-full">
            <Suspense fallback={<CardsSkeleton />}>
              <CatalogCards params={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
