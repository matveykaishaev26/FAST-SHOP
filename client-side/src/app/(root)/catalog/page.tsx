import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
import Cards from "./_components/Cards/Cards";
export default function Catalog() {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-medium tracking-widest mb-10 sm:text-4xl">КАТАЛОГ</h2>
      <div className="w-full flex flex-row gap-x-20">
        <Filters variant="desktop" className="w-[350px] hidden lg:block" />
        <div className="w-full ">
          <div className="flex justify-between items-center lg:hidden mb-4">
            <div>asdasdasd</div>
            <FiltersSheet />
          </div>
          <div className="w-full">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
}
