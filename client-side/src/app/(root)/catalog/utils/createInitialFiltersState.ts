import { IFilterItem, IFilters, IParsedFilters } from "@/shared/types/filter.interface";

export async function createInitialFiltersState(filtersData: any, parsedFilters: IParsedFilters) {
  let initialState: IFilters = {
    brandIds: [],
    colorIds: [],
    priceRange: null, 
    categoryIds: [],
    sizeIds: [],
    genderIds: [],
    materialIds: [],
    styleIds: [],
  };
  const filterKeyMap: Record<string, keyof Omit<IFilters, "priceRange">> = {
    brands: "brandIds",
    materials: "materialIds",
    categories: "categoryIds",
    sizes: "sizeIds",
    genders: "genderIds",
    styles: "styleIds",
    colors: "colorIds",
  };
  
  Object.entries(filterKeyMap).forEach(([key, values]) => {
    const typedKey = key as keyof typeof filtersData;
    const itemsToUpdate = filtersData[typedKey]
      .filter((item: IFilterItem) => parsedFilters[values]?.some((f) => f === item.id))
      .map((item: IFilterItem) => ({
        id: item.id,
        title: item.title,
        ...(values === "colorIds" && { hex: (item as any).hex }),
      }));

    if (itemsToUpdate.length > 0) {
      initialState[values] = itemsToUpdate;
    }
  });

  initialState.priceRange = parsedFilters.priceRange;
  return initialState;
}