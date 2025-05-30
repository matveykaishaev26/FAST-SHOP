"use client";
import { useMemo, useCallback, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { IFilterItem, filtersOrder, IFilterOption, IFilters, IFilterColor } from "@/shared/types/filter.interface";

import FilterChoice from "./FilterChoice";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import FilterBase from "./FilterBase/FilterBase";
import { IFiltersData } from "../../utils/fetchFiltersData";

interface IFilterComponent {
  header: string;
  filterType: Exclude<keyof IFilters, "priceRange">;
  data: IFilterItem[] | undefined;
  isExpandable?: boolean;
  isLoading: boolean;
}

interface IFiltersBaseProps {
  className?: string;
  variant?: "desktop" | "mobile";
  filtersData: IFiltersData;

  filtersWithoutPrice: Omit<IFilters, "priceRange">;
  priceRange: [number, number] | null;

  deletePriceRange: () => void;
  deleteFilters: (
    filterType: keyof Omit<IFilters, "priceRange">,
    filterId?: string
  ) => void;
  clearAllFilters: () => void;

  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  setPriceRange: (priceRange: [number, number] | null) => void;
}


export default function FiltersBase({
  variant = "desktop",
  filtersData,
  filtersWithoutPrice,
  priceRange,
  deletePriceRange,
  setFilters,
  deleteFilters,
  setPriceRange,
  clearAllFilters,
  className,
}: IFiltersBaseProps) {
  const router = useRouter();

  const isMobile = useBreakpointMatch(1024);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const updateUrlWithFilters = useCallback(
    (filters: IFilters) => {
      if (variant === "mobile") return; // ❗ не трогаем URL
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (key === "priceRange" && value) {
          params.set("priceRange", value.join("-"));
        } else if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.map((opt: IFilterOption) => opt.id).join(","));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, variant]
  );
  const debouncedUpdateUrl = useDebouncedCallback(updateUrlWithFilters, 500);

  const handleCheckboxChange = (
    checked: boolean,
    filterType: keyof Omit<IFilters, "priceRange">,
    item: IFilterOption
  ) => {
    setFilters((prev) => {
      const updated = checked ? [...prev[filterType], item] : prev[filterType].filter((opt) => opt.id !== item.id);

      const newFilters = {
        ...prev,
        [filterType]: updated,
      };
      if (variant === "desktop") debouncedUpdateUrl(newFilters); // вызов с задержкой

      return newFilters;
    });
  };
  const filtersComponents = useMemo<IFilterComponent[]>(
    () => [
      { header: "Бренды", filterType: "brandIds", data: filtersData.brands, isLoading: false },
      { header: "Категории", filterType: "categoryIds", data: filtersData.categories, isLoading: false },
      { header: "Размеры", filterType: "sizeIds", data: filtersData.sizes, isLoading: false },
      { header: "Пол", filterType: "genderIds", data: filtersData.genders, isExpandable: false, isLoading: false },
      { header: "Материалы", filterType: "materialIds", data: filtersData.materials, isLoading: false },
      { header: "Стили", filterType: "styleIds", data: filtersData.styles, isLoading: false },
    ],
    [filtersData]
  );

  if (!shouldShow) return null;

  const commonFilterBaseProps = {
    filters: filtersWithoutPrice,
    deleteFilters,
  };

  const middleIndex = Math.floor(filtersComponents.length / 2 - 1);
  const firstHalf = filtersComponents.slice(0, middleIndex);
  const secondHalf = filtersComponents.slice(middleIndex);

  return (
    <div className={`relative md:overflow-visible scrollbar-hide ${className || ""}`}>
      <FilterChoice
        isAllFiltersLoading={false}
        deletePriceRange={deletePriceRange}
        priceRange={priceRange}
        filters={filtersWithoutPrice}
        deleteFilters={deleteFilters}
        clearFilters={clearAllFilters}
      />

      <div className="p-4 lg:mt-5 space-y-5 lg:p-0">
        <PriceFilter variant={variant} setPriceRange={setPriceRange} priceRangeData={filtersData.priceRange} priceRange={priceRange} />
        {firstHalf.map((item) => (
          <FilterBase
            handleCheckboxChange={handleCheckboxChange}
            variant={variant}
            key={item.header}
            {...commonFilterBaseProps}
            {...item}
            data={item.data || []}
          />
        ))}

        <ColorFilter
          handleCheckboxChange={handleCheckboxChange}
          colorsData={filtersData.colors}
          variant={variant}
          {...commonFilterBaseProps}
        />

        {secondHalf.map((item) => (
          <FilterBase
            handleCheckboxChange={handleCheckboxChange}
            variant={variant}
            key={item.header}
            {...commonFilterBaseProps}
            {...item}
            data={item.data || []}
          />
        ))}
      </div>
    </div>
  );
}
