"use client";
import { ChartColumnIncreasing, FolderKanban, PackageSearch, Settings, Star } from "lucide-react";
import AttributesTabs from "./AttributesTabs";
import Link from "next/link";
import { ADMIN_URL } from "@/config/url.config";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
interface ISidebarTab {
  label: string;
  href: string;
  icon: LucideIcon;
}
export default function Tabs() {
  const pathname = usePathname();
  const tabs: ISidebarTab[] = [
    {
      label: "Статистика",
      href: ADMIN_URL.statistics(),
      icon: ChartColumnIncreasing,
    },
    {
      label: "Товары",
      href: ADMIN_URL.products(),
      icon: PackageSearch,
    },

    {
      label: "Отзывы",
      href: ADMIN_URL.reviews(),
      icon: Star,
    },
    {
      label: "Настройки магазина",
      href: ADMIN_URL.settings(),
      icon: Settings,
    },
  ];
  return (
    <div className="flex flex-col gap-y-2">
      <AttributesTabs />
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
