"use client";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useState, useMemo } from "react";
import { IFilterItem } from "@/shared/types/entity.interface";
import ToggleFilterList from "./ToggleFilterList";
import { IFilterProps} from "../../../types";
import FilterListItem from "./FilterListItem";
import { Input } from "@/shared/components/ui/input";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IFilters } from "@/features/slices/filtersSlice";

export interface IFilterBaseProps<T> extends IFilterProps {
  isLoading: boolean;
  data: T[];
  header: string;
  renderItem?: (item: T) => React.ReactNode;
  isExpandable?: boolean;
  filterType: keyof IFilters;
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
  deleteFilters,
}: IFilterBaseProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => {
    setIsOpen((prev) => !prev);
    setSearchTerm("");
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    const isFiltersEmpty = Object.values(filters).every((value) => value.length === 0);
    if (isFiltersEmpty) {
      const param = searchParams.get(filterType);
      console.log(param);
      if (!param || !data?.length) return;

      try {
        const query = typeof param === "string" ? param.split(",") : [param];
        console.log(query);
        query.forEach((queryId) => {
          const option = data.find((filter) => filter.id === queryId);
          console.log(option);
          if (option) {
            handleCheckboxChange(filterType, option, true);
          }
        });
      } catch (error) {
        console.error("Error parsing brand parameter:", error);
      }
    }
  }, [data]);
  const filteredItems = useMemo(() => {
    return data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  const filtersCount = (filterType && filters && filters[filterType]?.length) || null;

  const renderItems = (items: T[]) => {
    return renderItem
      ? items.map(renderItem)
      : items.map((item) => (
          <FilterListItem
            key={item.id}
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
        <span className="text-xl  font-medium cursor-pointer">{header}</span>
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
