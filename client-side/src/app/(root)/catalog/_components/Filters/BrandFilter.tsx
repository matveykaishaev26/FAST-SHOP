"use client";
import { useGetAllBrandsQuery } from "@/features/api/brandApi";
import FilterBase from "./FilterBase/FilterBase";
export default function BrandFilter() {
  const { data: brands, isLoading, error } = useGetAllBrandsQuery();

  return <FilterBase header="Бренд" isLoading={isLoading} data={brands || []} isAlphabeticalOrder={true} />;
}
