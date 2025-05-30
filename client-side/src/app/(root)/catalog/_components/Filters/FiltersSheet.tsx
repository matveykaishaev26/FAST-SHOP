"use client";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { X } from "lucide-react";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { IFilters, IPriceRange } from "@/shared/types/filter.interface";
import { IFiltersData } from "../../utils/fetchFiltersData";
import FiltersMobile from "./FiltersMobile";
import { useFiltersSyncWithUrl } from "@/hooks/useFiltersSyncWithUrl";
interface IFiltersSheetProps {
  filtersData: IFiltersData;
  initialState: IFilters;
}
export default function FiltersSheet({ filtersData, initialState }: IFiltersSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointMatch(1024);
  const [mobileFilters, setMobileFilters] = useState<IFilters>(initialState);
  const [filtersCount, setFiltersCount] = useState(0);
  const { priceRange, ...filters } = mobileFilters;
  const { updateUrlWithFilters } = useFiltersSyncWithUrl(filters, priceRange);

useEffect(() => {
  const allFiltersCount =
    Object.values(filters).reduce((acc, arr) => acc + arr.length, 0) + (priceRange === null ? 0 : 1);
  setFiltersCount(allFiltersCount);

  console.log("count now:", allFiltersCount); 
}, [mobileFilters]);



  useEffect(() => {
    setMobileFilters(initialState)
  }, [isOpen])
  if (!isMobile) {
    return null;
  }

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="relative" variant={"outline"}>
            {filtersCount > 0 && (
              <div className="absolute h-4 w-4 bg-destructive rounded-full -right-1 -top-1 text-xs flex justify-center items-center text-background">
                {filtersCount}
              </div>
            )}
            <SlidersHorizontal />
          </Button>
        </SheetTrigger>
        {isMobile && (
          <SheetContent aria-describedby={undefined} className="w-full  p-0 overflow-auto hide-scrollbar">
            <div className="sticky h-[60px] top-0   z-10 bg-background  px-4 flex justify-between items-center">
              <SheetTitle className="text-2xl shadow-none">Фильтры</SheetTitle>
              <X onClick={() => setIsOpen((prev) => !prev)} className="w-5 h-5 cursor-pointer text-muted-foreground" />
            </div>
            <FiltersMobile
              setMobileFilters={setMobileFilters}
              filtersData={filtersData}
              mobileFilters={mobileFilters}
            />
            <div className="sticky bottom-0  w-full bg-background border-t h-[80px] flex items-center justify-center px-4  lg:hidden ">
              <Button
                onClick={() => {
                  updateUrlWithFilters();
                  setIsOpen((prev) => !prev);
                }}
                className="w-full uppercase"
              >
                Применить фильтры: {filtersCount}
              </Button>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
}
