import Logo from "@/shared/components/Logo";
import { Input } from "@/shared/components/ui/input";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { ShoppingCart, ShoppingBag, Search, Heart } from "lucide-react";
import Profile from "@/shared/components/Profile";
import { Button } from "@/shared/components/ui/button";
import Nav from "./Nav";
export default function Header() {
  return (
    <>
      <header className="border-b h-[80px]">
        <div className="sticky top-0  bg-background max-w-page h-full m-auto flex items-center  gap-x-4 justify-between px-4 page:p-0 ">
          <Logo />

          <div className="w-full flex gap-x-2">
            <Input type={"search"} className="w-full bg-background " placeholder="Найти..." />
            <Button>
              <Search />
            </Button>
          </div>
          <div className="gap-x-4 flex items-center">
            <div className="hidden gap-x-4 lg:flex">
              <Nav />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* <nav className="px-4 py-2 fixed bottom-0 left-0 w-full border-t bg-muted flex justify-between  lg:hidden">
        <Nav />
      </nav> */}
    </>
  );
}
