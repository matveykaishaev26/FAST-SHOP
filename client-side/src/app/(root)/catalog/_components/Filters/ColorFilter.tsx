"use client";
import { useGetColorsQuery } from "@/features/api/colorApi";
import FilterBase from "./FilterBase/FilterBase";
import FilterCheckbox from "./FilterCheckbox";
import { IFilterProps } from "../../types";
import { IColor } from "@/shared/types/color.interface";
export default function ColorFilter({ handleCheckboxChange, filters, deleteFilters, setIsFiltersLoading }: IFilterProps) {
  const { data: colors, isLoading } = useGetColorsQuery();
  const filterType = "colorIds";
  return (
    <FilterBase
    setIsFiltersLoading={setIsFiltersLoading}
      deleteFilters={deleteFilters}
      filters={filters}
      handleCheckboxChange={handleCheckboxChange}
      header="Цвет"
      isLoading={isLoading}
      filterType={filterType}
      data={colors || []}
      renderItem={(color: IColor) => {
        const isWhite = color.title === "Белый";
        const isBlack = color.title === "Чёрный";
        const isChecked = filters?.[filterType]?.some((f) => f.id === color.id) ?? false;

        return (
          <FilterCheckbox
            checked={isChecked}
            onChange={(checked) => handleCheckboxChange(filterType, color, checked)}
            key={color.title}
            id={color.title}
          >
            <div className="flex gap-x-2">
              <div
                className="w-5 h-5  rounded-full border"
                style={{
                  backgroundColor: color.hex,
                  borderColor: isWhite || isBlack ? "border" : "border-0",
                }}
              />
              <div className="text-[15px]  text-foreground  font-thin">{color.title}</div>
            </div>

            <div className="text-muted-foreground text-xs">({color.productCount})</div>
          </FilterCheckbox>
        );
      }}
    />
  );
}
