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
import { useFiltersSyncWithUrl } from "@/hooks/useFiltersSyncWithUrl";
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
  const [isFiltersLoading, setIsFitlersLoading] = useState<boolean>(true);
  const [isPriceRangeFilterLoading, setIsPriceRangeFilterLoading] = useState<boolean>(true);

  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUrlWithFilters } = useFiltersSyncWithUrl(filters, priceRange);
  useEffect(() => {
    updateUrlWithFilters();
  }, [filters, priceRange]);
  const handleCheckboxChange = (
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
    isChecked: boolean
  ) => {
      // setAppFilters((prevFilters) => {
      //   const prevValues = prevFilters[filterType] || [];

      //   let updatedFilters;

      //   if (isChecked) {
      //     updatedFilters = prevValues.some((item: IFilterOption | IFilterColor) => item.id === option.id)
      //       ? prevValues
      //       : [...prevValues, option];
      //   } else {
      //     updatedFilters = prevValues.filter((item: IFilterOption | IFilterColor) => item.id !== option.id);
      //   }
      //   return {
      //     ...prevFilters,
      //     [filterType]: updatedFilters,
      //   };

      //   // const updatedFilters = {
      //   //   ...prevFilters,
      //   //   [filterType]: isChecked
      //   //     ? [...prevValues.filter((item: IFilterOption | IFilterColor) => item.id !== option.id), option] // удаляем если уже был, потом добавляем
      //   //     : prevValues.filter((item: IFilterOption | IFilterColor) => item.id !== option.id),
      //   // };

      //   // return updatedFilters;

      // });

    dispatch(toggleFilter({ option, filterType, isChecked }));
  };

  const setParamsInUrl = () => {
    const params = new URLSearchParams(searchParams);

    // Добавим проверку, чтобы не удалять параметры, если фильтры не пустые
    let hasFilters = false;

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.map((value: IFilterOption) => value.id).join(","));
        hasFilters = true; // Если фильтр не пустой, добавляем флаг
      } else {
        params.delete(key);
      }
    });

    if (priceRange) {
      params.set("price", priceRange.join("-"));
    } else {
      params.delete("price");
    }

    if (hasFilters) {
      const newUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
      const currentUrl = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;

      if (newUrl !== currentUrl) {
        router.push(newUrl);
      }
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
    if (!isMobile) {
      setParamsInUrl();
    }
  }, [filters, priceRange]);

 
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
        priceRange={priceRange}
        filters={filters}
        deleteFilters={deleteFilters}
        clearFilters={() => {
          dispatch(clearFilters({}));
          dispatch(setPriceRange(null));
        }}
      />
      <div className="p-4 lg:mt-5 space-y-5 lg:p-0">
        <PriceFilter setPriceRange={handlePriceRangeChange} priceRange={priceRange} />
        {FILTER_COMPONENTS.map((Component, index) => (
          <Component
            key={`${variant}-${Component.name}-${index}`}
            filters={filters}
            deleteFilters={deleteFilters}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      <div className="fixed bottom-0 w-full bg-background border-t h-[80px] flex items-center justify-center px-4  lg:hidden ">
        <Button className="w-full uppercase">Применить фильтры</Button>
      </div>
    </div>
  );
}
