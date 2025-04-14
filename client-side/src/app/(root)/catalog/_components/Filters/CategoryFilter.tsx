"use client";
import { IFilterProps } from "../../types";
import FilterBase from "./FilterBase/FilterBase";
import { useGetCategoriesQuery } from "@/features/api/categoryApi";
export default function CategoryFilter({
  handleCheckboxChange,
  filters,
  deleteFilters,
  setIsFiltersLoading,
}: IFilterProps) {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <FilterBase
      setIsFiltersLoading={setIsFiltersLoading}
      deleteFilters={deleteFilters}
      filters={filters}
      filterType={"categoryIds"}
      header="Категория"
      handleCheckboxChange={handleCheckboxChange}
      isLoading={isLoading}
      data={categories || []}
    />
  );
}
