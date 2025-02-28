"use client";
import { ChartColumnIncreasing, FolderKanban, PackageSearch, Paintbrush, Settings, Star } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { STORE_URL } from "@/config/url.config";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import StoresTab from "./StoresTab";
interface ISidebarTab {
  label: string;
  href: string;
  icon: LucideIcon;
}
export default function Tabs() {
  const params = useParams<{ storeId: string }>();
  const pathname = usePathname();
  const tabs: ISidebarTab[] = [
    {
      label: "Статистика",
      href: STORE_URL.home(params.storeId),
      icon: ChartColumnIncreasing,
    },
    {
      label: "Товары",
      href: STORE_URL.products(params.storeId),
      icon: PackageSearch,
    },
    {
      label: "Категории",
      href: STORE_URL.categories(params.storeId),
      icon: FolderKanban,
    },
    {
      label: "Цвета",
      href: STORE_URL.colors(params.storeId),
      icon: Paintbrush,
    },
    {
      label: "Отзывы",
      href: STORE_URL.reviews(params.storeId),
      icon: Star,
    },
    {
      label: "Настройки магазина",
      href: STORE_URL.settings(params.storeId),
      icon: Settings,
    },
  ];
  return (
    <div className="flex flex-col gap-y-2">
      <StoresTab />
      {tabs.map((tab) => (
        <Link
          href={tab.href}
          key={tab.label}
          className={`flex p-2 select-none items-center gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10 ${
            pathname === tab.href ? "bg-primary/30 hover:bg-primary/30" : ""
          }`}
        >
          <tab.icon size={16} />
          <div className="text-[16px]">{tab.label}</div>
        </Link>
      ))}
    </div>
  );
}
