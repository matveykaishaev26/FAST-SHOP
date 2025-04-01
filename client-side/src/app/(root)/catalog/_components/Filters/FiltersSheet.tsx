"use client";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./Filters";
import { X } from "lucide-react";
export default function FiltersSheet() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} className="w-full  p-0 overflow-auto hide-scrollbar">
        <div className="sticky h-[60px] top-0   z-10 bg-background  px-4 flex justify-between items-center">
          <SheetTitle className="text-2xl shadow-none">Фильтры</SheetTitle>
          <X onClick={() => setIsOpen((prev) => !prev)} className="w-5 h-5 cursor-pointer text-muted-foreground" />
        </div>
        <Filters />
      </SheetContent>
    </Sheet>
  );
}
