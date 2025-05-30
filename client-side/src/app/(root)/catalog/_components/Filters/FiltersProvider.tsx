import { createInitialFiltersState } from "../../utils/createInitialFiltersState";
import { fetchFilters } from "../../utils/fetchFiltersData";
import { parseFiltersFromSearchParams } from "../../utils/parseFiltersFromSearchParams";
import Filters from "./Filters";

interface IFilterProvider {
  params: Record<string, string | string[]>;
}
export default async function FiltersProvider({ params }: IFilterProvider) {
  const filtersData = await fetchFilters();
  const parsedFilters = await parseFiltersFromSearchParams(params);
  const initialState = await createInitialFiltersState(filtersData, parsedFilters);

  return (
    <Filters
      initialState={initialState}
      filtersData={filtersData}
      variant="desktop"
      className="w-[350px] hidden lg:block"
    />
  );
}
