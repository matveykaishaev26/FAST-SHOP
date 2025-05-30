import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";


interface ICardsSkeletonProps {
    count?: number;
}
export default function CardsSkeleton({count = 20}: ICardsSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} className=" aspect-[9/12] w-full" />
      ))}
    </div>
  );
}
