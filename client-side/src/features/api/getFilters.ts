import { IFilterItem } from "@/shared/types/filter.interface";
import { API_URL } from "@/config/api.config";
export async function getBrands(): Promise<IFilterItem[]> {
  const res = await fetch(API_URL.brands());

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }
  const data: IFilterItem[] = await res.json();

  return data;
}
