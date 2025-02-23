"use client";
import { type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
    {/* <QueryClientProvider client={queryClient}> */}
      <Toaster />
      {children}
    {/* </QueryClientProvider> */}
    </Provider>
  );
}
