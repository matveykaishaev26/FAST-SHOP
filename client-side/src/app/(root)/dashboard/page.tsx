import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import Dashboard from "./Dashboard";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Личный кабинет",
  ...NO_INDEX_PAGE,
};
export default function DashboardPage() {
  return      <Suspense fallback={<div>Загрузка формы сброса пароля...</div>}>
        <Dashboard />
      </Suspense>
}
