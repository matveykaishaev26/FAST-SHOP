"use client";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Filters from "./Filters";

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
      <SheetContent aria-describedby={undefined} className="w-full overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Фильтры</SheetTitle>
          <Filters />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}