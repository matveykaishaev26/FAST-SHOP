"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

enum SORT_TYPE {
  BY_RATING = "rating_desc",
  BY_PRICE_ASC = "price_asc",
  BY_PRICE_DESC = "price_desc",
}
export default function SortSelect() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sortType") || SORT_TYPE.BY_RATING;
  const setSortType = (sortType: SORT_TYPE) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortType", sortType);
    router.push(pathname + "?" + params);
  };
  return (
    <Select value={currentSort} onValueChange={setSortType}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={SORT_TYPE.BY_PRICE_ASC}>По возрастанию цены</SelectItem>
          <SelectItem value={SORT_TYPE.BY_PRICE_DESC}>По убыванию цены</SelectItem>
          <SelectItem value={SORT_TYPE.BY_RATING}>По рейтингу</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
