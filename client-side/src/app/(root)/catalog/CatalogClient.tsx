"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/features/store";
import { useRef } from "react";
import PageHeader from "../_components/PageHeader";
import Filters from "./_components/Filters/Filters";
import SortSelect from "./_components/SortSelect";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import Cards from "./_components/Cards/Cards";
export default function CatalogClient({ initialState }: { initialState: any }) {
  const storeRef = useRef(makeStore(initialState));

  return (
    <Provider store={storeRef.current}>
      <div className=" h-full">
        <PageHeader header="Каталог" />
        <div className="w-full flex flex-row gap-x-20">
          <Filters variant="desktop" className="w-[350px] hidden lg:block" />

          <div className="w-full ">
            <div className="flex justify-between items-center  mb-4">
              <SortSelect />
              <div className="block lg:hidden"><FiltersSheet  /></div>
            </div>
            <div className="w-full">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
