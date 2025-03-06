import Logo from "@/shared/components/Logo";
import { Input } from "@/shared/components/ui/input";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { ShoppingCart } from "lucide-react";
import Profile from "@/shared/components/Profile";
import { Button } from "@/shared/components/ui/button";
import { Heart } from "lucide-react";
export default function Header() {
  return (
    <header className="border-b h-[80px]">
      <div className="max-w-page  h-full m-auto flex items-center justify-between ">
        <div className="">
          <Logo />
        </div>

        <div className="w-1/2 flex gap-x-2">
          <Input type={"search"} className="w-full bg-background " placeholder="Найти..." />
          <Button>Найти</Button>
        </div>
        <div className=" gap-x-4 flex">
          <Profile />
          <Button variant="outline" size="icon">
            <Heart />
          </Button>
          <Button variant="outline" size="icon">
            <ShoppingCart />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
