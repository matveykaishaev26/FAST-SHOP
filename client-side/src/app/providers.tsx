"use client";
import { useRef, type PropsWithChildren } from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { AppStore, store } from "@/features/store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function Providers({ children }: PropsWithChildren) {

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = store()
  }
  return (
    <Provider store={storeRef.current}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Next13ProgressBar height="2px" color="#9a6df7  " options={{ showSpinner: false }} showOnShallow />
        <Toaster />
        {children}
      </NextThemesProvider>
    </Provider>
  );
}
