"use client";
import { useGetMaterialsQuery } from "@/features/api/materialApi";
import FilterBase from "./FilterBase/FilterBase";
export default function MaterialFilter() {
  const { data: materials, isLoading } = useGetMaterialsQuery();

  return (
    <FilterBase
      header="Материал"
      isLoading={isLoading}
      data={materials || []}

    />
  );
}
