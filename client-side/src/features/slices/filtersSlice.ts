import { IFilters, IFilterOption, IFilterColor, IPriceRange } from "@/shared/types/filter.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IFilters = {
  categoryIds: [],
  sizeIds: [],
  colorIds: [],
  genderIds: [],
  brandIds: [],
  materialIds: [],
  styleIds: [],
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
      if (filterType === "colorIds") {
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
    setFilterId(
      state,
      action: PayloadAction<{
        filterType: Exclude<keyof IFilters, "priceRange">;
        filterId: string;
      }>
    ) {
      const { filterType, filterId } = action.payload;
      const exists = state[filterType].some((item) => item.id === filterId);
      if (!exists) {
        if (filterType === "colorIds") state[filterType].push({ id: filterId, title: "", hex: "" });
        else state[filterType].push({ id: filterId, title: "" });
      }
    },
    // setFilterTitle(
    //   state,
    //   action: PayloadAction<{
    //     filterType: Exclude<keyof IFilters, "priceRange">;
    //     filterId: string;
    //     title: string;
    //     hex?: string;
    //   }>
    // ) {
    //   const { filterType, filterId, title, hex } = action.payload;
    //   const items = state[filterType];
    //   const item = items.find((item) => item.id === filterId);

    //   if (item) {
    //     item.title = title;
    //     if (hex && filterType === "colorIds") {
    //       (item as IFilterColor).hex = hex;
    //     }
    //   }
    // },
    updateFilterTitles: (
      state,
      action: PayloadAction<{
        filterType: Exclude<keyof IFilters, "priceRange">;
        items: { id: string; title: string; hex?: string }[];
      }>
    ) => {
      const { filterType, items } = action.payload;
      items.forEach(({ id, title, hex }) => {
        const item = state[filterType].find((x) => x.id === id);
        if (item) {
          item.title = title;
          if (hex && filterType === "colorIds") {
            (item as IFilterColor).hex = hex;
          }
        }
      });
    },
    clearFilters(
      state,
      action: PayloadAction<{ filterType?: Exclude<keyof IFilters, "priceRange">; filterId?: string }>
    ) {
      const { filterType, filterId } = action.payload;
      if (filterType && filterId) {
        if (filterType === "colorIds") {
          state.colorIds = state.colorIds.filter((filter) => filter.id !== filterId);
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

export const {
  toggleFilter,
  clearFilters,
  setFilters,
  setPriceRange,
  clearPriceRange,
  // setFilterTitle,
  setFilterId,
  updateFilterTitles,
} = filtersSlice.actions;

export default filtersSlice.reducer;
