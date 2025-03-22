
interface IToggleFilterList {
  isFiltersEmpty?: boolean;
  toggleList: () => void;
  clearFilters: () => void;
  title: string;
}
export default function ToggleFilterList({ isFiltersEmpty, toggleList, clearFilters, title }: IToggleFilterList) {
  return (
    <div className="flex justify-between items-center">
      <span onClick={toggleList} className="text-primary text-base cursor-pointer">
      {title}
      </span>
      {isFiltersEmpty && (
        <div className="text-muted-foreground cursor-pointer text-base hover:text-muted-foreground/80" onClick={clearFilters}>
          Сбросить
        </div>
      )}
    </div>
  );
}
