import { AppDispatch } from "@/features/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState } from "@/features/store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;