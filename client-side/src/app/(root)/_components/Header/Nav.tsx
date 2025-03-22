"use client";
import Profile from "@/shared/components/Profile";
import { Heart, ShoppingBag, ShoppingCart, Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { PROFILE_URL, PUBLIC_URL } from "@/config/url.config";
import { usePathname } from "next/navigation";
interface INavItems {
  label: string;
  icon: ReactNode;
  href: string;
}

export default function Nav() {
  const pathname = usePathname();
  const navItems: INavItems[] = [
    {
      label: "Главная",
      href: PUBLIC_URL.home(),
      icon: <Home size={20} />,
    },
    {
      label: "Каталог",
      href: PUBLIC_URL.catalog(""),
      icon: <ShoppingCart size={20} />,
    },
    {
      label: "Избранное",
      href: PROFILE_URL.favorites(),

      icon: <Heart size={20} />,
    },
    {
      label: "Корзина",
      href: PROFILE_URL.basket(),

      icon: <ShoppingBag size={20} />,
    },
  ];
  return (
    <>
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={`flex flex-col cursor-pointer items-center text-muted-foreground hover:text-primary ${
            pathname === item.href ? "text-primary" : ""
          }`}
        >
          {item.icon}
          <div className="text-[10px] sm:text-xs">{item.label}</div>
        </Link>
      ))}
      <Profile className="w-[20px] h-[20px] text-[10px] sm:text-xs" />
    </>
  );
}
