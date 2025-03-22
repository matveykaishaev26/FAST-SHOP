"use client";
import { useGetAllBrandsQuery } from "@/features/api/brandApi";
import FilterBase from "./FilterBase/FilterBase";
import { IFilterProps } from "../../types";

export default function BrandFilter({ handleCheckboxChange, filters, deleteFilters }: IFilterProps) {
  const { data: brands, isLoading, error } = useGetAllBrandsQuery();

  return (
    <FilterBase
      deleteFilters={deleteFilters}
      filters={filters}
      filterType={"brand"}
      header="Бренд"
      handleCheckboxChange={handleCheckboxChange}
      isLoading={isLoading}
      data={brands || []}
    />
  );
}
