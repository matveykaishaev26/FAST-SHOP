"use client";
import Profile from "@/shared/components/Profile";
import { Heart, ShoppingBag, ShoppingCart, Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { PROFILE_URL, PUBLIC_URL } from "@/config/url.config";
import { usePathname } from "next/navigation";
import { useGetFavoritesCountQuery } from "@/features/api/userFavoritesApi";
import { IGetFavoritesCount } from "@/features/api/userFavoritesApi";
import { getAccessToken } from "@/services/auth/auth-token.service";
import ItemsCount from "@/shared/components/ItemsCount";
interface INavItems {
  label: string;
  icon: ReactNode;
  href: string;
}

export default function Nav() {
  const token = getAccessToken();
  const { data, isLoading } = useGetFavoritesCountQuery(undefined, {
    skip: !token,
  });
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

      icon: (
        <div className="relative">
          <Heart size={20} />
          <div className="absolute  bottom-2 left-5 ">
            {token  && (data as IGetFavoritesCount)?.favoritesCount > 0 && <ItemsCount count={(data as IGetFavoritesCount)?.favoritesCount} size={"sm"} />}
          </div>
        </div>
      ),
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
