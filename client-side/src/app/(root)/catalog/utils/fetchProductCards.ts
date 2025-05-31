import { API_URL } from "@/config/api.config";
export const SERVER_URL = process.env.SERVER_URL as string;
export default async function fetchProductCards(filtersUrl: string) {
  console.log(filtersUrl);
  const url = `${SERVER_URL}${API_URL.products(`/product-cards?${filtersUrl}`)}`;
  const res = await fetch(url);

  if (!res) {
    throw new Error("Ошибка при загрузке карточек!");
  }

  const data = await res.json();

  return data;
}
