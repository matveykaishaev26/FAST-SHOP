import Logo from "@/shared/components/Logo";
import { Input } from "@/shared/components/ui/input";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { ShoppingCart, ShoppingBag, Search, Heart } from "lucide-react";
import Profile from "@/shared/components/Profile";
import { Button } from "@/shared/components/ui/button";
import Nav from "./Nav";

export default function MainHeader() {
  return (
    <>
      <header className="z-20  border-b bg-background h-[90px]">
        <div className="sticky top-0   max-w-page h-full m-auto flex items-center  gap-x-4 justify-between px-4 page:p-0 ">
          <Logo />
          <div className="w-full flex gap-x-2">
            <Input type={"search"} className="w-full bg-background " placeholder="Найти..." />
            <Button>
              <Search />
            </Button>
          </div>
          <div className="gap-x-4 flex items-center">
            <div className="hidden items-center  gap-x-4 lg:flex">
              <Nav />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
