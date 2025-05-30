"use client";

import Logo from "@/shared/components/Logo";
import { Input } from "@/shared/components/ui/input";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { Search } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Nav from "./Nav";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MainHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    router.push(`/catalog?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="z-20 border-b bg-background h-[90px]">
      <div className="sticky top-0 max-w-page h-full m-auto flex items-center gap-x-4 justify-between px-4 page:p-0">
        <Logo />
        <div className="w-full flex gap-x-2">
          <Input
            type="search"
            className="w-full bg-background"
            placeholder="Найти..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSearch}>
            <Search />
          </Button>
        </div>
        <div className="gap-x-4 flex items-center">
          <div className="hidden items-center gap-x-4 lg:flex">
            <Nav />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
