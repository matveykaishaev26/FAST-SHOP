"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Input } from "@/shared/components/ui/input";
import { useGetPriceRangeQuery } from "@/features/api/productVariantApi";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useEffect, useState } from "react";
import { IPriceRange } from "@/shared/types/filter.interface";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setPriceRange } from "@/features/slices/filtersSlice";
import { typeIsFiltersLoading } from "../../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface IPriceFilterProps {
  priceRange: IPriceRange;

}

const MAX_DEFAULT = 32199;
const MIN_DEFAULT = 1199;
export default function PriceFilter({ priceRange }: IPriceFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: priceRangeData, isLoading } = useGetPriceRangeQuery();
  const [localRange, setLocalRange] = useState<[number, number]>(
    priceRange
      ? [priceRange[0], priceRange[1]]
      : [priceRangeData?.minPrice ?? MIN_DEFAULT, priceRangeData?.maxPrice ?? MAX_DEFAULT]
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const priceParam = searchParams.get("priceRange");

    if (priceParam) {
      const [minStr, maxStr] = priceParam.split("-");
      const min = parseInt(minStr);
      const max = parseInt(maxStr);
      if (min && max) dispatch(setPriceRange([min, max]));
    }
  }, []);
  useEffect(() => {
    if (priceRange) {
      setLocalRange(priceRange);
    } else if (priceRangeData) {
      setLocalRange([priceRangeData.minPrice ?? MIN_DEFAULT, priceRangeData.maxPrice ?? MAX_DEFAULT]);
    }
  }, [priceRangeData]);
  useEffect(() => {
    if (priceRange && priceRange[0] === priceRangeData?.minPrice && priceRange[1] === priceRangeData?.maxPrice) {
      dispatch(setPriceRange(null));
      const params = new URLSearchParams(searchParams);
      params.delete("priceRange");
      router.push(pathname + "?" + params.toString(), { scroll: false });
    }
  }, [priceRange]);

  const handleAfterChange = (range: [number, number]) => {
    const params = new URLSearchParams(searchParams);
    params.set("priceRange", range.join("-"));
    router.push(pathname + "?" + params.toString(), { scroll: false });

    dispatch(setPriceRange(range));
  };

  return (
    <div className="space-y-2">
      <div className="text-xl text-left font-medium w-full">Цена</div>

      {isLoading ? (
        <Skeleton className="h-[80px] w-full" />
      ) : (
        priceRangeData && (
          <>
            <Slider
              styles={{
                handle: {
                  backgroundColor: "hsl(var(--primary))",
                  borderColor: "hsl(var(--primary))",
                  width: "16px",
                  height: "16px",
                  marginTop: "-5px",
                  opacity: 1,
                  boxShadow: "none",
                },
                track: {
                  backgroundColor: "hsl(var(--primary))",
                  height: "6px",
                },
                rail: {
                  backgroundColor: "hsl(var(--muted))",
                  height: "6px",
                },
              }}
              min={priceRangeData?.minPrice || MIN_DEFAULT}
              max={priceRangeData?.maxPrice || MAX_DEFAULT}
              step={1}
              range
              value={localRange}
              onChange={(newRange) => setLocalRange(newRange as [number, number])}
              onChangeComplete={(newRange) => handleAfterChange(newRange as [number, number])}
              style={{ width: "100%" }}
            />
            <div className="flex justify-between gap-x-3 items-center">
              <span>от</span>
              <Input
                className="h-[32px]"
                type="number"
                value={localRange[0].toString()}
                // min={priceRangeData?.minPrice || MIN_DEFAULT}
                // max={priceRangeData?.maxPrice || MAX_DEFAULT}
                // onChange={(e) => {
                //   const newMin = Math.min(Number(e.target.value), priceRange[1]);
                //   setPriceRange([newMin, priceRange[1]]);
                // }}
                readOnly
              />
              <span>до</span>
              <Input
                className="h-[32px]"
                type="number"
                value={localRange[1].toString()}
                // min={priceRangeData?.minPrice || MIN_DEFAULT}
                // max={priceRangeData?.maxPrice || MAX_DEFAULT}
                // onChange={(e) => {
                //   const newMax = Math.max(Number(e.target.value), priceRange[0]);
                //   setPriceRange([priceRange[0], newMax]);
                // }}
                readOnly
              />
            </div>
          </>
        )
      )}
    </div>
  );
}
