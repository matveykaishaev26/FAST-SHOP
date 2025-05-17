import PageHeader from "../_components/PageHeader";
import CatalogCards from "./_components/CatalogCards/CatalogCards";
import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import SortSelect from "./_components/SortSelect";
import { fetchFilters } from "./utils/fetchFiltersData";
import { createInitialFiltersState } from "./utils/createInitialFiltersState";
import fetchProductCards from "./utils/fetchProductCards";
import { parseFiltersFromSearchParams } from "./utils/parseFiltersFromSearchParams";
import createFiltersApiUrl from "./utils/createFiltersApiUrl";
import { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
type Props = {
  searchParams: Promise<Record<string, string | string[]>>;
};
export const metadata: Metadata = {
  title: "Каталог",
};
export default async function Catalog({ searchParams }: Props) {
  const params = await searchParams; 
  const filtersData = await fetchFilters();
  const parsedFilters = await parseFiltersFromSearchParams(params);
  const initialState = await createInitialFiltersState(filtersData, parsedFilters);

  const filtersUrl = createFiltersApiUrl(params);

  const productCards = await fetchProductCards(await filtersUrl);

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
            <div className="block lg:hidden">
              <FiltersSheet filtersData={filtersData} initialState={initialState} />
            </div>
          </div>
          <div className="w-full">
            <CatalogCards productCards={productCards} parsedFilters={parsedFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}
