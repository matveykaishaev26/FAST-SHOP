"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagesIndicators from "./ImagesIndicators";

interface ICarouselProps {
  images: string[];
}
export default function Carousel({ images }: ICarouselProps) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden mx-auto rounded-lg">
      <div
        className="flex transition-transform relative duration-500  ease-in-out"
        style={{ transform: `translate(-${current * 100}%)` }}
      >
        {images.map((item, index) => (
          <div key={`${item}-${index}`} className="min-w-full shrink">
            <Image src={item} alt={`Slide ${item}`} width={800} height={500} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>

      <Button
        onClick={prev}
        variant={"secondary"}
        className="absolute bg-background left-4 top-1/2 -translate-y-1/2  p-2 rounded-full"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"secondary"}
        onClick={next}
        className="absolute bg-background  right-4 top-1/2 -translate-y-1/2  p-2 rounded-full"
      >
        <ChevronRight />
      </Button>
      <ImagesIndicators variant="md" length={images.length} current={current} setCurrent={setCurrent} />
    </div>
  );
}
