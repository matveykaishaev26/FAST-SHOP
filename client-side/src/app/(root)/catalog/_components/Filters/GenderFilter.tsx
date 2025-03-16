"use client";
import { useGetGenderCountQuery } from "@/features/api/productApi";
import FilterBase from "./FilterBase/FilterBase";
export default function GenderFilter() {
  const { data, isLoading } = useGetGenderCountQuery();

  return <FilterBase isExpandable={false} header="Пол" isLoading={isLoading} data={data || []} />;
}
