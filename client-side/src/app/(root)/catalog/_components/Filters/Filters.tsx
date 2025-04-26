// "use client";
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

interface IFilterComponent {
  header: string;
  filterType: Exclude<keyof IFilters, "priceRange">;
  data: IFilterItem[] | undefined;
  isExpandable?: boolean;
}
interface IFiltersProps {
  className?: string;
  variant?: "desktop" | "mobile";
  setIsOpen?: () => void;
  // isFiltersReady: boolean;
  // filters: any;
  // priceRange: any;
}

export default function Filters({ className, variant = "desktop", setIsOpen }: IFiltersProps) {
  const { data: brands, error } = useGetAllBrandsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: sizes } = useGetSizesQuery();
  const { data: genders } = useGetGenderCountQuery();
  const { data: styles } = useGetStylesQuery();

  const { data: materials } = useGetMaterialsQuery();
  const dispatch = useAppDispatch();
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);

  const { updateUrlWithFilters } = useFiltersSyncWithUrl(filters, priceRange);

  useEffect(() => {
    updateUrlWithFilters();
  }, [filters, priceRange]);

  const filtersComponents: IFilterComponent[] = [
    {
      header: "Бренды",
      filterType: "brandIds",
      data: brands,
    },
    {
      header: "Категории",
      filterType: "categoryIds",
      data: categories,
    },
    {
      header: "Размеры",
      filterType: "sizeIds",
      data: sizes,
    },
    {
      header: "Пол",
      filterType: "genderIds",
      data: genders,
      isExpandable: false,
    },

    {
      header: "Материалы",
      filterType: "materialIds",
      data: materials,
    },

    {
      header: "Стили",
      filterType: "styleIds",
      data: styles,
    },
  ];

  const deleteFilters = (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
    dispatch(clearFilters({ filterType, filterId }));
  };
  return (
    <div className={` relative md:overflow-visible scrollbar-hide ${className || ""}`}>
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
        <PriceFilter setIsFiltersLoading={true} priceRange={priceRange} />

        {filtersComponents.slice(0, filtersComponents.length / 2 - 1).map((item) => (
          <FilterBase
            filters={filters}
            deleteFilters={deleteFilters}
            isExpandable={item.isExpandable}
            filterType={item.filterType}
            key={item.header}
            data={item.data || []}
            header={item.header}
          />
        ))}
        <ColorFilter deleteFilters={deleteFilters} filters={filters} />
        {filtersComponents.slice(filtersComponents.length / 2 - 1, filtersComponents.length).map((item) => (
          <FilterBase
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
