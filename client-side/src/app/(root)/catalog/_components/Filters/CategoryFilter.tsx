"use client";
import FilterBase from "./FilterBase/FilterBase";
import { useGetCategoriesQuery } from "@/features/api/categoryApi";
export default function CategoryFilter() {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return <FilterBase header="Категория" isLoading={isLoading} data={categories || []} />    ;
}
