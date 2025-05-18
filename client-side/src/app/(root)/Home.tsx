import { PUBLIC_URL } from "@/config/url.config";
import { Button } from "@/shared/components/ui/button";
import { Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import fetchProductCards from "./catalog/utils/fetchProductCards";
import { ICardItem } from "@/shared/types/card.interface";
import Card from "@/shared/components/Cards/Card";
export const metadata: Metadata = {
  title: "FastShop",
};
const LIMIT = 4;
export default  function Home() {
  const apiQuery = `limit=${LIMIT}`;
  // const productCards = await fetchProductCards(apiQuery);
  // const { items } = productCards || {};
  return (
    <main className="space-y-10  ">
      <section className="rounded-2xl  text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">Стильно. Удобно. Надёжно.</h1>
        <p className="text-lg text-muted-foreground">Магазин обуви, в котором легко найти свою пару.</p>
        <Link className="block" href={PUBLIC_URL.catalog()}>
          <Button size="lg">Перейти в каталог</Button>
        </Link>
      </section>

      {/* Popular Products */}
      {/* <h3 className="font-bold text-2xl">Популярные модели</h3>
      <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  mb-10">
        {items && items.map((product: ICardItem) => <Card key={product.id} product={product} />)}
      </div> */}
    </main>
  );
}
