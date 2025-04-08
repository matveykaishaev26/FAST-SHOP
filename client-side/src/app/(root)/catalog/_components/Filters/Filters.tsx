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
import { IFilters, IFilterOption } from "@/shared/types/filter.interface";
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

  console.log(filters);
  console.log(print);
  const isMobile = useBreakpointMatch(1024);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log(filters);
  const handleCheckboxChange = (
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
    isChecked: boolean
  ) => {
    dispatch(toggleFilter({ option, filterType, isChecked }));
  };

  const searchParams = useSearchParams();

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   const isFiltersEmpty = Object.entries(filters)
  //     .every(([, value]) => value.length === 0);
  //   if (isFiltersEmpty) {
  //     router.push(pathname);
  //     return;
  //   }

  //   Object.entries(filters)

  //     .forEach(([key, values]) => {
  //       if (values.length > 0) {
  //         params.set(key, values.map((value: IFilterOption) => value.id).join(","));
  //       }
  //     });
  //   console.log(params);

  //   const newUrl = params.size > 0 ? `?${params.toString()}` : pathname;
  //   if (newUrl !== pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")) {
  //     router.push(newUrl);
  //   }
  // }, [filters, pathname, searchParams, router]);

  const handlePriceRangeChange = useCallback(
    (range: [number, number]) => {
      dispatch(setPriceRange(range));
    },
    [dispatch]
  );

  const deleteFilters = (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
    dispatch(clearFilters({ filterType, filterId }));
  };
  if (!shouldShow) return false;

  return (
    <>
      <div className={`md:overflow-visible scrollbar-hide    ${className ?? className}`}>
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
              key={variant + index}
              filters={filters}
              deleteFilters={deleteFilters}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}
