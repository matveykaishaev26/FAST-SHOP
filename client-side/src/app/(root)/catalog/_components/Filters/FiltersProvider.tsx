import { createInitialFiltersState } from "../../utils/createInitialFiltersState";
import { fetchFilters } from "../../utils/fetchFiltersData";
import { parseFiltersFromSearchParams } from "../../utils/parseFiltersFromSearchParams";
import FiltersSheet from "./FiltersSheet";
import FiltersDesktop from "./FiltersDesktop";
import createFiltersApiUrl from "@/shared/utils/createFiltersApiUrl";
import fetchProductCards from "../../utils/fetchProductCards";

interface IFilterProvider {
  params: Record<string, string | string[]>;
  type: "mobile" | "desktop";
}
export default async function FiltersProvider({ params, type = "desktop" }: IFilterProvider) {
  const filtersData = await fetchFilters();
  const parsedFilters = await parseFiltersFromSearchParams(params);
  const initialState = await createInitialFiltersState(filtersData, parsedFilters);

  // const filtersUrl = createFiltersApiUrl(params, 20);

  //   const productCards = await fetchProductCards(await filtersUrl);

  if (type === "desktop") return <FiltersDesktop initialState={initialState} filtersData={filtersData} />;
  else {
    return <FiltersSheet initialState={initialState} filtersData={filtersData} />;
  }
}
