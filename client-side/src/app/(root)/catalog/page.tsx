import { IFilterItem, IFilterOption, IFilters } from "@/shared/types/filter.interface";
import PageHeader from "../_components/PageHeader";
import CatalogCards from "./_components/CatalogCards/CatalogCards";
import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import SortSelect from "./_components/SortSelect";
import { fetchFilters } from "./utils/fetchFiltersData";
type Props = {
  searchParams: Record<string, string | string[]>;
};

export async function parseFiltersFromSearchParams(params: Record<string, string | string[]>) {
  const getArray = (key: string): string[] => {
  const value = params[key];
  return Array.isArray(value) ? value : value ? value.split(",") : [];
};

  const priceRangeRaw = params["priceRange"];
  const priceRangeStr = Array.isArray(priceRangeRaw) ? priceRangeRaw[0] : priceRangeRaw;
  const priceRange = priceRangeStr?.split("-").map(Number) || null;

  return {
    brandIds: getArray("brandIds"),
    colorIds: getArray("colorIds"),
    priceRange,
    categoryIds: getArray("categoryIds"),
    sizeIds: getArray("sizeIds"),
    genderIds: getArray("genderIds"),
    materialIds: getArray("materialIds"),
    styleIds: getArray("styleIds"),
  } as IFilters;
}

export async function createInitialFiltersState(filtersData: any, parsedFilters: IFilters) {
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
export default async function Catalog({ searchParams }: Props) {
  const filtersData = await fetchFilters();
  const parsedFilters = await parseFiltersFromSearchParams(searchParams);
  const initialState = await createInitialFiltersState(filtersData, parsedFilters);

  console.log(parsedFilters);
  return (
    <div className=" h-full">
      <PageHeader header="Каталог" />
      <div className="w-full flex flex-row gap-x-20">
        <Filters
          initialState={initialState}
          filtersData={filtersData}
          variant="desktop"
          className="w-[350px] hidden lg:block"
        />

        <div className="w-full ">
          <div className="flex justify-between items-center  mb-4">
            <SortSelect />
            <div className="block lg:hidden"><FiltersSheet  filtersData={filtersData}  initialState={initialState}/></div>
          </div>
          <div className="w-full"><CatalogCards parsedFilters={parsedFilters} /></div>
        </div>
      </div>
    </div>
  );
}
