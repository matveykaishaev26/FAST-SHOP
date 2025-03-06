"use client";
import { ChevronDown, ChevronRight, FolderKanban } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ADMIN_URL } from "@/config/url.config";
export default function AttributesTabs() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const tabs = [
    {
      label: "Бренды",
      href: ADMIN_URL.root('/attributes/brands'),
    },
    {
      label: "Стили",
      href: ADMIN_URL.root('/attributes/styles'),
    },
    {
      label: "Технологии",
      href:ADMIN_URL.root('/attributes/technologies'),
    },
    {
      label: "Материалы",
      href: ADMIN_URL.root('/attributes/products'),
    },
  ];
  return (
    <div>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`cursor-pointer flex p-2  select-none justify-between items-center gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10 `}
      >
        <div className="flex items-center gap-x-4">
          <FolderKanban size={16} />
          <div className="text-[16px]">Аттрибуты</div>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
      {isOpen &&
        tabs.map((tab) => (
          <Link
            href={tab.href}
            key={tab.label}
            className={`flex p-2 select-none items-center gap-x-4 text-muted-foreground rounded-lg hover:bg-primary/10 ${
              pathname === tab.href ? "bg-primary/30 hover:bg-primary/30" : ""
            }`}
          >
            <div className="text-[14px]">{tab.label}</div>
          </Link>
        ))}
    </div>
  );
}
