import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: "Управление магазином",
  ...NO_INDEX_PAGE,
};

export default function StorePage() {
  return <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente rem dolores, molestiae consectetur animi debitis aliquid excepturi esse aspernatur suscipit eos reprehenderit ipsa! Eaque quaerat, qui praesentium explicabo odit cumque.</div>;
}
