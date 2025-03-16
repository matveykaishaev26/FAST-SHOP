"use client";
import FilterBase from "./FilterBase/FilterBase";
import { useGetSizesQuery } from "@/features/api/sizeApi";
export default function SizeFilter() {
  const { data, isLoading } = useGetSizesQuery();
  console.log(data);
  return <FilterBase  header="Размер" isLoading={isLoading} data={data || []} />;
}
