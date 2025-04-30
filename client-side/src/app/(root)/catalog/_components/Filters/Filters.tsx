"use client";
import { useCallback, useEffect, useState } from "react";
import ColorFilter from "./ColorFilter";
import FilterChoice from "./FilterChoice";

import PriceFilter from "./PriceFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { clearFilters, setPriceRange } from "@/features/slices/filtersSlice";
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
  filtersData?: any;
  // isFiltersReady: boolean;
  // filters: any;
  // priceRange: any;
}

export default function Filters({ className, variant = "desktop", filtersData }: IFiltersProps) {
  // const { data: brands, error, isLoading: isBrandsLoading } = useGetAllBrandsQuery();
  // const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  // const { data: sizes, isLoading: isSizesLoading } = useGetSizesQuery();
  // const { data: genders, isLoading: isGendersLoading } = useGetGenderCountQuery();
  // const { data: styles, isLoading: isStylesLoading } = useGetStylesQuery();

  // const { data: materials, isLoading: isMaterialsLoading } = useGetMaterialsQuery();
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
  useGetFiltersFromUrl();

  useEffect(() => {
    updateUrlWithFilters();
  }, [filters, priceRange]);
  const isMobile = useBreakpointMatch(1024);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;
  const filtersComponents: IFilterComponent[] = [
    {
      header: "Бренды",
      filterType: "brandIds",
      data: filtersData.brands,
      isLoading: false,
    },
    {
      header: "Категории",
      filterType: "categoryIds",
      data: filtersData.categories,
      isLoading: false,
    },
    {
      header: "Размеры",
      filterType: "sizeIds",
      data: filtersData.sizes,
      isLoading: false,
    },
    {
      header: "Пол",
      filterType: "genderIds",
      data: filtersData.genders,
      isExpandable: false,
      isLoading: false,
    },

    {
      header: "Материалы",
      filterType: "materialIds",
      data: filtersData.materials,
      isLoading: false,
    },

    {
      header: "Стили",
      filterType: "styleIds",
      data: filtersData.styles,
      isLoading: false,
    },
  ];

  const deleteFilters = (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
    dispatch(clearFilters({ filterType, filterId }));
  };
  if (!shouldShow) return null;
  return (
    <div className={` relative md:overflow-visible scrollbar-hide ${className || ""}`}>
      <FilterChoice
        isAllFiltersLoading={true}
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
        <PriceFilter
          setIsFiltersLoading={setIsFiltersLoading}
          priceRange={priceRange}
          priceRangeData={filtersData.priceRange}
        />

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
        <ColorFilter
          data={filtersData.colors}
          deleteFilters={deleteFilters}
          filters={filters}
          setIsFiltersLoading={setIsFiltersLoading}
        />
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
