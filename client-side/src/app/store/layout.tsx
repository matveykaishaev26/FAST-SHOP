import { StoreLayout } from "@/shared/components/store/layouts/StoreLayout";
import type { PropsWithChildren } from "react";
export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <StoreLayout>{children}</StoreLayout>;
}
