import PageHeader from "../_components/PageHeader";
import CatalogCards from "./_components/CatalogCards/CatalogCards";
import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import SortSelect from "./_components/SortSelect";
import CatalogProvider from "./CatalogProvider";
type Props = {
  searchParams: Record<string, string | string[]>;
};
export default function Catalog({  }: Props) {
  return (
    <div className=" h-full">
      <PageHeader header="Каталог" />
      <div className="w-full flex flex-row gap-x-20">
        <Filters  variant="desktop" className="w-[350px] hidden lg:block" />

        <div className="w-full ">
          <div className="flex justify-between items-center  mb-4">
            <SortSelect />
            <div className="block lg:hidden">
              <FiltersSheet  />
            </div>
          </div>
          <div className="w-full">
            <CatalogCards />
          </div>
        </div>
      </div>
    </div>
  );
}
