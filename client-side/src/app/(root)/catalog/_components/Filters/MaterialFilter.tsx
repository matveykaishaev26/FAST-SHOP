"use client";
import { useGetMaterialsQuery } from "@/features/api/materialApi";
import FilterBase from "./FilterBase/FilterBase";
import { IFilterProps } from "../../types";
export default function MaterialFilter({ handleCheckboxChange, filters, deleteFilters, setIsFiltersLoading }: IFilterProps) {
  const { data: materials, isLoading } = useGetMaterialsQuery();

  return (
    <FilterBase
    setIsFiltersLoading={setIsFiltersLoading}
      handleCheckboxChange={handleCheckboxChange}
      deleteFilters={deleteFilters}
      filters={filters}
      header="Материал"
      filterType={"material"}
      isLoading={isLoading}
      data={materials || []}
    />
  );
}
