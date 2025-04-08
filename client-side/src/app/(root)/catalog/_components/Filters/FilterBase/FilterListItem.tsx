import { IFilters } from "@/shared/types/filter.interface";
import { isChecked } from "../../../_utils/isChecked";
import {  IHandleCheckboxChange } from "../../../types";
import FilterCheckbox from "../FilterCheckbox";
import { IFilterItem } from "@/shared/types/entity.interface";
interface IFilterListItem extends IHandleCheckboxChange {
  item: IFilterItem;
  filters: Omit<IFilters, "priceRange">;
  filterType: Exclude<keyof IFilters, "priceRange">
}
export default function FilterListItem({ item, filters, handleCheckboxChange, filterType }: IFilterListItem) {
  return (
    <div key={item.title}>
      <FilterCheckbox
        id={item.id}
        checked={isChecked(filters, filterType, item.id)}
        onChange={(checked) => handleCheckboxChange(filterType, item, checked)}
      >
        <span className="text-[15px] text-foreground font-thin">{item.title}</span>
        <div className="text-muted-foreground text-xs">({item.productCount})</div>
      </FilterCheckbox>
    </div>
  );
}
