"use client";
import { useRouter } from "next13-progressbar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationControlProps {
  page: number;
  totalPages: number;
  disabled: boolean;
}

const PAGES_COUNT = 5;

export default function PaginationControl({ page, totalPages, disabled }: IPaginationControlProps) {
  const router = useRouter();

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`?page=${newPage}`);
  };

  const startPage =
    page < PAGES_COUNT ? 1 : Math.max(1, Math.min(page - Math.floor(PAGES_COUNT / 2), totalPages - PAGES_COUNT + 1));
  const endPage = Math.min(totalPages, startPage + PAGES_COUNT - 1);
  const defaultClass = `cursor-pointer  transition hover:bg-border rounded-sm flex justify-center items-center text-sm h-6 w-6 sm:h-icon sm:w-icon`;
  return (
    <div className={`justify-center select-none flex gap-x-[2px] items-center ${disabled ? "opacity-40" : ""}`}>
      <div
        onClick={() => setPage(page - 1)}
        className={cn(`  ${defaultClass}`, page === 1 && "pointer-events-none  opacity-50")}
      >
        <ChevronLeft size={18} />
      </div>

      {endPage > PAGES_COUNT && (
        <>
          <div onClick={() => setPage(1)} className={cn(defaultClass)}>
            1
          </div>
          <div className="h-6 w-6 sm:h-icon sm:w-icon flex justify-center items-center">...</div>
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNumber = startPage + i;
        return (
          <div
            key={pageNumber}
            className={cn(defaultClass, pageNumber === page && "border")}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      {page <= totalPages - PAGES_COUNT / 2  && (
        <div className="h-6 w-6 sm:h-icon sm:w-icon flex justify-center items-center">...</div>
      )}

      <div
        onClick={() => setPage(page + 1)}
        className={cn(`  ${defaultClass}`, page === totalPages && "pointer-events-none opacity-50")}
      >
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
