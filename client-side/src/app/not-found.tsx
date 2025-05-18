import { PUBLIC_URL } from "@/config/url.config";
import Link from "next/link";

// файл: app/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center space-y-5 mt-20">
      <h1 className="text-4xl font-bold">{`Упс... Что-то пошло не так(`}</h1>
      <Link href={PUBLIC_URL.home()} className="text-muted-foreground mt-4 hover:text-primary">
        Проверьте ссылку или вернитесь на главную страницу
      </Link>
    </div>
  );
}
