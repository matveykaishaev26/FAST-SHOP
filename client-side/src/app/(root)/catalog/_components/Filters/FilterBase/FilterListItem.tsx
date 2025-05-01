import { IFilterOption, IFilters } from "@/shared/types/filter.interface";
import { isChecked } from "../../../_utils/isChecked";
import { IHandleCheckboxChange } from "../../../types";
import FilterCheckbox from "../FilterCheckbox";
import { IFilterItem } from "@/shared/types/filter.interface";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleFilter, updateFilterTitles } from "@/features/slices/filtersSlice";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IFilterListItem {
  item: IFilterItem;
  filters: Omit<IFilters, "priceRange">;
  filterType: Exclude<keyof IFilters, "priceRange">;
  renderItem?: any;
}

export default function FilterListItem({
  item,
  filters,
  filterType,
  renderItem,
}: IFilterListItem) {
  const dispatch = useAppDispatch();

  const isChecked = filters[filterType]?.some((f) => f.id === item.id);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleCheckboxChange = (
    filterType: Exclude<keyof IFilters, "priceRange">,
    option: IFilterOption,
    isChecked: boolean
  ) => {
    dispatch(toggleFilter({ option, filterType, isChecked }));

    // Обновляем параметры URL с page=1
    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.delete('page'); // Удаляем параметр 'page'
    
    // // Обновляем URL без параметра 'page'
    // window.history.pushState({}, '', '?' + searchParams.toString());
  };

  return (
    <div key={item.title}>
      <FilterCheckbox
        id={item.id}
        className={`${item.productCount === 0 && "opacity-50 select-none"}`}
        checked={isChecked} // ✅ используем переменную, а не функцию
        onChange={(checked) => handleCheckboxChange(filterType, item, checked)}
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
