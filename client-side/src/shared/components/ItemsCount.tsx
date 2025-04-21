import { Skeleton } from "./ui/Skeleton/Skeleton";
interface IItemsCountProps {
  count: number;
  size: "sm" | "md";
//   isLoading?: boolean;
}
export default function ItemsCount({ count, size = "md", }: IItemsCountProps) {
  const sizes = {
    sm: "h-4 w-4 text-[10px]",
    md: "h-5 w-5 text-[12px]",
  };
  return (
    <div className={`${sizes[size]}`}>
      {/* {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : ( */}
        <div className="bg-destructive w-full h-full rounded-full flex justify-center items-center text-background">
          {count}
        </div>
      {/* )} */}
    </div>
  );
}
