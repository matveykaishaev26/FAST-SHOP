// файл: app/posts/[id]/page.tsx

import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import Rating from "@/shared/components/Rating";
import { IReview } from "@/shared/types/review.interface";
import { Button } from "@/shared/components/ui/button";
import AddToCartForm from "./components/AddToBasketForm";
import { ISize } from "@/shared/types/size.interface";
import { IColor } from "@/shared/types/color.interface";
import { IMaterial } from "@/shared/types/material.interface";
import Variants from "./components/Variants";
type Params = { params: { id: string } };

interface IProduct {
  id: string;
  title: string;
  brand: string;
  description: string;
  materials: Record<string, { title: string; percentage: number }[]>;
  images: string[];
  price: number;
  sizes: ISize[];
  colors: string[];
  reviews: IReview[];
  variants: Record<string, { colors: string[]; image: string }>;
}
// Пример запроса к API или БД
async function getProduct(id: string) {
  const res = await fetch(`http://localhost:5000/products/${id}`, {
    next: { revalidate: 1 }, // ISR: страница будет кэшироваться на 60 сек
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function Page({ params }: Params) {
  const { id } = await params;
  const productData: IProduct = await getProduct(id);
  const {
    images,
    price,
    title,
    sizes,
    colors,
    reviews,
    brand,
    description,
    materials,
    variants,
    id: productVariantId,
  } = productData;
  console.log(productData);
  const averageRating =
    Array.isArray(reviews) && reviews.length !== 0
      ? (reviews.reduce((acc: number, review: IReview) => acc + review.rating, 0) / reviews.length).toFixed(2)
      : "0.00";

  return (
    <div>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Галерея */}
        <div className="flex flex-col gap-4 ">
          <Image src={images[0]} alt={title} width={400} height={400} className="rounded-2xl object-cover border" />
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img: string, idx: number) => (
              <Image
                key={idx}
                src={img}
                alt={`Image ${idx}`}
                width={80}
                height={80}
                className="rounded-lg  hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Описание */}
        <div className="space-y-4 ">
          <p className="text-2xl">{brand}</p>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>

          <Rating variant="lg" count={Array.isArray(reviews) ? reviews.length : 0} value={String(averageRating)} />

          <p className="text-2xl font-semibold">{price.toLocaleString()} ₽</p>

          <div className="flex items-center gap-x-2">
            <h4 className="text-sm text-muted-foreground">Цвет: </h4>
            <div className="flex gap-2 mt-1">
              {colors.map((v: string) => (
                <Badge key={v} variant="outline">
                  {v}
                </Badge>
              ))}
            </div>
          </div>
          {variants && <Variants currentImage={images[0]} variants={variants} />}

          {/* Отображение материалов */}
          <div className="pt-6 border-t">
            <h4 className="text-2xl font-semibold mb-4">Материалы</h4>
            <div className="space-y-4">
              {Object.entries(materials).map(([section, items]) => (
                <div key={section} className="border p-4 rounded-xl bg-muted/50">
                  <div className="mb-2 font-medium text-lg">{section}</div>
                  <div className="space-y-1">
                    {items.map((item, index) => (
                      <div key={`${item.title}-${index}`} className="flex justify-between text-sm">
                        <span>{item.title}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AddToCartForm productVariantId={productVariantId} sizes={sizes} />
      </div>
    </div>
  );
}
