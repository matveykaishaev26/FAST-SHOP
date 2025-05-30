"use client";
import { useCreateBrandMutation, useGetBrandsQuery } from "@/features/api/brandApi";
import { useSearchParams } from "next/navigation";

import Loading from "@/shared/components/ui/Loading/Loading";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { useState } from "react";
import { CustomTable } from "../../_components/CustomTable/CustomTable";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";

const LIMIT = 20;

export default function BrandsList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const header = ["Название"];
  const { data, isLoading, refetch } = useGetBrandsQuery({ page, limit: LIMIT });
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [newBrand, setNewBrand] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 👈 управление открытием

  const handleCreateBrand = async () => {
    if (!newBrand.trim()) return;

    try {
      await createBrand([{ title: newBrand }]).unwrap();
      setNewBrand("");
      setIsDialogOpen(false); // 👈 закрытие после успешного добавления
      await refetch();
    } catch (error) {
      console.error("Ошибка при создании бренда:", error);
    }
  };

  const { items, totalPages, currentPage } = data || {};

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Добавить</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Новая запись</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Название"
              className="w-full"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              disabled={isCreating}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateBrand} disabled={isCreating || !newBrand.trim()}>
              {isCreating ? "Добавление..." : "Добавить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center">
          <Loading loading={isLoading} />
        </div>
      ) : (
        <>
          <CustomTable header={header} data={items?.map((brand) => ({ title: brand.title })) || []} />
          {currentPage && totalPages && <PaginationControl page={currentPage} totalPages={totalPages} />}
        </>
      )}
    </div>
  );
}
