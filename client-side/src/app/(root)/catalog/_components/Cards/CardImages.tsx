"use client";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
interface ICardImagesProps {
  images: string[];
  alt: string;
}
export default function CardImages({ images, alt }: ICardImagesProps) {
  const [currentImage, setCurrentImage] = useState(images[0] || "/images/chel.webp");
  const [prevImage, setPrevImage] = useState<string | null>(null);

  if (!images.length || !images.some((img) => img.trim() !== "")) {
    return (
      <div className="relative w-full h-full">
        <Skeleton className="object-cover" />
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const width = container.width;

    const index = Math.floor((x / width) * images.length);
    const newImage = images[index] || "/placeholder.jpg";
    setPrevImage(currentImage);
    setCurrentImage(newImage);
  };

  const defaultClass = "relative aspect-[9/12] cursor-pointer  w-full  transition-opacity duration-200 mb-2";
  const CardImage = () => {
    return (
      <Image
        priority
        // loading="lazy"
        src={currentImage} // Fallback, если currentImage пустое
        alt={alt}
        fill
        className={`object-cover cursor-pointer pointer-events-none ${prevImage ? 'animate-fadeOut' : ''}`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.jpg"; // Fallback при ошибке загрузки
        }}
      />
    );
  };

  return (
    <>
      <div
        className={`${defaultClass} transition-opacity  hidden lg:block`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCurrentImage(images[0])}
      >
        <CardImage />
      </div>
      <div className={`${defaultClass}  block lg:hidden`}>
        <CardImage />
      </div>

      <div className="hidden items-center justify-center gap-x-1 lg:flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-[5px] w-[5px] rounded-full  ${currentImage === image ? "bg-primary" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    </>
  );
}
