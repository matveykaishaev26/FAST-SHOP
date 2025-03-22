"use client";
import { useGetStylesQuery } from "@/features/api/styleApi";
import FilterBase from "./FilterBase/FilterBase";
import { IFilterProps } from "../../types";
export default function StyleFilter({ handleCheckboxChange, filters, deleteFilters }: IFilterProps) {
  const { data: styles, isLoading } = useGetStylesQuery();

  return (
    <FilterBase
      deleteFilters={deleteFilters}
      filters={filters}
      filterType={"style"}
      header="Стиль"
      isLoading={isLoading}
      handleCheckboxChange={handleCheckboxChange}

      data={styles || []}
    />
  );
}
