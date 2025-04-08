import { IFilters, IFilterOption, IFilterColor, IPriceRange } from "@/shared/types/filter.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IFilters = {
  category: [],
  size: [],
  color: [],
  gender: [],
  brand: [],
  material: [],
  style: [],
  priceRange: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter(
      state,
      action: PayloadAction<{
        option: IFilterOption | IFilterColor;
        filterType: Exclude<keyof IFilters, "priceRange">;
        isChecked: boolean;
      }>
    ) {
      const { option, filterType, isChecked } = action.payload;
      if (filterType === "color") {
        if (isChecked) {
          state[filterType].push(option as IFilterColor);
        } else {
          state[filterType] = state[filterType].filter((filter) => filter.id !== option.id);
        }
      } else {
        if (isChecked) {
          state[filterType].push(option);
        } else {
          state[filterType] = state[filterType].filter((filter) => filter.id !== option.id);
        }
      }
    },
    clearFilters(
      state,
      action: PayloadAction<{ filterType?: Exclude<keyof IFilters, "priceRange">; filterId?: string }>
    ) {
      const { filterType, filterId } = action.payload;
      if (filterType && filterId) {
        if (filterType === "color") {
          state.color = state.color.filter((filter) => filter.id !== filterId);
        } else {
          state[filterType] = state[filterType].filter((filter) => filter.id !== filterId);
        }
      } else if (filterType) state[filterType] = [];
      else
        Object.keys(state).forEach((key) => {
          state[key as Exclude<keyof IFilters, "priceRange">] = [];
        });
    },

    setFilters(state, action: PayloadAction<IFilters>) {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key as keyof IFilters] = value;
      });
    },

    setPriceRange(state, action: PayloadAction<IPriceRange>) {
      state.priceRange = action.payload;
    },
    clearPriceRange(state) {
      state.priceRange = null;
    },
  },
});

export const { toggleFilter, clearFilters, setFilters, setPriceRange, clearPriceRange } = filtersSlice.actions;

export default filtersSlice.reducer;
