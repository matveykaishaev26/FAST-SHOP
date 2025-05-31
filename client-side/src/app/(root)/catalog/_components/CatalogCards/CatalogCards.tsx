import { ICardItem } from "@/shared/types/card.interface";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import Card from "@/shared/components/Cards/Card";
import createFiltersApiUrl from "@/shared/utils/createFiltersApiUrl";
import fetchProductCards from "../../utils/fetchProductCards";

const LIMIT = 20;

interface ICardsProps {
  params: Record<string, string | string[]>;
}
export default async function CatalogCards({ params }: ICardsProps) {
  const filtersUrl = createFiltersApiUrl(params, LIMIT);

  const productCards = await fetchProductCards(await filtersUrl);
  const { items, totalPages, currentPage } = productCards || {};

  if (!items?.length) {
    return <p className="text-gray-500">Нет товаров для отображения</p>;
  }

  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  mb-10">
        {items && items.map((product: ICardItem) => <Card key={product.id} product={product} />)}
      </div>
      <div className="hidden md:block">
        <PaginationControl page={currentPage ?? 1} totalPages={totalPages ?? 1} />
      </div>
    </div>
  );
}
