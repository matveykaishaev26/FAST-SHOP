"use client";
import type { PropsWithChildren } from "react";
import Sidebar from "../Sidebar/SIdebar";

import SidebarToggle from "./SidebarToggle";
import { useState } from "react";
import Header from "../Header/Header";

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="grid h-screen grid-rows-[auto_auto_1fr] grid-cols-1 md:grid-cols-[250px_1fr] md:grid-rows-[auto_1fr]">
      <div className="col-span-2 sticky top-0">
        <Header />
      </div>
      <div className="border-b  bg-background/80 backdrop-blur-[4px] p-4 sticky top-[64px] col-span-2 md:hidden">
        <SidebarToggle isSidebarOpen={isSidebarOpen} setIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)} />
      </div>
      <div className={isSidebarOpen === false ? "hidden md:block" : ""}>
        {" "}
        <Sidebar />
      </div>
      <main className={`p-4 ${isSidebarOpen === false ? "block md:block" : "hidden md:block"}`}>
        {children}
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>{" "}
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>{" "}
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>{" "}
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>{" "}
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cumque delectus assumenda quasi suscipit
          quae pariatur, non molestiae soluta ab numquam officia tempora maiores tenetur nisi velit voluptas illo.
          Nihil?
        </span>
      </main>
    </div>
  );
}
