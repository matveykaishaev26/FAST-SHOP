"use client";
import BrandFilter from "./BrandFilter";
import { useState } from "react";
import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import FilterChoice from "./FilterChoice";
import { IFilterOption, IFilters, IPriceRange } from "../../types";
import SizeFilter from "./SizeFilter";
import StyleFilter from "./StyleFilter";
import GenderFilter from "./GenderFilter";
import MaterialFilter from "./MaterialFilter";
import PriceFilter from "./PriceFilter";

const FILTER_COMPONENTS = [
  BrandFilter,
  ColorFilter,
  SizeFilter,
  CategoryFilter,
  StyleFilter,
  GenderFilter,
  MaterialFilter,
];

interface IFiltersProps {
  className?: string;
}
export default function Filters({ className }: IFiltersProps) {
  const [filters, setFilters] = useState<IFilters>({});
  const [priceRange, setPriceRange] = useState<IPriceRange | null>(null);

  console.log(priceRange);
  const handleCheckboxChange = (filterType: keyof IFilters, option: IFilterOption, isChecked: boolean) => {
    setFilters((prevFilters) => {
      const prevValues = prevFilters[filterType] || [];

      const updatedFilters = {
        ...prevFilters,
        [filterType]: isChecked ? [...prevValues, option] : prevValues.filter((item) => item.id !== option.id),
      };

      return updatedFilters;
    });
  };

  const deleteFilters = (filterType: keyof IFilters, itemId?: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: itemId
        ? prev[filterType]?.filter((item) => item.id !== itemId) // Удаляем элемент
        : [],
    }));
  };

  console.log(filters);
  return (
    <div className={`md:overflow-visible space-y-5 ${className ?? className}`}>
      <FilterChoice
        deletePriceRange={() => {
          setPriceRange(null);
        }}
        priceRange={priceRange}
        filters={filters}
        deleteFilters={deleteFilters}
        clearFilters={() => {
          setFilters({});
          setPriceRange(null);
        }}
      />

      <PriceFilter setPriceRange={setPriceRange} priceRange={priceRange} />
      {FILTER_COMPONENTS.map((Component, index) => (
        <Component
          key={index}
          filters={filters}
          deleteFilters={deleteFilters}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
}
