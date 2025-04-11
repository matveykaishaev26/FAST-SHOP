"use client";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import Favorite from "./Favorite";
interface ICardImagesProps {
  images: string[];
  alt: string;
  className?: string;
}
export default function CardImages({ images, alt, className }: ICardImagesProps) {
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

  const defaultClass = "relative aspect-[9/12] cursor-pointer  w-full  transition-opacity duration-200";

  const CardImage = () => {
    return (
      <Image
        loading="lazy"
        src={currentImage} // Fallback, если currentImage пустое
        alt={alt}
        fill
        className={`object-cover  cursor-pointer pointer-events-none  ${prevImage ? "animate-fadeOut" : ""}`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.jpg"; // Fallback при ошибке загрузки
        }}
      />
    );
  };

  return (
    <>
      <div
        className={`${defaultClass} select-none absolute transition-opacity group  hidden lg:block ${
          className ? className : ""
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCurrentImage(images[0])}
      >
        <Favorite />
        <CardImage />
        <div className="absolute z-50 bottom-6 left-1/2 -translate-x-1/2 hidden items-center justify-center gap-x-1 lg:flex opacity-0 group-hover:opacity-100">
          {images.map((image, index) => (
            <div
              key={index}
              className={`h-[5px] w-[5px] transition  rounded-full   ${
                currentImage === image ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className={`${defaultClass}  block lg:hidden`}>
        <Favorite />
        <CardImage />
      </div>
    </>
  );
}
