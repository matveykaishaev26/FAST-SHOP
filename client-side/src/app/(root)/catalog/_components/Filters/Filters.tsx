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
import { Button } from "@/shared/components/ui/button";
import { typeIsFiltersLoading } from "../../types";
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
}

export default function Filters({ className, variant = "desktop" }: IFiltersProps) {
  const pathname = usePathname();
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);

  const isMobile = useBreakpointMatch(1024);
  const [isFiltersLoading, setIsFiltersLoading] = useState<typeIsFiltersLoading>({
    category: true,
    size: true,
    color: true,
    gender: true,
    brand: true,
    material: true,
    style: true,
    priceRange: true,
  });
  const isAllFiltersLoading = Object.values(isFiltersLoading).every((item) => item === false);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
    isChecked: boolean
  ) => {
    dispatch(toggleFilter({ option, filterType, isChecked }));
  };

  const setParamsInUrl = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.map((value: IFilterOption) => value.id).join(","));
      } else {
        params.delete(key);
      }
    });

    if (priceRange) {
      params.set("price", priceRange.join("-"));
    } else {
      params.delete("price");
    }

    const newUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
    const currentUrl = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;

    if (newUrl !== currentUrl) {
      window.history.replaceState(null, '', newUrl)
      // router.replace(newUrl, undefined, { shallow: true });

    }
  };
  useEffect(() => {
    const priceRangeParam = searchParams.get("price");
    console.log(priceRangeParam);
    if (priceRangeParam) {
      const priceRange = priceRangeParam?.split("-").map((item) => Number(item));
      console.log(priceRange);
      dispatch(setPriceRange(priceRange as IPriceRange));
    }
  }, []);

  useEffect(() => {
    if (!isMobile && isAllFiltersLoading) {
      setParamsInUrl();
    }
  }, [filters, priceRange, isAllFiltersLoading]);

  const handlePriceRangeChange = useCallback(
    (range: [number, number]) => {
      dispatch(setPriceRange(range));
    },
    [dispatch]
  );

  const deleteFilters = (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
    dispatch(clearFilters({ filterType, filterId }));
  };

  if (!shouldShow) return null;

  return (
    <div className={`md:overflow-visible scrollbar-hide ${className || ""}`}>
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
          setPriceRange={handlePriceRangeChange}
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
      <div className="fixed bottom-0 w-full bg-background border-t h-[80px] flex items-center justify-center px-4  lg:hidden ">
        <Button onClick={setParamsInUrl} className="w-full uppercase">Применить фильтры</Button>
      </div>
    </div>
  );
}
