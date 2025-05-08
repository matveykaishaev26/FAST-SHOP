import { ICardItem } from "@/shared/types/card.interface";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { IActiveSize } from "../SizeSelector";

interface ISizesScrollerProps {
  product: ICardItem;
  setActiveSize: any;
  activeSize: IActiveSize | null;
}

export default function SizesScroller({ product, setActiveSize, activeSize }: ISizesScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 100; // Adjust scroll amount as needed
      const start = scrollRef.current.scrollLeft;
      const end = direction === "left" ? start - scrollAmount : start + scrollAmount;
      const step = 5; // Adjust step size for smoother or faster animation
      const duration = 150; // Adjust duration for the animation

      const animateScroll = (startTime: number) => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        scrollRef.current!.scrollLeft = start + (end - start) * progress;

        if (progress < 1) {
          requestAnimationFrame(() => animateScroll(startTime));
        }
      };

      requestAnimationFrame(() => animateScroll(Date.now()));
    }
  };

  return (
    <div className="relative flex justify-between items-center w-full">
      {/* Left scroll button */}
      <button onClick={() => scroll("left")}>
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Scrollable sizes */}
      <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar gap-2 px-4 py-2">
        {product.sizes?.map((item) => (
          <div
            onClick={() => setActiveSize(item)}
            key={`${product.id}-${item.title}`}
            className={`min-w-[40px] text-sm text-center rounded-md cursor-pointer transition-colors
              ${
                activeSize?.id === item.id
                  ? "text-primary "
                  : "hover:text-primary"
              }`}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button onClick={() => scroll("right")}>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
