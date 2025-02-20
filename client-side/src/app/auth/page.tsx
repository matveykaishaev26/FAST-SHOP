import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import Auth from "./Auth";
export const metadata: Metadata = {
  title: "Авторизация",
  ...NO_INDEX_PAGE,
};
export default function Page() {
  return <Auth />;
}
