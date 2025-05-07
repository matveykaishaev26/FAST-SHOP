import { ICardItem } from "@/shared/types/card.interface";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

export default function SizesScroller({ product }: { product: ICardItem }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex justify-between w-full">
      {/* Scrollable sizes */}

      <div ref={scrollRef} className="flex overflow-x-auto gap-2 px-6 scrollbar-hide">
        {product.sizes?.map((item) => (
          <div
            key={`${product.id}-${item.title}`}
            className="min-w-[40px] px-3 py-1 text-sm text-center  rounded-md whitespace-nowrap"
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Scroll buttons */}
    </div>
  );
}
