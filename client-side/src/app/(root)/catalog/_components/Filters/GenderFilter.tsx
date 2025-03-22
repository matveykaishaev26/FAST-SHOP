"use client";
import { useGetGenderCountQuery } from "@/features/api/productApi";
import FilterBase from "./FilterBase/FilterBase";
import { IFilterProps } from "../../types";
export default function GenderFilter({ handleCheckboxChange, filters, deleteFilters }: IFilterProps) {
  const { data, isLoading } = useGetGenderCountQuery();

  return (
    <FilterBase
    handleCheckboxChange={handleCheckboxChange}
      
      deleteFilters={deleteFilters}
      filters={filters}
      filterType={"gender"}
      isExpandable={false}
      header="Пол"
      isLoading={isLoading}
      data={data || []}
    />
  );
}
