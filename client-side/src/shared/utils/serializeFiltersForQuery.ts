
export function serializeFiltersForQuery(filters: Record<string, string[]> & { page?: number; limit?: number }) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (key === "priceRange" && filters.priceRange !== null) {
      params.append("priceRange", `${filters.priceRange[0]}-${filters.priceRange[1]}`);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) {
          params.append(key, item);
        }
      });
    } else {
      params.append(key, String(value));
    }
  });

  return params.toString();
}
