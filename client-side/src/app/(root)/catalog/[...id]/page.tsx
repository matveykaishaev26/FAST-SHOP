import { Badge } from "@/shared/components/ui/badge";
import Rating from "@/shared/components/Rating";
import { IReview } from "@/shared/types/review.interface";
import AddToCartForm from "./components/AddToBasketForm";
import { ISize } from "@/shared/types/size.interface";
import Variants from "./components/Variants";
import type { Metadata } from "next";
import Carousel from "@/shared/components/Carousel/Carousel";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{ id: string }>;
};

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
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
 
  const product: IProduct = await getProduct(id);

  return {
    title: product.title,
    description: product.description,

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
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
        <div
          className="relative
        "
        >
          <Carousel images={images} />
        </div>

        {/* Описание */}
        <div className="space-y-4">
          <p className="text-2xl">{brand}</p>
          <h1 className="text-3xl font-bold">{title}</h1> {/* Основной заголовок */}
          <p className="text-muted-foreground">{description}</p>
          <Rating variant="lg" count={Array.isArray(reviews) ? reviews.length : 0} value={String(averageRating)} />
          <p className="text-2xl font-semibold">{price.toLocaleString()} ₽</p>
          <div className="flex items-center gap-x-2">
            <h4 className="text-sm text-muted-foreground">Цвет: </h4> {/* Заголовок для цвета */}
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
          <div className="pt-6 ">
            <h2 className="text-2xl font-semibold mb-4">Материалы</h2> {/* Заголовок для раздела материалов */}
            <div className="space-y-4">
              {Object.entries(materials).map(([section, items]) => (
                <div key={section} className="border p-4 rounded-xl bg-muted/50">
                  <div className="mb-2 font-medium text-lg">{section}</div> {/* Раздел внутри материалов */}
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
