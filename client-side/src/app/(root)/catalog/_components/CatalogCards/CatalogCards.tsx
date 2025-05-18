import { ICardItem } from "@/shared/types/card.interface";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import Card from "@/shared/components/Cards/Card";
import { IPaginatedResponse } from "@/shared/types/pagination.interface";

const LIMIT = 20;

interface ICardsProps {
  setCardsCount?: React.Dispatch<React.SetStateAction<number>>;
  parsedFilters: any;
  productCards: IPaginatedResponse<ICardItem>;
}
export default function CatalogCards({ setCardsCount, parsedFilters, productCards }: ICardsProps) {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const page = Number(searchParams.get("page")) || 1;
  // const isMobile = useBreakpointMatch(768);
  // const { priceRange, ...filters } = useAppSelector((state) => state.filters);
  // const [isNewPageFetching, setIsNewPageFetching] = useState<boolean>(false);
  // const currentSort = searchParams.get("sortType") || "";
  // const { data, isLoading, isFetching, error } = useGetProductCardsQuery({
  //   page: page,
  //   limit: LIMIT,
  //   mode: isMobile ? CARDS_RESPONSE_MODE.INFINITE_SCROLL : CARDS_RESPONSE_MODE.PAGINATION,
  //   filters: parsedFilters,
  //   sortType: currentSort,
  // });

  const { items, totalCount, totalPages, currentPage } = productCards || {};

  // const loadMore = () => {
  //   if (currentPage) {
  //     setIsNewPageFetching(true);
  //     router.push(`/catalog/?page=${currentPage + 1}`, { scroll: false });
  //   }
  // };

  // useEffect(() => {
  //   if (isFetching === false) {
  //     setIsNewPageFetching(false);
  //   }
  // }, [isFetching]);

  // if (isLoading || (isFetching && !isMobile)) {
  //   return <CardsSkeleton count={LIMIT} />;
  // }

  // if (error) {
  //   return <p className="text-destructive">Ошибка: {JSON.stringify(error)}</p>;
  // }

  if (!items?.length) {
    return <p className="text-gray-500">Нет товаров для отображения</p>;
  }

  return (
    <div>
        <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  mb-10">
          {items && items.map((product: ICardItem) => <Card key={product.id} product={product} />)}
        </div>
        <div className="hidden md:block">
          <PaginationControl  page={currentPage ?? 1} totalPages={totalPages ?? 1} />
        </div>

        {/* {items.length !== totalCount && (
          <Button
            onClick={loadMore}
            className="block uppercase md:hidden border-primary text-primary hover:text-primary w-full"
            variant={"outline"}
            disabled={isNewPageFetching}
          >
            Загрузить еще
          </Button>
        )} */}
    </div>
  );
}
