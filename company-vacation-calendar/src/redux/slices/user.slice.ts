import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../utils/common";

const initialState = {
  data: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.data = action.payload;
    },
    logoutUser(state) {
      logout();
    },
  },
});

// Thunks

// Selectors
export const selectUser = (state: any) => state.user.data;

// Actions and Reducer
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
