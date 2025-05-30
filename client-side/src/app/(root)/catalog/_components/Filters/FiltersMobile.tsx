"use client";
import { IFilters } from "@/shared/types/filter.interface";
import FiltersBase from "./FiltersBase";
import { useCallback } from "react";
interface IFiltersDesktop {
  filtersData: any;
    mobileFilters: IFilters;
    setMobileFilters:  React.Dispatch<React.SetStateAction<IFilters>>;
}
export default function FiltersMobile({ mobileFilters, filtersData, setMobileFilters }: IFiltersDesktop) {
  const { priceRange, ...filtersWithoutPrice } = mobileFilters;

  const deleteFiltersWithoutPriceRange = useCallback(
    (filterType: keyof Omit<IFilters, "priceRange">, filterId?: string) => {
      const updatedFilter = filterId ? filtersWithoutPrice[filterType].filter((opt) => opt.id !== filterId) : [];

      const newFilters = {
        ...filtersWithoutPrice,
          [filterType]: updatedFilter,
         priceRange: priceRange, 
      };

      setMobileFilters(newFilters);
    },
    [mobileFilters]
  );
  const setPriceRange = (priceRange: [number, number] | null) => {
    setMobileFilters((prev) => ({
      ...prev,
      priceRange: priceRange,
    }));
  };
  const deletePriceRange = () => {
    setMobileFilters((prev) => ({
      ...prev,
      priceRange: null,
    }));
  };
  const clearAllFilters = () => {
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

    setMobileFilters(cleared);
  };
  return (
    <FiltersBase
      setFilters={setMobileFilters}
      variant="mobile"
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
