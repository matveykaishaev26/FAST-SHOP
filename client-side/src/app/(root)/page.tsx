import type { Metadata } from "next";
import Home from "./Home";
export const metadata: Metadata = {
  title: "Ваш шоппинг - наша забота!",
};
export default function HomePage() {
  return <Home />;
}
