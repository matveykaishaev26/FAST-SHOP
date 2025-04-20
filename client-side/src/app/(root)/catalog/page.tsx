"use client";
import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import { filtersOrder } from "@/shared/types/filter.interface";
import Cards from "./_components/Cards/Cards";
import SortSelect from "./_components/SortSelect";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { setFilterId, setPriceRange } from "@/features/slices/filtersSlice";
export default function Catalog() {
  const [isFiltersReady, setIsFiltersReady] = useState(false);
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);
  const [cardsCount, setCardsCount] = useState<string>("");
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  useEffect(() => {
    filtersOrder.map((filterType) => {
      const param = searchParams.get(filterType);
      if (param) {
        const queryIds = param.split(",");
        queryIds.forEach((id) => dispatch(setFilterId({ filterType, filterId: id })));
      }
    });

    const priceParam = searchParams.get("priceRange");
    if (priceParam) {
      const [minStr, maxStr] = priceParam.split("-");
      const min = parseInt(minStr);
      const max = parseInt(maxStr);
      if (min && max) dispatch(setPriceRange([min, max]));
    }
    setIsFiltersReady(true);
  }, []);
  return (
    <div className=" h-full">
      <h2 className="text-2xl font-medium  mb-10 sm:text-4xl">
        <span className="text-2xl  font-medium tracking-widest sm:text-4xl">КАТАЛОГ</span>
        <span className="text-[12px] text-muted-foreground sm:text-[16px]"> {cardsCount !== "" && cardsCount + " товаров"} </span>
      </h2>
      <div className="w-full flex flex-row gap-x-20">
        <Filters
          filters={isFiltersReady && filters}
          priceRange={isFiltersReady && priceRange}
          isFiltersReady={isFiltersReady}
          variant="desktop"
          className="w-[350px] hidden lg:block"
        />
        <div className="w-full ">
          <div className="flex justify-between items-center  mb-4">
            <SortSelect />
            <div className="block lg:hidden">
              <FiltersSheet isFiltersReady={isFiltersReady} filters={filters} priceRange={priceRange} />
            </div>
          </div>
          <div className="w-full">
            <Cards setCardsCount={setCardsCount} isFiltersReady={isFiltersReady} />
          </div>
        </div>
      </div>
    </div>
  );
}
