"use client";
import { useMemo, useCallback, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { IFilterItem, filtersOrder, IFilterOption, IFilters } from "@/shared/types/filter.interface";

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
  initialState: IFilters;
  setMobileFilters?: any;
}

export default function Filters({
  className,
  variant = "desktop",
  filtersData,
  initialState,
  setMobileFilters,
}: IFiltersProps) {
  const [localFilters, setLocalFilters] = useState<IFilters>(initialState);
  const { priceRange, ...filtersWithoutPrice } = localFilters;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useBreakpointMatch(1024);
  const shouldShow = variant === "desktop" ? !isMobile : isMobile;

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
  const updateUrlWithFilters = useCallback(
    (filters: IFilters) => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (key === "priceRange" && value) {
          params.set("priceRange", value);
        } else if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.map((opt: IFilterOption) => opt.id).join(","));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const debouncedUpdateUrl = useDebouncedCallback(updateUrlWithFilters, 500);

  const handleCheckboxChange = (
    checked: boolean,
    filterType: keyof Omit<IFilters, "priceRange">,
    item: IFilterOption
  ) => {
    setLocalFilters((prev) => {
      const updated = checked ? [...prev[filterType], item] : prev[filterType].filter((opt) => opt.id !== item.id);

      const newFilters = {
        ...prev,
        [filterType]: updated,
      };

      debouncedUpdateUrl(newFilters); // вызов с задержкой

      return newFilters;
    });
  };
  const setPriceRange = (priceRange: [number, number] | null) => {
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: priceRange,
    }));
  };
  const deleteFilters = useCallback(
    (filterType: Exclude<keyof IFilters, "priceRange">, filterId?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(filterType);
      const ids = current ? current.split(",") : [];

      let newFilters = { ...localFilters };

      if (filterId) {
        const newIds = ids.filter((id) => id !== filterId);
        if (newIds.length) {
          params.set(filterType, newIds.join(","));
        } else {
          params.delete(filterType);
        }

        newFilters = {
          ...newFilters,
          [filterType]: newFilters[filterType].filter((opt) => opt.id !== filterId),
        };
      } else {
        params.delete(filterType);

        newFilters = {
          ...newFilters,
          [filterType]: [],
        };
      }

      setLocalFilters(newFilters);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, localFilters]
  );

  const deletePriceRange = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceRange");

    // Обновляем локальный стейт
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: null,
    }));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceRange");
    filtersOrder.forEach((item) => params.delete(item));

    setLocalFilters((prev) => ({
      brandIds: [],
      colorIds: [],
      categoryIds: [],
      sizeIds: [],
      genderIds: [],
      materialIds: [],
      styleIds: [],
      priceRange: null,
    }));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

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
        <PriceFilter setPriceRange={setPriceRange} priceRangeData={filtersData.priceRange} priceRange={priceRange} />
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
