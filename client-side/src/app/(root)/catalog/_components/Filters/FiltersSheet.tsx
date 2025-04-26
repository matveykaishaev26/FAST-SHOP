"use client";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./Filters";
import { X } from "lucide-react";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
import { useSearchParams } from "next/navigation";
import { IFilters, IPriceRange } from "@/shared/types/filter.interface";
import { useAppSelector } from "@/hooks/useAppDispatch";
import FiltersProvider from "./FiltersProvider";
interface IFiltersSheetProps {
  url: Record<string, string | string[]>;
}
export default function FiltersSheet() {
  const { priceRange, ...filters } = useAppSelector((state) => state.filters);

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointMatch(1024);
  const [filtersCount, setFiltersCount] = useState(0);
  const allFiltersCount =
    Object.values(filters as IFilters).reduce((acc, arr) => acc + arr.length, 0) + (priceRange === null ? 0 : 1);

  const searchParams = useSearchParams();
  useEffect(() => {
    let count = 0;

    if (searchParams.get("price")) {
      count += 1;
    }
    Object.keys(filters).forEach((key) => {
      const param = searchParams.get(key);
      if (param) {
        const queryIds = param.split(",");
        count += queryIds.length;
      }
    });

    setFiltersCount(count);
  }, [filters, priceRange, searchParams]);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="relative" variant={"outline"}>
            {filtersCount > 0 && (
              <div className="absolute h-4 w-4 bg-destructive rounded-full -right-1 -top-1 text-xs flex justify-center items-center text-background">
                {allFiltersCount ? allFiltersCount : filtersCount}
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
            <Filters setIsOpen={() => setIsOpen((prev) => !prev)} variant="mobile" />
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
}
