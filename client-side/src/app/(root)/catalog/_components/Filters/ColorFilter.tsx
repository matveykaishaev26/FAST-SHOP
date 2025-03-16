"use client";
import { useGetColorsQuery } from "@/features/api/colorApi";
import { IColor } from "@/shared/types/color.interface";
import FilterBase from "./FilterBase/FilterBase";
import FilterItem from "./FilterItem";
export default function ColorFilter() {
  const { data: colors, isLoading } = useGetColorsQuery();
  console.log(colors);
  return (
    <FilterBase
      header="Цвет"
      isLoading={isLoading}
      data={colors || []}
      renderItem={(color: IColor) => {
        const isWhite = color.title === "Белый";
        const isBlack = color.title === "Чёрный";
        return (
          <FilterItem key={color.title} id={color.title}>
            <div className="flex gap-x-2">
              <div
                className="w-5 h-5  rounded-full border"
                style={{
                  backgroundColor: color.hex,
                  borderColor: isWhite || isBlack ? "border" : "transparent", // Чёрная рамка для белого цвета
                }}
              />
              <div className="text-[15px]  text-foreground  font-thin">{color.title}</div>
            </div>

            <div className="text-muted-foreground text-xs">({color.productCount})</div>
          </FilterItem>
        );
      }}
    />
  );
}
