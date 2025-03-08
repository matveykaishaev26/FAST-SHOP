"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { useRouter } from "next13-progressbar";

interface IPaginationControlProps {
  page: number;
  totalItems: number; // Общее количество элементов
  limit: number;
}

const PAGES_COUNT = 5; 
export default function PaginationControl({ page, totalItems, limit }: IPaginationControlProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / limit); // Вычисляем totalPages

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`?page=${newPage}`);
  };

  const startPage = Math.max(1, Math.min(page - Math.floor(PAGES_COUNT / 2), totalPages - PAGES_COUNT + 1));
  const endPage = Math.min(totalPages, startPage + PAGES_COUNT - 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => setPage(page - 1)}>
          <PaginationPrevious />
        </PaginationItem>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <PaginationItem className="hidden sm:block" key={pageNumber} onClick={() => setPage(pageNumber)}>
              <PaginationLink isActive={pageNumber === page}>{pageNumber}</PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem onClick={() => setPage(page + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
