import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IFilterOption {
  id: string;
  title: string;
}

export type IPriceRange = [number, number] | null;
export interface IFilters {
  category: IFilterOption[];
  size: IFilterOption[];
  color: IFilterOption[];
  gender: IFilterOption[];
  brand: IFilterOption[];
  material: IFilterOption[];
  style: IFilterOption[];
}

const initialState: IFilters = {
  category: [],
  size: [],
  color: [],
  gender: [],
  brand: [],
  material: [],
  style: [],
};
export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter(state, action: PayloadAction<{ option: IFilterOption; filterType: keyof IFilters }>) {
      const { option, filterType } = action.payload;

      const isExist = state[filterType].some((filter) => filter.id === option.id);
      if (isExist) {
        state[filterType] = state[action.payload.filterType].filter((filter) => filter.id !== action.payload.option.id);
      } else {
        state[filterType].push(option);
      }
    },
    clearFilters(state) {
      Object.keys(state).forEach((key) => {
        state[key as keyof IFilters] = [];
      });
    },

    setFilters(state, action: PayloadAction<IFilters>) {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key as keyof IFilters] = value;
      });
    },
  },
});

export const { toggleFilter, clearFilters, setFilters } = filtersSlice.actions;
