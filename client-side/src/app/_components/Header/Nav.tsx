import Profile from "@/shared/components/Profile";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface INavItems {
  label: string;
  icon: ReactNode;
  href: string;
}

const navItems: INavItems[] = [
  {
    label: "Каталог",
    href: "/catalog",
    icon: <ShoppingCart size={20} />,
  },
  {
    label: "Избранное",
    href: "/favorite",

    icon: <Heart size={20} />,
  },
  {
    label: "Корзина",
    href: "/bag",

    icon: <ShoppingBag size={20} />,
  },
];

export default function Nav() {
  return (
    <>
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex flex-col cursor-pointer items-center text-muted-foreground hover:text-primary"
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
      <div
        className="flex flex-col cursor-pointer items-center text-muted-foreground hover:text-primary"
      >
        <Profile className="w-[20px] h-[20px]" />
        <span className="text-xs">Профиль</span>
      </div>
    </>
  );
}
