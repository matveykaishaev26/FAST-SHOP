"use client";
import type { PropsWithChildren } from "react";
import Sidebar from "../Sidebar/SIdebar";
import Header from "../Header";
import SidebarToggle from "./SidebarToggle";
import { useState } from "react";

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="grid h-screen grid-rows-[auto_auto_1fr] grid-cols-1 md:grid-cols-[250px_1fr] md:grid-rows-[auto_1fr]">
      <div className="col-span-2">
        <Header />
      </div>
      <div className="border-b p-3 col-span-2 md:hidden">
        <SidebarToggle isSidebarOpen={isSidebarOpen} setIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)} />
      </div>
      <Sidebar className={isSidebarOpen === false ? "hidden md:block" : ""} />
      {isSidebarOpen === false && <main className="px-6 py-4">{children}</main>}
    </div>
  );
}
