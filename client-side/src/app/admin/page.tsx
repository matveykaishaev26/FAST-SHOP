import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";

export const metadata: Metadata = {
  title: "Управление магазином",
  ...NO_INDEX_PAGE,
};

export default function StorePage() {
  return (
    <main className="min-h-full flex flex-col justify-center items-center">
      <Card className="max-w-3xl w-full p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center mb-4">
            Добро пожаловать в Админ-панель
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground text-lg leading-relaxed">
            Здесь вы можете контролировать все аспекты вашего магазина: от управления товарами до обработки заказов.
            <br />
            <br />
            Используйте боковое меню для навигации по разделам админки. Ваши данные всегда под контролем.
            <br />
            <br />
            Желаем успешной работы и продуктивного дня!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
