"use client";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Input } from "@/shared/components/ui/input";
import { useGetPriceRangeQuery } from "@/features/api/productVariantApi";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";

export default function PriceSlider() {
  const { data: priceRangeData, isLoading } = useGetPriceRangeQuery();
  const [priceRange, setPriceRange] = useState<[number, number]>([13000, 15199]);
  console.log(priceRangeData)
  return (
    <div className="space-y-2">
      <div className="text-xl font-medium cursor-pointer w-full">Цена</div>

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
              min={priceRangeData.minPrice || 1199} // Используем minPrice из данных
              max={priceRangeData.maxPrice || 32199} // Используем maxPrice из данных
              step={100}
              range
              value={priceRange}
              onChange={(newRange) => setPriceRange(newRange as [number, number])}
              style={{ width: "100%" }}
            />
            <div className="flex justify-between gap-x-5 items-center">
              <span>от</span>
              <Input
                className="h-[32px]"
                type="number"
                value={priceRange[0]}
                min={priceRangeData.minPrice || 1199} // Используем minPrice из данных или дефолтное значение
                max={priceRange[1]}
                onChange={(e) => {
                  const newMin = Math.min(Number(e.target.value), priceRange[1]);
                  setPriceRange([newMin, priceRange[1]]);
                }}
              />
              <span>до</span>
              <Input
                className="h-[32px]"
                type="number"
                value={priceRange[1]}
                min={priceRange[0]} // Минимальная цена ограничена первым значением в priceRange
                max={priceRangeData.maxPrice || 32199} // Используем maxPrice из данных или дефолтное значение
                onChange={(e) => {
                  const newMax = Math.max(Number(e.target.value), priceRange[0]);
                  setPriceRange([priceRange[0], newMax]);
                }}
              />
            </div>
          </>
        )
      )}
    </div>
  );
}
