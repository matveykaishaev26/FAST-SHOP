"use client";
import { type PropsWithChildren } from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { makeStore } from "@/features/store";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren) {
  const store = makeStore()
  return (
    <Provider store={store}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Next13ProgressBar height="2px" color="#9a6df7  " options={{ showSpinner: false }} showOnShallow />
        <Toaster />
        {children}
      </NextThemesProvider>
    </Provider>
  );
}
