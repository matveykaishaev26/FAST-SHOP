"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Input } from "@/shared/components/ui/input";
import { useGetPriceRangeQuery } from "@/features/api/productVariantApi";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useEffect } from "react";
import { IPriceRange } from "@/shared/types/filter.interface";
import { useSearchParams } from "next/navigation";

interface IPriceFilterProps {
  setPriceRange: any;
  priceRange: IPriceRange;
}

const MAX_DEFAULT = 32199;
const MIN_DEFAULT = 1199;
export default function PriceFilter({ setPriceRange, priceRange }: IPriceFilterProps) {
  const { data: priceRangeData, isLoading } = useGetPriceRangeQuery();

  useEffect(() => {
    if (
      priceRange &&
      priceRange[0] === priceRangeData?.minPrice &&
      priceRange[1] === priceRangeData?.maxPrice
    ) {
      setPriceRange(null);
    }
  }, [priceRange]);
 

  return (
    <div className="space-y-2">
      <div className="text-xl text-left font-medium cursor-pointer w-full">Цена</div>

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
              value={priceRange ?? [priceRangeData?.minPrice || MIN_DEFAULT, priceRangeData?.maxPrice || MAX_DEFAULT]}
              onChange={(newRange) => {
                setPriceRange(newRange as [number, number]);
              }}
              style={{ width: "100%" }}
            />
            <div className="flex justify-between gap-x-3 items-center">
              <span>от</span>
              <Input
                className="h-[32px]"
                type="number"
                value={(priceRange?.[0] ?? priceRangeData?.minPrice ?? MIN_DEFAULT).toString()}
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
                value={(priceRange?.[1] ?? priceRangeData?.maxPrice ?? MAX_DEFAULT).toString()}
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
