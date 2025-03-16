import { Input } from "@/shared/components/ui/input";
import { IFilterItem } from "@/shared/types/entity.interface";
import FilterItem from "../FilterItem";
import { IFilterBaseProps } from "./FilterBase";

interface IOpenFilterBase<T> extends Omit<IFilterBaseProps<T>, "isLoading" | "header"> {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredItems: any[];
  data: T[];
  isAlphabeticalOrder?: boolean;
  renderItem?: (item: T) => React.ReactNode;
  toggleList: () => void;
}

const ALPHABET = "abcdefjhijklmnopqrstuvwxyz";

export default function OpenFilterBase<T extends IFilterItem>({
  searchTerm,
  setSearchTerm,
  isAlphabeticalOrder,
  data,
  toggleList,
  renderItem,
}: IOpenFilterBase<T>) {
  const filteredItems = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const getByOrder = () => {
    if (isAlphabeticalOrder) {
      let alphSortedData: Record<string, IFilterItem[]> = {};
      let numericalData: IFilterItem[] = [];

      ALPHABET.toUpperCase()
        .split("")
        .map((letter) => {
          alphSortedData[letter] = [];
          data.map((item) => {
            if (item.title.toUpperCase()[0] === letter) {
              alphSortedData[letter].push(item);
              return;
            }
          });
        });

      data.map((item) => {
        if (/^\d/.test(item.title.toLowerCase())) {
          numericalData.push(item);
          return;
        }
      });
      alphSortedData["0-9"] = numericalData;
      const sortedEntries = Object.entries(alphSortedData).filter(([key, item]) => item.length !== 0);
      const sortedObj = Object.fromEntries(sortedEntries);
      console.log(sortedObj);

      return sortedObj;
    } else {
      return;
    }
  };
  const sortedData = getByOrder();

  return (
    <>
      <Input
        value={searchTerm}
        setValue={setSearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type={"search"}
        placeholder="Хочу найти..."
      />

      {searchTerm === "" && isAlphabeticalOrder ? (
        <div className="space-y-2 max-h-[240px] overflow-auto custom-scrollbar w-full">
          {sortedData &&
            Object.entries(sortedData).map(([key, value]) => (
              <div className="space-y-2 text-sm" key={key}>
                <div className="text-primary">{key}</div>

                {value.map((item, index) => (
                  <FilterItem key={item.title} id={item.title}>
                    <span className="text-[15px]  text-foreground  font-thin">{item.title}</span>
                    <div className="text-muted-foreground text-xs">({item.productCount})</div>
                  </FilterItem>
                ))}
              </div>
            ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="space-y-2 max-h-[240px] overflow-auto custom-scrollbar w-full">
          {renderItem
            ? filteredItems.map(renderItem)
            : filteredItems.map((item) => (
                <div key={item.title}>
                  <FilterItem id={item.title}>
                    <span className="text-[15px]  text-foreground  font-thin">{item.title}</span>
                    <div className="text-muted-foreground text-xs">({item.productCount})</div>
                  </FilterItem>
                </div>
              ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-[14px]">Ничего не найдено</div>
      )}
      <div onClick={toggleList} className="text-primary cursor-pointer">
        Свернуть
      </div>
    </>
  );
}
