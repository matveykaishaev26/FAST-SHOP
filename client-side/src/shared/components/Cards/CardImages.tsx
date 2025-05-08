"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { ISize } from "@/shared/types/size.interface";
import Favorite from "./Favorite";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import { IActiveSize } from "../SizeSelector";

interface ICardImagesProps {
  images: string[];
  alt: string;
  className?: string;
  sizes: ISize[];
  productVariantId: string;
  activeSize: IActiveSize | null;
  setActiveSize: React.Dispatch<React.SetStateAction<IActiveSize | null>>;
  variant?: "catalog" | "favorite";
  handlePushToItemPage: () => void;
}

const DEFAULT_FALLBACK_IMAGE = "/images/default-product.webp"; // Добавьте этот файл в ваш проект

export default function CardImages({
  images,
  alt,
  className,
  sizes,
  productVariantId,
  activeSize,
  setActiveSize,
  variant,
  handlePushToItemPage,
}: ICardImagesProps) {
  const [currentImage, setCurrentImage] = useState(images[0]?.trim() || DEFAULT_FALLBACK_IMAGE);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDialogOpen) return;

      const container = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - container.left;
      const index = Math.floor((x / container.width) * images.length);

      setCurrentImage(images[index]?.trim() || images[0]?.trim() || DEFAULT_FALLBACK_IMAGE);
    },
    [images, isDialogOpen]
  );
  const handleMouseLeave = useCallback(() => {
    setCurrentImage(images[0]?.trim() || DEFAULT_FALLBACK_IMAGE);
  }, [images]);

  const setIsOpen = useCallback(
    (state: boolean) => {
      setIsDialogOpen(state);
      if (!state) {
        setCurrentImage(images[0]?.trim() || DEFAULT_FALLBACK_IMAGE);
      }
    },
    [images]
  );

  if (!images.length || !images.some((img) => img.trim() !== "")) {
    return (
      <div className="relative w-full h-full">
        <Skeleton className="object-cover" />
      </div>
    );
  }

  const CardImage = () => (
    <Image
      loading="lazy"
      src={currentImage}
      alt={alt}
      fill
      className="object-cover cursor-pointer "
      onError={(e) => {
        (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
        (e.target as HTMLImageElement).classList.add("opacity-80");
      }}
    />
  );
  const defaultClass = "relative aspect-[9/12] cursor-pointer w-full transition-opacity duration-200";

  return (
    <>
      <div
        className={`${defaultClass} select-none absolute transition-opacity group group/favorite hidden lg:block ${
          className || ""
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pointer-events-auto">
          <Favorite
            className="absolute top-2 right-2"
            variant={variant}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            isFavorited={isFavorited}
            setIsFavorited={setIsFavorited}
            productVariantId={productVariantId}
            sizes={sizes}
            setIsDialogOpen={setIsOpen}
            isDialogOpen={isDialogOpen}
          />
        </div>
        <div onClick={handlePushToItemPage}>
          <CardImage />
        </div>
        {variant === "favorite" && (
          <div className="absolute bg-gray-500 bottom-0 text-white p-2 text-xs">{activeSize?.title}</div>
        )}
        <div className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 hidden items-center justify-center gap-x-1 lg:flex opacity-0 group-hover:opacity-100">
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
      <div className={`${defaultClass} block lg:hidden`}>
        <Favorite
          className="absolute top-2 right-2"
          variant={variant}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
          isFavorited={isFavorited}
          setIsFavorited={setIsFavorited}
          productVariantId={productVariantId}
          sizes={sizes}
          setIsDialogOpen={setIsOpen}
          isDialogOpen={isDialogOpen}
        />
        {variant === "favorite" && (
          <div className="absolute bg-gray-500 bottom-0 text-white p-2 text-xs">{activeSize?.title}</div>
        )}

        <CardImage />
      </div>
    </>
  );
}
