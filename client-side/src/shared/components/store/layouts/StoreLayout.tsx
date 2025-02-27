import type { PropsWithChildren } from "react";
import Sidebar from "../Sidebar/SIdebar";
import Header from "../Header";
export function StoreLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-[250px_1fr]">
      {/* Header */}
      <div className="col-span-2">
        <Header />
      </div>
      <Sidebar />
      <main className="px-6 py-4">
        <h2 className="text-2xl font-semibold">Main Content</h2>
        <p>Here is your main content.</p>
      </main>
    </div>
  );
}
