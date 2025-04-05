import { AppDispatch } from "@/features/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState } from "@/features/store";
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
