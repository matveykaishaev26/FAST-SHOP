"use client";
import { useGetStylesQuery } from "@/features/api/styleApi";
import FilterBase from "./FilterBase/FilterBase";
import { IFilterProps } from "../../types";
export default function StyleFilter({
  handleCheckboxChange,
  filters,
  deleteFilters,
  setIsFiltersLoading,
}: IFilterProps) {
  const { data: styles, isLoading } = useGetStylesQuery();

  return (
    <FilterBase
      setIsFiltersLoading={setIsFiltersLoading}
      deleteFilters={deleteFilters}
      filters={filters}
      filterType={"styleIds"}
      header="Стиль"
      isLoading={isLoading}
      handleCheckboxChange={handleCheckboxChange}
      data={styles || []}
    />
  );
}
