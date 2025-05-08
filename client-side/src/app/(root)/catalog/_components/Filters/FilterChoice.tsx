import { Button } from "@/shared/components/ui/button";
import { IFilters, IPriceRange, IFilterColor } from "@/shared/types/filter.interface";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
interface IFiltersChoice {
  deleteFilters: (filterType: Exclude<keyof IFilters, "priceRange">, itemId: string) => void;
  clearFilters: () => void;
  filters: Omit<IFilters, "priceRange">;
  priceRange: IPriceRange;
  deletePriceRange: () => void;
  isAllFiltersLoading: boolean;
}

const ITEMS_COUNT = 10;

export default function FilterChoice({
  deleteFilters,
  clearFilters,
  filters,
  priceRange,
  deletePriceRange,
  isAllFiltersLoading,
}: IFiltersChoice) {
  const [isOpen, setIsOpen] = useState(false);

  const allFilters = useMemo(() => {
    return Object.entries(filters).flatMap(([filterType, values]) => {
      if (!Array.isArray(values)) return [];
      return values.map((value) => ({ ...value, filterType: filterType as Exclude<keyof IFilters, "priceRange"> }));
    });
  }, [filters]);

  const displayedFilters = isOpen ? allFilters : allFilters.slice(0, ITEMS_COUNT);
  const isFiltersEmpty = Object.values(filters).every((values) => values.length === 0);
  const isPriceRangeEmpty = priceRange === null;

  return (
    <div className="bg-background sticky z-50 top-[60px] border-b lg:border-b p-4 lg:p-0 lg:relative lg:z-0 lg:top-0 lg:border-none">
      <div className="bg-background">
        <div className="flex justify-between items-center">
          <div className="font-medium text-xl">Ваш выбор</div>
          <Button
            disabled={isFiltersEmpty && isPriceRangeEmpty}
            className="text-muted-foreground select-none"
            variant="outline"
            onClick={clearFilters}
          >
            Сбросить
          </Button>
        </div>

        <div className="max-h-[300px] hide-scrollbar overflow-auto flex flex-wrap mt-2 gap-1">
          {isAllFiltersLoading ? (
            <Skeleton className="h-8  w-full" />
          ) : (
            <>
              {priceRange && (
                <Button onClick={deletePriceRange} className="text-xs h-8 px-2" variant="secondary" key={priceRange[0]}>
                  <span>{`${priceRange[0]}₽ - ${priceRange[1]}₽`}</span>
                  <X className="text-muted-foreground ml-1" size={10} />
                </Button>
              )}

              {displayedFilters.map((item) => (
                <Button
                  onClick={() => deleteFilters(item.filterType, item.id)}
                  className="text-xs h-8 px-2"
                  variant="secondary"
                  key={item.id}
                >
                  {item.filterType === "colorIds" && (
                    <div
                      className="w-4 h-4 rounded-full border mr-1"
                      style={{ backgroundColor: (item as IFilterColor).hex }}
                    />
                  )}
                  <span>{item.title}</span>
                  <X className="text-muted-foreground ml-1" size={10} />
                </Button>
              ))}
            </>
          )}
        </div>

        {allFilters.length > ITEMS_COUNT && (
          <div className="text-primary text-base cursor-pointer mt-2" onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? "Свернуть" : "Посмотреть все"}
          </div>
        )}
      </div>
    </div>
  );
}