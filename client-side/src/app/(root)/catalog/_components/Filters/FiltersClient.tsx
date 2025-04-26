"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/features/store";
import { useRef } from "react";
import Filters from "./Filters";

interface IFiltersClient {
  initialState: any;
  // setIsOpen?: () => void;
  // variant?: "desktop" | "mobile";
}

export default function FiltersClient({ initialState }: IFiltersClient) {
  const storeRef = useRef(makeStore(initialState));


  return (
    <Provider store={storeRef.current}>
      <Filters  className="w-[350px] hidden lg:block" />
    </Provider>
  );
}
