import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPriceRange } from "@/features/slices/filtersSlice";
import { IFilterOption, IPriceRange } from "@/shared/types/filter.interface";
import { usePathname, useSearchParams } from "next/navigation";
export function useFiltersSyncWithUrl(filters: Record<string, any[]>, priceRange: IPriceRange) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Функция для обновления URL с фильтрами
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.map((value: IFilterOption) => value.id).join(","));
      } else {
        params.delete(key);
      }
    });

    if (priceRange) {
      params.set("priceRange", priceRange.join("-"));
    } else {
      params.delete("priceRange");
    }

    const newUrl = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
    const currentUrl = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;

    if (newUrl !== currentUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  };
  return { updateUrlWithFilters };
}
