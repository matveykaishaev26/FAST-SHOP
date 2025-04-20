"use client";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useState, useMemo } from "react";
import { IFilterItem } from "@/shared/types/entity.interface";
import ToggleFilterList from "./ToggleFilterList";
import { IFilterProps, typeIsFiltersLoading } from "../../../types";
import FilterListItem from "./FilterListItem";
import { Input } from "@/shared/components/ui/input";
import { useEffect } from "react";
import { IFilters } from "@/shared/types/filter.interface";
// import { setFilterTitle } from "@/features/slices/filtersSlice";
import { updateFilterTitles } from "@/features/slices/filtersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
export interface IFilterBaseProps<T> extends IFilterProps {
  isLoading: boolean;
  data: T[];
  header: string;
  renderItem?: (item: T) => React.ReactNode;
  isExpandable?: boolean;
  filterType: Exclude<keyof IFilters, "priceRange">;
}

const ITEMS_COUNT = 5;

export default function FilterBase<T extends IFilterItem>({
  data,
  isLoading,
  header,
  renderItem,
  filterType,
  filters,
  isExpandable = true,
  handleCheckboxChange,
  setIsFiltersLoading,
  deleteFilters,
}: IFilterBaseProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const toggleList = () => {
    setIsOpen((prev) => !prev);
    setSearchTerm("");
  };

  useEffect(() => {
    const itemsToUpdate = data
      .filter((item) => filters[filterType]?.some((f) => f.id === item.id))
      .map((item) => ({
        id: item.id,
        title: item.title,
        ...(filterType === "colorIds" && { hex: (item as any).hex }),
      }));

    if (itemsToUpdate.length > 0) {
      dispatch(updateFilterTitles({ filterType, items: itemsToUpdate }));
    }

    setIsFiltersLoading((prev) => ({
      ...prev,
      [filterType]: false,
    }));
  }, [data.length]);

  const filteredItems = useMemo(() => {
    return data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  const filtersCount = (filterType && filters && filters[filterType]?.length) || null;

  const renderItems = (items: T[]) => {
    return renderItem
      ? items.map(renderItem)
      : items.map((item) => (
          <FilterListItem
            key={`${filterType}-${item.id}`}
            item={item}
            filterType={filterType}
            filters={filters}
            handleCheckboxChange={handleCheckboxChange}
          />
        ));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-2 w-full">
        <span className="text-xl  font-medium">{header}</span>
        {filtersCount && (
          <div className="rounded-full select-none bg-red-500 text-xs h-5 w-5 flex items-center justify-center text-background">
            {filtersCount}
          </div>
        )}
      </div>
      {isLoading ? (
        <Skeleton className="h-[200px] w-full" />
      ) : (
        <>
          {isExpandable && isOpen && (
            <Input
              setValue={setSearchTerm}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Хочу найти..."
            />
          )}
          <div className={`space-y-2 w-full ${isExpandable ? "max-h-[240px] overflow-auto custom-scrollbar" : ""}`}>
            {isOpen && filteredItems.length == 0 ? (
              <div className="text-muted-foreground text-[14px]">Ничего не найдено</div>
            ) : (
              renderItems(isOpen ? filteredItems : data.slice(0, ITEMS_COUNT))
            )}
          </div>
          {isExpandable && (
            <ToggleFilterList
              title={isOpen ? "Свернуть" : "Посмотреть все"}
              isFiltersEmpty={!!filtersCount}
              clearFilters={() => deleteFilters(filterType)}
              toggleList={toggleList}
            />
          )}
        </>
      )}
    </div>
  );
}
