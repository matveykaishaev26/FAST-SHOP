"use client";
import { useState, type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/features/store";
export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}
