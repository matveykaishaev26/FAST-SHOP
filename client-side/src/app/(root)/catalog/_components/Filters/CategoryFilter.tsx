"use client";
import { IFilterProps } from "../../types";
import FilterBase from "./FilterBase/FilterBase";
import { useGetCategoriesQuery } from "@/features/api/categoryApi";
export default function CategoryFilter({ handleCheckboxChange, filters, deleteFilters }: IFilterProps) {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <FilterBase
      deleteFilters={deleteFilters}
      filters={filters}
      filterType={"category"}
      header="Категория"
      handleCheckboxChange={handleCheckboxChange}
      isLoading={isLoading}
      data={categories || []}
    />
  );
}
