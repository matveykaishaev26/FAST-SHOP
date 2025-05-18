import { Suspense } from "react";
import PageHeader from "../../_components/PageHeader";
import Basket from "./_components/Basket";

export default function Page() {
  return (
    <div>
      <PageHeader header="Корзина" />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Basket/>
      </Suspense>
    </div>
  );
}
