import { filtersOrder } from "@/shared/types/filter.interface";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { setFilterId, setPriceRange } from "@/features/slices/filtersSlice";

export const useGetFiltersFromUrl = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    filtersOrder.map((filterType) => {
      const param = searchParams.get(filterType);
      if (param) {
        const queryIds = param.split(",");
        queryIds.forEach((id) => dispatch(setFilterId({ filterType, filterId: id })));
      }
    });

    const priceParam = searchParams.get("priceRange");
    if (priceParam) {
      const [minStr, maxStr] = priceParam.split("-");
      const min = parseInt(minStr);
      const max = parseInt(maxStr);
      if (min && max) dispatch(setPriceRange([min, max]));
    }
  }, []);
};
