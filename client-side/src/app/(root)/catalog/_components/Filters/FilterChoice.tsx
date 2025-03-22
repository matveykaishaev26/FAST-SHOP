import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { IFilters, IPriceRange } from "../../types";
import { useState } from "react";
interface IFiltersChoice {
  deleteFilters: (filterType: keyof IFilters, itemId: string) => void;
  clearFilters: () => void;
  filters: IFilters;
  priceRange: IPriceRange;
  deletePriceRange: () => void;
}

const ITEMS_COUNT = 10;

export default function FilterChoice({
  deleteFilters,
  clearFilters,
  filters,
  priceRange,
  deletePriceRange,
}: IFiltersChoice) {
  const [isOpen, setIsOpen] = useState(false);

  const allFilters = Object.entries(filters).flatMap(([filterType, values]) => {
    if (!Array.isArray(values)) return [];

    return values.map((value) => ({ ...value, filterType: filterType as keyof IFilters }));
  });

  const displayedFilters = isOpen ? allFilters : allFilters.slice(0, ITEMS_COUNT);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-[16px] font-medium">Ваш выбор</div>
        <Button className="text-muted-foreground" variant="link" onClick={clearFilters}>
          Сбросить
        </Button>
      </div>

      <div className="flex flex-wrap gap-1">
        {priceRange && (
          <Button onClick={deletePriceRange} className="text-xs h-8 px-2" variant="secondary" key={priceRange[0]}>
            <span>{`${priceRange[0]} - ${priceRange[1]}`}</span>
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
            {item.hex && <div className="w-4 h-4 rounded-full border mr-1" style={{ backgroundColor: item.hex }} />}

            <span>{item.title}</span>
            <X className="text-muted-foreground ml-1" size={10} />
          </Button>
        ))}
      </div>

      {allFilters.length > ITEMS_COUNT && (
        <div className="text-primary text-base cursor-pointer mt-2" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? "Свернуть" : "Посмотреть все"}
        </div>
      )}
    </div>
  );
}
