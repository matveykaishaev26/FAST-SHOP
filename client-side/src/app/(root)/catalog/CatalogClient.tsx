"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/features/store";
import { useRef } from "react";
import PageHeader from "../_components/PageHeader";
import Filters from "./_components/Filters/Filters";
import SortSelect from "./_components/SortSelect";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import Cards from "./_components/CatalogCards/CatalogCards";
import CatalogCards from "./_components/CatalogCards/CatalogCards";
export default function CatalogClient({ initialState, filtersData }: { initialState: any; filtersData: any }) {
  const storeRef = useRef(makeStore(initialState));

  return (
    <Provider store={storeRef.current}>
      <div className=" h-full">
        <PageHeader header="Каталог" />
        <div className="w-full flex flex-row gap-x-20">
          <Filters filtersData={filtersData} variant="desktop" className="w-[350px] hidden lg:block" />

          <div className="w-full ">
            <div className="flex justify-between items-center  mb-4">
              <SortSelect />
              <div className="block lg:hidden">
                <FiltersSheet filtersData={filtersData}/>
              </div>
            </div>
            <div className="w-full">
              <CatalogCards />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
