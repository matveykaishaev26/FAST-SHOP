"use client";
import { filtersOrder, IFilters } from "@/shared/types/filter.interface";
import FiltersBase from "./FiltersBase";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
interface IFiltersDesktop {
  initialState: IFilters;
  filtersData: any;
}
export default function FiltersDesktop({ initialState, filtersData }: IFiltersDesktop) {
  const [localFilters, setLocalFilters] = useState<IFilters>(initialState);
  const { priceRange, ...filtersWithoutPrice } = localFilters;

  const searchParams = useSearchParams();
  const router = useRouter();

  const deleteFiltersWithoutPriceRange = useCallback(
    (filterType: keyof Omit<IFilters, "priceRange">, filterId?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentIds = (params.get(filterType) || "").split(",").filter(Boolean);

      const updatedIds = filterId ? currentIds.filter((id) => id !== filterId) : [];

      if (updatedIds.length > 0) {
        params.set(filterType, updatedIds.join(","));
      } else {
        params.delete(filterType);
      }

      const updatedFilter = filterId ? localFilters[filterType].filter((opt) => opt.id !== filterId) : [];

      const newFilters = {
        ...localFilters,
        [filterType]: updatedFilter,
      };

      setLocalFilters(newFilters);
      router.push(`?${params.toString()}`);
    },
    [searchParams, router, localFilters]
  );
  const setPriceRange = (priceRange: [number, number] | null) => {
    const params = new URLSearchParams(searchParams);

    setLocalFilters((prev) => ({
      ...prev,
      priceRange: priceRange,
    }));
    if (priceRange !== null) params.set("priceRange", priceRange.join("-"));
    else params.delete("priceRange");

    router.push(`?${params.toString()}`);
  };
  const deletePriceRange = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceRange");

    setLocalFilters((prev) => ({
      ...prev,
      priceRange: null,
    }));

    router.push(`?${params.toString()}`);
  }, [searchParams, router]);
  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    filtersOrder.forEach((key) => params.delete(key));
    params.delete("priceRange");

    const cleared: IFilters = {
      brandIds: [],
      categoryIds: [],
      sizeIds: [],
      genderIds: [],
      materialIds: [],
      styleIds: [],
      colorIds: [],
      priceRange: null,
    };

    setLocalFilters(cleared);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);
  return (
    <FiltersBase
      className="w-[350px]"
      setFilters={setLocalFilters}
      variant="desktop"
      filtersData={filtersData}
      clearAllFilters={clearAllFilters}
      deletePriceRange={deletePriceRange}
      priceRange={priceRange}
      filtersWithoutPrice={filtersWithoutPrice}
      deleteFilters={deleteFiltersWithoutPriceRange}
      setPriceRange={setPriceRange}
    />
  );
}
