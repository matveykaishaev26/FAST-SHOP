import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import { filtersOrder } from "@/shared/types/filter.interface";
import Cards from "./_components/Cards/Cards";
import PageHeader from "../_components/PageHeader";
import FiltersClient from "./_components/Filters/FiltersClient";
import FiltersProvider from "./_components/Filters/FiltersProvider";
import SortSelect from "./_components/SortSelect";

type Props = {
  searchParams: Record<string, string | string[]>;
};
export default function Catalog({ searchParams }: Props) {

  return (
    <div className=" h-full">
      <PageHeader header="Каталог" />
      <div className="w-full flex flex-row gap-x-20">
        <FiltersProvider searchParams={searchParams} />
        <div className="w-full ">
          <div className="flex justify-between items-center  mb-4">
            <SortSelect />
            <div className="block lg:hidden">
              {/* <FiltersSheet searchParams={searchParams} /> */}
            </div>
          </div>
          <div className="w-full"><Cards /></div>
        </div>
      </div>
    </div>
  );
}
