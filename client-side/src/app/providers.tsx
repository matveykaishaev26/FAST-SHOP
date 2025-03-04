"use client";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster />
        {children}
      </NextThemesProvider>
    </Provider>
  );
}
