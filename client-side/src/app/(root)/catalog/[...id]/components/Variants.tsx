"use client";
import Image from "next/image";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
interface IVariantsProps {
  currentImage: string;
  variants: Record<string, { colors: string[]; image: string }>;
}
export default function Variants({ currentImage, variants }: IVariantsProps) {
  const router = useRouter();
  return (
    <div>
      {/* <p className="text-sm text-muted-foreground">Другие цветовый решения</p> */}
      <div className="flex gap-x-2 select-none">
        {/* Основное изображение (текущее) */}
        <Image
          key="main"
          src={currentImage}
          alt={`Image main`}
          width={60}
          height={60}
          className="rounded-lg hover:scale-105 transition  border-primary border-2"
        />
        {/* Варианты */}
        {Object.entries(variants).map(([variantKey, values]) => (
          <div className="relative group w-auto" key={variantKey}>
            <Image
              onClick={() => router.push(PUBLIC_URL.catalog(`/${variantKey}`))}
              src={values.image}
              alt={`Image ${variantKey}`}
              width={60}
              height={60}
              className="rounded-lg hover:scale-105 cursor-pointer transition"
            />
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-background border px-2 py-1 text-xs rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              {values.colors.join(" / ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
