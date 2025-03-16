"use client";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useState } from "react";
import FilterItem from "../FilterItem";
import { IFilterItem } from "@/shared/types/entity.interface";
import OpenFilterBase from "./OpenFilterBase";
export interface IFilterBaseProps<T> {
  isLoading: boolean;
  data: T[];
  header: string;
  renderItem?: (item: T) => React.ReactNode;
  isAlphabeticalOrder?: boolean;
  isExpandable?: boolean;
}

const ITEMS_COUNT = 5;

export default function FilterBase<T extends IFilterItem>({
  data,
  isLoading,
  header,
  renderItem,
  isAlphabeticalOrder,
  isExpandable = true,
}: IFilterBaseProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
    setSearchTerm("");
  };
  const filteredItems = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-2">
      <div className="text-xl font-medium cursor-pointer w-full">{header}</div>
      {isLoading ? (
        <Skeleton className="h-[200px] w-full" />
      ) : isOpen && isExpandable === true ? (
        <>
          <OpenFilterBase
            data={data}
            searchTerm={searchTerm}
            filteredItems={filteredItems}
            isAlphabeticalOrder={isAlphabeticalOrder}
            renderItem={renderItem}
            setSearchTerm={setSearchTerm}
            toggleList={toggleList}
          />
        </>
      ) : (
        <>
          <div className="space-y-2">
            {renderItem
              ? data.slice(0, ITEMS_COUNT).map(renderItem)
              : data.slice(0, ITEMS_COUNT).map((item) => (
                  <div key={item.title}>
                    <FilterItem id={item.title}>
                      <span className="text-[15px]  text-foreground  font-thin">{item.title}</span>
                      <div className="text-muted-foreground text-xs">({item.productCount})</div>
                    </FilterItem>
                  </div>
                ))}
          </div>
          {isExpandable === true && (
            <div onClick={toggleList} className="text-primary cursor-pointer">
              Посмотреть все
            </div>
          )}
        </>
      )}
    </div>
  );
}
