"use client";
import { IFilterProps } from "../../types";
import FilterBase from "./FilterBase/FilterBase";
import { useGetSizesQuery } from "@/features/api/sizeApi";
export default function SizeFilter({ handleCheckboxChange, filters, deleteFilters , setIsFiltersLoading}: IFilterProps) {
  const { data, isLoading } = useGetSizesQuery();
  return (
    <FilterBase
    setIsFiltersLoading={setIsFiltersLoading}
      handleCheckboxChange={handleCheckboxChange}
      deleteFilters={deleteFilters}
      filterType={"size"}
      filters={filters}
      header="Размер"
      isLoading={isLoading}
      data={data || []}
    />
  );
}
