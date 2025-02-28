"use client";
import { Store } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command";
export default function StoresTab() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="space-y-2">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        // className={`flex p-2 select-none cursor-pointer items-center justify-between gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10`}
      >
        <Button variant={"outline"} className="flex gap-x-4 w-full justify-between items-center">
          <div className="flex gap-x-2">
            <Store size={18} />
            Магазин
          </div>

          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </Button>
      </div>
      {isOpen && (
        <Command>
          <CommandInput placeholder="Введите название..." />
          <CommandGroup>
            <CommandItem className="flex items-center gap-x-2">
              <Plus /> Добавить магазин
            </CommandItem>
          </CommandGroup>

          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>

            {/* Первая группировка (без прокрутки) */}
            {/* <CommandGroup>
              <CommandItem>Добавить магазин</CommandItem>
            </CommandGroup> */}

            <CommandSeparator />

            {/* Вторая группировка (с прокруткой) */}
            <CommandGroup className="max-h-[200px] overflow-y-auto">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Магаз1</CommandItem>
              <CommandItem>Магаз2</CommandItem>
              <CommandItem>Магаз3</CommandItem>
              <CommandItem>Магаз4r</CommandItem>
              <CommandItem>Магаз5r</CommandItem>
              <CommandItem>Магаз6r</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
{
  /* <div className="px-4 text-[14px]">
<div className="">
  <div
    className={`p-2 select-none items-center justify-between gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10 overflow-hidden text-ellipsis whitespace-nowrap w-full`}
  >
    asdasdasdasdasdasdasdasdasdasdasd
  </div>

  <div
    className={`flex p-2 select-none items-center justify-between gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10`}
  >
    asdasd
  </div>
  <div
    className={`flex p-2 select-none items-center justify-between gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10`}
  >
    asdasd
  </div>
</div>
</div> */
}
