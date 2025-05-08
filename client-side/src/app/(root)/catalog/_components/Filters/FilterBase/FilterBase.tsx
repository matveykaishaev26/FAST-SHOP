"use client";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useState, useMemo, useEffect } from "react";
import { IFilterItem } from "@/shared/types/filter.interface";
import ToggleFilterList from "./ToggleFilterList";
import { IFilterProps } from "../../../types";
import FilterListItem from "./FilterListItem";
import { Input } from "@/shared/components/ui/input";
import { IFilters } from "@/shared/types/filter.interface";
import ItemsCount from "@/shared/components/ItemsCount";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleFilter } from "@/features/slices/filtersSlice";
import { useSearchParams } from "next/navigation";

export interface IFilterBaseProps<T> extends IFilterProps {
  isLoading?: boolean;
  data: T[];
  header: string;
  renderItem?: (item: T) => React.ReactNode;
  isExpandable?: boolean;
  filterType: Exclude<keyof IFilters, "priceRange">;
  variant?: "desktop" | "mobile";
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
  deleteFilters,
  variant,
}: IFilterBaseProps<T>) {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const toggleList = () => {
    setIsOpen((prev) => !prev);
    setSearchTerm("");
  };

  useEffect(() => {
    const paramValue = searchParams.get(filterType);
    const idsFromUrl = paramValue ? paramValue.split(",") : [];

    const selectedIds = new Set(filters?.[filterType]?.map((f) => f.id));

    data.forEach((item) => {
      const shouldBeChecked = idsFromUrl.includes(item.id);
      const isAlreadyChecked = selectedIds.has(item.id);

      if (shouldBeChecked !== isAlreadyChecked) {
        dispatch(toggleFilter({ option: item, filterType, isChecked: shouldBeChecked }));
      }
    });
  }, [data, filterType, dispatch]);

  const filteredItems = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const filtersCount = useMemo(() => {
    return filters?.[filterType]?.length ?? 0;
  }, [filters, filterType]);

  const renderItems = (items: T[]) => {
    return renderItem
      ? items.map(renderItem)
      : items.map((item) => (
          <FilterListItem
            variant={variant}
            key={`${variant}-${filterType}-${item.id}`}
            item={item}
            filterType={filterType}
            filters={filters}
          />
        ));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-2 w-full">
        <span className="text-xl font-medium">{header}</span>
        {filtersCount > 0 && !isLoading && (
          <ItemsCount count={filtersCount} size="md" />
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
          <div
            className={`space-y-2 w-full ${
              isExpandable ? "max-h-[240px] overflow-auto custom-scrollbar" : ""
            }`}
          >
            {isOpen && filteredItems.length === 0 ? (
              <div className="text-muted-foreground text-[14px]">
                Ничего не найдено
              </div>
            ) : (
              renderItems(isOpen ? filteredItems : data.slice(0, ITEMS_COUNT))
            )}
          </div>
          {isExpandable && (
            <ToggleFilterList
              title={isOpen ? "Свернуть" : "Посмотреть все"}
              isFiltersEmpty={filtersCount > 0}
              clearFilters={() => deleteFilters(filterType)}
              toggleList={toggleList}
            />
          )}
        </>
      )}
    </div>
  );
}
