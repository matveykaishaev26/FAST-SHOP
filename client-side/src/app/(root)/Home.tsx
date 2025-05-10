import { PUBLIC_URL } from "@/config/url.config";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "FastShop",
};
export default function Home() {
  return (
    <main className="space-y-16 px-4 md:px-16 py-10">
      {/* Hero Section */}
      <section className="bg-muted rounded-2xl py-20 text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">Стильно. Удобно. Надёжно.</h1>
        <p className="text-lg text-muted-foreground">Магазин обуви, в котором легко найти свою пару.</p>
        <Link className="block" href={PUBLIC_URL.catalog()}>
          <Button size="lg">Перейти в каталог</Button>
        </Link>
      </section>

      {/* Popular Products */}
      <section>
        <h2 className="text-3xl font-semibold mb-8">Популярные модели</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Кеды", "Кроссовки", "Ботинки"].map((title, id) => (
            <Card key={id} className="hover:shadow-md transition">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">₽5 990</p>
                <Button variant="outline" size="sm"></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
