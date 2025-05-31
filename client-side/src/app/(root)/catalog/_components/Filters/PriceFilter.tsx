"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useEffect, useState } from "react";
import { IPriceRange } from "@/shared/types/filter.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IPriceRangeResponse } from "@/shared/types/productVariant.interface";
interface IPriceFilterProps {
  priceRange: IPriceRange;
     variant?: "desktop" | "mobile";
  priceRangeData: IPriceRangeResponse;
  setPriceRange: (priceRange :[number, number] | null) => void
}

const MAX_DEFAULT = 32199;
const MIN_DEFAULT = 1199;
export default function PriceFilter({ priceRange, priceRangeData, setPriceRange }: IPriceFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [localRange, setLocalRange] = useState<[number, number]>(
    priceRange
      ? [priceRange[0], priceRange[1]]
      : [priceRangeData?.minPrice ?? MIN_DEFAULT, priceRangeData?.maxPrice ?? MAX_DEFAULT]
  );

  useEffect(() => {
    const priceParam = searchParams.get("priceRange");
    if (priceParam) {
      const [minStr, maxStr] = priceParam.split("-");
      const min = parseInt(minStr);
      const max = parseInt(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        
        setLocalRange([min, max]);
      }
    } else {
      if (priceRange) {
        setLocalRange(priceRange);
      } else if (priceRangeData) {
        setLocalRange([priceRangeData.minPrice ?? MIN_DEFAULT, priceRangeData.maxPrice ?? MAX_DEFAULT]);
      }
    }
  }, [priceRangeData]);

  const handleAfterChange = (range: [number, number]) => {
    const defaultMin = priceRangeData?.minPrice ?? MIN_DEFAULT;
    const defaultMax = priceRangeData?.maxPrice ?? MAX_DEFAULT;

    const isDefault = range[0] === defaultMin && range[1] === defaultMax;

    const params = new URLSearchParams(searchParams);

    if (isDefault) {
      setPriceRange(null)
      // params.delete("priceRange");
    } else {
      setPriceRange(localRange)
      // params.set("priceRange", range.join("-"));
    }

    // router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <div className="space-y-2">
      <div className="text-xl text-left font-medium w-full">Цена</div>

      {false ? (
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
