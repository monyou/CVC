import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleLoading(state) {
      state.globalLoading = !state.globalLoading;
    },
  },
});

// Thunks

// Selectors
export const selectGlobalLoading = (state) => state.common.globalLoading;

// Actions and Reducer
export const { toggleLoading } = commonSlice.actions;
export default commonSlice.reducer;
