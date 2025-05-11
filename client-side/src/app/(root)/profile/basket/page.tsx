import PageHeader from "../../_components/PageHeader";
import Basket from "./_components/Basket";

export default function Page() {
  return (
    <div>
      <PageHeader header="Корзина" />
      <Basket />
    </div>
  );
}
