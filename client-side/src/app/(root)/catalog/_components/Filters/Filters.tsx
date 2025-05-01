"use client";
import { useCallback, useEffect, useState } from "react";
import ColorFilter from "./ColorFilter";
import FilterChoice from "./FilterChoice";

import PriceFilter from "./PriceFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { clearFilters, setFilterId, setPriceRange } from "@/features/slices/filtersSlice";
import { IFilters, IFilterOption, IPriceRange, IFilterItem } from "@/shared/types/filter.interface";
import { useFiltersSyncWithUrl } from "@/hooks/useFiltersSyncWithUrl";
import { useGetAllBrandsQuery } from "@/features/api/brandApi";
import { useGetCategoriesQuery } from "@/features/api/categoryApi";
import { useGetSizesQuery } from "@/features/api/sizeApi";
import FilterBase from "./FilterBase/FilterBase";
import { useGetGenderCountQuery } from "@/features/api/productApi";
import { useGetMaterialsQuery } from "@/features/api/materialApi";
import { useGetStylesQuery } from "@/features/api/styleApi";
import { typeIsFiltersLoading } from "../../types";
import { useGetFiltersFromUrl } from "@/hooks/useGetFiltersFromUrl";

interface IFilterComponent {
  header: string;
  filterType: Exclude<keyof IFilters, "priceRange">;
  data: IFilterItem[] | undefined;
  isExpandable?: boolean;
  isLoading: boolean;
}
interface IFiltersProps {
  className?: string;
  variant?: "desktop" | "mobile";
  setIsOpen?: () => void;
  // filtersData?: any;
  // isFiltersReady: boolean;
  // filters: any;
  // priceRange: any;
}









export default function Filters({ className, variant = "desktop" }: IFiltersProps) {
  const { data: brands, error, isLoading: isBrandsLoading } = useGetAllBrandsQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: sizes, isLoading: isSizesLoading } = useGetSizesQuery();
  const { data: genders, isLoading: isGendersLoading } = useGetGenderCountQuery();
  const { data: styles, isLoading: isStylesLoading } = useGetStylesQuery();

  const { data: materials, isLoading: isMaterialsLoading } = useGetMaterialsQuery();
  const dispatch = useAppDispatch();
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);
  const { updateUrlWithFilters } = useFiltersSyncWithUrl(filters, priceRange);
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

  console.log(isFiltersLoading);

  const isAllFiltersLoading = Object.values(isFiltersLoading).every((item) => item === false);

  const { isFiltersReady } = useGetFiltersFromUrl();
  // useSyncReduxWithUrl();
  useEffect(() => {

    if (isFiltersReady === true) {
      updateUrlWithFilters();
    }
  }, [filters, priceRange, isFiltersReady]);
  const isMobile = useBreakpointMatch(1024);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const filtersComponents: IFilterComponent[] = [
    {
      header: "Бренды",
      filterType: "brandIds",
      data: brands,
      isLoading: isBrandsLoading,
    },
    {
      header: "Категории",
      filterType: "categoryIds",
      data: categories,
      isLoading: isCategoriesLoading,
    },
    {
      header: "Размеры",
      filterType: "sizeIds",
      data: sizes,
      isLoading: isSizesLoading,
    },
    {
      header: "Пол",
      filterType: "genderIds",
      data: genders,
      isExpandable: false,
      isLoading: isGendersLoading,
    },

    {
      header: "Материалы",
      filterType: "materialIds",
      data: materials,
      isLoading: isStylesLoading,
    },

    {
      header: "Стили",
      filterType: "styleIds",
      data: styles,
      isLoading: isMaterialsLoading,
    },
  ];

  const deleteFilters = (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
    dispatch(clearFilters({ filterType, filterId }));
  };
  if (!shouldShow) return null;
  return (
    <div className={` relative md:overflow-visible scrollbar-hide ${className || ""}`}>
      <FilterChoice
        isAllFiltersLoading={isAllFiltersLoading}
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
        <PriceFilter setIsFiltersLoading={setIsFiltersLoading} priceRange={priceRange} />

        {filtersComponents.slice(0, filtersComponents.length / 2 - 1).map((item) => (
          <FilterBase
            isLoading={item.isLoading}
            setIsFiltersLoading={setIsFiltersLoading}
            filters={filters}
            deleteFilters={deleteFilters}
            isExpandable={item.isExpandable}
            filterType={item.filterType}
            key={item.header}
            data={item.data || []}
            header={item.header}
          />
        ))}
        <ColorFilter deleteFilters={deleteFilters} filters={filters} setIsFiltersLoading={setIsFiltersLoading} />
        {filtersComponents.slice(filtersComponents.length / 2 - 1, filtersComponents.length).map((item) => (
          <FilterBase
            isLoading={item.isLoading}
            setIsFiltersLoading={setIsFiltersLoading}
            filters={filters}
            deleteFilters={deleteFilters}
            isExpandable={item.isExpandable}
            filterType={item.filterType}
            key={item.header}
            data={item.data || []}
            header={item.header}
          />
        ))}
      </div>
    </div>
  );
}
