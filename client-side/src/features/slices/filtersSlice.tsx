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
    toggleFilter(
      state,
      action: PayloadAction<{ option: IFilterOption; filterType: keyof IFilters; isChecked: boolean }>
    ) {
      const { option, filterType, isChecked } = action.payload;

      if (!isChecked) {
        state[filterType] = state[action.payload.filterType].filter((filter) => filter.id !== action.payload.option.id);
      } else {
        state[filterType].push(option);
      }
    },
    clearFilters(state, action: PayloadAction<{ filterType?: keyof IFilters; filterId?: string }>) {
      const { filterType, filterId } = action.payload;
      if (filterType && filterId) {
        state[filterType] = state[filterType].filter((filter) => filter.id !== filterId);
      } else if (filterType) state[filterType] = [];
      else
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
