'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export default function SortSelect() {
  return (
    <Select defaultValue="popularity">
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="popularity">По популярности</SelectItem>
          <SelectItem value="priceIncrease">По возрастанию цены</SelectItem>
          <SelectItem value="priceDecreasing ">По убыванию цены</SelectItem>
          <SelectItem value="rating">По рейтингу</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
