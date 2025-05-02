"use client";
import { useGetColorsQuery } from "@/features/api/colorApi";
import FilterBase from "./FilterBase/FilterBase";
import FilterCheckbox from "./FilterCheckbox";
import { IFilterProps } from "../../types";
import { IColor } from "@/shared/types/color.interface";
import FilterListItem from "./FilterBase/FilterListItem";
interface IFilterFolorProps extends IFilterProps {}
export default function ColorFilter({ filters, deleteFilters, variant }: IFilterFolorProps) {
  const { data: colors, isLoading } = useGetColorsQuery();
  const filterType = "colorIds";
  return (
    <FilterBase
      // setIsFiltersLoading={setIsFiltersLoading}
      deleteFilters={deleteFilters}
      filters={filters}
      header="Цвет"
      isLoading={isLoading}
      filterType={filterType}
      data={colors || []}
      renderItem={(color: IColor) => {
        const isWhite = color.title === "Белый";
        const isBlack = color.title === "Чёрный";
        // const isChecked = filters?.[filterType]?.some((f) => f.id === color.id) ?? false;

        return (
          <FilterListItem
            variant={variant}
            key={`${filterType}-${color.id}`}
            item={color}
            filterType={filterType}
            filters={filters}
            renderItem={
              <>
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
              </>
            }
          ></FilterListItem>
        );
      }}
    />
  );
}
