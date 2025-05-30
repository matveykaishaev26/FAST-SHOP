// /profile/favorites/page.tsx — серверный компонент (без "use client")
import { Suspense } from "react";
import Favorites from "./Favorites";

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Favorites />
    </Suspense>
  );
}
