import dynamic from "next/dynamic";

const Basket = dynamic(() => import("./_components/Basket"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function Page() {
  return Basket;
}
