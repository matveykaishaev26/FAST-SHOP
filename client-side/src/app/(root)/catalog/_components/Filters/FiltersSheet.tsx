"use client";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./Filters";
import { X } from "lucide-react";
import { useBreakpointMatch } from "@/hooks/useBreakpointMatch";
export default function FiltersSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointMatch(1024);

  return (
    <>
      {" "}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <SlidersHorizontal />
          </Button>
        </SheetTrigger>
        {isMobile && (
          <SheetContent aria-describedby={undefined} className="w-full  p-0 overflow-auto hide-scrollbar">
            <div className="sticky h-[60px] top-0   z-10 bg-background  px-4 flex justify-between items-center">
              <SheetTitle className="text-2xl shadow-none">Фильтры</SheetTitle>
              <X onClick={() => setIsOpen((prev) => !prev)} className="w-5 h-5 cursor-pointer text-muted-foreground" />
            </div>
            <Filters variant="mobile" />
          </SheetContent>
        )}
      </Sheet>
    </>
  );
}
