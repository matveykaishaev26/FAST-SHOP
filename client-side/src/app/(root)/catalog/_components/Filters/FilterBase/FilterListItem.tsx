import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { toggleFilter } from "@/features/slices/filtersSlice";
import FilterCheckbox from "../FilterCheckbox";
import { IFilterItem, IFilters } from "@/shared/types/filter.interface";

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

  const paramValue = searchParams.get(filterType);
  const ids = paramValue ? paramValue.split(",") : [];
  const isChecked = ids.includes(item.id);

  // useEffect(() => {
  //   dispatch(toggleFilter({ option: item, filterType, isChecked: isChecked }));
  // }, []);

  const handleCheckboxChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(filterType) ? params.get(filterType)!.split(",") : [];

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
        checked={isChecked}
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
