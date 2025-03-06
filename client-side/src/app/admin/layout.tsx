import { StoreLayout } from "@/app/admin/_components/layouts/StoreLayout";
import type { PropsWithChildren } from "react";
export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <StoreLayout>{children}</StoreLayout>;
}
