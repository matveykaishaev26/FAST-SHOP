export function buildUrlSearchParams(params: Record<string, string | string[] | undefined>): string {
  const urlSearchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) urlSearchParams.append(key, v);
      });
    } else if (value !== undefined && value !== "") {
      urlSearchParams.set(key, value);
    }
  });

  return urlSearchParams.toString(); // вернёт строку без ? в начале
}
