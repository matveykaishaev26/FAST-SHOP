import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPriceRange } from "@/features/slices/filtersSlice";
import { IPriceRange } from "@/shared/types/filter.interface";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export function useFiltersSyncWithUrl(filters: Record<string, any[]>, priceRange: IPriceRange) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Синхронизация ценового диапазона с URL
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const newPriceRange = priceParam.split("-").map((str) => parseInt(str, 10)) as IPriceRange;

      // Проверяем, изменился ли ценовой диапазон
      if (JSON.stringify(priceRange) !== JSON.stringify(newPriceRange)) {
        dispatch(setPriceRange(newPriceRange)); // Обновляем только если значения разные
      }
    }
  }, [filters, priceRange, dispatch, searchParams]);

  // Функция для обновления URL с фильтрами
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams(searchParams);
    let hasFilters = false;

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.map((value: any) => value.id).join(","));
        hasFilters = true;
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
      const newUrl = params.size > 0 ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.replaceState(null, "", newUrl); // Обновление URL без перезагрузки
    }
  };

  return { updateUrlWithFilters };
}
