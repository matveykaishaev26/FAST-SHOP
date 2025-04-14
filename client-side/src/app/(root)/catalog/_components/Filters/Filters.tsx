"use client";
import BrandFilter from "./BrandFilter";
import { useCallback, useEffect, useState } from "react";
import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import FilterChoice from "./FilterChoice";
import SizeFilter from "./SizeFilter";
import StyleFilter from "./StyleFilter";
import GenderFilter from "./GenderFilter";
import MaterialFilter from "./MaterialFilter";
import PriceFilter from "./PriceFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { clearFilters, setPriceRange, toggleFilter } from "@/features/slices/filtersSlice";
import { IFilters, IFilterOption, IPriceRange } from "@/shared/types/filter.interface";
import { useFiltersSyncWithUrl } from "@/hooks/useFiltersSyncWithUrl";
import { typeIsFiltersLoading } from "../../types";
import { Button } from "@/shared/components/ui/button";
const FILTER_COMPONENTS = [
  BrandFilter,
  ColorFilter,
  SizeFilter,
  CategoryFilter,
  StyleFilter,
  GenderFilter,
  MaterialFilter,
];

interface IFiltersProps {
  className?: string;
  variant?: "desktop" | "mobile";
  setIsOpen?: () => void;
  isFiltersReady: boolean;
  filters: any;
  priceRange: any;
}

export default function Filters({ className, variant = "desktop", setIsOpen, isFiltersReady, filters, priceRange }: IFiltersProps) {
  const pathname = usePathname();
  const { updateUrlWithFilters } = useFiltersSyncWithUrl(filters, priceRange);
  const isMobile = useBreakpointMatch(1024);
  const [isFiltersLoading, setIsFiltersLoading] = useState<typeIsFiltersLoading>({
    categoryIds: true,
    sizeIds: true, 
    colorIds: true,
    genderIds: true,
    brandIds: true,
    materialIds: true,
    styleIds: true,
    priceRange: true,
  });
  const isAllFiltersLoading = Object.values(isFiltersLoading).every((item) => item === false);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
    isChecked: boolean
  ) => {
    dispatch(toggleFilter({ option, filterType, isChecked }));  
  };

  

  useEffect(() => {
    if (isAllFiltersLoading) {
      updateUrlWithFilters();
    }
  }, [filters, priceRange, isAllFiltersLoading]);

    

  const deleteFilters = (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
    dispatch(clearFilters({ filterType, filterId }));
  };

  if (!shouldShow) return null;
  return (
    <div className={` relative md:overflow-visible scrollbar-hide ${className || ""}`}>
      <FilterChoice
        deletePriceRange={() => {
          dispatch(setPriceRange(null));
        }}
        isFiltersLoading={isAllFiltersLoading}
        priceRange={priceRange}
        filters={filters}
        deleteFilters={deleteFilters}
        clearFilters={() => {
          dispatch(clearFilters({}));
          dispatch(setPriceRange(null));
        }}
      />
      <div className="p-4 lg:mt-5 space-y-5 lg:p-0">
        <PriceFilter
          setIsFiltersLoading={setIsFiltersLoading}
          priceRange={priceRange}
        />
        {FILTER_COMPONENTS.map((Component, index) => (
          <Component
            setIsFiltersLoading={setIsFiltersLoading}
            key={`${variant}-${Component.name}-${index}`}
            filters={filters}
            deleteFilters={deleteFilters}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      {/* <div className="fixed bottom-0  w-full bg-background border-t h-[80px] flex items-center justify-center px-4  lg:hidden ">
        <Button
          onClick={() => {
            // setParamsInUrl();
            updateUrlWithFilters();
            if (setIsOpen) setIsOpen();
          }}
          className="w-full uppercase"
        >
          Применить фильтры
        </Button>
      </div> */}
    </div>
  );
}
