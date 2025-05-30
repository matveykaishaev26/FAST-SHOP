// "use client";
// import { useMemo, useCallback, useState, useEffect } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
// import { IFilterItem, filtersOrder, IFilterOption, IFilters } from "@/shared/types/filter.interface";

// import FilterChoice from "./FilterChoice";
// import PriceFilter from "./PriceFilter";
// import ColorFilter from "./ColorFilter";
// import FilterBase from "./FilterBase/FilterBase";
// import { IFiltersData } from "../../utils/fetchFiltersData";

// interface IFilterComponent {
//   header: string;
//   filterType: Exclude<keyof IFilters, "priceRange">;
//   data: IFilterItem[] | undefined;
//   isExpandable?: boolean;
//   isLoading: boolean;
// }

// interface IFiltersProps {
//   className?: string;
//   variant?: "desktop" | "mobile";
//   filtersData: IFiltersData;
//   initialState: IFilters;
//   setMobileFilters?: (filters: IFilters) => void;
//   mobileFilters?: IFilters;
// }

// export default function Filters({
//   className,
//   variant = "desktop",
//   filtersData,
//   initialState,
//   setMobileFilters,
//   mobileFilters,
// }: IFiltersProps) {
//   const [localFilters, setLocalFilters] = useState<IFilters>(initialState);
//   const { priceRange, ...filtersWithoutPrice } = localFilters;
//   const { priceRange: mobilePriceRange, ...mobileFiltersWithoutPrice } = mobileFilters || {};
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const isMobile = useBreakpointMatch(1024);
//   const shouldShow = variant === "desktop" ? !isMobile : isMobile;

//   useEffect(() => {
//     if (variant === "mobile" && mobileFilters) setLocalFilters(mobileFilters);
//   }, []);
//   const filtersComponents = useMemo<IFilterComponent[]>(
//     () => [
//       { header: "Бренды", filterType: "brandIds", data: filtersData.brands, isLoading: false },
//       { header: "Категории", filterType: "categoryIds", data: filtersData.categories, isLoading: false },
//       { header: "Размеры", filterType: "sizeIds", data: filtersData.sizes, isLoading: false },
//       { header: "Пол", filterType: "genderIds", data: filtersData.genders, isExpandable: false, isLoading: false },
//       { header: "Материалы", filterType: "materialIds", data: filtersData.materials, isLoading: false },
//       { header: "Стили", filterType: "styleIds", data: filtersData.styles, isLoading: false },
//     ],
//     [filtersData]
//   );
//   const updateUrlWithFilters = useCallback(
//     (filters: IFilters) => {
//       if (variant === "mobile") return; // ❗ не трогаем URL
//       const params = new URLSearchParams();

//       Object.entries(filters).forEach(([key, value]) => {
//         if (key === "priceRange" && value) {
//           params.set("priceRange", value.join("-"));
//         } else if (Array.isArray(value) && value.length > 0) {
//           params.set(key, value.map((opt: IFilterOption) => opt.id).join(","));
//         }
//       });

//       router.push(`?${params.toString()}`, { scroll: false });
//     },
//     [router, variant]
//   );
//   const debouncedUpdateUrl = useDebouncedCallback(updateUrlWithFilters, 500);

//   const handleCheckboxChange = (
//     checked: boolean,
//     filterType: keyof Omit<IFilters, "priceRange">,
//     item: IFilterOption
//   ) => {
//     if (variant === "desktop") {
//       setLocalFilters((prev) => {
//         const updated = checked ? [...prev[filterType], item] : prev[filterType].filter((opt) => opt.id !== item.id);

//         const newFilters = {
//           ...prev,
//           [filterType]: updated,
//         };
//         debouncedUpdateUrl(newFilters); // вызов с задержкой

//         return newFilters;
//       });
//     } else {
//       if (variant === "mobile" && setMobileFilters)
//         setMobileFilters((prev) => {
//           const updated = checked ? [...prev[filterType], item] : prev[filterType].filter((opt) => opt.id !== item.id);

//           const newFilters = {
//             ...prev,
//             [filterType]: updated,
//           };

//           return newFilters;
//         });
//     }
//   };
//   const setPriceRange = (priceRange: [number, number] | null) => {
//     setLocalFilters((prev) => ({
//       ...prev,
//       priceRange: priceRange,
//     }));
//   };
//   const deleteFilters = useCallback(
//     (filterType: keyof Omit<IFilters, "priceRange">, filterId?: string) => {
//       if (variant === "mobile") {
//         if (!setMobileFilters || !mobileFilters) return;
//         const updatedFilter = filterId ? mobileFilters[filterType].filter((opt) => opt.id !== filterId) : [];

//         const newFilters = {
//           ...mobileFilters,
//           [filterType]: updatedFilter,
//         };

//         setMobileFilters(newFilters);
//         return;
//       }

//       const params = new URLSearchParams(searchParams.toString());
//       const currentIds = (params.get(filterType) || "").split(",").filter(Boolean);

//       const updatedIds = filterId ? currentIds.filter((id) => id !== filterId) : [];

//       if (updatedIds.length > 0) {
//         params.set(filterType, updatedIds.join(","));
//       } else {
//         params.delete(filterType);
//       }

//       const updatedFilter = filterId ? localFilters[filterType].filter((opt) => opt.id !== filterId) : [];

//       const newFilters = {
//         ...localFilters,
//         [filterType]: updatedFilter,
//       };

//       setLocalFilters(newFilters);
//       router.push(`?${params.toString()}`, { scroll: false });
//     },
//     [searchParams, router, localFilters, variant, mobileFilters, setMobileFilters]
//   );

//   const deletePriceRange = useCallback(() => {
//     if (variant === "mobile") {
//       if (!setMobileFilters || !mobileFilters) return;
//       setMobileFilters({
//         ...mobileFilters,
//         priceRange: null,
//       });
//       return;
//     }

//     const params = new URLSearchParams(searchParams.toString());
//     params.delete("priceRange");

//     setLocalFilters((prev) => ({
//       ...prev,
//       priceRange: null,
//     }));

//     router.push(`?${params.toString()}`, { scroll: false });
//   }, [searchParams, router, variant, mobileFilters, setMobileFilters]);

//   const clearAllFilters = useCallback(() => {
//     if (variant === "mobile") {
//       if (setMobileFilters) {
//         setMobileFilters({
//           brandIds: [],
//           categoryIds: [],
//           sizeIds: [],
//           genderIds: [],
//           materialIds: [],
//           styleIds: [],
//           colorIds: [],
//           priceRange: null,
//         });
//       }
//       return;
//     }

//     const params = new URLSearchParams(searchParams.toString());
//     filtersOrder.forEach((key) => params.delete(key));
//     params.delete("priceRange");

//     const cleared: IFilters = {
//       brandIds: [],
//       categoryIds: [],
//       sizeIds: [],
//       genderIds: [],
//       materialIds: [],
//       styleIds: [],
//       colorIds: [],
//       priceRange: null,
//     };

//     setLocalFilters(cleared);
//     router.push(`?${params.toString()}`, { scroll: false });
//   }, [searchParams, router, variant, setMobileFilters]);
//   if (!shouldShow) return null;

//   const commonFilterBaseProps = {
//     filters: variant === "desktop" ? filtersWithoutPrice : mobileFilters,
//     deleteFilters,
//   };

//   const middleIndex = Math.floor(filtersComponents.length / 2 - 1);
//   const firstHalf = filtersComponents.slice(0, middleIndex);
//   const secondHalf = filtersComponents.slice(middleIndex);

//   return (
//     <div className={`relative md:overflow-visible scrollbar-hide ${className || ""}`}>
//       <FilterChoice
//         isAllFiltersLoading={false}
//         deletePriceRange={deletePriceRange}
//         priceRange={(variant === "desktop" ? priceRange : mobilePriceRange) ?? null}
//         filters={variant === "desktop" ? filtersWithoutPrice : mobileFiltersWithoutPrice}
//         deleteFilters={deleteFilters}
//         clearFilters={clearAllFilters}
//       />

//       <div className="p-4 lg:mt-5 space-y-5 lg:p-0">
//         <PriceFilter setPriceRange={setPriceRange} priceRangeData={filtersData.priceRange} priceRange={priceRange} />
//         {firstHalf.map((item) => (
//           <FilterBase
//             handleCheckboxChange={handleCheckboxChange}
//             variant={variant}
//             key={item.header}
//             {...commonFilterBaseProps}
//             {...item}
//             data={item.data || []}
//           />
//         ))}

//         <ColorFilter
//           handleCheckboxChange={handleCheckboxChange}
//           colorsData={filtersData.colors}
//           variant={variant}
//           {...commonFilterBaseProps}
//         />

//         {secondHalf.map((item) => (
//           <FilterBase
//             handleCheckboxChange={handleCheckboxChange}
//             variant={variant}
//             key={item.header}
//             {...commonFilterBaseProps}
//             {...item}
//             data={item.data || []}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
