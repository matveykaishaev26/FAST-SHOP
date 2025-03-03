"use client";
import { Store } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import CreateStoreModal from "../Modals/CreateStoreModal";
import { useGetAllStoresQuery } from "@/features/api/storeApi";
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
  const { data, isLoading, error } = useGetAllStoresQuery();
  return (
    <div className="space-y-2">
      <div onClick={() => setIsOpen((prev) => !prev)}>
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
            <CreateStoreModal>
              <div>
                <CommandItem className="flex items-center gap-x-2">
                  <Plus /> Добавить магазин
                </CommandItem>
              </div>
            </CreateStoreModal>
          </CommandGroup>

          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>

            <CommandSeparator />

            <CommandGroup className="max-h-[200px] overflow-y-auto"></CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
