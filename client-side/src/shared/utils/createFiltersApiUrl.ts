import { filtersOrder } from "@/shared/types/filter.interface";

// filtersOrder — это массив строк, указывающий порядок фильтров (например: ['brandIds', 'materialIds', ...])

export default async function createFiltersApiUrl(
  paramsPromise: Record<string, string | string[]>,
  limit: number = 24
) {
  const params = await paramsPromise;
  const searchParams = new URLSearchParams();

  filtersOrder.forEach((filterType) => {
    const value = params[filterType];
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(filterType, v));
    } else {
      searchParams.append(filterType, value);
    }
  });
  const priceRangeRaw = params["priceRange"];
  const priceRangeStr = Array.isArray(priceRangeRaw) ? priceRangeRaw[0] : priceRangeRaw;

  if (priceRangeStr) searchParams.append("priceRange", priceRangeStr);
  const page = params["page"] || 1;
  if (page) searchParams.append("page", page.toString());
  const sortType = params["sortType"];
  if (sortType) searchParams.append("sortType", sortType.toString());
  searchParams.append("limit", limit.toString());

  const search = params["search"];
  if (search) searchParams.append("search", search.toString());

  return searchParams.toString(); // Возвращает строку для запроса
}
