"use client";
import { useGetStylesQuery } from "@/features/api/styleApi";
import FilterBase from "./FilterBase/FilterBase";
export default function StyleFilter() {
  const { data: styles, isLoading } = useGetStylesQuery();

  return <FilterBase header="Стиль" isLoading={isLoading} data={styles || []} />;
}
