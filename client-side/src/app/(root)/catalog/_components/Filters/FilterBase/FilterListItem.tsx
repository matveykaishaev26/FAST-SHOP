import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleFilter } from "@/features/slices/filtersSlice";
import FilterCheckbox from "../FilterCheckbox";
import { IFilterItem, IFilterOption, IFilters } from "@/shared/types/filter.interface";

interface IFilterListItem {
  item: IFilterItem;
  filters: Omit<IFilters, "priceRange">;
  filterType: Exclude<keyof IFilters, "priceRange">;
  renderItem?: any;
  variant?: "desktop" | "mobile";
}

export default function FilterListItem({ item, filterType, renderItem, variant = "desktop" }: IFilterListItem) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [localChecked, setLocalChecked] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const paramValue = params.get(filterType);
    const ids = paramValue ? paramValue.split(",") : [];
    console.log(ids);

    if (ids.includes(item.id)) {
      console.log(item.id);
      dispatch(toggleFilter({ option: item, filterType, isChecked: true }));
    }
  }, []); // пустой массив зависимостей = только при первом рендере

  // Синхронизация localChecked с URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const paramValue = params.get(filterType); // строка: "id1,id2"
    const ids = paramValue ? paramValue.split(",") : [];
    setLocalChecked(ids.includes(item.id));
  }, [searchParams, item.id, filterType]);

  const handleCheckboxChange = (checked: boolean) => {
    setLocalChecked(checked); // моментальная реакция UI

    const params = new URLSearchParams(searchParams.toString());
    const paramValue = params.get(filterType);
    const currentValues = paramValue ? paramValue.split(",") : [];

    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, item.id])];
    } else {
      newValues = currentValues.filter((id) => id !== item.id);
    }

    dispatch(toggleFilter({ option: item, filterType, isChecked: checked }));

    params.delete(filterType);
    if (newValues.length > 0) {
      params.set(filterType, newValues.join(","));
    }

    if (variant === "desktop") {
      params.delete("page");

      router.push(pathname + "?" + params.toString(), { scroll: false });
    }
  };

  return (
    <div key={item.title}>
      <FilterCheckbox
        id={item.id}
        className={`${item.productCount === 0 && "opacity-50 select-none"}`}
        checked={localChecked}
        onChange={handleCheckboxChange}
      >
        {renderItem ? (
          <>{renderItem}</>
        ) : (
          <>
            <span className="text-[15px] text-foreground font-thin">{item.title}</span>
            <div className="text-muted-foreground text-xs">({item.productCount})</div>
          </>
        )}
      </FilterCheckbox>
    </div>
  );
}
