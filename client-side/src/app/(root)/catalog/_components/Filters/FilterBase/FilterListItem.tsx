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
  handleCheckboxChange: any;
}

export default function FilterListItem({
  item,
  filterType,
  renderItem,
  filters,
  variant = "desktop",
  handleCheckboxChange,
}: IFilterListItem) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paramValue = searchParams.get(filterType);
  const ids = paramValue ? paramValue.split(",") : [];
  const isChecked = filters[filterType].some(option => option.id === item.id)
  // const isChecked = ids.includes(item.id);

  const onChange = (checked: boolean) => {
    handleCheckboxChange(checked, filterType, item);
  };

  return (
    <div key={item.title}>
      <FilterCheckbox
        id={item.id}
        className={`${item.productCount === 0 && "opacity-50 select-none"}`}
        checked={isChecked}
        onChange={onChange}
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
