"use client";
import { useMemo, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
// import { useGetAllBrandsQuery } from "@/features/api/brandApi";
// import { useGetCategoriesQuery } from "@/features/api/categoryApi";
// import { useGetSizesQuery } from "@/features/api/sizeApi";
// import { useGetGenderCountQuery } from "@/features/api/productApi";
// import { useGetMaterialsQuery } from "@/features/api/materialApi";
// import { useGetStylesQuery } from "@/features/api/styleApi";

import { clearFilters, setPriceRange } from "@/features/slices/filtersSlice";
import { IFilters, IFilterItem, filtersOrder, IFilterOption } from "@/shared/types/filter.interface";

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

interface IFiltersProps {
  className?: string;
  variant?: "desktop" | "mobile";
  filtersData: IFiltersData;
}

export default function Filters({ className, variant = "desktop", filtersData }: IFiltersProps) {
  const dispatch = useAppDispatch();
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);

  // const { data: brands, isLoading: isBrandsLoading } = useGetAllBrandsQuery();
  // const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  // const { data: sizes, isLoading: isSizesLoading } = useGetSizesQuery();
  // const { data: genders, isLoading: isGendersLoading } = useGetGenderCountQuery();
  // const { data: styles, isLoading: isStylesLoading } = useGetStylesQuery();
  // const { data: materials, isLoading: isMaterialsLoading } = useGetMaterialsQuery();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useBreakpointMatch(1024);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;

  const filtersComponents = useMemo<IFilterComponent[]>(
    () => [
      { header: "Бренды", filterType: "brandIds", data: filtersData.brands, isLoading: false },
      { header: "Категории", filterType: "categoryIds", data: filtersData.brands, isLoading: false },
      { header: "Размеры", filterType: "sizeIds", data: filtersData.brands, isLoading: false },
      { header: "Пол", filterType: "genderIds", data: filtersData.brands, isExpandable: false, isLoading: false },
      { header: "Материалы", filterType: "materialIds", data: filtersData.brands, isLoading: false },
      { header: "Стили", filterType: "styleIds", data: filtersData.brands, isLoading: false },
    ],
    [
      filtersData.brands,
      filtersData.brands,
      filtersData.brands,
      filtersData.brands,
      filtersData.brands,
      filtersData.brands,
    ]
  );

  const middleIndex = Math.floor(filtersComponents.length / 2 - 1);
  const firstHalf = filtersComponents.slice(0, middleIndex);
  const secondHalf = filtersComponents.slice(middleIndex);

  const deleteFilters = useCallback(
    (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(filterType);
      const ids = current ? current.split(",") : [];

      if (filterId) {
        const newIds = ids.filter((id) => id !== filterId);
        newIds.length ? params.set(filterType, newIds.join(",")) : params.delete(filterType);
        dispatch(clearFilters({ filterType, filterId }));
      } else {
        params.delete(filterType);
        dispatch(clearFilters({ filterType }));
      }

      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [dispatch, router, pathname, searchParams]
  );
  // useEffect(() => {
  //   dispatch(clearFilters({}));
  //   dispatch(setPriceRange(null));
  // }, []);

  const clearAllFilters = useCallback(() => {
    dispatch(clearFilters({}));
    dispatch(setPriceRange(null));

    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceRange");
    filtersOrder.forEach((item) => params.delete(item));

    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [dispatch, searchParams, pathname, router]);

  if (!shouldShow) return null;

  const commonFilterBaseProps = {
    filters,
    deleteFilters,
  };

  return (
    <div className={`relative md:overflow-visible scrollbar-hide ${className || ""}`}>
      <FilterChoice
        isAllFiltersLoading={false}
        deletePriceRange={() => dispatch(setPriceRange(null))}
        priceRange={priceRange}
        filters={filters}
        deleteFilters={deleteFilters}
        clearFilters={clearAllFilters}
      />

      <div className="p-4 lg:mt-5 space-y-5 lg:p-0">
        <PriceFilter priceRangeData={filtersData.priceRange} priceRange={priceRange} />

        {firstHalf.map((item) => (
          <FilterBase variant={variant} key={item.header} {...commonFilterBaseProps} {...item} data={item.data || []} />
        ))}

        <ColorFilter colorsData={filtersData.colors} variant={variant} {...commonFilterBaseProps} />

        {secondHalf.map((item) => (
          <FilterBase variant={variant} key={item.header} {...commonFilterBaseProps} {...item} data={item.data || []} />
        ))}
      </div>
    </div>
  );
}
