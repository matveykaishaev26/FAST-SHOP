import { PUBLIC_URL } from "@/config/url.config";
import Link from "next/link";

// файл: app/not-found.tsx
export default function NotFound() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{`Упс... Что-то пошло не так(`}</h1>
        <Link href={PUBLIC_URL.catalog()} className="text-muted-foreground mt-4 hover:text-primary">
          Проверьте ссылку или вернитесь в каталог
        </Link>
      </div>
    </div>
  );
}
